"use client";

import { motion } from "motion/react";
import { useLenis } from "lenis/react";
import { useEffect, useState } from "react";
import { introSkipped, markIntroReady, useIntroReady } from "@/lib/intro";

const ease = [0.22, 1, 0.36, 1] as const;

/** Start lifting once the mark has finished drawing (seconds after mount). */
const EXIT_AT = 1.5;
/**
 * If hydration arrives later than this, the CSS failsafe has already faded the
 * overlay out, so the intro is skipped rather than replayed over the page.
 */
const LATE_HYDRATION_MS = 3000;

/** Paths from the official Key International symbol (03_Symbol, reverse). */
const OUTER_ARCH = "M1.2,156 V62.0 A60.8,60.8 0 0 1 122.8,62.0 V156";
const INNER_ARCH = "M10.2,156 V62.0 A51.8,51.8 0 0 1 113.8,62.0 V156";
const KEYSTONE = "M52.27,-3.08 L71.73,-3.08 L68.92,15.71 L55.08,15.71 Z";
const KEYSTONE_GAP = "M47.61,-6.30 L76.39,-6.30 L71.03,19.14 L52.97,19.14 Z";
const LETTER_K =
  "M39.36 129.27V82.73Q39.28 80.55 37.72 78.99Q36.17 77.44 33.99 77.44H32.89V76.6H56.08V77.44H54.99Q52.8 77.44 51.25 78.99Q49.69 80.55 49.61 82.73V129.27Q49.69 131.45 51.25 133.01Q52.8 134.56 54.99 134.56H56.08V135.4H32.89V134.56H33.99Q36.17 134.56 37.72 133.01Q39.28 131.45 39.36 129.27ZM88.08 76.6V77.36H87.75Q84.97 77.36 82.62 78.45Q80.61 79.37 79.09 80.8L61.2 101.97L82.71 129.94Q84.55 132.21 86.53 133.34Q88.5 134.48 91.11 134.56V135.4H85.31Q84.39 135.4 82.45 135.27Q80.52 135.15 78.13 134.6Q75.73 134.06 73.3 132.8Q70.86 131.54 69.01 129.18Q68.76 128.76 67.46 127.04Q66.16 125.32 64.23 122.84Q62.29 120.36 60.24 117.63Q58.18 114.9 56.37 112.55Q54.57 110.2 53.47 108.69L52.3 107.18L72.21 81.3Q73.21 79.88 72.54 78.62Q71.87 77.36 70.19 77.36H69.35V76.6Z";

/**
 * Intro: the logo's arch draws itself, the keystone settles and the
 * panel lifts to reveal the page. Plays on every load.
 */
export function Preloader() {
  const lenis = useLenis();
  const released = useIntroReady();
  const [exiting, setExiting] = useState(false);
  const [done, setDone] = useState(false);

  // Hold scrolling while the overlay is up.
  useEffect(() => {
    if (!lenis) return;
    if (done || released) lenis.start();
    else lenis.stop();
  }, [lenis, done, released]);

  useEffect(() => {
    if (introSkipped()) return;
    if (performance.now() > LATE_HYDRATION_MS) {
      // Releasing without exiting unmounts the overlay on the next render.
      markIntroReady();
      return;
    }
    const timer = window.setTimeout(() => {
      setExiting(true);
      markIntroReady();
    }, EXIT_AT * 1000);
    return () => window.clearTimeout(timer);
  }, []);

  if (done || (released && !exiting)) return null;

  return (
    <motion.div
      data-preloader
      data-testid="preloader"
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brown-950"
      initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
      animate={exiting ? { clipPath: "inset(0% 0% 100% 0%)" } : undefined}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (exiting) setDone(true);
      }}
    >
      <motion.div
        className="flex flex-col items-center"
        animate={exiting ? { y: -40, opacity: 0 } : undefined}
        transition={{ duration: 0.6, ease }}
      >
        <svg viewBox="0 0 156 188" className="h-28 w-auto overflow-visible sm:h-32">
          <defs>
            <mask id="preloader-gap" maskUnits="userSpaceOnUse" x="-5" y="-10" width="134" height="176">
              <rect x="-5" y="-10" width="134" height="176" fill="#fff" />
              <path d={KEYSTONE_GAP} fill="#000" />
            </mask>
          </defs>
          <g transform="translate(16 16)">
            <g mask="url(#preloader-gap)" fill="none">
              <motion.path
                d={OUTER_ARCH}
                stroke="var(--color-cream)"
                strokeWidth="2.6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease, delay: 0.1 }}
              />
              <motion.path
                d={INNER_ARCH}
                stroke="var(--color-gold-400)"
                strokeWidth="1.2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease, delay: 0.25 }}
              />
            </g>
            <motion.path
              d={KEYSTONE}
              fill="var(--color-gold-400)"
              initial={{ y: -18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.55, ease, delay: 0.85 }}
            />
            <motion.path
              d={LETTER_K}
              fill="var(--color-cream)"
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease, delay: 0.6 }}
            />
          </g>
        </svg>
        <motion.p
          className="mt-6 font-brand text-sm tracking-[0.42em] text-cream/70"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.9 }}
        >
          KEY INTERNATIONAL
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
