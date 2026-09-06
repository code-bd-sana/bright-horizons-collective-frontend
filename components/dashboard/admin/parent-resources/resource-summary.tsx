import { resourceMetrics } from './parent-resources-data';

export function ResourceSummary() {
  return (
    <section
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6"
      aria-label="Resource overview"
    >
      {resourceMetrics.map((metric) => (
        <article
          key={metric.label}
          className="flex min-h-30 items-center rounded-2xl border border-[#e8ebe8] bg-white p-4 shadow-[0_1px_1px_rgba(0,0,0,0.05)] lg:min-h-38.5"
        >
          <div>
            <p className="font-nunito text-2xl font-medium leading-8 text-[#272f3a]">
              {metric.value}
            </p>
            <p className="font-manrope text-sm font-medium leading-5.5 tracking-[0.06em] text-[#6c7787]">
              {metric.label}
            </p>
          </div>
        </article>
      ))}
    </section>
  );
}
