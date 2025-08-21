// app/layout.tsx
import "../styles/index.css";
import React from "react";
import Script from "next/script";
import TemplateScripts from "@/components/common/TemplateScripts";
import Preloader from "@/components/common/preloader";
import type { Metadata } from "next";

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
        "Portfolio & resume of Oksa Satya, Full Stack Developer focused on backend (Golang, Laravel, Spring Boot, Next.js).",
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
    ],
    alternates: {
        canonical: "/",
        languages: {
            "en-US": "/",
            "id-ID": "/id",
        },
    },
    openGraph: {
        title: "Oksa Satya – Full Stack Developer Portfolio",
        description:
            "Explore projects, skills, and experience in Golang, Laravel, Spring Boot, and Next.js.",
        url: DOMAIN,
        siteName: "Oksa Satya Portfolio",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Oksa Satya – Full Stack Developer Portfolio",
        description:
            "Backend-leaning full stack developer. Scalable APIs, microservices, clean architecture.",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            {/* Google Fonts */}
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" />

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

        {/* Vendor scripts */}
        <Script src="/assets/js/jquery-3.6.0.min.js" strategy="beforeInteractive" />
        <Script src="/assets/js/gsap.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/ScrollTrigger.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/lenis.js" strategy="afterInteractive" />

        {/* jQuery plugins */}
        <Script src="/assets/js/bootstrap.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/imagesloaded.pkgd.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/isotope.pkgd.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/jquery.magnific-popup.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/jquery.nice-select.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/slick.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/appear.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/wow.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/mobilemenu.js" strategy="afterInteractive" />

        {/* Swiper (load BEFORE script.js) */}
        <Script src="/assets/js/swiper-bundle.js" strategy="afterInteractive" />

        {/* finally call script.js via client component */}
        <TemplateScripts />
        </body>
        </html>
    );
}
