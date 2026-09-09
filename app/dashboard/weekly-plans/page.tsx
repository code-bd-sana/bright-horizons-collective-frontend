import { WeeklyCalendar } from '@/components/dashboard/weekly-plans/weekly-calendar';
import { TodayActivityCard } from '@/components/dashboard/weekly-plans/today-activity-card';
import { WeeklyGoalStats } from '@/components/dashboard/weekly-plans/weekly-goal-stats';
import { PastWeeklyPlans } from '@/components/dashboard/weekly-plans/past-weekly-plans';

export default function WeeklyPlansPage() {
  return (
    <div className="mx-auto w-full max-w-382.25 pb-6 sm:pb-8">
      <WeeklyGoalStats />

      <div className="mt-6 grid items-start gap-6 sm:mt-8 2xl:mt-10 2xl:grid-cols-[minmax(0,3fr)_minmax(340px,2fr)] min-[1920px]:grid-cols-[908px_minmax(0,597px)]">
        <div className="flex min-w-0 flex-col gap-6">
          <WeeklyCalendar />
          <PastWeeklyPlans />
        </div>
        <TodayActivityCard />
      </div>
    </div>
  );
}
