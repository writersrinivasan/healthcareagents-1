"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Pill } from "@/components/ui/Brand";

interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: string[];
  demo?: boolean;
}

const SUGGESTIONS = [
  "How do MCP and A2A differ?",
  "Give me a startup idea using a hospital twin",
  "Why pair Agentic AI with a Digital Twin?",
  "How does RAG keep a clinical answer safe?",
];

export function Assistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm the OneYoto Healthcare AI Assistant, grounded in this session's knowledge base. Ask me about Agentic AI, Digital Twins, RAG, MCP or where founders should build.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || loading) return;
    const next: Message[] = [...messages, { role: "user", content: q }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map(({ role, content }) => ({ role, content })),
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.content ?? "No response.",
          sources: data.sources,
          demo: data.demo,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Network error — is the dev server running?" },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glass flex h-[440px] flex-col rounded-2xl p-4">
      {/* messages */}
      <div ref={scrollRef} className="scroll-slim flex-1 space-y-3 overflow-y-auto pr-1">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-yoto-amber/20 text-white"
                  : "bg-white/6 text-white/85"
              }`}
            >
              <p className="whitespace-pre-wrap">{m.content}</p>
              {m.sources && m.sources.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {m.demo && <Pill tone="muted">demo mode</Pill>}
                  {m.sources.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-vital-teal/25 bg-vital-teal/5 px-2 py-0.5 text-[10px] text-vital-mint"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl bg-white/6 px-4 py-3">
              <span className="flex gap-1">
                {[0, 1, 2].map((d) => (
                  <motion.span
                    key={d}
                    className="h-2 w-2 rounded-full bg-yoto-gold"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: d * 0.2 }}
                  />
                ))}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* suggestions */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => send(s)}
            disabled={loading}
            className="rounded-full border border-white/12 bg-white/5 px-2.5 py-1 text-[11px] text-white/60 transition-colors hover:border-yoto-amber/40 hover:text-white disabled:opacity-40"
          >
            {s}
          </button>
        ))}
      </div>

      {/* input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="mt-3 flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about agentic AI in healthcare…"
          className="flex-1 rounded-xl border border-white/12 bg-black/30 px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-yoto-amber/50"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="rounded-xl bg-gradient-to-r from-yoto-amber to-yoto-ember px-4 py-2.5 text-sm font-semibold text-deep-900 transition-opacity disabled:opacity-40"
        >
          Send
        </button>
      </form>
    </div>
  );
}
