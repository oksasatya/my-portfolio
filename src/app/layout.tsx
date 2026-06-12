// app/layout.tsx
import "../styles/index.css";
import React from "react";
import Script from "next/script";
import Preloader from "@/components/common/preloader";
import type { Metadata } from "next";
import { poppins, oswald } from "./fonts";

const DOMAIN = "https://oksasatya.dev";
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export const metadata: Metadata = {
  metadataBase: new URL(DOMAIN),
  title: {
    default: "Oksa Satya – Full Stack Developer (Golang, Laravel, Next.js)",
    template: "%s – Oksa Satya",
  },
  description:
    "Portfolio Oksa Satya, Full Stack Developer berpengalaman dalam backend (Golang, Laravel, Spring Boot, Next.js). Membangun aplikasi web skalabel, API, dan platform SaaS.",
  keywords: [
    "Oksa Satya",
    "Full Stack Developer",
    "Backend Developer",
    "Golang",
    "Laravel",
    "Spring Boot",
    "Next.js",
    "React",
    "PostgreSQL",
    "Docker",
    "Jasa Pembuatan Website",
    "Developer Indonesia",
    "Freelance Developer",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Oksa Satya – Portfolio Full Stack Developer",
    description:
      "Lihat proyek, keahlian, dan pengalaman saya dalam Golang, Laravel, Spring Boot, dan Next.js.",
    url: DOMAIN,
    siteName: "Portfolio Oksa Satya",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/assets/images/about/me.jpg",
        width: 1200,
        height: 630,
        alt: "Oksa Satya – Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oksa Satya – Portfolio Full Stack Developer",
    description:
      "Developer full-stack dengan fokus backend. API skalabel, microservices, arsitektur bersih.",
    images: ["/assets/images/about/me.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Portfolio Oksa Satya",
    url: DOMAIN,
  };

  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Oksa Satya",
    url: DOMAIN,
    jobTitle: "Backend Engineer / Full Stack Developer",
    email: "mailto:oksasatyaa@gmail.com",
    image: `${DOMAIN}/assets/images/about/me.jpg`,
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
      "Docker",
      "Backend Engineering",
      "REST API",
      "SaaS",
    ],
    sameAs: [
      "https://github.com/oksasatya",
      "https://www.linkedin.com/in/oksastya/",
      "https://www.facebook.com/oksastya/",
    ],
  };

  return (
    <html lang="id" className={`${poppins.variable} ${oswald.variable}`}>
      <head>
        {/* JSON-LD structured data */}
        <Script
          id="website-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          id="person-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />

        {/* Prefer GTM if provided; do not also load GA4 directly to avoid duplicate events */}
        {GTM_ID && (
          <Script id="gtm-base" strategy="afterInteractive">{`
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
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">{`
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
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}

        <Preloader />
        {children}
      </body>
    </html>
  );
}
