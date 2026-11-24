import { Keystone } from "@/components/brand/logo";
import { home } from "@/content/home";

/** Sectors served, shown as a slow marquee in place of (confidential) client logos. */
export function TrustStrip() {
  const { sectors } = home;
  return (
    <section aria-label="Sectors we serve" className="border-y border-brown-950/10 bg-cream">
      <div className="container-site flex flex-col gap-4 py-6 md:flex-row md:items-center md:gap-10">
        <p className="shrink-0 text-sm font-medium text-brown-700">Sectors we serve</p>
        <ul className="sr-only">
          {sectors.map((sector) => (
            <li key={sector}>{sector}</li>
          ))}
        </ul>
        <div
          aria-hidden="true"
          className="group relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
        >
          <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
            {[0, 1].map((copy) => (
              <ul key={copy} className="flex shrink-0 items-center">
                {sectors.map((sector) => (
                  <li
                    key={sector}
                    className="flex items-center gap-8 pe-8 font-display text-2xl whitespace-nowrap text-brown-950 sm:text-[1.7rem]"
                  >
                    {sector}
                    <Keystone className="text-gold-500" />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
