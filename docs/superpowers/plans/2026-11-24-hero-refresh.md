# Hero Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Preloader on every load; hero without slide controls, with an arch-shaped slide change, a per-slide sector line and a pointer glow.
**Architecture:** The head script stops reading session history; the slideshow moves from a CSS progress bar to a timer in `Hero`; `SlideStack` animates each slide's clip-path.
**Tech Stack:** Next.js 16, React 19, Motion, Tailwind v4, Vitest, Playwright.
**Spec:** `docs/superpowers/specs/2026-11-24-hero-refresh-design.md`

## Global Constraints
- Slide interval 7 s; no auto-advance when `useReducedMotion()` is true.
- Only transform, opacity and clip-path animate.
- Preloader still skipped for `prefers-reduced-motion: reduce`.

## Review Focus
- Timer must not keep advancing after unmount (interval cleared).
- Clicking "Next" restarts the 7 s wait, so the slide does not change again a moment later.
- The arch reveal must leave the previous slide visible underneath until the new one covers it (no flash of brown).
- The pointer glow must not render for touch or reduced motion.
- With the preloader on every load, e2e tests that assume an instant page must still pass.

### Task 1: Preloader on every load
**Files:** `src/lib/intro-script.ts`, `src/lib/intro.ts`, `src/components/layout/preloader.tsx`, `tests/unit/intro.test.tsx`, `tests/e2e/preloader.spec.ts`
- [ ] Test: "the head script ignores earlier visits in the session": set `sessionStorage["keypmc-intro-seen"]="1"`, run `new Function(introHeadScript)()`, expect no `data-intro-skip` on `<html>`. Run, expect FAIL.
- [ ] Remove the session check from `introHeadScript`, the `INTRO_SEEN_KEY` export and its write in `Preloader`. Run, expect PASS.
- [ ] E2E: replace "does not replay when reloaded" with "plays again when the page is reloaded" (preloader visible after `page.reload()`).
- [ ] Commit.

### Task 2: Slideshow without controls
**Files:** `src/components/sections/hero.tsx`, `src/components/sections/hero-slider.tsx`, `src/app/globals.css` (remove `.slide-progress` rules), `tests/unit/hero.test.tsx`, `tests/e2e/home.spec.ts`
**Produces:** `SLIDE_SECONDS = 7` in hero-slider.tsx; `SlideControls` removed.
- [ ] Rewrite unit tests (fake timers): no "Pause slideshow" or "Show slide" buttons; advances to slide 2 after 7 s; no advance after 7 s with reduced motion; "Next" card advances and restarts the wait. Run, expect FAIL.
- [ ] Implement the timer (`useEffect` with `setTimeout` keyed on index, ready and reduced motion) and remove the controls row. Run, expect PASS.
- [ ] E2E: replace the slideshow control test with "the Next preview moves the hero on"; the reduced-motion test asserts slide 1 stays after 7.5 s.
- [ ] Commit.

### Task 3: Arch reveal, sector line, glow, scroll cue
**Files:** `src/components/sections/hero-slider.tsx`, `src/components/sections/hero.tsx`, `tests/unit/hero.test.tsx`
- [ ] Test: the sector line shows the active slide's caption and changes after 7 s. Run, expect FAIL.
- [ ] Implement: incoming slide clip-path `inset(42% 36% 0% 36% round 999px 999px 0 0)` → `inset(0% 0% 0% 0% round 0px)` over 1.6 s with the outgoing slide held beneath; sector line with slide-up swap; glow layer (motion values, fine pointer, not reduced); scroll cue at bottom right. Run, expect PASS.
- [ ] Build, full Vitest and Playwright, screenshots and a frame strip of the change; push; sync the PC by bundle.
- [ ] Commit.
