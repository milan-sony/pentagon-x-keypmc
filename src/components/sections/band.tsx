import Image from "next/image";
import { Check } from "lucide-react";
import { ImageReveal } from "@/components/motion/image-reveal";
import { Parallax } from "@/components/motion/parallax";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SectionLabel, TwoToneHeading } from "@/components/ui/heading";
import { PillButton } from "@/components/ui/pill-button";
import { home } from "@/content/home";

/** Antra's dark "about" band: the case for KeyPMC beside a tall image, over a giant outlined watermark. */
export function Band() {
  const { band, images } = home;
  const image = images[band.image];

  return (
    <section
      aria-labelledby="band-title"
      className="relative isolate overflow-hidden bg-brown-950 py-24 text-cream lg:py-32"
    >
      {/* The watermark drifts sideways as the band scrolls past. */}
      <Parallax
        axis="x"
        offset={-160}
        className="pointer-events-none absolute -bottom-[0.18em] left-0 -z-10 select-none"
      >
        <p
          aria-hidden="true"
          className="font-brand text-[clamp(12rem,34vw,30rem)] leading-none text-transparent [-webkit-text-stroke:1px_rgb(244_236_221/0.1)]"
        >
          {band.watermark}
        </p>
      </Parallax>

      <div className="container-site grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="lg:col-span-6">
          <Reveal>
            <SectionLabel tone="dark">{band.label}</SectionLabel>
          </Reveal>
          <TwoToneHeading id="band-title" heading={band.title} tone="dark" className="mt-6" />

          <RevealGroup as="ul" className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {band.checklist.map((item) => (
              <RevealItem as="li" y={16} key={item} className="flex items-center gap-3 text-[0.95rem]">
                <span className="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-gold-500 text-brown-950">
                  <Check aria-hidden="true" className="size-3.5" strokeWidth={2.5} />
                </span>
                {item}
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal>
            <p className="mt-10 max-w-xl leading-relaxed text-cream/70">{band.body}</p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-cream/60">
              <span className="text-gold-200">Our values: </span>
              {band.values}
            </p>
            <PillButton href={band.button.href} variant="light" className="mt-10">
              {band.button.label}
            </PillButton>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl sm:aspect-[5/4] lg:aspect-[4/5]">
            <ImageReveal>
              <Parallax offset={40} className="absolute -inset-y-12 inset-x-0">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </Parallax>
            </ImageReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
