import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { membershipDistribution } from './admin-dashboard-data';

export function MembershipDistribution() {
  return (
    <section
      className="min-h-97.5 rounded-2xl border border-[#e3e9e8] bg-white p-6 shadow-[0_4px_8px_rgba(38,50,56,0.05)] 2xl:min-h-110.5"
      aria-labelledby="membership-distribution-heading"
    >
      <div className="flex items-center justify-between gap-4">
        <h2
          id="membership-distribution-heading"
          className="font-nunito text-2xl font-medium leading-8 text-[#263238]"
        >
          Membership Distribution
        </h2>
        <Link
          href="/dashboard/admin/memberships"
          className="inline-flex items-center gap-1 whitespace-nowrap font-manrope text-sm leading-5.5 text-[#27898a]"
        >
          View Memberships <ArrowRight aria-hidden="true" size={16} strokeWidth={1.75} />
        </Link>
      </div>
      <div className="mt-7 flex flex-col items-center">
        <div
          className="relative flex size-36 items-center justify-center rounded-full"
          style={{
            background:
              'conic-gradient(#2f7d7e 0 43.7%, #fff 43.7% 45.2%, #8fb9a8 45.2% 79.5%, #fff 79.5% 81%, #f5af9a 81% 100%)',
          }}
        >
          <div className="flex size-25 flex-col items-center justify-center rounded-full bg-white font-manrope text-[#27898a]">
            <span className="text-sm leading-5">1,102</span>
            <span className="text-xs leading-4.5">Total Members</span>
          </div>
        </div>
      </div>
      <div className="mt-7 space-y-3">
        {membershipDistribution.map(({ label, value, progress, color }) => (
          <div key={label}>
            <div className="flex items-center justify-between font-manrope text-sm leading-5.5 text-[#263238]">
              <span className="flex items-center gap-3">
                <span className="size-2.5 rounded-full" style={{ backgroundColor: color }} />
                {label}
              </span>
              <span className="font-semibold">{value}</span>
            </div>
            <div className="mt-1.5 ml-5.5 h-1.5 overflow-hidden rounded-full bg-[#edf1f1]">
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
