import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const site = raw.replace(/\/$/, '');

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/private/'],
    },
    sitemap: `${site}/sitemap.xml`,
    host: site,
  };
}

