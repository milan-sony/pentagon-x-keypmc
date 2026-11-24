import Image from "next/image";
import { ImageReveal } from "@/components/motion/image-reveal";
import { Odometer } from "@/components/motion/odometer";
import { Parallax } from "@/components/motion/parallax";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SectionLabel, TwoToneHeading } from "@/components/ui/heading";
import { BrandIcon } from "@/components/icons/brand-icon";
import { home } from "@/content/home";
import { cn } from "@/lib/utils";

/** Vertical offsets that stagger the cards on desktop, as in Antra's process row. */
const stagger = ["lg:mt-0", "lg:mt-12", "lg:mt-24"];

export function Approach() {
  const { approach, images } = home;
  return (
    <section
      id="approach"
      aria-labelledby="approach-title"
      className="relative isolate overflow-hidden bg-cream py-20 lg:py-24"
    >
      {/* Faint drafting grid, a nod to the drawings behind every project. It drifts slowly with scroll. */}
      <Parallax offset={70} className="absolute -inset-y-24 inset-x-0 -z-10">
        <div
          aria-hidden="true"
          className="absolute inset-0 [background-image:linear-gradient(rgb(46_26_15/0.045)_1px,transparent_1px),linear-gradient(90deg,rgb(46_26_15/0.045)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(180deg,transparent,#000_20%,#000_80%,transparent)]"
        />
      </Parallax>

      <div className="container-site">
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel>{approach.label}</SectionLabel>
            <TwoToneHeading id="approach-title" heading={approach.title} className="mt-6" />
          </div>
          <p className="max-w-md text-lg leading-relaxed text-brown-600 lg:col-span-4 lg:col-start-9">
            {approach.lead}
          </p>
        </Reveal>

        {/* The life cycle is a true sequence, so its stages are numbered. */}
        <RevealGroup as="ol" className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          {approach.stages.map((stage, i) => {
            const image = images[stage.image];
            const number = String(i + 1).padStart(2, "0");
            return (
              <RevealItem as="li" key={stage.title} className={cn(stagger[i % 3])}>
                <article className="relative h-full overflow-hidden rounded-3xl bg-white p-3.5 shadow-[0_1px_0_rgb(46_26_15/0.06)]">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                    <ImageReveal>
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                        className="object-cover"
                      />
                    </ImageReveal>
                  </div>
                  <div className="relative px-3 pt-5 pb-4">
                    <h3 className="text-[1.75rem] leading-tight font-medium text-brown-950">
                      <span className="text-gold-700">{number}.</span> {stage.title}
                    </h3>
                    <ul className="mt-3 space-y-1 text-[0.95rem] text-brown-600">
                      {stage.activities.map((activity) => (
                        <li key={activity}>{activity}</li>
                      ))}
                    </ul>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute right-2 bottom-0 font-brand text-[5.5rem] leading-none text-brown-950/[0.05] select-none"
                    >
                      <Odometer value={i + 1} pad={2} duration={1.6} />
                    </span>
                  </div>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* The toolkit: a ruled panel, one cell per tool, with what each is used for. */}
        <div className="mt-16 lg:mt-20">
          <Reveal>
            <h3 id="tools-title" className="text-[2rem] leading-tight font-medium text-brown-950">
              {approach.toolsTitle}
            </h3>
          </Reveal>
          <RevealGroup
            as="ul"
            aria-labelledby="tools-title"
            className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-brown-950/10 bg-brown-950/10 sm:grid-cols-3 xl:grid-cols-6"
          >
            {approach.tools.map((tool) => (
              <RevealItem
                as="li"
                y={40}
                key={tool.title}
                className="group flex flex-col bg-ivory p-5 transition-colors duration-500 hover:bg-white sm:p-6"
              >
                <BrandIcon name={tool.icon} animate className="size-10 text-brown-700" />
                <span className="mt-5 text-base leading-snug font-medium text-brown-950 sm:mt-6 sm:text-lg">
                  {tool.title}
                </span>
                <span className="mt-2 text-sm leading-relaxed text-brown-600">{tool.description}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
