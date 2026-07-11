import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import {
  getArchiveProjectsByLocale,
  getCaseStudiesByLocale,
} from "@/data/locale-data";
import type { Locale } from "@/i18n/routing";

const FEATURED_SLUGS = ["helixio", "rahan-mancar"] as const;
const ARCHIVE_TEASER_COUNT = 5;

export function SelectedProjects() {
  const locale = useLocale() as Locale;
  const t = useTranslations("home");
  const base = locale === "en" ? "/en" : "";

  const caseStudies = getCaseStudiesByLocale(locale);
  const archive = getArchiveProjectsByLocale(locale);
  const featured = FEATURED_SLUGS.map((slug) =>
    caseStudies.find((c) => c.slug === slug),
  ).filter((c) => c !== undefined);
  const moreCount = caseStudies.length + archive.length - featured.length;
  const archiveTeaser = archive.slice(0, ARCHIVE_TEASER_COUNT);

  return (
    <Section id="projects" ariaLabel={t("projectsTitle")}>
      <div className="flex items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("projectsTitle")}
          </h2>
          <p className="mt-3 max-w-xl text-muted">{t("projectsIntro")}</p>
        </div>
        <Link
          href={`${base}/projects`}
          className="hidden shrink-0 items-center gap-1 text-sm font-medium text-violet-deep hover:text-ink sm:inline-flex"
        >
          {t("projectsAll")} <ArrowRight size={15} aria-hidden />
        </Link>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {featured.map((cs, i) => (
          <Reveal key={cs.slug} delay={i * 90}>
            <article className="group flex h-full flex-col rounded-xl border border-line bg-surface p-7 transition-colors hover:border-violet-glow">
              <div className="flex items-center justify-between gap-4">
                <Badge>{cs.category}</Badge>
                <span className="font-mono text-xs text-muted">{cs.year}</span>
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold">
                <Link
                  href={`${base}/projects/${cs.slug}`}
                  className="transition-colors group-hover:text-violet-deep"
                >
                  {cs.title}
                </Link>
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {cs.summary}
              </p>
              <p className="mt-4 text-sm text-ink">
                <span className="font-semibold">{t("projectsRole")}</span> {cs.role}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label={t("projectsTech")}>
                {cs.stack.slice(0, 4).map((tech) => (
                  <li key={tech} className="font-mono text-xs text-muted">
                    {tech}
                  </li>
                ))}
              </ul>
              <p className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-violet-deep">
                {t("projectsRead")} <ArrowRight size={14} aria-hidden />
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      <p className="mt-8 flex flex-wrap items-baseline gap-x-2.5 gap-y-1.5 text-sm text-muted">
        <span className="font-mono text-xs text-teal">{t("projectsArchiveLead")}</span>
        {archiveTeaser.map((p, i) => (
          <span key={p.title} className="text-ink/80">
            {p.title}
            {i < archiveTeaser.length - 1 && (
              <span className="text-line" aria-hidden>
                {" · "}
              </span>
            )}
          </span>
        ))}
        <Link
          href={`${base}/projects`}
          className="inline-flex items-center gap-1 font-medium text-violet-deep hover:text-ink"
        >
          {t("projectsMore", { count: moreCount })} <ArrowRight size={14} aria-hidden />
        </Link>
      </p>
    </Section>
  );
}
