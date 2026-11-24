import { Clock, FileBadge, Mail, MapPin, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SectionLabel, TwoToneHeading } from "@/components/ui/heading";
import { EnquiryForm } from "@/components/sections/enquiry-form";
import { home } from "@/content/home";

type Detail = { icon: LucideIcon; label: string; lines: string[]; href?: string };

/** Contact in Antra's centred newsletter slot: heading on top, details beside the form. */
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
    <section id="contact" aria-labelledby="contact-title" className="py-20 lg:py-24">
      <div className="container-site">
        <Reveal className="mx-auto max-w-3xl text-center">
          <SectionLabel align="center">{contact.label}</SectionLabel>
          <TwoToneHeading id="contact-title" heading={contact.title} className="mt-6" />
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-brown-600">{contact.lead}</p>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <RevealGroup as="dl" className="space-y-7">
              {details.map(({ icon: DetailIcon, label, lines, href }) => (
                <RevealItem y={24} key={label} className="flex gap-4">
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
                </RevealItem>
              ))}
            </RevealGroup>
          </div>

          <Reveal y={80} delay={0.15} className="lg:col-span-8">
            <EnquiryForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
