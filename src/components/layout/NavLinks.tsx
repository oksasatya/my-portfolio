"use client";

import { ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

// Same set in both locales — every page here has an EN + ID version.
const NAV_ITEMS = [
  { key: "projects", href: "/projects" },
  { key: "services", href: "/service" },
  { key: "articles", href: "/articles" },
  { key: "about", href: "/about" },
] as const;

// Structural per-locale dropdown entries under "Services" (labels are content,
// like the Footer's SECONDARY lists). EN only lists the landings that exist
// in English.
const SERVICE_MENU: Record<string, readonly { label: string; href: string }[]> = {
  id: [
    { label: "Website & Landing Page", href: "/jasa/pembuatan-website" },
    { label: "Aplikasi Web & Dashboard", href: "/jasa/pembuatan-aplikasi" },
    { label: "API & Integrasi Sistem", href: "/jasa/pembuatan-api" },
    { label: "Toko Online / E-commerce", href: "/jasa/pembuatan-toko-online" },
    { label: "Sistem Kasir (POS)", href: "/jasa/sistem-pos-kasir" },
    { label: "Sistem HRIS & Payroll", href: "/jasa/sistem-hris-payroll" },
  ],
  en: [
    { label: "API & System Integration", href: "/jasa/pembuatan-api" },
    { label: "Custom POS System", href: "/jasa/sistem-pos-kasir" },
    { label: "HRIS & Payroll System", href: "/jasa/sistem-hris-payroll" },
  ],
};

export function NavLinks({
  className = "",
  onNavigate,
  variant = "desktop",
}: Readonly<{
  className?: string;
  onNavigate?: () => void;
  variant?: "desktop" | "mobile";
}>) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const services = SERVICE_MENU[locale] ?? SERVICE_MENU.id;

  const linkCls = (active: boolean) =>
    `transition-colors ${active ? "text-ink font-semibold" : "text-muted hover:text-ink"} ${className}`;

  return (
    <>
      {NAV_ITEMS.map((item) => {
        const active =
          pathname === item.href ||
          pathname.startsWith(`${item.href}/`) ||
          (item.key === "services" && pathname.startsWith("/jasa"));

        if (item.key !== "services") {
          return (
            <Link
              key={item.key}
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={linkCls(active)}
            >
              {t(item.key)}
            </Link>
          );
        }

        if (variant === "mobile") {
          return (
            <div key={item.key}>
              <Link
                href={item.href}
                onClick={onNavigate}
                aria-current={active ? "page" : undefined}
                className={linkCls(active)}
              >
                {t(item.key)}
              </Link>
              <ul className="mb-2 ml-5 mt-1 space-y-1 border-l border-line pl-4">
                {services.map((s) => (
                  <li key={s.href}>
                    <Link
                      href={s.href}
                      onClick={onNavigate}
                      className="flex min-h-10 items-center text-base text-muted transition-colors hover:text-ink"
                    >
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        }

        // Desktop: hover/focus dropdown. The trigger itself still navigates to
        // the /service hub, so the menu is progressive enhancement.
        return (
          <div key={item.key} className="group relative">
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`inline-flex items-center gap-1 ${linkCls(active)}`}
            >
              {t(item.key)}
              <ChevronDown
                size={14}
                aria-hidden
                className="transition-transform group-hover:rotate-180"
              />
            </Link>
            {/* pt-3 bridges the hover gap between trigger and panel. */}
            <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0 transition-all duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <ul className="w-64 rounded-xl border border-line bg-surface p-2 shadow-xl shadow-black/30">
                {services.map((s) => (
                  <li key={s.href}>
                    <Link
                      href={s.href}
                      className="flex min-h-10 items-center rounded-lg px-3 text-sm text-muted transition-colors hover:bg-bg hover:text-ink"
                    >
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </>
  );
}
