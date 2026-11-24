import type { ReactNode } from "react";
import type { IconKey } from "@/content/home";

/*
 * Key International's icon drawings, on a 48 × 48 grid with a 4-unit margin.
 * Every drawing is made of paths only, so each line can be drawn in by
 * animating its normalised length:
 *   <Line>   a main stroke, kept at every size;
 *   <Detail> a secondary stroke, dropped at the small size;
 *   <Accent> the one gold shape (filled, or a gold line with `line`).
 * Styling lives in globals.css under `.brand-icon`.
 */

/** One drawing per icon key in the content file, so a missing drawing fails type-checking. */
export type GlyphKey = IconKey;

function Line({ d }: { d: string }) {
  return <path data-stroke="" pathLength={1} d={d} />;
}

function Detail({ d }: { d: string }) {
  return <path data-stroke="" data-detail="" pathLength={1} d={d} />;
}

function Accent({ d, line = false, soft = false }: { d: string; line?: boolean; soft?: boolean }) {
  return <path data-accent={line ? "line" : "fill"} fillOpacity={soft ? 0.5 : undefined} d={d} />;
}

/** A circle as a path, so it can be drawn in like every other line. */
const circle = (cx: number, cy: number, r: number) =>
  `M${cx + r} ${cy}a${r} ${r} 0 1 1-${2 * r} 0a${r} ${r} 0 1 1 ${2 * r} 0`;

