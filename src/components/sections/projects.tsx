import Image from "next/image";
import { CalendarClock, Lock, MapPin } from "lucide-react";
import { ImageReveal } from "@/components/motion/image-reveal";
import { Odometer } from "@/components/motion/odometer";
import { Parallax } from "@/components/motion/parallax";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SplitHeader } from "@/components/ui/heading";
import { home } from "@/content/home";
import { cn } from "@/lib/utils";

/** Card heights vary like Antra's portfolio row: the middle card sits lower. */
const offsets = ["", "lg:mt-16", ""];

export function Projects() {
  const { portfolio, images, sectors } = home;
  return (
    <section id="projects" aria-labelledby="projects-title" className="relative isolate overflow-hidden py-24 lg:py-32">
      <Parallax
        axis="x"
        offset={140}
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 -translate-x-1/2 select-none"
      >
        <p
          aria-hidden="true"
          className="font-display text-[clamp(8rem,24vw,22rem)] leading-[0.75] font-medium whitespace-nowrap text-brown-950/[0.04] select-none"
        >
          {portfolio.watermark}
        </p>
      </Parallax>

      <div className="container-site">
        <Reveal>
          <SplitHeader
            id="projects-title"
            label={portfolio.label}
            heading={portfolio.title}
            aside={
              <p className="mt-6 flex max-w-md items-start gap-2 text-sm leading-relaxed text-brown-600">
                <Lock aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold-700" />
                {portfolio.confidentialityNote}
              </p>
            }
          />
        </Reveal>

        <RevealGroup as="ul" className="mt-14 grid gap-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-6">
          {portfolio.inDelivery.map((project, i) => {
            const image = images[project.image];
            return (
              <RevealItem
                as="li"
                key={project.name}
                className={cn(offsets[i], i === 2 && "sm:col-span-2 lg:col-span-1")}
              >
                <article className="group">
                  <div
                    data-cursor="view"
                    className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-sand lg:aspect-[4/5]"
                  >
                    <ImageReveal from="bottom">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 1024px) 32vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-portal)] group-hover:scale-[1.05]"
                      />
                    </ImageReveal>
                    <ul className="absolute top-4 left-4 flex flex-wrap gap-2 text-xs font-medium">
                      <li className="rounded-full border border-cream/40 bg-brown-950/35 px-3 py-1 text-cream backdrop-blur-sm">
                        {project.sector}
                      </li>
                      <li className="rounded-full bg-ivory/90 px-3 py-1 text-brown-950 backdrop-blur-sm">
                        In delivery
                      </li>
                    </ul>
                  </div>
                  <h3 className="mt-5 text-[1.75rem] leading-tight font-medium text-brown-950">{project.name}</h3>
                  <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[0.95rem] text-brown-600">
                    <div className="flex items-center gap-2">
                      <dt className="sr-only">Location</dt>
                      <MapPin aria-hidden="true" className="size-4 text-brown-500" />
                      <dd>{project.location}</dd>
                    </div>
                    <div className="flex items-center gap-2">
                      <dt className="sr-only">Status</dt>
                      <CalendarClock aria-hidden="true" className="size-4 text-brown-500" />
                      <dd>{project.status}</dd>
                    </div>
                  </dl>
                </article>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal className="mt-16 lg:mt-24">
          <div className="grid gap-8 rounded-3xl border border-brown-950/10 bg-white/70 p-7 backdrop-blur-sm sm:p-10 lg:grid-cols-[auto_1fr_1.1fr] lg:items-center lg:gap-12">
            <p className="font-brand text-7xl leading-none text-brown-950 sm:text-8xl">
              <Odometer value={portfolio.pipeline.count} />
            </p>
            <div>
              <h3 className="text-3xl font-medium text-brown-950">{portfolio.pipeline.title}</h3>
              <p className="mt-2 leading-relaxed text-brown-600">{portfolio.pipeline.description}</p>
            </div>
            <ul className="flex flex-wrap gap-2" aria-label="Sectors">
              {sectors.map((sector) => (
                <li
                  key={sector}
                  className="rounded-full border border-brown-950/15 px-3.5 py-1.5 text-sm text-brown-700"
                >
                  {sector}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
