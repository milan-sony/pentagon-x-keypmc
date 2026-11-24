# Labels, Toolkit and Spacing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Brand-marker section labels, a ruled toolkit panel, tighter section rhythm, no hero arch outline.
**Spec:** `docs/superpowers/specs/2026-11-24-labels-toolkit-spacing-design.md`

## Global Constraints
- Keystone geometry from `src/components/brand/arch-geometry.ts`.
- Only transform, opacity, clip-path and stroke-dashoffset animate.

## Review Focus
- The centred Contact label must stay centred with lines on both sides.
- Toolkit grid lines must stay continuous when the last row is not full at 6/3/2 columns (six items divide evenly; keep it that way).
- Tool descriptions must not be cut off at the narrowest width.

### Task 1: Section label
**Files:** `src/components/ui/heading.tsx` (`SectionLabel({ children, tone?, align?: "start" | "center", line?: "short" | "fill", className? })`), its callers, `tests/unit/heading.test.tsx`
- [ ] Test: renders the text in a paragraph marked `data-section-label`, a decorative keystone (`aria-hidden`), and no `rounded-full` pill class. Run, expect FAIL.
- [ ] Implement; SplitHeader uses `line="fill"`; Contact uses `align="center"`; hero drops its blur backing. Run, expect PASS. Commit.

### Task 2: Toolkit panel and hero outline removal
**Files:** `src/components/sections/approach.tsx`, `src/components/sections/hero.tsx`, delete `src/components/brand/arch.tsx`, `tests/unit/toolkit.test.tsx`
- [ ] Test: in `<Approach />`, the list named "Tools we work with" has 6 items, each showing its title and description and one `svg.brand-icon[data-animate=true]`. Run, expect FAIL.
- [ ] Implement the panel (`ul` labelled by the h3, hairline grid via `gap-px` on a tinted background, `group` items); remove ArchOutline and its parallax values from the hero. Run, expect PASS. Commit.

### Task 3: Spacing, verify, ship
- [ ] Apply the spacing values from the spec across sections; build; full Vitest and Playwright; screenshots at four widths; push design2; sync the PC by bundle. Commit.
