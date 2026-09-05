import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { planStatuses } from './admin-dashboard-data';

export function WeeklyPlanStatus() {
  return (
    <section
      className="min-h-97.5 rounded-2xl border border-[#e3e9e8] bg-white p-6 shadow-[0_4px_8px_rgba(38,50,56,0.05)] 2xl:min-h-120.5"
      aria-labelledby="weekly-plan-status-heading"
    >
      <div className="flex items-center justify-between gap-4">
        <h2
          id="weekly-plan-status-heading"
          className="font-nunito text-2xl font-medium leading-8 text-[#263238]"
        >
          Weekly Plan Status
        </h2>
        <Link
          href="/dashboard/admin/weekly-plans"
          className="inline-flex items-center gap-1 whitespace-nowrap font-manrope text-sm leading-5.5 text-[#27898a]"
        >
          Manage Weekly Plans <ArrowRight aria-hidden="true" size={16} strokeWidth={1.75} />
        </Link>
      </div>
      <div className="mt-7 space-y-5">
        {planStatuses.map(({ label, value, total, progress, color }) => (
          <div key={label}>
            <div className="flex items-center justify-between gap-4 font-manrope">
              <p className="text-sm leading-5.5 text-[#263238]">{label}</p>
              <p className="whitespace-nowrap text-xs leading-4.5 text-[#5f8096]">
                <span className="text-sm font-semibold text-[#263238]">{value}</span> / {total}
              </p>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#edf1f1]">
              <span
                className="block h-full rounded-full"
                style={{ width: progress, backgroundColor: color }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
