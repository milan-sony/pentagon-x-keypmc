# Custom brand icons (redesign/antra)

## Intent
Replace the stock Lucide icons on the content of the homepage with a set drawn
for Key International, so the icons read as part of the brand rather than
off-the-shelf line art. Chosen scope: **B — every content icon shown on the
page** (division cards, delivery tool chips, the drone survey card).

## Goals / non-goals / anti-goals
- Goal: one consistent, hand-drawn family that echoes the logo's arch and keystone.
- Goal: icons that come alive on the division cards (draw in on hover/focus).
- Non-goal: interface glyphs (arrows, checks, map pin, clock, menu, play/pause)
  stay Lucide, because people read them as controls.
- Anti-goal: icons so detailed they turn to mush at chip size, or a family
  where one icon looks borrowed from elsewhere.

## Approaches
1. **Hand-drawn SVG React components (chosen).** Crisp at any size, recolour
   with the theme, animate with CSS, no new dependency. Costs drawing time.
2. Another icon library (Phosphor duotone, Tabler): still off-the-shelf.
3. AI-generated icon art (Higgsfield): no credits, and raster art cannot
   recolour or animate, and drifts in style across 11 icons.

## Style rules
- 48 × 48 grid, 4-unit safe margin, round caps and joins.
- Linework in `currentColor` (brown on light, cream on the brown hover panel).
- One gold accent shape per icon, filled with `--icon-accent` (gold-500).
- The arch or keystone appears as a motif across the family.
- Two sizes: `lg` (32 px, division cards, full detail) and `sm` (18–20 px,
  chips; secondary detail strokes hidden so it stays legible).
- Strokes keep a constant on-screen weight at both sizes.

## The icons (10 drawings, 11 placements)
| Key | Used for | Drawing |
|---|---|---|
| clipboard-check | Project Management Consultancy | clipboard whose clip is the keystone; three lines, gold tick |
| cog | Project Support Services | gear with an arched opening at its centre; gold hub |
| hard-hat | Operations & Project Delivery | hard hat over a horizon line; gold brim band |
| package | Commercial & Supply Chain | box and a dashed route to a second box; gold strap |
| chart-gantt | Primavera P6 & MS Project | gantt bars; gold critical-path bar and milestone diamond |
| layers | BIM coordination | three isometric planes; gold top plane |
| chart-pie | Power BI dashboards | dashboard frame with bars; gold pie wedge |
| database | ERP-integrated controls | stacked cylinder linked to two nodes; gold link node |
| drone | Drone surveys (chip and specialist card) | top-down quadcopter; gold scan cone below |
| folder-open | Document control | open folder with sheets; gold seal |

## Behaviour
- Division cards: linework draws in (stroke-dashoffset) and the accent scales
  in on hover/focus, alongside the arch badge; the badge grows to fit 32 px icons.
- Chips and the specialist card: static.
- Reduced motion: the global rule makes the draw instant.
- Decorative: `aria-hidden`, as today.

## Housekeeping (my call)
Services and advantages items carry icon keys that are never rendered. They
are dead data; remove those fields and the keys only they use
(workflow, drafting-compass, coins, stamp, crown, user-check, landmark,
building, shield-check) and update the content test accordingly.

## Verification
- Unit test: every key used by the content renders an `svg` that is
  `aria-hidden` and has exactly one accent element.
- Visual review: a sheet of all icons at both sizes on light and dark,
  shared before wiring into the page; then section screenshots at 4 widths,
  full unit and end-to-end runs, push and PC sync.
