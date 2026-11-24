import { Clock, FileBadge, Mail, MapPin, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { EnquiryForm } from "@/components/sections/enquiry-form";
import { home } from "@/content/home";

type Detail = { icon: LucideIcon; label: string; lines: string[]; href?: string };

export function Contact() {
  const { contact, contactDetails, company } = home;

  const details: Detail[] = [
    { icon: MapPin, label: "Office", lines: [...contactDetails.office, contactDetails.poBox] },
    { icon: Clock, label: "Working hours", lines: [contactDetails.hours] },
    { icon: FileBadge, label: "Licence", lines: [`${company.licenceLabel} ${company.licence}`] },
  ];
  // Phone and email appear automatically once KeyPMC supplies them in the content file.
  if (contactDetails.phone) {
    details.push({ icon: Phone, label: "Phone", lines: [contactDetails.phone], href: `tel:${contactDetails.phone}` });
  }
  if (contactDetails.email) {
    details.push({ icon: Mail, label: "Email", lines: [contactDetails.email], href: `mailto:${contactDetails.email}` });
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="container-site pb-20 lg:pb-28">
      <div className="grid gap-12 rounded-[2rem] bg-cream px-6 py-14 sm:px-10 lg:grid-cols-12 lg:gap-16 lg:px-14 lg:py-20">
        <Reveal className="lg:col-span-5">
          <SectionHeading id="contact-title" label={contact.label} title={contact.title} lead={contact.lead} />
          <dl className="mt-10 space-y-6">
            {details.map(({ icon: DetailIcon, label, lines, href }) => (
              <div key={label} className="flex gap-4">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-brown-950 text-gold-400">
                  <DetailIcon aria-hidden="true" className="size-[1.1rem]" />
                </span>
                <div>
                  <dt className="text-sm font-medium text-brown-700">{label}</dt>
                  {lines.map((line) => (
                    <dd key={line} className="leading-relaxed text-brown-950">
                      {href ? (
                        <a href={href} className="underline-offset-4 hover:underline">
                          {line}
                        </a>
                      ) : (
                        line
                      )}
                    </dd>
                  ))}
                </div>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <EnquiryForm />
        </Reveal>
      </div>
    </section>
  );
}
