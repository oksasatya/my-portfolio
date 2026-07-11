import { useLocale, useTranslations } from "next-intl";
import { Mail } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/ui/brand-icons";
import { CONTACT, GMAIL_COMPOSE, waLink } from "@/lib/contact";

// Structural per-locale link sets (labels come from messages where shared).
const PAGES: Record<string, readonly { label?: string; key?: string; href: string }[]> = {
  id: [
    { key: "projects", href: "/projects" },
    { key: "services", href: "/service" },
    { key: "articles", href: "/articles" },
    { key: "about", href: "/about" },
  ],
  en: [
    { key: "projects", href: "/projects" },
    { key: "services", href: "/service" },
    { key: "articles", href: "/articles" },
    { key: "about", href: "/about" },
  ],
};

const SECONDARY: Record<string, readonly { label: string; href: string }[]> = {
  id: [
    { label: "Jasa Pembuatan Website", href: "/jasa/pembuatan-website" },
    { label: "Jasa Pembuatan Aplikasi", href: "/jasa/pembuatan-aplikasi" },
    { label: "Jasa Pembuatan API", href: "/jasa/pembuatan-api" },
    { label: "Jasa Pembuatan Toko Online", href: "/jasa/pembuatan-toko-online" },
  ],
  en: [
    { label: "Dexova HRIS — Payroll & Attendance", href: "/projects/dexova-hris" },
    { label: "Dexova POS — Cashier & Reconciliation", href: "/projects/dexova-pos" },
  ],
};

export function Footer() {
  const locale = useLocale();
  const t = useTranslations("footer");
  const tn = useTranslations("nav");
  const th = useTranslations("header");

  const navLabel = (key: string): string => {
    if (key === "home") return t("home");
    return tn(key);
  };

  return (
    <footer className="border-t border-line bg-surface">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-lg font-bold tracking-tight">
              Oksa Satya<span className="text-violet-deep">.</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">{t("tagline")}</p>
          </div>

          <nav aria-label={t("pagesLabel")}>
            <p className="font-mono text-xs text-muted">{t("pagesLabel")}</p>
            <ul className="mt-3 space-y-2 text-sm">
              {PAGES[locale].map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="text-ink transition-colors hover:text-violet-deep">
                    {navLabel(p.key ?? "")}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t("servicesLabel")}>
            <p className="font-mono text-xs text-muted">{t("servicesLabel")}</p>
            <ul className="mt-3 space-y-2 text-sm">
              {SECONDARY[locale].map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-ink transition-colors hover:text-violet-deep">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-xs text-muted">{t("contactLabel")}</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href={waLink(th("waMessage"))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-ink transition-colors hover:text-violet-deep"
                >
                  <WhatsappIcon size={16} aria-hidden /> WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={GMAIL_COMPOSE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-ink transition-colors hover:text-violet-deep"
                >
                  <Mail size={16} aria-hidden /> Email
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-ink transition-colors hover:text-violet-deep"
                >
                  <GithubIcon size={16} /> GitHub
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-ink transition-colors hover:text-violet-deep"
                >
                  <LinkedinIcon size={16} /> LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-2 border-t border-line pt-6 text-xs text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} Oksa Satya. {t("rights")}
          </p>
          <p className="font-mono">Next.js · Go · Java · Laravel</p>
        </div>
      </Container>
    </footer>
  );
}
