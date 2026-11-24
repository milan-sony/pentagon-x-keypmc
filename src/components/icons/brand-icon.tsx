import { cn } from "@/lib/utils";
import { glyphs, type GlyphKey } from "./glyphs";

type BrandIconProps = {
  name: GlyphKey;
  /** `lg` (about 32 px) keeps every line; `sm` (18–20 px) drops the detail lines. */
  size?: "sm" | "lg";
  /** Redraws the lines when a surrounding `group` is hovered or focused. */
  animate?: boolean;
  className?: string;
};

/** A hand-drawn Key International icon. Decorative: pair it with visible text. */
export function BrandIcon({ name, size = "lg", animate = false, className }: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
      data-size={size}
      data-animate={animate}
      className={cn("brand-icon", className)}
    >
      {glyphs[name]}
    </svg>
  );
}
