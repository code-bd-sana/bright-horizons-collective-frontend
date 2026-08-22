import { ActivityHero } from '@/components/dashboard/activity-detail/activity-hero';
import { ActivityOverview } from '@/components/dashboard/activity-detail/activity-overview';
import { MaterialsNeeded } from '@/components/dashboard/activity-detail/materials-needed';
import { StepByStepInstructions } from '@/components/dashboard/activity-detail/step-by-step';
import { ActivityModifications } from '@/components/dashboard/activity-detail/activity-modifications';
import { ActivitySidebar } from '@/components/dashboard/activity-detail/activity-sidebar';
import Link from 'next/link';

export default function ActivityDetailPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1063px] flex-col gap-6 pb-12 lg:gap-8">
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
          Animal Yoga Adventure
        </span>
      </nav>

      {/* Top Card: Hero & Overview */}
      <div className="flex w-full flex-col gap-6 rounded-[16px] border border-[var(--border\/300,#e8ebe8)] bg-white p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] sm:p-6 lg:gap-8 lg:p-8">
        <ActivityHero />
        <ActivityOverview />
      </div>

      {/* Two Column Layout */}
      <div className="flex w-full flex-col items-start gap-6 lg:flex-row">
        {/* Main Content Column (Left) */}
        <div className="flex w-full max-w-[752px] flex-1 flex-col gap-6 max-lg:max-w-none">
          <MaterialsNeeded />
          <StepByStepInstructions />
          <ActivityModifications />
        </div>

        {/* Sidebar Column (Right) */}
        <div className="w-full shrink-0 lg:w-[287px]">
          <ActivitySidebar />
        </div>
      </div>
    </div>
  );
}
