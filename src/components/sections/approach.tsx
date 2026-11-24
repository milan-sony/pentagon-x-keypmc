"use client";

import { motion } from "motion/react";
import { Reveal } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { home } from "@/content/home";

const ease = [0.22, 1, 0.36, 1] as const;

export function Approach() {
  const { approach } = home;
  return (
    <section id="approach" aria-labelledby="approach-title" className="py-20 lg:py-28">
      <div className="container-site">
        <Reveal>
          <SectionHeading id="approach-title" label={approach.label} title={approach.title} lead={approach.lead} />
        </Reveal>

        {/* The life cycle is a true sequence, so its stages are numbered. */}
        <div className="relative mt-14 lg:mt-20">
          <motion.span
            aria-hidden="true"
            className="absolute top-[1.15rem] right-0 left-0 hidden h-px origin-left bg-gold-500 lg:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.6, ease }}
          />
          <ol className="relative grid gap-0 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-6 lg:gap-x-6">
            {approach.stages.map((stage, i) => (
              <Reveal
                as="li"
                key={stage.title}
                delay={0.15 + i * 0.08}
                className="relative border-l border-gold-500/50 pb-9 pl-6 last:pb-0 sm:border-l-0 sm:pl-0 lg:pb-0"
              >
                <span className="absolute top-1.5 -left-[5px] size-[9px] rounded-full bg-gold-500 sm:hidden" aria-hidden="true" />
                <span className="hidden size-[2.3rem] items-center justify-center rounded-full border border-gold-500 bg-ivory font-brand text-sm text-brown-950 lg:inline-flex">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-brand text-sm text-gold-700 lg:hidden">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-1 text-2xl font-medium text-brown-950 lg:mt-5">{stage.title}</h3>
                <ul className="mt-3 space-y-1.5 text-[0.95rem] text-brown-600">
                  {stage.activities.map((activity) => (
                    <li key={activity}>{activity}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal className="mt-16 lg:mt-24">
          <h3 className="font-sans text-sm font-medium text-brown-700">{approach.toolsTitle}</h3>
          <ul className="mt-5 grid overflow-hidden rounded-[1.5rem] border border-brown-950/10 sm:grid-cols-2 lg:grid-cols-3">
            {approach.tools.map((tool) => (
              <li
                key={tool.title}
                className="-mt-px -ml-px flex gap-4 border-t border-l border-brown-950/10 p-6 sm:p-7"
              >
                <Icon name={tool.icon} className="mt-0.5 size-5 shrink-0 text-gold-700" />
                <div>
                  <p className="font-medium text-brown-950">{tool.title}</p>
                  <p className="mt-1 text-[0.95rem] leading-relaxed text-brown-600">{tool.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
