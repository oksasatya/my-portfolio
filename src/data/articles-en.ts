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
  {
    slug: "membangun-pos-rekonsiliasi-kas",
    title: "Building an Auditable POS: Shifts, Cash Reconciliation, and QRIS",
    description:
      "A cashier system is not about adding up prices. Here is how Dexova POS keeps the money matching: open/close shifts with opening cash, split payments, Midtrans QRIS, void & returns that restore stock, and daily cash reconciliation.",
    publishedAt: "2026-07-08",
    readingMinutes: 8,
    tags: ["POS", "Cashier", "Reconciliation", "Midtrans"],
    intro:
      "A bad cashier system only reveals itself at the end of the day — when the physical cash in the drawer does not match the number in the system, and nobody can explain the gap. I built Dexova's POS module with one obsession: every rupiah must be traceable. These are the decisions that make it auditable.",
    sections: [
      {
        heading: "A shift is a unit of accountability, not just a login",
        paragraphs: [
          "A cashier opens a shift by recording the opening cash (drawer float). Every transaction — cash, card, QRIS — attaches to that shift. At close, the system computes the cash that should be there, the cashier counts the physical amount, and the difference is recorded, not hidden.",
          "Without shift boundaries, 'the cash is short by 50,000' is a mystery spanning the whole day. With shifts, it becomes a specific question to one person over one time window — far easier to answer.",
        ],
      },
      {
        heading: "Void and return are not just deleting a row",
        paragraphs: [
          "Deleting a wrong transaction is the fastest way to destroy an audit trail. In Dexova, voids and returns are new recorded events — with reason, operator, and time — not deletions of old data.",
          "The commonly forgotten part: a return must restore stock. Items a customer returns go back into inventory automatically. If they don't, sales and stock reports slowly diverge until nobody trusts either.",
        ],
      },
      {
        heading: "Payments: split payment and QRIS that doesn't hang",
        paragraphs: [
          "Real customers pay in mixed ways: part cash, part QRIS. The system has to treat one transaction as a set of payments, not a single method.",
          "QRIS via Midtrans is asynchronous: the transaction stays pending until a webhook confirms settlement. The key is to treat the webhook as the source of truth, verify its signature, and make it idempotent — the same notification may arrive twice without double-counting the payment.",
        ],
      },
      {
        heading: "Summary",
        paragraphs: [
          "An auditable POS comes from three things: shifts as the unit of accountability, void/return as events (not deletions), and payments honest about their async status. The rest is just adding up prices.",
        ],
      },
    ],
    relatedProjects: ["dexova-pos", "dexova-erp"],
  },
  {
    slug: "absensi-geofence-anti-titip-absen",
    title: "Geofenced Attendance: From Buddy-Punching to Check-ins You Can Trust",
    description:
      "Manual attendance is easy to game. Here is how to build a PWA attendance system with nearest-office detection, a mandatory selfie, a two-address model for WFH, and approval-gated corrections — without imprisoning honest employees.",
    publishedAt: "2026-07-02",
    readingMinutes: 7,
    tags: ["HRIS", "Attendance", "Geofence", "PWA"],
    intro:
      "Buddy-punching is a national sport in offices where attendance is just a signature. When building Dexova's attendance, the goal was not to surveil employees like prisoners, but to make presence data trustworthy enough to compute payroll without argument. That is a delicate balance.",
    sections: [
      {
        heading: "Validate at the entry point, don't clean up later",
        paragraphs: [
          "Check-in happens through a PWA: the app reads location, finds the nearest office, and refuses check-ins outside the radius (geofence). Plus a mandatory selfie at check-in time — not a profile photo, but real-time proof of presence.",
          "The principle is simple: cleaning dirty attendance data at month-end is far more expensive than refusing questionable data at the very first second.",
        ],
      },
      {
        heading: "Real WFH needs a two-address model",
        paragraphs: [
          "Naive geofencing breaks the moment WFH or field visits exist: employees are legitimately away from the office. The answer is a two-address model — a fixed assigned office and a temporary work location — with an approval flow.",
          "An employee outside the office can choose: check in as a field visit (temporary, for a set period) or request a permanent reassignment that needs HR approval. The policy lives in data, not hard-coded per company.",
        ],
      },
      {
        heading: "Corrections always go through approval",
        paragraphs: [
          "Wrong check-in times will happen — bad signal, forgetfulness, a laggy app. What must not happen: an employee or admin editing the attendance number directly in the database.",
          "Every attendance correction is a request that passes through approval, leaving a trail of who changed what and why. That is what lets the monthly recap be locked with confidence before it feeds payroll.",
        ],
      },
      {
        heading: "Summary",
        paragraphs: [
          "Trustworthy attendance is not about the fanciest technology, but about refusing bad data at the source, accommodating how people actually work (WFH), and ensuring every change leaves a trail. Clean attendance data is the foundation of undisputed payroll.",
        ],
      },
    ],
    relatedProjects: ["dexova-hris", "dexova-erp"],
  },
  {
    slug: "arsitektur-hexagonal-go",
    title: "Hexagonal Architecture in Go: Why the Domain Must Not Know About the Database",
    description:
      "Ports & adapters is not an academic ritual. Here is how I use hexagonal architecture across Dexova's modules to make domain logic testable without a database, and adapters swappable without touching business rules.",
    publishedAt: "2026-06-24",
    readingMinutes: 8,
    tags: ["Go", "Architecture", "Hexagonal", "Clean Architecture"],
    intro:
      "Many developers hear 'hexagonal' and picture complex diagrams and endless folders. The essence is one sentence: business rules must not know where their data comes from. Here is why that discipline pays off in production systems like Dexova, and how to apply it in Go without overdoing it.",
    sections: [
      {
        heading: "Dependencies flow inward",
        paragraphs: [
          "The rule is single and strict: the domain layer imports nothing from adapters or platform. The domain defines the ports (interfaces) it needs — e.g. a repository — and the outer layer implements them with pgx or whatever else.",
          "The effect: use cases can be tested with a fake in-memory port implementation, with no PostgreSQL, no network. Testing payroll becomes about preparing input and checking output — not standing up the whole infrastructure.",
        ],
      },
      {
        heading: "Ports are contracts owned by the domain",
        paragraphs: [
          "A common mistake: defining the repository interface in the adapter package, 'close' to its implementation. That inverts the dependency direction. A port is a domain need, so it lives in the domain; the adapter conforms, not the other way around.",
          "In Go this feels natural because interfaces are implicit — the domain declares small interfaces for exactly what it needs, and adapters simply satisfy them. Lean interfaces (one or two methods) are far easier to mock than a giant do-everything repository.",
        ],
      },
      {
        heading: "Don't over-engineer: hexagonal-lite",
        paragraphs: [
          "Hexagonal does not mean CQRS, event sourcing, and seven layers of abstraction for simple CRUD. For a solo dev or small team, it's enough to have: a pure domain (entities + ports + use cases), adapters (DB, HTTP, third parties), and a composition root that wires it together.",
          "Signs of over-engineering: an interface with one implementation that will never have a second, a factory for a single product, an abstraction 'for later'. The rule: add a layer when the pain is real, not when you imagine it.",
        ],
      },
      {
        heading: "Summary",
        paragraphs: [
          "Hexagonal pays off not because the diagram is pretty, but because it makes business rules fast to test and infrastructure swappable without drama. Keep dependencies flowing toward the domain, let ports belong to the domain, and stop at the minimum number of layers that solves the problem.",
        ],
      },
    ],
    relatedProjects: ["dexova-erp", "helixio"],
  },
  {
    slug: "postgresql-row-level-security-multi-tenant",
    title: "Multi-Tenant Isolation with PostgreSQL Row-Level Security (RLS)",
    description:
      "Tenant filters in the application are easy to forget — and one slip leaks data. RLS moves isolation into the database as a last line of defense. Here is how to use it correctly, plus the leak tests you must have.",
    publishedAt: "2026-06-12",
    readingMinutes: 7,
    tags: ["PostgreSQL", "Multi-tenant", "RLS", "Security"],
    intro:
      "Tenant isolation in the application layer has one fatal weakness: it depends on every developer remembering to add a filter to every query, forever. Row-Level Security moves that rule into the database, so even if the app forgets, PostgreSQL refuses. It is a safety net, not a replacement for application discipline.",
    sections: [
      {
        heading: "How RLS works, briefly",
        paragraphs: [
          "Every tenant table gets a policy: a row is visible only if its tenant column matches the current session's tenant. The session tenant is set per transaction via a parameter (e.g. SET LOCAL app.current_tenant_id), and the policy reads it.",
          "Because SET LOCAL is bound to the transaction, it automatically clears when the transaction ends — no state leaks between requests in a connection pool. That small detail, done wrong, becomes a new source of leaks.",
        ],
      },
      {
        heading: "RLS complements, not replaces, the application filter",
        paragraphs: [
          "The application still carries tenant context and filters — that is the primary path and the most informative one for the query planner. RLS is the second layer: if a query forgets the filter, the database refuses instead of leaking.",
          "Two layers that cover each other are far stronger than one perfect layer. And 'perfect forever' is not a safe assumption for code touched by many people over many years.",
        ],
      },
      {
        heading: "Leak tests are part of the feature",
        bullets: [
          "For every tenant table, write an integration test that sets tenant A, then asserts tenant B's data is never visible through any path.",
          "Test the paths that commonly slip through too: aggregations, cross-table joins, and reports.",
          "Ensure the application role does not have BYPASSRLS; superusers and table owners can silently bypass the policy.",
          "Treat adding a new tenant table without a policy as a build failure, not just a note.",
        ],
        paragraphs: [],
      },
      {
        heading: "Summary",
        paragraphs: [
          "RLS turns tenant isolation from 'hope everyone remembers' into 'the database enforces it'. Use it as a second layer above the application filter, set the tenant per transaction, and make leak tests a mandatory requirement for every new table.",
        ],
      },
    ],
    relatedProjects: ["dexova-erp", "helixio"],
  },
  {
    slug: "manajemen-stok-inventory-akurat",
    title: "Stock That Doesn't Lie: Returns, Voids, and Multi-Warehouse",
    description:
      "Inaccurate stock makes every report untrustworthy. Here are the principles that keep inventory honest: every stock change is a recorded event, returns put items back, and inter-warehouse movements are traceable.",
    publishedAt: "2026-05-28",
    readingMinutes: 7,
    tags: ["Inventory", "Stock", "POS", "Architecture"],
    intro:
      "A wrong stock number is a slow poison: one small discrepancy today, and within a month nobody trusts the stock report or the sales report. When building the inventory module wired into Dexova's POS, the guiding principle was that stock is never 'set' — it only changes through recorded events.",
    sections: [
      {
        heading: "Stock is the result of events, not an edited number",
        paragraphs: [
          "The biggest temptation is to store one 'stock quantity' column and update it directly. The moment two developers update it at once, or one process fails midway, the number is wrong and there is no way to know why.",
          "The more honest approach: every sale, purchase, return, and adjustment is a recorded stock movement. The current quantity is the accumulation of movements — so there is always an answer to 'why is the stock this number'.",
        ],
      },
      {
        heading: "Returns and voids must close the loop",
        paragraphs: [
          "This is where it leaks most often: a voided POS transaction or a returned item must restore stock automatically. If a sale decrements stock but a return doesn't add it back, the sales system and the stock system slowly drift apart.",
          "Because POS and inventory share the same truth, a void at the register and the stock restoration are one flow that cannot go halfway — both succeed or both roll back.",
        ],
      },
      {
        heading: "Multi-warehouse: traceable movements",
        paragraphs: [
          "Once there is more than one location, 'stock' is no longer one number but a number per warehouse. Moving goods between warehouses is a transfer: out of one, into another, recorded as a balanced pair.",
          "What separates a serious system from a spreadsheet: every piece of stock has a full story of where it is and how it got there.",
        ],
      },
      {
        heading: "Summary",
        paragraphs: [
          "Accurate inventory comes from one principle: never edit the stock number, record the event that changes it. Close the return/void loop, and make inter-warehouse transfers traceable. The result is a report you can actually trust.",
        ],
      },
    ],
    relatedProjects: ["dexova-pos", "dexova-erp"],
  },
  {
    slug: "job-async-payroll-bulk-import",
    title: "Async Jobs for Heavy Work: Payroll Runs, Bulk Import, and Visible Progress",
    description:
      "Work that touches thousands of rows must not run inside one HTTP request. Here is the async-job pattern I use in Dexova: idempotency, safe retries, progress monitoring, and dead-letter for permanent failures.",
    publishedAt: "2026-05-16",
    readingMinutes: 7,
    tags: ["Go", "Async", "Queue", "Architecture"],
    intro:
      "Computing payroll for hundreds of employees or importing thousands of Excel rows inside one HTTP request is a recipe for timeouts and a frozen UI. In Dexova, all heavy work runs as monitorable async jobs. This is the pattern that makes them reliable, not just 'moved to the background'.",
    sections: [
      {
        heading: "Idempotency matters more than it looks",
        paragraphs: [
          "Jobs can run again: a worker dies mid-way, the network hiccups, a retry fires automatically. If a job is not idempotent, a retry doubles its effect — payroll computed twice, stock decremented twice.",
          "The key is a stable job ID and an 'already done?' check before the effect happens. For scheduled jobs, an ID containing the date prevents two replicas from executing the same daily task.",
        ],
      },
      {
        heading: "Safe retries, and knowing when to give up",
        paragraphs: [
          "Transient failures (a busy DB, a slow third-party API) deserve retry with backoff. Permanent failures (invalid data) do not — retrying only wastes time and hides the problem.",
          "Distinguish the two explicitly: an error that will never succeed must stop retries and go to a dead-letter for a human to inspect, not spin forever.",
        ],
      },
      {
        heading: "Visible progress changes the experience",
        paragraphs: [
          "A payroll run in Dexova is not a button that then goes silent. HR presses it, watches progress, and gets a result they can review before finalizing. Long work with no feedback feels broken — even when it is running fine.",
          "The same pattern applies to bulk employee import: upload, process in the background, and report which rows failed and why — not one generic error that fails the entire file.",
        ],
      },
      {
        heading: "Summary",
        paragraphs: [
          "Moving heavy work to the background is only half the job. The other half: idempotency so retries are safe, distinguishing transient from permanent failure, and showing progress so humans trust the system is working.",
        ],
      },
    ],
    relatedProjects: ["dexova-hris", "dexova-erp"],
  },
  {
    slug: "integrasi-midtrans-qris-webhook",
    title: "Integrating Midtrans QRIS Payments: Webhooks, Verification, and Idempotency",
    description:
      "Online payments are asynchronous — and that is where the trap is. Here is how to integrate Midtrans QRIS correctly: the webhook as the source of truth, signature verification, idempotency, and reconciliation.",
    publishedAt: "2026-05-02",
    readingMinutes: 7,
    tags: ["Midtrans", "Payments", "Webhook", "Security"],
    intro:
      "The most common mistake in payment integration: assuming the payment status is known the moment the customer taps 'pay'. In reality the payment is async — its status is only certain when the provider confirms via webhook. This is what I learned integrating Midtrans QRIS into Dexova's POS.",
    sections: [
      {
        heading: "The webhook is the source of truth, not the frontend response",
        paragraphs: [
          "A frontend that shows 'payment successful' based on the immediate response is a bug waiting to happen. The customer can close the tab, the signal can drop, and the payment still settles a few seconds later.",
          "Truth comes from the webhook (server-to-server notification) that flips the transaction status from pending to settled. The frontend simply displays the recorded status, not a guess.",
        ],
      },
      {
        heading: "Verify the signature, always",
        paragraphs: [
          "A webhook endpoint is public: anyone can POST pretending to be Midtrans. So every notification must have its signature (signature key) verified before it is trusted. Notifications that fail verification are dropped without changing anything.",
          "This is not optional. Accepting a payment status without verification means letting anyone mark an order as 'paid' for free.",
        ],
      },
      {
        heading: "Idempotency: the same notification may arrive twice",
        paragraphs: [
          "Payment providers guarantee at-least-once, not exactly-once: the same webhook can be resent. The handler must be idempotent — processing the second notification must not double the payment or trigger duplicate effects.",
          "In practice: lock the transaction by order ID, check the current status, and only perform valid transitions. A daily reconciliation against the Midtrans dashboard closes the gap if a webhook is missed entirely.",
        ],
      },
      {
        heading: "Summary",
        paragraphs: [
          "Correct payment integration centers on three things: treat the webhook as truth (not the frontend response), verify every signature, and make the handler idempotent. Add reconciliation to sleep well.",
        ],
      },
    ],
    relatedProjects: ["dexova-pos", "dexova-erp"],
  },
  {
    slug: "error-handling-go-api-production",
    title: "Error Handling in Go for Production APIs: Sentinels, Wrapping, and Safe Messages",
    description:
      "Bad error handling leaks internal details to users and makes debugging hard. Here is the Go error pattern I use: sentinel errors, wrapping with %w, mapping to HTTP at one point, and safe messages.",
    publishedAt: "2026-04-20",
    readingMinutes: 6,
    tags: ["Go", "Error Handling", "API", "Security"],
    intro:
      "In Go, errors are values — and how you treat them determines how easy the system is to debug at 3am. This is the error-handling pattern I use in production APIs so the trail is rich for developers, but the message is safe for users.",
    sections: [
      {
        heading: "Wrapping keeps context without losing the origin",
        paragraphs: [
          "Returning a raw error upward loses context; swallowing it and making a new one loses the origin. The middle path is wrapping with %w — adding context at each layer while preserving the original chain.",
          "With errors.Is and errors.As, the upper layer can still inspect the error type at the bottom of the chain, even after several wraps. Context grows, identity is not lost.",
        ],
      },
      {
        heading: "Sentinel errors for decisions, not string matching",
        paragraphs: [
          "Comparing errors by matching their message text is fragile code that breaks the moment the message changes. Sentinel errors (declared error variables) give a stable identity for conditions that need distinguishing — e.g. 'not found' vs 'already exists'.",
          "This is what lets the HTTP layer decide 404 vs 409 without guessing from text — a type-based decision, not a string one.",
        ],
      },
      {
        heading: "Map to HTTP at a single choke point",
        paragraphs: [
          "Spreading HTTP status codes across every handler makes error behavior inconsistent. Better: one place that translates domain errors into HTTP responses — certain sentinels become 4xx with a safe, i18n-able message, the rest become 5xx with detail only in the log.",
          "The user gets a clear message that does not leak internal structure; the developer gets a full trail in the log. Both win without sacrificing each other.",
        ],
      },
      {
        heading: "Summary",
        paragraphs: [
          "Good Go error handling: wrap with %w for context, use sentinels for type-based decisions, and map to HTTP in one place with safe messages for users and a rich trail for logs.",
        ],
      },
    ],
    relatedProjects: ["dexova-erp", "helixio"],
  },
  {
    slug: "autentikasi-jwt-refresh-rotation",
    title: "Secure JWT Authentication: Refresh Rotation, Reuse Detection, and HttpOnly Cookies",
    description:
      "JWT is easy to use, but just as easy to use insecurely. Here is the auth pattern I apply: short access tokens, refresh rotation, reuse detection, and storage in HttpOnly cookies.",
    publishedAt: "2026-04-06",
    readingMinutes: 7,
    tags: ["Security", "Auth", "JWT", "Go"],
    intro:
      "JWT is often implemented in ways that actually reduce security: long-lived tokens stored in localStorage, with no way to revoke them. This is the authentication pattern I use so it stays convenient but remains accountable when a token leaks.",
    sections: [
      {
        heading: "Short access, rotating refresh",
        paragraphs: [
          "The access token is short-lived so its abuse window is small. The refresh token lives longer and is used to obtain a new access token — but every time it is used, it rotates: the old refresh is revoked, a new one is issued.",
          "This rotation is what gives the ability to detect theft. A token that should no longer be valid but is suddenly used again is a clear signal something is wrong.",
        ],
      },
      {
        heading: "Reuse detection: the signal of a stolen token",
        paragraphs: [
          "If a refresh token that has already rotated (and is therefore invalid) shows up again, chances are two parties hold the same token — the real user and a thief. The correct response: revoke the whole session chain and force a re-login.",
          "Without rotation + reuse detection, a stolen token can be used silently until it expires naturally. With both, theft leaves a trail that can be acted on automatically.",
        ],
      },
      {
        heading: "Store in HttpOnly cookies, not localStorage",
        paragraphs: [
          "A token in localStorage can be read by any script on the page — one XSS hole and the token is gone. An HttpOnly + Secure + SameSite cookie cannot be read by JavaScript, moving the attack surface away from script injection.",
          "The consequence is you need CSRF protection (e.g. a double-submit token), but that is a far better trade than leaving the token exposed to every third-party script.",
        ],
      },
      {
        heading: "Summary",
        paragraphs: [
          "Secure JWT auth is not about the library, but the pattern: short access, rotating refresh, reuse detection to catch theft, and storage in HttpOnly cookies with CSRF protection. Convenient to use, and revocable when needed.",
        ],
      },
    ],
    relatedProjects: ["dexova-erp", "helixio"],
  },
  {
    slug: "membunuh-n-plus-1-query",
    title: "Killing N+1 Queries: Why an App Is Fast in the Demo but Slow in Production",
    description:
      "The N+1 query is the most common and most frequently missed performance killer — instant on seed data, timing out on real tables. Here is how to recognize, measure, and fix it before production finds it for you.",
    publishedAt: "2026-03-22",
    readingMinutes: 6,
    tags: ["Performance", "Database", "PostgreSQL", "Optimization"],
    intro:
      "An app feels instant on a laptop with 50 rows of seed data, then chokes when a production table hits tens of thousands. The culprit is often one simple pattern: the N+1 query. It slips through review because the code looks reasonable — and only bites as n grows.",
    sections: [
      {
        heading: "What actually happens",
        paragraphs: [
          "The N+1 pattern appears when you fetch a list (1 query), then for each item fetch related data with one more query (N queries). Ten items = 11 queries; ten thousand items = 10,001 queries. On small data it's invisible; on real data it blows up linearly.",
          "What makes it dangerous: the code is often written in a loop that looks clean, or hidden behind ORM lazy-loading. Nothing is 'wrong' syntactically — what's wrong is the number of round-trips to the database.",
        ],
      },
      {
        heading: "The fix: bound the round-trips, don't prettify the loop",
        bullets: [
          "Fetch related data in one query with a JOIN, or one IN query for all ids at once (two queries total, not N+1).",
          "For many-to-many relationships, fetch in batches then map in memory (O(n)) instead of a query per item.",
          "Make sure the filtered/joined columns have the right index — a composite matching the query order.",
          "Measure by counting actual queries (logs/tracing), not by guessing. Queries-per-request is an honest metric.",
        ],
        paragraphs: [],
      },
      {
        heading: "Test at a realistic n",
        paragraphs: [
          "The root of the problem is often not the code but the data: tests and demos use an n too small to surface it. Test data-heavy paths at a size near production, and performance regressions get caught while they are still cheap to fix.",
          "Rule of thumb: before writing a loop that touches the database, ask how many queries it will produce when n is large. If the answer grows with n, something needs batching.",
        ],
      },
      {
        heading: "Summary",
        paragraphs: [
          "N+1 is not an exotic bug but a default pattern that is easy to write unknowingly. Recognize its shape, bound round-trips with JOIN/IN plus the right index, and test at a realistic n. The difference between instant and timeout is often just the query count.",
        ],
      },
    ],
    relatedProjects: ["dexova-erp", "rahan-mancar"],
  },
  {
    slug: "memilih-stack-sistem-bisnis",
    title: "Choosing a Stack for Business Systems: Go, Java/Spring, or Laravel?",
    description:
      "There is no best stack, only the one that fits your problem, team, and scale. An honest guide to choosing a backend for business systems — from building with all three in production.",
    publishedAt: "2026-03-08",
    readingMinutes: 8,
    tags: ["Architecture", "Go", "Java", "Laravel"],
    intro:
      "The question 'which stack' is almost always answered with personal preference disguised as technical fact. After building production systems with Go, Java/Spring Boot, and Laravel, my answer is more boring: it depends on the problem, the team, and the scale. Here is a framework for choosing honestly.",
    sections: [
      {
        heading: "Laravel: speed to market for business CRUD",
        paragraphs: [
          "For business systems dominated by CRUD, forms, and admin flows — a company profile with a dashboard, an online store, a simple internal system — Laravel delivers remarkable speed. Batteries included: auth, ORM, migrations, queues, all there.",
          "Its weak point shows when business logic gets complex and concurrency performance becomes critical. As long as the problem is 'build fast, run reliably, scale moderately', Laravel is often the most rational choice.",
        ],
      },
      {
        heading: "Go: concurrency, lightweight deployment, and discipline",
        paragraphs: [
          "Go shines when you need efficient concurrency, a single binary that's easy to deploy, and consistently low latency. I built Dexova in Go precisely because a lot of work runs concurrently — payroll jobs, payment webhooks, real-time.",
          "The price: a more 'assemble it yourself' ecosystem compared to batteries-included frameworks. For systems that will live long and grow, the architectural discipline Go demands becomes an asset, not a burden.",
        ],
      },
      {
        heading: "Java/Spring Boot: a mature ecosystem for enterprise",
        paragraphs: [
          "For enterprise systems with many integrations, large teams, and a need for mature tooling, Java/Spring Boot is hard to beat. Four years building enterprise applications with this stack taught me that 'boring and mature' is often exactly what you want in critical systems.",
          "The cost is verbosity and a heavier footprint than Go. But for the right context — many developers, many integrations, long lifespan — the ecosystem's maturity pays off.",
        ],
      },
      {
        heading: "A framework for choosing (not a hard rule)",
        bullets: [
          "CRUD-dominated + need speed + moderate scale → Laravel.",
          "High concurrency + lightweight deployment + consistent latency → Go.",
          "Enterprise + large team + many integrations + mature tooling → Java/Spring.",
          "Most important: pick what your team can maintain, not what's trendiest on Twitter.",
        ],
        paragraphs: [],
      },
      {
        heading: "Summary",
        paragraphs: [
          "There is no absolute winner. Match the stack to the shape of the problem (CRUD vs concurrency vs enterprise), your team's ability, and a realistic scale. The best stack is the one that keeps your system maintainable two years from now.",
        ],
      },
    ],
    relatedProjects: ["dexova-erp", "rahan-mancar"],
  },
];

export function getArticleEn(slug: string): Article | undefined {
  return articlesEn.find((a) => a.slug === slug);
}

export function getAllArticleEnSlugs(): readonly string[] {
  return articlesEn.map((a) => a.slug);
}
