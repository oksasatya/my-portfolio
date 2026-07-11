import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { getArticlesByLocale } from "@/data/locale-data";
import { languageAlternates } from "@/i18n/routes";
import type { Locale } from "@/i18n/routing";

const DOMAIN = "https://oksasatya.dev";

const COPY = {
  id: {
    metaTitle: "Artikel & Engineering Notes",
    metaDesc:
      "Catatan teknis dari membangun sistem bisnis production: arsitektur HRIS & payroll, SaaS multi-tenant, PostgreSQL, dan deployment Next.js + Go.",
    ogDesc:
      "Catatan teknis dari membangun sistem bisnis production: HRIS & payroll, SaaS multi-tenant, dan lainnya.",
    heading: "Engineering notes",
    intro:
      "Catatan teknis dari membangun sistem bisnis production — ditulis dari pengalaman, bukan teori.",
    crumbHome: "Beranda",
    crumbArticles: "Artikel",
    readSuffix: "menit baca",
  },
  en: {
    metaTitle: "Articles & Engineering Notes",
    metaDesc:
      "Technical notes from building production business systems: HRIS & payroll architecture, multi-tenant SaaS, PostgreSQL, and Next.js + Go deployment.",
    ogDesc:
      "Technical notes from building production business systems: HRIS & payroll, multi-tenant SaaS, and more.",
    heading: "Engineering notes",
    intro:
      "Technical notes from building production business systems — written from experience, not theory.",
    crumbHome: "Home",
    crumbArticles: "Articles",
    readSuffix: "min read",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = COPY[locale] ?? COPY.id;
  const url = locale === "en" ? "/en/articles" : "/articles";
  return {
    title: c.metaTitle,
    description: c.metaDesc,
    alternates: { canonical: url, languages: languageAlternates("/articles") },
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

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = COPY[locale] ?? COPY.id;
  const articles = getArticlesByLocale(locale);
  const base = locale === "en" ? `${DOMAIN}/en` : DOMAIN;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: c.crumbHome, item: base },
      { "@type": "ListItem", position: 2, name: c.crumbArticles, item: `${base}/articles` },
    ],
  };

  return (
    <>
      <JsonLd id="breadcrumb-ld" data={breadcrumbLd} />
      <Header />
      <main>
        <div className="border-b border-line">
          <Container className="py-14 sm:py-20">
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
              {c.heading}
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted">{c.intro}</p>
          </Container>
        </div>

        <Container className="py-14 sm:py-16">
          <div className="grid gap-6 md:grid-cols-2">
            {articles.map((a) => (
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
                <p className="mt-4 font-mono text-xs text-violet-deep">
                  {a.tags.join(" · ")}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
