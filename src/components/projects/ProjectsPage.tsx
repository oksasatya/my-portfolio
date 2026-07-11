import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { waLink, WA_DEFAULT_MESSAGE } from "@/lib/contact";
import { getArchiveProjectsByLocale, getCaseStudiesByLocale } from "@/data/locale-data";
import type { Locale } from "@/i18n/routing";

const COPY = {
  id: {
    heading: "Proyek & studi kasus",
    intro:
      "Sistem yang saya bangun end-to-end — dengan masalah bisnisnya, keputusan arsitekturnya, dan hasilnya. Sebagian besar repo privat; yang dibagikan adalah cerita engineering-nya.",
    techLabel: "Teknologi",
    readCase: "Baca studi kasus",
    archiveAria: "Arsip proyek",
    archiveHeading: "Arsip",
    archiveIntro: "Proyek lain yang pernah saya kerjakan — tanpa studi kasus penuh.",
    cta: "Diskusikan Proyek Anda",
    alt: (title: string) => `Tampilan ${title}`,
    waMessage: WA_DEFAULT_MESSAGE,
  },
  en: {
    heading: "Projects & case studies",
    intro:
      "Systems I built end-to-end — with the business problem, the architectural decisions, and the outcome. Most repos are private; what's shared is the engineering story.",
    techLabel: "Technology",
    readCase: "Read case study",
    archiveAria: "Project archive",
    archiveHeading: "Archive",
    archiveIntro: "Other projects I've worked on — without a full case study.",
    cta: "Discuss your project",
    alt: (title: string) => `${title} screenshot`,
    waMessage: "Hi Oksa, I'd like to discuss a project.",
  },
} as const;

export function ProjectsPage({ locale }: Readonly<{ locale: Locale }>) {
  const c = COPY[locale] ?? COPY.id;
  const caseStudies = getCaseStudiesByLocale(locale);
  const archiveProjects = getArchiveProjectsByLocale(locale);

  return (
    <>
      <Header />
      <main>
        <div className="border-b border-line">
          <Container className="py-14 sm:py-20">
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
              {c.heading}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted">{c.intro}</p>
          </Container>
        </div>

        <Container className="py-14 sm:py-16">
          <div className="grid gap-6 md:grid-cols-2">
            {caseStudies.map((cs, i) => (
              <article
                key={cs.slug}
                className={`group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface transition-colors hover:border-violet-glow ${
                  i === 0 ? "md:col-span-2 md:grid md:grid-cols-2" : ""
                }`}
              >
                <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-bg md:aspect-auto md:min-h-56">
                  <Image
                    src={cs.image}
                    alt={c.alt(cs.title)}
                    fill
                    sizes={i === 0 ? "(min-width: 768px) 560px, 90vw" : "(min-width: 768px) 45vw, 90vw"}
                    className="object-cover object-top"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-center justify-between gap-4">
                    <Badge tone={i === 0 ? "violet" : "neutral"}>{cs.category}</Badge>
                    <span className="font-mono text-xs text-muted">{cs.year}</span>
                  </div>
                  <h2 className="mt-4 font-display text-xl font-semibold">
                    <Link
                      href={`/projects/${cs.slug}`}
                      className="transition-colors group-hover:text-violet-deep"
                    >
                      {cs.title}
                    </Link>
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {cs.summary}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1" aria-label={c.techLabel}>
                    {cs.stack.slice(0, 4).map((t) => (
                      <li key={t} className="font-mono text-xs text-muted">
                        {t}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-violet-deep">
                    {c.readCase} <ArrowRight size={14} aria-hidden />
                  </p>
                </div>
              </article>
            ))}
          </div>

          <section className="mt-16" aria-label={c.archiveAria}>
            <h2 className="font-display text-2xl font-bold">{c.archiveHeading}</h2>
            <p className="mt-2 max-w-xl text-sm text-muted">{c.archiveIntro}</p>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {archiveProjects.map((p) => (
                <li
                  key={`${p.title}-${p.year}`}
                  className="grid gap-1 py-4 sm:grid-cols-[90px_180px_1fr] sm:items-baseline sm:gap-4"
                >
                  <span className="font-mono text-xs text-muted">{p.year}</span>
                  <span className="text-sm font-semibold">{p.title}</span>
                  <span className="text-sm text-muted">
                    {p.description}
                    <span className="ml-2 font-mono text-xs text-violet-deep">{p.category}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-16 text-center">
            <Button href={waLink(c.waMessage)} external size="lg">
              {c.cta}
            </Button>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
