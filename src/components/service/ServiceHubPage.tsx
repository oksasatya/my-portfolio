import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { waLink } from "@/lib/contact";
import { serviceLandings } from "@/data/services";
import { getCaseStudiesByLocale } from "@/data/locale-data";
import type { Locale } from "@/i18n/routing";

const PROOF_SLUGS: Record<Locale, readonly string[]> = {
  id: ["dexova-erp", "helixio"],
  en: ["dexova-erp", "dexova-hris"],
};

// English service cards (the /jasa landing pages are Indonesian-only).
const SERVICES_EN = [
  {
    title: "Web Application Development",
    description:
      "Custom web apps end-to-end: dashboards, internal tools, and customer-facing systems with a solid backend behind them.",
    stack: "Next.js · Go · Laravel · PostgreSQL",
  },
  {
    title: "API & System Integration",
    description:
      "Reliable REST APIs and integrations — payment gateways, HRIS, logistics, email — with secure webhook design.",
    stack: "Go · Java / Spring Boot · Webhooks · HMAC",
  },
  {
    title: "Business Systems (HRIS / POS / Inventory)",
    description:
      "The kind of systems I run in production at Dexova: payroll engines, attendance, cashier flows, and stock management.",
    stack: "Go · Next.js · Midtrans · Multi-tenant",
  },
  {
    title: "Websites & E-commerce",
    description:
      "Fast, SEO-ready company profiles, landing pages, and online stores with proper payment integration.",
    stack: "Next.js · Laravel · Midtrans",
  },
];

export function ServiceHubPage() {
  const locale = useLocale() as Locale;
  const t = useTranslations("servicePage");
  const proof = PROOF_SLUGS[locale]
    .map((s) => getCaseStudiesByLocale(locale).find((c) => c.slug === s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  const caseBase = locale === "en" ? "/en/projects" : "/projects";

  return (
    <>
      <Header />
      <main>
        <div className="border-b border-line">
          <Container className="py-14 sm:py-20">
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{t("intro")}</p>
            <div className="mt-8">
              <Button href={waLink(t("waMessage"))} external size="lg">
                {t("cta")}
              </Button>
            </div>
          </Container>
        </div>

        <Section ariaLabel={t("listLabel")}>
          <div className="grid gap-6 md:grid-cols-2">
            {locale === "en"
              ? SERVICES_EN.map((s) => (
                  <div
                    key={s.title}
                    className="flex h-full flex-col rounded-xl border border-line bg-surface p-7"
                  >
                    <h2 className="font-display text-xl font-semibold">{s.title}</h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                      {s.description}
                    </p>
                    <p className="mt-4 font-mono text-xs text-muted">{s.stack}</p>
                  </div>
                ))
              : serviceLandings.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/jasa/${s.slug}`}
                    className="group flex h-full flex-col rounded-xl border border-line bg-surface p-7 transition-colors hover:border-violet-glow"
                  >
                    <h2 className="font-display text-xl font-semibold transition-colors group-hover:text-violet-deep">
                      {s.h1}
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                      {s.tagline}
                    </p>
                    <p className="mt-4 font-mono text-xs text-muted">
                      {s.stack.slice(0, 4).join(" · ")}
                    </p>
                    <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-violet-deep">
                      {t("learn")} <ArrowRight size={14} aria-hidden />
                    </p>
                  </Link>
                ))}
          </div>
        </Section>

        <Section className="border-t border-line bg-surface" ariaLabel={t("proofTitle")}>
          <h2 className="text-2xl font-bold sm:text-3xl">{t("proofTitle")}</h2>
          <p className="mt-3 max-w-xl text-muted">{t("proofIntro")}</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {proof.map((c) => (
              <Link
                key={c.slug}
                href={`${caseBase}/${c.slug}`}
                className="group rounded-xl border border-line bg-bg p-6 transition-colors hover:border-violet-glow"
              >
                <Badge>{c.category}</Badge>
                <p className="mt-3 font-display text-lg font-semibold transition-colors group-hover:text-violet-deep">
                  {c.title}
                </p>
                <p className="mt-2 text-sm text-muted">{c.tagline}</p>
              </Link>
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
