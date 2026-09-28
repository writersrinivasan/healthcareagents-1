# OneYoto — Agentic AI &amp; Digital Twin in Healthcare

An interactive, app-based presentation module for a technology forum, by **Srinivasan Ramanujam**. It walks a mixed audience — startup founders, doctors, and engineering/healthcare students — through the global advancements in Agentic AI and Digital Twins in healthcare, then lets them *play*: a live multi-agent sandbox (RAG + MCP) and a GROQ-powered AI assistant grounded in the session's knowledge base.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Branded with the OneYoto logo and colour palette (amber + red, complemented by healthcare teal).

---

## What's inside

**A 10-slide interactive deck**

1. **Title** — OneYoto branded cover
2. **Speaker** — Srinivasan Ramanujam (photo + credentials)
3. **The Shift** — from answering to acting (Plan · Tools · Collaborate)
4. **Digital Twin** — cardiac / patient / hospital / trial twins
5. **RAG** — the 4-stage grounding pipeline
6. **MCP &amp; A2A** — the interoperability plumbing
7. **The Market** — six concrete plays for founders
8. **Live Sandbox** — an agentic pipeline you can run on stage
9. **AI Assistant** — GROQ-powered, RAG-grounded Q&amp;A
10. **Close**

**Interactive Sandbox** — pick a scenario (chest-pain triage, prior-auth, hospital capacity) and watch a request flow through a 6-stage multi-agent pipeline: Orchestrator → RAG Retriever → MCP Tools → Digital Twin → Care Planner → Human Sign-off, with live retrieved evidence and a streaming agent trace.

**AI Assistant** — a chat assistant powered by the GROQ API. Each question is grounded via retrieval (RAG) over the built-in healthcare knowledge base, and answers cite the topics they drew from. Works in a **demo mode** (returns the retrieved context) even without an API key, so the session never breaks on stage.

---

## Run it

```bash
# 1. install (already done if node_modules exists)
npm install

# 2. add your GROQ key for the live assistant (optional but recommended)
cp .env.local.example .env.local
#   then edit .env.local and paste your key

# 3a. development
npm run dev
#   open http://localhost:3000

# 3b. or a production build
npm run build && npm run start
```

### GROQ API key

The in-app assistant uses [GROQ](https://console.groq.com/keys) (free tier available).

1. Create a key at <https://console.groq.com/keys>
2. Put it in `.env.local`:

```env
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama-3.3-70b-versatile   # optional override
```

Without a key the assistant runs in **demo mode** — it still retrieves and shows the grounded context, it just won't generate a free-form answer.

---

## Presenting

- **Navigate:** `→` / `Space` / `PageDown` to advance, `←` / `PageUp` to go back, `Home` / `End` to jump. Or use the footer arrows and the progress dots.
- Keyboard navigation is disabled while typing in the assistant, so you can chat freely.
- Best viewed full-screen in the browser (`F11` / `⌃⌘F`).

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx            # fonts + animated brand background
│   ├── page.tsx              # deck driver (keyboard nav, progress, footer)
│   ├── globals.css           # brand styling, gradients, glass
│   └── api/assistant/route.ts# GROQ endpoint (RAG-grounded, demo fallback)
├── components/
│   ├── ui/                   # Slide, Brand (Logo, Pill)
│   ├── slides/slides.tsx     # all 10 slide components
│   ├── sandbox/Sandbox.tsx   # interactive multi-agent pipeline
│   └── assistant/Assistant.tsx # GROQ chat UI
└── lib/knowledge.ts          # healthcare knowledge base + RAG retriever
public/
├── OneYotoLogo.png           # brand logo
└── speaker.png               # speaker photo
```

## Customising the content

All the healthcare content lives in one place: **`src/lib/knowledge.ts`**. Edit or add `KnowledgeChunk`s there and both the sandbox evidence panel and the AI assistant's grounding update automatically. Slide copy lives in `src/components/slides/slides.tsx`.

---

*A note on responsible AI: throughout, the framing is deliberate — agents act, digital twins simulate, and clinicians decide. Every patient-facing action in the sandbox routes through a human sign-off stage.*
