import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type PillButtonProps = {
  href: string;
  children: string;
  /** "light" sits on dark backgrounds, "dark" on light ones, "gold" is the primary fill. */
  variant?: "light" | "dark" | "gold";
  className?: string;
  onClick?: () => void;
};

const variants = {
  light: "border border-cream/35 text-cream hover:border-cream/70",
  dark: "bg-brown-950 text-cream hover:bg-brown-700",
  gold: "bg-gold-500 text-brown-950 hover:bg-gold-400",
} as const;

const circle = {
  light: "bg-gold-500 text-brown-950",
  dark: "bg-gold-500 text-brown-950",
  gold: "bg-brown-950 text-gold-400",
} as const;

/** Rounded link button with a circular arrow badge, as in the Antra template. */
export function PillButton({ href, children, variant = "light", className, onClick }: PillButtonProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "group inline-flex items-center gap-3 rounded-full py-2 ps-6 pe-2 font-medium transition-colors duration-300",
        variants[variant],
        className,
      )}
    >
      {children}
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex size-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-45",
          circle[variant],
        )}
      >
        <ArrowUpRight className="size-4" />
      </span>
    </a>
  );
}
