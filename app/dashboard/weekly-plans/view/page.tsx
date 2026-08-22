import Link from 'next/link';

import { TodayActivityCard } from '@/components/dashboard/weekly-plans/today-activity-card';
import { WeeklyCalendar } from '@/components/dashboard/weekly-plans/weekly-calendar';

export default function ViewWeeklyPlansPage() {
  return (
    <div className="mx-auto w-full max-w-[1529px]">
      <nav aria-label="Breadcrumb" className="flex h-[22px] items-center gap-[6px]">
        <Link
          href="/dashboard/weekly-plans"
          className="font-manrope text-[14px] font-normal leading-[22px] tracking-[-0.084px] text-[#2f7d7e]"
        >
          Weekly Plans
        </Link>
        <span className="font-manrope text-[18px] font-normal leading-[27px] tracking-[-0.27px] text-[#d8ddd9]">
          /
        </span>
        <span className="font-manrope text-[14px] font-normal leading-[22px] tracking-[-0.084px] text-[#263238]">
          View Weekly Plans
        </span>
      </nav>

      <div className="mt-6 grid items-start gap-6 min-[1200px]:grid-cols-[908px_minmax(0,597px)]">
        <WeeklyCalendar title="Sensory Exploration" />
        <TodayActivityCard />
      </div>
    </div>
  );
}
