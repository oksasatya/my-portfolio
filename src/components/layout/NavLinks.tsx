"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

// Same set in both locales — every page here has an EN + ID version.
const NAV_ITEMS = [
  { key: "projects", href: "/projects" },
  { key: "services", href: "/service" },
  { key: "articles", href: "/articles" },
  { key: "about", href: "/about" },
] as const;

export function NavLinks({
  className = "",
  onNavigate,
}: Readonly<{ className?: string; onNavigate?: () => void }>) {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <>
      {NAV_ITEMS.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.key}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={`transition-colors ${
              active ? "text-ink font-semibold" : "text-muted hover:text-ink"
            } ${className}`}
          >
            {t(item.key)}
          </Link>
        );
      })}
    </>
  );
}
