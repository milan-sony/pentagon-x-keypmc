# Key International (KeyPMC) website

Corporate website for Key International Engineering Projects Management Consultancy L.L.C S.P.C, an Abu Dhabi project management consultancy and member of United National Holding.

This phase delivers the **English homepage**. Its layout follows the Qleviq "IT Consult" template, restyled in the brand's brown and gold.

## Stack

- Next.js 16 (App Router, Turbopack) with TypeScript
- Tailwind CSS v4 and shadcn/ui (Radix base, RTL-ready for the Arabic version)
- Motion for animation, Lenis for smooth scrolling, lucide-react for icons
- Vitest with Testing Library (unit tests) and Playwright (end-to-end tests)

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

To set the domain used in social preview links, copy `.env.example` to `.env.local` and change the value there.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` / `npm start` | Production build and server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript without emitting |
| `npm test` | Unit and component tests (Vitest) |
| `npm run test:e2e` | Playwright at 375, 768, 1024 and 1440 px (run `npm run build` first) |

The first time you run Playwright, install its browser with `npx playwright install chromium`.

## Where things live

```
src/content/home.ts      All homepage copy, stats, services and projects. Edit text here.
src/app/                 Layout, fonts, metadata, favicon and Open Graph image
src/components/layout/   Top bar, header (with mobile menu) and footer
src/components/sections/ One file per homepage section
src/components/motion/   Reveal and CountUp animation helpers (respect reduced motion)
public/brand/            Logos from the official logo pack (viewBox trimmed to the artwork)
public/images/           Photography; see CREDITS.md
tests/unit, tests/e2e    Vitest and Playwright tests
```

## Brand

| Colour | Hex | Use |
|---|---|---|
| Dark brown | `#2E1A0F` | Hero panel, dark sections, footer |
| Brown | `#5C3A21` | Text accents |
| Gold | `#B8913F` | Buttons, rules, icons (not small text on light backgrounds, which fails contrast) |
| Light gold | `#C9A04C` | Gold on dark backgrounds |
| Cream | `#F4ECDD` | Section panels |
| Ivory | `#FBF8F2` | Page background |

The fonts are Cormorant Garamond for headings, Inter for body text and Cinzel (the logo's typeface) for numerals. All three are self-hosted through `next/font`.

## Before go-live

- **Enquiry form.** It validates input but does not send anything yet. To connect it, add a delivery target, such as an API route with an email service, in `src/components/sections/enquiry-form.tsx` (marked `TODO(go-live)`).
- **Phone and email.** These are `null` in `src/content/home.ts`. Once you add them, they appear automatically in the contact section.
- **Portfolio counts.** The figures are as at October 2026. Confirm them with KeyPMC.
- **Photography.** The current photos are Unsplash placeholders. Replace them with KeyPMC's own project photos, and keep client names and project values out of the site.
