import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Wrapper from "@/layouts/Wrapper";
import CaseStudyDetail from "@/components/single-project/CaseStudyDetail";
import { getAllCaseStudySlugs, getCaseStudy } from "@/data/projects";

export function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const cs = getCaseStudy(params.slug);
  if (!cs) {
    return { title: "Proyek tidak ditemukan" };
  }
  const url = `/projects/${cs.slug}`;
  const title = `${cs.title} — Studi Kasus`;
  return {
    title,
    description: cs.summary,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: cs.summary,
      url,
      type: "article",
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

export default function ProjectCaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const cs = getCaseStudy(params.slug);
  if (!cs) {
    notFound();
  }
  return (
    <Wrapper>
      <CaseStudyDetail caseStudy={cs} />
    </Wrapper>
  );
}

// Only the slugs listed in projects.ts are valid; everything else 404s.
export const dynamicParams = false;
