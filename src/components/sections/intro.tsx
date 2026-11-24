import { Reveal } from "@/components/motion/reveal";
import { SplitHeader } from "@/components/ui/heading";
import { Icon } from "@/components/ui/icon";
import { home } from "@/content/home";

/** Who we are, followed by the four divisions as Antra-style capability cards. */
export function Intro() {
  const { intro } = home;
  return (
    <section id="about" aria-labelledby="about-title" className="py-24 lg:py-32">
      <div className="container-site">
        <Reveal>
          <SplitHeader id="about-title" label={intro.label} heading={intro.title} lead={intro.body} />
        </Reveal>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {intro.divisions.map((division, i) => (
            <Reveal as="li" key={division.title} delay={i * 0.08}>
              <article className="group flex h-full flex-col rounded-3xl border border-brown-950/8 bg-white p-7 transition-[border-color,transform,box-shadow] duration-500 hover:-translate-y-1 hover:border-gold-500/50 hover:shadow-[0_18px_40px_-24px_rgb(46_26_15/0.35)]">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-[1.65rem] leading-[1.1] font-medium text-brown-950">{division.title}</h3>
                  <Icon name={division.icon} className="size-9 shrink-0 text-gold-700" />
                </div>
                <div aria-hidden="true" className="min-h-10 flex-1" />
                <p className="border-t border-brown-950/8 pt-5 leading-relaxed text-brown-600">{division.description}</p>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
