"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const ease = [0.77, 0, 0.18, 1] as const;

type ImageRevealProps = {
  children: ReactNode;
  className?: string;
  /** Which way the overlay wipes off. */
  from?: "left" | "bottom";
  delay?: number;
};

/**
 * Antra's image reveal: a brown panel edged in gold wipes away while the
 * photo settles from a slight zoom. The wrapper must sit inside a sized,
 * positioned frame (the image usually fills it with `fill`).
 */
export function ImageReveal({ children, className, from = "left", delay = 0 }: ImageRevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={cn("relative size-full overflow-hidden", className)}>{children}</div>;
  }

  const horizontal = from === "left";
  return (
    <motion.div
      className={cn("relative size-full overflow-hidden", className)}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div
        className="size-full"
        variants={{ hidden: { scale: 1.3 }, shown: { scale: 1 } }}
        transition={{ duration: 1.6, ease, delay }}
      >
        {children}
      </motion.div>
      <motion.div
        data-reveal-overlay
        aria-hidden="true"
        className={cn(
          "absolute inset-0 bg-brown-900",
          horizontal ? "origin-right border-l-2" : "origin-top border-b-2",
          "border-gold-400",
        )}
        variants={
          horizontal ? { hidden: { scaleX: 1 }, shown: { scaleX: 0 } } : { hidden: { scaleY: 1 }, shown: { scaleY: 0 } }
        }
        transition={{ duration: 1.1, ease, delay }}
      />
    </motion.div>
  );
}
