// English versions of the flagship Dexova case studies (served under /en).
// Same structure as projects.ts; screenshots and diagrams are shared assets.

import type { ArchiveProject, CaseStudy } from "./projects";

export const caseStudiesEn: readonly CaseStudy[] = [
  {
    slug: "dexova-erp",
    title: "Dexova — Integrated ERP Platform",
    year: 2025,
    category: "SaaS · ERP",
    tagline:
      "A modular ERP for Indonesian businesses: HRIS, Payroll, POS, and Inventory on one Go backend.",
    summary:
      "Modular ERP platform (HRIS, Payroll, POS, Inventory) with a clean-architecture Go backend, embedded AI features, and Midtrans payment integration.",
    role: "Architect & Full-Stack Developer (backend-heavy)",
    timeframe: "2025 – present",
    highlights: [
      "Modular monolith in Go",
      "HRIS · Payroll · POS · Inventory",
      "AI-powered",
      "Midtrans",
      "Outbox + schedulers",
      "Multi-tenant",
    ],
    stack: [
      "Go (Gin)",
      "PostgreSQL + sqlc",
      "Next.js / TypeScript",
      "Redis",
      "PASETO",
      "SSE (real-time)",
      "Midtrans",
      "OpenAI / Google AI",
      "Docker",
    ],
    problem:
      "Small and mid-size businesses run HR, payroll, cashier, and stock in disconnected tools — a spreadsheet here, a standalone app there. Data never stays in sync, mistakes creep in, and cross-division decisions are made from stale numbers.",
    solution: [
      "A Go (Gin) backend with a clean, layered architecture — four business modules (Core, HRIS, Inventory, POS), each owning its own SQL queries and database migrations so one module cannot break another.",
      "An employee self-service app (Next.js PWA) for attendance, payslips, shift schedules, and team data.",
      "AI features embedded in the backend (OpenAI & Google AI) for automation and insight on top of operational data.",
      "Midtrans payment integration for the POS flow, real-time updates via Server-Sent Events, and a gRPC client integration to a workshop service.",
      "Application-level data security: AES-256-GCM encryption for sensitive data plus multi-tenant isolation enforced in tokens and middleware.",
    ],
    results: [
      "Four business modules (HRIS, Payroll, POS, Inventory) running in production on one modular Go codebase.",
      "Employees get a self-service portal (attendance, payslips, shifts) — manual HR processes became self-serve.",
      "Clear module boundaries proved out: new modules were added without tearing up existing ones.",
    ],
    repoVisibility: "private",
    image: "/assets/images/dexova/dexova-hris-dashboard-admin.webp",
    deepDive: {
      sections: [
        {
          id: "context",
          title: "Context",
          paragraphs: [
            "Dexova is an ERP platform for Indonesian businesses — built for small and mid-size companies that need serious operational software without enterprise pricing. I built it as the architect and full-stack developer, from database schema design to the cashier UI.",
            "The product is live at dexova.id and is used through three production applications: an admin dashboard (dex-fe), an employee attendance PWA (dex-attendance), and a cashier app (dex-pos).",
          ],
        },
        {
          id: "business-problem",
          title: "Business problem",
          paragraphs: [
            "SMEs run HR, payroll, cashier, and stock in separate tools: attendance in spreadsheets, salaries computed by hand, a standalone cashier app, stock in warehouse notebooks. The data never reconciles — overtime hours don't reach the payslip, sales don't decrement stock, and owners can't see the business across divisions.",
            "The consequences are real: payroll mistakes (with labor-compliance risk attached), unexplained cash differences, and business decisions made from stale data.",
          ],
        },
        {
          id: "ecosystem",
          title: "Product ecosystem",
          paragraphs: [
            "Four business modules run on one Go backend — each owning its own SQL queries and migrations, so modules evolve without breaking each other:",
          ],
          bullets: [
            "HRIS & Payroll — the full employee lifecycle: employee data, org structure, attendance, leave, shifts, payroll runs, and digital payslips.",
            "Attendance (employee PWA) — geofenced check-in/out with nearest-office detection, attendance history, correction requests, leave, and payslips.",
            "POS — multi-outlet cashier with barcode scanning, multi-payment (cash, Midtrans QRIS, transfer, EDC, split), shift + cash reconciliation, and sales reports.",
            "Inventory — multi-warehouse: purchase orders, goods receipt with QC, barcode stock opname, approval-gated transfers, and automatic sync with POS.",
            "Dexova AI — an AI layer (OpenAI / Google AI) over operational data for search and insight.",
          ],
        },
        {
          id: "role",
          title: "My role",
          paragraphs: [
            "Architect & full-stack developer — backend-heavy. I designed the modular-monolith architecture, wrote the domain logic (payroll, cash reconciliation, stock), built all three frontend applications, and operate the deployment. Product decisions and feature priorities were mine too, so every technical decision on this page is also a product decision.",
          ],
        },
        {
          id: "challenges",
          title: "Technical challenges",
          bullets: [
            "Multi-tenant from the foundation — tenant scoping is enforced in tokens (PASETO) and middleware on every query, with AES-256-GCM encryption for sensitive data (plus encryption-migration tooling for schema changes).",
            "Regulation-aware payroll — tiered overtime following Indonesia's PP 35/2021, income tax (PPh 21), social security (BPJS), pro-rata, and paydays that shift automatically on bank holidays. Implemented as tested business rules, not hardcoded branches.",
            "Strict module boundaries — four modules in one Go codebase, each with its own controller → service → repository layering and a single DI composition root. Adding a module never tears up an old one.",
            "Real-time without overengineering — Server-Sent Events for dashboard updates and PWA notifications; heavy work (bulk Excel import, exports, payroll runs) runs as async jobs, plus an outbox pattern for provisioning that must never be lost.",
            "Payment integration — Midtrans QRIS (static & dynamic) in the cashier flow, reconciled at the shift level.",
          ],
        },
        {
          id: "architecture",
          title: "Architecture & engineering decisions",
          paragraphs: [
            "A modular monolith, not microservices: one Go (Gin) binary with four clearly-bounded modules is far cheaper to operate at this scale — and the module boundaries keep extraction into separate services on the table if it's ever needed.",
          ],
          diagram: "dexova-architecture",
          bullets: [
            "Go + PostgreSQL (sqlc) — generated, type-safe queries instead of an ORM; each module owns its migrations.",
            "Redis for caching, sessions, and rate-limiting; 12+ in-process schedulers (payroll auto-lock, approval escalation, audit purge) plus an outbox worker.",
            "SSE for real-time updates; a gRPC client integration to the workshop service; WebSocket for POS stock sync.",
            "Cookie-based PASETO auth; AES-256-GCM encryption for sensitive data + application-level multi-tenant isolation.",
            "Frontends: Next.js/TypeScript for the admin dashboard, a PWA for employee attendance, and a separate cashier app.",
          ],
        },
        {
          id: "screenshots",
          title: "UI",
          paragraphs: ["All screenshots use demo data."],
          screenshots: [
            {
              src: "/assets/images/dexova/dexova-hris-dashboard-admin.webp",
              alt: "Dexova HRIS admin dashboard with attendance and department summary",
              caption: "dex-fe — HRIS admin dashboard (demo data)",
              width: 1510,
              height: 859,
            },
            {
              src: "/assets/images/dexova/dexova-attendance-pwa-checkin-v2.webp",
              alt: "Dexova attendance PWA showing the geofenced check-in button",
              caption: "dex-attendance — geofenced check-in in the employee PWA (demo data)",
              width: 720,
              height: 1465,
            },
            {
              src: "/assets/images/dexova/dexova-pos-cashier-transaction.webp",
              alt: "Dexova POS cashier screen with product grid and cart",
              caption: "dex-pos — cashier app (demo data)",
              width: 1280,
              height: 800,
            },
          ],
        },
        {
          id: "outcome",
          title: "Outcome",
          bullets: [
            "Four business modules (HRIS, Payroll, POS, Inventory) in production on one modular Go codebase.",
            "Three applications used by real users: the admin dashboard, the employee attendance PWA, and the cashier app.",
            "Employees got a self-service portal (attendance, payslips, leave, shifts) — manual HR processes became self-serve.",
            "The module boundaries proved out: new modules were added without breaking existing ones.",
          ],
        },
      ],
      lessons: [
        "A modular monolith with strict boundaries beats premature microservices — operational cost drops dramatically without giving up structure.",
        "Payroll rules are the most dangerous domain logic to hardcode; making them configuration plus tested business rules pays for itself every time a regulation or company policy changes.",
        "Async jobs with progress tracking aren't a 'later' feature — bulk imports and payroll runs would otherwise block the UI and erode user trust.",
      ],
      related: ["dexova-hris", "dexova-pos"],
    },
  },
  {
    slug: "dexova-hris",
    title: "Dexova HRIS — Payroll & Attendance",
    year: 2025,
    category: "Deep dive · HRIS",
    tagline:
      "A regulation-aware payroll engine and geofenced attendance — Dexova's HR machine up close.",
    summary:
      "Deep dive into Dexova's HRIS module: a payroll engine with PP 35/2021 tiered overtime, geofenced dual-address attendance, SLA-based approval escalation, and an async data pipeline.",
    role: "Architect & Full-Stack Developer",
    timeframe: "2025 – present",
    highlights: [
      "Payroll engine (PP 35/2021)",
      "Geofence + dual-address WFH",
      "SLA approval escalation",
      "Async bulk import",
      "Employee PWA",
    ],
    stack: [
      "Go",
      "PostgreSQL + sqlc",
      "Redis (jobs)",
      "Next.js (dex-fe)",
      "PWA (dex-attendance)",
    ],
    problem:
      "Computing salaries in Indonesia is not simple arithmetic: tiered overtime, income tax, social security, pro-rata for new joiners, paydays landing on bank holidays. Done by hand, mistakes are a matter of time — and payroll mistakes destroy employee trust instantly.",
    solution: [
      "A payroll engine with flexible salary components, periods locked before a run, and tiered overtime per PP 35/2021.",
      "Geofenced attendance with a dual-address model (office + WFH), nearest-office detection, and approval-gated corrections.",
      "Multi-level approvals with automatic SLA-based escalation when an approver goes quiet.",
      "Bulk Excel import/export as async jobs with progress tracking and duplicate strategies.",
    ],
    results: [
      "The end-to-end HR cycle — from employee data to digital payslips — runs in one module.",
      "Employees check in through a geofenced PWA; HR monitors violations and monthly recaps that lock data for payroll.",
      "A payroll process that used to be manual spreadsheets became a locked, tracked, auditable run.",
    ],
    repoVisibility: "private",
    image: "/assets/images/dexova/dexova-hris-golongan-job-level.webp",
    deepDive: {
      sections: [
        {
          id: "context",
          title: "Context",
          paragraphs: [
            "HRIS is Dexova's largest module — and the reason many businesses look at an ERP in the first place. It serves two personas through two different apps: HR admins work in the dashboard (dex-fe); employees use the attendance PWA (dex-attendance).",
            "This page dissects the three most engineering-heavy parts: the payroll engine, geofenced attendance, and the approval machine.",
          ],
        },
        {
          id: "payroll-engine",
          title: "Payroll engine",
          paragraphs: [
            "Indonesian payroll rules are implemented as configurable business rules — not hardcoded numbers:",
          ],
          bullets: [
            "Tiered overtime per PP 35/2021 — different rates for the first hour, subsequent hours, and holidays; overtime is created automatically when a schedule is exceeded, then goes through approval.",
            "Flexible salary components per company + per-employee rates (pro-rata for new joiners, company-covered components).",
            "Cutoff and payday configured separately; payday shifts automatically when it lands on a bank holiday.",
            "Payroll periods are locked before a run — runs are generated only from finalized attendance data, with progress monitoring.",
            "One-off adjustments: bonuses, THR (religious-holiday allowance), severance — applied to a run without touching permanent components.",
            "Employee loans with automatic salary deduction per period.",
            "Daily-rate divisors, rounding strategies, work-week types (including half-day Saturdays) — all configuration, not if-branches.",
            "Forgot to lock a period? An auto-lock scheduler closes it on schedule.",
          ],
          screenshots: [
            {
              src: "/assets/images/dexova/dexova-hris-payroll-run.webp",
              alt: "Payroll Runs page in the Dexova dashboard: runs are generated from locked periods",
              caption: "dex-fe — Payroll Runs: generated only from locked periods (demo data)",
              width: 1440,
              height: 900,
            },
            {
              src: "/assets/images/dexova/dexova-attendance-pwa-payslip.webp",
              alt: "Digital payslip in the dex-attendance PWA",
              caption: "dex-attendance — employee digital payslip (demo data)",
              width: 720,
              height: 1465,
            },
          ],
        },
        {
          id: "attendance",
          title: "Geofenced attendance",
          paragraphs: [
            "Attendance is payroll's raw data — if attendance is wrong, salaries are wrong. The design focuses on data validity at the source:",
          ],
          bullets: [
            "Check-in/out from the PWA with geofencing (Geolocation API with retry/backoff): the app detects the nearest office and rejects check-ins outside the radius.",
            "Mandatory selfie at check-in — camera via getUserMedia with a name + timestamp overlay, preventing buddy punching.",
            "A dual-address model for WFH — employees can request their home location as a second geofence, through approval.",
            "Approval-gated attendance corrections (no free edits), plus early-checkout management.",
            "Violation rules and tardiness thresholds per location/department; attendance analytics and compliance reports for HR.",
            "The monthly recap locks attendance data as payroll input — one source of truth.",
          ],
          screenshots: [
            {
              src: "/assets/images/dexova/dexova-attendance-pwa-checkin-v2.webp",
              alt: "Dexova attendance PWA check-in page with office distance detection",
              caption: "dex-attendance — geofenced check-in with mandatory selfie (demo data)",
              width: 720,
              height: 1465,
            },
            {
              src: "/assets/images/dexova/dexova-hris-attendance-admin.webp",
              alt: "Attendance page in the Dexova admin dashboard with present, absent, late, and leave summaries",
              caption: "dex-fe — admin-side attendance monitoring (demo data)",
              width: 1440,
              height: 900,
            },
          ],
        },
        {
          id: "approvals",
          title: "The approval machine",
          bullets: [
            "Multi-level approval rules with a mandatory final HR approval — consistent across leave, attendance corrections, overtime, and shift swaps.",
            "Approval delegation for absent approvers.",
            "Automatic SLA-based escalation (an in-process scheduler): unanswered requests climb to the next approver — nothing hangs forever.",
          ],
        },
        {
          id: "shifts",
          title: "Shifts & scheduling",
          bullets: [
            "Monthly shift grids with automatic rotating-assignment generation.",
            "Employee shift swaps with approval.",
            "Tardiness tolerance per work schedule.",
          ],
        },
        {
          id: "data-ops",
          title: "Data operations",
          paragraphs: [
            "Onboarding a company means hundreds of employees arriving at once — the data path has to be strong:",
          ],
          bullets: [
            "Bulk Excel import (Combined Bulk Import) as an async job: progress tracking, commit modes, duplicate strategies, and account auto-provisioning.",
            "CSV/Excel export with sync mode for small data and async for large datasets.",
            "Self-service password reset with email OTP, expiry, a 5-attempt lockout, and admin escalation.",
          ],
          screenshots: [
            {
              src: "/assets/images/dexova/dexova-hris-employees.webp",
              alt: "Employee management in the Dexova dashboard: employee list with departments and positions",
              caption: "dex-fe — employee management, the bulk-import target (demo data)",
              width: 1440,
              height: 900,
            },
          ],
        },
        {
          id: "outcome",
          title: "Outcome",
          bullets: [
            "Payroll runs from locked attendance data — not from spreadsheets edited at the last minute.",
            "Regulatory rules (tiered overtime, payday shifts) live as tested configuration, ready for policy changes.",
            "HR stopped being a manual data operator: approvals, corrections, and recaps run through auditable flows.",
          ],
        },
      ],
      lessons: [
        "Labor rules change — a payroll engine that separates rules from code is an investment, not over-engineering.",
        "Attendance data validity must be protected at the source (geofence, selfie, approval-gated corrections); cleaning it later is far more expensive.",
        "SLA-based auto-escalation turns approvals from an organizational bottleneck into a process that finishes itself.",
      ],
      related: ["dexova-erp", "dexova-pos"],
    },
  },
  {
    slug: "dexova-pos",
    title: "Dexova POS — Cashier & Reconciliation",
    year: 2025,
    category: "Deep dive · POS",
    tagline:
      "A multi-outlet cashier with Midtrans QRIS, split payments, and per-shift cash reconciliation.",
    summary:
      "Deep dive into Dexova's POS module: the cashier transaction flow, Midtrans QRIS + split payments, shifts with cash reconciliation, and returns with automatic stock restoration.",
    role: "Architect & Full-Stack Developer",
    timeframe: "2025 – present",
    highlights: [
      "Multi-outlet + cashier roles",
      "Midtrans QRIS (static & dynamic)",
      "Split payment",
      "Shift + cash reconciliation",
      "Returns → automatic stock restore",
    ],
    stack: [
      "Go",
      "PostgreSQL + sqlc",
      "Midtrans",
      "Next.js (dex-pos)",
      "Web Bluetooth (ESC/POS)",
    ],
    problem:
      "A POS for small businesses must be usable by non-technical staff on day one, while every rupiah stays accountable behind the scenes: who opened the shift, how much opening cash, where a difference came from, and why stock moved. A cashier app that merely records sales answers none of that.",
    solution: [
      "A fast cashier flow: search + barcode scanning, product variants, tiered pricing (retail/wholesale/member), hold & resume carts.",
      "Multi-payment: cash, Midtrans QRIS (static/dynamic), bank transfer, EDC, and split payments — plus promo codes.",
      "Shifts with opening cash, a single-active-shift rule, and cash reconciliation at close.",
      "Void and partial/full returns with automatic stock restoration; access controlled per role.",
    ],
    results: [
      "Cashier transactions and cash accountability live in one flow — differences surface at shift reconciliation, not at month end.",
      "QRIS payments integrated through Midtrans with no extra hardware.",
      "Stock stays consistent with sales and returns through automatic sync with the Inventory module.",
    ],
    repoVisibility: "private",
    image: "/assets/images/projects/dexova.webp",
    deepDive: {
      sections: [
        {
          id: "context",
          title: "Context",
          paragraphs: [
            "Dexova POS serves two personas: cashiers work in the cashier app (dex-pos); owners and managers run products, outlets, and reports from the admin dashboard (dex-fe). The core design goal: a cashier should be productive without lengthy training, while every rupiah stays traceable.",
          ],
        },
        {
          id: "transaction-flow",
          title: "Transaction flow",
          bullets: [
            "Product search + barcode scanning (html5-qrcode), with variants and add-ons.",
            "Tiered pricing per product: retail, wholesale, member.",
            "Hold & resume carts — a cashier can serve the next customer without losing a pending transaction.",
            "Customer selection for member pricing and history.",
            "Large catalogs stay smooth — the product list is virtualized (TanStack Virtual), and one codebase serves a tablet split-panel layout and a phone slide-up cart.",
          ],
          screenshots: [
            {
              src: "/assets/images/dexova/dexova-pos-cashier-transaction.webp",
              alt: "Dexova POS cashier screen: product grid on the left, cart on the right",
              caption: "dex-pos — cashier transaction screen (demo data)",
              width: 1280,
              height: 800,
            },
          ],
        },
        {
          id: "payments",
          title: "Payments",
          paragraphs: [
            "Every payment method common in Indonesian retail, in one checkout flow:",
          ],
          bullets: [
            "Cash with change calculation.",
            "Midtrans QRIS — static (one QR for all transactions) and dynamic (per-transaction QR with a locked amount).",
            "Bank transfer and EDC.",
            "Split payment — one transaction paid with a combination of methods.",
            "Promo codes and discounts governed from the admin dashboard.",
          ],
          screenshots: [
            {
              src: "/assets/images/dexova/dexova-pos-cashier-payment.webp",
              alt: "Dexova POS payment dialog with totals, tax, discount, and promo code",
              caption: "dex-pos — payment dialog: multi-method + split (demo data)",
              width: 1280,
              height: 800,
            },
          ],
        },
        {
          id: "shift-reconciliation",
          title: "Shifts & cash reconciliation",
          paragraphs: [
            "The part that separates a serious POS from a sales recorder — per-shift cash accountability:",
          ],
          bullets: [
            "Open a shift with opening cash; a single-active-shift rule prevents transactions without an accountable owner.",
            "Close a shift with reconciliation: the system compares expected cash against the physical cash the cashier counts.",
            "Shift summaries and daily cash reconciliation are available as owner reports.",
          ],
          diagram: "pos-flow",
        },
        {
          id: "returns-void",
          title: "Void & returns",
          bullets: [
            "Void for unfinished transactions; partial or full returns for paid ones.",
            "Stock restores automatically on returns — real-time WebSocket sync with the Inventory module, no manual step.",
            "Void/return access is role-scoped (cashier vs manager), revocable from the dashboard.",
          ],
        },
        {
          id: "hardware-reports",
          title: "Hardware & reports",
          bullets: [
            "Thermal receipts over Web Bluetooth — a hand-written ESC/POS driver (not an off-the-shelf library), with reprint.",
            "Owner reports: best sellers, dead stock, margins, taxes, shift summaries — PDF/Excel export.",
            "Multi-outlet with per-outlet staff placement.",
          ],
          screenshots: [
            {
              src: "/assets/images/dexova/dexova-pos-reports.webp",
              alt: "POS reports page in the Dexova dashboard",
              caption: "dex-fe — sales reports for owners (demo data)",
              width: 1440,
              height: 900,
            },
          ],
        },
        {
          id: "outcome",
          title: "Outcome",
          bullets: [
            "Non-technical cashiers are productive immediately; the transaction flow is built for rush hours.",
            "Cash is accountable per shift — differences surface the same day.",
            "Sales, returns, and stock stay consistent because POS and Inventory share one source of data.",
          ],
        },
      ],
      lessons: [
        "Reconciliation isn't a reporting feature — it's the trust contract between owner and cashier, and it must exist from the first transaction.",
        "Automatic stock restoration on returns eliminates an entire class of 'stock doesn't match' bugs.",
        "Payment integrations (Midtrans) are safest modeled as explicit status flows, never as an assumed 'it worked'.",
      ],
      related: ["dexova-erp", "dexova-hris"],
    },
  },
  {
    slug: "helixio",
    title: "Helixio — Multi-Tenant Productivity SaaS",
    year: 2022,
    category: "SaaS",
    tagline:
      "One workspace for Notes, Kanban, and Google Calendar sync — multi-tenant, from auth to monetization.",
    summary:
      "A B2B productivity SaaS: Notes, Kanban, and Calendar Sync. Hexagonal Go, multi-tenant + RBAC, Google OAuth, and subscriptions with a trial.",
    role: "Backend Engineer & Architect",
    timeframe: "2022",
    highlights: [
      "Hexagonal (Ports & Adapters)",
      "Multi-tenant",
      "4-role RBAC",
      "Google OAuth + Calendar",
      "Subscription + trial",
      "CI / codecov",
    ],
    stack: [
      "Go",
      "Gin",
      "PostgreSQL + sqlc",
      "Redis",
      "Google OAuth / Calendar API",
      "SMTP",
      "Docker",
    ],
    problem:
      "A small team needs one place for notes, task boards, and a calendar — without subscribing to several different tools. The challenge: each workspace's data must be isolated, and access must be configurable per role.",
    solution: [
      "Hexagonal architecture (Ports & Adapters) in Go + Gin, separating the domain from infrastructure so adapters (DB, Google API, SMTP) can be swapped without touching business logic.",
      "Multi-tenant with full per-workspace data isolation, plus four-role RBAC (Owner, Admin, Member, Viewer).",
      "Login & registration via Google OAuth, plus two-way sync with Google Calendar.",
      "Core features: Markdown-powered Notes and a drag-and-drop Kanban board.",
      "Built-in monetization: Basic / Standard / Pro plans with a 14-day trial.",
    ],
    results: [
      "A complete end-to-end B2B SaaS: from authentication (Google OAuth) through productivity features to monetization (subscription + trial).",
      "Multi-tenant + RBAC ready to serve many workspaces with safely isolated data.",
      "Code quality kept in check via a CI pipeline, coverage reports (codecov), and Go Report Card.",
    ],
    repoVisibility: "private",
    image: "/assets/images/projects/helixio.webp",
  },
  {
    slug: "rahan-mancar",
    title: "Rahan Mancar — Multi-Tenant Website & CMS Platform",
    year: 2023,
    category: "Platform · CMS",
    tagline:
      "A multi-tenant headless CMS: manage many websites — blog, pages, SEO, and leads — from one Go backend.",
    summary:
      "A multi-tenant website platform with CMS, blog, SEO module, and lead capture. Fully hexagonal Go (ports & adapters), i18n, and async workers.",
    role: "Backend Engineer & Architect",
    timeframe: "2023",
    highlights: [
      "Hexagonal (Ports & Adapters)",
      "Multi-tenant",
      "CMS + Blog",
      "SEO & Analytics modules",
      "Lead capture + Captcha",
      "i18n",
    ],
    stack: [
      "Go",
      "PostgreSQL",
      "Redis",
      "Next.js",
      "Worker queue (async)",
      "Object storage",
      "i18n",
    ],
    problem:
      "Agencies and businesses with many company-profile websites need one system to manage content, blogs, SEO, and lead capture — without building a CMS from scratch for every client.",
    solution: [
      "A complete hexagonal Go backend: the domain is separated from adapters, with dedicated application modules for auth, blog, CMS, dashboard, analytics, SEO, leads, media, language (i18n), tenant, user, and website.",
      "Multi-tenant from the foundation — one platform serving many websites, each with its own data.",
      "Production infrastructure: PostgreSQL, Redis, object storage for media, anti-spam captcha on lead forms, email for lead notifications, and workers for async work.",
      "Built-in SEO and Analytics modules, so client websites are SEO-ready and measurable from day one.",
      "A Next.js frontend wired to the CMS API.",
    ],
    results: [
      "One backend serving many websites with unified CMS, blog, SEO, and lead capture.",
      "A clean ports & adapters pattern lets adapters (storage, email, captcha) be swapped without touching the domain.",
      "Built-in lead capture + analytics turn a website from a brochure into a machine that generates prospects.",
    ],
    repoVisibility: "private",
    image: "/assets/images/projects/rahanmancar-online.webp",
  },
];

