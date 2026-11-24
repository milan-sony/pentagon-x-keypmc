"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { home } from "@/content/home";
import { cn } from "@/lib/utils";

export function Services() {
  const { services, images } = home;
  const [active, setActive] = useState(0);
  const preview = images[services.items[active].image];
  const specialistImage = images[services.specialist.image];

  return (
    <section id="services" aria-labelledby="services-title" className="container-site">
      <div className="rounded-[2rem] bg-cream px-6 py-16 sm:px-10 lg:px-14 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <SectionHeading id="services-title" label={services.label} title={services.title} />
              </Reveal>
              {/* Preview of the service in focus; desktop only, where there is room. */}
              <div className="relative mt-10 hidden aspect-[4/3] overflow-hidden rounded-[1.5rem] lg:block">
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.div
                    key={preview.src}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image src={preview.src} alt={preview.alt} fill sizes="34vw" className="object-cover" />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <ul className="lg:col-span-7">
            {services.items.map((service, i) => (
              <Reveal as="li" key={service.title} delay={i * 0.04}>
                <div
                  onMouseEnter={() => setActive(i)}
                  className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1 border-b border-brown-950/12 py-7 sm:gap-x-7"
                >
                  <span
                    className={cn(
                      "row-span-2 mt-0.5 inline-flex size-12 items-center justify-center rounded-full border transition-colors duration-300",
                      active === i
                        ? "border-brown-950 bg-brown-950 text-gold-400"
                        : "border-brown-950/15 text-brown-700",
                    )}
                  >
                    <Icon name={service.icon} className="size-5" />
                  </span>
                  <h3 className="text-2xl font-medium text-brown-950 sm:text-[1.7rem]">{service.title}</h3>
                  <p className="leading-relaxed text-brown-600">{service.description}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal className="mt-14 lg:mt-20">
          <aside className="grid overflow-hidden rounded-[1.5rem] bg-brown-950 text-cream md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
            <div className="relative aspect-[16/9] md:aspect-auto md:min-h-60">
              <Image
                src={specialistImage.src}
                alt={specialistImage.alt}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex items-start gap-5 p-7 sm:p-10">
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-gold-500 text-brown-950">
                <Icon name={services.specialist.icon} className="size-5" />
              </span>
              <div>
                <p className="text-sm font-medium text-gold-200">Specialist licensed service</p>
                <h3 className="mt-2 text-3xl font-medium">{services.specialist.title}</h3>
                <p className="mt-3 max-w-lg leading-relaxed text-cream/75">{services.specialist.description}</p>
              </div>
            </div>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
