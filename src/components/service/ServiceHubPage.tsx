import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Cable,
  Globe,
  LayoutDashboard,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsappIcon } from "@/components/ui/brand-icons";
import { DotGridBackdrop, NodesBackdrop, ContourBackdrop } from "@/components/ui/backdrops";
import { Scene3D } from "@/components/three/Scene3D";
import { waLink } from "@/lib/contact";
import { getServiceHub, type HubServiceItem, type ServiceIcon } from "@/data/service-hub";
import { serviceLandings } from "@/data/services";
import { getCaseStudiesByLocale } from "@/data/locale-data";
import type { Locale } from "@/i18n/routing";

const SERVICE_ICON: Record<ServiceIcon, LucideIcon> = {
  web: Globe,
  app: LayoutDashboard,
  api: Cable,
  store: ShoppingCart,
};

const H2_CLS = "text-2xl font-bold sm:text-3xl";
const SUBHEAD_CLS = "mt-3 max-w-2xl text-muted";

function ServiceCard({
  item,
  learn,
}: Readonly<{ item: HubServiceItem; learn: string }>) {
  const Icon = SERVICE_ICON[item.icon];
  const body = (
    <>
      <div className="flex items-start justify-between gap-4">
        <span
          aria-hidden
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-bg text-violet-deep"
        >
          <Icon size={22} />
        </span>
        {item.slug ? (
          <ArrowRight
            size={18}
            aria-hidden
            className="mt-1 shrink-0 text-muted transition-all group-hover:translate-x-1 group-hover:text-violet-deep"
          />
        ) : null}
      </div>
      <h3 className="mt-5 font-display text-xl font-semibold transition-colors group-hover:text-violet-deep">
        {item.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{item.tagline}</p>
      <ul className="mt-4 flex-1 space-y-2">
        {item.highlights.map((h) => (
          <li key={h} className="flex gap-3 text-sm leading-relaxed">
            <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />
            <span>{h}</span>
          </li>
        ))}
      </ul>
      <p className="mt-5 border-t border-line pt-4 font-mono text-xs text-muted">{item.stack}</p>
      {item.slug ? (
        <p className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-violet-deep">
          {learn} <ArrowRight size={14} aria-hidden />
        </p>
      ) : null}
    </>
  );

  const cardCls =
    "group flex h-full flex-col rounded-xl border border-line bg-surface p-7 transition-colors hover:border-violet-glow";

  if (item.slug) {
    return (
      <Link href={`/jasa/${item.slug}`} className={cardCls}>
        {body}
      </Link>
    );
  }
  return <div className={cardCls}>{body}</div>;
}

export function ServiceHubPage({ locale }: Readonly<{ locale: Locale }>) {
  const c = getServiceHub(locale);
  const waHref = waLink(c.hero.waMessage);
  const caseBase = locale === "en" ? "/en/projects" : "/projects";
  const allCases = getCaseStudiesByLocale(locale);
  const proof = c.proof.slugs
    .map((slug) => allCases.find((cs) => cs.slug === slug))
    .filter((cs): cs is NonNullable<typeof cs> => Boolean(cs));

  return (
    <>
      <Header />
      <main>
        {/* Hero — dot-grid motif, dual CTA, verifiable trust row. */}
        <div className="relative overflow-hidden border-b border-line">
          <DotGridBackdrop />
          <Container className="relative py-14 sm:py-20">
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
              {c.hero.h1}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{c.hero.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={waHref} external size="lg">
                <WhatsappIcon size={18} aria-hidden /> {c.hero.ctaPrimary}
              </Button>
              <Button href={c.hero.secondaryHref} variant="secondary" size="lg">
                {c.hero.ctaSecondary} <ArrowRight size={16} aria-hidden />
              </Button>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs text-muted sm:text-sm">
              {c.hero.trust.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Container>
        </div>

        {/* Services */}
        <Section ariaLabel={c.services.heading}>
          <h2 className={H2_CLS}>{c.services.heading}</h2>
          <p className={SUBHEAD_CLS}>{c.services.intro}</p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {c.services.items.map((item, i) => (
              <Reveal key={item.title} delay={(i % 2) * 90}>
                <ServiceCard item={item} learn={c.services.learn} />
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Why me — dark rhythm section with the ambient blueprint scene. */}
        <Section dark contained={false} className="overflow-hidden" ariaLabel={c.why.heading}>
          <Scene3D dense={false} fallback={<NodesBackdrop />} className="opacity-70" />
          <Container className="relative">
            <div className="max-w-2xl">
              <Kicker dark>{c.why.kicker}</Kicker>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{c.why.heading}</h2>
              <p className="mt-4 text-lg leading-relaxed text-white/70">{c.why.intro}</p>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {c.why.cards.map((card, i) => (
                <Reveal key={card.tag} delay={i * 90}>
                  <div className="h-full rounded-xl border border-white/10 bg-white/[0.04] p-6">
                    <p className="font-mono text-xs text-teal">{card.tag}</p>
                    <h3 className="mt-3 font-display text-lg font-semibold">{card.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">{card.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>

        {/* Process — a real 3-step sequence; numbering earns its place. */}
        <Section ariaLabel={c.process.heading}>
          <h2 className={H2_CLS}>{c.process.heading}</h2>
          <p className={SUBHEAD_CLS}>{c.process.intro}</p>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {c.process.steps.map((step, i) => (
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

        {/* Proof — real case studies with screenshots. */}
        <Section className="border-y border-line bg-surface" ariaLabel={c.proof.heading}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className={H2_CLS}>{c.proof.heading}</h2>
              <p className={SUBHEAD_CLS}>{c.proof.intro}</p>
            </div>
            <Button href={caseBase} variant="secondary">
              {c.proof.allLabel} <ArrowRight size={14} aria-hidden />
            </Button>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {proof.map((cs, i) => (
              <Reveal key={cs.slug} delay={(i % 2) * 90}>
                <Link
                  href={`${caseBase}/${cs.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-bg transition-colors hover:border-violet-glow"
                >
                  <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-surface">
                    <Image
                      src={cs.image}
                      alt={cs.title}
                      fill
                      sizes="(min-width: 768px) 45vw, 90vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <Badge className="self-start">{cs.category}</Badge>
                    <p className="mt-3 font-display text-lg font-semibold transition-colors group-hover:text-violet-deep">
                      {cs.title}
                    </p>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{cs.tagline}</p>
                    <p className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-violet-deep">
                      {c.proof.readCase} <ArrowRight size={14} aria-hidden />
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* FAQ — visible content mirrors the FAQPage JSON-LD emitted by the route. */}
        <Section ariaLabel={c.faq.heading}>
          <h2 className={H2_CLS}>{c.faq.heading}</h2>
          <div className="mt-8 max-w-3xl divide-y divide-line border-y border-line">
            {c.faq.items.map((f) => (
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
        <Section dark contained={false} className="overflow-hidden" ariaLabel={c.cta.heading}>
          <ContourBackdrop />
          <Container className="relative text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">{c.cta.heading}</h2>
            <p className="mx-auto mt-4 max-w-lg text-white/70">{c.cta.body}</p>
            <div className="mt-8">
              <Button href={waHref} external variant="inverse" size="lg">
                <WhatsappIcon size={18} aria-hidden /> {c.cta.button}
              </Button>
            </div>
            {locale === "id" ? (
              <p className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/60">
                <span className="font-mono text-xs text-white/40">{c.cta.othersLabel}</span>
                {serviceLandings.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/jasa/${s.slug}`}
                    className="underline-offset-4 transition-colors hover:text-white hover:underline"
                  >
                    {s.h1}
                  </Link>
                ))}
              </p>
            ) : null}
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
