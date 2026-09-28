/**
 * Learning Hub curriculum.
 * In-depth, self-contained learning material on Agentic AI and Digital Twins
 * for a mixed audience (founders, doctors, students). Rendered at /learn.
 *
 * Content model: Track -> Lesson -> Section (with optional bullets / callout / table).
 */

export type Callout = { kind: "note" | "warning" | "tip" | "key"; text: string };

export interface Section {
  heading: string;
  body: string;
  bullets?: string[];
  callout?: Callout;
  table?: { headers: string[]; rows: string[][] };
}

export interface Lesson {
  id: string;
  title: string;
  minutes: number;
  summary: string;
  sections: Section[];
}

export interface Track {
  id: string;
  title: string;
  icon: string;
  tone: "gold" | "vital" | "red";
  blurb: string;
  lessons: Lesson[];
}

export const CURRICULUM: Track[] = [
  /* ============================================================= */
  /* TRACK 1 — AGENTIC AI                                          */
  /* ============================================================= */
  {
    id: "agentic-ai",
    title: "Agentic AI",
    icon: "🤖",
    tone: "gold",
    blurb:
      "From a single prompt-and-response model to systems that plan, use tools, remember, collaborate, and act toward a goal — safely, with a human in the loop.",
    lessons: [
      {
        id: "what-is-agentic",
        title: "What Agentic AI actually is",
        minutes: 6,
        summary:
          "The precise difference between a chatbot, an LLM call, and an agent — and why the jump matters in healthcare.",
        sections: [
          {
            heading: "A working definition",
            body:
              "Agentic AI describes systems that pursue a goal with a degree of autonomy: they plan a sequence of steps, choose and call tools, observe the results, and adapt — rather than producing one response to one prompt. The model stops being a text generator and becomes the reasoning core of a loop that can actually get something done.",
            callout: {
              kind: "key",
              text: "The one-line test: a chatbot answers; an agent acts. If the system can decide the next step and take it, it is agentic.",
            },
          },
          {
            heading: "Three levels, so the term stays honest",
            body:
              "The word 'agent' is overused. It helps to place any system on a ladder of autonomy so you know what you are really looking at.",
            bullets: [
              "Level 0 — Prompt/response: a single LLM call. No memory, no tools, no loop.",
              "Level 1 — Tool-using: the model can call a function (search, calculator, an API) and use the result in its answer.",
              "Level 2 — Agentic loop: the model plans, calls tools repeatedly, checks progress against the goal, and decides when it is done.",
              "Level 3 — Multi-agent: several specialised agents coordinate, hand off tasks, and negotiate — orchestrated toward a shared outcome.",
            ],
          },
          {
            heading: "Why the jump matters in healthcare",
            body:
              "In healthcare the value is not a cleverer answer — it is removing the busywork around a clinical decision. An agent can read a patient's history, retrieve the current guideline, prepare the right orders, and draft a plan. The clinician still decides; the agent compresses the twenty minutes of gathering and drafting into seconds.",
            callout: {
              kind: "note",
              text: "The clinician remains the accountable decision-maker. Agentic AI is assistive infrastructure, not a replacement for judgement.",
            },
          },
        ],
      },
      {
        id: "anatomy",
        title: "Anatomy of an agent",
        minutes: 8,
        summary:
          "The five parts every agent has: model, planner, tools, memory, and the loop that binds them.",
        sections: [
          {
            heading: "The five building blocks",
            body:
              "Strip away the framework names and every agent is the same five parts working together. Understanding them separately is what lets you debug one when it misbehaves.",
            table: {
              headers: ["Part", "Role", "Healthcare example"],
              rows: [
                ["Model (LLM)", "The reasoning core that decides what to do next", "Interprets 'patient reports chest pain' and reasons about next steps"],
                ["Planner", "Breaks a goal into ordered steps, re-plans on failure", "Decides: get history → check guideline → prepare orders → draft note"],
                ["Tools", "Connections to the outside world the agent can call", "EHR read, lab order API, guideline search, scheduler"],
                ["Memory", "Short-term (this task) and long-term (across sessions)", "Remembers the patient's allergies noted earlier in the visit"],
                ["Loop", "Observe → think → act → repeat until the goal is met", "Keeps working until a draft plan is ready for sign-off"],
              ],
            },
          },
          {
            heading: "The control loop (ReAct pattern)",
            body:
              "Most agents run a Reason+Act loop: the model produces a thought ('I need the latest labs'), chooses an action (call the lab tool), observes the result, and loops. The loop ends when the model judges the goal met or a stop condition (max steps, human gate) fires.",
            callout: {
              kind: "tip",
              text: "Always cap the loop — a max-steps limit and a cost budget prevent an agent from spinning forever or racking up tool calls.",
            },
          },
          {
            heading: "Memory in more detail",
            body:
              "Memory is what makes an agent feel coherent rather than amnesiac. Two kinds matter.",
            bullets: [
              "Short-term / working memory: the current task context — recent steps, tool outputs, the running plan. Usually the conversation buffer.",
              "Long-term memory: facts persisted across sessions, typically in a vector store, retrieved when relevant (this is where RAG and memory overlap).",
              "Episodic vs semantic: episodic = 'what happened' (this patient's visit); semantic = 'general knowledge' (the guideline). Keeping them separate improves retrieval.",
            ],
          },
        ],
      },
      {
        id: "planning-orchestration",
        title: "Planning, orchestration & multi-agent systems",
        minutes: 7,
        summary:
          "How agents decompose goals and how multiple agents coordinate — single-agent vs orchestrator vs swarm.",
        sections: [
          {
            heading: "How planning works",
            body:
              "Planning is decomposition: turning a fuzzy goal into an ordered, executable set of steps. Approaches range from letting the model plan implicitly step-by-step (ReAct), to generating the whole plan up front then executing it (Plan-and-Execute), to reflecting on results and revising (Reflexion).",
          },
          {
            heading: "Coordination patterns",
            body:
              "When one agent is not enough, you compose several. The pattern you pick shapes reliability and cost.",
            table: {
              headers: ["Pattern", "How it works", "Good for"],
              rows: [
                ["Single agent", "One agent, many tools", "Well-scoped tasks; easiest to reason about"],
                ["Orchestrator / supervisor", "A lead agent routes sub-tasks to specialists", "Clear division of labour (triage vs scheduling)"],
                ["Sequential pipeline", "Output of one agent feeds the next", "Staged workflows (intake → summarise → draft)"],
                ["Collaborative / swarm", "Peers negotiate and share state", "Open-ended problems; harder to control"],
              ],
            },
          },
          {
            heading: "A healthcare orchestration example",
            body:
              "A supervisor agent receives 'new patient with chest pain'. It routes to a triage specialist (assess urgency), which calls the RAG retriever (pull the ACS guideline) and MCP tools (order troponin), then hands to a scheduling agent (book cardiology) — and finally routes the whole draft to a clinician for sign-off.",
            callout: {
              kind: "key",
              text: "Specialised agents with narrow jobs are easier to test, guard, and trust than one giant agent trying to do everything.",
            },
          },
        ],
      },
      {
        id: "rag-deep",
        title: "RAG — grounding agents in truth",
        minutes: 9,
        summary:
          "The full retrieval pipeline, chunking and embedding decisions, and the misconception that gets teams in trouble.",
        sections: [
          {
            heading: "Why grounding matters",
            body:
              "A language model answers from patterns in its training, not from a verified source. Retrieval-Augmented Generation (RAG) fixes this by fetching relevant, trusted documents at question time and inserting them into the prompt as evidence — so the answer is grounded in your guidelines and records, not the model's memory.",
          },
          {
            heading: "The pipeline, stage by stage",
            body:
              "RAG runs in two phases. Indexing happens once per document set; retrieval + generation happen once per question.",
            bullets: [
              "Ingestion — load the raw documents (PDF guidelines, EHR notes, policies) and strip boilerplate before it pollutes chunks.",
              "Chunking — split text into pieces. Size and overlap are the single highest-leverage knob: too big wastes context, too small loses meaning.",
              "Embedding — convert each chunk to a vector with an embedding model. The same model must be used at index and query time or retrieval silently breaks.",
              "Indexing — store vectors plus metadata (source, date, category) in a vector database; metadata is what enables later filtering.",
              "Retrieval — embed the question, find nearest chunks (similarity, or MMR for diversity), optionally re-rank.",
              "Augmentation — insert the retrieved chunks into a prompt template, ordered and clearly marked as the evidence to use.",
              "Generation — the model answers from that evidence, ideally with citations back to the source.",
            ],
          },
          {
            heading: "Chunking strategies",
            body:
              "There is no universal best chunk size — it is empirical per corpus.",
            table: {
              headers: ["Strategy", "Trade-off"],
              rows: [
                ["Fixed-size", "Simplest and cheapest, but can cut a thought in half"],
                ["Semantic", "Boundaries follow meaning; better precision, more preprocessing"],
                ["Recursive", "Hierarchical splitting; a practical middle ground"],
              ],
            },
          },
          {
            heading: "The misconception to kill",
            body:
              "RAG supplies facts; it does not repair reasoning. It fixes 'the model didn't know this' but not 'the model reasons badly over what it was given.' Teams that conflate the two over-trust the output and skip evaluation.",
            callout: {
              kind: "warning",
              text: "Always evaluate two things: relevance (did we retrieve the right chunks?) and faithfulness (did the answer stay true to them?). In clinical settings, require citations.",
            },
          },
        ],
      },
      {
        id: "protocols-deep",
        title: "MCP & A2A — how agents connect",
        minutes: 8,
        summary:
          "The interoperability layer: MCP connects an agent to tools, A2A connects an agent to other agents. Plus where ANP/UCP/AP2 fit.",
        sections: [
          {
            heading: "The problem they solve",
            body:
              "An agent is only useful if it can reach the outside world and coordinate with others. Without standards, every tool needs a bespoke integration and every agent-to-agent link is custom. Protocols make these connections portable.",
          },
          {
            heading: "MCP — Model Context Protocol",
            body:
              "MCP (from Anthropic) standardises how an agent reaches a tool or data source — a database, an EHR API, a lab system, a file store — through one common interface instead of a custom connector per system. Think of it as the 'USB-C for AI tools': one plug, many devices.",
            callout: {
              kind: "note",
              text: "In a hospital, MCP is what lets a single agent safely connect to labs, imaging, and scheduling without three hand-built integrations.",
            },
          },
          {
            heading: "A2A — Agent-to-Agent",
            body:
              "A2A (backed by Google, now under the Linux Foundation) lets agents built by different teams or vendors talk across framework boundaries — a triage agent from one vendor handing off to a hospital's own scheduling agent. A2A absorbed the older ACP protocol in 2025.",
          },
          {
            heading: "The distinction that keeps it straight",
            body:
              "Both get loosely called 'agent protocols', which causes confusion. The load-bearing difference is what is being connected.",
            table: {
              headers: ["Protocol", "Connects", "Backed by"],
              rows: [
                ["MCP", "Agent ↔ tool / data source", "Anthropic"],
                ["A2A", "Agent ↔ another agent", "Google → Linux Foundation"],
                ["ANP", "Agent discovery across the open internet", "Open / community"],
                ["UCP / AP2", "Commerce & payments between agents", "Industry consortia (emerging)"],
              ],
            },
          },
          {
            heading: "A realistic 2026 stack",
            body:
              "Enterprises layer these rather than pick one: MCP for tool access, A2A for cross-vendor coordination, and UCP/AP2 only if the system handles transactions. Most healthcare systems today need MCP first, A2A soon after.",
          },
        ],
      },
      {
        id: "safety-deep",
        title: "Safety, governance & human-in-the-loop",
        minutes: 6,
        summary:
          "The guardrails that make a clinical agent deployable: grounding, citations, audit, scoped permissions, and sign-off gates.",
        sections: [
          {
            heading: "Why agentic systems need extra care",
            body:
              "An agent that can act can also act wrongly at scale. In healthcare the cost of a bad action is high and the regulation is real (privacy, medical-device rules). The safe design is assistive and auditable, never autonomous and opaque.",
          },
          {
            heading: "The guardrail checklist",
            body:
              "These are the controls a clinical agentic system should have before it touches production.",
            bullets: [
              "Grounding — RAG over trusted sources to cut hallucination.",
              "Citations — every claim traceable to a source a clinician can verify.",
              "Audit logs — a record of every tool call and decision, for review.",
              "Scoped permissions — an agent can only touch the systems its role allows.",
              "Human sign-off gate — any patient-affecting action waits for clinician approval.",
              "Evaluation — ongoing checks on relevance, faithfulness, and outcome quality.",
            ],
            callout: {
              kind: "key",
              text: "The design mantra: agents act, digital twins simulate, clinicians decide.",
            },
          },
        ],
      },
    ],
  },

  /* ============================================================= */
  /* TRACK 2 — DIGITAL TWIN                                        */
  /* ============================================================= */
  {
    id: "digital-twin",
    title: "Digital Twin",
    icon: "🧬",
    tone: "vital",
    blurb:
      "A live, data-driven model of a physical thing — an organ, a patient, a device, or a whole hospital — that you can simulate on before acting in the real world.",
    lessons: [
      {
        id: "twin-what",
        title: "What a Digital Twin is",
        minutes: 6,
        summary:
          "The definition, the three ingredients (physical thing, virtual model, live data link), and how it differs from a plain simulation.",
        sections: [
          {
            heading: "A working definition",
            body:
              "A digital twin is a virtual replica of a physical thing that is continuously updated by real data from its real-world counterpart, and can be used to simulate, predict, and optimise. The 'twin' part is the live link: it is not a one-off model, it tracks reality over time.",
            callout: {
              kind: "key",
              text: "Twin = virtual model + live data feed + the ability to simulate 'what happens next'. Drop the live feed and it is just a model.",
            },
          },
          {
            heading: "Three ingredients",
            body:
              "Every twin has the same three parts. Missing any one and you do not really have a twin.",
            bullets: [
              "The physical entity — the organ, patient, device, ward, or pathway being mirrored.",
              "The virtual model — the computational representation (physics-based, data-driven, or hybrid).",
              "The data connection — the live stream of signals (labs, vitals, imaging, telemetry) that keeps the model current.",
            ],
          },
          {
            heading: "Twin vs simulation vs model",
            body:
              "These get conflated. A model is a static representation. A simulation runs a model forward under assumptions. A digital twin is a simulation kept in sync with a specific real-world instance by live data — so it reflects this patient, not a generic one.",
          },
        ],
      },
      {
        id: "twin-types",
        title: "Types of twins in healthcare",
        minutes: 7,
        summary:
          "Organ, patient, device, hospital, and pathway/population twins — what each simulates and who uses it.",
        sections: [
          {
            heading: "The spectrum of scale",
            body:
              "Twins exist at every scale, from a single organ to an entire health system. Matching the scale to the question is the first design decision.",
            table: {
              headers: ["Twin", "Mirrors", "Simulates", "Primary user"],
              rows: [
                ["Organ twin", "A heart, lung, tumour", "Response to a drug, stent, or radiation", "Clinicians, researchers"],
                ["Patient twin", "One person's physiology", "A whole care plan, virtually", "Care teams"],
                ["Device twin", "A pump, scanner, implant", "Wear, failure, maintenance timing", "Biomedical engineering"],
                ["Hospital twin", "Beds, staff, ER flow", "Capacity, staffing, bottlenecks", "Operations leaders"],
                ["Pathway / population twin", "A care pathway or cohort", "Trial outcomes, public-health scenarios", "Researchers, planners"],
              ],
            },
          },
          {
            heading: "Concrete examples",
            body:
              "Making each tangible:",
            bullets: [
              "Cardiac twin — simulate how a specific heart responds to a beta-blocker before prescribing.",
              "Patient twin — test whether a diabetes plan will hit target HbA1c for this individual.",
              "Hospital twin — forecast a Saturday-night bed crunch before flu season and pre-open flex beds.",
              "Trial twin — simulate a synthetic control arm to reduce how many patients a study needs.",
            ],
          },
        ],
      },
      {
        id: "twin-loop",
        title: "How a twin stays alive: the data loop",
        minutes: 7,
        summary:
          "Sense → model → simulate → recommend → act → sense again. The closed loop that separates a twin from a diagram.",
        sections: [
          {
            heading: "The closed loop",
            body:
              "A twin earns its name by running a continuous loop. Real signals update the model; the model simulates options; a recommendation is produced; a human acts; the real-world result flows back in and updates the model again.",
            bullets: [
              "Sense — ingest live data (vitals, labs, imaging, device telemetry).",
              "Model — update the virtual representation to match current state.",
              "Simulate — run what-if scenarios (what if we give this drug / open these beds?).",
              "Recommend — surface the best option with its predicted outcome.",
              "Act — a human approves and the action happens in the real world.",
              "Feed back — the observed result updates the twin, improving the next cycle.",
            ],
          },
          {
            heading: "Data quality is the whole game",
            body:
              "A twin is only as good as its feed. Latency, gaps, and noisy sensors degrade the model. This is why twins pair naturally with strong data pipelines and why 'garbage in' is not a cliché here — it is a patient-safety issue.",
            callout: {
              kind: "warning",
              text: "A stale or wrong data feed produces a confident, wrong simulation. Validate the feed before you trust the twin.",
            },
          },
        ],
      },
      {
        id: "twin-plus-agent",
        title: "Agentic AI + Digital Twin: the power pair",
        minutes: 6,
        summary:
          "Why the two technologies are stronger together — the twin is the sandbox, the agent is the actor, the clinician is the authority.",
        sections: [
          {
            heading: "Complementary, not competing",
            body:
              "A digital twin gives you a safe place to simulate; an agentic system gives you something that can reason over the simulation and act on it. Alone, a twin is a powerful dashboard and an agent is a capable assistant. Together they close a loop: observe, simulate many futures, recommend, and route to a human.",
            callout: {
              kind: "key",
              text: "The twin is the sandbox. The agent is the actor. The clinician is the accountable authority. Keep those roles distinct.",
            },
          },
          {
            heading: "The combined loop",
            body:
              "Real patient data updates the twin; agents run many what-if simulations against it; the best next action is recommended; a clinician signs off; the outcome feeds back and sharpens the twin. This is the architecture the live Sandbox in the presentation demonstrates.",
          },
          {
            heading: "Where this is heading",
            body:
              "As twins get richer and agents get more capable and better-governed, the loop tightens — faster simulation, more personalised recommendations — but the human sign-off gate stays. The frontier is trust and evidence, not removing the clinician.",
          },
        ],
      },
      {
        id: "twin-challenges",
        title: "Challenges, ethics & where to build",
        minutes: 6,
        summary:
          "Data, validation, privacy, and regulation — plus the highest-value openings for founders.",
        sections: [
          {
            heading: "The hard parts",
            body:
              "Twins are demanding to build and to trust. The main challenges are practical and ethical at once.",
            bullets: [
              "Data — enough, clean, real-time, and interoperable across systems.",
              "Validation — proving the twin actually predicts reality, not just looks plausible.",
              "Privacy — a patient twin is deeply personal data and must be protected accordingly.",
              "Regulation — clinical twins can fall under medical-device rules depending on use.",
              "Equity — a twin trained on a narrow population can mislead for everyone else.",
            ],
          },
          {
            heading: "Where founders should build",
            body:
              "The winning pattern mirrors agentic AI: narrow, measurable, human-in-the-loop. High-value openings include operational hospital twins (capacity and staffing), device twins (predictive maintenance), and research twins (synthetic control arms) — bounded problems with clear ROI and a human checkpoint.",
            callout: {
              kind: "tip",
              text: "Start where the data already flows and the outcome is measurable. Operational twins often beat clinical twins as a first product because the regulatory path is lighter.",
            },
          },
        ],
      },
    ],
  },
];

/* Small glossary surfaced in the Learning Hub footer/menu. */
export const GLOSSARY: { term: string; def: string }[] = [
  { term: "Agent", def: "An AI system that plans, uses tools, and acts toward a goal in a loop — not just a single answer." },
  { term: "RAG", def: "Retrieval-Augmented Generation: grounding a model's answer in retrieved trusted documents." },
  { term: "MCP", def: "Model Context Protocol — a standard way for an agent to connect to a tool or data source." },
  { term: "A2A", def: "Agent-to-Agent protocol — lets agents from different vendors coordinate." },
  { term: "Digital Twin", def: "A live, data-fed virtual replica of a physical thing you can simulate on." },
  { term: "Human-in-the-loop", def: "A design where a person approves any consequential action the AI proposes." },
  { term: "Embedding", def: "A numeric vector representing the meaning of text, used for similarity search." },
  { term: "Orchestrator", def: "A lead agent that routes sub-tasks to specialised agents." },
];
