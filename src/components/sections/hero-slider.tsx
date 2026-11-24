"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { SiteImage } from "@/content/home";

export type Slide = { image: SiteImage; caption: string };

const ease = [0.22, 1, 0.36, 1] as const;
/** How long each slide stays up before the next one opens. */
export const SLIDE_SECONDS = 7;

/**
 * The stacked, cross-fading slide images. Only the active slide is exposed to
 * assistive technology; the rest are hidden until chosen.
 */
export function SlideStack({ slides, index, ready }: { slides: Slide[]; index: number; ready: boolean }) {
  return (
    <>
      {slides.map((slide, i) => {
        const active = i === index;
        return (
          <div
            key={slide.image.src}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}: ${slide.caption}`}
            aria-hidden={active ? undefined : true}
            className={cn(
              "absolute inset-0 transition-opacity duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
              active ? "opacity-100" : "opacity-0",
            )}
          >
            {/* Ken Burns: each slide settles from a slow zoom while it is on screen. */}
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.14 }}
              animate={active && ready ? { scale: [1.14, 1] } : undefined}
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
          </div>
        );
      })}
    </>
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
