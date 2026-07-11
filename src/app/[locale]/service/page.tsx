import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ServiceHubPage } from "@/components/service/ServiceHubPage";
import { JsonLd } from "@/components/ui/JsonLd";

const DOMAIN = "https://oksasatya.dev";

export const metadata: Metadata = {
  title: "Jasa Pembuatan Website, Aplikasi & API",
  description:
    "Jasa pembuatan website, aplikasi web, API/integrasi sistem, dan toko online dengan Go, Laravel, dan Next.js. Dari company profile sampai platform SaaS — backend skalabel, aman, dan siap tumbuh.",
  alternates: { canonical: "/service", languages: { id: "/service", en: "/en/service", "x-default": "/service" } },
  openGraph: {
    title: "Jasa Pembuatan Website, Aplikasi & API — Oksa Satya",
    description:
      "Jasa pembuatan website, aplikasi web, API & integrasi sistem dengan Go, Laravel, dan Next.js — backend skalabel sampai platform SaaS.",
    url: "/service",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jasa Pembuatan Website, Aplikasi & API — Oksa Satya",
    description:
      "Jasa pembuatan website, aplikasi web, API & integrasi sistem — Go, Laravel, Next.js.",
  },
};

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
  return (
    <>
      <JsonLd id="professional-service-ld" data={professionalServiceLd} />
      <JsonLd id="breadcrumb-ld" data={breadcrumbLd} />
      <ServiceHubPage />
    </>
  );
}
