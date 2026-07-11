import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { AboutPage } from "@/components/about/AboutPage";
import { JsonLd } from "@/components/ui/JsonLd";
import { CONTACT } from "@/lib/contact";

const DOMAIN = "https://oksasatya.dev";

export const metadata: Metadata = {
  title: "Tentang Saya — Full-Stack Developer (Go, Java, Next.js)",
  description:
    "Pengalaman, keahlian, dan perjalanan karier Oksa Satya: aplikasi enterprise di Dubai, platform ERP Dexova, dan backend Go, Java/Spring Boot, Laravel.",
  alternates: { canonical: "/about", languages: { id: "/about", en: "/en/about", "x-default": "/about" } },
  openGraph: {
    title: "Tentang Oksa Satya — Full-Stack Developer",
    description:
      "Profil, keahlian teknis, dan perjalanan karier sebagai full-stack developer dengan fokus backend.",
    url: "/about",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tentang Oksa Satya — Full-Stack Developer",
    description:
      "Profil, keahlian teknis, dan perjalanan karier sebagai full-stack developer.",
  },
};

const profilePageLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  url: `${DOMAIN}/about`,
  name: "Tentang Oksa Satya",
  mainEntity: {
    "@type": "Person",
    name: "Oksa Satya",
    url: DOMAIN,
    image: `${DOMAIN}/assets/images/about/me.png`,
    jobTitle: "Full-Stack Developer (Backend-Focus)",
    email: `mailto:${CONTACT.email}`,
    worksFor: {
      "@type": "Organization",
      name: "PT Infini Software House Technology DMCC",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Universitas Gunadarma",
    },
    knowsAbout: [
      "Go",
      "Java",
      "Spring Boot",
      "Laravel",
      "Next.js",
      "PostgreSQL",
      "HRIS",
      "Payroll System",
      "Point of Sale",
      "Multi-tenant SaaS",
    ],
    sameAs: [CONTACT.github, CONTACT.linkedin],
  },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Beranda", item: DOMAIN },
    { "@type": "ListItem", position: 2, name: "Tentang", item: `${DOMAIN}/about` },
  ],
};

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <JsonLd id="profile-ld" data={profilePageLd} />
      <JsonLd id="breadcrumb-ld" data={breadcrumbLd} />
      <AboutPage />
    </>
  );
}
