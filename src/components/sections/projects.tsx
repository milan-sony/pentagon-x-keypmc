import Image from "next/image";
import { CalendarClock, Lock, MapPin } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { home } from "@/content/home";

export function Projects() {
  const { portfolio, images, sectors } = home;
  return (
    <section id="projects" aria-labelledby="projects-title" className="py-20 lg:py-28">
      <div className="container-site">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading id="projects-title" label={portfolio.label} title={portfolio.title} />
          </Reveal>
          <p className="flex max-w-xs items-start gap-2 text-sm leading-relaxed text-brown-600">
            <Lock aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold-700" />
            {portfolio.confidentialityNote}
          </p>
        </div>

        <ul className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-3 lg:gap-6">
          {portfolio.inDelivery.map((project, i) => {
            const image = images[project.image];
            return (
              <Reveal as="li" key={project.name} delay={i * 0.1}>
                <article className="group flex h-full flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-sand sm:aspect-[16/9] lg:aspect-[4/5]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1024px) 32vw, 100vw"
                      className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-portal)] group-hover:scale-[1.05]"
                    />
                    <span className="absolute top-4 left-4 rounded-full bg-ivory/90 px-3 py-1 text-xs font-medium text-brown-950 backdrop-blur">
                      In delivery
                    </span>
                  </div>
                  <p className="mt-5 text-sm font-medium text-gold-700">{project.sector}</p>
                  <h3 className="mt-1.5 text-2xl leading-snug font-medium text-brown-950 lg:min-h-[2lh]">{project.name}</h3>
                  <dl className="mt-4 space-y-1.5 text-[0.95rem] text-brown-600">
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
              </Reveal>
            );
          })}
        </ul>

        <Reveal className="mt-14 lg:mt-20">
          <div className="grid gap-8 rounded-[1.75rem] border border-brown-950/10 p-7 sm:p-10 lg:grid-cols-[auto_1fr_1fr] lg:items-center lg:gap-12">
            <p className="font-brand text-7xl leading-none text-brown-950 sm:text-8xl">
              {portfolio.pipeline.count}
            </p>
            <div>
              <h3 className="text-3xl font-medium text-brown-950">{portfolio.pipeline.title}</h3>
              <p className="mt-2 leading-relaxed text-brown-600">{portfolio.pipeline.description}</p>
            </div>
            <ul className="flex flex-wrap gap-2" aria-label="Sectors">
              {sectors.map((sector) => (
                <li key={sector} className="rounded-full border border-brown-950/15 px-3.5 py-1.5 text-sm text-brown-700">
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