const bySlug = new Map<string, CaseStudy>(caseStudiesEn.map((c) => [c.slug, c]));

export function getCaseStudyEn(slug: string): CaseStudy | undefined {
  return bySlug.get(slug);
}

export function getAllCaseStudyEnSlugs(): readonly string[] {
  return caseStudiesEn.map((c) => c.slug);
}

export const archiveProjectsEn: readonly ArchiveProject[] = [
  {
    title: "Mula Property",
    year: 2026,
    category: "Web App",
    description: "Property listing platform — Nuxt (Vue) with a fast, modern UI.",
  },
  {
    title: "chasago",
    year: 2026,
    category: "Open Source",
    description:
      "Go REST API boilerplate CLI generator: Clean Architecture, Paseto, audit log, i18n — one command, a production-ready project.",
  },
  {
    title: "Seluscraf",
    year: 2026,
    category: "E-commerce",
    description:
      "E-commerce backend for a Muslim clothing store — Go/Gin, GORM, Redis, JWT + Google OAuth.",
  },
  {
    title: "Jastip Chasa Store",
    year: 2026,
    category: "E-commerce",
    description:
      "Personal-shopper (jastip) platform — Go REST API (Gin, fx, Paseto, Redis) + storefront.",
  },
  {
    title: "Trading Analytics API",
    year: 2025,
    category: "API",
    description:
      "Trading analytics backend + MT5 .set generator — Go, Chi, SQLC, PostgreSQL.",
  },
  {
    title: "Dashboard Rahan",
    year: 2023,
    category: "Dashboard",
    description: "Admin & monitoring dashboard for Rahan.",
  },
  {
    title: "Trofi Group",
    year: 2021,
    category: "Web Profile",
    description: "Company profile website for Trofi Group.",
  },
  {
    title: "Rahan Mancar (v1)",
    year: 2021,
    category: "Web App",
    description: "Web application for managing Rahan Mancar.",
  },
  {
    title: "Totabuan",
    year: 2020,
    category: "Web Profile",
    description: "Company profile website for Totabuan.",
  },
];
