import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { SectionLabel, TwoToneHeading } from "@/components/ui/heading";
import { Icon } from "@/components/ui/icon";
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
      className="relative isolate overflow-hidden bg-cream py-24 lg:py-32"
    >
      {/* Faint drafting grid, a nod to the drawings behind every project. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 [background-image:linear-gradient(rgb(46_26_15/0.045)_1px,transparent_1px),linear-gradient(90deg,rgb(46_26_15/0.045)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(180deg,transparent,#000_20%,#000_80%,transparent)]"
      />

      <div className="container-site">
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel>{approach.label}</SectionLabel>
            <TwoToneHeading id="approach-title" heading={approach.title} className="mt-6" />
          </div>
          <p className="max-w-md text-lg leading-relaxed text-brown-600 lg:col-span-4 lg:col-start-9">{approach.lead}</p>
        </Reveal>

        {/* The life cycle is a true sequence, so its stages are numbered. */}
        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-6">
          {approach.stages.map((stage, i) => {
            const image = images[stage.image];
            const number = String(i + 1).padStart(2, "0");
            return (
              <Reveal as="li" key={stage.title} delay={(i % 3) * 0.08} className={cn(stagger[i % 3])}>
                <article className="relative h-full overflow-hidden rounded-3xl bg-white p-3.5 shadow-[0_1px_0_rgb(46_26_15/0.06)]">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                    <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" className="object-cover" />
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
                      {number}
                    </span>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ol>

        <Reveal className="mt-16 lg:mt-32">
          <h3 className="font-sans text-sm font-medium text-brown-700">{approach.toolsTitle}</h3>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {approach.tools.map((tool) => (
              <li
                key={tool.title}
                title={tool.description}
                className="inline-flex items-center gap-2 rounded-full border border-brown-950/12 bg-white px-4 py-2.5 text-[0.95rem] text-brown-950"
              >
                <Icon name={tool.icon} className="size-4 text-gold-700" />
                {tool.title}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
