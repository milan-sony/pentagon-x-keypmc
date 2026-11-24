import { Logo } from "@/components/brand/logo";
import { home } from "@/content/home";

export function Footer() {
  const { company, contactDetails, nav, footer } = home;
  return (
    <footer className="bg-brown-950 text-cream/75">
      <div className="container-site grid gap-12 py-16 sm:grid-cols-2 md:py-20 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm sm:col-span-2 lg:col-span-1">
          <Logo tone="reverse" />
          <p className="mt-6 leading-relaxed">{footer.descriptor}</p>
        </div>

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

        <div>
          <h2 className="font-sans text-sm font-medium text-gold-200">Visit us</h2>
          <address className="mt-5 space-y-1 not-italic leading-relaxed">
            {contactDetails.office.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p>{contactDetails.poBox}</p>
          </address>
          <p className="mt-4 leading-relaxed">{contactDetails.hoursShort}</p>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-site flex flex-col gap-2 py-6 text-[0.8rem] text-cream/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {company.copyrightYear} {company.legalName}
          </p>
          <p>
            {company.licenceLabel} {company.licence}
          </p>
        </div>
      </div>
    </footer>
  );
}
