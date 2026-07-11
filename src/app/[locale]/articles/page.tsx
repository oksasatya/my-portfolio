import type { Metadata } from "next";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { NodesBackdrop } from "@/components/ui/backdrops";
import { getArticlesByLocale } from "@/data/locale-data";
import { languageAlternates } from "@/i18n/routes";
import type { Locale } from "@/i18n/routing";

const DOMAIN = "https://oksasatya.dev";
const PAGE_SIZE = 9;

const COPY = {
  id: {
    metaTitle: "Artikel & Engineering Notes",
    metaDesc:
      "Catatan teknis dari membangun sistem bisnis production: arsitektur HRIS & payroll, sistem kasir (POS), SaaS multi-tenant, PostgreSQL RLS, integrasi Midtrans, dan pola Go/Java/Laravel.",
    ogDesc:
      "Catatan teknis dari membangun sistem bisnis production: HRIS & payroll, POS, SaaS multi-tenant, dan lainnya.",
    keywords: [
      "artikel engineering",
      "arsitektur HRIS payroll",
      "sistem kasir POS",
      "SaaS multi-tenant",
      "PostgreSQL RLS",
      "integrasi Midtrans QRIS",
      "arsitektur hexagonal Go",
      "error handling Go",
      "JWT refresh rotation",
      "N+1 query",
    ],
    heading: "Engineering notes",
    intro:
      "Catatan teknis dari membangun sistem bisnis production — ditulis dari pengalaman, bukan teori.",
    stat: (n: number) => `${n} artikel · payroll, POS, multi-tenant, Go, PostgreSQL`,
    crumbHome: "Beranda",
    crumbArticles: "Artikel",
    readSuffix: "menit baca",
    prev: "Sebelumnya",
    next: "Berikutnya",
    pageLabel: (p: number, total: number) => `Halaman ${p} dari ${total}`,
    paginationAria: "Navigasi halaman artikel",
  },
  en: {
    metaTitle: "Articles & Engineering Notes",
    metaDesc:
      "Technical notes from building production business systems: HRIS & payroll architecture, point-of-sale (POS), multi-tenant SaaS, PostgreSQL RLS, Midtrans integration, and Go/Java/Laravel patterns.",
    ogDesc:
      "Technical notes from building production business systems: HRIS & payroll, POS, multi-tenant SaaS, and more.",
    keywords: [
      "engineering articles",
      "HRIS payroll architecture",
      "point of sale POS system",
      "multi-tenant SaaS",
      "PostgreSQL RLS",
      "Midtrans QRIS integration",
      "hexagonal architecture Go",
      "Go error handling",
      "JWT refresh rotation",
      "N+1 query",
    ],
    heading: "Engineering notes",
    intro:
      "Technical notes from building production business systems — written from experience, not theory.",
    stat: (n: number) => `${n} articles · payroll, POS, multi-tenant, Go, PostgreSQL`,
    crumbHome: "Home",
    crumbArticles: "Articles",
    readSuffix: "min read",
    prev: "Previous",
    next: "Next",
    pageLabel: (p: number, total: number) => `Page ${p} of ${total}`,
    paginationAria: "Article pagination",
  },
} as const;

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const { locale } = await params;
  const sp = await searchParams;
  const c = COPY[locale] ?? COPY.id;
  const page = Math.max(1, Number(Array.isArray(sp.page) ? sp.page[0] : sp.page) || 1);
  const path = "/articles";
  const base = locale === "en" ? "/en/articles" : "/articles";
  const url = page > 1 ? `${base}?page=${page}` : base;
  const title = page > 1 ? `${c.metaTitle} — ${c.pageLabel(page, page)}` : c.metaTitle;
  return {
    title,
    description: c.metaDesc,
    keywords: [...c.keywords],
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      title: `${c.metaTitle} — Oksa Satya`,
      description: c.ogDesc,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${c.metaTitle} — Oksa Satya`,
      description: c.ogDesc,
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

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);
  const c = COPY[locale] ?? COPY.id;
  const base = locale === "en" ? `${DOMAIN}/en` : DOMAIN;

  const articles = [...getArticlesByLocale(locale)].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
  const totalPages = Math.max(1, Math.ceil(articles.length / PAGE_SIZE));
  const requested = Number(Array.isArray(sp.page) ? sp.page[0] : sp.page) || 1;
  const page = Math.min(Math.max(1, requested), totalPages);
  const pageArticles = articles.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: c.crumbHome, item: base },
      { "@type": "ListItem", position: 2, name: c.crumbArticles, item: `${base}/articles` },
    ],
  };

  const blogLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${c.heading} — Oksa Satya`,
    url: `${base}/articles`,
    inLanguage: locale,
    blogPost: articles.map((a) => ({
      "@type": "BlogPosting",
      headline: a.title,
      description: a.description,
      url: `${base}/articles/${a.slug}`,
      datePublished: a.publishedAt,
      keywords: a.tags.join(", "),
      author: { "@type": "Person", name: "Oksa Satya", url: DOMAIN },
    })),
  };

  // next-intl Link adds the locale prefix — keep hrefs locale-agnostic.
  const pageHref = (p: number) => (p <= 1 ? "/articles" : `/articles?page=${p}`);

  return (
    <>
      <JsonLd id="breadcrumb-ld" data={breadcrumbLd} />
      <JsonLd id="blog-ld" data={blogLd} />
      <Header />
      <main>
        {/* Header — dark with the node motif so the page opens with depth. */}
        <div className="relative overflow-hidden border-b border-line bg-dark">
          <NodesBackdrop />
          <Container className="relative py-14 sm:py-20">
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
              {c.heading}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted">{c.intro}</p>
            <p className="mt-6 font-mono text-xs text-teal sm:text-sm">
              {c.stat(articles.length)}
            </p>
          </Container>
        </div>

        <Container className="py-14 sm:py-16">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pageArticles.map((a) => (
              <article
                key={a.slug}
                className="group flex h-full flex-col rounded-xl border border-line bg-surface p-7 transition-colors hover:border-violet-glow"
              >
                <p className="font-mono text-xs text-muted">
                  {formatDate(a.publishedAt, locale)} · {a.readingMinutes} {c.readSuffix}
                </p>
                <h2 className="mt-3 font-display text-xl font-semibold">
                  <Link
                    href={`/articles/${a.slug}`}
                    className="transition-colors group-hover:text-violet-deep"
                  >
                    {a.title}
                  </Link>
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {a.description}
                </p>
                <p className="mt-4 font-mono text-xs text-violet-deep">{a.tags.join(" · ")}</p>
              </article>
            ))}
          </div>

          {totalPages > 1 && (
            <nav
              aria-label={c.paginationAria}
              className="mt-12 flex items-center justify-between gap-4 border-t border-line pt-6"
            >
              {page > 1 ? (
                <Link
                  href={pageHref(page - 1)}
                  rel="prev"
                  className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-violet-deep hover:text-ink"
                >
                  <ArrowLeft size={15} aria-hidden /> {c.prev}
                </Link>
              ) : (
                <span aria-hidden />
              )}

              <span className="font-mono text-xs text-muted">
                {c.pageLabel(page, totalPages)}
              </span>

              {page < totalPages ? (
                <Link
                  href={pageHref(page + 1)}
                  rel="next"
                  className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-violet-deep hover:text-ink"
                >
                  {c.next} <ArrowRight size={15} aria-hidden />
                </Link>
              ) : (
                <span aria-hidden />
              )}
            </nav>
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
}
