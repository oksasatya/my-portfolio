import type { MetadataRoute } from "next";
import { getAllCaseStudySlugs } from "@/data/projects";
import { getAllCaseStudyEnSlugs } from "@/data/projects-en";
import { getAllServiceSlugs } from "@/data/services";
import { getAllServiceEnSlugs } from "@/data/services-en";
import { articles } from "@/data/articles";
import { articlesEn } from "@/data/articles-en";

// Redesign shipped: meaningful lastmod baseline for redesigned pages.
const REDESIGN_DATE = new Date("2026-07-11");

export default function sitemap(): MetadataRoute.Sitemap {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || "https://oksasatya.dev";
  const site = raw.replace(/\/$/, "");

  const entry = (
    path: string,
    priority: number,
    lastModified: Date = REDESIGN_DATE,
    changeFrequency: "weekly" | "monthly" = "monthly",
  ): MetadataRoute.Sitemap[number] => ({
    url: `${site}${path}`,
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    entry("/", 1, REDESIGN_DATE, "weekly"),
    entry("/projects", 0.9, REDESIGN_DATE, "weekly"),
    entry("/service", 0.8),
    entry("/about", 0.7),
    entry("/articles", 0.7, REDESIGN_DATE, "weekly"),
    ...getAllServiceSlugs().map((slug) => entry(`/jasa/${slug}`, 0.8)),
    ...getAllCaseStudySlugs().map((slug) =>
      entry(`/projects/${slug}`, slug.startsWith("dexova") ? 0.9 : 0.7),
    ),
    ...articles.map((a) =>
      entry(`/articles/${a.slug}`, 0.6, new Date(a.publishedAt)),
    ),
    // English layer
    entry("/en", 0.8),
    entry("/en/projects", 0.7, REDESIGN_DATE, "weekly"),
    entry("/en/service", 0.6),
    entry("/en/about", 0.6),
    ...getAllServiceEnSlugs().map((slug) => entry(`/en/jasa/${slug}`, 0.7)),
    entry("/en/articles", 0.6, REDESIGN_DATE, "weekly"),
    ...getAllCaseStudyEnSlugs().map((slug) =>
      entry(`/en/projects/${slug}`, slug.startsWith("dexova") ? 0.8 : 0.6),
    ),
    ...articlesEn.map((a) =>
      entry(`/en/articles/${a.slug}`, 0.5, new Date(a.publishedAt)),
    ),
  ];
}
