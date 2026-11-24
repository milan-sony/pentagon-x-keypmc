# Hero refresh and preloader on every load (redesign/antra)

Approved in chat on 2026-11-24.

## Intent
The user found the hero's slide controls (01/02/03 bars, pause button) cluttered,
wanted the hero more attractive, and expected the preloader on every load,
including a hard refresh.

## Decisions (the user's)
- Preloader plays on every page load and reload; reduced-motion visitors still skip it.
- Remove the 01/02/03 bars, the pause button and the caption beside them. Slides
  auto-change every 7 s with no pause control (the user accepted that this drops
  WCAG 2.2.2 compliance); no auto-change for reduced motion.

## Hero design (my proposal, approved)
- Arch-shaped slide change: the incoming slide opens from a narrow arch at the
  bottom centre (clip-path inset with a rounded top) to full screen.
- Per-slide sector line above the headline, swapping with each slide; the
  headline stays fixed.
- Cleaner frame: no controls row; the "Scroll" cue sits alone at bottom right (lg+).
- A soft gold glow follows the mouse over the photo (fine pointer, motion allowed).
- The "Next" preview card stays as the manual way to advance (keyboard reachable).
- Unchanged: arch outline, grain, vignette, odometer card, pointer parallax, scroll exit.

## Approaches considered
- Arch clip-path reveal (chosen): on-brand, GPU-friendly, no new dependency.
- Plain cross-fade: what exists; judged too quiet.
- Wipe or curtain transitions: generic, not tied to the brand.

## Verification
Unit: head script ignores session history; slides advance on a 7 s timer, not
under reduced motion; "Next" advances; the sector line follows the slide.
E2E: preloader replays on reload; existing suites pass at four widths.
Visual: screenshots and a frame sequence of the arch change.
