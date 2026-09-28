"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CURRICULUM,
  GLOSSARY,
  type Lesson,
  type Section,
  type Callout,
} from "@/lib/curriculum";
import { Pill } from "@/components/ui/Brand";

const CALLOUT_STYLE: Record<Callout["kind"], { border: string; bg: string; label: string; color: string }> = {
  key: { border: "border-yoto-amber/50", bg: "bg-yoto-amber/10", label: "Key idea", color: "text-yoto-gold" },
  note: { border: "border-vital-teal/40", bg: "bg-vital-teal/10", label: "Note", color: "text-vital-mint" },
  tip: { border: "border-emerald-400/40", bg: "bg-emerald-400/10", label: "Tip", color: "text-emerald-300" },
  warning: { border: "border-yoto-red/50", bg: "bg-yoto-red/10", label: "Watch out", color: "text-yoto-ember" },
};

function CalloutBox({ callout }: { callout: Callout }) {
  const s = CALLOUT_STYLE[callout.kind];
  return (
    <div className={`my-4 rounded-xl border-l-4 ${s.border} ${s.bg} p-4`}>
      <div className={`mb-1 text-xs font-bold uppercase tracking-wider ${s.color}`}>
        {s.label}
      </div>
      <p className="text-sm leading-relaxed text-white/80">{callout.text}</p>
    </div>
  );
}

function SectionBlock({ section }: { section: Section }) {
  return (
    <div className="mb-8">
      <h3 className="mb-2 font-display text-xl font-semibold text-white">
        {section.heading}
      </h3>
      <p className="text-[15px] leading-relaxed text-white/70">{section.body}</p>

      {section.bullets && (
        <ul className="mt-3 space-y-1.5">
          {section.bullets.map((b, i) => (
            <li key={i} className="flex gap-2 text-[15px] leading-relaxed text-white/70">
              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-yoto-amber" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}

      {section.callout && <CalloutBox callout={section.callout} />}

      {section.table && (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-white/15">
                {section.table.headers.map((h) => (
                  <th key={h} className="px-3 py-2 font-semibold text-yoto-gold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.table.rows.map((row, ri) => (
                <tr key={ri} className="border-b border-white/5 align-top">
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className={`px-3 py-2 text-white/70 ${ci === 0 ? "font-medium text-white/90" : ""}`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function LessonReader({ lesson }: { lesson: Lesson }) {
  return (
    <motion.article
      key={lesson.id}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="glass rounded-2xl p-6 sm:p-8"
    >
      <div className="mb-1 flex items-center gap-3">
        <Pill tone="muted">⏱ {lesson.minutes} min read</Pill>
      </div>
      <h2 className="mt-2 font-display text-3xl font-bold text-gradient-gold">
        {lesson.title}
      </h2>
      <p className="mt-2 text-white/60">{lesson.summary}</p>
      <hr className="my-6 border-white/10" />
      {lesson.sections.map((s, i) => (
        <SectionBlock key={i} section={s} />
      ))}
    </motion.article>
  );
}

export function LearningHub({ initialLesson }: { initialLesson?: string }) {
  const allLessons = useMemo(
    () => CURRICULUM.flatMap((t) => t.lessons.map((l) => l.id)),
    []
  );
  const [current, setCurrent] = useState(
    initialLesson && allLessons.includes(initialLesson)
      ? initialLesson
      : CURRICULUM[0].lessons[0].id
  );

  const lesson = useMemo(() => {
    for (const t of CURRICULUM) {
      const found = t.lessons.find((l) => l.id === current);
      if (found) return found;
    }
    return CURRICULUM[0].lessons[0];
  }, [current]);

  // Prev / next across the whole curriculum
  const flat = useMemo(() => CURRICULUM.flatMap((t) => t.lessons), []);
  const idx = flat.findIndex((l) => l.id === current);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-8">
      <div className="mb-6">
        <h1 className="font-display text-4xl font-bold sm:text-5xl">
          <span className="text-white">Learning </span>
          <span className="text-gradient-gold">Hub</span>
        </h1>
        <p className="mt-2 max-w-2xl text-white/60">
          The deep-dive companion to the talk — every concept in Agentic AI and
          Digital Twins, explained in detail. Pick a lesson to begin.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Sidebar menu */}
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="glass scroll-slim max-h-[70vh] overflow-y-auto rounded-2xl p-3">
            {CURRICULUM.map((track) => (
              <div key={track.id} className="mb-4 last:mb-0">
                <div className="flex items-center gap-2 px-2 py-2">
                  <span className="text-lg">{track.icon}</span>
                  <span
                    className={`font-display text-sm font-bold uppercase tracking-wider ${
                      track.tone === "vital" ? "text-vital-mint" : "text-yoto-gold"
                    }`}
                  >
                    {track.title}
                  </span>
                </div>
                <p className="px-2 pb-2 text-[11px] leading-snug text-white/40">
                  {track.blurb}
                </p>
                <ul className="space-y-0.5">
                  {track.lessons.map((l) => (
                    <li key={l.id}>
                      <button
                        onClick={() => setCurrent(l.id)}
                        className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                          current === l.id
                            ? "bg-white/10 font-medium text-white"
                            : "text-white/60 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        {l.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Glossary */}
            <div className="mt-4 border-t border-white/10 pt-3">
              <div className="px-2 py-1 font-display text-sm font-bold uppercase tracking-wider text-vital-cyan">
                📖 Glossary
              </div>
              <dl className="space-y-2 px-2 pt-2">
                {GLOSSARY.map((g) => (
                  <div key={g.term}>
                    <dt className="text-xs font-semibold text-white/85">{g.term}</dt>
                    <dd className="text-[11px] leading-snug text-white/45">{g.def}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </aside>

        {/* Reader */}
        <div>
          <AnimatePresence mode="wait">
            <LessonReader lesson={lesson} />
          </AnimatePresence>

          {/* prev / next */}
          <div className="mt-5 flex items-center justify-between">
            <button
              onClick={() => idx > 0 && setCurrent(flat[idx - 1].id)}
              disabled={idx <= 0}
              className="glass rounded-full px-4 py-2 text-sm text-white/70 transition-opacity hover:text-white disabled:opacity-30"
            >
              ← {idx > 0 ? flat[idx - 1].title : "Start"}
            </button>
            <button
              onClick={() => idx < flat.length - 1 && setCurrent(flat[idx + 1].id)}
              disabled={idx >= flat.length - 1}
              className="glass rounded-full px-4 py-2 text-sm text-white/70 transition-opacity hover:text-white disabled:opacity-30"
            >
              {idx < flat.length - 1 ? flat[idx + 1].title : "End"} →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
