import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { waLink } from "@/lib/contact";
import { getAllArticleSlugs } from "@/data/articles";
import { getAllArticleEnSlugs } from "@/data/articles-en";
import { getArticleByLocale, getCaseStudyByLocale } from "@/data/locale-data";
import { languageAlternates } from "@/i18n/routes";
import type { Locale } from "@/i18n/routing";

const DOMAIN = "https://oksasatya.dev";

const COPY = {
  id: {
    notFound: "Artikel tidak ditemukan",
    crumbHome: "Beranda",
    crumbArticles: "Artikel",
    readSuffix: "menit baca",
    related: "Studi kasus terkait",
    ctaTitle: "Sedang membangun sistem serupa?",
    ctaBody: "Saya menerima proyek dan konsultasi teknis seputar sistem bisnis.",
    ctaButton: "Diskusikan lewat WhatsApp",
    waMessage: (title: string) => `Halo Oksa, saya membaca artikel "${title}" dan ingin berdiskusi.`,
  },
  en: {
    notFound: "Article not found",
    crumbHome: "Home",
    crumbArticles: "Articles",
    readSuffix: "min read",
    related: "Related case studies",
    ctaTitle: "Building something similar?",
    ctaBody: "I take on projects and technical consulting around business systems.",
    ctaButton: "Discuss on WhatsApp",
    waMessage: (title: string) => `Hi Oksa, I read the article "${title}" and would like to discuss.`,
  },
} as const;

export function generateStaticParams() {
  return [
    ...getAllArticleSlugs().map((slug) => ({ locale: "id", slug })),
    ...getAllArticleEnSlugs().map((slug) => ({ locale: "en", slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const c = COPY[locale] ?? COPY.id;
  const a = getArticleByLocale(locale, slug);
  if (!a) {
    return { title: c.notFound };
  }
  const url = locale === "en" ? `/en/articles/${a.slug}` : `/articles/${a.slug}`;
  return {
    title: a.title,
    description: a.description,
    alternates: {
      canonical: url,
      languages: languageAlternates(`/articles/${a.slug}`),
    },
    openGraph: {
      title: a.title,
      description: a.description,
      url,
      type: "article",
      publishedTime: a.publishedAt,
      authors: [DOMAIN],
      locale: locale === "en" ? "en_US" : "id_ID",
    },
    twitter: {
      card: "summary_large_image",
      title: a.title,
      description: a.description,
    },
  };
}

function formatDate(iso: string, locale: Locale): string {
  return new Date(iso).toLocaleDateString(locale === "en" ? "en-US" : "id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const c = COPY[locale] ?? COPY.id;
  const a = getArticleByLocale(locale, slug);
  if (!a) {
    notFound();
  }

  const related = a.relatedProjects
    .map((rel) => getCaseStudyByLocale(locale, rel))
    .filter((cs): cs is NonNullable<typeof cs> => Boolean(cs));

  const base = locale === "en" ? `${DOMAIN}/en` : DOMAIN;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    datePublished: a.publishedAt,
    inLanguage: locale === "en" ? "en" : "id-ID",
    url: `${base}/articles/${a.slug}`,
    author: { "@type": "Person", name: "Oksa Satya", url: DOMAIN },
    publisher: { "@type": "Person", name: "Oksa Satya", url: DOMAIN },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: c.crumbHome, item: base },
      { "@type": "ListItem", position: 2, name: c.crumbArticles, item: `${base}/articles` },
      {
        "@type": "ListItem",
        position: 3,
        name: a.title,
        item: `${base}/articles/${a.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd id="article-ld" data={articleLd} />
      <JsonLd id="breadcrumb-ld" data={breadcrumbLd} />
      <Header />
      <main>
        <div className="border-b border-line">
          <Container className="py-12 sm:py-16">
            <nav aria-label="Breadcrumb" className="font-mono text-xs text-muted">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-ink">{c.crumbHome}</Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/articles" className="hover:text-ink">{c.crumbArticles}</Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="text-ink">{a.title}</li>
              </ol>
            </nav>
            <div className="mt-8 max-w-3xl">
              <p className="font-mono text-xs text-muted">
                {formatDate(a.publishedAt, locale)} · {a.readingMinutes} {c.readSuffix}
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                {a.title}
              </h1>
              <div className="mt-4 flex flex-wrap gap-2">
                {a.tags.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </div>
          </Container>
        </div>

        <Container className="py-12 sm:py-16">
          <article className="max-w-3xl">
            <p className="text-lg leading-relaxed text-muted">{a.intro}</p>

            {a.sections.map((s) => (
              <section key={s.heading} className="mt-10">
                <h2 className="font-display text-2xl font-bold">{s.heading}</h2>
                {s.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)} className="mt-4 leading-relaxed">
                    {p}
                  </p>
                ))}
                {s.bullets && (
                  <ul className="mt-4 space-y-3">
                    {s.bullets.map((b) => (
                      <li key={b.slice(0, 40)} className="flex gap-3 leading-relaxed">
                        <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </article>

          {related.length > 0 && (
            <div className="mt-16 max-w-3xl border-t border-line pt-10">
              <h2 className="font-display text-xl font-bold">{c.related}</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {related.map((cs) => (
                  <Link
                    key={cs.slug}
                    href={`/projects/${cs.slug}`}
                    className="group rounded-xl border border-line bg-surface p-6 transition-colors hover:border-violet-glow"
                  >
                    <Badge>{cs.category}</Badge>
                    <p className="mt-3 font-display font-semibold transition-colors group-hover:text-violet-deep">
                      {cs.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-16 max-w-3xl rounded-2xl border border-line bg-surface p-8">
            <h2 className="font-display text-xl font-bold">{c.ctaTitle}</h2>
            <p className="mt-2 text-sm text-muted">{c.ctaBody}</p>
            <div className="mt-5">
              <Button href={waLink(c.waMessage(a.title))} external>
                {c.ctaButton} <ArrowRight size={14} aria-hidden />
              </Button>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export const dynamicParams = false;
