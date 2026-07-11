import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { DotGridBackdrop, ContourBackdrop } from "@/components/ui/backdrops";
import { waLink } from "@/lib/contact";
import { serviceLandings, type ServiceLanding } from "@/data/services";
import { getCaseStudy } from "@/data/projects";

const DOMAIN = "https://oksasatya.dev";

const TRUST = [
  "4+ tahun aplikasi enterprise (Dubai)",
  "Respon < 24 jam",
  "Estimasi gratis",
];

export default function ServiceLandingArea({
  landing: s,
}: {
  readonly landing: ServiceLanding;
}) {
  const url = `${DOMAIN}/jasa/${s.slug}`;
  const waHref = waLink(`Halo Oksa, saya tertarik dengan ${s.keyword}. Boleh diskusi?`);

  const related = s.relatedProjects
    .map((slug) => getCaseStudy(slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const others = serviceLandings.filter((o) => o.slug !== s.slug);

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.h1,
    serviceType: s.keyword,
    description: s.metaDescription,
    url,
    provider: { "@type": "Person", name: "Oksa Satya", url: DOMAIN },
    areaServed: ["Indonesia", "Worldwide"],
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: DOMAIN },
      { "@type": "ListItem", position: 2, name: "Layanan", item: `${DOMAIN}/service` },
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
                  <Link href="/" className="hover:text-ink">Beranda</Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/service" className="hover:text-ink">Layanan</Link>
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
                <MessageCircle size={18} aria-hidden /> Diskusi gratis via WhatsApp
              </Button>
              <Button href="/projects" variant="secondary" size="lg">
                Lihat contoh proyek
              </Button>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs text-muted sm:text-sm">
              {TRUST.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Container>
        </div>

        {/* Intro + what you get */}
        <Section>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">Kenapa ini penting</h2>
              <p className="mt-4 leading-relaxed text-muted">{s.intro}</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">Yang Anda dapat</h2>
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
          <h2 className="text-2xl font-bold sm:text-3xl">
            Transparan dari awal sampai rilis
          </h2>
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
              <h2 className="text-2xl font-bold sm:text-3xl">
                Sudah dipakai di proyek production
              </h2>
              <div className="mt-6 space-y-4">
                {related.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/projects/${c.slug}`}
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

            <aside aria-label="Detail layanan" className="space-y-6">
              <div className="rounded-xl border border-line bg-surface p-6">
                <p className="font-mono text-xs text-muted">Tech stack</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {s.stack.map((t) => (
                    <li key={t}>
                      <Badge>{t}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-line bg-surface p-6">
                <p className="font-mono text-xs text-muted">Estimasi biaya</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.estimateNote}</p>
                <Button href={waHref} external className="mt-5">
                  Minta estimasi <ArrowRight size={14} aria-hidden />
                </Button>
              </div>
            </aside>
          </div>
        </Section>

        {/* FAQ */}
        <Section className="border-t border-line bg-surface">
          <h2 className="text-2xl font-bold sm:text-3xl">Yang sering ditanyakan</h2>
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
        <Section dark contained={false} className="overflow-hidden" ariaLabel="Ajakan kerja sama">
          <ContourBackdrop />
          <Container className="relative text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ceritakan kebutuhan Anda
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-white/70">
              Diskusi & estimasi gratis, tanpa komitmen. Biasanya saya balas
              dalam kurang dari 24 jam.
            </p>
            <div className="mt-8">
              <Button href={waHref} external variant="inverse" size="lg">
                <MessageCircle size={18} aria-hidden /> Chat WhatsApp sekarang
              </Button>
            </div>
            <p className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/60">
              <span className="font-mono text-xs text-white/40">Layanan lain:</span>
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/jasa/${o.slug}`}
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
