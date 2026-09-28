/**
 * Healthcare Agentic-AI knowledge base.
 * Doubles as the RAG corpus for the in-app AI assistant (see /api/assistant)
 * and as the source of truth for the sandbox + slides.
 */

export interface KnowledgeChunk {
  id: string;
  topic: string;
  tags: string[];
  text: string;
}

export const KNOWLEDGE: KnowledgeChunk[] = [
  {
    id: "agentic-def",
    topic: "What Agentic AI means in healthcare",
    tags: ["agentic", "definition", "autonomy"],
    text: "Agentic AI moves beyond a single prompt-and-response model to systems that plan, use tools, call other agents, and act toward a goal with a degree of autonomy. In healthcare this looks like an assistant that can read a patient's history, retrieve the latest guidelines, order the right tests through connected systems, and draft a care plan for a clinician to approve. The clinician stays the decision-maker; the agent removes the busywork around the decision.",
  },
  {
    id: "digital-twin",
    topic: "Digital Twin in healthcare",
    tags: ["digital-twin", "simulation", "precision"],
    text: "A digital twin is a live, data-driven model of a physical thing. In healthcare that thing can be an organ, a patient, a medical device, a hospital ward, or a whole care pathway. The twin ingests real signals (labs, vitals, imaging, device telemetry) and simulates 'what happens next' so teams can test an intervention virtually before touching the patient. Cardiac twins simulate how a heart responds to a drug or a stent; hospital twins simulate bed capacity and staffing before flu season hits.",
  },
  {
    id: "twin-plus-agent",
    topic: "Why Agentic AI + Digital Twin together",
    tags: ["digital-twin", "agentic", "synergy"],
    text: "A digital twin gives you a safe place to simulate; an agentic system gives you something that can act on the simulation. Together the loop becomes: observe real patient data, update the twin, let agents run many what-if simulations, recommend the best next action, and route it to a human for sign-off. The twin is the sandbox, the agent is the actor, and the clinician is the accountable authority.",
  },
  {
    id: "rag",
    topic: "RAG - Retrieval Augmented Generation",
    tags: ["rag", "grounding", "safety"],
    text: "RAG grounds a language model in trusted documents instead of relying on memory. The pipeline is four stages: ingestion (load guidelines, PDFs, EHR notes), indexing (chunk the text, embed each chunk, store vectors with metadata), retrieval (embed the question, pull the nearest chunks), and generation (insert those chunks into the prompt as evidence). The key point for a clinical audience: RAG fixes 'the model did not know this fact' by supplying evidence, but it does not fix bad reasoning, so evaluation of faithfulness and citation still matters.",
  },
  {
    id: "mcp",
    topic: "MCP - Model Context Protocol",
    tags: ["mcp", "tools", "interoperability"],
    text: "MCP (Model Context Protocol, from Anthropic) is a standard way for an agent to reach a tool or data source - a database, an EHR API, a lab system, a file store - through one common interface instead of a custom integration for every system. In a hospital this is what lets one agent safely connect to the labs system, the imaging archive, and the scheduling system without a bespoke connector for each. It is the 'USB-C for AI tools' idea.",
  },
  {
    id: "a2a",
    topic: "A2A - Agent to Agent",
    tags: ["a2a", "multi-agent", "interoperability"],
    text: "A2A (Agent-to-Agent, backed by Google and now under the Linux Foundation) lets agents built by different teams or vendors talk to each other across framework boundaries. In care delivery a triage agent from one vendor can hand off to a hospital's own scheduling agent. A2A absorbed the older ACP protocol in 2025. The distinction to keep clear: MCP connects an agent to a tool, A2A connects an agent to another agent.",
  },
  {
    id: "market",
    topic: "Global healthcare AI market signals",
    tags: ["market", "startups", "adoption"],
    text: "Healthcare is one of the fastest-adopting verticals for agentic AI because the pain is concrete: documentation load, clinician burnout, administrative cost, and uneven access to specialists. High-value entry points for startups are ambient clinical documentation, prior-authorization automation, patient triage and navigation, medical imaging triage, and operational twins for hospital flow. The winning pattern is narrow, measurable, human-in-the-loop workflows rather than a general 'AI doctor'.",
  },
  {
    id: "safety",
    topic: "Safety, governance and human-in-the-loop",
    tags: ["safety", "governance", "trust"],
    text: "Clinical agentic systems need guardrails: retrieval grounding to reduce hallucination, citations so a clinician can verify sources, audit logs of every tool call, scoped permissions on what systems an agent may touch, and a human sign-off gate on any action that affects a patient. Regulation (data privacy, medical device rules) means the safe design is assistive and auditable, not autonomous and opaque.",
  },
  {
    id: "usecases",
    topic: "Concrete use cases across the care journey",
    tags: ["use-cases", "workflow"],
    text: "Across the journey: at intake an agent triages symptoms and books the right slot; before a visit it summarizes history and retrieves relevant guidelines; during a visit ambient AI drafts the note; after a visit it drafts follow-ups and checks drug interactions; operationally a digital twin forecasts ward capacity; in research twins simulate trial cohorts. Each is a bounded workflow with a human checkpoint.",
  },
];

/** Lightweight keyword retriever - a transparent stand-in for a vector store,
 *  good enough to demo the RAG retrieval stage live on stage. */
export function retrieve(query: string, k = 3): KnowledgeChunk[] {
  const q = query.toLowerCase();
  const terms = q.split(/[^a-z0-9]+/).filter((t) => t.length > 2);
  const scored = KNOWLEDGE.map((chunk) => {
    const hay = (chunk.topic + " " + chunk.text + " " + chunk.tags.join(" ")).toLowerCase();
    let score = 0;
    for (const t of terms) {
      if (hay.includes(t)) score += 1;
      if (chunk.tags.some((tag) => tag.includes(t))) score += 1.5;
    }
    return { chunk, score };
  });
  return scored
    .sort((a, b) => b.score - a.score)
    .filter((s) => s.score > 0)
    .slice(0, k)
    .map((s) => s.chunk);
}
