import Image from "next/image";
import { FileDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { waLink, CONTACT, CV_URL } from "@/lib/contact";
import { getAboutData } from "@/data/locale-data";
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
  const { workExperience, clientProjects, education, certificates, skillGroups } =
    getAboutData(locale);

  return (
    <>
      <Header />
      <main>
        <div className="border-b border-line">
          <Container className="py-14 sm:py-20">
            <div className="grid items-center gap-10 lg:grid-cols-[2fr_1fr]">
              <div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  {t("title")}
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
                  {t.rich("intro1", {
                    b: (chunks) => (
                      <strong className="font-semibold text-ink">{chunks}</strong>
                    ),
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
                  <Button href={CONTACT.github} external variant="ghost" size="lg">
                    GitHub
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
      </main>
      <Footer />
    </>
  );
}
