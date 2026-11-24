import { Reveal } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { home } from "@/content/home";

export function Advantages() {
  const { advantages } = home;
  return (
    <section id="why" aria-labelledby="why-title" className="mt-20 bg-brown-950 py-20 text-cream lg:mt-28 lg:py-28">
      <div className="container-site">
        <Reveal>
          <SectionHeading id="why-title" tone="dark" label={advantages.label} title={advantages.title} />
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-4">
            <article className="relative h-full overflow-hidden rounded-[1.75rem] border border-gold-500/40 p-8 sm:p-10">
              <Icon name={advantages.featured.icon} className="size-7 text-gold-400" />
              <p className="mt-8 font-brand text-7xl leading-none text-gold-400 sm:text-8xl">{advantages.featured.value}</p>
              <h3 className="mt-4 text-3xl font-medium">{advantages.featured.title}</h3>
              <p className="mt-4 leading-relaxed text-cream/75">{advantages.featured.description}</p>
            </article>
          </Reveal>

          <ul className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
            {advantages.items.map((item, i) => (
              <Reveal as="li" key={item.title} delay={(i % 2) * 0.08}>
                <div className="flex h-full gap-5 border-t border-cream/12 py-7">
                  <Icon name={item.icon} className="mt-1 size-5 shrink-0 text-gold-400" />
                  <div>
                    <h3 className="text-2xl font-medium">{item.title}</h3>
                    <p className="mt-2 leading-relaxed text-cream/70">{item.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
