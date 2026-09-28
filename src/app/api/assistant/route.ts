import { NextRequest } from "next/server";
import Groq from "groq-sdk";
import { retrieve } from "@/lib/knowledge";

export const runtime = "nodejs";

const MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

const SYSTEM_PROMPT = `You are the OneYoto Healthcare AI Assistant, presented live at a technology forum by Srinivasan Ramanujam.
Your job is to explain how Agentic AI and Digital Twins are advancing healthcare, grounded in the CONTEXT provided.

Rules:
- Ground your answer in the CONTEXT. If the context does not cover something, say so briefly, then answer from general knowledge and flag that it is general.
- Audience is mixed: startup founders, doctors, and engineering/healthcare students. Be clear, energetic and concrete. Prefer short paragraphs and the occasional list.
- Emphasise the responsible pattern: agents act, digital twins simulate, clinicians decide. Keep a human in the loop for anything touching a patient.
- Keep answers tight (under ~180 words) unless asked to go deep.
- Never give individual medical advice or a diagnosis; speak at the level of how systems and workflows work.`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: NextRequest) {
  let body: { messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  const query = lastUser?.content?.trim() || "";

  if (!query) {
    return Response.json({ error: "Empty message" }, { status: 400 });
  }

  // RAG: retrieve grounding context.
  const hits = retrieve(query, 4);
  const context = hits
    .map((h, i) => `[${i + 1}] ${h.topic}\n${h.text}`)
    .join("\n\n");
  const sources = hits.map((h) => h.topic);

  const apiKey = process.env.GROQ_API_KEY;

  // Graceful fallback so the live demo still works without a key.
  if (!apiKey) {
    const fallback =
      hits.length > 0
        ? `**Demo mode — no GROQ_API_KEY set, so here is the grounded context I retrieved:**\n\n${hits
            .map((h) => `• **${h.topic}** — ${h.text}`)
            .join(
              "\n\n"
            )}\n\n_Add a GROQ_API_KEY in .env.local to get a fully generated answer._`
        : "Demo mode: I could not match this to the knowledge base, and no GROQ_API_KEY is set. Add a key in .env.local to enable live answers.";
    return Response.json({ content: fallback, sources, demo: true });
  }

  try {
    const groq = new Groq({ apiKey });
    const completion = await groq.chat.completions.create({
      model: MODEL,
      temperature: 0.4,
      max_tokens: 700,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "system",
          content: `CONTEXT (retrieved via RAG — cite by topic when useful):\n\n${context}`,
        },
        ...messages.slice(-6).map((m) => ({ role: m.role, content: m.content })),
      ],
    });

    const content =
      completion.choices[0]?.message?.content?.trim() ||
      "I couldn't generate a response — please try again.";
    return Response.json({ content, sources, demo: false });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json(
      {
        content: `The GROQ call failed (${message}). Check your GROQ_API_KEY and model name.`,
        sources,
        error: true,
      },
      { status: 200 }
    );
  }
}
