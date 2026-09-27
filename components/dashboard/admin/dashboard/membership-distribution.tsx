'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useMembershipDashboardStats } from '../memberships/hooks/use-admin-memberships';

export function MembershipDistribution() {
  const { data: stats, isLoading } = useMembershipDashboardStats();

  const totalMembers = stats?.totalMembers ?? 0;
  const littleSteps = stats?.littleStepsMembers ?? 0;
  const growTogether = stats?.growTogetherMembers ?? 0;
  const personalized = stats?.personalizedPathwaysMembers ?? 0;

  const pctLittle = totalMembers > 0 ? Number(((littleSteps / totalMembers) * 100).toFixed(1)) : 0;
  const pctGrow = totalMembers > 0 ? Number(((growTogether / totalMembers) * 100).toFixed(1)) : 0;
  const pctPersonalized =
    totalMembers > 0 ? Number(((personalized / totalMembers) * 100).toFixed(1)) : 0;

  // Circumference for r=38 is 2 * PI * 38 = 238.761
  const radius = 38;
  const circumference = 2 * Math.PI * radius;

  const lenLittle = (pctLittle / 100) * circumference;
  const lenGrow = (pctGrow / 100) * circumference;
  const lenPersonalized = (pctPersonalized / 100) * circumference;

  const items = [
    {
      label: 'Little Steps',
      value: `${littleSteps.toLocaleString()} (${pctLittle}%)`,
      progress: `${pctLittle}%`,
      color: '#2f7d7e',
    },
    {
      label: 'Grow Together',
      value: `${growTogether.toLocaleString()} (${pctGrow}%)`,
      progress: `${pctGrow}%`,
      color: '#8fb9a8',
    },
    {
      label: 'Personalized Pathways',
      value: `${personalized.toLocaleString()} (${pctPersonalized}%)`,
      progress: `${pctPersonalized}%`,
      color: '#f5af9a',
    },
  ];

  return (
    <section
      className="min-w-0 rounded-2xl border border-[#e3e9e8] bg-white p-4 shadow-[0_4px_8px_rgba(38,50,56,0.05)] sm:p-6 2xl:min-h-110.5"
      aria-labelledby="membership-distribution-heading"
    >
      <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <h2
          id="membership-distribution-heading"
          className="font-nunito text-xl font-medium leading-7 text-[#263238] sm:text-2xl sm:leading-8"
        >
          Membership Distribution
        </h2>
        <Link
          href="/dashboard/admin/memberships"
          className="inline-flex items-center gap-1 font-manrope text-sm leading-5.5 text-[#27898a] hover:underline"
        >
          View Memberships <ArrowRight aria-hidden="true" size={16} strokeWidth={1.75} />
        </Link>
      </div>

      {/* Real SVG Donut Chart */}
      <div className="mt-7 flex flex-col items-center justify-center">
        <div className="relative flex size-36 items-center justify-center">
          <svg viewBox="0 0 100 100" className="size-36 -rotate-90">
            {/* Background Empty Ring */}
            <circle cx="50" cy="50" r={radius} fill="none" stroke="#edf1f1" strokeWidth="12" />
            {/* Segments (rendered if total > 0) */}
            {totalMembers > 0 && (
              <>
                {/* Little Steps */}
                {lenLittle > 0 && (
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke="#2f7d7e"
                    strokeWidth="12"
                    strokeDasharray={`${lenLittle} ${circumference}`}
                    strokeDashoffset={0}
                    className="transition-all duration-700 ease-out"
                  />
                )}
                {/* Grow Together */}
                {lenGrow > 0 && (
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke="#8fb9a8"
                    strokeWidth="12"
                    strokeDasharray={`${lenGrow} ${circumference}`}
                    strokeDashoffset={-lenLittle}
                    className="transition-all duration-700 ease-out"
                  />
                )}
                {/* Personalized Pathways */}
                {lenPersonalized > 0 && (
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke="#f5af9a"
                    strokeWidth="12"
                    strokeDasharray={`${lenPersonalized} ${circumference}`}
                    strokeDashoffset={-(lenLittle + lenGrow)}
                    className="transition-all duration-700 ease-out"
                  />
                )}
              </>
            )}
          </svg>

          {/* Center Cutout */}
          <div className="absolute inset-0 m-auto flex size-24 flex-col items-center justify-center rounded-full bg-white font-manrope shadow-xs">
            <span
              className={`font-nunito text-base font-bold leading-5 text-[#263238] ${
                isLoading ? 'animate-pulse' : ''
              }`}
            >
              {isLoading ? '—' : totalMembers.toLocaleString()}
            </span>
            <span className="text-[11px] leading-4 text-[#5f8096]">Total Members</span>
          </div>
        </div>
      </div>

      {/* Progress Bars Breakdown */}
      <div className="mt-7 space-y-3.5">
        {items.map(({ label, value, progress, color }) => (
          <div key={label}>
            <div className="flex items-center justify-between font-manrope text-sm leading-5.5 text-[#263238]">
              <span className="flex items-center gap-2.5">
                <span className="size-2.5 rounded-full" style={{ backgroundColor: color }} />
                <span>{label}</span>
              </span>
              <span className={`font-semibold ${isLoading ? 'animate-pulse' : ''}`}>
                {isLoading ? '—' : value}
              </span>
            </div>
            <div className="mt-1.5 ml-5 h-1.5 overflow-hidden rounded-full bg-[#edf1f1]">
              <span
                className="block h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: isLoading ? '0%' : progress, backgroundColor: color }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
