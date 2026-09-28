"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Slide, SlideTitle } from "@/components/ui/Slide";
import { Pill } from "@/components/ui/Brand";

function LearnMore({ lesson, label }: { lesson: string; label: string }) {
  return (
    <Link
      href={`/learn?lesson=${lesson}`}
      className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-yoto-amber/40 bg-yoto-amber/10 px-4 py-1.5 text-sm font-medium text-yoto-gold transition-colors hover:bg-yoto-amber/20"
    >
      📚 Deep dive: {label} →
    </Link>
  );
}

const stagger = {
  show: { transition: { staggerChildren: 0.08 } },
};
const rise = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={rise}
      className={`glass rounded-2xl p-5 transition-colors hover:border-white/20 ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* 1. TITLE                                                            */
/* ------------------------------------------------------------------ */
export function TitleSlide({ index, total }: { index: number; total: number }) {
  return (
    <Slide index={index} total={total}>
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex justify-center"
        >
          <Image
            src="/OneYotoLogo.png"
            alt="OneYoto"
            width={200}
            height={190}
            priority
            className="h-20 w-auto animate-floaty drop-shadow-[0_10px_40px_rgba(246,179,0,0.4)]"
          />
        </motion.div>

        <div className="mb-4 flex flex-wrap justify-center gap-2">
          <Pill tone="gold">Agentic AI</Pill>
          <Pill tone="vital">Digital Twin</Pill>
          <Pill tone="red">Healthcare</Pill>
        </div>

        <SlideTitle>
          <span className="text-gradient-gold">Agentic AI &amp; Digital Twins</span>
          <br />
          <span className="text-white">are rewriting healthcare</span>
        </SlideTitle>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
          A global look at what changed after autonomous agents and living digital
          twins arrived in the healthcare market — and how you can build in it.
        </p>

        <div className="mt-10 flex flex-col items-center gap-1 text-sm text-white/50">
          <span className="font-semibold text-white/80">Srinivasan Ramanujam</span>
          <span>Technology Forum · Live Interactive Session</span>
        </div>

        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity }}
          className="mt-10 text-xs uppercase tracking-[0.35em] text-white/40"
        >
          Press → or Space to begin
        </motion.div>
      </div>
    </Slide>
  );
}

/* ------------------------------------------------------------------ */
/* 2. SPEAKER                                                          */
/* ------------------------------------------------------------------ */
export function SpeakerSlide({ index, total }: { index: number; total: number }) {
  const stats = [
    { n: "25+", l: "Years in software engineering" },
    { n: "40,000+", l: "Professionals trained globally" },
    { n: "700+", l: "Educators mentored" },
    { n: "8", l: "Years in training & product" },
  ];
  return (
    <Slide index={index} total={total} kicker="Your speaker" tone="gold">
      <div className="grid items-center gap-10 md:grid-cols-[320px_1fr]">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto"
        >
          <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-tr from-yoto-amber/40 via-yoto-red/30 to-vital-teal/40 blur-xl" />
          <div className="ring-glow relative overflow-hidden rounded-[1.7rem] border border-white/10">
            <Image
              src="/speaker.png"
              alt="Srinivasan Ramanujam"
              width={420}
              height={420}
              priority
              className="h-auto w-full object-cover"
            />
          </div>
        </motion.div>

        <div>
          <SlideTitle>
            <span className="text-white">Srinivasan </span>
            <span className="text-gradient-gold">Ramanujam</span>
          </SlideTitle>
          <p className="mt-4 max-w-xl text-lg text-white/65">
            A quarter-century in software engineering, the last eight years at the
            intersection of deep technical work and teaching. I build products and
            I train the people who build them — now bringing that lens to agentic AI
            in healthcare.
          </p>

          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {stats.map((s) => (
              <motion.div
                key={s.l}
                variants={rise}
                className="glass rounded-xl p-4 text-center"
              >
                <div className="font-display text-2xl font-bold text-gradient-gold">
                  {s.n}
                </div>
                <div className="mt-1 text-[11px] leading-tight text-white/55">
                  {s.l}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </Slide>
  );
}

/* ------------------------------------------------------------------ */
/* 3. THE SHIFT                                                        */
/* ------------------------------------------------------------------ */
export function ShiftSlide({ index, total }: { index: number; total: number }) {
  return (
    <Slide index={index} total={total} kicker="The shift" tone="vital">
      <SlideTitle>
        From <span className="text-white/40 line-through">answering</span>{" "}
        <span className="text-gradient-vital">to acting</span>
      </SlideTitle>
      <p className="mt-4 max-w-2xl text-lg text-white/65">
        The last wave of AI answered questions. This wave completes work. Three
        capabilities crossed the line at once.
      </p>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="mt-8 grid gap-4 md:grid-cols-3"
      >
        <Card>
          <div className="text-3xl">🧭</div>
          <h3 className="mt-3 font-display text-xl font-semibold text-yoto-gold">
            Plan
          </h3>
          <p className="mt-2 text-sm text-white/60">
            Agents break a goal into steps, decide an order, and adapt when a step
            fails — instead of needing every instruction spelled out.
          </p>
        </Card>
        <Card>
          <div className="text-3xl">🔌</div>
          <h3 className="mt-3 font-display text-xl font-semibold text-vital-mint">
            Use tools
          </h3>
          <p className="mt-2 text-sm text-white/60">
            Through <b className="text-white/80">MCP</b> they reach real systems —
            EHRs, lab APIs, schedulers — over one standard interface.
          </p>
        </Card>
        <Card>
          <div className="text-3xl">🤝</div>
          <h3 className="mt-3 font-display text-xl font-semibold text-yoto-ember">
            Collaborate
          </h3>
          <p className="mt-2 text-sm text-white/60">
            Through <b className="text-white/80">A2A</b> a triage agent hands off to
            a scheduling agent — even across different vendors.
          </p>
        </Card>
      </motion.div>
    </Slide>
  );
}

/* ------------------------------------------------------------------ */
/* 4. DIGITAL TWIN                                                     */
/* ------------------------------------------------------------------ */
export function TwinSlide({ index, total }: { index: number; total: number }) {
  const twins = [
    { icon: "❤️", t: "Cardiac twin", d: "Simulate how a heart reacts to a drug or a stent before the procedure." },
    { icon: "🧑‍⚕️", t: "Patient twin", d: "A living model of one person's physiology to test a care plan virtually." },
    { icon: "🏥", t: "Hospital twin", d: "Forecast beds, staffing and ER flow before flu season lands." },
    { icon: "🧪", t: "Trial twin", d: "Simulate a cohort to de-risk and speed up clinical research." },
  ];
  return (
    <Slide index={index} total={total} kicker="Digital Twin" tone="vital">
      <SlideTitle>
        A <span className="text-gradient-vital">living model</span> you can
        experiment on
      </SlideTitle>
      <p className="mt-4 max-w-2xl text-lg text-white/65">
        A digital twin ingests real signals — labs, vitals, imaging, device
        telemetry — and simulates <i>what happens next</i>, so teams test an
        intervention virtually before touching the patient.
      </p>
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {twins.map((x) => (
          <Card key={x.t}>
            <div className="text-3xl">{x.icon}</div>
            <h3 className="mt-3 font-display text-lg font-semibold text-white">
              {x.t}
            </h3>
            <p className="mt-1 text-sm text-white/55">{x.d}</p>
          </Card>
        ))}
      </motion.div>
      <div className="mt-6 glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white/70">
        <span className="text-vital-mint">◆</span> The twin is the safe sandbox — the
        agent is what acts on it.
      </div>
      <div>
        <LearnMore lesson="twin-what" label="Digital Twins in full" />
      </div>
    </Slide>
  );
}

/* ------------------------------------------------------------------ */
/* 5. RAG                                                              */
/* ------------------------------------------------------------------ */
export function RagSlide({ index, total }: { index: number; total: number }) {
  const steps = [
    { n: "1", t: "Ingest", d: "Load guidelines, PDFs, EHR notes." },
    { n: "2", t: "Index", d: "Chunk, embed, store vectors + metadata." },
    { n: "3", t: "Retrieve", d: "Embed the question, pull nearest evidence." },
    { n: "4", t: "Generate", d: "Answer grounded in that evidence, with citations." },
  ];
  return (
    <Slide index={index} total={total} kicker="RAG · Grounding" tone="gold">
      <SlideTitle>
        <span className="text-gradient-gold">RAG</span> keeps the model honest
      </SlideTitle>
      <p className="mt-4 max-w-2xl text-lg text-white/65">
        Retrieval-Augmented Generation grounds answers in trusted documents instead
        of memory. Critical when the answer touches a patient.
      </p>
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="mt-8 grid gap-4 md:grid-cols-4"
      >
        {steps.map((s) => (
          <Card key={s.t}>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-yoto-amber/15 font-display font-bold text-yoto-gold">
              {s.n}
            </div>
            <h3 className="mt-3 font-display text-lg font-semibold text-white">
              {s.t}
            </h3>
            <p className="mt-1 text-sm text-white/55">{s.d}</p>
          </Card>
        ))}
      </motion.div>
      <div className="mt-6 glass rounded-xl border-l-2 border-yoto-red/60 p-4 text-sm text-white/70">
        <b className="text-yoto-ember">The misconception to kill:</b> RAG fixes
        &ldquo;the model didn&rsquo;t know this fact&rdquo; — it does <i>not</i> fix
        bad reasoning. Evaluate faithfulness and citations.
      </div>
      <div>
        <LearnMore lesson="rag-deep" label="the full RAG pipeline" />
      </div>
    </Slide>
  );
}

/* ------------------------------------------------------------------ */
/* 6. MCP + A2A                                                        */
/* ------------------------------------------------------------------ */
export function ProtocolsSlide({ index, total }: { index: number; total: number }) {
  return (
    <Slide index={index} total={total} kicker="Interoperability" tone="red">
      <SlideTitle>
        <span className="text-gradient-gold">MCP</span> &amp;{" "}
        <span className="text-gradient-vital">A2A</span> — the plumbing
      </SlideTitle>
      <p className="mt-4 max-w-2xl text-lg text-white/65">
        Two standards decide whether your agent is a demo or a deployable system.
      </p>
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="mt-8 grid gap-5 md:grid-cols-2"
      >
        <Card className="border-yoto-amber/25">
          <Pill tone="gold">MCP · Model Context Protocol</Pill>
          <h3 className="mt-3 font-display text-2xl font-semibold text-white">
            Agent → Tool
          </h3>
          <p className="mt-2 text-white/60">
            One standard interface to reach a database, an EHR API, a lab system or
            a file store — instead of a bespoke connector for each. The{" "}
            <b className="text-yoto-gold">&ldquo;USB-C for AI tools&rdquo;</b>. From
            Anthropic.
          </p>
        </Card>
        <Card className="border-vital-teal/25">
          <Pill tone="vital">A2A · Agent to Agent</Pill>
          <h3 className="mt-3 font-display text-2xl font-semibold text-white">
            Agent → Agent
          </h3>
          <p className="mt-2 text-white/60">
            Lets agents from different teams and vendors coordinate across framework
            boundaries — a triage agent handing off to the hospital&rsquo;s scheduler.
            Backed by Google, now under the Linux Foundation.
          </p>
        </Card>
      </motion.div>
      <div className="mt-6 text-center text-sm text-white/50">
        Keep it straight: <b className="text-white/80">MCP connects an agent to a
        tool</b>; <b className="text-white/80">A2A connects an agent to another
        agent</b>.
      </div>
      <div className="text-center">
        <LearnMore lesson="protocols-deep" label="MCP, A2A & more protocols" />
      </div>
    </Slide>
  );
}

/* ------------------------------------------------------------------ */
/* 7. MARKET / OPPORTUNITY                                             */
/* ------------------------------------------------------------------ */
export function MarketSlide({ index, total }: { index: number; total: number }) {
  const plays = [
    { icon: "🎙️", t: "Ambient documentation", d: "Draft the clinical note from the conversation." },
    { icon: "✅", t: "Prior-auth automation", d: "Turn days of paperwork into minutes." },
    { icon: "🧭", t: "Triage & navigation", d: "Route patients to the right care, faster." },
    { icon: "🩻", t: "Imaging triage", d: "Flag the urgent scan in the queue." },
    { icon: "🏥", t: "Operational twins", d: "Forecast capacity and staffing." },
    { icon: "🔬", t: "Research twins", d: "Simulate trial cohorts to de-risk studies." },
  ];
  return (
    <Slide index={index} total={total} kicker="Where to build" tone="gold">
      <SlideTitle>
        The opening for <span className="text-gradient-gold">founders</span>
      </SlideTitle>
      <p className="mt-4 max-w-2xl text-lg text-white/65">
        Healthcare adopts fast because the pain is concrete: documentation load,
        burnout, admin cost, uneven access. The winning pattern is{" "}
        <b className="text-white/85">narrow, measurable, human-in-the-loop</b> —
        not a general &ldquo;AI doctor&rdquo;.
      </p>
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {plays.map((p) => (
          <Card key={p.t}>
            <div className="text-2xl">{p.icon}</div>
            <h3 className="mt-2 font-display text-lg font-semibold text-white">
              {p.t}
            </h3>
            <p className="mt-1 text-sm text-white/55">{p.d}</p>
          </Card>
        ))}
      </motion.div>
    </Slide>
  );
}

/* ------------------------------------------------------------------ */
/* 8. SANDBOX INTRO (interactive lives on this slide via children)     */
/* ------------------------------------------------------------------ */
export function SandboxSlide({
  index,
  total,
  children,
}: {
  index: number;
  total: number;
  children: React.ReactNode;
}) {
  return (
    <Slide index={index} total={total} kicker="Live sandbox" tone="vital">
      <SlideTitle>
        Play with an <span className="text-gradient-vital">agentic pipeline</span>
      </SlideTitle>
      <p className="mt-3 max-w-2xl text-white/65">
        A patient request flows through a multi-agent system using RAG + MCP. Fire a
        scenario and watch each stage light up.
      </p>
      <div className="mt-6">{children}</div>
    </Slide>
  );
}

/* ------------------------------------------------------------------ */
/* 9. ASSISTANT SLIDE                                                  */
/* ------------------------------------------------------------------ */
export function AssistantSlide({
  index,
  total,
  children,
}: {
  index: number;
  total: number;
  children: React.ReactNode;
}) {
  return (
    <Slide index={index} total={total} kicker="Ask the AI · GROQ" tone="gold">
      <SlideTitle>
        Your turn — <span className="text-gradient-gold">ask anything</span>
      </SlideTitle>
      <p className="mt-3 max-w-2xl text-white/65">
        A GROQ-powered assistant, grounded (RAG) in this session&rsquo;s knowledge
        base. Try &ldquo;How do MCP and A2A differ?&rdquo; or &ldquo;Give me a
        startup idea using a hospital twin.&rdquo;
      </p>
      <div className="mt-6">{children}</div>
    </Slide>
  );
}

/* ------------------------------------------------------------------ */
/* 10. CLOSE                                                           */
/* ------------------------------------------------------------------ */
export function CloseSlide({ index, total }: { index: number; total: number }) {
  return (
    <Slide index={index} total={total}>
      <div className="text-center">
        <Image
          src="/OneYotoLogo.png"
          alt="OneYoto"
          width={180}
          height={170}
          className="mx-auto h-16 w-auto animate-floaty"
        />
        <SlideTitle>
          <span className="text-white">Build the </span>
          <span className="text-gradient-gold">assistive</span>
          <span className="text-white"> future</span>
        </SlideTitle>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/60">
          Agents act, twins simulate, clinicians decide. Start narrow, stay
          grounded, keep a human in the loop — and ship something real.
        </p>
        <div className="mt-8 text-sm text-white/50">
          Thank you — <span className="text-white/80">Srinivasan Ramanujam</span>
        </div>
      </div>
    </Slide>
  );
}
