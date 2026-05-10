# Mobile Timeline Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix portfolio timeline so project cards stack single-column on mobile instead of overflowing horizontally.

**Architecture:** Add `className="timeline-card"` to the existing card div in `PortfolioArea.tsx`, then add one CSS rule to the existing `<style>` block in the same file. No new files, no desktop changes.

**Tech Stack:** Next.js, React, CSS (inline `<style>` block inside component)

---

### Task 1: Fix timeline card overflow on mobile

**Files:**
- Modify: `src/components/home/PortfolioArea.tsx:257–352`

- [ ] **Step 1: Add `className="timeline-card"` to the project card div**

In `src/components/home/PortfolioArea.tsx`, find the card `<div>` around line 257 that starts with `key={item.id}`. It currently has no className. Add one:

```tsx
<div
    key={item.id}
    className="timeline-card"
    onClick={() => handleImagePopup(startIndex + idx)}
    style={{
        flex: '0 0 calc(50% - 8px)',
        maxWidth: 'calc(50% - 8px)',
        minWidth: '220px',
        cursor: 'pointer',
        borderRadius: '12px',
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        transition: 'transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
    }}
    onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = 'translateY(-4px)';
        el.style.borderColor = 'rgba(244,243,237,0.3)';
        el.style.boxShadow = '0 16px 40px rgba(0,0,0,0.5)';
    }}
    onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = 'translateY(0)';
        el.style.borderColor = 'rgba(255,255,255,0.07)';
        el.style.boxShadow = 'none';
    }}
>
```

- [ ] **Step 2: Add `.timeline-card` rule to the existing `<style>` block**

Find the `<style>` block near the bottom of `PortfolioArea.tsx` (around line 345). It currently looks like:

```tsx
<style>{`
    @media (max-width: 640px) {
        .timeline-line-desktop { left: 16px !important; }
        .timeline-row { flex-direction: column !important; gap: 8px !important; }
        .timeline-year-col { width: auto !important; text-align: left !important; padding-left: 36px !important; }
        .timeline-dot-col { display: none !important; }
    }
`}</style>
```

Add the `.timeline-card` rule inside the same `@media` block:

```tsx
<style>{`
    @media (max-width: 640px) {
        .timeline-line-desktop { left: 16px !important; }
        .timeline-row { flex-direction: column !important; gap: 8px !important; }
        .timeline-year-col { width: auto !important; text-align: left !important; padding-left: 36px !important; }
        .timeline-dot-col { display: none !important; }
        .timeline-card { flex: 0 0 100% !important; max-width: 100% !important; min-width: 0 !important; }
    }
`}</style>
```

- [ ] **Step 3: Style the year label as a pill badge on mobile**

In the same `<style>` block, add two more rules inside the `@media (max-width: 640px)` block — after the `.timeline-card` rule:

```tsx
<style>{`
    @media (max-width: 640px) {
        .timeline-line-desktop { left: 16px !important; }
        .timeline-row { flex-direction: column !important; gap: 8px !important; border-left: 2px solid rgba(167,139,250,0.2); padding-left: 12px; }
        .timeline-year-col { width: auto !important; text-align: left !important; padding-left: 0 !important; }
        .timeline-dot-col { display: none !important; }
        .timeline-card { flex: 0 0 100% !important; max-width: 100% !important; min-width: 0 !important; }
        .timeline-year-col span { display: inline-block !important; background: rgba(167,139,250,0.1) !important; border: 1px solid rgba(167,139,250,0.3) !important; border-radius: 20px !important; padding: 2px 12px !important; font-size: 13px !important; color: #a78bfa !important; letter-spacing: 0 !important; }
    }
`}</style>
```

Note: `padding-left` on `.timeline-year-col` is reset to `0` because the row's own `padding-left: 12px` (from `border-left`) provides the indent now.

- [ ] **Step 4: Verify visually in browser at mobile width**

Start dev server if not already running:
```bash
npm run dev
```

Open `http://localhost:3000` and use browser DevTools → toggle device toolbar → set width to **375px** (iPhone SE).

Scroll to the "Proyek Saya" section. Expected result:
- Years with 2 projects (2021, 2022, 2025): each card fills full width, stacked vertically — no horizontal overflow
- Years with 1 project (2020, 2023, 2024): single card fills full width
- Desktop (≥641px): layout unchanged — still 2 cards per row

Check at 390px (iPhone 14) and 360px (Android baseline) as well.

- [ ] **Step 5: Commit**

```bash
git add src/components/home/PortfolioArea.tsx
git commit -m "fix: stack timeline project cards single-column on mobile"
```
