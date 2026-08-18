import { WeeklyGoalStats } from '@/components/dashboard/weekly-plans/weekly-goal-stats';
import { WeeklyCalendar } from '@/components/dashboard/weekly-plans/weekly-calendar';
import { TodayActivityCard } from '@/components/dashboard/weekly-plans/today-activity-card';
import { PastWeeklyPlans } from '@/components/dashboard/weekly-plans/past-weekly-plans';

export default function WeeklyPlansPage() {
  return (
    <div className="-mt-4 mx-auto w-full max-w-[1529px] space-y-6">
      <WeeklyGoalStats />

      <div className="grid gap-6 min-[1200px]:grid-cols-[1.5fr_1fr]">
        <WeeklyCalendar />
        <div className="flex flex-col gap-6">
          <TodayActivityCard />
        </div>
      </div>

      <PastWeeklyPlans />
    </div>
  );
}
