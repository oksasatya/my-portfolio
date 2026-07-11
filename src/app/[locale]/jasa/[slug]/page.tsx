import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import ServiceLandingArea from "@/components/jasa/ServiceLandingArea";
import { getAllServiceSlugs, getServiceLanding } from "@/data/services";

export function generateStaticParams() {
  // Jasa landing pages are Indonesian-only.
  return getAllServiceSlugs().map((slug) => ({ locale: "id", slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getServiceLanding(slug);
  if (!s) {
    return { title: "Layanan tidak ditemukan" };
  }
  const url = `/jasa/${s.slug}`;
  return {
    title: s.title,
    description: s.metaDescription,
    keywords: [...s.keywords],
    alternates: { canonical: url },
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
  if (locale !== "id") {
    notFound();
  }
  setRequestLocale(locale);
  const s = getServiceLanding(slug);
  if (!s) {
    notFound();
  }
  return <ServiceLandingArea landing={s} />;
}

export const dynamicParams = false;
