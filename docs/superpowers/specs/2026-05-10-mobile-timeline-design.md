# Mobile Fix: Portfolio Timeline

**Date:** 2026-05-10  
**Scope:** `src/components/home/PortfolioArea.tsx` — mobile layout only  
**Desktop:** unchanged

## Problem

On mobile screens (≤640px), project cards inside the timeline overflow horizontally. The root cause is `minWidth: '220px'` combined with `flex: '0 0 calc(50% - 8px)'` — two cards side by side require at minimum 440px+gap, which exceeds a typical phone width (360–390px).

Secondary issue: the year label has no visual connection to its cards after the dot connector is hidden on mobile.

## Design

### Project Cards (mobile)

On screens ≤640px:
- Cards go to **1 column** (full width): `flex: 0 0 100%`, `maxWidth: 100%`
- Remove effective `minWidth` constraint on mobile (override to `minWidth: 0` or `auto`)
- Stacked vertically with existing `gap: 16px`

Desktop (>640px) stays exactly as-is: 2 columns, `minWidth: 220px`, side by side.

### Year Label (mobile)

Replace the plain text year with a **pill badge** — small, left-border-accented timeline indicator:
- `display: inline-block` with a subtle purple-tinted border + background
- Left border of the parent row acts as the vertical timeline line

### Timeline Line (mobile)

Keep the left border approach already partially in place (`left: 16px`). Style it as a subtle `border-left` on each `.timeline-row` container instead of the absolute-positioned lines (which are already hidden/repositioned by the existing `<style>` block).

## Implementation Approach

Bootstrap-first (Approach 1): add a single CSS media query block inside the existing `<style>` tag in `PortfolioArea.tsx`. No new files. No desktop changes.

```css
@media (max-width: 640px) {
  /* existing rules stay */
  .timeline-line-desktop { left: 16px !important; }
  .timeline-row { flex-direction: column !important; gap: 8px !important; }
  .timeline-year-col { width: auto !important; text-align: left !important; padding-left: 36px !important; }
  .timeline-dot-col { display: none !important; }

  /* new rules */
  .timeline-card { flex: 0 0 100% !important; max-width: 100% !important; min-width: 0 !important; }
}
```

The `.timeline-card` class needs to be added to the card `<div>` in the JSX (currently has no className).

## Files Changed

| File | Change |
|------|--------|
| `src/components/home/PortfolioArea.tsx` | Add `className="timeline-card"` to project card div; add `timeline-card` rule in the `<style>` block |

## Out of Scope

- Hero layout mobile fix
- Services grid mobile fix
- Any desktop layout changes
- Any content/copy changes
