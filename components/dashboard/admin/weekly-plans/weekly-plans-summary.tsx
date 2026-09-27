'use client';

import { CheckCircle2, ClipboardList, FileEdit, Users } from 'lucide-react';
import { useAdminWeeklyPlansSummary, type WeeklyPlanAdminSummary } from '@/features/weekly-plans';

interface WeeklyPlansSummaryProps {
  summary?: WeeklyPlanAdminSummary;
  isLoading?: boolean;
}

export function WeeklyPlansSummary({
  summary: propSummary,
  isLoading: propLoading,
}: WeeklyPlansSummaryProps) {
  const { data: querySummary, isLoading: queryLoading } = useAdminWeeklyPlansSummary();

  const summary = propSummary ?? querySummary;
  const isLoading = propLoading !== undefined ? propLoading : queryLoading;

  const cards = [
    {
      value: summary !== undefined ? String(summary.total) : '—',
      label: 'Total Plans',
      icon: ClipboardList,
      tint: 'border-[#dbeafe] bg-[#ecfeff] text-[#2f7d7e]',
    },
    {
      value: summary !== undefined ? String(summary.published) : '—',
      label: 'Active Plans',
      icon: CheckCircle2,
      tint: 'border-[#dcfce7] bg-[#f0fdf4] text-[#4caf50]',
    },
    {
      value: summary !== undefined ? String(summary.draft) : '—',
      label: 'Draft Plans',
      icon: FileEdit,
      tint: 'border-[#fef9c3] bg-[#fefce8] text-[#b78b16]',
    },
    {
      value: summary !== undefined ? String(summary.enrolledChildren ?? summary.assignments) : '—',
      label: 'Children Enrolled',
      icon: Users,
      tint: 'border-[#ffedd5] bg-[#fff7ed] text-[#ea7b33]',
    },
  ];

  return (
    <div
      className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4"
      aria-label="Weekly plans summary metrics"
    >
      {cards.map(({ value, label, icon: Icon, tint }) => (
        <article
          key={label}
          className="flex min-h-28 min-w-0 items-center rounded-2xl border border-[#e8ebe8] bg-white p-4 shadow-[0_1px_1px_rgba(0,0,0,0.05)] 2xl:h-38.5"
        >
          <span
            className={`mr-3 flex size-8 shrink-0 items-center justify-center rounded-lg border ${tint}`}
          >
            <Icon aria-hidden="true" size={18} strokeWidth={1.7} />
          </span>
          <div className="min-w-0">
            <p
              className={`font-nunito text-2xl font-medium leading-8 text-[#272f3a] ${
                isLoading ? 'animate-pulse' : ''
              }`}
            >
              {value}
            </p>
            <p className="font-manrope text-sm font-medium leading-5.5 tracking-[0.084px] text-[#6c7787]">
              {label}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
