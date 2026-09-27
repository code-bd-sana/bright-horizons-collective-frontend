'use client';

import {
  ArrowLeft,
  Calendar,
  ClipboardList,
  Edit3,
  Loader2,
  RotateCcw,
  Tag,
  UsersRound,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  CATEGORY_BACKEND_TO_UI,
  useAdminWeeklyPlan,
  usePublishWeeklyPlan,
  useWeeklyPlanFormStore,
  type BackendWeeklyPlanDetail,
} from '@/features/weekly-plans';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const;

type DetailStatProps = {
  icon?: typeof UsersRound;
  label: string;
  value: string;
  emphasized?: boolean;
};

function DetailCard({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-w-0 rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:p-5 2xl:p-6">
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
        className={`mt-1 font-manrope text-sm font-semibold leading-5.25 ${
          emphasized ? 'text-[#2f7d7e]' : 'text-[#263238]'
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function PlanHeader({ plan }: { plan: BackendWeeklyPlanDetail }) {
  const router = useRouter();
  const formStore = useWeeklyPlanFormStore();
  const publishMutation = usePublishWeeklyPlan();

  const status =
    plan.status === 'PUBLISHED' ? 'Published' : plan.status === 'DRAFT' ? 'Draft' : 'Archived';
  const statusClass =
    status === 'Published'
      ? 'bg-[#edf6f2] text-[#4caf50]'
      : status === 'Draft'
        ? 'bg-[#fff8e1] text-[#b8860b]'
        : 'bg-[#fce9e3] text-[#916d5f]';

  const tier = plan.accessLevels?.includes('PERSONALIZED_PATHWAYS')
    ? 'Personalized Pathways'
    : plan.accessLevels?.includes('GROW_TOGETHER')
      ? 'Grow Together'
      : 'Little Steps';

  const category =
    plan.customCategory ||
    (plan.category ? (CATEGORY_BACKEND_TO_UI[plan.category] ?? plan.category) : 'Sensory Play');

  const handleEdit = () => {
    formStore.populateFromPlan(plan);
    router.push('/dashboard/admin/weekly-plans/create');
  };

  const handlePublish = async () => {
    try {
      await publishMutation.mutateAsync(plan.id);
      toast.success(`“${plan.title}” has been published.`);
    } catch {
      toast.error('Failed to publish weekly plan.');
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => router.push('/dashboard/admin/weekly-plans')}
        className="flex items-center gap-1.5 font-manrope text-sm font-medium leading-5 text-[#607d8b] transition-colors hover:text-[#2f7d7e]"
      >
        <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.5} />
        Back to Weekly Plans
      </button>

      <DetailCard>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="font-nunito text-2xl font-bold leading-9 text-[#263238]">
              {plan.title}
            </h1>
            <div className="mt-3 flex flex-wrap gap-2">
              <span
                className={`rounded-full px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 ${statusClass}`}
              >
                {status}
              </span>
              <span className="rounded-full bg-[#edf6f2] px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 text-[#2f7d7e]">
                {tier}
              </span>
              <span className="rounded-full bg-[rgba(47,125,126,0.06)] px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 text-[#2f7d7e]">
                {category}
              </span>
              <span className="rounded-full bg-[#eef2f2] px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 text-[#607d8b]">
                Week {plan.weekNumber ?? 1}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:shrink-0 2xl:shrink-0">
            {plan.status === 'ARCHIVED' && (
              <button
                type="button"
                onClick={handlePublish}
                disabled={publishMutation.isPending}
                className="flex h-10 items-center justify-center gap-2 rounded-[14px] bg-[#2f7d7e] px-4 font-manrope text-sm font-semibold text-white transition-colors hover:bg-[#266b6c] disabled:opacity-50"
              >
                {publishMutation.isPending ? (
                  <Loader2 aria-hidden="true" size={15} className="animate-spin" />
                ) : (
                  <RotateCcw aria-hidden="true" size={15} strokeWidth={1.6} />
                )}
                Publish Plan
              </button>
            )}
            <button
              type="button"
              onClick={handleEdit}
              className={`flex h-10 items-center justify-center gap-2 rounded-[14px] px-4 font-manrope text-sm font-semibold transition-colors ${
                plan.status === 'ARCHIVED'
                  ? 'border border-[#cfe0e0] bg-[#e9f1ee] text-[#2f7d7e] hover:bg-[#dcefe7]'
                  : 'bg-[#2f7d7e] text-white hover:bg-[#266b6c]'
              }`}
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

function OverviewCard({ plan }: { plan: BackendWeeklyPlanDetail }) {
  const category =
    plan.customCategory ||
    (plan.category ? (CATEGORY_BACKEND_TO_UI[plan.category] ?? plan.category) : 'Sensory Play');
  const ageRange =
    plan.minAgeMonths !== undefined && plan.maxAgeMonths !== undefined
      ? `${plan.minAgeMonths}–${plan.maxAgeMonths} mo`
      : 'All ages';

  return (
    <DetailCard>
      <h2 className="font-nunito text-lg font-bold leading-7 text-[#263238]">Overview</h2>
      <p className="mt-4 font-manrope text-[15px] leading-[25.5px] text-[#607d8b]">
        {plan.description ||
          'A structured weekly plan of developmental activities designed to build motor, sensory, and cognitive skills.'}
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
        <DetailStat icon={UsersRound} label="Age Range" value={ageRange} />
        <DetailStat icon={Tag} label="Category" value={category} />
        <DetailStat
          icon={ClipboardList}
          label="Activities"
          value={`${plan.activities?.length ?? 0} activities`}
        />
      </div>
    </DetailCard>
  );
}

function WeeklyScheduleCard({ plan }: { plan: BackendWeeklyPlanDetail }) {
  const activitiesByDay: Record<string, BackendWeeklyPlanDetail['activities']> = {};
  for (const day of DAYS) {
    activitiesByDay[day] = [];
  }
  for (const act of plan.activities ?? []) {
    if (act.day && activitiesByDay[act.day]) {
      activitiesByDay[act.day].push(act);
    }
  }

  return (
    <DetailCard>
      <h2 className="font-nunito text-lg font-bold leading-7 text-[#263238]">Weekly Schedule</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-5 2xl:grid-cols-5">
        {DAYS.map((day) => {
          const items = activitiesByDay[day] ?? [];

          return (
            <div
              key={day}
              className="min-h-24 rounded-[14px] border border-[#e7eceb] bg-[#f4f8f6] p-3"
            >
              <p className="font-nunito text-[13px] font-bold leading-[19.5px] text-[#2f7d7e]">
                {day}
              </p>
              {items.length === 0 ? (
                <p className="mt-2 font-manrope text-xs italic text-[#9aa8ae]">Rest day</p>
              ) : (
                <div className="mt-2 space-y-1.5">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-start gap-1.5">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-[#2f7d7e]" />
                      <Link
                        href={`/dashboard/admin/activities-library/${item.activity.id}`}
                        className="font-manrope text-xs font-medium leading-4 text-[#263238] transition-colors hover:text-[#2f7d7e]"
                      >
                        {item.activity.title}
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </DetailCard>
  );
}

function AssignmentInformationCard({ plan }: { plan: BackendWeeklyPlanDetail }) {
  const updatedDate = plan.updatedAt
    ? new Date(plan.updatedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recently';

  const createdDate = plan.createdAt
    ? new Date(plan.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Recently';

  return (
    <DetailCard>
      <h2 className="font-nunito text-lg font-bold leading-7 text-[#263238]">Plan Information</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
        <DetailStat icon={Calendar} label="Created Date" value={createdDate} />
        <DetailStat icon={Calendar} label="Last Updated" value={updatedDate} emphasized />
        <DetailStat icon={ClipboardList} label="Status" value={plan.status} />
      </div>
    </DetailCard>
  );
}

export function WeeklyPlanDetailsPage({ planId }: { planId: string }) {
  const router = useRouter();
  const { data: plan, isLoading, error } = useAdminWeeklyPlan(planId);

  if (isLoading) {
    return (
      <section className="mx-auto flex min-h-96 w-full max-w-224.75 flex-col items-center justify-center py-20 text-[#607d8b]">
        <Loader2 className="size-8 animate-spin text-[#2f7d7e]" />
        <p className="mt-3 font-manrope text-sm font-medium">Loading weekly plan details...</p>
      </section>
    );
  }

  if (error || !plan) {
    return (
      <section className="mx-auto w-full max-w-224.75 py-12 text-center text-[#263238]">
        <p className="font-nunito text-xl font-bold">Weekly plan not found.</p>
        <button
          type="button"
          onClick={() => router.push('/dashboard/admin/weekly-plans')}
          className="mt-4 rounded-[14px] bg-[#2f7d7e] px-5 py-2.5 font-manrope text-sm font-semibold text-white"
        >
          Back to Weekly Plans
        </button>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full min-w-0 max-w-224.75 pb-8 text-[#263238]">
      <div className="space-y-6">
        <PlanHeader plan={plan} />
        <OverviewCard plan={plan} />
        <WeeklyScheduleCard plan={plan} />
        <AssignmentInformationCard plan={plan} />
      </div>
    </section>
  );
}
