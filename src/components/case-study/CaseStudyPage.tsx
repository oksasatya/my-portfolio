import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DexovaArchitectureDiagram, PosFlowDiagram } from "./DexovaDiagrams";
import { waLink } from "@/lib/contact";
import { useLocale, useTranslations } from "next-intl";
import { type CaseScreenshot, type CaseStudy } from "@/data/projects";

function Screenshot({ shot }: Readonly<{ shot: CaseScreenshot }>) {
  const portrait = shot.height > shot.width;
  return (
    <figure
      className={`overflow-hidden rounded-xl border border-line bg-surface ${portrait ? "max-w-xs" : ""}`}
    >
      <Image
        src={shot.src}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
        sizes={portrait ? "320px" : "(min-width: 1024px) 720px, 90vw"}
        className="w-full"
      />
      <figcaption className="border-t border-line px-4 py-2 font-mono text-xs text-muted">
        {shot.caption}
      </figcaption>
    </figure>
  );
}

function Diagram({ kind }: Readonly<{ kind: "dexova-architecture" | "pos-flow" }>) {
  if (kind === "dexova-architecture") return <DexovaArchitectureDiagram />;
  return <PosFlowDiagram />;
}

function MetaGrid({ cs, t }: Readonly<{ cs: CaseStudy; t: Record<string, string> }>) {
  return (
    <dl className="grid gap-6 rounded-xl border border-line bg-surface p-6 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <dt className="font-mono text-xs text-muted">{t.role}</dt>
        <dd className="mt-1 text-sm font-medium">{cs.role}</dd>
      </div>
      <div>
        <dt className="font-mono text-xs text-muted">{t.period}</dt>
        <dd className="mt-1 text-sm font-medium">{cs.timeframe}</dd>
      </div>
      <div>
        <dt className="font-mono text-xs text-muted">{t.category}</dt>
        <dd className="mt-1 text-sm font-medium">{cs.category}</dd>
      </div>
      <div>
        <dt className="font-mono text-xs text-muted">{t.code}</dt>
        <dd className="mt-1 text-sm font-medium">
          {cs.repoVisibility === "public" ? t.repoPublic : t.repoPrivate}
        </dd>
      </div>
      <div className="sm:col-span-2 lg:col-span-4">
        <dt className="font-mono text-xs text-muted">{t.stack}</dt>
        <dd className="mt-2 flex flex-wrap gap-2">
          {cs.stack.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </dd>
      </div>
    </dl>
  );
}

function RelatedCards({
  related,
  base,
  title,
}: Readonly<{ related: readonly CaseStudy[]; base: string; title: string }>) {
  if (related.length === 0) return null;
  return (
    <div className="mt-16 border-t border-line pt-10">
      <h2 className="font-display text-2xl font-bold">{title}</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {related.map((cs) => (
          <Link
            key={cs.slug}
            href={`${base}/${cs.slug}`}
            className="group rounded-xl border border-line bg-surface p-6 transition-colors hover:border-violet-glow"
          >
            <Badge>{cs.category}</Badge>
            <p className="mt-3 font-display text-lg font-semibold transition-colors group-hover:text-violet-deep">
              {cs.title}
            </p>
            <p className="mt-2 text-sm text-muted">{cs.tagline}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

function DeepDiveBody({ cs, t }: Readonly<{ cs: CaseStudy; t: Record<string, string> }>) {
  const dd = cs.deepDive;
  if (!dd) return null;
  return (
    <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
      <nav aria-label={t.toc} className="hidden lg:block">
        <div className="sticky top-24">
          <p className="font-mono text-xs text-muted">{t.toc}</p>
          <ul className="mt-3 space-y-2 border-l border-line text-sm">
            {dd.sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="block border-l-2 border-transparent py-0.5 pl-4 text-muted transition-colors hover:border-violet hover:text-ink"
                >
                  {s.title}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#lessons"
                className="block border-l-2 border-transparent py-0.5 pl-4 text-muted transition-colors hover:border-violet hover:text-ink"
              >
                {t.lessons}
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="min-w-0 max-w-3xl">
        {dd.sections.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-24 border-b border-line py-10 first:pt-0 last:border-b-0">
            <h2 className="font-display text-2xl font-bold">{s.title}</h2>
            {s.paragraphs?.map((p) => (
              <p key={p.slice(0, 40)} className="mt-4 leading-relaxed text-muted">
                {p}
              </p>
            ))}
            {s.bullets && (
              <ul className="mt-4 space-y-3">
                {s.bullets.map((b) => (
                  <li key={b.slice(0, 40)} className="flex gap-3 text-sm leading-relaxed">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
            {s.diagram && (
              <div className="mt-6">
                <Diagram kind={s.diagram} />
              </div>
            )}
            {s.screenshots && (
              <div className="mt-6 space-y-6">
                {s.screenshots.map((shot) => (
                  <Screenshot key={shot.src} shot={shot} />
                ))}
              </div>
            )}
          </section>
        ))}

        <section id="lessons" className="scroll-mt-24 py-10">
          <h2 className="font-display text-2xl font-bold">{t.lessons}</h2>
          <ol className="mt-4 space-y-4">
            {dd.lessons.map((lesson, i) => (
              <li key={lesson.slice(0, 40)} className="flex gap-4">
                <span className="font-mono text-sm text-violet-deep">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-sm leading-relaxed">{lesson}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}

function CompactBody({ cs, t }: Readonly<{ cs: CaseStudy; t: Record<string, string> }>) {
  return (
    <div className="max-w-3xl">
      <figure className="overflow-hidden rounded-xl border border-line bg-surface">
        <Image
          src={cs.image}
          alt={`Tampilan proyek ${cs.title}`}
          width={1200}
          height={720}
          sizes="(min-width: 1024px) 720px, 90vw"
          className="w-full object-cover"
        />
      </figure>

      <section className="border-b border-line py-10">
        <h2 className="font-display text-2xl font-bold">{t.problem}</h2>
        <p className="mt-4 leading-relaxed text-muted">{cs.problem}</p>
      </section>

      <section className="border-b border-line py-10">
        <h2 className="font-display text-2xl font-bold">{t.solution}</h2>
        <ul className="mt-4 space-y-3">
          {cs.solution.map((item) => (
            <li key={item.slice(0, 40)} className="flex gap-3 text-sm leading-relaxed">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="py-10">
        <h2 className="font-display text-2xl font-bold">{t.results}</h2>
        <ul className="mt-4 space-y-3">
          {cs.results.map((item) => (
            <li key={item.slice(0, 40)} className="flex gap-3 text-sm leading-relaxed">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal ring-1 ring-line" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export function CaseStudyPage({
  cs,
  related = [],
}: Readonly<{ cs: CaseStudy; related?: readonly CaseStudy[] }>) {
  const locale = useLocale();
  const tr = useTranslations("caseStudy");
  const t: Record<string, string> = {
    home: tr("home"), projects: tr("projects"), breadcrumb: tr("breadcrumb"),
    toc: tr("toc"), lessons: tr("lessons"), readNext: tr("readNext"),
    role: tr("role"), period: tr("period"), category: tr("category"),
    code: tr("code"), repoPublic: tr("repoPublic"), repoPrivate: tr("repoPrivate"),
    stack: tr("stack"), problem: tr("problem"), solution: tr("solution"),
    results: tr("results"), ctaTitle: tr("ctaTitle"), ctaBody: tr("ctaBody"),
    ctaPrimary: tr("ctaPrimary"), ctaSecondary: tr("ctaSecondary"),
  };
  const base = locale === "en" ? "/en/projects" : "/projects";
  const homeHref = locale === "en" ? "/en" : "/";
  return (
    <>
      <Header />
      <main lang={locale === "en" ? "en" : undefined}>
        <div className="border-b border-line">
          <Container className="py-12 sm:py-16">
            <nav aria-label={t.breadcrumb} className="font-mono text-xs text-muted">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href={homeHref} className="hover:text-ink">
                    {t.home}
                  </Link>
                </li>
                {locale === "id" && (
                  <>
                    <li aria-hidden>/</li>
                    <li>
                      <Link href="/projects" className="hover:text-ink">
                        {t.projects}
                      </Link>
                    </li>
                  </>
                )}
                <li aria-hidden>/</li>
                <li aria-current="page" className="text-ink">
                  {cs.title}
                </li>
              </ol>
            </nav>

            <div className="mt-8 max-w-3xl">
              <Badge tone="violet">{cs.category}</Badge>
              <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                {cs.title}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-muted">{cs.tagline}</p>
            </div>

            <div className="mt-8">
              <MetaGrid cs={cs} t={t} />
            </div>
          </Container>
        </div>

        <Container className="py-12 sm:py-16">
          {cs.deepDive ? <DeepDiveBody cs={cs} t={t} /> : <CompactBody cs={cs} t={t} />}

          {cs.deepDive && <RelatedCards related={related} base={base} title={t.readNext} />}

          <div className="mt-16 rounded-2xl border border-line bg-surface p-8 text-center sm:p-12">
            <h2 className="font-display text-2xl font-bold">{t.ctaTitle}</h2>
            <p className="mx-auto mt-3 max-w-lg text-muted">{t.ctaBody}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button href={waLink(tr("waMessage", { title: cs.title }))} external size="lg">
                {t.ctaPrimary}
              </Button>
              <Button href={locale === "en" ? "/en" : "/projects"} variant="secondary" size="lg">
                {t.ctaSecondary} <ArrowRight size={16} aria-hidden />
              </Button>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
