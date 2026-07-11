import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ContactPage } from "@/components/contact/ContactPage";
import { JsonLd } from "@/components/ui/JsonLd";

const DOMAIN = "https://oksasatya.dev";

export const metadata: Metadata = {
  title: "Hubungi Saya — Proyek, Remote, atau Konsultasi",
  description:
    "Hubungi Oksa Satya untuk proyek pembuatan website/aplikasi, peluang kerja remote, atau konsultasi teknis. WhatsApp dibalas kurang dari 24 jam.",
  alternates: { canonical: "/contact", languages: { id: "/contact", en: "/en/contact", "x-default": "/contact" } },
  openGraph: {
    title: "Hubungi Oksa Satya",
    description:
      "Proyek pembuatan website/aplikasi, peluang remote, atau konsultasi teknis.",
    url: "/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hubungi Oksa Satya",
    description: "Proyek, peluang remote, atau konsultasi teknis.",
  },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Beranda", item: DOMAIN },
    { "@type": "ListItem", position: 2, name: "Kontak", item: `${DOMAIN}/contact` },
  ],
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <JsonLd id="breadcrumb-ld" data={breadcrumbLd} />
      <ContactPage />
    </>
  );
}
