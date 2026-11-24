import type { ReactNode } from "react";
import type { Heading } from "@/content/home";
import { cn } from "@/lib/utils";

type Tone = "light" | "dark";

/** Small rounded label with a gold dot, used above section headings. */
export function SectionLabel({ children, tone = "light", className }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[0.8rem] font-medium",
        tone === "dark" ? "border-cream/20 text-cream/85" : "border-brown-950/12 bg-white text-brown-700",
        className,
      )}
    >
      <span aria-hidden="true" className={cn("size-1.5 rounded-full", tone === "dark" ? "bg-gold-400" : "bg-gold-500")} />
      {children}
    </p>
  );
}

/**
 * Headline in two tones. The accent uses gold-700 on light backgrounds
 * (gold-500 fails contrast there) and gold-400 on dark.
 */
export function TwoToneHeading({
  heading,
  id,
  tone = "light",
  as: Tag = "h2",
  className,
}: {
  heading: Heading;
  id?: string;
  tone?: Tone;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <Tag
      id={id}
      className={cn(
        "text-[2.6rem] leading-[1.02] font-medium tracking-[-0.015em] sm:text-6xl lg:text-[4.2rem]",
        tone === "dark" ? "text-cream" : "text-brown-950",
        className,
      )}
    >
      {heading.start}{" "}
      <span className={tone === "dark" ? "text-gold-400" : "text-gold-700"}>{heading.accent}</span>
    </Tag>
  );
}

/**
 * Antra-style section header: the label sits in a narrow left column beside a
 * hairline, and the heading and lead take the wider right column.
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
      <div className="relative lg:col-span-4">
        <SectionLabel tone={tone}>{label}</SectionLabel>
        <span
          aria-hidden="true"
          className={cn(
            "absolute top-1/2 right-0 left-40 hidden h-px lg:block",
            tone === "dark" ? "bg-cream/10" : "bg-brown-950/10",
          )}
        />
      </div>
      <div className="lg:col-span-8">
        <TwoToneHeading id={id} heading={heading} tone={tone} />
        {lead ? (
          <p className={cn("mt-6 max-w-2xl text-lg leading-relaxed", tone === "dark" ? "text-cream/70" : "text-brown-600")}>
            {lead}
          </p>
        ) : null}
        {aside}
      </div>
    </div>
  );
}
