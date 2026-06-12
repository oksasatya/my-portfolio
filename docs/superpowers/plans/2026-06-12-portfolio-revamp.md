# Portfolio Revamp Plan — oksasatya.dev

**Date:** 2026-06-12
**Owner:** Oksa Satya
**Goal:** Make the portfolio *sell the person* and *look distinctive*. Today the copy reads generic ("Full-Stack Developer", template phrases) and the UI is a competent-but-anonymous dark Bootstrap theme. Sharpen the positioning to a **backend engineer who ships real systems**, fix conversion-killing bugs, and give the UI an intentional, on-brand visual direction.

This plan consolidates: the marketing-expert audit (positioning/conversion), the react-doctor audit (code/a11y/perf), and a dedicated correctness bug-hunt. It is the source of truth for the revamp; the live progress tracker mirrors it as tasks.

---

## 1. Positioning (the through-line)

Everything below serves one sharpened message:

> **Backend Engineer who also ships full-stack.** Builds reliable APIs, system integrations (payment, HRIS, logistics), and end-to-end SaaS. 3+ years building enterprise products remotely for a Dubai software house; currently building Dexova, an integrated ERP SaaS.

Why this beats "Full-Stack Developer": "full-stack who can do everything" is a price-competed commodity; "backend specialist who also handles frontend" is premium, scarce, and exactly what clients with serious systems look for. Sharper positioning → higher-quality leads → higher project value.

**Proof points (all verifiable — no invented numbers):**
- 3+ years remote, Full Stack Developer at PT Infini Software House Technology DMCC (Dubai).
- 8+ production projects (Dexova ERP, Helixio, Rahan Mancar, Trofi, etc.).
- Real architecture depth: hexagonal/clean Go services, multi-tenant + RBAC, payment & calendar integrations, AI-powered ERP, gRPC, observability (OTel/Sentry/NewRelic).
- Open-source: `chasago` (Go production-API CLI generator), `Task-Tracker`.
- GitHub `oksasatya` as live, un-fakeable proof.

---

## 2. Copy revamp (what to say — "kata-kata yang menjual")

### 2.1 Hero (`src/components/home/HeroArea.tsx`)
Replace the language laundry-list with a who/for-whom/what/why-you statement.

- **H1:** "Backend Engineer yang Membangun Sistem Skalabel"
- **Eyebrow / stack line:** "Go · Java/Spring Boot · Next.js"
- **Subhead:** "Saya bantu bisnis & startup membangun API yang andal, integrasi sistem (payment, HRIS, logistik), dan platform SaaS end-to-end. 3+ tahun membangun produk enterprise secara remote untuk perusahaan di Dubai."
- **Primary CTA:** "Diskusikan Proyek Anda" → contact/WhatsApp. **Secondary CTA:** "Lihat Studi Kasus" → /projects.
- **Trust bar** (replace the decorative stack-logos block, which duplicates the Skills section): "3+ tahun remote (Dubai) · 8+ proyek production · Go · Java · Next.js".

### 2.2 About (`src/components/home/AboutArea.tsx`)
Kill the template paragraph ("passionate dalam problem-solving, kerja tim, dan pembelajaran berkelanjutan"). Tell a specific story:

> "Sejak 2022 saya bekerja remote sebagai Full-Stack Developer untuk PT Infini Software House Technology (Dubai), membangun aplikasi enterprise dengan Java/Spring Boot dan Next.js. Fokus saya backend: API yang andal, integrasi sistem, dan arsitektur yang tidak bikin pusing saat skala bertumbuh. Di luar kerjaan, saya membangun **Dexova** — platform ERP terintegrasi (HRIS, Payroll, POS, Inventori) yang lahir dari masalah nyata di lapangan. Kalau Anda butuh developer yang paham sisi teknis sekaligus sisi bisnis, mari ngobrol."

### 2.3 Services (`src/components/home/ServiceArea.tsx`)
Sell outcomes, not tech. Each service gets one benefit line + add a "Cara Kerja" 3-step (Diskusi → Pengerjaan → Rilis & Support) + a closing CTA. Example (Performance & Security):
> "Aplikasi cepat dan aman = pelanggan tidak kabur dan data Anda terlindungi. Saya terapkan caching, optimasi database, dan standar keamanan (JWT/OAuth2, rate limiting) sejak awal."

