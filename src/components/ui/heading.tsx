import type { ReactNode } from "react";
import { ARCH } from "@/components/brand/arch-geometry";
import { SplitText } from "@/components/motion/split-heading";
import type { Heading } from "@/content/home";
import { cn } from "@/lib/utils";

type Tone = "light" | "dark";

/**
 * Section marker: the logo's gold keystone, the label, and a fine gold line
 * running toward the heading. Centred labels get a line on both sides.
 */
export function SectionLabel({
  children,
  tone = "light",
  align = "start",
  line = "short",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  align?: "start" | "center";
  /** `fill` runs the line across the rest of the row, as in the split headers. */
  line?: "short" | "fill";
  className?: string;
}) {
  const rule = cn("h-px shrink-0", tone === "dark" ? "bg-gold-400/45" : "bg-gold-500/55");
  return (
    <p
      data-section-label
      className={cn(
        "flex items-center gap-3 text-[0.85rem] font-medium tracking-wide",
        align === "center" && "justify-center",
        tone === "dark" ? "text-cream/85" : "text-brown-700",
        className,
      )}
    >
      {align === "center" ? <span data-label-line aria-hidden="true" className={cn(rule, "w-10")} /> : null}
      <svg
        data-keystone
        aria-hidden="true"
        viewBox="52 -3.5 20 19.5"
        className={cn("size-3 shrink-0", tone === "dark" ? "fill-gold-400" : "fill-gold-500")}
      >
        <path d={ARCH.keystone} />
      </svg>
      <span>{children}</span>
      <span data-label-line aria-hidden="true" className={cn(rule, line === "fill" ? "flex-1" : "w-10")} />
    </p>
  );
}

/**
 * Headline in two tones, revealed word by word as it scrolls into view. The
 * accent uses gold-700 on light backgrounds (gold-500 fails contrast there)
 * and gold-400 on dark.
 */
export function TwoToneHeading({
  heading,
  id,
  tone = "light",
  as: tag = "h2",
  className,
}: {
  heading: Heading;
  id?: string;
  tone?: Tone;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <SplitText
      as={tag}
      id={id}
      parts={[
        { text: heading.start },
        { text: heading.accent, className: tone === "dark" ? "text-gold-400" : "text-gold-700" },
      ]}
      className={cn(
        "text-[2.6rem] leading-[1.02] font-medium tracking-[-0.015em] sm:text-6xl lg:text-[4.2rem]",
        tone === "dark" ? "text-cream" : "text-brown-950",
        className,
      )}
    />
  );
}

/**
 * Antra-style section header: the label and its line run across a narrow left
 * column, and the heading and lead take the wider right column.
 */
export function SplitHeader({
  id,
  label,
  heading,
  lead,
  aside,
  tone = "light",
  className,
}: {
  id: string;
  label: string;
  heading: Heading;
  lead?: string;
  aside?: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-6 lg:grid-cols-12 lg:gap-10", className)}>
      <div className="lg:col-span-4 lg:pt-4">
        <SectionLabel tone={tone} line="fill">
          {label}
        </SectionLabel>
      </div>
      <div className="lg:col-span-8">
        <TwoToneHeading id={id} heading={heading} tone={tone} />
        {lead ? (
          <p
            className={cn(
              "mt-6 max-w-2xl text-lg leading-relaxed",
              tone === "dark" ? "text-cream/70" : "text-brown-600",
            )}
          >
            {lead}
          </p>
        ) : null}
        {aside}
      </div>
    </div>
  );
}
