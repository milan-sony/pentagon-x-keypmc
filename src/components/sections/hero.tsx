"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { ArchOutline } from "@/components/brand/arch";
import { Odometer } from "@/components/motion/odometer";
import { SplitText } from "@/components/motion/split-heading";
import { SectionLabel } from "@/components/ui/heading";
import { PillButton } from "@/components/ui/pill-button";
import { home } from "@/content/home";
import { useIntroReady } from "@/lib/intro";
import { NextSlideThumb, SectorLine, SLIDE_SECONDS, SlideStack, type Slide } from "./hero-slider";

const ease = [0.22, 1, 0.36, 1] as const;

/** Fades content up once the preloader has lifted. */
function Rise({
  ready,
  delay,
  className,
  children,
}: {
  ready: boolean;
  delay: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={ready ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 1, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  const { hero, images } = home;
  const slides: Slide[] = hero.slides.map((s) => ({ image: images[s.image], caption: s.caption }));

  // Holds the entrance and the slideshow until the preloader starts to lift.
  const ready = useIntroReady();
  const reduceMotion = useReducedMotion() ?? false;

  // The previous slide stays beneath the incoming one while it opens; null on first load.
  const [{ index, previous }, setShow] = useState<{ index: number; previous: number | null }>({
    index: 0,
    previous: null,
  });
  const go = (i: number) => setShow((s) => ({ index: (i + slides.length) % slides.length, previous: s.index }));

  // Each slide stays up for SLIDE_SECONDS; choosing "Next" restarts the wait. Still for reduced motion.
  useEffect(() => {
    if (!ready || reduceMotion) return;
    const timer = window.setTimeout(
      () => setShow((s) => ({ index: (s.index + 1) % slides.length, previous: s.index })),
      SLIDE_SECONDS * 1000,
    );
    return () => window.clearTimeout(timer);
  }, [index, ready, reduceMotion, slides.length]);

  // Depth: layers drift by different amounts as the pointer moves (fine pointers only).
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 60, damping: 20 });
  const smoothY = useSpring(pointerY, { stiffness: 60, damping: 20 });
  const imageX = useTransform(smoothX, (v) => v * -22);
  const imageY = useTransform(smoothY, (v) => v * -14);
  const archX = useTransform(smoothX, (v) => v * 40);
  const archY = useTransform(smoothY, (v) => v * 24);
  const cardX = useTransform(smoothX, (v) => v * 12);

  // A warm light that follows the mouse across the photo; shown once a mouse moves (never on touch).
  const [glow, setGlow] = useState(false);
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const glowBackground = useMotionTemplate`radial-gradient(34rem circle at ${glowX}px ${glowY}px, rgb(217 188 122 / 0.28), transparent 65%)`;

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
    glowX.set(event.clientX - bounds.left);
    glowY.set(event.clientY - bounds.top);
    if (!glow) setGlow(true);
  };

  // Leaving: the photo keeps zooming while the copy lifts and fades.
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const exitScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const exitY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const exitOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-title"
      onPointerMove={onPointerMove}
      className="relative isolate overflow-hidden bg-brown-950"
    >
      <div
        role="group"
        aria-roledescription="carousel"
        aria-label="Featured sectors"
        className="flex min-h-[100svh] flex-col"
      >
        <motion.div
          aria-live={reduceMotion ? "polite" : "off"}
          className="absolute inset-0 -z-20 overflow-hidden"
          style={reduceMotion ? undefined : { scale: exitScale }}
        >
          <motion.div className="absolute -inset-8" style={{ x: imageX, y: imageY }}>
            <SlideStack slides={slides} index={index} previous={previous} ready={ready} />
          </motion.div>
        </motion.div>

        {/* Backdrop: a darkening wash for legibility, a warm vignette and film grain. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(46_26_15/0.7)_0%,rgb(46_26_15/0.5)_40%,rgb(46_26_15/0.92)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgb(46_26_15/0.65)_100%)]"
        />
        <div aria-hidden="true" className="grain absolute inset-0 -z-10" />
        {glow && !reduceMotion ? (
          <motion.div
            aria-hidden="true"
            data-hero-glow
            className="pointer-events-none absolute inset-0 -z-10 mix-blend-soft-light"
            style={{ background: glowBackground }}
          />
        ) : null}

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute right-[2%] bottom-[-6%] -z-10 hidden h-[86%] text-gold-200/45 md:block"
          style={{ x: archX, y: archY }}
        >
          <ArchOutline play={ready} className="h-full w-auto" />
        </motion.div>

        <motion.div
          className="container-site flex flex-1 flex-col justify-end pt-36 pb-14 sm:pb-16 lg:pb-20"
          style={reduceMotion ? undefined : { y: exitY, opacity: exitOpacity }}
        >
          <Rise ready={ready} delay={0}>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <SectionLabel tone="dark">{hero.label}</SectionLabel>
              <p className="font-display text-xl text-cream sm:text-[1.65rem]">
                <SectorLine slides={slides} index={index} previous={previous} />
              </p>
            </div>
          </Rise>

          <SplitText
            as="h1"
            id="hero-title"
            variant="chars"
            play={ready}
            parts={[{ text: hero.title }]}
            className="mt-6 max-w-[15ch] text-[3.1rem] leading-[0.98] font-medium tracking-[-0.02em] text-cream sm:text-7xl lg:max-w-[24ch] lg:text-[5.6rem] xl:text-[6.6rem]"
          />

          <div className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-12 lg:items-end">
            <Rise ready={ready} delay={0.9} className="lg:col-span-5">
              <p className="max-w-md text-lg leading-relaxed text-cream/85">{hero.lead}</p>
              <PillButton href={hero.primary.href} variant="light" className="mt-8 bg-brown-950/20 backdrop-blur-sm">
                {hero.primary.label}
              </PillButton>
            </Rise>

            <Rise ready={ready} delay={1.1} className="lg:col-span-6 lg:col-start-7">
              <motion.div className="flex gap-4 lg:justify-end" style={{ x: cardX }}>
                <div className="flex w-full flex-col justify-between rounded-3xl border border-cream/15 bg-cream/10 p-6 backdrop-blur-md sm:max-w-64 sm:p-7">
                  <div>
                    <p className="font-brand text-5xl leading-none text-cream">
                      <Odometer value={hero.card.value} pad={2} start={ready} />
                    </p>
                    <p className="mt-2 text-sm text-cream/75">{hero.card.label}</p>
                  </div>
                  <ul className="mt-8 space-y-1.5 border-t border-cream/15 pt-5 text-sm text-cream/85">
                    {hero.card.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
                <NextSlideThumb slide={slides[(index + 1) % slides.length]} onClick={() => go(index + 1)} />
              </motion.div>
            </Rise>
          </div>
        </motion.div>

        <a
          href="#about"
          className="group absolute right-5 bottom-6 hidden items-center gap-3 text-xs font-medium tracking-wide text-cream/70 transition-colors hover:text-cream sm:right-8 lg:flex"
        >
          Scroll
          <span aria-hidden="true" className="relative h-12 w-px overflow-hidden bg-cream/20">
            <span className="scroll-cue absolute inset-x-0 top-0 h-1/3 bg-gold-400" />
          </span>
        </a>
      </div>
    </section>
  );
}
