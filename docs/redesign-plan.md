# Portfolio Redesign Plan — approved 2026-07-10

Full audit + rationale lives in the session; this file is the operative plan for
implementation across sessions. Design system: see `DESIGN.md`. Positioning: see
`PRODUCT.md` and `.agents/product-marketing.md`.

## Approved decisions

1. **Styling:** migrate to Tailwind CSS v4 (`@theme` tokens) with a disciplined component
   layer. Remove Bootstrap + all template CSS (1.1 MB), Font Awesome Pro (icon font →
   lucide-react), wowjs, GSAP paid plugins + preloader, magnific/slick/nice-select CSS.
2. **Language:** Indonesian-first launch; minimal `/en` layer (home, about, Dexova,
   contact + hreflang) is phase 2 after launch.
3. **Homepage order:** Hero → trust strip → **Featured: Dexova** → Selected Projects →
   Capabilities (tech inside each group) → Experience narrative → Articles teaser →
   Contact CTA. (User-approved deviation from original brief order.)
4. **Dexova pages:** build all three now — `/projects/dexova-erp` (hub, full story),
   `/projects/dexova-hris`, `/projects/dexova-pos` (deep-dive spokes). Spokes must be
   genuinely distinct (HRIS: payroll engine PP 35/2021, geofence/dual-address WFH, SLA
   approval escalation, async bulk import; POS: cashier flows, shift + cash
   reconciliation, Midtrans QRIS, Bluetooth printing). Missing screenshots are replaced
   by labeled architecture/flow diagrams marked as diagrams, never fake imagery.
5. **URLs:** all existing routes preserved; additions only (`/articles`, Dexova spokes).
6. **Articles:** infrastructure + 2 launch articles (HRIS/payroll architecture;
   multi-tenant SaaS). 6 more topics stay on the roadmap, published only with real cadence.
7. **Curation:** homepage shows 4–6 projects; `/projects` splits featured vs compact
   archive; all 14 case-study URLs stay live.
8. **Motion:** no animation libraries; CSS + one IntersectionObserver reveal hook +
   `prefers-reduced-motion` support.
9. **Contact:** stays WhatsApp-prefill (no backend); contact data consolidated into
   `src/lib/contact.ts` (single source; currently duplicated in 3 components).

## Removed features log (rule: never delete silently)

| Removed | Reason | Replacement |
|---|---|---|
| GSAP preloader (`preloader.tsx`) | hides slowness, hurts LCP/perceived perf | none — fast first paint |
| GSAP ScrollSmoother/ScrollTrigger (paid, hand-bundled) | licensing + weight + scroll hijack | native scroll + CSS |
| wowjs scroll animations | jQuery-era, blocks SSR benefits | IO reveal hook |
| react-18-image-lightbox, react-modal-video, react-countup | template leftovers, weight | static figures / CSS |
| Bootstrap 5 + template CSS suite | 1.1 MB, template identity | Tailwind v4 + tokens |
| Font Awesome Pro CSS (25,354 lines) | icon font, mostly unused | lucide-react SVG |
| Template testimonial photos (4 stock JPEGs) | fake social proof | verifiable proof blocks |
| swiper, react-use, react-intersection-observer, `src/ui/NiceSelect.tsx` | zero imports (dead) | — |

## Phases & gates

| Phase | Scope | Gate |
|---|---|---|
| 0 | Dead-dep cleanup; download + optimize + self-host Dexova screenshots (WebP/AVIF, descriptive names, redaction check) | build green |
| 1 | Tailwind v4 setup, `@theme` tokens, fonts (Bricolage Grotesque / Figtree / JetBrains Mono via `next/font`), primitives, Header/Footer | typecheck + lint |
| 2 | Homepage (new order), remove old CSS + Wrapper/preloader | visual review |
| 3 | Dexova hub + HRIS + POS spokes, architecture diagrams | user review |
| 4 | Case-study template for remaining projects, curation, /jasa reskin + Dexova/Helixio proof cross-links, /about, /contact, /service | review |
| 5 | /articles + 2 articles | user approves content |
| 6 | SEO: aligned titles, Person/ProfilePage JSON-LD, ProfessionalService url fix, per-page lastmod, BreadcrumbList everywhere, OG alt | Rich Results test |
| 7 | Performance (Lighthouse ≥90/95/95/95 target, aim 100), a11y (axe), responsive QA 320→ultrawide, delete remaining template CSS/assets | lh gate |
| 8 | `tsc --noEmit` + eslint + build + click-through; document assets/routes/components; README with Mermaid | all green |

