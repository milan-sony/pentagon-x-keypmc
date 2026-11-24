# Custom Brand Icons Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Lucide content icons with ten hand-drawn Key International icons, shown in the division cards (drawing in on hover), the delivery tool chips and the drone specialist card.

**Architecture:** A `BrandIcon` component owns the shared frame (48 × 48 viewBox, stroke rules, size modes, draw animation hooks); a `glyphs.tsx` file holds the ten drawings as data keyed by `IconKey`. Call sites swap `Icon` (Lucide) for `BrandIcon`; the unused icon keys are removed from the content.

**Tech Stack:** Next.js 16, React 19, Tailwind v4, Vitest + Testing Library, Playwright.

**Spec:** `docs/superpowers/specs/2026-11-24-custom-icons-design.md`

## Global Constraints

- 48 × 48 grid, 4-unit safe margin, round caps and joins.
- Linework in `currentColor`; exactly one gold accent element per icon, filled with `var(--icon-accent, var(--color-gold-500))`.
- Two sizes: `lg` 32 px with full detail; `sm` 18–20 px with detail strokes hidden.
- Constant on-screen stroke weight: `vector-effect: non-scaling-stroke`, 1.5 px at `lg`, 1.25 px at `sm`.
- Interface glyphs (arrows, checks, map pin, clock, menu, play/pause) stay Lucide.
- Icons are decorative: `aria-hidden="true"`.
- Only transform, opacity and stroke-dashoffset animate; reduced motion is handled by the existing global CSS rule.

## Review Focus

- Keyboard focus on a division card must draw the icon exactly like hover (`group-focus-visible`), not only `group-hover`.
- On the brown hover panel the linework must turn cream while the accent stays gold; a brown-on-brown icon would vanish.
- At `sm` the chip icons must stay legible at 18 px: no detail strokes, no hairline below 1.25 px.
- With reduced motion the icons must be fully drawn at rest and after hover (never stuck half-drawn).
- Every key used by `home.ts` must have a glyph; a missing glyph must fail type-checking, not render nothing.

---

### Task 1: BrandIcon frame and the ten drawings

**Files:**
- Create: `src/components/icons/brand-icon.tsx`
- Create: `src/components/icons/glyphs.tsx`
- Modify: `src/app/globals.css` (add `icon-draw` and `icon-pop` keyframes and the `.brand-icon` rules)
- Test: `tests/unit/brand-icon.test.tsx`

**Interfaces:**
- Consumes: `IconKey` from `@/content/home` (narrowed in Task 2; Task 1 types glyphs against the ten keys listed in the spec).
- Produces:
  - `type GlyphKey = "clipboard-check" | "cog" | "hard-hat" | "package" | "chart-gantt" | "layers" | "chart-pie" | "database" | "drone" | "folder-open"` exported from `glyphs.tsx`.
  - `glyphs: Record<GlyphKey, ReactNode>`: each drawing is a fragment of `<path>` elements only; every stroke path carries `data-stroke` and `pathLength={1}`; secondary strokes also carry `data-detail`; the single accent shape carries `data-accent`.
  - `BrandIcon({ name: GlyphKey; size?: "sm" | "lg"; animate?: boolean; className?: string }): JSX.Element` renders `<svg viewBox="0 0 48 48" aria-hidden="true" data-size={size} data-animate={animate} class="brand-icon ...">`; default `size="lg"`, `animate=false`.

- [ ] **Step 1: Write the failing test** (`tests/unit/brand-icon.test.tsx`)

```tsx
const keys = Object.keys(glyphs) as GlyphKey[];
it("draws all ten icons", () => expect(keys).toHaveLength(10));
it.each(keys)("%s is decorative with exactly one gold accent", (name) => {
  const { container } = render(<BrandIcon name={name} />);
  const svg = container.querySelector("svg")!;
  expect(svg).toHaveAttribute("aria-hidden", "true");
  expect(svg).toHaveAttribute("viewBox", "0 0 48 48");
  expect(svg.querySelectorAll("[data-accent]")).toHaveLength(1);
  expect(svg.querySelectorAll("[data-stroke]").length).toBeGreaterThan(1);
});
it("marks the small size so detail strokes can be hidden", () => {
  const { container } = render(<BrandIcon name="layers" size="sm" />);
  expect(container.querySelector("svg")).toHaveAttribute("data-size", "sm");
});
```

- [ ] **Step 2: Run it to verify it fails**

Run: `npx vitest run tests/unit/brand-icon.test.tsx`
Expected: FAIL, cannot resolve `@/components/icons/brand-icon`.

- [ ] **Step 3: Implement `BrandIcon` and `glyphs`**

