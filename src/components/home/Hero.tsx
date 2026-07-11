import { ArrowRight, FileDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { TechHero } from "@/components/three/tech-hero";
import { ContourBackdrop } from "@/components/ui/backdrops";
import { waLink, CV_URL } from "@/lib/contact";
import { getHomeData } from "@/data/locale-data";
import type { Locale } from "@/i18n/routing";

export function Hero() {
  const locale = useLocale() as Locale;
  const t = useTranslations("home");
  const th = useTranslations("header");
  const { trustItems } = getHomeData(locale);
  const caseHref = locale === "en" ? "/en/projects/dexova-erp" : "/projects/dexova-erp";

  return (
    <section className="relative overflow-hidden border-b border-line">
      <ContourBackdrop />
      <Container className="relative">
        <div className="grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-[0.78fr_1.22fr] lg:py-24">
          <div>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-[3.4rem] 2xl:text-6xl">
              {t.rich("heroTitle", {
                accent: (chunks) => <span className="text-violet-deep">{chunks}</span>,
              })}
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              {t.rich("heroSubtitle", {
                b: (chunks) => <strong className="font-semibold text-ink">{chunks}</strong>,
              })}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href={waLink(th("waMessage"))} external size="lg">
                {t("heroCtaPrimary")}
              </Button>
              <Button href={caseHref} variant="secondary" size="lg">
                {t("heroCtaCase")} <ArrowRight size={16} aria-hidden />
              </Button>
              <Button href={CV_URL} external variant="ghost" size="lg">
                <FileDown size={16} aria-hidden /> {t("heroCtaCv")}
              </Button>
            </div>
          </div>

          <div className="relative hidden lg:block lg:-mr-2 xl:-mr-6">
            <TechHero />
          </div>
        </div>

        <ul
          aria-label={t("trustLabel")}
          className="relative flex flex-wrap items-center gap-x-8 gap-y-2 border-t border-line py-5 font-mono text-xs text-muted sm:text-sm"
        >
          {trustItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
