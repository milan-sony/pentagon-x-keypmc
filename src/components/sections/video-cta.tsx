"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { Reveal } from "@/components/motion/reveal";
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
    <section aria-labelledby="video-cta-title" className="relative isolate flex min-h-[38rem] items-end overflow-hidden bg-brown-950 lg:min-h-[44rem]">
      <video
        ref={videoRef}
        aria-hidden="true"
        className="absolute inset-0 -z-20 size-full object-cover"
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
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(46_26_15/0.35)_0%,rgb(46_26_15/0.55)_45%,rgb(46_26_15/0.9)_100%)]"
      />

      <div className="container-site grid gap-8 py-16 lg:grid-cols-12 lg:items-end lg:py-20">
        <Reveal className="lg:col-span-7">
          <h2
            id="video-cta-title"
            className="max-w-[12ch] text-[3.1rem] leading-[0.98] font-medium tracking-[-0.02em] text-cream sm:text-7xl lg:text-[6rem]"
          >
            {videoCta.title}
          </h2>
        </Reveal>
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
