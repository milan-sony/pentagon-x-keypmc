"use client";

import { motion, type Variants } from "motion/react";
import { Fragment } from "react";
import { cn } from "@/lib/utils";

export type TextPart = { text: string; className?: string };
type Variant = "rotate-in" | "slide-up" | "chars";

const ease = [0.22, 1, 0.36, 1] as const;

const container = (stagger: number): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger } },
});

const pieces: Record<Variant, Variants> = {
  // Antra's default heading effect: words tip forward from below the line.
  "rotate-in": {
    hidden: { opacity: 0, rotateX: -80, y: "35%" },
    show: {
      opacity: 1,
      rotateX: 0,
      y: "0%",
      transition: { duration: 0.9, ease },
    },
  },
  "slide-up": {
    hidden: { y: "105%" },
    show: { y: "0%", transition: { duration: 0.9, ease } },
  },
  // The hero: letters slide in from the right, one after another.
  chars: {
    hidden: { opacity: 0, x: 50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.8, ease } },
  },
};

type SplitTextProps = {
  parts: TextPart[];
  as?: "h1" | "h2" | "h3" | "p";
  id?: string;
  className?: string;
  variant?: Variant;
  /** Plays on scroll by default; pass a boolean to drive it from outside (for example, the hero). */
  play?: boolean;
};

/**
 * Splits a heading into words that animate in as it scrolls into view. The
 * whole phrase stays the element's accessible name; the word pieces are hidden
 * from assistive technology so it is not read word by word.
 */
export function SplitText({ parts, as = "h2", id, className, variant = "rotate-in", play }: SplitTextProps) {
  const Tag = motion[as];
  const label = parts.map((p) => p.text).join(" ");
  const trigger =
    play === undefined
      ? {
          initial: "hidden",
          whileInView: "show",
          viewport: { once: true, amount: 0.5 },
        }
      : { initial: "hidden", animate: play ? "show" : "hidden" };

  return (
    <Tag
      id={id}
      aria-label={label}
      className={className}
      variants={container(variant === "chars" ? 0.025 : 0.045)}
      data-cursor="grow"
      {...trigger}
    >
      <span aria-hidden="true">
        {parts.map((part, p) => (
          <span key={p} className={part.className}>
            {part.text.split(" ").map((word, w) => (
              <Fragment key={`${p}-${w}`}>
                <span
                  className={cn(
                    "inline-block pb-[0.08em] align-bottom",
                    variant === "slide-up" && "overflow-hidden",
                    variant === "rotate-in" && "[perspective:600px]",
                    variant === "chars" && "whitespace-nowrap",
                  )}
                >
                  {variant === "chars" ? (
                    Array.from(word).map((char, c) => (
                      <motion.span key={c} data-char className="inline-block" variants={pieces.chars}>
                        {char}
                      </motion.span>
                    ))
                  ) : (
                    <motion.span className="inline-block origin-[50%_0%]" variants={pieces[variant]}>
                      {word}
                    </motion.span>
                  )}
                </span>
                {/* The space sits between the inline-blocks: inside one it would collapse. */}{" "}
              </Fragment>
            ))}
          </span>
        ))}
      </span>
    </Tag>
  );
}
