import { CountUp } from "@/components/motion/count-up";
import { home } from "@/content/home";

/** Antra's four-column counter row. */
export function Stats() {
  const { stats } = home;
  return (
    <section aria-labelledby="stats-title" className="bg-white pb-24 lg:pb-32">
      <div className="container-site">
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-t border-brown-950/10 pt-8">
          <h2 id="stats-title" className="font-sans text-sm font-medium text-brown-700">
            Our portfolio at a glance
          </h2>
          <p className="text-sm text-brown-600">{stats.note}</p>
        </div>
        <dl className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {stats.items.map((item) => (
            <div key={item.id} className="flex flex-col">
              <dt className="order-2 mt-5 text-lg font-medium text-brown-950">{item.label}</dt>
              <dd className="order-1 font-brand text-7xl leading-none text-brown-950 sm:text-[5.5rem]">
                <CountUp value={item.value} />
              </dd>
              <dd className="order-3 mt-1.5 max-w-60 text-[0.95rem] leading-relaxed text-brown-600">{item.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
