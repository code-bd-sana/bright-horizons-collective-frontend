import { Baby, Calendar, CircleCheck, TrendingUp } from 'lucide-react';

import { therapyToyMetrics } from './therapy-toys-data';

const metricIcons = [Calendar, CircleCheck, TrendingUp, Baby] as const;

const iconTones = [
  'border-[#dcfce7] bg-[#f0fdf4] text-[#4caf50]',
  'border-[#fef9c3] bg-[#fefce8] text-[#ca8a04]',
  'border-[#ffedd5] bg-[#fff7ed] text-[#f97316]',
  'border-[#dbeafe] bg-[#ecfeff] text-[#0891b2]',
] as const;

export function TherapyToysSummary() {
  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4" aria-label="Therapy toy overview">
      {therapyToyMetrics.map((metric, index) => {
        const Icon = metricIcons[index];

        return (
          <article
            key={metric.label}
            className="flex h-38.5 items-center rounded-2xl border border-[#e8ebe8] bg-white p-4 shadow-[0_1px_1px_rgba(0,0,0,0.05)]"
          >
            <div className="flex items-start gap-3">
              <span
                className={`flex size-8 items-center justify-center rounded-lg border ${iconTones[index]}`}
              >
                <Icon aria-hidden="true" size={18} strokeWidth={1.6} />
              </span>
              <div>
                <p className="font-nunito text-2xl font-medium leading-8 text-[#272f3a]">
                  {metric.value}
                </p>
                <p className="font-manrope text-sm font-medium leading-5.5 tracking-[0.06em] text-[#6c7787]">
                  {metric.label}
                </p>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
