// English service landing pages. Only the niche services with international
// search intent get an EN version (API/integration, POS, HRIS) — the broader
// Indonesian commercial pages (website/aplikasi/toko online) stay ID-only
// because their keywords are Indonesian-market-specific.
//
// Slugs intentionally match the Indonesian pages so /en/jasa/<slug> pairs with
// /jasa/<slug> for hreflang.

import { type ProcessStep, type ServiceLanding } from "./services";

const PROCESS_EN: readonly ProcessStep[] = [
  {
    title: "Scope & estimate",
    desc: "We discuss goals, needs, and constraints. I help define a clear scope plus a time/cost estimate — free, no commitment.",
  },
  {
    title: "Design & build",
    desc: "I work in stages with regular updates. You see progress as it happens, not work behind a curtain.",
  },
  {
    title: "Release & support",
    desc: "Deploy to production, hand over documentation, plus a support window for fixes and adjustments.",
  },
];

export const serviceLandingsEn: readonly ServiceLanding[] = [
  {
    slug: "pembuatan-api",
    keyword: "API development & system integration",
    title: "API Development & System Integration Services — Go, Java",
    h1: "API Development & System Integration",
    tagline:
      "Reliable REST APIs and system integrations — payment gateways, HRIS, logistics, webhooks — my core specialty, not a side offering.",
    metaDescription:
      "API development and system integration services by a backend engineer (Go, Java/Spring Boot, Laravel): payment gateway integration, HMAC-verified webhooks, gRPC, OpenAPI documentation, and observability. Standards from a production ERP. Free consultation.",
    keywords: [
      "api development services",
      "rest api development",
      "system integration services",
      "hire backend developer",
      "freelance backend engineer",
      "payment gateway integration",
      "golang api development",
      "webhook integration services",
      "third party api integration",
    ],
    intro:
      "This is my core specialty — not an add-on. The same backend standards that run payroll, cashier, and inventory in a production ERP (Dexova) go into your project: REST APIs for mobile/web apps, payment webhooks that never lose a transaction, or connecting systems that currently run in isolation (POS not syncing with inventory, HRIS not feeding payroll). Three priorities: secure, reliable, and observable when something goes wrong.",
    whatYouGet: [
      "Secure, documented REST APIs (JWT/OAuth2 auth, validation, rate limiting, OpenAPI/Swagger)",
      "Payment gateway integration with HMAC-verified webhooks — no fake or lost transactions",
      "Other third-party integrations: HRIS, logistics/shipping APIs, email, calendars",
      "Reliable webhooks & service-to-service communication (retries, idempotency, HTTP/gRPC)",
      "Observability: structured logging, metrics, and tracing so problems surface fast",
      "Clean architecture + tests so the system stays safe to maintain and extend",
    ],
    process: PROCESS_EN,
    stack: ["Go (Echo/Gin)", "Java/Spring Boot", "Laravel", "PostgreSQL", "Redis", "gRPC", "Docker"],
    faq: [
      {
        q: "I just need to connect two systems — is that too small?",
        a: "Not at all. Integrations (e.g. connecting a website to an HRIS, or a POS to inventory) are the work I handle most often — it doesn't have to be a big project.",
      },
      {
        q: "Can you integrate payment gateways?",
        a: "Yes — this is what I run in production: QRIS payments via Midtrans in Dexova's POS, with automatic webhook confirmation and signature verification so no transaction is faked or lost. The same patterns apply to other gateways.",
      },
      {
        q: "Will the API work for our mobile app?",
        a: "Yes. The APIs I build are client-agnostic — consumable by web, mobile (Android/iOS), or other services, with clear versioning.",
      },
      {
        q: "Do we get API documentation?",
        a: "Yes. I deliver OpenAPI/Swagger documentation so your team or other developers can use the API without back-and-forth.",
      },
      {
        q: "Can you connect a legacy system?",
        a: "Usually yes, as long as the legacy system exposes a database or callable endpoint. I audit it first, then recommend the safest integration pattern — without rewriting the old system.",
      },
      {
        q: "How do you handle security?",
        a: "My standard: token authentication, input validation, rate limiting, security headers, HMAC verification for webhooks, and vulnerability scanning before release.",
      },
    ],
    estimateNote:
      "Cost depends on the number of endpoints and integrations. Free discussion & estimate via WhatsApp.",
    relatedProjects: ["dexova-erp", "rahan-mancar"],
  },
  {
    slug: "sistem-pos-kasir",
    keyword: "custom POS system development",
    title: "Custom POS / Cashier System Development",
    h1: "Custom POS System Development",
    tagline:
      "A custom point-of-sale system with QR payments, per-shift cash reconciliation, and inventory that stays in sync — the same standards as the POS I operate in production.",
    metaDescription:
      "Custom POS / cashier system development: QR payments (Midtrans), split payment, shift management with cash reconciliation, void/return with automatic stock restoration, multi-outlet reporting, thermal printing. Built by a production-POS developer. Free consultation.",
    keywords: [
      "custom pos system development",
      "point of sale software development",
      "cashier application development",
      "pos system for retail",
      "multi outlet pos system",
      "pos with qr payment",
    ],
    intro:
      "A cashier app that only records sales doesn't solve the real problems: end-of-shift cash that doesn't add up, system stock that drifts from physical stock, and QR payments checked by hand. I build custom POS systems using the same patterns as Dexova POS, which I operate in production — from the transaction flow and payments to daily cash reconciliation per shift.",
    whatYouGet: [
      "Fast cashier flow: catalog, cart, discounts, and split payment (cash + non-cash)",
      "QR payments (Midtrans) confirmed automatically via webhook — no manual checking",
      "Cashier shifts with opening cash, deposits, and daily reconciliation (discrepancies surface immediately)",
      "Void & returns with automatic stock restoration — system stock always matches physical",
      "Multi-outlet with sales reports per outlet, per cashier, per period",
      "Thermal receipt printing (ESC/POS) and exportable reports",
    ],
    process: PROCESS_EN,
    stack: ["Next.js (PWA)", "Go", "PostgreSQL", "Redis", "Midtrans (QRIS)", "ESC/POS"],
    faq: [
      {
        q: "Why custom instead of an off-the-shelf POS?",
        a: "SaaS POS products are great for standard flows. Custom makes sense when your flow isn't standard — per-customer pricing, integration with your existing inventory/accounting system, specific discount rules, or full ownership of your data without per-outlet subscription fees.",
      },
      {
        q: "Does it support QR payments?",
        a: "Yes. I integrate QRIS via Midtrans with automatic webhook confirmation — the cashier never checks bank mutations manually; payment status lands in the system by itself.",
      },
      {
        q: "What happens when the internet goes down?",
        a: "It can be designed offline-first (PWA): transactions are stored locally and sync automatically when the connection returns. Flag this need early so it's in scope.",
      },
      {
        q: "Is inventory managed too?",
        a: "Yes. Every sale deducts stock automatically, and voids/returns restore it. Deeper multi-warehouse inventory is also possible — the same patterns as Dexova's inventory module.",
      },
      {
        q: "Are receipt printers supported?",
        a: "Yes. I've written an ESC/POS printing driver that talks to thermal printers straight from the browser (Web Bluetooth) for Dexova POS — no extra native app needed.",
      },
    ],
    estimateNote:
      "Cost depends on outlet count, payment integrations, and inventory depth. Free discussion & estimate via WhatsApp.",
    relatedProjects: ["dexova-pos", "dexova-erp"],
  },
  {
    slug: "sistem-hris-payroll",
    keyword: "custom HRIS & payroll system development",
    title: "Custom HRIS, Payroll & Attendance System Development",
    h1: "Custom HRIS & Payroll System Development",
    tagline:
      "A custom HRIS with Indonesian-regulation payroll (tiered overtime, income tax, social security) and geofenced attendance — the same patterns as the HRIS I operate in production.",
    metaDescription:
      "Custom HRIS & payroll system development: payroll engine with Indonesia's tiered overtime (PP 35/2021), income tax (PPh 21), BPJS, geofenced attendance with selfie verification, multi-level approvals, and digital payslips. Built by a production-HRIS developer. Free consultation.",
    keywords: [
      "hris development",
      "custom hris system",
      "payroll system development",
      "attendance system development",
      "geofence attendance app",
      "employee management system development",
      "indonesia payroll system",
    ],
    intro:
      "Spreadsheet payroll works — until headcount grows, tiered overtime starts miscalculating, and month-end attendance recaps eat days. I build custom HRIS & payroll systems with business rules I've already implemented in production (Dexova HRIS): Indonesia's tiered overtime (PP 35/2021), income tax (PPh 21), BPJS, proration, and paydays that shift around bank holidays.",
    whatYouGet: [
      "A payroll engine with Indonesian rules: tiered overtime (PP 35/2021), PPh 21, BPJS, proration",
      "Location-based (geofenced) attendance with selfie verification — no buddy punching; dual-address WFH supported",
      "Attendance periods locked before payroll runs — salary numbers never change silently",
      "Multi-level approvals (leave, permits, attendance corrections, overtime) with automatic escalation",
      "Shift & work scheduling, including rotating shift patterns",
      "Digital payslips + report exports for bookkeeping",
    ],
    process: PROCESS_EN,
    stack: ["Go", "Next.js (PWA)", "PostgreSQL", "Redis", "Excel import/export"],
    faq: [
      {
        q: "Do you guarantee the tax math is legally correct?",
        a: "I implement the calculation rules (PP 35/2021 overtime, PPh 21, BPJS) as system logic based on parameters you and your tax/HR consultant define — I'm the engineer, not a tax advisor. The system is built to be auditable: every salary component can be traced to its source.",
      },
      {
        q: "Why custom instead of an HRIS SaaS?",
        a: "SaaS fits standard rules. Custom makes sense when your rules are specific — unusual allowance structures, non-standard shift patterns, integration with internal systems, or full data ownership on your own servers without per-employee monthly fees.",
      },
      {
        q: "How does attendance prevent buddy punching?",
        a: "Geofencing (check-in only within the workplace radius) combined with a mandatory selfie at check-in. For WFH, the system supports an admin-approved second work address.",
      },
      {
        q: "Can we import employee data from Excel?",
        a: "Yes. Bulk import of employees, schedules, and salary components from Excel — with validation so bad rows never slip in.",
      },
      {
        q: "Payroll data is sensitive — how is it secured?",
        a: "Role-based access control, encryption for sensitive fields, and an audit log for every important change. The system can run on infrastructure you choose.",
      },
    ],
    estimateNote:
      "Cost depends on module count (payroll, attendance, leave, shifts) and salary-rule complexity. Free discussion & estimate via WhatsApp.",
    relatedProjects: ["dexova-hris", "dexova-erp"],
  },
];

const bySlugEn = new Map<string, ServiceLanding>(serviceLandingsEn.map((s) => [s.slug, s]));

export function getServiceLandingEn(slug: string): ServiceLanding | undefined {
  return bySlugEn.get(slug);
}

export function getAllServiceEnSlugs(): readonly string[] {
  return serviceLandingsEn.map((s) => s.slug);
}
