import { Keystone } from "@/components/brand/logo";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  id?: string;
  label: string;
  title: string;
  lead?: string;
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeading({ id, label, title, lead, tone = "light", className }: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div className={cn("max-w-2xl", className)}>
      <p
        className={cn(
          "flex items-center gap-2 text-sm font-medium",
          dark ? "text-gold-200" : "text-brown-700",
        )}
      >
        <Keystone className={dark ? "text-gold-400" : "text-gold-500"} />
        {label}
      </p>
      <h2
        id={id}
        className={cn(
          "mt-4 text-4xl leading-[1.08] font-medium tracking-[-0.01em] sm:text-5xl",
          dark ? "text-cream" : "text-brown-950",
        )}
      >
        {title}
      </h2>
      {lead ? (
        <p className={cn("mt-5 text-lg leading-relaxed", dark ? "text-cream/75" : "text-brown-600")}>
          {lead}
        </p>
      ) : null}
    </div>
  );
}
