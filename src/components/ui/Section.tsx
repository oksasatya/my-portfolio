import type { ReactNode } from "react";
import { Container } from "./Container";

type SectionProps = Readonly<{
  children: ReactNode;
  id?: string;
  /** Dark navy rhythm sections (#0B1020). */
  dark?: boolean;
  /** Extra classes on the outer <section>. */
  className?: string;
  /** Set false to opt out of the shared Container (full-bleed content). */
  contained?: boolean;
  ariaLabel?: string;
}>;

export function Section({
  children,
  id,
  dark = false,
  className = "",
  contained = true,
  ariaLabel,
}: SectionProps) {
  const tone = dark ? "bg-dark text-white" : "";
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`relative py-16 sm:py-20 lg:py-28 ${tone} ${className}`}
    >
      {contained ? <Container>{children}</Container> : children}
    </section>
  );
}
