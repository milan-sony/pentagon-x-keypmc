"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowDownRight } from "lucide-react";
import { home } from "@/content/home";

const ease = [0.22, 1, 0.36, 1] as const;

/** Splits the headline into words that rise out of a mask, one after another. */
function RisingTitle({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <h1
      id="hero-title"
      className="text-[2.6rem] leading-[1.04] font-medium tracking-[-0.015em] text-cream sm:text-6xl lg:text-[3.4rem] xl:text-[4.4rem]"
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "105%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.15 + i * 0.06 }}
          >
            {word}
            {i < words.length - 1 ? " " : null}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

/**
 * The open-bottomed arch and keystone from the logo, drawn around the hero
 * photograph. A CSS border keeps the outline concentric with the image.
 */
function PortalFrame() {
  return (
    <motion.div
      aria-hidden="true"
      className="portal pointer-events-none absolute -inset-3 border border-b-0 border-gold-500 sm:-inset-4"
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      transition={{ duration: 1.4, ease, delay: 0.6 }}
    />
  );
}

export function Hero() {
  const { hero, images } = home;
  const image = images[hero.image];

  return (
    <section aria-labelledby="hero-title" className="container-site pt-4 pb-16 sm:pt-6 lg:pb-24">
      <div className="grid items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-brown-950 px-6 py-10 sm:px-10 sm:py-14 lg:col-span-7 lg:px-14 lg:py-16">
          {/* Faint symbol watermark, echoing the template's banner mark. */}
          <Image
            src="/brand/symbol-reverse.svg"
            alt=""
            width={156}
            height={188}
            unoptimized
            className="pointer-events-none absolute -right-10 -bottom-16 h-80 w-auto opacity-[0.06] sm:h-96"
          />

          <div className="relative">
            <RisingTitle text={hero.title} />
            <motion.p
              className="mt-6 max-w-xl text-lg leading-relaxed text-cream/75"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.75 }}
            >
              {hero.lead}
            </motion.p>
            <motion.div
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.9 }}
            >
              <a
                href={hero.primary.href}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 font-medium text-brown-950 transition-colors hover:bg-gold-400"
              >
                {hero.primary.label}
                <ArrowDownRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                />
              </a>
              <a
                href={hero.secondary.href}
                className="inline-flex items-center justify-center rounded-full border border-cream/25 px-7 py-3.5 font-medium text-cream transition-colors hover:border-cream/60"
              >
                {hero.secondary.label}
              </a>
            </motion.div>
          </div>

          <motion.dl
            className="relative mt-14 grid grid-cols-3 gap-4 border-t border-cream/15 pt-7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            {hero.highlights.map((item) => (
              <div key={item.label} className="flex flex-col-reverse">
                <dt className="mt-1.5 text-[0.8rem] leading-snug text-cream/70 sm:text-sm">{item.label}</dt>
                <dd className="font-brand text-2xl text-gold-400 sm:text-3xl">{item.value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <div className="relative mx-auto w-full max-w-md px-3 pt-3 sm:px-4 sm:pt-4 lg:col-span-5 lg:max-w-none">
          <div className="relative h-full min-h-[24rem] sm:min-h-[32rem]">
            <PortalFrame />
            <motion.div
              className="portal relative h-full overflow-hidden"
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              animate={{ clipPath: "inset(0% 0 0 0)" }}
              transition={{ duration: 1.3, ease, delay: 0.2 }}
            >
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.12 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.8, ease, delay: 0.2 }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  preload
                  sizes="(min-width: 1024px) 40vw, (min-width: 640px) 28rem, 100vw"
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
            {/* Keystone sits on the outer arch, breaking the line as in the logo. */}
            <motion.svg
              viewBox="0 0 24 20"
              aria-hidden="true"
              className="absolute -top-[1.35rem] left-1/2 h-5 w-6 -translate-x-1/2 bg-ivory px-1 text-gold-500 box-content sm:-top-[1.6rem]"
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease, delay: 1.4 }}
            >
              <path d="M0 0h24l-4 20H4z" fill="currentColor" />
            </motion.svg>
          </div>
        </div>
      </div>
    </section>
  );
}
