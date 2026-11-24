"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-heading";
import { PillButton } from "@/components/ui/pill-button";
import { home } from "@/content/home";

/**
 * Full-bleed video band (Antra's "Unlock your dream home" block). The clip is
 * decorative: muted, looped and paused off screen. Playback is started from
 * JavaScript only, never by an `autoplay` attribute: server HTML would start the
 * clip before hydration knows the visitor prefers reduced motion, and those
 * visitors see the poster instead.
 */
export function VideoCta() {
  const { videoCta } = home;
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Antra's scale effect: the band starts as an inset card and opens to full width as it scrolls in.
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "start 0.25"] });
  const inset = useTransform(scrollYProgress, [0, 1], [5, 0]);
  const radius = useTransform(scrollYProgress, [0, 1], [2, 0]);
  const clipPath = useTransform(
    () => `inset(${inset.get()}% ${inset.get()}% 0% ${inset.get()}% round ${radius.get()}rem)`,
  );

  // Play only while in view, which also saves battery and CPU.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduceMotion) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => undefined);
        else video.pause();
      },
      { threshold: 0.15 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="video-cta-title"
      className="relative isolate flex min-h-[38rem] items-end overflow-hidden bg-white lg:min-h-[44rem]"
    >
      <motion.div className="absolute inset-0 -z-10 bg-brown-950" style={reduceMotion ? undefined : { clipPath }}>
        <video
          ref={videoRef}
          aria-hidden="true"
          className="absolute inset-0 size-full object-cover"
          poster={videoCta.video.poster}
          muted
          loop
          playsInline
          preload={reduceMotion ? "none" : "metadata"}
        >
          <source src={videoCta.video.src} type="video/mp4" />
        </video>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgb(46_26_15/0.35)_0%,rgb(46_26_15/0.55)_45%,rgb(46_26_15/0.9)_100%)]"
        />
      </motion.div>

      <div className="container-site grid gap-8 py-16 lg:grid-cols-12 lg:items-end lg:py-20">
        <div className="lg:col-span-7">
          <SplitText
            as="h2"
            id="video-cta-title"
            variant="slide-up"
            parts={[{ text: videoCta.title }]}
            className="max-w-[12ch] text-[3.1rem] leading-[0.98] font-medium tracking-[-0.02em] text-cream sm:text-7xl lg:text-[6rem]"
          />
        </div>
        <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
          <p className="max-w-md text-lg leading-relaxed text-cream/80">{videoCta.text}</p>
          <PillButton href={videoCta.button.href} variant="gold" className="mt-8">
            {videoCta.button.label}
          </PillButton>
        </Reveal>
      </div>
    </section>
  );
}
