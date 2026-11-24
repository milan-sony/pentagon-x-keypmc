# Section labels, toolkit and spacing (design2)

Approved in chat on 2026-11-24.

## Intent
The pill badges above headings looked generic, the "Tools we work with" chips
undersold the tools, and sections sat too far apart.

## Decisions
- **Labels:** replace the pill with a brand marker: the gold keystone, the label
  in small brown text (cream on dark), and a fine gold line toward the heading.
  No capsule, no blurred box in the hero. Centred contexts get a line on both sides.
- **Toolkit:** six tools as a ruled panel (hairline grid, 6 / 3 / 2 columns by
  width). Each shows the large brand icon that redraws on hover, the name, and the
  one-line description (until now only in a tooltip). Items rise in turn.
  Rejected: a scrolling ticker (livelier, but loses the descriptions).
- **Spacing:** section padding 128 → 96 px desktop, 96 → 80 px mobile; heading to
  content 80 → 56 px; toolkit gap 128 → 80 px; Services and Stats tightened
  so they read as one white block.
- **Hero:** remove the drawn logo arch outline (user request).

## Verification
Unit tests for the label (decorative keystone, no pill) and the toolkit (name,
description, animated icon per tool); full suites; screenshots at four widths;
push to design2 and sync the PC.
