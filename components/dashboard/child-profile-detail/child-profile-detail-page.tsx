import { ActivityPanel } from './activity-panel';
import { DevelopmentProgressPanel, RecentActivityPanel } from './development-panels';
import { RecommendationsPanel } from './recommendations-panel';
import { WeeklyPlanPanel } from './weekly-plan-panel';

export function ChildProfileDetailPage() {
  return (
    <div className="mx-auto w-full min-w-0 max-w-382.25">
      <div className="mt-4 grid grid-cols-1 gap-4 sm:mt-6 2xl:grid-cols-2">
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