Draw each glyph to the spec's table (keystone or arch motif where the table says so). CSS in `globals.css`:
- `.brand-icon [data-stroke]`: `fill:none; stroke:currentColor; stroke-linecap:round; stroke-linejoin:round; vector-effect:non-scaling-stroke; stroke-width:1.5`; `[data-size=sm]` → `1.25`.
- `.brand-icon[data-size=sm] [data-detail] { display:none }`.
- `.brand-icon [data-accent] { fill: var(--icon-accent, var(--color-gold-500)); stroke:none; transform-box: fill-box; transform-origin:center }`.
- `@keyframes icon-draw { from { stroke-dashoffset:1 } to { stroke-dashoffset:0 } }` and `@keyframes icon-pop { from { transform: scale(0); opacity:0 } to { transform: scale(1); opacity:1 } }`.
- `.group:is(:hover,:focus-visible) .brand-icon[data-animate=true] [data-stroke] { stroke-dasharray:1; animation: icon-draw 0.9s var(--ease-portal) both }` and the accent with `icon-pop 0.5s 0.45s both`. At rest no dasharray, so icons are always fully drawn.

- [ ] **Step 4: Run the test** — `npx vitest run tests/unit/brand-icon.test.tsx`, expected PASS (12 tests).

- [ ] **Step 5: Review sheet for the user**

Render every glyph at `lg` and `sm` on ivory and on brown-950 (cream linework) with a throwaway script in `/home/claude/tools` (not committed), screenshot it, send it to the user, and adjust drawings from their feedback before Task 2.

- [ ] **Step 6: Commit** — `git add src/components/icons src/app/globals.css tests/unit/brand-icon.test.tsx && git commit` ("feat(icons): hand-drawn brand icon set").

### Task 2: Wire the icons in and drop the unused keys

**Files:**
- Modify: `src/content/home.ts` (narrow `iconKeys` to the ten `GlyphKey` values; split `Feature` into `Feature = { title; description }` and `IconFeature = Feature & { icon: IconKey }`; divisions, tools and `services.specialist` use `IconFeature`; remove `icon` from `services.items` and `advantages.items`)
- Modify: `src/components/brand/arch-badge.tsx` (badge `h-24 w-20`, icon slot sized for 32 px)
- Modify: `src/components/sections/division-card.tsx` (`<BrandIcon name={division.icon} animate className="size-8" />`)
- Modify: `src/components/sections/approach.tsx` (chips: `<BrandIcon name={tool.icon} size="sm" className="size-[1.15rem] text-brown-700" />`)
- Modify: `src/components/sections/services.tsx` (specialist: `<BrandIcon name={services.specialist.icon} size="sm" className="size-5" />` on the gold circle, linework brown-950)
- Delete: `src/components/ui/icon.tsx`
- Test: `tests/unit/content.test.ts`, `tests/unit/who-we-are.test.tsx`

**Interfaces:**
- Consumes: `BrandIcon`, `GlyphKey`, `glyphs` from Task 1.
- Produces: `IconKey` equal to `GlyphKey`; `IconFeature` type exported from `home.ts`.

- [ ] **Step 1: Update the tests first**
  - `content.test.ts`: the icon test becomes "gives every division, tool and the specialist a description and a drawn icon", iterating `[...home.intro.divisions, ...home.approach.tools, home.services.specialist]` and asserting `Object.keys(glyphs)` contains `item.icon`; a second test asserts services and advantages items have a non-empty title and description.
  - `who-we-are.test.tsx`: add "each card shows its own brand icon, set to draw on hover": every `[data-arch-badge] svg.brand-icon` has `data-animate="true"`, and there are 4.
- [ ] **Step 2: Run them** — `npx vitest run tests/unit/content.test.ts tests/unit/who-we-are.test.tsx`, expected FAIL.
- [ ] **Step 3: Make the content, badge and call-site changes listed under Files.** On the division card the icon colour follows the existing `group-hover:text-gold-200`; change it to `group-hover:text-cream` so the gold accent reads against cream linework.
- [ ] **Step 4: Run** `npx vitest run && npx tsc --noEmit && npm run lint`, expected all pass with no Lucide import left in `division-card.tsx` or `approach.tsx`, and `grep -rn "ui/icon" src` empty.
- [ ] **Step 5: Commit** ("feat(icons): use the brand icons in cards, chips and the drone card").

### Task 3: Verify and ship

- [ ] **Step 1: Reduced-motion e2e** — in `tests/e2e/home.spec.ts` add "brand icons are fully drawn with reduced motion": emulate reduce, hover the second division link, wait 300 ms, and assert every `[data-arch-badge] [data-stroke]` has computed `stroke-dashoffset` of `0px` or `0`.
- [ ] **Step 2: Run** `npm run build && npx playwright test`, expected all pass at 375, 768, 1024 and 1440.
- [ ] **Step 3: Visual check** — card row at rest and hovered (1440 and 390), approach chips and the specialist card; fix any legibility issue found.
- [ ] **Step 4: Commit, push** `git -c push.negotiate=true push origin redesign/antra`, **sync the PC** by an incremental bundle with a unique filename, fast-forward there, delete the bundle, and send the screenshots.
