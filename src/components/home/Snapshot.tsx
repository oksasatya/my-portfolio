import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";

/**
 * Slim availability strip between the tech marquee and the Dexova case study.
 * Complements the hero (which carries the proof facts) with the one signal the
 * hero lacks: a live "open to work" status for both the client and hiring
 * audiences. No duplicated stats, no big-number template — an editorial band on
 * the base tone that separates the two dark rhythm sections around it.
 */
export function Snapshot() {
  const t = useTranslations("home");

  return (
    <section aria-label={t("snapshotLabel")} className="border-b border-line bg-bg">
      <Container>
        <div className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <p className="text-sm leading-relaxed text-muted">
            <span className="font-mono text-xs text-violet-deep">{t("snapshotNow")}</span>{" "}
            {t("snapshotStatus")}
          </p>
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 sm:shrink-0">
            <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
              <span className="absolute inline-flex h-full w-full rounded-full bg-teal opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
            </span>
            <span className="text-sm font-medium text-ink">{t("snapshotAvailable")}</span>
            <span className="font-mono text-xs text-muted">{t("snapshotEngage")}</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
