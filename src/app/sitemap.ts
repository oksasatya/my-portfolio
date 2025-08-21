import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const site = raw.replace(/\/$/, '');

  const paths = [
    '/',
    '/about',
    '/contact',
    '/projects',
    '/service',
    '/single-project',
  ];

  const now = new Date();

  return paths.map((path) => ({
    url: `${site}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '/' ? 1 : 0.7,
  }));
}