No commits until user reviews (work → review → commit at checkpoints).

## Assets required from Oksa (blocking case-study completeness, not launch)

1. dex-attendance PWA screenshots (geofence check-in) — mobile.
2. Payroll run screen (redacted).
3. Inventory screens (multi-warehouse / stock opname).
4. POS shift-close / cash reconciliation screen.
5. Stable (non-staging) POS cashier screenshot.
6. Real architecture notes or repo access for accurate blueprint diagram.
7. Confirmation: which clients/employers may be named; availability status; CV file keep/update.

## SEO keyword clusters

- **Transactional (existing /jasa/*):** jasa pembuatan website · aplikasi web · API ·
  toko online · dashboard admin.
- **Commercial-investigation:** developer aplikasi HRIS · developer aplikasi POS ·
  developer SaaS Indonesia · sistem inventory.
- **Brand/hiring:** full stack developer Indonesia · Next.js developer Indonesia ·
  Golang backend developer · Laravel developer Indonesia.
- **Informational (/articles):** arsitektur HRIS & payroll · SaaS multi-tenant ·
  integrasi POS-inventory · PostgreSQL untuk aplikasi bisnis · idempotency & ledger ·
  deployment Next.js + Go · analytics/Ads integration · technical SEO.

Internal linking: articles → case studies → /jasa/*; /jasa/* cite Dexova/Helixio as proof.

## Phase 2 (2026-07-11) — shipped on top of the redesign

- **Dark-only theme** (token redefinition in `@theme`; contrast re-verified, see DESIGN.md).
- **three.js layer**: hero + ambient dark sections (`src/components/three/*`), lazy +
  idle-deferred + reduced-motion/low-core SVG fallback.
- **next-intl migration** (replaces the interim handmade /en layer — user request):
  `[locale]` routing `as-needed`, messages catalogs, per-locale data files,
  `docs/i18n-migration-plan.md`.
- **Fresh product screenshots** pulled from the oksasatya/dexova repo (July 2026 batch,
  demo data, redaction-checked) — payroll run, attendance admin/analytics, employees,
  stock, products, reports, PWA check-in/payslip, cashier transaction/payment.
- **Accuracy corrections from repo research**: dex-be = Gin + clean/layered modular
  monolith (not strict hexagonal), gRPC client-only (workshop service), PASETO auth,
  app-level tenant scoping (not RLS), AES-256-GCM PII encryption, outbox worker +
  12+ in-process schedulers; dex-attendance = mandatory selfie + geofence retry/backoff;
  dex-pos = hand-written Web Bluetooth ESC/POS driver, WebSocket stock sync,
  TanStack Virtual.
- **/api/contact** (provider-agnostic: `CONTACT_PROVIDER=whatsapp-cloud|fonnte` via env,
  wa.me fallback; in-memory throttle + honeypot). WhatsApp Cloud API note: the sender
  must be a WABA-registered number (a personal number cannot send; it can only receive).
- **CV restored** (hero + about; `CV_URL` in `src/lib/contact.ts`), availability badge
  removed, Reveal failsafe (1.8s instant release — content can never be trapped hidden).

Verification: build 33 routes green; Lighthouse desktop 100/100/100, mobile 95/100/100
(canonical audit is a localhost artifact); routing smoke-tested (ID unprefixed, /en
pairs 200, ID-only pages 404 under /en, /id redirects 307, html lang per locale,
hreflang + canonical per page).

## Remaining / follow-ups

1. Env vars to enable direct WhatsApp form delivery (user setup): `CONTACT_PROVIDER`,
   `WHATSAPP_CLOUD_TOKEN` + `WHATSAPP_PHONE_ID` + `WHATSAPP_TO` (or `FONNTE_TOKEN`).
2. Optional: `check-i18n`-style script (dex-fe convention) to guard message-key parity.
3. Optional next: EN versions of articles when writing cadence exists.
