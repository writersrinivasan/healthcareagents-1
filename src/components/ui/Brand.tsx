import Image from "next/image";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Image
        src="/OneYotoLogo.png"
        alt="OneYoto"
        width={132}
        height={126}
        priority
        className="h-9 w-auto drop-shadow-[0_4px_20px_rgba(246,179,0,0.35)]"
      />
      <span className="hidden text-xs font-medium uppercase tracking-[0.32em] text-white/45 sm:block">
        Technology Forum
      </span>
    </div>
  );
}

export function Pill({
  children,
  tone = "gold",
}: {
  children: React.ReactNode;
  tone?: "gold" | "vital" | "red" | "muted";
}) {
  const tones: Record<string, string> = {
    gold: "border-yoto-amber/40 bg-yoto-amber/10 text-yoto-gold",
    vital: "border-vital-teal/40 bg-vital-teal/10 text-vital-mint",
    red: "border-yoto-red/40 bg-yoto-red/10 text-yoto-ember",
    muted: "border-white/15 bg-white/5 text-white/70",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
