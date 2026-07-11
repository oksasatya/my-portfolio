import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { NodesBackdrop } from "@/components/ui/backdrops";
import { Scene3D } from "@/components/three/Scene3D";
import { getHomeData } from "@/data/locale-data";
import type { Locale } from "@/i18n/routing";

export function FeaturedDexova() {
  const locale = useLocale() as Locale;
  const t = useTranslations("home");
  const { dexovaProblems } = getHomeData(locale);
  const base = locale === "en" ? "/en/projects" : "/projects";

  return (
    <Section dark id="dexova" className="overflow-hidden" contained={false}>
      <Scene3D dense={false} fallback={<NodesBackdrop />} className="opacity-70" />
      <Container className="relative">
        <div className="max-w-2xl">
          <Kicker dark>{t("featuredKicker")}</Kicker>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("featuredTitle")}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/70">{t("featuredIntro")}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {dexovaProblems.map((p, i) => (
            <Reveal key={p.tag} delay={i * 90}>
              <div className="h-full rounded-xl border border-white/10 bg-white/[0.04] p-6">
                <p className="font-mono text-xs text-teal">{p.tag}</p>
                <h3 className="mt-3 font-display text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{p.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-[2fr_1fr]">
          <figure className="overflow-hidden rounded-xl border border-white/10">
            <Image
              src="/assets/images/dexova/dexova-hris-golongan-job-level.webp"
              alt={t("featuredScreenshotAlt")}
              width={1510}
              height={859}
              sizes="(min-width: 1024px) 640px, 90vw"
              className="w-full"
            />
            <figcaption className="border-t border-white/10 px-4 py-2 font-mono text-xs text-white/50">
              {t("featuredScreenshotCaption")}
            </figcaption>
          </figure>

          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-6">
            <p className="font-mono text-xs text-violet-glow">{t("featuredArchLabel")}</p>
            <dl className="mt-4 space-y-3 font-mono text-sm leading-relaxed text-white/75">
              <div>
                <dt className="text-white/45">{t("featuredArchSurfaces")}</dt>
                <dd>dex-fe · dex-attendance (PWA) · dex-pos</dd>
              </div>
              <div>
                <dt className="text-white/45">{t("featuredArchBackend")}</dt>
                <dd>Go — modular monolith, 4 modul</dd>
              </div>
              <div>
                <dt className="text-white/45">{t("featuredArchData")}</dt>
                <dd>PostgreSQL + sqlc · Redis · SSE · WebSocket</dd>
              </div>
              <div>
                <dt className="text-white/45">{t("featuredArchIntegrations")}</dt>
                <dd>Midtrans (QRIS) · OpenAI / Google AI</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button href={`${base}/dexova-erp`} variant="inverse" size="lg">
            {t("featuredCtaFull")} <ArrowRight size={16} aria-hidden />
          </Button>
          <Button
            href={`${base}/dexova-hris`}
            variant="ghost"
            className="text-violet-glow hover:text-white"
          >
            {t("featuredCtaHris")}
          </Button>
          <Button
            href={`${base}/dexova-pos`}
            variant="ghost"
            className="text-violet-glow hover:text-white"
          >
            {t("featuredCtaPos")}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
