// English /about data — structural twin of about.ts.

import type { ResumeEntry } from "./about";

export const workExperienceEn: readonly ResumeEntry[] = [
  {
    org: "PT Infini Software House Technology DMCC",
    role: "Full Stack Developer",
    location: "Dubai, UAE",
    period: "Jul 2022 – present",
    bullets: [
      "Build and maintain enterprise applications: Java (Spring Boot) backends, Next.js frontends.",
      "Design and integrate REST APIs across services and external systems — payment gateways, HRIS (Mekari Talenta), logistics APIs, and email services.",
      "Ship secure, fast, scalable software in agile teams.",
    ],
    stack: "Spring Boot, Next.js, PostgreSQL/MySQL, Redis, Docker, Linux, Git",
  },
  {
    org: "Dexova",
    role: "Architect & Full-Stack Developer",
    location: "Own product — dexova.id",
    period: "2024 – present",
    bullets: [
      "Designed and built an ERP platform (HRIS, Payroll, POS, Inventory) on one modular Go backend.",
      "Operate three production apps: admin dashboard, employee attendance PWA, and cashier app.",
    ],
    stack: "Go, PostgreSQL + sqlc, Redis, SSE, Next.js, Midtrans",
  },
  {
    org: "PT Citiasia Inti Solusi",
    role: "Backend Developer (Internship)",
    location: "Jakarta, Indonesia",
    period: "Aug 2021 – Jun 2022",
    bullets: [
      "Built backend features and REST APIs with Laravel; designed schemas and optimized queries.",
      "Collaborated with frontend and PM teams to ship reliable features on schedule.",
    ],
    stack: "PHP (Laravel), MySQL, Git",
  },
];

export const clientProjectsEn: readonly string[] = [
  "Logistics Web System — PT Top Kargo Indonesia: land/sea/air logistics app on Laravel + MySQL for order tracking and operations.",
  "Company Profile SPA — PT Innox Indonesia: modern React.js SPA focused on performance and UX.",
];

export const educationEn: readonly ResumeEntry[] = [
  {
    org: "Hacktiv8",
    role: "Certification — Full Time Backend Golang",
    location: "Jakarta, Indonesia",
    period: "2024",
    bullets: [
      "Built LMS microservices with Go (Echo/Gin): REST APIs, authentication, service-to-service communication.",
      "PostgreSQL, MongoDB, and Docker for containerized development.",
    ],
  },
  {
    org: "Gunadarma University",
    role: "B.Sc. Information Systems (GPA 3.33/4.00)",
    location: "Depok, Indonesia",
    period: "2017 – 2021",
    bullets: [],
  },
];

export const certificatesEn: readonly string[] = [
  "Learn Golang from Beginner to Advance — Udemy (2024)",
  "Internship Certification — Citiasia Inc (2022)",
];
