"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

type Tag = "div" | "li" | "section" | "ul" | "ol" | "dl";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Distance in px the content rises from. */
  y?: number;
  as?: Tag;
};

const ease = [0.22, 1, 0.36, 1] as const;

/** Fades and lifts content once as it enters the viewport. */
export function Reveal({ children, className, delay = 0, y = 40, as = "div" }: RevealProps) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </Component>
  );
}

const group: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.12 } },
};

/** Antra's `fade-top`: each item rises 100 px and fades in, one after another. */
const item: Variants = {
  hidden: { opacity: 0, y: 100 },
  shown: { opacity: 1, y: 0, transition: { duration: 1, ease } },
};

type GroupProps = { children: ReactNode; className?: string; as?: Tag; amount?: number };

/** Triggers its `RevealItem` children in sequence when the group scrolls into view. */
export function RevealGroup({ children, className, as = "div", amount = 0.15 }: GroupProps) {
  const Component = motion[as];
  return (
    <Component className={className} variants={group} initial="hidden" whileInView="shown" viewport={{ once: true, amount }}>
      {children}
    </Component>
  );
}

export function RevealItem({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: Tag }) {
  const Component = motion[as];
  return (
    <Component className={className} variants={item}>
      {children}
    </Component>
  );
}
