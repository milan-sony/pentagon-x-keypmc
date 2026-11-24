"use client";

import { motion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * The footer's giant decorative wordmark, rising letter by letter out of the
 * page edge as it comes into view. Hidden from assistive technology: the name
 * is already given by the logo and legal line.
 */
export function WordmarkReveal({ text, className }: { text: string; className?: string }) {
  return (
    <motion.p
      aria-hidden="true"
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.4 }}
      variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.05 } } }}
    >
      {Array.from(text).map((char, i) => (
        <motion.span
          key={i}
          className="inline-block whitespace-pre"
          variants={{ hidden: { y: "70%", opacity: 0 }, shown: { y: "0%", opacity: 1 } }}
          transition={{ duration: 1.1, ease }}
        >
          {char}
        </motion.span>
      ))}
    </motion.p>
  );
}
