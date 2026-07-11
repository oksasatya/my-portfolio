import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import ServiceLandingArea from "@/components/jasa/ServiceLandingArea";
import { getAllServiceSlugs, getServiceLanding, type ServiceLanding } from "@/data/services";
import { getAllServiceEnSlugs, getServiceLandingEn } from "@/data/services-en";
import { languageAlternates } from "@/i18n/routes";
import type { Locale } from "@/i18n/routing";

function landingFor(locale: string, slug: string): ServiceLanding | undefined {
  if (locale === "id") return getServiceLanding(slug);
  if (locale === "en") return getServiceLandingEn(slug);
  return undefined;
}

export function generateStaticParams() {
  // All landings exist in Indonesian; the niche services also ship in English.
  return [
    ...getAllServiceSlugs().map((slug) => ({ locale: "id", slug })),
    ...getAllServiceEnSlugs().map((slug) => ({ locale: "en", slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const s = landingFor(locale, slug);
  if (!s) {
    return { title: "Layanan tidak ditemukan" };
  }
  const idPath = `/jasa/${s.slug}`;
  const url = locale === "en" ? `/en${idPath}` : idPath;
  return {
    title: s.title,
    description: s.metaDescription,
    keywords: [...s.keywords],
    alternates: { canonical: url, languages: languageAlternates(idPath) },
    openGraph: {
      title: s.title,
      description: s.metaDescription,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: s.title,
      description: s.metaDescription,
    },
  };
}

export default async function JasaLandingPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const s = landingFor(locale, slug);
  if (!s) {
    notFound();
  }
  setRequestLocale(locale);
  return <ServiceLandingArea landing={s} locale={locale as Locale} />;
}

export const dynamicParams = false;
