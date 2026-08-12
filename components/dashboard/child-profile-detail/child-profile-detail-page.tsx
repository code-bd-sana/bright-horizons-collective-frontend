import { ActivityPanel } from './activity-panel';
import { DevelopmentProgressPanel, RecentActivityPanel } from './development-panels';
import { ProfileHeader } from './profile-header';
import { RecommendationsPanel } from './recommendations-panel';
import type { ChildDetail } from './types';
import { WeeklyPlanPanel } from './weekly-plan-panel';

export function ChildProfileDetailPage({ child }: { child: ChildDetail }) {
  return (
    <section className="mx-auto w-full max-w-382.25">
      <ProfileHeader child={child} />
      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        <WeeklyPlanPanel />
        <ActivityPanel />
        <DevelopmentProgressPanel />
        <RecentActivityPanel />
      </div>
      <div className="mt-6">
        <RecommendationsPanel />
      </div>
    </section>
  );
}
