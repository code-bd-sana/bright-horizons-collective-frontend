import Link from 'next/link';
import { quickActions } from './admin-dashboard-data';

const iconTones = {
  teal: 'bg-[#e9f3f2] text-[#27898a]',
  mint: 'bg-[#f0f7f3] text-[#8fb9a8]',
  coral: 'bg-[#fff6f4] text-[#f5af9a]',
};

export function DashboardQuickActions() {
  return (
    <section aria-labelledby="quick-actions-heading">
      <h2
        id="quick-actions-heading"
        className="font-nunito text-xl font-semibold leading-7.5 text-[#263238]"
      >
        Quick Actions
      </h2>
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
        {quickActions.map(({ label, href, icon: Icon, tone }) => (
          <Link
            key={label}
            href={href}
            className="flex h-30 flex-col items-center justify-center gap-3 rounded-2xl border border-[#e3e9e8] bg-white px-3 shadow-[0_4px_8px_rgba(38,50,56,0.05)] transition-colors hover:bg-[#fbfdfc]"
          >
            <span
              className={`flex size-12 items-center justify-center rounded-xl ${iconTones[tone]}`}
            >
              <Icon aria-hidden="true" size={22} strokeWidth={1.75} />
            </span>
            <span className="text-center font-manrope text-sm font-medium leading-5 text-[#263238]">
              {label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
