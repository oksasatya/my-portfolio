import Image from "next/image";
import { FileDown, Mail } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { NodesBackdrop, ContourBackdrop } from "@/components/ui/backdrops";
import { waLink, CONTACT, GMAIL_COMPOSE, CV_URL } from "@/lib/contact";
import { getAboutData, getHomeData } from "@/data/locale-data";
import type { ResumeEntry } from "@/data/about";
import type { Locale } from "@/i18n/routing";

function ResumeBlock({ entry }: Readonly<{ entry: ResumeEntry }>) {
  return (
    <article className="border-b border-line py-6 last:border-b-0">
      <p className="font-mono text-xs text-muted">{entry.period}</p>
      <h3 className="mt-2 font-display text-lg font-semibold">{entry.role}</h3>
      <p className="mt-1 text-sm text-muted">
        {entry.org} — {entry.location}
      </p>
      {entry.bullets.length > 0 && (
        <ul className="mt-3 space-y-2">
          {entry.bullets.map((b) => (
            <li key={b.slice(0, 40)} className="flex gap-3 text-sm leading-relaxed">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
      {entry.stack && (
        <p className="mt-3 font-mono text-xs text-violet-deep">{entry.stack}</p>
      )}
    </article>
  );
}

export function AboutPage() {
  const locale = useLocale() as Locale;
  const t = useTranslations("aboutPage");
  const th = useTranslations("header");
  const { workExperience, clientProjects, education, certificates, skillGroups, approach } =
    getAboutData(locale);
  const { trustItems } = getHomeData(locale);

  return (
    <>
      <Header />
      <main>
        {/* Hero — dark with the node motif so the page opens with depth. */}
        <div className="relative overflow-hidden border-b border-line bg-dark">
          <NodesBackdrop />
          <Container className="relative py-14 sm:py-20">
            <div className="grid items-center gap-10 lg:grid-cols-[2fr_1fr]">
              <div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t("title")}</h1>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
                  {t.rich("intro1", {
                    b: (chunks) => <strong className="font-semibold text-ink">{chunks}</strong>,
                  })}
                </p>
                <p className="mt-4 max-w-2xl leading-relaxed text-muted">{t("intro2")}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href={waLink(th("waMessage"))} external size="lg">
                    {t("cta")}
                  </Button>
                  <Button href={CV_URL} external variant="secondary" size="lg">
                    <FileDown size={16} aria-hidden /> {t("cv")}
                  </Button>
                  <Button href={CONTACT.github} external variant="secondary" size="lg">
                    <GithubIcon size={16} /> GitHub
                  </Button>
                  <Button href={CONTACT.linkedin} external variant="secondary" size="lg">
                    <LinkedinIcon size={16} /> LinkedIn
                  </Button>
                </div>
              </div>
              <div className="mx-auto w-56 overflow-hidden rounded-2xl border border-line bg-surface sm:w-64">
                <Image
                  src="/assets/images/about/me.png"
                  alt={t("photoAlt")}
                  width={512}
                  height={512}
                  priority
                  sizes="256px"
                  className="w-full"
                />
              </div>
            </div>
          </Container>
        </div>

        {/* Experience snapshot */}
        <section aria-label={t("statLabel")} className="border-b border-line bg-bg">
          <Container>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 py-5 font-mono text-xs text-muted sm:text-sm">
              {trustItems.map((item) => (
                <li key={item} className="tabular-nums">
                  {item}
                </li>
              ))}
            </ul>
          </Container>
        </section>

        {/* How I work */}
        <Section className="border-b border-line bg-surface" ariaLabel={t("approachTitle")}>
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{t("approachTitle")}</h2>
            <p className="mt-3 text-muted">{t("approachIntro")}</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {approach.map((a) => (
              <div key={a.title} className="rounded-xl border border-line bg-bg p-6">
                <h3 className="font-display text-lg font-semibold">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{a.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section ariaLabel={t("resumeLabel")}>
          <div className="grid gap-14 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">{t("workTitle")}</h2>
              <div className="mt-6 border-t border-line">
                {workExperience.map((e) => (
                  <ResumeBlock key={e.org} entry={e} />
                ))}
              </div>

              <h2 className="mt-12 text-2xl font-bold sm:text-3xl">{t("clientTitle")}</h2>
              <ul className="mt-4 space-y-3">
                {clientProjects.map((p) => (
                  <li key={p.slice(0, 40)} className="flex gap-3 text-sm leading-relaxed">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">{t("eduTitle")}</h2>
              <div className="mt-6 border-t border-line">
                {education.map((e) => (
                  <ResumeBlock key={e.org} entry={e} />
                ))}
              </div>
              <ul className="mt-4 space-y-2">
                {certificates.map((c) => (
                  <li key={c} className="text-sm text-muted">
                    {c}
                  </li>
                ))}
              </ul>

              <h2 className="mt-12 text-2xl font-bold sm:text-3xl">{t("skillsTitle")}</h2>
              <dl className="mt-6 space-y-4">
                {skillGroups.map((g) => (
                  <div key={g.label} className="grid gap-1 sm:grid-cols-[110px_1fr]">
                    <dt className="font-mono text-xs text-muted sm:pt-0.5">{g.label}</dt>
                    <dd className="text-sm leading-relaxed">{g.items}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Section>

        {/* Contact — dark with contour motif (the site's contact surface) */}
        <section className="relative overflow-hidden border-t border-line bg-dark">
          <ContourBackdrop />
          <Container className="relative py-16 text-center sm:py-20">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              {t("contactTitle")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted">{t("contactIntro")}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href={waLink(th("waMessage"))} external size="lg">
                {t("contactWa")}
              </Button>
              <Button href={GMAIL_COMPOSE} external variant="secondary" size="lg">
                <Mail size={16} aria-hidden /> {t("contactEmail")}
              </Button>
            </div>
            <div
              aria-label={t("socialLabel")}
              className="mt-8 flex items-center justify-center gap-6 text-sm"
            >
              <a
                href={CONTACT.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 text-muted transition-colors hover:text-ink"
              >
                <GithubIcon size={16} /> GitHub
              </a>
              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 text-muted transition-colors hover:text-ink"
              >
                <LinkedinIcon size={16} /> LinkedIn
              </a>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
