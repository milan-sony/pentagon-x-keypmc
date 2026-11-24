"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Pause, Play } from "lucide-react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import type { SiteImage } from "@/content/home";

export type Slide = { image: SiteImage; caption: string };

const ease = [0.22, 1, 0.36, 1] as const;
/** How long each slide stays up while the slideshow plays. */
export const SLIDE_SECONDS = 6;

export const slideNumber = (i: number) => String(i + 1).padStart(2, "0");

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

type ControlsProps = {
  slides: Slide[];
  index: number;
  paused: boolean;
  playing: boolean;
  onSelect: (i: number) => void;
  onAdvance: () => void;
  onTogglePlay: () => void;
  onHold: (held: boolean) => void;
};

/**
 * Antra's numbered progress bars. The active bar's fill is a CSS animation
 * whose end moves the slideshow on, so pausing the bar pauses the slides.
 */
export function SlideControls({ slides, index, paused, playing, onSelect, onAdvance, onTogglePlay, onHold }: ControlsProps) {
  return (
    <div
      className="flex items-center gap-5 sm:gap-7"
      onPointerEnter={() => onHold(true)}
      onPointerLeave={() => onHold(false)}
      onFocus={() => onHold(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) onHold(false);
      }}
    >
      <ol className="flex items-center gap-3 sm:gap-5">
        {slides.map((slide, i) => {
          const active = i === index;
          return (
            <li key={slide.image.src}>
              <button
                type="button"
                aria-label={`Show slide ${slideNumber(i)}: ${slide.caption}`}
                aria-current={active ? "true" : undefined}
                onClick={() => onSelect(i)}
                className="group flex items-center gap-2.5 py-3 text-xs font-medium tracking-wide text-cream/60 transition-colors hover:text-cream aria-[current=true]:text-cream"
              >
                <span aria-hidden="true">{slideNumber(i)}</span>
                <span aria-hidden="true" className="relative h-px w-8 overflow-hidden bg-cream/25 sm:w-16 lg:w-20">
                  {active ? (
                    <span
                      key={index}
                      data-progress-active
                      data-paused={String(paused)}
                      onAnimationEnd={onAdvance}
                      className="slide-progress absolute inset-0 bg-gold-400"
                      style={{ "--slide-duration": `${SLIDE_SECONDS}s` } as CSSProperties}
                    />
                  ) : (
                    <span className={cn("absolute inset-0 bg-cream/70", i < index ? "scale-x-100" : "scale-x-0")} />
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <button
        type="button"
        onClick={onTogglePlay}
        aria-label={playing ? "Pause slideshow" : "Play slideshow"}
        className="grid size-10 shrink-0 place-items-center rounded-full border border-cream/25 text-cream transition-colors hover:border-gold-400 hover:text-gold-200"
      >
        {playing ? <Pause aria-hidden="true" className="size-3.5" /> : <Play aria-hidden="true" className="size-3.5" />}
      </button>

      <div className="relative hidden h-5 min-w-48 overflow-hidden text-sm text-cream/85 md:block">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.p
            key={index}
            className="absolute inset-0"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-110%" }}
            transition={{ duration: 0.7, ease }}
          >
            {slides[index].caption}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
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
      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-brown-950/80 via-brown-950/10 to-transparent" />
      <span className="absolute inset-x-5 bottom-4 block text-cream">
        <span className="block text-xs text-cream/70">Next</span>
        <span className="mt-0.5 block text-sm font-medium">{slide.caption}</span>
      </span>
    </button>
  );
}
