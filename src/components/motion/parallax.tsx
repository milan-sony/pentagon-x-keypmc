"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Pixels the layer travels across the element's pass through the viewport. Negative moves against the scroll. */
  offset?: number;
  axis?: "x" | "y";
};

/**
 * Scroll-linked drift for backgrounds and watermarks. The movement runs on a
 * Motion value, so scrolling never re-renders React. Static for reduced motion.
 */
export function Parallax({ children, className, offset = 60, axis = "y" }: ParallaxProps) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) {
    return (
      <div data-parallax="static" className={className}>
        {children}
      </div>
    );
  }
  return (
    <ParallaxLayer className={className} offset={offset} axis={axis}>
      {children}
    </ParallaxLayer>
  );
}

function ParallaxLayer({ children, className, offset, axis }: Required<Omit<ParallaxProps, "className">> & { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const shift = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <motion.div
      ref={ref}
      data-parallax="live"
      className={cn("will-change-transform", className)}
      style={axis === "y" ? { y: shift } : { x: shift }}
    >
      {children}
    </motion.div>
  );
}
