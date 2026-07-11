# next-intl Migration Plan — approved 2026-07-11

User decision: migrate the handmade `/en` layer to **next-intl** with `[locale]`
routing, matching the dex-fe convention. Execute in order; verify with
`npx tsc --noEmit && npm run build` after each milestone.

## Target architecture

- `next-intl` (v4 if peer-compatible with Next 14/React 18, else v3).
- `src/i18n/routing.ts` — `defineRouting({ locales: ["id", "en"], defaultLocale: "id", localePrefix: "as-needed" })`
  → Indonesian URLs stay unprefixed (SEO preserved), English under `/en/*`.
- `src/i18n/request.ts` — `getRequestConfig` loading `messages/{locale}.json`.
- `src/middleware.ts` — `createMiddleware(routing)`; matcher excludes `/api`, `_next`, files.
- `messages/id.json`, `messages/en.json` — UI strings only (nav, footer, forms,
  case-study labels, section headings). Long-form content stays in per-locale
  data files: `src/data/projects.ts` (ID) + `src/data/projects-en.ts` (EN),
  `src/data/home.ts` + new `src/data/home-en.ts`, `src/data/about.ts` + new EN data.
- All pages move `src/app/* → src/app/[locale]/*` (except `api/`, `sitemap.ts`,
  `robots.ts`, root `favicon`). `[locale]/layout.tsx` owns `<html lang={locale}>`,
  `NextIntlClientProvider`, `setRequestLocale`, fonts, GTM/GA, JSON-LD.
  No separate root layout (next-intl official pattern); `[locale]/[...rest]`
  catch-all → notFound.
- `opengraph-image.tsx` moves into `[locale]/`.

## Locale gating (ID-only pages)

`/jasa/*`, `/articles*`, `/projects` list, non-Dexova case studies are ID-only:
their `page.tsx` calls `notFound()` when `locale === "en"`, and
`generateStaticParams` only emits the locales that exist. Dexova case studies
resolve data via locale: `locale === "en" ? getCaseStudyEn(slug) : getCaseStudy(slug)`.

## Component consolidation (delete duplicates)

- DELETE `src/components/en/{HomeEn,AboutEn,ContactEn,ServiceEn}.tsx` after
  their ID counterparts are locale-aware.
- `Header`, `Footer`, `NavLinks`, `MobileNav`, `LangSwitch`, `ContactForm`,
  `CaseStudyPage`: replace local dicts with `useTranslations`/`getTranslations`;
  nav hrefs via next-intl `Link` (auto locale prefix).
- Home sections (`Hero`, `FeaturedDexova`, `SelectedProjects`, `Capabilities`,
  `Experience`, `ArticlesTeaser`, `ContactCta`), `AboutPage`, `ContactPage`,
  `ServiceHubPage`: copy from messages via `getTranslations`, structured data
  from per-locale data helpers. Rich text (bold/violet spans) via `t.rich`.
- `LangSwitch`: next-intl `usePathname` + `Link locale={other}` replaces
  `src/i18n/routes.ts` PAIRS (delete that file when done).

## Metadata

- Per-page `generateMetadata` keeps manual `alternates.languages` for paired
  pages ({ id, en, x-default: id }); ID-only pages keep plain canonical.
- Sitemap keeps explicit entries (already lists /en pairs).

## Already done before this migration (do not redo)

Dark-only theme tokens; three.js hero + ambient (Scene3D lazy + fallbacks);
Reveal failsafe (2.5s auto-release); fresh guide screenshots integrated;
accuracy corrections (Gin, modular monolith, gRPC client-only, PASETO,
app-level tenancy, selfie attendance, ESC/POS driver); /api/contact
provider-agnostic (whatsapp-cloud | fonnte via env, wa.me fallback);
CV buttons (hero + about, CV_URL in src/lib/contact.ts); availability badge removed;
EN content written (reuse strings from src/components/en/* + projects-en.ts
when filling messages/en.json before deleting those files).

## Verification

`tsc --noEmit` → `eslint src` → `npm run build` (expect: ID routes unprefixed,
EN under /en, 404 for /en/jasa/*) → Playwright screenshots (/, /en,
/projects/dexova-hris, /en/projects/dexova-erp) → Lighthouse home ID + EN.
