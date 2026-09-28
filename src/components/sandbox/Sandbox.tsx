"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { retrieve, type KnowledgeChunk } from "@/lib/knowledge";

type StageStatus = "idle" | "running" | "done";

interface Scenario {
  id: string;
  label: string;
  icon: string;
  request: string;
  tools: string[];
  twin: string;
  outcome: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: "chest-pain",
    label: "Chest pain triage",
    icon: "❤️",
    request: "58-year-old with chest pain and shortness of breath — what next?",
    tools: ["EHR.getHistory()", "Labs.orderTroponin()", "Guidelines.search('ACS')"],
    twin: "Cardiac twin simulates ACS risk trajectory over the next 6 hours",
    outcome:
      "Priority triage recommended: draft ECG + troponin order and a cardiology page, pending clinician approval.",
  },
  {
    id: "prior-auth",
    label: "Prior authorization",
    icon: "✅",
    request: "Automate prior-auth for an MRI referral for chronic back pain.",
    tools: ["EHR.getReferral()", "Payer.getPolicy()", "Forms.autofill('PA-102')"],
    twin: "Pathway twin checks the referral against payer policy criteria",
    outcome:
      "Prior-auth packet assembled with matched policy criteria and citations, ready for a human to submit.",
  },
  {
    id: "capacity",
    label: "Hospital capacity",
    icon: "🏥",
    request: "Will the ER have enough beds this weekend?",
    tools: ["ADT.getCensus()", "Roster.getStaffing()", "Weather.getForecast()"],
    twin: "Hospital twin forecasts admissions vs. bed + staffing capacity",
    outcome:
      "Forecast shows a Saturday-night crunch; suggests opening 6 flex beds and one extra nurse shift for review.",
  },
];

const STAGES = [
  { key: "orchestrator", name: "Orchestrator", icon: "🧭", color: "#F6B300", note: "Plans the steps" },
  { key: "rag", name: "RAG Retriever", icon: "📚", color: "#22D3EE", note: "Grounds in evidence" },
  { key: "mcp", name: "MCP Tools", icon: "🔌", color: "#5EEAD4", note: "Calls real systems" },
  { key: "twin", name: "Digital Twin", icon: "🧬", color: "#12C9C0", note: "Simulates outcomes" },
  { key: "plan", name: "Care Planner", icon: "📝", color: "#FF5A3C", note: "Drafts the action" },
  { key: "human", name: "Human Sign-off", icon: "🧑‍⚕️", color: "#F5312B", note: "Clinician approves" },
] as const;

