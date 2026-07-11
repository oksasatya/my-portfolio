import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { AboutPage } from "@/components/about/AboutPage";
import { JsonLd } from "@/components/ui/JsonLd";
import { CONTACT } from "@/lib/contact";
import { languageAlternates } from "@/i18n/routes";
import type { Locale } from "@/i18n/routing";

const DOMAIN = "https://oksasatya.dev";

const COPY = {
  id: {
    metaTitle: "Tentang Saya — Full-Stack Developer (Go, Java, Next.js)",
    metaDesc:
      "Pengalaman, keahlian, dan perjalanan karier Oksa Satya: 4+ tahun aplikasi enterprise di Dubai, platform ERP Dexova, dan backend Go, Java/Spring Boot, Laravel. Terbuka untuk proyek freelance & peran remote internasional.",
    ogTitle: "Tentang Oksa Satya — Full-Stack Developer",
    ogDesc:
      "Profil, keahlian teknis, dan perjalanan karier sebagai full-stack developer dengan fokus backend.",
    keywords: [
      "Oksa Satya",
      "full-stack developer",
      "backend developer",
      "developer Go",
      "developer Java Spring Boot",
      "developer Laravel",
      "jasa pembuatan aplikasi",
      "hire remote developer",
    ],
    profileName: "Tentang Oksa Satya",
    crumbHome: "Beranda",
    crumbAbout: "Tentang",
    personDesc:
      "Full-stack developer (backend-focus) yang membangun sistem operasional bisnis — HRIS & payroll, POS, inventory, dan SaaS multi-tenant. Pembuat Dexova. Terbuka untuk proyek freelance dan peran remote full-time internasional.",
  },
  en: {
    metaTitle: "About Me — Full-Stack Developer (Go, Java, Next.js)",
    metaDesc:
      "Experience, skills, and career of Oksa Satya: 4+ years of enterprise applications in Dubai, the Dexova ERP platform, and Go, Java/Spring Boot, Laravel backends. Open to freelance projects & international remote roles.",
    ogTitle: "About Oksa Satya — Full-Stack Developer",
    ogDesc:
      "Profile, technical skills, and career as a full-stack developer with a backend focus.",
    keywords: [
      "Oksa Satya",
      "full-stack developer",
      "backend developer",
      "Go developer",
      "Java Spring Boot developer",
      "Laravel developer",
      "hire remote developer",
      "Indonesian software engineer",
    ],
    profileName: "About Oksa Satya",
    crumbHome: "Home",
    crumbAbout: "About",
    personDesc:
      "Full-stack developer (backend-focused) building business operations systems — HRIS & payroll, POS, inventory, and multi-tenant SaaS. Creator of Dexova. Open to freelance projects and international remote full-time roles.",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = COPY[locale] ?? COPY.id;
  const url = locale === "en" ? "/en/about" : "/about";
  return {
    title: c.metaTitle,
    description: c.metaDesc,
    keywords: [...c.keywords],
    alternates: { canonical: url, languages: languageAlternates("/about") },
    openGraph: { title: c.ogTitle, description: c.ogDesc, url, type: "profile" },
    twitter: { card: "summary_large_image", title: c.ogTitle, description: c.ogDesc },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = COPY[locale] ?? COPY.id;
  const base = locale === "en" ? `${DOMAIN}/en` : DOMAIN;

  const profilePageLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${base}/about`,
    inLanguage: locale,
    name: c.profileName,
    mainEntity: {
      "@type": "Person",
      name: "Oksa Satya",
      url: DOMAIN,
      image: `${DOMAIN}/assets/images/about/me.png`,
      jobTitle: "Full-Stack Developer (Backend-Focus)",
      description: c.personDesc,
      email: `mailto:${CONTACT.email}`,
      nationality: { "@type": "Country", name: "Indonesia" },
      knowsLanguage: ["id", "en"],
      worksFor: {
        "@type": "Organization",
        name: "PT Infini Software House Technology DMCC",
      },
      alumniOf: [
        { "@type": "CollegeOrUniversity", name: "Universitas Gunadarma" },
        { "@type": "EducationalOrganization", name: "Hacktiv8" },
      ],
      hasOccupation: {
        "@type": "Occupation",
        name: "Full-Stack Developer",
        occupationalCategory: "15-1252.00",
        skills:
          "Go, Java, Spring Boot, Laravel, Node.js, Next.js, React, PostgreSQL, Redis, Docker, REST API, HRIS, Payroll, Point of Sale, Inventory, Multi-tenant SaaS",
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
      { "@type": "ListItem", position: 1, name: c.crumbHome, item: base },
      { "@type": "ListItem", position: 2, name: c.crumbAbout, item: `${base}/about` },
    ],
  };

  return (
    <>
      <JsonLd id="profile-ld" data={profilePageLd} />
      <JsonLd id="breadcrumb-ld" data={breadcrumbLd} />
      <AboutPage />
    </>
  );
}
