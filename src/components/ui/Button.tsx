import type { ReactNode } from "react";
import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost" | "inverse";
type ButtonSize = "md" | "lg";

const VARIANT: Record<ButtonVariant, string> = {
  primary:
    "bg-violet text-dark hover:bg-violet-deep active:bg-violet-deep font-semibold shadow-sm",
  secondary:
    "border border-line bg-surface text-ink hover:border-violet-deep hover:text-violet-deep",
  ghost: "text-violet-deep hover:text-ink",
  /** For dark sections. */
  inverse: "bg-white text-dark hover:bg-violet-glow",
};

const SIZE: Record<ButtonSize, string> = {
  md: "min-h-11 px-5 py-2.5 text-sm",
  lg: "min-h-12 px-7 py-3 text-base",
};

type ButtonProps = Readonly<{
  children: ReactNode;
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  external?: boolean;
  className?: string;
}>;

/** Link styled as a button. All CTAs on the site are navigations, not actions. */
export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  external = false,
  className = "",
}: ButtonProps) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-200 ${VARIANT[variant]} ${SIZE[size]} ${className}`;
  // mailto:/tel: must NOT open in a new tab — the browser hands the URL to the
  // OS handler and leaves a blank "Untitled" tab hanging when there is none.
  // Render a plain in-place anchor so the mail/phone app is invoked without
  // navigating away.
  if (href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
