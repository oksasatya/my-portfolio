import "../../styles/globals.css";
import React from "react";
import Script from "next/script";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { bricolage, figtree, jetbrainsMono } from "../fonts";
import { JsonLd } from "@/components/ui/JsonLd";
import { CONTACT } from "@/lib/contact";

const DOMAIN = "https://oksasatya.dev";
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export const metadata: Metadata = {
  metadataBase: new URL(DOMAIN),
  title: {
    default: "Oksa Satya — Full-Stack Developer · Sistem Bisnis (HRIS, POS, SaaS)",
    template: "%s – Oksa Satya",
  },
  description:
    "Full-stack developer (backend-focus) yang membangun sistem operasional bisnis: HRIS & payroll, POS, inventory, dan SaaS multi-tenant. Go, Java/Spring Boot, Laravel, Next.js. Menerima jasa pembuatan website, aplikasi web, dan API.",
  openGraph: {
    siteName: "Oksa Satya",
    type: "website",
    // Social image provided by app/[locale]/opengraph-image.tsx (generated 1200x630).
  },
  twitter: {
    card: "summary_large_image",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Oksa Satya",
  url: DOMAIN,
};

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Oksa Satya",
  url: DOMAIN,
  jobTitle: "Full-Stack Developer (Backend-Focus)",
  description:
    "Full-stack developer (backend-focused) building business operations systems — HRIS & payroll, POS, inventory, and multi-tenant SaaS. Creator of Dexova. Available worldwide for freelance projects and international remote full-time roles.",
  email: `mailto:${CONTACT.email}`,
  image: `${DOMAIN}/assets/images/about/me.png`,
  nationality: { "@type": "Country", name: "Indonesia" },
  knowsLanguage: ["id", "en"],
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
  worksFor: {
    "@type": "Organization",
    name: "PT Infini Software House Technology DMCC",
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
    "Inventory Management",
    "Multi-tenant SaaS",
    "REST API",
  ],
  sameAs: [CONTACT.github, CONTACT.linkedin, "https://www.facebook.com/oksastya/"],
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${bricolage.variable} ${figtree.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <JsonLd id="website-ld" data={websiteLd} />
        <JsonLd id="person-ld" data={personLd} />

        {/* Prefer GTM if provided; do not also load GA4 directly to avoid duplicate events */}
        {GTM_ID && (
          <Script id="gtm-base" strategy="lazyOnload">{`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}</Script>
        )}

        {/* If no GTM, load GA4 directly and disable automatic page_view */}
        {!GTM_ID && GA4_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
              strategy="lazyOnload"
            />
            <Script id="gtag-init" strategy="lazyOnload">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA4_ID}', { send_page_view: false });
            `}</Script>
          </>
        )}
      </head>
      <body>
        {/* GTM noscript iframe */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
