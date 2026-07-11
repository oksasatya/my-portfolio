# DESIGN.md — oksasatya.dev design system

Technical-editorial, **dark terracotta** (user palette 2026-07-11), premium. Violet is identity used with precision — never a
surface wash. Whitespace, strong typography, consistent grid, large product imagery,
outcome-based storytelling. No gradient text, no glassmorphism, no skill bars, no logo
walls, no per-section eyebrow scaffolding, no preloader, no decorative-only animation.

## Color tokens — dark terracotta (WCAG-verified)

Token NAMES are legacy from the violet era ("violet" = primary accent); values are
the source of truth (`src/styles/globals.css`).

| Token          | Value     | Use                                          | Contrast (AA)               |
|----------------|-----------|----------------------------------------------|------------------------------|
| `bg`           | `#0E1116` | page background                              | —                            |
| `surface`      | `#1B222D` | cards, panels                                | —                            |
| `dark`         | `#151A22` | section rhythm (Featured, marquee, CTA)      | —                            |
| `line`         | `#2B3442` | hairlines, borders (non-text)                | —                            |
| `ink`          | `#F2F0EA` | primary text                                 | 16.6:1 bg ✅                 |
| `muted`        | `#9CA3AF` | secondary text                               | 7.5:1 bg / 6.3:1 card ✅     |
| `violet`       | `#D97757` | PRIMARY accent — CTA bg, icons, headline     | as text 6.1:1 bg ✅          |
| `violet-deep`  | `#E48768` | CTA hover + link/text accent                 | 7.2:1 bg / 6.1:1 card ✅     |
| `violet-glow`  | `#EFA88F` | bright accent text on sections               | 8.9:1 ✅                     |
| `teal`         | `#6F8A84` | secondary accent (sage) — tags, nodes        | 5.1:1 bg / 4.7:1 section ✅  |

**Hard rule:** white on `#D97757` is 3.1:1 — primary buttons use DARK text
(`text-dark`, 5.8:1). The tech-hero 3D palette (`src/components/three/tech-hero/config.ts`)
mirrors these exact values.

## Typography

- **Display:** Bricolage Grotesque (variable, `next/font`) — headings, hero.
- **Body:** Figtree — 16–18px, line-height 1.6, max width 72ch.
- **Mono:** JetBrains Mono — technical labels, data figures, breadcrumbs, code.
- Modular scale ≈1.25; heading `clamp()` ceiling ~4.5rem; `text-wrap: balance` on h1–h3;
  `tabular-nums` for data; letter-spacing ≥ -0.04em on display.

## Signature element

**System blueprint** — Dexova's real architecture (dex-fe / dex-attendance / dex-pos →
API → PostgreSQL / Redis → Midtrans, …) drawn as a labeled SVG diagram in case studies;
an abstract connected-nodes derivative serves as low-opacity background motif.

## SVG background strategy

Three local, static, tiny (<3 KB) motifs, all `aria-hidden="true"`, no continuous
animation, not on every section:

1. Subtle dot-grid — light hero, opacity ~0.35, masked fade.
2. Connected nodes / topology — dark sections, stroke `#8B7EFC` at ~0.12.
3. Contour lines — final CTA section, opacity ~0.08.

## Motion & 3D

CSS transitions + one IntersectionObserver reveal hook (subtle stagger, 1.8s instant
failsafe so content is never trapped hidden). Exponential ease-out. Full
`prefers-reduced-motion` support.

**three.js layer** (user decision 2026-07-11): the "system blueprint" as a floating 3D
node network — dense variant behind the hero, sparse ambient variant behind dark
sections. `@react-three/fiber@8`, lazy: `next/dynamic` (ssr:false) + 2.2s idle defer +
IntersectionObserver mount/unmount + reduced-motion & low-core fallback to the static
SVG backdrops. Never blocks LCP/TBT (Lighthouse desktop 100 with 3D active).

## Layout

12-col grid, `max-w-6xl`/`7xl` container; fluid section spacing via `clamp()`; dark
sections (`#0B1020`) used as rhythm accents (hero-adjacent CTA, architecture sections),
not alternating stripes. Mobile-first from 320px; no horizontal overflow; touch targets
≥44px; inputs ≥16px; drawer nav on phone.

## Implementation

Tailwind CSS v4 (CSS-first `@theme` tokens in `src/styles/globals.css`). Disciplined
component layer (`Button`, `Card`, `Section`, `Badge`, …) — utility soup is a defect.
Icons: lucide-react (SVG), no icon fonts. Images: `next/image`, WebP/AVIF, explicit
sizes, lazy below fold. Fonts via `next/font` subset + swap.

## i18n

next-intl v4, `[locale]` routing with `localePrefix: "as-needed"`: Indonesian URLs stay
unprefixed (`/`), English under `/en/*`. UI strings in `messages/{id,en}.json`;
long-form content in per-locale data files (`src/data/*-en.ts`, `projects-en.ts`)
selected via `src/data/locale-data.ts`. Indonesian-only surfaces (`/jasa/*`,
`/articles*`, non-Dexova case studies) 404 under `/en` and are excluded from hreflang.

## Tech-stack marquee

Under the hero: infinite CSS marquee (`.marquee-track`, 45s linear) of 19 self-hosted
brand SVGs (simple-icons, `public/assets/icons/tech/`) with mono labels — languages,
backend/frontend frameworks, databases, infra. Pauses on hover/focus; static row under
`prefers-reduced-motion`. Dark icons (Next.js, Express) are tinted `#F2F0EA`.
