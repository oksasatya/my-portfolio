// English translations of the engineering notes in `articles.ts`. Same slugs,
// so /en/articles/<slug> pairs with /articles/<slug> for hreflang.
// NOTE: machine-drafted from the Indonesian originals — proofread before relying
// on the exact wording.

import type { Article } from "./articles";

export const articlesEn: readonly Article[] = [
  {
    slug: "arsitektur-hris-payroll-indonesia",
    title: "HRIS & Payroll Application Architecture: Lessons from Building Dexova",
    description:
      "Why payroll is the most dangerous domain logic to hardcode — and how Dexova structures locked periods, PP 35/2021 overtime rules, and async payroll runs.",
    publishedAt: "2026-07-11",
    readingMinutes: 8,
    tags: ["HRIS", "Payroll", "Go", "Architecture"],
    intro:
      "Calculating salaries looks like arithmetic: hours times rate, subtract tax, done. Until you actually build it. This article distills the most important architectural decisions I made building the HRIS & Payroll module in Dexova — and the mistakes I was lucky to catch early.",
    sections: [
      {
        heading: "Why payroll must not be computed from live data",
        paragraphs: [
          "The first mistake almost every amateur payroll system makes: computing salaries directly from an attendance table that can still change. An employee files a correction to their clock-in, HR approves it — and a payslip that was already paid suddenly no longer matches the data.",
          "The fix is a locked period. In Dexova, the monthly attendance recap locks the attendance data as a snapshot; a payroll run can only be generated from a period that is already locked. Corrections after the lock flow into the next period as adjustments — not by rewriting history.",
        ],
      },
      {
        heading: "Regulatory rules as configuration, not if-else",
        paragraphs: [
          "Overtime in Indonesia is tiered (PP 35/2021): the first hour and subsequent hours have different multipliers, and holidays are different again. Writing that as a chain of if-else means every regulatory or company-policy change is a new deploy.",
          "In Dexova, overtime rates, the daily-rate divisor, rounding strategy, and work-week type are per-company configuration. The code only knows how to evaluate a rule; the rule's values belong to data. A nice side effect: testing a calculation becomes a matter of preparing a config + attendance input, then comparing the output.",
        ],
        bullets: [
          "Tiered overtime rates for the 1st hour / subsequent hours / holidays — configuration.",
          "Cutoff and payday are separated; payday shifts automatically on bank holidays.",
          "Salary components and per-employee rates (pro-rata for new hires) — data, not code.",
          "One-off adjustments (bonuses, THR, severance) live on the run, not as permanent components.",
        ],
      },
      {
        heading: "The payroll run as an async job",
        paragraphs: [
          "Computing salaries for hundreds of employees is not a single-HTTP-request job. A payroll run in Dexova executes as an async job with progress monitoring: HR presses one button, watches the progress, and gets a result they can review before finalizing.",
          "The same pattern powers bulk employee import from Excel — any heavy work touching many rows must not block the UI, and must be trackable.",
        ],
      },
      {
        heading: "Attendance: guard validity at the source",
        paragraphs: [
          "Payroll is only as good as its attendance data. That is why validation happens at the point of entry: check-in via a PWA with geofencing (the app detects the nearest office and rejects clock-ins outside the radius), WFH via an approved two-address model, and attendance corrections that always go through approval — not free edits in the database.",
          "Cleaning up dirty data later is always more expensive than rejecting it up front.",
        ],
      },
      {
        heading: "Summary",
        paragraphs: [
          "If it has to fit in one sentence: separate the rules from the code, lock the data before computing, and make heavy work a trackable job. Those three are what make payroll auditable — and what makes sleeping easier on payday.",
        ],
      },
    ],
    relatedProjects: ["dexova-hris", "dexova-erp"],
  },
  {
    slug: "membangun-saas-multi-tenant",
    title: "Building Multi-Tenant SaaS: Data Isolation Without the Drama",
    description:
      "The tenant-isolation pattern I use in Dexova and Helixio: a single schema with disciplined tenant context, RBAC, and the traps that only bite once background jobs show up.",
    publishedAt: "2026-07-11",
    readingMinutes: 7,
    tags: ["SaaS", "Multi-tenant", "PostgreSQL", "Go"],
    intro:
      "Multi-tenancy is a simple promise with long consequences: many companies use one application, and their data must never be visible to each other — not sometimes, but always. This is the pattern I use in two production systems (Dexova and Helixio), plus the traps I ran into.",
    sections: [
      {
        heading: "Choose the isolation model deliberately",
        paragraphs: [
          "There are three common options: a separate database per tenant, a separate schema per tenant, or one shared schema with a tenant column. For a SaaS with many small-to-mid tenants, a shared schema is almost always the right starting point: cheapest to operate, one migration run, and onboarding a new tenant is practically free.",
          "The price: isolation becomes entirely the responsibility of application discipline. Every query must be scoped to a tenant — and 'every' here really does mean every.",
        ],
      },
      {
        heading: "Tenant context you cannot forget",
        paragraphs: [
          "The classic mistake: relying on every developer to remember to add the tenant filter to a query. Forget once, and data leaks. Tenant context must flow from authentication through the entire execution path — in Go, via a context.Context populated by middleware after the token is validated, then read by the data layer.",
          "The principle: the safe path must be the easiest path. A query helper that takes the tenant from context explicitly turns 'forgot the filter' from a silent bug into code that looks obviously wrong at review time.",
        ],
      },
      {
        heading: "RBAC on top of isolation, not instead of it",
        paragraphs: [
          "Tenant isolation answers 'which company's data' — it does not yet answer 'who can do what'. In Helixio I use four roles (Owner, Admin, Member, Viewer) per workspace; in Dexova, per-module roles (e.g. cashier vs manager in POS, with access revocation from the dashboard).",
          "They are different layers, and should not be mixed: the tenant check happens in the data layer, the permission check in the use-case layer. Mixing them makes both hard to test.",
        ],
      },
      {
        heading: "Traps that only bite later",
        bullets: [
          "Background jobs: an async job has no request — tenant context must be carried explicitly in the job payload, not pulled from 'the currently logged-in user'.",
          "Cache keys: a key without a tenant prefix is a data leak waiting for a schedule. Namespace every key per tenant.",
          "Global vs tenant data: reference tables (e.g. bank lists, public holidays) are intentionally global — mark clearly which ones are global so nobody 'fixes' them by adding a tenant column.",
          "Exports and reports: the path that most often joins many queries — and the most common place for a single filter to be missed. Isolation testing matters most exactly here.",
        ],
        paragraphs: [],
      },
      {
        heading: "Summary",
        paragraphs: [
          "Multi-tenancy is not a feature but a property the architecture has to protect: tenant context that flows automatically, a safe path that is the easiest to use, and healthy suspicion toward every path that does not go through a request — jobs, caches, and reports.",
        ],
      },
    ],
    relatedProjects: ["dexova-erp", "helixio"],
  },
];

export function getArticleEn(slug: string): Article | undefined {
  return articlesEn.find((a) => a.slug === slug);
}

export function getAllArticleEnSlugs(): readonly string[] {
  return articlesEn.map((a) => a.slug);
}
