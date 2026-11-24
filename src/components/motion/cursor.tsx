"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

type Mode = "default" | "grow" | "view";

const FINE_POINTER = "(pointer: fine) and (hover: hover)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(FINE_POINTER);
  query.addEventListener?.("change", onChange);
  return () => query.removeEventListener?.("change", onChange);
}

/** True only on devices with a precise, hovering pointer (a mouse or trackpad). */
function useFinePointer() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(FINE_POINTER).matches,
    () => false,
  );
}

/**
 * Antra's trailing cursor: a small gold dot that follows the pointer, grows and
 * inverts over headings (`data-cursor="grow"`) and becomes a "View" bubble over
 * imagery (`data-cursor="view"`). The native cursor stays visible underneath.
 * Not rendered on touch devices or for reduced-motion visitors.
 */
export function Cursor() {
  const finePointer = useFinePointer();
  const reduceMotion = useReducedMotion();
  if (!finePointer || reduceMotion) return null;
  return <CursorFollower />;
}

function CursorFollower() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 520, damping: 40, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 520, damping: 40, mass: 0.6 });
  const [mode, setMode] = useState<Mode>("default");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      const target = (event.target as Element | null)?.closest?.("[data-cursor]");
      setMode((target?.getAttribute("data-cursor") as Mode | null) ?? "default");
    };
    const onLeave = () => setVisible(false);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [x, y]);

  return (
    <motion.div
      data-cursor-root
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed top-0 left-0 z-[90] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-[width,height,background-color,opacity] duration-300 ease-out",
        mode === "default" && "size-3 bg-gold-500",
        mode === "grow" && "size-20 bg-cream mix-blend-difference",
        mode === "view" && "size-24 bg-brown-950/85 backdrop-blur-sm",
        visible ? "opacity-100" : "opacity-0",
      )}
      style={{ x: springX, y: springY }}
    >
      <span
        className={cn(
          "text-sm font-medium text-cream transition-opacity duration-200",
          mode === "view" ? "opacity-100" : "opacity-0",
        )}
      >
        View
      </span>
    </motion.div>
  );
}
