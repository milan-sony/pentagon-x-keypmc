"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type CountUpProps = { value: number; className?: string; pad?: number };

/**
 * Counts up to `value` the first time it scrolls into view. The final value is
 * rendered on the server, so the number is correct without JavaScript.
 */
export function CountUp({ value, className, pad = 1 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const armed = useRef(false);

  useEffect(() => {
    if (reduceMotion || armed.current) return;
    armed.current = true;
    // Reset to zero before the counter is visible, then count up on entry.
    setDisplay(0);
  }, [reduceMotion]);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, value]);

  return (
    <span ref={ref} className={className}>
      {String(display).padStart(pad, "0")}
    </span>
  );
}
