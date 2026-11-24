"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Distance in px the content rises from. Kept small so motion stays quiet. */
  y?: number;
  as?: "div" | "li" | "section";
};

const ease = [0.22, 1, 0.36, 1] as const;

/** Fades and lifts content once as it enters the viewport. */
export function Reveal({ children, className, delay = 0, y = 20, as = "div" }: RevealProps) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </Component>
  );
}
