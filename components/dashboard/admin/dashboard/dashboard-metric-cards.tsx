import { TrendingDown, TrendingUp } from 'lucide-react';
import { dashboardMetrics } from './admin-dashboard-data';

const iconTones = {
  teal: 'bg-[#e9f3f2] text-[#27898a]',
  coral: 'bg-[#fff6f4] text-[#f5af9a]',
  amber: 'bg-[#fff9ed] text-[#efb622]',
};

export function DashboardMetricCards() {
  return (
    <section
      className="grid grid-cols-1 gap-3 min-[400px]:grid-cols-2 sm:gap-5 min-[1200px]:grid-cols-4"
      aria-label="Platform overview"
    >
      {dashboardMetrics.map(({ value, label, change, trend, icon: Icon, tone }) => {
        const TrendIcon = trend === 'up' ? TrendingUp : TrendingDown;
        return (
          <article
            key={label}
            className="relative h-36.75 min-w-0 rounded-2xl border border-[#e3e9e8] bg-white p-4 shadow-[0_4px_8px_rgba(38,50,56,0.06)] 2xl:p-5"
          >
            <span
              className={`flex size-10 items-center justify-center rounded-xl ${iconTones[tone]}`}
            >
              <Icon aria-hidden="true" size={21} strokeWidth={1.75} />
            </span>
            <span
              className={`absolute right-4 top-5 inline-flex items-center rounded-full px-2 py-0.5 font-manrope text-xs font-medium leading-4 2xl:right-5 2xl:top-7 ${trend === 'up' ? 'bg-[#edf7ef] text-[#45ad56]' : 'bg-[#fff0ee] text-[#e57067]'}`}
            >
              <TrendIcon aria-hidden="true" size={11} strokeWidth={2} />
              {change}
            </span>
            <p className="mt-3 font-nunito text-2xl font-medium leading-8 text-[#263238]">
              {value}
            </p>
            <p className="mt-1 font-manrope text-xs leading-4.5 text-[#5f8096]">{label}</p>
          </article>
        );
      })}
    </section>
  );
}
