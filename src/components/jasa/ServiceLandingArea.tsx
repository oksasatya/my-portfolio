import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { WhatsappIcon } from "@/components/ui/brand-icons";
import { DotGridBackdrop, ContourBackdrop } from "@/components/ui/backdrops";
import { waLink } from "@/lib/contact";
import { serviceLandings, type ServiceLanding } from "@/data/services";
import { serviceLandingsEn } from "@/data/services-en";
import { getCaseStudyByLocale } from "@/data/locale-data";
import type { Locale } from "@/i18n/routing";

const DOMAIN = "https://oksasatya.dev";

const UI = {
  id: {
    crumbHome: "Beranda",
    crumbServices: "Layanan",
    ctaPrimary: "Diskusi gratis via WhatsApp",
    ctaSecondary: "Lihat contoh proyek",
    trust: ["4+ tahun aplikasi enterprise (Dubai)", "Respon < 24 jam", "Estimasi gratis"],
    whyTitle: "Kenapa ini penting",
    getTitle: "Yang Anda dapat",
    processTitle: "Transparan dari awal sampai rilis",
    proofTitle: "Sudah dipakai di proyek production",
    stackLabel: "Tech stack",
    estimateLabel: "Estimasi biaya",
    estimateCta: "Minta estimasi",
    faqTitle: "Yang sering ditanyakan",
    ctaTitle: "Ceritakan kebutuhan Anda",
    ctaBody:
      "Diskusi & estimasi gratis, tanpa komitmen. Biasanya saya balas dalam kurang dari 24 jam.",
    ctaButton: "Chat WhatsApp sekarang",
    othersLabel: "Layanan lain:",
    asideLabel: "Detail layanan",
    waMessage: (keyword: string) => `Halo Oksa, saya tertarik dengan ${keyword}. Boleh diskusi?`,
  },
  en: {
    crumbHome: "Home",
    crumbServices: "Services",
    ctaPrimary: "Free consultation via WhatsApp",
    ctaSecondary: "See example projects",
    trust: ["4+ years of enterprise apps (Dubai)", "Replies < 24 hours", "Free estimate"],
    whyTitle: "Why this matters",
    getTitle: "What you get",
    processTitle: "Transparent from kickoff to release",
    proofTitle: "Proven in production projects",
    stackLabel: "Tech stack",
    estimateLabel: "Cost estimate",
    estimateCta: "Request an estimate",
    faqTitle: "Frequently asked questions",
    ctaTitle: "Tell me what you need",
    ctaBody: "Free discussion & estimate, no commitment. I usually reply within 24 hours.",
    ctaButton: "Chat on WhatsApp",
    othersLabel: "Other services:",
    asideLabel: "Service details",
    waMessage: (keyword: string) =>
      `Hi Oksa, I'm interested in ${keyword}. Can we discuss my project?`,
  },
} as const;

