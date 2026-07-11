import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ProjectsPage } from "@/components/projects/ProjectsPage";
import { JsonLd } from "@/components/ui/JsonLd";
import { languageAlternates } from "@/i18n/routes";
import type { Locale } from "@/i18n/routing";

const DOMAIN = "https://oksasatya.dev";

const COPY = {
  id: {
    metaTitle: "Proyek & Studi Kasus — HRIS, POS, SaaS, API",
    metaDesc:
      "Studi kasus sistem bisnis yang dibangun Oksa Satya: Dexova ERP (HRIS, Payroll, POS, Inventory), SaaS multi-tenant, platform CMS, dan API — Go, Java, Laravel, Next.js.",
    ogTitle: "Proyek & Studi Kasus — Oksa Satya",
    ogDesc: "Studi kasus sistem bisnis: Dexova ERP, SaaS multi-tenant, platform CMS, dan API.",
    twDesc: "Studi kasus sistem bisnis: Dexova ERP, SaaS multi-tenant, dan API.",
    crumbHome: "Beranda",
    crumbProjects: "Proyek",
  },
  en: {
    metaTitle: "Projects & Case Studies — HRIS, POS, SaaS, API",
    metaDesc:
      "Business-system case studies built by Oksa Satya: Dexova ERP (HRIS, Payroll, POS, Inventory), multi-tenant SaaS, CMS platforms, and APIs — Go, Java, Laravel, Next.js.",
    ogTitle: "Projects & Case Studies — Oksa Satya",
    ogDesc: "Business-system case studies: Dexova ERP, multi-tenant SaaS, CMS platforms, and APIs.",
    twDesc: "Business-system case studies: Dexova ERP, multi-tenant SaaS, and APIs.",
    crumbHome: "Home",
    crumbProjects: "Projects",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = COPY[locale] ?? COPY.id;
  const url = locale === "en" ? "/en/projects" : "/projects";
  return {
    title: c.metaTitle,
    description: c.metaDesc,
    alternates: { canonical: url, languages: languageAlternates("/projects") },
    openGraph: { title: c.ogTitle, description: c.ogDesc, url, type: "website" },
    twitter: { card: "summary_large_image", title: c.ogTitle, description: c.twDesc },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = COPY[locale] ?? COPY.id;
  const base = locale === "en" ? `${DOMAIN}/en` : DOMAIN;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: c.crumbHome, item: base },
      { "@type": "ListItem", position: 2, name: c.crumbProjects, item: `${base}/projects` },
    ],
  };

  return (
    <>
      <JsonLd id="breadcrumb-ld" data={breadcrumbLd} />
      <ProjectsPage locale={locale} />
    </>
  );
}
