import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  /** "colour" for light backgrounds, "reverse" for dark brown backgrounds. */
  tone?: "colour" | "reverse";
  className?: string;
  preload?: boolean;
};

const sources = {
  colour: "/brand/logo-horizontal.svg",
  reverse: "/brand/logo-horizontal-reverse.svg",
} as const;

/**
 * Horizontal Key International logo. The SVG viewBox is trimmed to the artwork
 * (the pack's built-in margin is replaced by layout spacing); the brand minimum
 * width is 160px, so it is never rendered narrower.
 */
export function Logo({ tone = "colour", className, preload }: LogoProps) {
  return (
    <Image
      src={sources[tone]}
      alt="Key International Engineering Projects Management Consultancy"
      width={641}
      height={168}
      preload={preload}
      unoptimized
      className={cn("h-11 w-auto min-w-40 sm:h-12", className)}
    />
  );
}

/** The keystone from the logo's arch, used as a small brand marker. */
export function Keystone({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 20" aria-hidden="true" className={cn("h-2.5 w-3", className)}>
      <path d="M0 0h24l-4 20H4z" fill="currentColor" />
    </svg>
  );
}
