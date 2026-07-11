import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ServiceHubPage } from "@/components/service/ServiceHubPage";
import { JsonLd } from "@/components/ui/JsonLd";
import { getServiceHub } from "@/data/service-hub";
import { serviceLandings } from "@/data/services";
import { languageAlternates } from "@/i18n/routes";
import type { Locale } from "@/i18n/routing";

const DOMAIN = "https://oksasatya.dev";

const META = {
  id: {
    title: "Jasa Pembuatan Website, Aplikasi & API",
    description:
      "Jasa pembuatan website, aplikasi web, API/integrasi sistem, dan toko online dengan Go, Laravel, dan Next.js. Dari company profile sampai platform SaaS — backend skalabel, aman, dan siap tumbuh.",
    ogTitle: "Jasa Pembuatan Website, Aplikasi & API — Oksa Satya",
    ogDesc:
      "Jasa pembuatan website, aplikasi web, API & integrasi sistem dengan Go, Laravel, dan Next.js — backend skalabel sampai platform SaaS.",
    twDesc: "Jasa pembuatan website, aplikasi web, API & integrasi sistem — Go, Laravel, Next.js.",
  },
  en: {
    title: "Web, Application & API Development Services",
    description:
      "Website, web application, API/system integration, and e-commerce development with Go, Laravel, and Next.js. From company profiles to SaaS platforms — scalable, secure backends built to grow.",
    ogTitle: "Web, Application & API Development Services — Oksa Satya",
    ogDesc:
      "Website, web application, API & system integration development with Go, Laravel, and Next.js — scalable backends up to SaaS platforms.",
    twDesc: "Website, web app, API & system integration — Go, Laravel, Next.js.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = META[locale] ?? META.id;
  const url = locale === "en" ? "/en/service" : "/service";
  return {
    title: c.title,
    description: c.description,
    alternates: { canonical: url, languages: languageAlternates("/service") },
    openGraph: { title: c.ogTitle, description: c.ogDesc, url, type: "website" },
    twitter: { card: "summary_large_image", title: c.ogTitle, description: c.twDesc },
  };
}

const professionalServiceLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Oksa Satya — Jasa Pembuatan Website, Aplikasi & Backend",
  url: `${DOMAIN}/service`,
  description:
    "Jasa pembuatan website, aplikasi web, sistem informasi, dan API/integrasi sistem dengan Go, Laravel, Spring Boot, dan Next.js — dari company profile dan toko online sampai platform SaaS.",
  provider: { "@type": "Person", name: "Oksa Satya", url: DOMAIN },
  areaServed: ["Indonesia", "Worldwide"],
  serviceType: [
    "Jasa Pembuatan Website",
    "Jasa Pembuatan Aplikasi Web",
    "Jasa Pembuatan API & Integrasi Sistem",
    "Jasa Pembuatan Toko Online",
  ],
  knowsAbout: ["Go", "Java", "Spring Boot", "Laravel", "Next.js", "REST API", "SaaS", "Docker"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Layanan pengembangan software",
    itemListElement: serviceLandings.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.h1,
        url: `${DOMAIN}/jasa/${s.slug}`,
        description: s.tagline,
      },
    })),
  },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Beranda", item: DOMAIN },
    { "@type": "ListItem", position: 2, name: "Layanan", item: `${DOMAIN}/service` },
  ],
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  // FAQ rich-result markup mirrors the FAQ rendered on this page, per locale.
  const hub = getServiceHub(locale as Locale);
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: hub.faq.items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd id="professional-service-ld" data={professionalServiceLd} />
      <JsonLd id="breadcrumb-ld" data={breadcrumbLd} />
      <JsonLd id="service-faq-ld" data={faqLd} />
      <ServiceHubPage locale={locale as Locale} />
    </>
  );
}
