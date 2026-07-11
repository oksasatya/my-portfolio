import { useLocale, useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { getHomeData } from "@/data/locale-data";
import type { Locale } from "@/i18n/routing";

export function Capabilities() {
  const locale = useLocale() as Locale;
  const t = useTranslations("home");
  const { capabilities } = getHomeData(locale);
  return (
    <Section id="capabilities" className="border-y border-line bg-surface" ariaLabel={t("capabilitiesTitle")}>
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t("capabilitiesTitle")}
        </h2>
        <p className="mt-3 text-muted">{t("capabilitiesIntro")}</p>
      </div>

      <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {capabilities.map((cap, i) => (
          <Reveal key={cap.title} delay={(i % 4) * 70}>
            <div>
              <h3 className="font-display text-base font-semibold">{cap.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {cap.description}
              </p>
              <p className="mt-3 font-mono text-xs leading-relaxed text-violet-deep">
                {cap.tech.join(" · ")}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
