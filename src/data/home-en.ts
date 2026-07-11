// English homepage data — structural twin of home.ts.

import type { Capability, ExperienceItem } from "./home";

export const capabilitiesEn: readonly Capability[] = [
  {
    title: "Backend Engineering",
    description:
      "Production APIs and services: layered architecture, complex domain logic (payroll, cash reconciliation), async jobs, disciplined error handling.",
    tech: ["Go", "Java / Spring Boot", "Laravel", "Node.js", "PostgreSQL", "Redis"],
  },
  {
    title: "Frontend Engineering",
    description:
      "Admin dashboards, self-service portals, and PWAs — React/Next.js, optimized for Core Web Vitals.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "System Architecture",
    description:
      "Splitting systems into clearly-bounded modules: Dexova's four business modules run on one Go codebase without breaking each other.",
    tech: ["Modular monolith", "Clean architecture", "SSE", "WebSocket"],
  },
  {
    title: "SaaS & Multi-Tenancy",
    description:
      "Per-tenant data isolation, RBAC, subscriptions + trials — practiced in Dexova and Helixio, not theory.",
    tech: ["Multi-tenant PostgreSQL", "RBAC", "Billing / trial flow"],
  },
  {
    title: "Business Automation",
    description:
      "Business rules that run themselves: tiered-overtime payroll (PP 35/2021), SLA-based approval escalation, async bulk Excel imports.",
    tech: ["Job queue", "Scheduler / cron", "Excel pipeline"],
  },
  {
    title: "Third-Party Integration",
    description:
      "Payments, calendars, and AI integrated safely: Midtrans QRIS for POS, Google Calendar sync, OpenAI/Google AI over operational data.",
    tech: ["Midtrans", "Google APIs", "OpenAI", "Webhook / HMAC"],
  },
  {
    title: "Cloud & Deployment",
    description:
      "Containerized deployments with safe database migrations, clean env configuration, and baseline observability.",
    tech: ["Docker", "Linux", "CI/CD", "Nginx"],
  },
  {
    title: "Performance & SEO",
    description:
      "Fast, discoverable applications: SSR/SSG, structured data, Lighthouse budgets, and queries that are never N+1.",
    tech: ["Next.js SSR/SSG", "Lighthouse", "Schema.org", "Query tuning"],
  },
];

export const experienceEn: readonly ExperienceItem[] = [
  {
    org: "PT Infini Software House Technology DMCC — Dubai",
    role: "Full Stack Developer",
    period: "Jul 2022 – present",
    problem:
      "Building and maintaining enterprise applications for a software house's clients: Java/Spring Boot backends with Next.js frontends and diverse system integrations.",
    outcome:
      "4+ years shipping production features for enterprise applications — API design, cross-system integration, and UIs used by business users daily.",
  },
  {
    org: "Dexova",
    role: "Architect & Full-Stack Developer",
    period: "2024 – present",
    problem:
      "Indonesian businesses run HR, payroll, cashier, and stock in disconnected tools — data never reconciles and mistakes are expensive.",
    outcome:
      "An ERP platform with four modules (HRIS, Payroll, POS, Inventory) on one Go backend — three production apps: admin dashboard, employee attendance PWA, and cashier app.",
  },
  {
    org: "PT Citiasia Inti Solusi — Jakarta",
    role: "Backend Developer (Internship)",
    period: "2021 – 2022",
    problem: "Backend needs for a Laravel-based smart-city product.",
    outcome:
      "First professional engineering foundation: Laravel REST APIs, team collaboration, version-control discipline.",
  },
];

export const trustItemsEn: readonly string[] = [
  "4+ years of enterprise applications (Dubai)",
  "3 production apps at Dexova",
  "HRIS · Payroll · POS · Inventory",
  "Go · Java · Laravel · Next.js",
];

export interface DexovaProblem {
  readonly tag: string;
  readonly title: string;
  readonly description: string;
}

export const dexovaProblemsEn: readonly DexovaProblem[] = [
  {
    tag: "payroll-engine",
    title: "Regulation-aware payroll",
    description:
      "Tiered overtime per Indonesia's PP 35/2021, income tax, social security, pro-rata, and paydays that shift on bank holidays — computed from locked attendance periods.",
  },
  {
    tag: "geofence-attendance",
    title: "Geofenced dual-address attendance",
    description:
      "PWA check-in with nearest-office detection, a mandatory anti-buddy-punching selfie, WFH via a two-address model, and approval-gated corrections.",
  },
  {
    tag: "pos-reconciliation",
    title: "Cashier with shift reconciliation",
    description:
      "Open/close shifts with opening cash, split payments, Midtrans QRIS, void & returns with automatic stock restoration, and daily cash reconciliation.",
  },
];
