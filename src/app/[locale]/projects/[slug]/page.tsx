import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { CaseStudyPage } from "@/components/case-study/CaseStudyPage";
import { JsonLd } from "@/components/ui/JsonLd";
import { getAllCaseStudySlugs } from "@/data/projects";
import { getAllCaseStudyEnSlugs } from "@/data/projects-en";
import { getCaseStudyByLocale } from "@/data/locale-data";
import type { Locale } from "@/i18n/routing";

const DOMAIN = "https://oksasatya.dev";

export function generateStaticParams() {
  return [
    ...getAllCaseStudySlugs().map((slug) => ({ locale: "id", slug })),
    ...getAllCaseStudyEnSlugs().map((slug) => ({ locale: "en", slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const cs = getCaseStudyByLocale(locale, slug);
  if (!cs) {
    return { title: locale === "en" ? "Project not found" : "Proyek tidak ditemukan" };
  }
  const idUrl = `/projects/${cs.slug}`;
  const url = locale === "en" ? `/en${idUrl}` : idUrl;
  const title =
    locale === "en" ? `${cs.title} — Case Study` : `${cs.title} — Studi Kasus`;
  const hasEn = cs.slug.startsWith("dexova");
  return {
    title,
    description: cs.summary,
    alternates: {
      canonical: url,
      ...(hasEn && {
        languages: { id: idUrl, en: `/en${idUrl}`, "x-default": idUrl },
      }),
    },
    openGraph: {
      title,
      description: cs.summary,
      url,
      type: "article",
      locale: locale === "en" ? "en_US" : "id_ID",
      images: [{ url: cs.image, alt: cs.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: cs.summary,
      images: [cs.image],
    },
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const cs = getCaseStudyByLocale(locale, slug);
  if (!cs) {
    notFound();
  }

  const related = (cs.deepDive?.related ?? [])
    .map((rel) => getCaseStudyByLocale(locale, rel))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const base = locale === "en" ? `${DOMAIN}/en` : DOMAIN;

  const creativeWorkLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: cs.title,
    description: cs.summary,
    url: `${base}/projects/${cs.slug}`,
    image: `${DOMAIN}${cs.image}`,
    inLanguage: locale === "en" ? "en" : "id",
    dateCreated: String(cs.year),
    author: { "@type": "Person", name: "Oksa Satya", url: DOMAIN },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "en" ? "Home" : "Beranda",
        item: locale === "en" ? `${DOMAIN}/en` : DOMAIN,
      },
      ...(locale === "id"
        ? [{ "@type": "ListItem", position: 2, name: "Proyek", item: `${DOMAIN}/projects` }]
        : []),
      {
        "@type": "ListItem",
        position: locale === "id" ? 3 : 2,
        name: cs.title,
        item: `${base}/projects/${cs.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd id="case-study-ld" data={creativeWorkLd} />
      <JsonLd id="breadcrumb-ld" data={breadcrumbLd} />
      <CaseStudyPage cs={cs} related={related} />
    </>
  );
}

// Only listed slug+locale pairs are valid; everything else 404s.
export const dynamicParams = false;