export function Sandbox() {
  const [scenario, setScenario] = useState<Scenario>(SCENARIOS[0]);
  const [active, setActive] = useState(-1);
  const [status, setStatus] = useState<StageStatus>("idle");
  const [evidence, setEvidence] = useState<KnowledgeChunk[]>([]);
  const [log, setLog] = useState<string[]>([]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  useEffect(() => () => clearTimers(), []);

  const run = useCallback(
    (sc: Scenario) => {
      clearTimers();
      setScenario(sc);
      setStatus("running");
      setActive(0);
      setLog([`▶ Request received: "${sc.request}"`]);
      setEvidence([]);

      const hits = retrieve(sc.request + " " + sc.label, 3);

      STAGES.forEach((stage, i) => {
        const t = setTimeout(() => {
          setActive(i);
          setLog((prev) => {
            const lines = [...prev];
            switch (stage.key) {
              case "orchestrator":
                lines.push("🧭 Orchestrator: decomposed the goal into 4 steps.");
                break;
              case "rag":
                lines.push(
                  `📚 RAG: retrieved ${hits.length} grounded chunk(s) — ${hits
                    .map((h) => h.topic)
                    .join(", ")}.`
                );
                setEvidence(hits);
                break;
              case "mcp":
                sc.tools.forEach((tool) => lines.push(`🔌 MCP → ${tool}`));
                break;
              case "twin":
                lines.push(`🧬 Twin: ${sc.twin}.`);
                break;
              case "plan":
                lines.push(`📝 Planner: ${sc.outcome}`);
                break;
              case "human":
                lines.push("🧑‍⚕️ Awaiting clinician approval — nothing acts without sign-off.");
                break;
            }
            return lines;
          });
          if (i === STAGES.length - 1) setStatus("done");
        }, 700 * (i + 1));
        timers.current.push(t);
      });
    },
    []
  );

  const reset = () => {
    clearTimers();
    setActive(-1);
    setStatus("idle");
    setLog([]);
    setEvidence([]);
  };

  return (
    <div className="glass rounded-2xl p-5">
      {/* scenario picker */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 text-xs uppercase tracking-widest text-white/40">
          Scenario
        </span>
        {SCENARIOS.map((sc) => (
          <button
            key={sc.id}
            onClick={() => run(sc)}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-all ${
              scenario.id === sc.id && status !== "idle"
                ? "border-yoto-amber bg-yoto-amber/15 text-yoto-gold"
                : "border-white/12 bg-white/5 text-white/70 hover:border-white/25"
            }`}
          >
            <span className="mr-1">{sc.icon}</span>
            {sc.label}
          </button>
        ))}
        <button
          onClick={reset}
          className="ml-auto rounded-full border border-white/12 bg-white/5 px-3 py-1.5 text-sm text-white/60 hover:text-white"
        >
          Reset
        </button>
      </div>

      {/* pipeline */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {STAGES.map((stage, i) => {
          const state: StageStatus =
            active > i || (active === i && status === "done")
              ? "done"
              : active === i
              ? "running"
              : "idle";
          return (
            <div key={stage.key} className="relative">
              <motion.div
                animate={{
                  scale: state === "running" ? 1.04 : 1,
                  opacity: state === "idle" ? 0.5 : 1,
                }}
                className="relative flex h-full flex-col items-center rounded-xl border p-3 text-center"
                style={{
                  borderColor:
                    state === "idle" ? "rgba(255,255,255,0.1)" : stage.color,
                  background:
                    state === "idle"
                      ? "rgba(255,255,255,0.03)"
                      : `${stage.color}18`,
                }}
              >
                {state === "running" && (
                  <span
                    className="absolute inset-0 rounded-xl"
                    style={{ boxShadow: `0 0 24px ${stage.color}66` }}
                  />
                )}
                <div className="text-2xl">{stage.icon}</div>
                <div className="mt-1 text-xs font-semibold text-white">
                  {stage.name}
                </div>
                <div className="mt-0.5 text-[10px] leading-tight text-white/50">
                  {stage.note}
                </div>
                {state === "done" && (
                  <span className="mt-1 text-[10px] font-bold" style={{ color: stage.color }}>
                    ✓
                  </span>
                )}
                {state === "running" && (
                  <span className="mt-1 text-[10px] text-white/60">…working</span>
                )}
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* evidence + log */}
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div>
          <h4 className="mb-2 text-xs uppercase tracking-widest text-vital-cyan">
            Retrieved evidence (RAG)
          </h4>
          <div className="scroll-slim max-h-40 space-y-2 overflow-y-auto">
            <AnimatePresence>
              {evidence.length === 0 && (
                <p className="text-sm text-white/35">
                  Run a scenario to see the grounding evidence the agent pulled.
                </p>
              )}
              {evidence.map((e) => (
                <motion.div
                  key={e.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="rounded-lg border border-vital-teal/20 bg-vital-teal/5 p-2.5"
                >
                  <div className="text-xs font-semibold text-vital-mint">
                    {e.topic}
                  </div>
                  <div className="mt-0.5 line-clamp-2 text-[11px] text-white/55">
                    {e.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div>
          <h4 className="mb-2 text-xs uppercase tracking-widest text-yoto-gold">
            Agent trace
          </h4>
          <div className="scroll-slim max-h-40 space-y-1 overflow-y-auto rounded-lg bg-black/30 p-3 font-mono text-[11px] leading-relaxed text-white/70">
            {log.length === 0 ? (
              <span className="text-white/30">// trace will stream here…</span>
            ) : (
              log.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {line}
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
