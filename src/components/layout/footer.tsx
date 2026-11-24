import Image from "next/image";
import { Logo } from "@/components/brand/logo";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { PillButton } from "@/components/ui/pill-button";
import { WordmarkReveal } from "./wordmark-reveal";
import { home } from "@/content/home";

/** Dark footer over a faint photograph, ending in a giant wordmark as in the Antra template. */
export function Footer() {
  const { company, contactDetails, nav, footer, cta, images } = home;
  const background = images[footer.background];

  return (
    <footer className="relative isolate overflow-hidden bg-brown-950 text-cream/75">
      <Image
        src={background.src}
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover opacity-[0.12] mix-blend-luminosity"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-brown-950/40 via-brown-950/80 to-brown-950"
      />

      <RevealGroup className="container-site grid gap-12 pt-20 pb-14 sm:grid-cols-2 lg:grid-cols-12 lg:pt-24">
        <RevealItem y={40} className="sm:col-span-2 lg:col-span-5">
          <Logo tone="reverse" />
          <p className="mt-6 max-w-sm leading-relaxed">{footer.descriptor}</p>
          <PillButton href={cta.href} variant="gold" className="mt-8">
            {cta.label}
          </PillButton>
        </RevealItem>

        <RevealItem y={40} className="lg:col-span-3">
          <nav aria-label="Footer">
            <h2 className="font-sans text-sm font-medium text-gold-200">Explore</h2>
            <ul className="mt-5 space-y-3">
              {nav.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors hover:text-cream">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </RevealItem>

        <RevealItem y={40} className="lg:col-span-4">
          <h2 className="font-sans text-sm font-medium text-gold-200">Visit us</h2>
          <address className="mt-5 space-y-1 not-italic leading-relaxed">
            {contactDetails.office.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p>{contactDetails.poBox}</p>
          </address>
          <p className="mt-4 leading-relaxed">{contactDetails.hoursShort}</p>
        </RevealItem>
      </RevealGroup>

      <div className="container-site border-t border-cream/10">
        <div className="flex flex-col gap-2 py-6 text-[0.8rem] text-cream/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {company.copyrightYear} {company.legalName}
          </p>
          <p>
            {company.licenceLabel} {company.licence}
          </p>
        </div>
      </div>

      {/* Decorative wordmark; the name is already given by the logo and legal line. */}
      <WordmarkReveal
        text={footer.wordmark}
        className="pointer-events-none -mb-[0.22em] text-center font-display text-[11.5vw] leading-[0.8] font-medium whitespace-nowrap text-cream/[0.07] select-none"
      />
    </footer>
  );
}
