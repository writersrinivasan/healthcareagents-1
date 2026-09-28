"use client";

import Link from "next/link";
import { Logo } from "./Brand";

export function TopNav({ active }: { active: "present" | "learn" }) {
  const items: { href: string; label: string; key: "present" | "learn" }[] = [
    { href: "/", label: "Presentation", key: "present" },
    { href: "/learn", label: "Learning Hub", key: "learn" },
  ];
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 sm:px-10">
      <Logo />
      <nav className="glass flex items-center gap-1 rounded-full p-1">
        {items.map((it) => (
          <Link
            key={it.key}
            href={it.href}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              active === it.key
                ? "bg-gradient-to-r from-yoto-amber to-yoto-ember text-deep-900"
                : "text-white/60 hover:text-white"
            }`}
          >
            {it.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
