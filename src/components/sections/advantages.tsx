"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useState, type PointerEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SplitHeader } from "@/components/ui/heading";
import { home } from "@/content/home";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/** Antra's "meet the team" list, used for KeyPMC's advantages: each row reveals its photo. */
export function Advantages() {
  const { advantages, images } = home;
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const preview = images[advantages.items[active].image];

  // Antra's hover reveal: a small photo slides in beside the list and follows the pointer down it.
  const reduceMotion = useReducedMotion();
  const pointerY = useMotionValue(0);
  const floatY = useSpring(pointerY, { stiffness: 180, damping: 24 });
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    pointerY.set(event.clientY - event.currentTarget.getBoundingClientRect().top);
  };

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
                  initial={{ opacity: 0, y: "6%", scale: 1.08 }}
                  animate={{ opacity: 1, y: "0%", scale: 1 }}
                  exit={{ opacity: 0, y: "-4%" }}
                  transition={{ duration: 0.8, ease }}
                >
                  <Image src={preview.src} alt={preview.alt} fill sizes="38vw" className="object-cover" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div
            className="relative lg:col-span-7"
            onPointerMove={onPointerMove}
            onPointerEnter={(event) => event.pointerType === "mouse" && setHovering(true)}
            onPointerLeave={() => setHovering(false)}
          >
            {!reduceMotion ? (
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute top-0 right-20 z-10 hidden w-40 -translate-y-1/2 xl:block"
                style={{ y: floatY }}
                initial={false}
                animate={hovering ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 120, scale: 0.85 }}
                transition={{ duration: 0.6, ease }}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_24px_50px_-24px_rgb(46_26_15/0.6)]">
                  <AnimatePresence initial={false} mode="popLayout">
                    <motion.div
                      key={preview.src}
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: 1.2 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease }}
                    >
                      <Image src={preview.src} alt="" fill sizes="10rem" className="object-cover" />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            ) : null}
            <ol className="border-t border-brown-950/10">
              {advantages.items.map((item, i) => (
                <li
                  key={item.title}
                  onMouseEnter={() => setActive(i)}
                  data-active={active === i}
                  className="group relative grid grid-cols-[auto_1fr_auto] gap-x-4 border-b border-brown-950/10 py-6 sm:gap-x-6 lg:py-7"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-gold-500 transition-transform duration-700 ease-portal group-data-[active=true]:scale-x-100"
                  />
                  <span className="w-7 pt-2 font-brand text-sm text-brown-500">{String(i + 1).padStart(2, "0")}</span>
                  <div className="grid gap-1.5 xl:grid-cols-[minmax(0,1fr)_minmax(0,15rem)] xl:items-baseline xl:gap-8">
                    <h3
                      className={cn(
                        "text-[1.7rem] leading-tight font-medium transition-[color,translate] duration-500 ease-portal sm:text-[2rem]",
                        active === i ? "text-gold-700 lg:translate-x-3" : "text-brown-950",
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
      </div>
    </section>
  );
}
