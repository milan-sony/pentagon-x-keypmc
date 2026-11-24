"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { SiteImage } from "@/content/home";

export type Slide = { image: SiteImage; caption: string };

const ease = [0.22, 1, 0.36, 1] as const;
/** How long each slide stays up before the next one opens. */
export const SLIDE_SECONDS = 7;

/** The brand arch the incoming slide opens from: narrow, bottom centre, round-topped. */
const ARCH_CLOSED = "inset(42% 36% 0% 36% round 999px 999px 0px 0px)";
const ARCH_OPEN = "inset(0% 0% 0% 0% round 0px 0px 0px 0px)";

type SlideState = "active" | "entering" | "previous" | "hidden";

/**
 * The stacked slide images. A new slide opens out of the logo's arch over the
 * one before it, which stays beneath until it is covered; the rest are hidden.
 * Only the current slide is exposed to assistive technology.
 */
export function SlideStack({
  slides,
  index,
  previous,
  ready,
}: {
  slides: Slide[];
  index: number;
  /** The slide shown before this one, or null on first load (no reveal). */
  previous: number | null;
  ready: boolean;
}) {
  return (
    <>
      {slides.map((slide, i) => {
        const state: SlideState =
          i === index ? (previous === null ? "active" : "entering") : i === previous ? "previous" : "hidden";
        const current = i === index;
        return (
          <motion.div
            key={slide.image.src}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}: ${slide.caption}`}
            aria-hidden={current ? undefined : true}
            data-state={state}
            className={cn("absolute inset-0", current ? "z-20" : state === "previous" ? "z-10" : "z-0 opacity-0")}
            initial={false}
            animate={state === "entering" ? { clipPath: [ARCH_CLOSED, ARCH_OPEN] } : { clipPath: ARCH_OPEN }}
            transition={state === "entering" ? { duration: 1.6, ease: [0.76, 0, 0.24, 1] } : { duration: 0 }}
          >
            {/* Ken Burns: each slide settles from a slow zoom while it is on screen. */}
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.14 }}
              animate={current && ready ? { scale: [1.14, 1] } : undefined}
              transition={{ duration: SLIDE_SECONDS + 2, ease: "easeOut" }}
            >
              <Image
                src={slide.image.src}
                alt={slide.image.alt}
                fill
                preload={i === 0}
                sizes="100vw"
                quality={70}
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        );
      })}
    </>
  );
}

/**
 * The current slide's sector, above the headline. Each caption slides up into
 * place as its slide opens; the others wait above or below, out of sight.
 */
export function SectorLine({ slides, index, previous }: { slides: Slide[]; index: number; previous: number | null }) {
  return (
    <span className="relative inline-grid overflow-hidden">
      {slides.map((slide, i) => {
        const active = i === index;
        return (
          <motion.span
            key={slide.caption}
            data-sector
            data-active={active}
            aria-hidden={active ? undefined : true}
            className="col-start-1 row-start-1 whitespace-nowrap"
            initial={false}
            animate={active ? { y: "0%", opacity: 1 } : { y: i === previous ? "-110%" : "110%", opacity: 0 }}
            transition={{ duration: 0.9, ease, delay: active ? 0.35 : 0 }}
          >
            {slide.caption}
          </motion.span>
        );
      })}
    </span>
  );
}

/** Preview of the slide that comes next; choosing it moves the slideshow on. */
export function NextSlideThumb({ slide, onClick }: { slide: Slide; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-cursor="view"
      className="group relative hidden w-56 shrink-0 overflow-hidden rounded-3xl text-left sm:block"
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={slide.image.src}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease }}
        >
          <Image
            src={slide.image.src}
            alt=""
            fill
            sizes="14rem"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </motion.div>
      </AnimatePresence>
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-brown-950/80 via-brown-950/10 to-transparent"
      />
      <span className="absolute inset-x-5 bottom-4 block text-cream">
        <span className="block text-xs text-cream/70">Next</span>
        <span className="mt-0.5 block text-sm font-medium">{slide.caption}</span>
      </span>
    </button>
  );
}
