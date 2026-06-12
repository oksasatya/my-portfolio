import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Wrapper from "@/layouts/Wrapper";
import ServiceLandingArea from "@/components/jasa/ServiceLandingArea";
import { getAllServiceSlugs, getServiceLanding } from "@/data/services";

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const s = getServiceLanding(params.slug);
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

export default function JasaLandingPage({
  params,
}: {
  params: { slug: string };
}) {
  const s = getServiceLanding(params.slug);
  if (!s) {
    notFound();
  }
  return (
    <Wrapper>
      <ServiceLandingArea landing={s} />
    </Wrapper>
  );
}

export const dynamicParams = false;
