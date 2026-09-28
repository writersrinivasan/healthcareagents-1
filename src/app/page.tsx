"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { TopNav } from "@/components/ui/TopNav";
import { Sandbox } from "@/components/sandbox/Sandbox";
import { Assistant } from "@/components/assistant/Assistant";
import {
  TitleSlide,
  SpeakerSlide,
  ShiftSlide,
  TwinSlide,
  RagSlide,
  ProtocolsSlide,
  MarketSlide,
  SandboxSlide,
  AssistantSlide,
  CloseSlide,
} from "@/components/slides/slides";

export default function Page() {
  const slides = [
    (i: number, t: number) => <TitleSlide index={i} total={t} />,
    (i: number, t: number) => <SpeakerSlide index={i} total={t} />,
    (i: number, t: number) => <ShiftSlide index={i} total={t} />,
    (i: number, t: number) => <TwinSlide index={i} total={t} />,
    (i: number, t: number) => <RagSlide index={i} total={t} />,
    (i: number, t: number) => <ProtocolsSlide index={i} total={t} />,
    (i: number, t: number) => <MarketSlide index={i} total={t} />,
    (i: number, t: number) => (
      <SandboxSlide index={i} total={t}>
        <Sandbox />
      </SandboxSlide>
    ),
    (i: number, t: number) => (
      <AssistantSlide index={i} total={t}>
        <Assistant />
      </AssistantSlide>
    ),
    (i: number, t: number) => <CloseSlide index={i} total={t} />,
  ];

  const total = slides.length;
  const [i, setI] = useState(0);

  const go = useCallback(
    (dir: number) => setI((prev) => Math.min(total - 1, Math.max(0, prev + dir))),
    [total]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return; // don't hijack the chat box
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "Home") {
        setI(0);
      } else if (e.key === "End") {
        setI(total - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, total]);

  return (
    <main className="relative flex min-h-screen flex-col">
      {/* top bar */}
      <TopNav active="present" />

      {/* progress bar */}
      <div className="fixed left-0 top-0 z-40 h-0.5 w-full bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-yoto-amber via-yoto-ember to-yoto-red transition-all duration-500"
          style={{ width: `${((i + 1) / total) * 100}%` }}
        />
      </div>

      {/* slide stage */}
      <div className="flex flex-1 items-center">
        <AnimatePresence mode="wait">{slides[i](i, total)}</AnimatePresence>
      </div>

      {/* footer nav */}
      <footer className="sticky bottom-0 z-30 flex items-center justify-between px-6 py-4 sm:px-10">
        <button
          onClick={() => go(-1)}
          disabled={i === 0}
          className="glass rounded-full px-4 py-2 text-sm text-white/70 transition-opacity hover:text-white disabled:opacity-30"
        >
          ← Prev
        </button>

        <div className="flex items-center gap-1.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all ${
                idx === i ? "w-6 bg-yoto-amber" : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => go(1)}
          disabled={i === total - 1}
          className="glass rounded-full px-4 py-2 text-sm text-white/70 transition-opacity hover:text-white disabled:opacity-30"
        >
          Next →
        </button>
      </footer>
    </main>
  );
}
