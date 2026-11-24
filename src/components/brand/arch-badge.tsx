import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ARCH } from "./arch-geometry";

/**
 * An icon framed by the brand arch and keystone. Inside a `group`, hovering or
 * focusing the group draws the arch over in gold and lifts the icon. Pure CSS,
 * so it costs nothing until it is used.
 */
export function ArchBadge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span data-arch-badge aria-hidden="true" className={cn("relative block h-24 w-[4.75rem] shrink-0", className)}>
      <svg viewBox={ARCH.viewBox} fill="none" className="absolute inset-0 size-full overflow-visible">
        <path
          d={ARCH.outer}
          vectorEffect="non-scaling-stroke"
          className="stroke-brown-950/15 transition-[stroke] duration-500 group-hover:stroke-cream/20 group-focus-visible:stroke-cream/20"
        />
        <path
          d={ARCH.inner}
          vectorEffect="non-scaling-stroke"
          className="stroke-brown-950/10 transition-[stroke] duration-500 group-hover:stroke-cream/10 group-focus-visible:stroke-cream/10"
        />
        {/* The gold arch draws itself from both springs up to the keystone. */}
        <path
          d={ARCH.outer}
          pathLength={1}
          vectorEffect="non-scaling-stroke"
          strokeWidth={1.5}
          className="stroke-gold-400 [stroke-dasharray:1] [stroke-dashoffset:1] transition-[stroke-dashoffset] duration-[1100ms] ease-portal group-hover:[stroke-dashoffset:0] group-focus-visible:[stroke-dashoffset:0]"
        />
        <path d={ARCH.keystone} className="fill-gold-500" />
      </svg>
      <span className="absolute inset-x-0 top-[31%] flex justify-center text-brown-700 transition-[transform,color] duration-500 ease-portal group-hover:-translate-y-1.5 group-hover:text-cream group-focus-visible:-translate-y-1.5 group-focus-visible:text-cream">
        {children}
      </span>
    </span>
  );
}
