import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SplitHeader } from "@/components/ui/heading";
import { home } from "@/content/home";
import { DivisionCard } from "./division-card";

/** Who we are, followed by the four divisions as Antra-style capability cards. */
export function Intro() {
  const { intro, images } = home;
  return (
    <section id="about" aria-labelledby="about-title" className="py-20 lg:py-24">
      <div className="container-site">
        <Reveal>
          <SplitHeader id="about-title" label={intro.label} heading={intro.title} lead={intro.body} />
        </Reveal>

        <RevealGroup
          as="ul"
          aria-label="Our divisions"
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4"
        >
          {intro.divisions.map((division, i) => (
            <RevealItem as="li" key={division.title}>
              <DivisionCard
                division={division}
                image={images[division.image]}
                number={String(i + 1).padStart(2, "0")}
                href="#services"
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
