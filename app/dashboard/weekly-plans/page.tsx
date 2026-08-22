import { WeeklyCalendar } from '@/components/dashboard/weekly-plans/weekly-calendar';
import { TodayActivityCard } from '@/components/dashboard/weekly-plans/today-activity-card';
import { WeeklyGoalStats } from '@/components/dashboard/weekly-plans/weekly-goal-stats';
import { PastWeeklyPlans } from '@/components/dashboard/weekly-plans/past-weekly-plans';

export default function WeeklyPlansPage() {
  return (
    <div className="mx-auto w-full max-w-[1529px]">
      <WeeklyGoalStats />

      <div className="mt-10 grid items-start gap-6 min-[1200px]:grid-cols-[908px_minmax(0,597px)]">
        <div className="flex min-w-0 flex-col gap-6">
          <WeeklyCalendar />
          <PastWeeklyPlans />
        </div>
        <TodayActivityCard />
      </div>
    </div>
  );
}
