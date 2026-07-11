import type { ReactNode } from "react";

type BadgeTone = "neutral" | "violet" | "teal-dark";

const TONE: Record<BadgeTone, string> = {
  neutral: "border-line bg-surface text-muted",
  violet: "border-violet-glow bg-violet/5 text-violet-deep",
  /** Teal is only allowed with dark text (contrast 8.5:1). */
  "teal-dark": "border-teal bg-teal text-dark",
};

export function Badge({
  children,
  tone = "neutral",
  className = "",
}: Readonly<{ children: ReactNode; tone?: BadgeTone; className?: string }>) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs ${TONE[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
