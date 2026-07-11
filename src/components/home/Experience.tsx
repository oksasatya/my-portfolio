import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { getHomeData } from "@/data/locale-data";
import type { Locale } from "@/i18n/routing";

export function Experience() {
  const locale = useLocale() as Locale;
  const t = useTranslations("home");
  const { experience } = getHomeData(locale);
  const aboutHref = locale === "en" ? "/en/about" : "/about";
  return (
    <Section id="experience" ariaLabel={t("experienceTitle")}>
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t("experienceTitle")}
        </h2>
        <p className="mt-3 text-muted">{t("experienceIntro")}</p>
      </div>

      <div className="mt-12 space-y-0 border-t border-line">
        {experience.map((item) => (
          <Reveal key={item.org}>
            <article className="grid gap-4 border-b border-line py-8 md:grid-cols-[1fr_2fr]">
              <div>
                <h3 className="font-display text-lg font-semibold">{item.org}</h3>
                <p className="mt-1 text-sm text-muted">{item.role}</p>
                <p className="mt-1 font-mono text-xs text-muted">{item.period}</p>
              </div>
              <div className="space-y-3 text-sm leading-relaxed">
                <p className="text-muted">{item.problem}</p>
                <p className="text-ink">{item.outcome}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      <div className="mt-8">
        <Link
          href={aboutHref}
          className="inline-flex items-center gap-1 text-sm font-medium text-violet-deep hover:text-ink"
        >
          {t("experienceMore")} <ArrowRight size={15} aria-hidden />
        </Link>
      </div>
    </Section>
  );
}
