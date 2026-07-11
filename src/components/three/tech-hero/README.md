# Tech Hero

The homepage hero illustration: a **2.5D layered composition** built from the
pre-rendered node artwork in `public/assets/images/hero/nodes/*.webp`. A laptop
(with a baked-in dashboard) is the focal point; eight supporting nodes
(database, cloud, server, code, api, gear, analytics, phone) ring it and are
joined by animated SVG data-flow connections.

No WebGL / three.js — the artwork is already 3D-rendered, so the depth comes
from layering, a subtle whole-scene pointer parallax, and a gentle float. This
keeps the hero light and dependency-free.

## Files

| File | Responsibility |
|---|---|
| `config.ts` | **Single source of truth** — palette (`COLORS`), the `1000×750` design space, node layout (`SCENE_NODES`: centre, width, z, accent, intrinsic size), and connections (`FLOW_CONNECTIONS`). |
| `TechHero.tsx` | Public entry: renders the image layers, runs the pointer parallax, hover state, and tooltip. |
| `FlowConnections.tsx` | SVG overlay — smooth cubic curves between node centres and the laptop, with animated dash + flow particles. |
| `hooks.ts` | `useReducedMotion`, `useIsTouch` (both SSR-safe via `useSyncExternalStore`). |
| `tech-hero.module.css` | Stage/scene/float, node layers, flow keyframes, tooltip, responsive, reduced-motion. |
| `index.ts` | Re-exports `TechHero`. |

Import: `import { TechHero } from "@/components/three/tech-hero";`
(The folder still sits under `three/` for git history; it no longer uses three.js.)

## The artwork pipeline

Source PNGs (white background) live in `public/assets/images/hero/{1..9}.png`.
They were keyed to transparency (flood-fill from the borders, so interior
highlights survive), cropped to content, downscaled to ≤1000px, and saved as
WebP into `nodes/`. To re-process after replacing a source PNG, re-run the
keying script (see the session notes) — output name map: 1→laptop, 2→database,
3→code, 4→gear, 5→analytics, 6→cloud, 7→server, 8→api, 9→phone.

## Customizing

**Move / resize a node** — edit its `cx`, `cy` (centre in the `1000×750` design
space) and `width` in `SCENE_NODES` (`config.ts`). The connection lines, hover
tooltip, and layout all follow. `z` sets stacking (background nodes low,
foreground high). All nodes render at every breakpoint.

**Change a connection** — edit `FLOW_CONNECTIONS`: `from`/`to` (node ids; `from`
sets flow direction), `accent`, `duration`, `delay`, `particleCount`. The curve
is generated (`smoothPath` in `FlowConnections.tsx`); every line runs from the
`from` node centre to a point on the laptop's perimeter.

**Change colors** — `COLORS` in `config.ts` (kept in step with the site's
orange/teal theme). Each node/line picks its accent via the `accent` field.

**Tune motion** — parallax strength lives in the `loop()` transform in
`TechHero.tsx` (rotate/translate multipliers); float amplitude in the `floatY`
keyframe; flow speed per-connection via `duration`. All motion is gated by
`prefers-reduced-motion` and disabled on touch (parallax) automatically.