### 2.4 Social proof (`src/components/home/TestimonoalArea.tsx` + About metrics)
- Remove/replace testimonials that read as fabricated (notably the "Dexova Group HRD" one — Dexova is Oksa's own product, not a client).
- Replace unbacked "90% Kepuasan Klien" with provable metrics: "3+ Tahun Remote (Dubai)", "8+ Proyek Production", "5+ Integrasi Sistem".
- Elevate GitHub: "Lihat kode & proyek open-source saya di GitHub →".

### 2.5 Contact / footer
- One canonical email everywhere. Add a "respond within 24h" line + WhatsApp + mailto as primary low-friction CTAs.

---

## 3. UI revamp (how it should look)

### Design direction — to be confirmed
**Recommended: "Engineered Dark."** A refined, intentional dark theme that reads *backend engineer*, not generic agency:
- Near-black surfaces (not pure #000), layered depth, restrained use of the existing violet→blue→emerald accent (60-30-10, accent at 10%).
- **Monospace accents** for technical credibility — stack chips, section labels (`// MASALAH`), metrics, code-ish details — paired with a strong display font for headings and a clean body font.
- Subtle blueprint/grid or terminal motif as atmosphere (not decoration overload).
- A hero that *shows the work*: value-prop headline + a small "system" visual (architecture/stack), not a stock portrait alone.
- Real proof surfaced high: trust bar, GitHub, case-study cards (already built).

Alternatives (pick one in the question that follows):
- **A — Engineered Dark** (recommended): technical, confident, on-brand for backend.
- **B — Editorial Refined** (light, magazine-like, big type, whitespace): premium/consultant feel.
- **C — Terminal/Brutalist** (mono-heavy, raw, high-contrast): strong dev-cred, higher risk.

### Per-section UI work (applies whichever direction)
- **Typography system:** deliberate scale + a distinctive display/body/mono pairing (move off generic defaults). Define as tokens.
- **Color tokens:** semantic tokens (surface, on-surface, accent, success) instead of scattered inline hex.
- **Hero:** rebuilt layout around the new headline + trust bar + dual CTA + system visual.
- **Portfolio/timeline:** polish the case-study cards (already augmented), tighten spacing/hover, ensure the "Dianalisa AI" + case-study path is prominent.
- **About/Resume/Skills:** stronger hierarchy, real metrics row, GitHub showcase.
- **Sitewide:** one consistent primary CTA style; consistent section rhythm; ID/EN language consistency (pick a rule).
- **Mobile-first:** 44px touch targets, no horizontal scroll at 360px, padding scales, ≥16px inputs.

---

## 4. Bugs to fix

### From audits (known)
- **Contact form is non-functional** — `ContactArea.tsx` only `console.log`s and shows a fake success. #1 conversion leak.
- **Email inconsistency** (3 variants across files) + WhatsApp number digit count to verify.
- **Person schema `sameAs` empty** in `layout.tsx` (no socials linked).
- **4 unthrottled scroll listeners** (ScrollToTop ×2, UseSticky, PortfolioArea) + ScrollToTop stale-closure (`:21`) → jank atop ScrollSmoother.
- **Dead code** (`blog/`, `blog-details/`, `BlogArea`, `BrandArea`) — ~75 of 115 lint warnings; no ESLint config so lint never runs.
- **30× raw `<img>`**, several `<div onClick>` (a11y) — convert to `next/image` / `<button>`.
- `console.log` in production paths (incl. form PII).
- Old `/single-project` still Lorem ipsum (noindex) — remove or repurpose.

### From correctness bug-hunt (15 findings: 1 Critical / 4 High / 5 Medium / 5 Low)
- **CRITICAL #1 — contact form sends nothing** (`ContactArea.tsx:10-13`): handler only `console.log`s; UI shows a static fake "Pesan diterima". Visitor email logged to console. (Decided fix: WhatsApp + mailto CTA, no backend.)
- **HIGH #2 — dead `preloader:start` dispatch** (`Wrapper.tsx:72-77`): event has zero listeners; preloader only runs on first hard load; also `console.log`s a (null) DOM node every route change. Remove the effect + log.
- **HIGH #3 — GA4 initial pageview race** (`gtag.ts:8` + `Wrapper.tsx:37-49` + `layout.tsx:115-128`): GA4-only mode sets `send_page_view:false`; `pageview()` early-returns if `window.gtag` not yet defined; gtag is `afterInteractive` so the first pageview can be dropped. Fix: push to `window.dataLayer` queue even before gtag drains it.
- **HIGH #4 — ScrollSmoother vs `window.scrollY` desync** (`ScrollToTop.tsx:10,12,48`, `UseSticky.ts:12`, `PortfolioArea.tsx:48,93`): progress ring + timeline fill read native scroll while content is smoothed/translated → visibly off on fast scroll. Drive off `ScrollSmoother.get().scrollTop()` / ScrollTrigger instead.
- **HIGH #5 — "Proyek" nav parent is `href="#"`** (`menu_data.ts:33`): clicking jumps to top instead of `/projects`. Point parent at `/projects`.
- **MED #6 — cursor hover listeners bound once** (`Wrapper.tsx:82-135`): queries `a` once at mount with `[]` deps → misses links rendered later, leaks on stale nodes. Use event delegation or add `pathname` dep.
- **MED #7** — lightbox `images` array rebuilt every render (`PortfolioArea.tsx:107`); hoist to module scope.
- **MED #9 / LOW #13 — dead routes/components:** `TemplateScripts.tsx` (would throw if used), `/single-project` (Lorem ipsum + fake client, noindex but live), `/blog` + `/blog-details` (stub `href="#"`, fake content). Delete.
- **LOW #11 — `console.log` in prod** (`ContactArea.tsx:12` PII, `Wrapper.tsx:75`). Remove.
- **LOW #12 — `: any`** in Wrapper/ContactArea/Sidebar/SingleProjectArea — tighten.
- **LOW #15 — contact data:** email `oksasatyaa@gmail.com` (double-a; verify intended inbox), phone `+62818846228` is a plain `<p>` (not `wa.me`/`tel:`, and only 9 digits after 62 — **verify the WhatsApp number**), `Person.sameAs` empty despite real FB/LinkedIn/GitHub URLs in ContactArea.

### Already fixed this session
- Desktop scroll freeze (preloader scroll-lock vs ScrollSmoother body height) — `preloader.tsx` + `style.css`. Verified.

---

## 5. Execution phases (suggested order)

1. **Phase 0 — Bugs first (don't revamp on a leaky funnel):** contact form + data consistency + Person schema + bug-hunt criticals. *Without a working contact form, every copy/UI win is wasted.*
2. **Phase 1 — Copy:** Hero → About → Services → social proof. Fast, high-leverage, no visual risk.
3. **Phase 2 — UI revamp:** design tokens → Hero → portfolio/about → sitewide CTAs, per the confirmed direction.
4. **Phase 3 — Cleanup/perf:** remove dead code + ESLint, throttle scroll, convert `<img>`/`<button>`.
5. **Phase 4 — Finishing/QA:** react-doctor, Core Web Vitals, SEO/schema, mobile-first audit, build + tsc green, Playwright verify.

---

## 6. Decisions (confirmed 2026-06-12)
1. **UI direction → B, Editorial Refined (LIGHT).** Magazine-like, big serif headlines, generous whitespace, premium/consultant feel. **Implication: this is a full theme flip from the current dark UI.** Everything gets re-themed light, INCLUDING the case-study pages (`case-study.css`, currently dark) and the portfolio timeline — budget for a sitewide restyle, not a hero-only tweak.
2. **Contact → WhatsApp.** No form backend. Convert the contact form into (or pair it with) a primary **WhatsApp** CTA + mailto. **Need: confirm the exact WhatsApp number** (`+62818846228` looks short — verify before wiring `wa.me/62…`).
3. **Canonical email → `oksasatyaa@gmail.com`** (double-a). Use everywhere: ContactArea, Footer, mailto, `Person` schema.
4. **Language → ID marketing + EN resume.** Marketing pages (hero/about/service/testimonials/section titles) in Bahasa Indonesia; Resume/CV stays English. Translate the remaining EN section titles ("Testimonials", "Professional Skills", "Work Experience") to ID; keep ResumeArea English.
5. **Testimonials** — default: remove the fabricated/risky ones; keep only verifiable. (Reconfirm during Phase 1.)

## 7. Editorial-Light direction notes (B)
- **Palette:** warm off-white / paper background (not pure white), near-black ink text, ONE confident accent (carry a refined version of the existing violet or shift to a single editorial accent). 60-30-10.
- **Type:** a distinctive editorial **serif display** for headlines (characterful, not Times) + a clean sans for body + optional mono for technical/stack details. Replace the generic Oswald/Poppins pairing.
- **Layout:** big headline, lots of whitespace, asymmetric/editorial grid, strong hierarchy, thin rules/dividers, restrained motion (respect `prefers-reduced-motion`).
- **Re-theme targets:** HeroArea, AboutArea, ServiceArea, PortfolioArea (timeline cards), TestimonoalArea, ContactArea, FooterOne, Breadcrumb, **`case-study.css` (dark → light)**, and global tokens in `style.css`.
- **Contrast:** verify text/bg ≥4.5:1 on the light palette (WCAG) — light themes fail contrast easily on muted grays.
