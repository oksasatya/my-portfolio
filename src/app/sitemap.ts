import type { MetadataRoute } from 'next';
import { getAllCaseStudySlugs } from '@/data/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || 'https://oksasatya.dev';
  const site = raw.replace(/\/$/, '');

  const paths = [
    '/',
    '/about',
    '/contact',
    '/projects',
    '/service',
    ...getAllCaseStudySlugs().map((slug) => `/projects/${slug}`),
  ];

  const now = new Date();

  return paths.map((path) => ({
    url: `${site}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '/' ? 1 : 0.7,
  }));
}

