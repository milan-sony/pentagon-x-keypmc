"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { PointerEvent } from "react";
import { ArchBadge } from "@/components/brand/arch-badge";
import { Icon } from "@/components/ui/icon";
import type { Feature, SiteImage } from "@/content/home";

type DivisionCardProps = { division: Feature; image: SiteImage; number: string; href: string };

/** Moves the card's gold spotlight to the pointer through CSS variables, without re-rendering. */
function trackPointer(event: PointerEvent<HTMLElement>) {
  const card = event.currentTarget;
  const bounds = card.getBoundingClientRect();
  card.style.setProperty("--spot-x", `${event.clientX - bounds.left}px`);
  card.style.setProperty("--spot-y", `${event.clientY - bounds.top}px`);
}

/**
 * A capability card. On hover or keyboard focus a deep-brown panel rises
 * through it with a faint photo, the text turns cream, the arch draws in gold
 * and an arrow replaces the number.
 */
export function DivisionCard({ division, image, number, href }: DivisionCardProps) {
  return (
    <a
      href={href}
      onPointerMove={trackPointer}
      className="group relative isolate flex h-full min-h-[17rem] flex-col sm:min-h-[22rem] overflow-hidden rounded-3xl border border-brown-950/8 bg-white p-7 transition-[border-color,box-shadow] duration-500 hover:border-transparent hover:shadow-[0_28px_60px_-30px_rgb(46_26_15/0.6)] focus-visible:border-transparent"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-brown-950 transition-[clip-path] duration-700 ease-portal [clip-path:inset(100%_0_0_0)] group-hover:[clip-path:inset(0)] group-focus-visible:[clip-path:inset(0)]"
      >
        <Image
          src={image.src}
          alt=""
          fill
          // Clipped to nothing until hover, so the lazy loader would never fetch it in time.
          loading="eager"
          sizes="(min-width: 1024px) 20rem, (min-width: 640px) 50vw, 100vw"
          className="scale-110 object-cover opacity-0 mix-blend-luminosity transition-[opacity,transform] duration-1000 ease-portal group-hover:scale-100 group-hover:opacity-25 group-focus-visible:scale-100 group-focus-visible:opacity-25"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-brown-950 via-brown-950/70 to-brown-950/20" />
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(18rem_circle_at_var(--spot-x,50%)_var(--spot-y,30%),rgb(201_160_76/0.28),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="flex items-start justify-between gap-4">
        <ArchBadge>
          <Icon name={division.icon} className="size-6" />
        </ArchBadge>
        <span aria-hidden="true" className="relative grid size-12 place-items-center">
          <span className="font-brand text-5xl leading-none text-brown-950/[0.08] transition-[opacity,transform] duration-500 group-hover:-translate-y-3 group-hover:opacity-0 group-focus-visible:opacity-0">
            {number}
          </span>
          <span className="absolute inset-0 grid scale-50 place-items-center rounded-full bg-gold-500 text-brown-950 opacity-0 transition-[opacity,transform] duration-500 ease-portal group-hover:scale-100 group-hover:rotate-45 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100">
            <ArrowUpRight className="size-5 -rotate-45" />
          </span>
        </span>
      </div>

      <span aria-hidden="true" className="min-h-10 flex-1" />

      <h3 className="text-[1.65rem] leading-[1.1] font-medium text-brown-950 transition-colors duration-500 group-hover:text-cream group-focus-visible:text-cream">
        {division.title}
      </h3>
      <p className="mt-4 border-t border-brown-950/8 pt-5 leading-relaxed lg:min-h-[8.5rem] text-brown-600 transition-colors duration-500 group-hover:border-cream/15 group-hover:text-cream/75 group-focus-visible:border-cream/15 group-focus-visible:text-cream/75">
        {division.description}
      </p>
    </a>
  );
}
