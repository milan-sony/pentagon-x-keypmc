"use client";

import { motion } from "motion/react";
import { useId } from "react";
import { cn } from "@/lib/utils";
import { ARCH } from "./arch-geometry";

const draw = [0.65, 0, 0.35, 1] as const;

/**
 * The brand arch as a large outline that draws itself in, used as a hero
 * backdrop. Decorative only.
 */
export function ArchOutline({ play, className }: { play: boolean; className?: string }) {
  const mask = useId();
  return (
    <svg viewBox={ARCH.viewBox} fill="none" aria-hidden="true" className={cn("overflow-visible", className)}>
      <defs>
        <mask id={mask} maskUnits="userSpaceOnUse" x="-8" y="-12" width="140" height="176">
          <rect x="-8" y="-12" width="140" height="176" fill="#fff" />
          <path d={ARCH.keystoneGap} fill="#000" />
        </mask>
      </defs>
      <g mask={`url(#${mask})`}>
        <motion.path
          d={ARCH.outer}
          stroke="currentColor"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={play ? { pathLength: 1 } : undefined}
          transition={{ duration: 2.6, ease: draw, delay: 0.4 }}
        />
        <motion.path
          d={ARCH.inner}
          stroke="currentColor"
          strokeOpacity={0.55}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={play ? { pathLength: 1 } : undefined}
          transition={{ duration: 2.6, ease: draw, delay: 0.7 }}
        />
      </g>
      <motion.path
        d={ARCH.keystone}
        stroke="currentColor"
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
        initial={{ opacity: 0, y: -6 }}
        animate={play ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.9, ease: draw, delay: 2.2 }}
      />
    </svg>
  );
}
