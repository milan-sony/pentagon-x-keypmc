"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MapPin, Menu } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { home } from "@/content/home";
import { cn } from "@/lib/utils";

function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

/** Tracks which section is in view so the matching nav link can be marked current. */
function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

const navIds = home.nav.map((link) => link.href.slice(1));

/**
 * Fixed header that sits transparent over the full-bleed hero and turns solid
 * brown once the page scrolls, as in the Antra template.
 */
export function Header() {
  const scrolled = useScrolled();
  const active = useActiveSection(navIds);
  const [open, setOpen] = useState(false);
  const { contactDetails, cta } = home;

  return (
    <header
      data-scrolled={scrolled}
      className={cn(
        "fixed inset-x-0 top-0 z-40 text-cream transition-[background-color,box-shadow,backdrop-filter] duration-500",
        scrolled ? "bg-brown-950/92 shadow-[0_1px_0_rgb(244_236_221/0.08)] backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div
        className={cn(
          "container-site flex items-center justify-between gap-6 transition-[height] duration-500",
          scrolled ? "h-[4.5rem]" : "h-20 lg:h-24",
        )}
      >
        <Link href="/" aria-label="Key International, back to top" className="shrink-0">
          <Logo tone="reverse" preload />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {home.nav.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "relative px-3.5 py-2 text-[0.95rem] text-cream/80 transition-colors hover:text-cream xl:px-4",
                      "after:absolute after:inset-x-3.5 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold-400 after:transition-transform after:duration-300 hover:after:scale-x-100 xl:after:inset-x-4",
                      isActive && "text-cream after:scale-x-100",
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-3 xl:flex">
            <span className="inline-flex size-10 items-center justify-center rounded-full border border-cream/20">
              <MapPin aria-hidden="true" className="size-4 text-gold-400" />
            </span>
            <div className="text-sm leading-tight">
              <p className="text-cream/60">Our office</p>
              <p className="font-medium">{contactDetails.office[0]}</p>
            </div>
          </div>

          <a
            href={cta.href}
            className="hidden rounded-full bg-gold-500 px-6 py-3 text-sm font-medium text-brown-950 transition-colors hover:bg-gold-400 sm:inline-flex"
          >
            {cta.label}
          </a>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label="Open menu"
              className="inline-flex size-11 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:bg-cream/10 lg:hidden"
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[86%] border-s-0 bg-brown-950 p-0 text-cream sm:max-w-sm [&>button]:text-cream">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex h-full flex-col px-6 pt-6 pb-10">
                <Logo tone="reverse" />
                <nav aria-label="Mobile" className="mt-10">
                  <ul className="flex flex-col">
                    {home.nav.map((link) => (
                      <li key={link.href} className="border-b border-cream/10">
                        <a
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className="block py-4 font-display text-3xl text-cream transition-colors hover:text-gold-200"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
                <a
                  href={cta.href}
                  onClick={() => setOpen(false)}
                  className="mt-auto inline-flex items-center justify-center rounded-full bg-gold-500 px-6 py-3.5 font-medium text-brown-950 transition-colors hover:bg-gold-400"
                >
                  {cta.label}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
