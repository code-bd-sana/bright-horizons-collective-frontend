import { AllPlansHeader } from '@/components/dashboard/weekly-plans/all/all-plans-header';
import { PlanCard } from '@/components/dashboard/weekly-plans/all/plan-card';
import { PlanSection } from '@/components/dashboard/weekly-plans/all/plan-section';
import Link from 'next/link';

export default function AllWeeklyPlansPage() {
  const currentWeeks = [
    {
      id: 1,
      weekNumber: 1,
      status: 'active',
      progress: 0,
      title: 'Sensory Exploration',
      progressTextOverride: '0/7 days · 100%',
    },
    {
      id: 2,
      weekNumber: 1,
      status: 'completed',
      progress: 7,
      title: 'Sensory Exploration',
      progressTextOverride: '7/7 days · 100%',
    },
    {
      id: 3,
      weekNumber: 1,
      status: 'completed',
      progress: 7,
      title: 'Sensory Exploration',
      progressTextOverride: '7/7 days · 100%',
    },
    {
      id: 4,
      weekNumber: 1,
      status: 'completed',
      progress: 7,
      title: 'Sensory Exploration',
      progressTextOverride: '7/7 days · 100%',
    },
  ];

  const upcomingWeeks = [
    {
      id: 5,
      weekNumber: 1,
      status: 'upcoming',
      progress: 7,
      title: 'Sensory Exploration',
      progressTextOverride: '7/7 days · 100%',
    },
    {
      id: 6,
      weekNumber: 1,
      status: 'upcoming',
      progress: 7,
      title: 'Sensory Exploration',
      progressTextOverride: '7/7 days · 100%',
    },
    {
      id: 7,
      weekNumber: 1,
      status: 'upcoming',
      progress: 7,
      title: 'Sensory Exploration',
      progressTextOverride: '7/7 days · 100%',
    },
    {
      id: 8,
      weekNumber: 1,
      status: 'upcoming',
      progress: 7,
      title: 'Sensory Exploration',
      progressTextOverride: '7/7 days · 100%',
    },
  ];

  const previousWeeks = [
    {
      id: 9,
      weekNumber: 1,
      status: 'completed',
      progress: 6,
      title: 'Sensory Exploration',
      progressTextOverride: '6/7 days · 100%',
    },
    {
      id: 10,
      weekNumber: 1,
      status: 'completed',
      progress: 6,
      title: 'Sensory Exploration',
      progressTextOverride: '6/7 days · 100%',
    },
    {
      id: 11,
      weekNumber: 1,
      status: 'completed',
      progress: 7,
      title: 'Sensory Exploration',
      progressTextOverride: '7/7 days · 100%',
    },
    {
      id: 12,
      weekNumber: 1,
      status: 'completed',
      progress: 7,
      title: 'Sensory Exploration',
      progressTextOverride: '7/7 days · 100%',
    },
    {
      id: 13,
      weekNumber: 1,
      status: 'completed',
      progress: 7,
      title: 'Sensory Exploration',
      progressTextOverride: '7/7 days · 100%',
    },
    {
      id: 14,
      weekNumber: 1,
      status: 'completed',
      progress: 7,
      title: 'Sensory Exploration',
      progressTextOverride: '7/7 days · 100%',
    },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col items-center pb-[100px]">
      <div className="flex w-full max-w-[1529px] flex-col gap-10 lg:gap-14">
        {/* Top Breadcrumb & Header */}
        <div className="flex flex-col gap-10">
          <div className="flex items-center gap-[8px]">
            <Link
              href="/dashboard/weekly-plans"
              className="font-['Nunito'] font-medium text-[12px] leading-[16px] text-[#2f7d7e]"
            >
              Weekly Plans
            </Link>
            <span className="font-['Nunito'] font-medium text-[12px] leading-[16px] text-[color:var(--text-primary\/200,#8f9b99)]">
              /
            </span>
            <span className="font-['Nunito'] font-medium text-[12px] leading-[16px] text-[#263238]">
              All Weekly Plans
            </span>
          </div>
          <AllPlansHeader />
        </div>

        <div className="flex w-full flex-col gap-4 rounded-[16px] border border-[#e8ebe8] bg-white p-4 sm:p-6 lg:gap-6 lg:p-[32px]">
          <PlanSection title="Current Weeks">
            {currentWeeks.map((plan) => (
              <PlanCard
                key={plan.id}
                status={plan.status as 'active' | 'completed' | 'upcoming'}
                weekNumber={plan.weekNumber}
                title={plan.title}
                dateRange="Jun 29 – Jul 5"
                progress={plan.progress}
                totalDays={7}
                imageSrc="/weekly-plans/plan-image.png"
                progressTextOverride={plan.progressTextOverride}
              />
            ))}
          </PlanSection>
        </div>

        <div className="flex w-full flex-col gap-4 rounded-[16px] border border-[#e8ebe8] p-4 sm:p-6 lg:gap-6 lg:p-[32px]">
          <PlanSection title="Upcoming Weeks">
            {upcomingWeeks.map((plan) => (
              <PlanCard
                key={plan.id}
                status={plan.status as 'active' | 'completed' | 'upcoming'}
                weekNumber={plan.weekNumber}
                title={plan.title}
                dateRange="Jun 29 – Jul 5"
                progress={plan.progress}
                totalDays={7}
                imageSrc="/weekly-plans/plan-image.png"
                progressTextOverride={plan.progressTextOverride}
              />
            ))}
          </PlanSection>
        </div>

        <div className="flex w-full flex-col gap-4 rounded-[16px] border border-[#e8ebe8] p-4 sm:p-6 lg:gap-6 lg:p-[32px]">
          <PlanSection title="Previous Weekly Plan">
            {previousWeeks.map((plan) => (
              <PlanCard
                key={plan.id}
                status={plan.status as 'active' | 'completed' | 'upcoming'}
                weekNumber={plan.weekNumber}
                title={plan.title}
                dateRange="Jun 29 – Jul 5"
                progress={plan.progress}
                totalDays={7}
                imageSrc="/weekly-plans/plan-image.png"
                progressTextOverride={plan.progressTextOverride}
              />
            ))}
          </PlanSection>
        </div>
      </div>
    </div>
  );
}
