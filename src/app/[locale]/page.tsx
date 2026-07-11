import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Home from "@/components/home";
import type { Locale } from "@/i18n/routing";

const META: Record<Locale, { title: string; description: string }> = {
  id: {
    title: "Oksa Satya — Full-Stack Developer · Sistem Bisnis (HRIS, POS, SaaS)",
    description:
      "Full-stack developer (backend-focus) yang membangun sistem operasional bisnis: HRIS & payroll, POS, inventory, dan SaaS multi-tenant. Go, Java/Spring Boot, Laravel, Next.js.",
  },
  en: {
    title: "Oksa Satya — Full-Stack Developer · Business Systems (HRIS, POS, SaaS)",
    description:
      "Full-stack developer (backend-focused) building business operations systems: HRIS & payroll, POS, inventory, and multi-tenant SaaS. Go, Java/Spring Boot, Laravel, Next.js.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const m = META[locale] ?? META.id;
  const canonical = locale === "en" ? "/en" : "/";
  return {
    title: { absolute: m.title },
    description: m.description,
    alternates: {
      canonical,
      languages: { id: "/", en: "/en", "x-default": "/" },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: canonical,
      locale: locale === "en" ? "en_US" : "id_ID",
      type: "website",
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <Home />;
}
