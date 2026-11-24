"use client";

import { animate, motion, useInView, useMotionValue, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** Each column holds 0–9 twice, so a digit can roll through a full turn before it lands. */
const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const STEP = 100 / DIGITS.length;
const ease = [0.16, 1, 0.3, 1] as const;

type ColumnProps = { digit: number; play: boolean; reduceMotion: boolean; duration: number };

function DigitColumn({ digit, play, reduceMotion, duration }: ColumnProps) {
  // Starts at the final digit, so server HTML shows the right number.
  const y = useMotionValue(`-${digit * STEP}%`);

  useEffect(() => {
    if (reduceMotion) return;
    // Hide the final digit until the counter scrolls into view.
    y.set("0%");
  }, [reduceMotion, y]);

  useEffect(() => {
    if (!play || reduceMotion) return;
    const controls = animate(y, `-${(10 + digit) * STEP}%`, { duration, ease });
    return () => controls.stop();
  }, [play, reduceMotion, digit, duration, y]);

  return (
    <span data-digit className="inline-block h-[1em] overflow-hidden leading-none">
      <motion.span className="flex flex-col" style={{ y }}>
        {DIGITS.map((d, i) => (
          <span key={i} className="block h-[1em] leading-none">
            {d}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

type OdometerProps = { value: number; pad?: number; className?: string; duration?: number };

/**
 * Antra-style rolling counter. The digits sit at their final positions in the
 * server HTML (so the number is right without JavaScript); on the client they
 * reset out of view and roll one full turn into place when scrolled to.
 */
export function Odometer({ value, pad = 1, className, duration = 2.2 }: OdometerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion() ?? false;
  const digits = String(value).padStart(pad, "0").split("").map(Number);

  return (
    <span className={cn("inline-flex", className)}>
      <span className="sr-only">{value}</span>
      <span ref={ref} aria-hidden="true" className="inline-flex">
        {digits.map((digit, i) => (
          <DigitColumn key={i} digit={digit} play={inView} reduceMotion={reduceMotion} duration={duration + i * 0.25} />
        ))}
      </span>
    </span>
  );
}
