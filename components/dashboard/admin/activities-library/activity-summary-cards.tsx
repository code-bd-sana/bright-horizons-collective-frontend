'use client';

import { Activity, Archive, BadgeCheck, FileText } from 'lucide-react';
import type { ActivitySummary } from '@/features/activities/model/activity.types';

export function ActivitySummaryCards({
  summary,
  isLoading = false,
}: {
  summary?: ActivitySummary;
  isLoading?: boolean;
}) {
  const cards = [
    {
      label: 'Total Activities',
      value: summary !== undefined ? summary.total : '—',
      icon: Activity,
      tone: 'border-[#d7f6ec] bg-[#edfcf7] text-[#278488]',
    },
    {
      label: 'Published',
      value: summary !== undefined ? summary.published : '—',
      icon: BadgeCheck,
      tone: 'border-[#dcfce7] bg-[#f0fdf4] text-[#34a853]',
    },
    {
      label: 'Draft',
      value: summary !== undefined ? summary.draft : '—',
      icon: FileText,
      tone: 'border-[#fef9c3] bg-[#fefce8] text-[#b78b16]',
    },
    {
      label: 'Archived',
      value: summary !== undefined ? summary.archived : '—',
      icon: Archive,
      tone: 'border-[#ffedd5] bg-[#fff7ed] text-[#ea7b33]',
    },
  ];

  return (
    <section
      className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 2xl:gap-6"
      aria-label="Activity library summary"
    >
      {cards.map(({ label, value, icon: Icon, tone }) => (
        <article
          key={label}
          className="flex min-h-28 min-w-0 items-center rounded-2xl border border-[#e3e9e8] bg-white px-4 py-4 shadow-[0_2px_5px_rgba(38,50,56,0.05)] 2xl:h-38.25 2xl:py-0"
        >
          <span className={`flex size-8 items-center justify-center rounded-lg border ${tone}`}>
            <Icon aria-hidden="true" size={18} strokeWidth={1.7} />
          </span>
          <div className="ml-3">
            <p
              className={`font-nunito text-2xl font-medium leading-8 text-[#263238] ${isLoading ? 'animate-pulse' : ''}`}
            >
              {value}
            </p>
            <p className="mt-1 font-manrope text-sm leading-5.5 tracking-[0.06em] text-[#65758a]">
              {label}
            </p>
          </div>
        </article>
      ))}
    </section>
  );
}
