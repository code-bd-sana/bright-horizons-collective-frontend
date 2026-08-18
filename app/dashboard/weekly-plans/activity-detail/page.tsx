import { ActivityHero } from '@/components/dashboard/activity-detail/activity-hero';
import { ActivityOverview } from '@/components/dashboard/activity-detail/activity-overview';
import { MaterialsNeeded } from '@/components/dashboard/activity-detail/materials-needed';
import { StepByStepInstructions } from '@/components/dashboard/activity-detail/step-by-step';
import { ActivityModifications } from '@/components/dashboard/activity-detail/activity-modifications';
import { ActivitySidebar } from '@/components/dashboard/activity-detail/activity-sidebar';

export default function ActivityDetailPage() {
  return (
    <div className="flex flex-col gap-[32px] w-full max-w-[1063px] mx-auto pb-12">
      {/* Top Card: Hero & Overview */}
      <div className="bg-white border border-[var(--border\/300,#e8ebe8)] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-[32px] flex flex-col gap-[32px] w-full">
        <ActivityHero />
        <ActivityOverview />
      </div>

      {/* Two Column Layout */}
      <div className="flex gap-[24px] w-full items-start">
        {/* Main Content Column (Left) */}
        <div className="flex flex-col gap-[24px] w-full max-w-[752px] flex-1">
          <MaterialsNeeded />
          <StepByStepInstructions />
          <ActivityModifications />
        </div>

        {/* Sidebar Column (Right) */}
        <div className="shrink-0 w-[287px]">
          <ActivitySidebar />
        </div>
      </div>
    </div>
  );
}
