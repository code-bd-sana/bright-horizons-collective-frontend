import { ActivityHero } from '@/components/dashboard/activity-detail/activity-hero';
import { ActivityOverview } from '@/components/dashboard/activity-detail/activity-overview';
import { MaterialsNeeded } from '@/components/dashboard/activity-detail/materials-needed';
import { StepByStepInstructions } from '@/components/dashboard/activity-detail/step-by-step';
import { ActivityModifications } from '@/components/dashboard/activity-detail/activity-modifications';
import { ActivitySidebar } from '@/components/dashboard/activity-detail/activity-sidebar';
import Link from 'next/link';

export default function ActivityDetailPage() {
  return (
    <div className="mx-auto flex w-full max-w-265.75 min-w-0 flex-col gap-6 pb-12 2xl:gap-8">
      <nav aria-label="Breadcrumb" className="flex min-h-5.5 flex-wrap items-center gap-1.5">
        <Link
          href="/dashboard/weekly-plans"
          className="font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#2f7d7e]"
        >
          Weekly Plans
        </Link>
        <span className="font-manrope text-lg leading-6.75 tracking-[-0.27px] text-[#d8ddd9]">
          /
        </span>
        <span className="font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#263238]">
          Animal Yoga Adventure
        </span>
      </nav>

      {/* Top Card: Hero & Overview */}
      <div className="flex w-full min-w-0 flex-col gap-6 rounded-2xl border border-(--border\/300,#e8ebe8) bg-white p-4 shadow-[0_1px_1px_rgba(0,0,0,0.05)] sm:p-6 2xl:gap-8 2xl:p-8">
        <ActivityHero />
        <ActivityOverview />
      </div>

      {/* Two Column Layout */}
      <div className="flex w-full min-w-0 flex-col items-start gap-6 min-[1600px]:flex-row">
        {/* Main Content Column (Left) */}
        <div className="flex w-full min-w-0 flex-1 flex-col gap-6 min-[1600px]:max-w-188">
          <MaterialsNeeded />
          <StepByStepInstructions />
          <ActivityModifications />
        </div>

        {/* Sidebar Column (Right) */}
        <div className="w-full shrink-0 min-[1600px]:w-71.75">
          <ActivitySidebar />
        </div>
      </div>
    </div>
  );
}
