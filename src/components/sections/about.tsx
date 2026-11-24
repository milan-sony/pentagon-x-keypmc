import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { home } from "@/content/home";

export function About() {
  const { about, images } = home;
  return (
    <section id="about" aria-labelledby="about-title" className="py-20 lg:py-28">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <SectionHeading id="about-title" label={about.label} title={about.title} />
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brown-600">{about.body}</p>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5 lg:pt-12">
            <h3 className="font-sans text-sm font-medium text-brown-700">Our values</h3>
            <dl className="mt-4 divide-y divide-brown-950/10 border-y border-brown-950/10">
              {about.values.map((value) => (
                <div key={value.title} className="flex flex-col gap-1 py-3.5 sm:flex-row sm:items-baseline sm:gap-6">
                  <dt className="font-display text-xl text-brown-950 sm:w-40 sm:shrink-0">{value.title}</dt>
                  <dd className="text-[0.95rem] text-brown-600">{value.text}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:mt-20 lg:gap-8">
          {about.pillars.map((pillar, i) => {
            const image = images[pillar.image];
            return (
              <Reveal key={pillar.title} delay={i * 0.1}>
                <article className="group grid h-full overflow-hidden rounded-[1.75rem] bg-cream sm:max-md:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)]">
                  <div className="relative aspect-[16/10] overflow-hidden sm:max-md:aspect-auto sm:max-md:min-h-72 xl:aspect-auto xl:min-h-72">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 1024px) 26vw, (min-width: 768px) 45vw, 100vw"
                      className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-portal)] group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-col justify-center p-7 sm:p-8">
                    <h3 className="text-3xl font-medium text-brown-950">{pillar.title}</h3>
                    <p className="mt-3 leading-relaxed text-brown-600">{pillar.text}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
