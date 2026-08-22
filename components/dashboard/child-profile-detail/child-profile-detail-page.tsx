import { ActivityPanel } from './activity-panel';
import { DevelopmentProgressPanel, RecentActivityPanel } from './development-panels';
import { RecommendationsPanel } from './recommendations-panel';
import { WeeklyPlanPanel } from './weekly-plan-panel';

export function ChildProfileDetailPage() {
  return (
    <div className="mx-auto w-full max-w-382.25">
      <div className="mt-4 grid gap-4 sm:mt-6 xl:grid-cols-2">
        <WeeklyPlanPanel />
        <ActivityPanel />
        <DevelopmentProgressPanel />
        <RecentActivityPanel />
      </div>
      <div className="mt-6">
        <RecommendationsPanel />
      </div>
    </div>
  );
}
