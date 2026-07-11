import type { ReactNode } from "react";

/**
 * Section label — one deliberate system, used sparingly (max ~3 per page),
 * only where the label adds real information.
 */
export function Kicker({ children, dark = false }: Readonly<{ children: ReactNode; dark?: boolean }>) {
  return (
    <p className={`mb-3 font-mono text-sm ${dark ? "text-violet-glow" : "text-violet-deep"}`}>
      {children}
    </p>
  );
}