export default function ServiceLandingArea({
  landing: s,
  locale,
}: {
  readonly landing: ServiceLanding;
  readonly locale: Locale;
}) {
  const ui = UI[locale] ?? UI.id;
  const base = locale === "en" ? "/en" : "";
  const url = `${DOMAIN}${base}/jasa/${s.slug}`;
  const waHref = waLink(ui.waMessage(s.keyword));

  const related = s.relatedProjects
    .map((slug) => getCaseStudyByLocale(locale, slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const allLandings = locale === "en" ? serviceLandingsEn : serviceLandings;
  const others = allLandings.filter((o) => o.slug !== s.slug);

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.h1,
    serviceType: s.keyword,
    description: s.metaDescription,
    url,
    inLanguage: locale,
    provider: { "@type": "Person", name: "Oksa Satya", url: DOMAIN },
    areaServed: ["Indonesia", "Worldwide"],
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: ui.crumbHome, item: `${DOMAIN}${base || "/"}` },
      { "@type": "ListItem", position: 2, name: ui.crumbServices, item: `${DOMAIN}${base}/service` },
      { "@type": "ListItem", position: 3, name: s.h1, item: url },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: s.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd id="service-ld" data={serviceLd} />
      <JsonLd id="breadcrumb-ld" data={breadcrumbLd} />
      <JsonLd id="faq-ld" data={faqLd} />

      <Header />
      <main>
        {/* Hero */}
        <div className="relative overflow-hidden border-b border-line">
          <DotGridBackdrop />
          <Container className="relative py-14 sm:py-20">
            <nav aria-label="Breadcrumb" className="font-mono text-xs text-muted">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href={base || "/"} className="hover:text-ink">{ui.crumbHome}</Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href={`${base}/service`} className="hover:text-ink">{ui.crumbServices}</Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="text-ink">{s.h1}</li>
              </ol>
            </nav>

            <h1 className="mt-8 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
              {s.h1}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{s.tagline}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={waHref} external size="lg">
                <WhatsappIcon size={18} aria-hidden /> {ui.ctaPrimary}
              </Button>
              <Button href={`${base}/projects`} variant="secondary" size="lg">
                {ui.ctaSecondary}
              </Button>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs text-muted sm:text-sm">
              {ui.trust.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Container>
        </div>

        {/* Intro + what you get */}
        <Section>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">{ui.whyTitle}</h2>
              <p className="mt-4 leading-relaxed text-muted">{s.intro}</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">{ui.getTitle}</h2>
              <ul className="mt-4 space-y-3">
                {s.whatYouGet.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* Process — a real sequence, numbering earns its place */}
        <Section className="border-y border-line bg-surface">
          <h2 className="text-2xl font-bold sm:text-3xl">{ui.processTitle}</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {s.process.map((step, i) => (
              <div key={step.title}>
                <p className="font-mono text-sm text-violet-deep">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Proof + stack/estimate */}
        <Section>
          <div className="grid gap-12 lg:grid-cols-[3fr_2fr]">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">{ui.proofTitle}</h2>
              <div className="mt-6 space-y-4">
                {related.map((c) => (
                  <Link
                    key={c.slug}
                    href={`${base}/projects/${c.slug}`}
                    className="group flex items-center justify-between gap-4 rounded-xl border border-line bg-surface p-6 transition-colors hover:border-violet-glow"
                  >
                    <span>
                      <Badge>{c.category}</Badge>
                      <span className="mt-2 block font-display text-lg font-semibold transition-colors group-hover:text-violet-deep">
                        {c.title}
                      </span>
                      <span className="mt-1 block text-sm text-muted">{c.tagline}</span>
                    </span>
                    <ArrowRight size={18} aria-hidden className="shrink-0 text-violet-deep" />
                  </Link>
                ))}
              </div>
            </div>

            <aside aria-label={ui.asideLabel} className="space-y-6">
              <div className="rounded-xl border border-line bg-surface p-6">
                <p className="font-mono text-xs text-muted">{ui.stackLabel}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {s.stack.map((t) => (
                    <li key={t}>
                      <Badge>{t}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-line bg-surface p-6">
                <p className="font-mono text-xs text-muted">{ui.estimateLabel}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.estimateNote}</p>
                <Button href={waHref} external className="mt-5">
                  {ui.estimateCta} <ArrowRight size={14} aria-hidden />
                </Button>
              </div>
            </aside>
          </div>
        </Section>

        {/* FAQ */}
        <Section className="border-t border-line bg-surface">
          <h2 className="text-2xl font-bold sm:text-3xl">{ui.faqTitle}</h2>
          <div className="mt-8 max-w-3xl divide-y divide-line border-y border-line">
            {s.faq.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium marker:hidden">
                  {f.q}
                  <span
                    aria-hidden
                    className="font-mono text-violet-deep transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </Section>

        {/* Final CTA */}
        <Section dark contained={false} className="overflow-hidden" ariaLabel={ui.ctaTitle}>
          <ContourBackdrop />
          <Container className="relative text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">{ui.ctaTitle}</h2>
            <p className="mx-auto mt-4 max-w-lg text-white/70">{ui.ctaBody}</p>
            <div className="mt-8">
              <Button href={waHref} external variant="inverse" size="lg">
                <WhatsappIcon size={18} aria-hidden /> {ui.ctaButton}
              </Button>
            </div>
            <p className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/60">
              <span className="font-mono text-xs text-white/40">{ui.othersLabel}</span>
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`${base}/jasa/${o.slug}`}
                  className="underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  {o.h1}
                </Link>
              ))}
            </p>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
