"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeader } from "@/components/ui/heading";
import { home } from "@/content/home";
import { cn } from "@/lib/utils";

/** Antra's "meet the team" list, used for KeyPMC's advantages: each row reveals its photo. */
export function Advantages() {
  const { advantages, images } = home;
  const [active, setActive] = useState(0);
  const preview = images[advantages.items[active].image];

  return (
    <section id="why" aria-labelledby="why-title" className="bg-white py-24 lg:py-32">
      <div className="container-site">
        <Reveal>
          <SplitHeader id="why-title" label={advantages.label} heading={advantages.title} />
        </Reveal>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-14">
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28 aspect-[4/5] overflow-hidden rounded-3xl bg-sand">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={preview.src}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image src={preview.src} alt={preview.alt} fill sizes="38vw" className="object-cover" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <ol className="border-t border-brown-950/10 lg:col-span-7">
            {advantages.items.map((item, i) => (
              <li
                key={item.title}
                onMouseEnter={() => setActive(i)}
                className="grid grid-cols-[auto_1fr_auto] gap-x-4 border-b border-brown-950/10 py-6 sm:gap-x-6 lg:py-7"
              >
                <span className="w-7 pt-2 font-brand text-sm text-brown-500">{String(i + 1).padStart(2, "0")}</span>
                <div className="grid gap-1.5 xl:grid-cols-[minmax(0,1fr)_minmax(0,15rem)] xl:items-baseline xl:gap-8">
                  <h3
                    className={cn(
                      "text-[1.7rem] leading-tight font-medium transition-colors duration-300 sm:text-[2rem]",
                      active === i ? "text-gold-700" : "text-brown-950",
                    )}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[0.95rem] leading-relaxed text-brown-600">{item.description}</p>
                </div>
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-1 inline-flex size-10 items-center justify-center rounded-full transition-all duration-300",
                    active === i ? "rotate-45 bg-brown-950 text-gold-400" : "text-brown-700",
                  )}
                >
                  <ArrowUpRight className="size-4" />
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
