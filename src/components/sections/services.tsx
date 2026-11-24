"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeader } from "@/components/ui/heading";
import { Icon } from "@/components/ui/icon";
import { home } from "@/content/home";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/** Antra's numbered service rows beside an image whose caption follows the row in focus. */
export function Services() {
  const { services, images } = home;
  const [active, setActive] = useState(0);
  const current = services.items[active];
  const preview = images[current.image];
  const specialistImage = images[services.specialist.image];

  return (
    <section id="services" aria-labelledby="services-title" className="bg-white py-24 lg:py-32">
      <div className="container-site">
        <Reveal>
          <SplitHeader id="services-title" label={services.label} heading={services.title} lead={services.lead} />
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
                  transition={{ duration: 0.7, ease }}
                >
                  <Image src={preview.src} alt={preview.alt} fill sizes="38vw" className="object-cover" />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-cream/15 bg-brown-950/55 p-5 text-cream backdrop-blur-md">
                <AnimatePresence initial={false} mode="wait">
                  <motion.p
                    key={current.title}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                    className="leading-relaxed text-cream/90"
                  >
                    {current.description}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ol className="border-t border-brown-950/10">
              {services.items.map((service, i) => (
                <li
                  key={service.title}
                  onMouseEnter={() => setActive(i)}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-4 border-b border-brown-950/10 py-6 sm:gap-x-6 lg:py-7"
                >
                  <span className="w-7 font-brand text-sm text-brown-500">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3
                      className={cn(
                        "text-[1.7rem] leading-tight font-medium transition-colors duration-300 sm:text-[2.1rem]",
                        active === i ? "text-gold-700" : "text-brown-950",
                      )}
                    >
                      {service.title}
                    </h3>
                    <p className="mt-1.5 max-w-lg leading-relaxed text-brown-600 lg:hidden">{service.description}</p>
                  </div>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "inline-flex size-11 items-center justify-center rounded-full border transition-all duration-300",
                      active === i
                        ? "rotate-45 border-gold-500 bg-gold-500 text-brown-950"
                        : "border-brown-950/15 text-brown-700",
                    )}
                  >
                    <ArrowUpRight className="size-4" />
                  </span>
                </li>
              ))}
            </ol>

            <aside className="mt-10 grid overflow-hidden rounded-3xl bg-brown-950 text-cream sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
              <div className="relative aspect-[16/9] sm:aspect-auto sm:min-h-52">
                <Image src={specialistImage.src} alt={specialistImage.alt} fill sizes="(min-width: 640px) 25vw, 100vw" className="object-cover" />
              </div>
              <div className="flex items-start gap-4 p-7">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-gold-500 text-brown-950">
                  <Icon name={services.specialist.icon} className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-medium text-gold-200">Specialist licensed service</p>
                  <h3 className="mt-1.5 text-[1.9rem] leading-tight font-medium">{services.specialist.title}</h3>
                  <p className="mt-2 leading-relaxed text-cream/70">{services.specialist.description}</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
