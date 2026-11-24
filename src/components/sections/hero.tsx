"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { PillButton } from "@/components/ui/pill-button";
import { SectionLabel } from "@/components/ui/heading";
import { home } from "@/content/home";
import { useIntroReady } from "@/lib/intro";

const ease = [0.22, 1, 0.36, 1] as const;

/** Splits the headline into words that rise out of a mask, one after another. */
function RisingTitle({ text, ready }: { text: string; ready: boolean }) {
  const words = text.split(" ");
  return (
    <h1
      id="hero-title"
      className="max-w-[15ch] text-[3.1rem] leading-[0.98] lg:max-w-[24ch] font-medium tracking-[-0.02em] text-cream sm:text-7xl lg:text-[5.6rem] xl:text-[6.6rem]"
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.06em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "105%" }}
            animate={ready ? { y: 0 } : undefined}
            transition={{ duration: 0.95, ease, delay: 0.1 + i * 0.055 }}
          >
            {word}
            {i < words.length - 1 ? " " : null}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

/** Fades content up once the preloader has lifted. */
function Rise({ ready, delay, className, children }: { ready: boolean; delay: number; className?: string; children: React.ReactNode }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      animate={ready ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  const { hero, images } = home;
  const background = images[hero.image];
  const thumb = images[hero.thumb];
  // Holds the entrance until the first-visit preloader starts to lift.
  const ready = useIntroReady();

  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-brown-950">
      <motion.div
        className="absolute inset-0 -z-20"
        initial={{ scale: 1.1 }}
        animate={ready ? { scale: 1 } : undefined}
        transition={{ duration: 2.4, ease }}
      >
        <Image src={background.src} alt={background.alt} fill preload sizes="100vw" className="object-cover" />
      </motion.div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(46_26_15/0.55)_0%,rgb(46_26_15/0.25)_35%,rgb(46_26_15/0.85)_100%)]"
      />

      <div className="container-site pt-36 pb-12 sm:pb-16 lg:pb-20">
        <Rise ready={ready} delay={0}>
          <SectionLabel tone="dark" className="bg-brown-950/30 backdrop-blur-sm">
            {hero.label}
          </SectionLabel>
        </Rise>

        <div className="mt-6">
          <RisingTitle text={hero.title} ready={ready} />
        </div>

        <div className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-12 lg:items-end">
          <Rise ready={ready} delay={0.55} className="lg:col-span-5">
            <p className="max-w-md text-lg leading-relaxed text-cream/85">{hero.lead}</p>
            <PillButton href={hero.primary.href} variant="light" className="mt-8 bg-brown-950/20 backdrop-blur-sm">
              {hero.primary.label}
            </PillButton>
          </Rise>

          <Rise ready={ready} delay={0.75} className="flex gap-4 lg:col-span-6 lg:col-start-7 lg:justify-end">
            <div className="flex w-full flex-col justify-between rounded-3xl border border-cream/15 bg-cream/10 p-6 backdrop-blur-md sm:max-w-64 sm:p-7">
              <div>
                <p className="font-brand text-5xl leading-none text-cream">{hero.card.value}</p>
                <p className="mt-2 text-sm text-cream/75">{hero.card.label}</p>
              </div>
              <ul className="mt-8 space-y-1.5 border-t border-cream/15 pt-5 text-sm text-cream/85">
                {hero.card.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
            <div className="relative hidden w-56 shrink-0 overflow-hidden rounded-3xl sm:block">
              <Image src={thumb.src} alt={thumb.alt} fill sizes="14rem" className="object-cover" />
            </div>
          </Rise>
        </div>
      </div>
    </section>
  );
}
