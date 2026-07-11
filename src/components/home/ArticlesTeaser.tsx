import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";
import { articles } from "@/data/articles";

/** Renders nothing until real articles exist — no empty-section theater. */
export function ArticlesTeaser() {
  const locale = useLocale();
  const t = useTranslations("home");
  // Articles are Indonesian-only.
  if (locale === "en" || articles.length === 0) return null;

  return (
    <Section id="articles" className="border-t border-line bg-surface" ariaLabel={t("articlesTitle")}>
      <div className="flex items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {t("articlesTitle")}
          </h2>
          <p className="mt-3 max-w-xl text-muted">{t("articlesIntro")}</p>
        </div>
        <Link
          href="/articles"
          className="hidden shrink-0 items-center gap-1 text-sm font-medium text-violet-deep hover:text-ink sm:inline-flex"
        >
          {t("articlesAll")} <ArrowRight size={15} aria-hidden />
        </Link>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {articles.slice(0, 2).map((a) => (
          <article key={a.slug} className="group rounded-xl border border-line bg-bg p-7 transition-colors hover:border-violet-glow">
            <p className="font-mono text-xs text-muted">
              {new Date(a.publishedAt).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}{" "}
              · {a.readingMinutes} {t("articlesReadingTime")}
            </p>
            <h3 className="mt-3 font-display text-xl font-semibold">
              <Link
                href={`/articles/${a.slug}`}
                className="transition-colors group-hover:text-violet-deep"
              >
                {a.title}
              </Link>
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{a.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
