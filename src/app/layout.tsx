import "../styles/index.css";
import React from "react";
import Script from "next/script";
import TemplateScripts from "@/components/common/TemplateScripts";
import Preloader from "@/components/common/preloader";


export default function RootLayout({
children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" />
      </head>
      <body>
      <Preloader />
      {children}
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
