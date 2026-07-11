import Image from "next/image";
import { ArrowRight, ArrowUpRight, Lock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { GithubIcon } from "@/components/ui/brand-icons";
import { NodesBackdrop, ContourBackdrop } from "@/components/ui/backdrops";
import { waLink, WA_DEFAULT_MESSAGE } from "@/lib/contact";
import { getArchiveProjectsByLocale, getCaseStudiesByLocale } from "@/data/locale-data";
import type { ProjectGroup } from "@/data/projects";
import type { Locale } from "@/i18n/routing";

const GROUP_ORDER: readonly ProjectGroup[] = [
  "ecommerce",
  "systems",
  "web",
  "oss",
  "mobile",
];

// Bento sizing for the flagship case studies (index 0 leads big; rest vary).
const BENTO_SPAN: readonly string[] = [
  "sm:col-span-2 md:col-span-4 md:row-span-2",
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-3",
  "md:col-span-3",
];

const COPY = {
  id: {
    heading: "Proyek & studi kasus",
    intro:
      "Sistem yang saya bangun end-to-end — masalah bisnisnya, keputusan arsitekturnya, dan hasilnya. Sebagian besar repo privat (kerjaan klien); yang dibagikan adalah cerita engineering-nya.",
    stat: "30+ proyek dikirim end-to-end · 8 open-source di GitHub · Go · Java · Laravel · Next.js · Rust",
    techLabel: "Teknologi",
    readCase: "Baca studi kasus",
    indexHeading: "Index proyek",
    indexIntro:
      "Gambaran nyata dari yang saya kirim — dari e-commerce dan sistem bisnis sampai tools open-source.",
    groups: {
      ecommerce: "E-commerce & Marketplace",
      systems: "Sistem Bisnis & Dashboard",
      web: "Website & Landing Page",
      oss: "Open Source & Tools",
      mobile: "Mobile",
    },
    privateRepo: "Repo privat",
    viewGithub: "Lihat di GitHub",
    ctaTitle: "Punya proyek yang ingin dibangun?",
    ctaBody:
      "Ceritakan kebutuhan bisnis anda — dari sistem internal, POS, sampai toko online. Balasan biasanya kurang dari 24 jam.",
    cta: "Diskusikan Proyek Anda",
    alt: (title: string) => `Tampilan ${title}`,
    waMessage: WA_DEFAULT_MESSAGE,
  },
  en: {
    heading: "Projects & case studies",
    intro:
      "Systems I built end-to-end — the business problem, the architectural decisions, and the outcome. Most repos are private (client work); what's shared is the engineering story.",
    stat: "30+ projects shipped end-to-end · 8 open-source on GitHub · Go · Java · Laravel · Next.js · Rust",
    techLabel: "Technology",
    readCase: "Read case study",
    indexHeading: "Project index",
    indexIntro:
      "A real picture of what I ship — from e-commerce and business systems to open-source tools.",
    groups: {
      ecommerce: "E-commerce & Marketplace",
      systems: "Business Systems & Dashboards",
      web: "Websites & Landing Pages",
      oss: "Open Source & Tools",
      mobile: "Mobile",
    },
    privateRepo: "Private repo",
    viewGithub: "View on GitHub",
    ctaTitle: "Have a project in mind?",
    ctaBody:
      "Tell me about your business needs — from internal systems and POS to online stores. I usually reply within 24 hours.",
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
        {/* Header — dark with the system-blueprint node motif so the page opens with depth. */}
        <div className="relative overflow-hidden border-b border-line bg-dark">
          <NodesBackdrop />
          <Container className="relative py-14 sm:py-20">
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
              {c.heading}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted">{c.intro}</p>
            <p className="mt-6 font-mono text-xs text-teal sm:text-sm">{c.stat}</p>
          </Container>
        </div>

        <Container className="py-14 sm:py-16">
          {/* Flagship case studies — bento grid (varied sizes showcase the screenshots) */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-6 md:auto-rows-[13.5rem]">
            {caseStudies.map((cs, i) => {
              const large = i === 0;
              return (
                <Link
                  key={cs.slug}
                  href={`/projects/${cs.slug}`}
                  aria-label={cs.title}
                  className={`group relative flex min-h-60 overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-violet-glow md:min-h-0 ${
                    BENTO_SPAN[i] ?? "md:col-span-2"
                  }`}
                >
                  <Image
                    src={cs.image}
                    alt={c.alt(cs.title)}
                    fill
                    sizes={large ? "(min-width: 768px) 620px, 100vw" : "(min-width: 768px) 34vw, 100vw"}
                    className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/92 via-black/40 to-transparent" />
                  <span className="absolute right-3 top-3 inline-flex items-center justify-center rounded-full bg-black/45 p-1.5 text-white ring-1 ring-white/15 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    <ArrowUpRight size={15} aria-hidden />
                  </span>
                  <div className="relative mt-auto flex flex-col gap-2 p-5 sm:p-6">
                    <div className="flex items-center gap-2.5">
                      <span className="inline-flex items-center rounded-full bg-black/45 px-2.5 py-1 font-mono text-[11px] text-white ring-1 ring-white/15">
                        {cs.category}
                      </span>
                      <span className="font-mono text-xs text-white/60">{cs.year}</span>
                    </div>
                    <h2
                      className={`font-display font-semibold text-white ${large ? "text-2xl" : "text-lg"}`}
                    >
                      {cs.title}
                    </h2>
                    {large && (
                      <p className="max-w-md text-sm leading-relaxed text-white/75">{cs.summary}</p>
                    )}
                    <span className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-violet-glow">
                      {c.readCase} <ArrowRight size={14} aria-hidden />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Project index — grouped, real breadth from the GitHub work */}
          <section className="mt-20" aria-label={c.indexHeading}>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">{c.indexHeading}</h2>
            <p className="mt-2 max-w-2xl text-muted">{c.indexIntro}</p>

            <div className="mt-10 space-y-12">
              {GROUP_ORDER.map((group) => {
                const items = archiveProjects.filter((p) => p.group === group);
                if (items.length === 0) return null;
                return (
                  <div key={group}>
                    <div className="flex items-baseline gap-3 border-b border-line pb-3">
                      <h3 className="font-display text-lg font-semibold">
                        {c.groups[group]}
                      </h3>
                      <span className="font-mono text-xs text-muted">{items.length}</span>
                    </div>
                    <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {items.map((p) => (
                        <li
                          key={`${p.title}-${p.year}`}
                          className="group flex h-full flex-col rounded-xl border border-line bg-surface p-5 transition-colors hover:border-violet-glow"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="font-mono text-xs text-violet-deep">
                              {p.category}
                            </span>
                            <span className="font-mono text-xs text-muted">{p.year}</span>
                          </div>
                          <h4 className="mt-3 font-display text-base font-semibold">
                            {p.repoUrl ? (
                              <a
                                href={p.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 transition-colors group-hover:text-violet-deep"
                              >
                                {p.title}
                                <ArrowUpRight size={14} aria-hidden className="text-muted" />
                              </a>
                            ) : (
                              p.title
                            )}
                          </h4>
                          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                            {p.description}
                          </p>
                          <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-3">
                            <span className="font-mono text-xs text-muted">{p.tech}</span>
                            {p.repoUrl ? (
                              <a
                                href={p.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex shrink-0 items-center gap-1 font-mono text-xs text-violet-deep hover:text-ink"
                              >
                                <GithubIcon size={13} /> {c.viewGithub}
                              </a>
                            ) : (
                              <span className="inline-flex shrink-0 items-center gap-1 font-mono text-xs text-muted">
                                <Lock size={12} aria-hidden /> {c.privateRepo}
                              </span>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>
        </Container>

        {/* Final CTA — dark with contour motif */}
        <section className="relative overflow-hidden border-t border-line bg-dark">
          <ContourBackdrop />
          <Container className="relative py-16 text-center sm:py-20">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              {c.ctaTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted">{c.ctaBody}</p>
            <div className="mt-8">
              <Button href={waLink(c.waMessage)} external size="lg">
                {c.cta}
              </Button>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
