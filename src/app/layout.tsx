import "../styles/index.css";
import React from "react";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Oksa Satya Portfolio',
    description: 'Portofolio Oksa Satya – Full Stack Developer berpengalaman di Java, Spring Boot, dan Next.js. Menyajikan solusi backend dan frontend modern dengan fokus pada performa, skalabilitas, dan clean architecture.',
}
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
        {children}
      </body>
    </html>
  );
}
