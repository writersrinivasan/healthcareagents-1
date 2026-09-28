"use client";

import { motion } from "framer-motion";
import { Pill } from "./Brand";

export interface SlideProps {
  index: number;
  total: number;
  kicker?: string;
  tone?: "gold" | "vital" | "red";
  children: React.ReactNode;
}

export function Slide({ index, total, kicker, tone = "gold", children }: SlideProps) {
  return (
    <motion.section
      key={index}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col justify-center px-6 py-10 sm:px-10"
    >
      {kicker && (
        <div className="mb-5 flex items-center gap-3">
          <Pill tone={tone}>{kicker}</Pill>
          <span className="text-xs font-medium tracking-[0.3em] text-white/30">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>
      )}
      {children}
    </motion.section>
  );
}

export function SlideTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
      {children}
    </h2>
  );
}
