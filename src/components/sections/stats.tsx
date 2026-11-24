import { CountUp } from "@/components/motion/count-up";
import { home } from "@/content/home";

export function Stats() {
  const { stats } = home;
  return (
    <section aria-labelledby="stats-title" className="container-site">
      <div className="rounded-[2rem] bg-cream px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="stats-title" className="font-sans text-sm font-medium text-brown-700">
            {stats.title}
          </h2>
          <p className="text-sm text-brown-600">{stats.note}</p>
        </div>
        <dl className="mt-8 grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {stats.items.map((item, i) => (
            <div
              key={item.id}
              className={`flex flex-col-reverse gap-2 px-2 sm:px-6 ${i % 2 === 1 ? "border-l border-brown-950/12" : ""} ${i > 0 ? "lg:border-l lg:border-brown-950/12" : ""}`}
            >
              <dt className="text-[0.95rem] leading-snug text-brown-600">{item.label}</dt>
              <dd className="font-brand text-6xl leading-none text-brown-950 sm:text-7xl">
                <CountUp value={item.value} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