export const glyphs: Record<GlyphKey, ReactNode> = {
  // Project management: a clipboard held by the logo's keystone, with a gold tick.
  "clipboard-check": (
    <>
      <Line d="M18 9h-4a3 3 0 0 0-3 3v28a3 3 0 0 0 3 3h20a3 3 0 0 0 3-3V12a3 3 0 0 0-3-3h-4" />
      <Line d="M19 5h10l-1.6 8h-6.8z" />
      <Detail d="M17 21h14" />
      <Detail d="M17 27h14" />
      <Line d="M17 33h5" />
      <Accent line d="M25.5 34.5l3 3 5.5-6.5" />
    </>
  ),

  // Support services: a gear with an arched doorway at its heart, lit in gold.
  cog: (
    <>
      <Line d="M20.85 10.36L21.41 6.69L26.59 6.69L27.15 10.36A14 14 0 0 1 31.42 12.13L34.41 9.93L38.07 13.59L35.87 16.58A14 14 0 0 1 37.64 20.85L41.31 21.41L41.31 26.59L37.64 27.15A14 14 0 0 1 35.87 31.42L38.07 34.41L34.41 38.07L31.42 35.87A14 14 0 0 1 27.15 37.64L26.59 41.31L21.41 41.31L20.85 37.64A14 14 0 0 1 16.58 35.87L13.59 38.07L9.93 34.41L12.13 31.42A14 14 0 0 1 10.36 27.15L6.69 26.59L6.69 21.41L10.36 20.85A14 14 0 0 1 12.13 16.58L9.93 13.59L13.59 9.93L16.58 12.13A14 14 0 0 1 20.85 10.36Z" />
      <Detail d={circle(24, 24, 8.5)} />
      <Line d="M19.5 31v-7a4.5 4.5 0 0 1 9 0v7z" />
      <Accent d="M21.5 31v-6.5a2.5 2.5 0 0 1 5 0V31z" />
    </>
  ),

  // Delivery: a hard hat with its raised ridge and front peak, on a gold brim, over the horizon.
  "hard-hat": (
    <>
      <Line d="M10.5 29c0-8.3 6-14.5 13.5-14.5S37.5 20.7 37.5 29" />
      <Line d="M20.5 15.2V29M27.5 15.2V29" />
      <Detail d="M14.5 22.5c-.9 2-1.5 4.2-1.5 6.5M33.5 22.5c.9 2 1.5 4.2 1.5 6.5" />
      <Accent d="M8 29h33.5c1.4 0 2.5 1 2.5 2.2v.1c0 1.2-1 2.2-2.3 2.2H8a2.25 2.25 0 0 1 0-4.5z" />
      <Line d="M5 40h38" />
    </>
  ),

  // Supply chain: a strapped crate and the route to the next one.
  package: (
    <>
      <Line d="M7 25l10-5 10 5v12l-10 5-10-5z" />
      <Line d="M7 25l10 5 10-5M17 30v12" />
      <Accent d="M10.4 23.3l10 5 2.2-1.1-10-5z" />
      <Detail d="M29.5 22.5h.01M32.5 20.5h.01M35 17.5h.01" />
      <Line d="M33 10l5-2.5 5 2.5v6l-5 2.5-5-2.5z" />
      <Detail d="M33 10l5 2.5 5-2.5M38 12.5v6" />
    </>
  ),

  // Programme: gantt bars with the critical path in gold and a milestone.
  "chart-gantt": (
    <>
      <Line d="M8 9v31h32" />
      <Line d="M14 13h11a2 2 0 0 1 0 4H14a2 2 0 0 1 0-4z" />
      <Accent d="M19 21h12a2 2 0 0 1 0 4H19a2 2 0 0 1 0-4z" />
      <Line d="M25 29h8a2 2 0 0 1 0 4h-8a2 2 0 0 1 0-4z" />
      <Detail d="M31 25v2.5a1.5 1.5 0 0 0 1.5 1.5" />
      <Detail d="M39.5 28l3 3-3 3-3-3z" />
    </>
  ),

  // BIM: stacked model layers with the active one in gold.
  layers: (
    <>
      <Accent d="M24 8l15 7.5-15 7.5L9 15.5z" />
      <Line d="M14 21l-5 2.5L24 31l15-7.5-5-2.5" />
      <Line d="M14 29l-5 2.5L24 39l15-7.5-5-2.5" />
      <Detail d="M24 31v8" />
    </>
  ),

  // Dashboards: a screen with a pie and bars, its gold wedge lifted out.
  "chart-pie": (
    <>
      <Line d="M10 9h28a3 3 0 0 1 3 3v20a3 3 0 0 1-3 3H10a3 3 0 0 1-3-3V12a3 3 0 0 1 3-3z" />
      <Line d="M20 35l-2 6M28 35l2 6M16 41h16" />
      <Line d="M17 15a7 7 0 1 0 7 7h-7z" />
      <Accent d="M19 13v7h7a7 7 0 0 0-7-7z" />
      <Detail d="M30 29v-6M34 29v-10M38 29v-13" />
    </>
  ),

  // ERP: a data store linked to two systems through a gold junction.
  database: (
    <>
      <Line d={`M9 12a9 3 0 1 0 18 0a9 3 0 1 0-18 0`} />
      <Line d="M9 12v22a9 3 0 0 0 18 0V12" />
      <Detail d="M9 19.5a9 3 0 0 0 18 0M9 27a9 3 0 0 0 18 0" />
      <Line d="M27 23h3.5M35 21.5l2.2-4.3M35 24.5l2.2 4.3" />
      <Line d={circle(39, 15, 2.5)} />
      <Line d={circle(39, 31, 2.5)} />
      <Accent d={circle(33, 23, 2.5)} />
    </>
  ),

  // Drone surveys: a drone casting a gold scan beam onto the site.
  drone: (
    <>
      <Line d="M20 13h8a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2z" />
      <Line d="M18 15.5h-8M30 15.5h8" />
      <Detail d="M10 15.5v-3.5M38 15.5v-3.5" />
      <Line d="M5.5 12h9M33.5 12h9" />
      <Accent soft d="M22.5 21h3L34 38H14z" />
      <Line d="M24 18v3" />
      <Detail d="M10 41h28" />
    </>
  ),

  // Document control: an open folder of sheets, sealed in gold.
  "folder-open": (
    <>
      <Line d="M8 37V13a2 2 0 0 1 2-2h8.5l3 3.5H36a2 2 0 0 1 2 2V21" />
      <Detail d="M13 21v-4.5h20V21" />
      <Line d="M8 37l5-14.5a2 2 0 0 1 1.9-1.4H41a1.5 1.5 0 0 1 1.4 2L38 36a1.5 1.5 0 0 1-1.4 1H8z" />
      <Detail d="M28 31.5l-1.6 5 2.1-1.1 1.5 1.8M32 31.5l1.6 5-2.1-1.1-1.5 1.8" />
      <Accent d={circle(30, 28, 4.25)} />
    </>
  ),
};
