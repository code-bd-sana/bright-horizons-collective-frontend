'use client';

import { ArrowLeft, ArrowRight, ClipboardList, Clock3, Edit3, Tag, UsersRound } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { adminWeeklyPlans, type AdminWeeklyPlan } from './weekly-plans-data';

type DetailStatProps = {
  icon?: typeof UsersRound;
  label: string;
  value: string;
  emphasized?: boolean;
};

const schedule = [
  ['Monday', 'Color Sorting Sensory Play'],
  ['Tuesday', 'Sensory Bin: Kinetic Sand'],
  ['Wednesday', 'Color Sorting Sensory Play'],
  ['Thursday', 'Animal Sound Story'],
  ['Friday', 'Sensory Bin: Kinetic Sand'],
];

function DetailCard({ children }: { children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-[#e7eceb] bg-white p-6 shadow-[0_4px_6px_rgba(0,0,0,0.06)]">
      {children}
    </section>
  );
}

function DetailStat({ icon: Icon, label, value, emphasized = false }: DetailStatProps) {
  return (
    <div className="rounded-[14px] bg-[#f4f8f6] p-3">
      <p className="flex items-center gap-1.5 font-manrope text-[11px] font-semibold uppercase tracking-[0.55px] text-[#607d8b]">
        {Icon ? <Icon aria-hidden="true" size={13} strokeWidth={1.5} /> : null}
        {label}
      </p>
      <p
        className={`mt-1 font-manrope text-sm font-semibold leading-5.25 ${emphasized ? 'text-[#2f7d7e]' : 'text-[#263238]'}`}
      >
        {value}
      </p>
    </div>
  );
}

function PlanHeader({ plan }: { plan: AdminWeeklyPlan }) {
  const router = useRouter();
  const planTitle = plan.title.replace(/ — Week \d+$/, '');
  const statusClass =
    plan.status === 'Published'
      ? 'bg-[#edf6f2] text-[#4caf50]'
      : plan.status === 'Draft'
        ? 'bg-[#fff8e1] text-[#b8860b]'
        : 'bg-[#fce9e3] text-[#916d5f]';

  return (
    <>
      <button
        type="button"
        onClick={() => router.push('/dashboard/admin/weekly-plans')}
        className="flex items-center gap-1.5 font-manrope text-sm font-medium leading-5 text-[#607d8b]"
      >
        <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.5} />
        Back to Weekly Plans
      </button>
      <DetailCard>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="font-nunito text-2xl font-bold leading-9 text-[#263238]">{planTitle}</h1>
            <div className="mt-3 flex flex-wrap gap-2">
              <span
                className={`rounded-full px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 ${statusClass}`}
              >
                {plan.status}
              </span>
              <span className="rounded-full bg-[#edf6f2] px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 text-[#2f7d7e]">
                {plan.membership}
              </span>
              <span className="rounded-full bg-[rgba(47,125,126,0.06)] px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 text-[#2f7d7e]">
                Sensory Play
              </span>
              <span className="rounded-full bg-[#eef2f2] px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 text-[#607d8b]">
                {plan.week}
              </span>
            </div>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => toast.success('Plan assignment is ready.')}
              className="flex h-10 items-center gap-2 rounded-[14px] border border-[rgba(47,125,126,0.19)] bg-[rgba(47,125,126,0.08)] px-4 font-manrope text-sm font-semibold text-[#2f7d7e]"
            >
              <ClipboardList aria-hidden="true" size={15} strokeWidth={1.6} />
              Assign
            </button>
            <button
              type="button"
              onClick={() => toast.success('Plan editor is ready.')}
              className="flex h-10 items-center gap-2 rounded-[14px] bg-[#2f7d7e] px-4 font-manrope text-sm font-semibold text-white"
            >
              <Edit3 aria-hidden="true" size={15} strokeWidth={1.6} />
              Edit Plan
            </button>
          </div>
        </div>
      </DetailCard>
    </>
  );
}

function OverviewCard({ plan }: { plan: AdminWeeklyPlan }) {
  return (
    <DetailCard>
      <h2 className="font-nunito text-lg font-bold leading-7 text-[#263238]">Overview</h2>
      <p className="mt-4 font-manrope text-[15px] leading-[25.5px] text-[#607d8b]">
        A structured week of sensory-play activities building early color and texture recognition
        for infants and young toddlers.
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DetailStat icon={UsersRound} label="Age Group" value={plan.age} />
        <DetailStat icon={Tag} label="Category" value="Sensory Play" />
        <DetailStat
          icon={ClipboardList}
          label="Activities"
          value={`${plan.activities} activities`}
        />
        <DetailStat icon={Clock3} label="Est. Duration" value="~100 min/week" />
      </div>
    </DetailCard>
  );
}

function WeeklyScheduleCard() {
  return (
    <DetailCard>
      <h2 className="font-nunito text-lg font-bold leading-7 text-[#263238]">Weekly Schedule</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {schedule.map(([day, activity]) => (
          <div
            key={day}
            className="min-h-16.5 rounded-[14px] border border-[#e7eceb] bg-[#f4f8f6] p-3"
          >
            <p className="font-nunito text-[13px] font-bold leading-[19.5px] text-[#2f7d7e]">
              {day}
            </p>
            <div className="mt-2 flex items-start gap-2">
              <span className="mt-1.25 size-1.5 shrink-0 rounded-full bg-[#2f7d7e]" />
              <p className="font-manrope text-xs leading-[15.6px] text-[#263238]">{activity}</p>
            </div>
          </div>
        ))}
      </div>
    </DetailCard>
  );
}

function AssignmentInformationCard({ plan }: { plan: AdminWeeklyPlan }) {
  return (
    <DetailCard>
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-nunito text-lg font-bold leading-7 text-[#263238]">
          Assignment Information
        </h2>
        <button
          type="button"
          onClick={() => toast.success('Assignment history is ready.')}
          className="flex shrink-0 items-center gap-1 font-manrope text-sm font-semibold leading-5 text-[#2f7d7e]"
        >
          View History
          <ArrowRight aria-hidden="true" size={14} strokeWidth={1.6} />
        </button>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DetailStat label="Families Assigned" value={plan.assigned} emphasized />
        <DetailStat label="Children Assigned" value="38 children" emphasized />
        <DetailStat label="Created By" value="Sarah K." />
        <DetailStat label="Last Updated" value="Apr 3, 2025" />
      </div>
    </DetailCard>
  );
}

export function WeeklyPlanDetailsPage({ planId }: { planId: string }) {
  const plan = adminWeeklyPlans.find((item) => item.id === Number(planId)) ?? adminWeeklyPlans[0];

  return (
    <section className="mx-auto w-full max-w-224.75 pb-8 text-[#263238]">
      <div className="space-y-6">
        <PlanHeader plan={plan} />
        <OverviewCard plan={plan} />
        <WeeklyScheduleCard />
        <AssignmentInformationCard plan={plan} />
      </div>
    </section>
  );
}
