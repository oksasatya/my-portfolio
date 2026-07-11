/**
 * Minimal inline flag SVGs for the two locales the site supports.
 * Kept dependency-free (no flag-icon package) — only ID + GB are needed.
 * The GB diagonals are drawn symmetric (no heraldic counterchange); at the
 * ~20px size this renders in, the simplification is invisible and lets the
 * component stay server-safe (no clipPath ids, no useId, no "use client").
 */

type FlagProps = Readonly<{ className?: string }>;

export function FlagID({ className }: FlagProps) {
  return (
    <svg viewBox="0 0 3 2" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden focusable="false">
      <rect width="3" height="1" fill="#e70011" />
      <rect width="3" height="1" y="1" fill="#ffffff" />
    </svg>
  );
}

export function FlagGB({ className }: FlagProps) {
  return (
    <svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden focusable="false">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0 0l60 30M60 0L0 30" stroke="#ffffff" strokeWidth="6" />
      <path d="M0 0l60 30M60 0L0 30" stroke="#c8102e" strokeWidth="4" />
      <path d="M30 0v30M0 15h60" stroke="#ffffff" strokeWidth="10" />
      <path d="M30 0v30M0 15h60" stroke="#c8102e" strokeWidth="6" />
    </svg>
  );
}
