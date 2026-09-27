'use client';
import { Plus, UserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import {
  getAdminWeeklyPlan,
  useAdminWeeklyPlans,
  useArchiveWeeklyPlan,
  useDeleteWeeklyPlan,
  useDuplicateWeeklyPlan,
  usePublishWeeklyPlan,
  useWeeklyPlanFormStore,
} from '@/features/weekly-plans';
import { type AdminWeeklyPlan, type PlanMembership, type PlanStatus } from './weekly-plans-data';
import { WeeklyPlanConfirmationModal } from './weekly-plan-confirmation-modal';
import { WeeklyPlanFilters } from './weekly-plan-filters';
import { WeeklyPlansSummary } from './weekly-plans-summary';
import { WeeklyPlansTable } from './weekly-plans-table';

interface BackendWeeklyPlanItem {
  id: string;
  title: string;
  weekNumber?: number | null;
  minAgeMonths?: number | null;
  maxAgeMonths?: number | null;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  accessLevels?: string[];
  _count?: { activities: number; assignments: number };
  updatedAt: string;
}

export function AdminWeeklyPlansPage() {
  const router = useRouter();
  const formStore = useWeeklyPlanFormStore();
  const [search, setSearch] = useState('');
  const [membership, setMembership] = useState('all');
  const [age, setAge] = useState('all');
  const [status, setStatus] = useState('all');
  const [confirmation, setConfirmation] = useState<{
    action: 'archive' | 'delete';
    plan: AdminWeeklyPlan;
  } | null>(null);

  const { data: rawPlans } = useAdminWeeklyPlans();
  const duplicateMutation = useDuplicateWeeklyPlan();
  const archiveMutation = useArchiveWeeklyPlan();
  const deleteMutation = useDeleteWeeklyPlan();
  const publishMutation = usePublishWeeklyPlan();

  const allPlans: AdminWeeklyPlan[] = useMemo(() => {
    if (!Array.isArray(rawPlans)) return [];

    return (rawPlans as BackendWeeklyPlanItem[]).map((p) => {
      const planMembership: PlanMembership = p.accessLevels?.includes('PERSONALIZED_PATHWAYS')
        ? 'Personalized Pathways'
        : p.accessLevels?.includes('GROW_TOGETHER')
          ? 'Grow Together'
          : 'Little Steps';

      const planStatus: PlanStatus =
        p.status === 'PUBLISHED' ? 'Published' : p.status === 'DRAFT' ? 'Draft' : 'Archived';

      const ageText =
        p.minAgeMonths !== undefined &&
        p.minAgeMonths !== null &&
        p.maxAgeMonths !== undefined &&
        p.maxAgeMonths !== null
          ? `${p.minAgeMonths}–${p.maxAgeMonths} mo`
          : 'All ages';

      return {
        id: p.id,
        title: p.title,
        week: `Week ${p.weekNumber ?? 1}`,
        age: ageText,
        activities: p._count?.activities ?? 0,
        membership: planMembership,
        assigned: `${p._count?.assignments ?? 0} families`,
        status: planStatus,
        updated: new Date(p.updatedAt).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
      };
    });
  }, [rawPlans]);

  const plans = useMemo(
    () =>
      allPlans.filter(
        (plan) =>
          (membership === 'all' || plan.membership === membership) &&
          (age === 'all' || plan.age === age) &&
          (status === 'all' || plan.status === (status as PlanStatus)) &&
          (!search || `${plan.title} ${plan.week}`.toLowerCase().includes(search.toLowerCase()))
      ),
    [age, allPlans, membership, search, status]
  );

  const handleAction = async (action: string, plan: AdminWeeklyPlan) => {
    const planIdStr = String(plan.id);

    if (action === 'View') {
      router.push(`/dashboard/admin/weekly-plans/${planIdStr}`);
      return;
    }

    if (action === 'Edit') {
      try {
        const fullPlan = await getAdminWeeklyPlan(planIdStr);
        formStore.populateFromPlan(fullPlan);
        router.push('/dashboard/admin/weekly-plans/create');
      } catch {
        toast.error('Failed to load plan details for editing.');
      }
      return;
    }

    if (action === 'Copy') {
      try {
        await duplicateMutation.mutateAsync(planIdStr);
        toast.success(`“${plan.title}” copied successfully as a new draft.`);
      } catch {
        toast.error('Failed to copy weekly plan.');
      }
      return;
    }

    if (action === 'Publish') {
      try {
        await publishMutation.mutateAsync(planIdStr);
        toast.success(`“${plan.title}” has been published.`);
      } catch {
        toast.error('Failed to publish weekly plan.');
      }
      return;
    }

    if (action === 'Archive' || action === 'Delete') {
      setConfirmation({ action: action.toLowerCase() as 'archive' | 'delete', plan });
      return;
    }

    toast.success(`${action} is ready for “${plan.title}”.`);
  };

  const handleConfirmModal = async () => {
    if (!confirmation) return;
    const planIdStr = String(confirmation.plan.id);

    try {
      if (confirmation.action === 'archive') {
        await archiveMutation.mutateAsync(planIdStr);
        toast.success(`“${confirmation.plan.title}” has been archived.`);
      } else {
        await deleteMutation.mutateAsync(planIdStr);
        toast.success(`“${confirmation.plan.title}” has been deleted.`);
      }
    } catch {
      toast.error(`Failed to ${confirmation.action} weekly plan.`);
    } finally {
      setConfirmation(null);
    }
  };

  const handleCreateNew = () => {
    formStore.resetForm();
    router.push('/dashboard/admin/weekly-plans/create');
  };

  return (
    <section className="mx-auto w-full min-w-0 max-w-383.5 pb-8 text-[#263238]">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-nunito text-2xl font-medium leading-8 tracking-[-0.4px] sm:text-[32px] sm:leading-10 2xl:text-[40px] 2xl:leading-12">
            Weekly Plans
          </h1>
          <p className="mt-0.5 font-manrope text-sm leading-5.5 text-[#6c7787]">
            {allPlans.length} {allPlans.length === 1 ? 'total plan' : 'total plans'} in the system
          </p>
        </div>
        <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto 2xl:flex 2xl:w-auto">
          <button
            type="button"
            onClick={() => router.push('/dashboard/admin/weekly-plans/assign')}
            className="flex h-10 min-w-0 items-center justify-center gap-2 rounded-[14px] border border-[#cfe0e0] bg-[#e9f1ee] px-3 font-manrope text-sm font-semibold text-[#2f7d7e] sm:px-4 2xl:px-4"
          >
            <UserPlus size={15} />
            Assign
          </button>
          <button
            type="button"
            onClick={handleCreateNew}
            className="flex h-10 min-w-0 items-center justify-center gap-2 rounded-[14px] bg-[#2f7d7e] px-3 font-manrope text-sm font-semibold text-white sm:px-4 2xl:px-4"
          >
            <Plus size={15} />
            Create Plan
          </button>
        </div>
      </header>
      <div className="mt-8 space-y-8">
        <WeeklyPlansSummary />
        <div className="space-y-6">
          <WeeklyPlanFilters
            search={search}
            membership={membership}
            age={age}
            status={status}
            onSearchChange={setSearch}
            onFilterChange={(filter, value) => {
              if (filter === 'membership') setMembership(value);
              if (filter === 'age') setAge(value);
              if (filter === 'status') setStatus(value);
            }}
          />
          <WeeklyPlansTable plans={plans} onAction={handleAction} />
        </div>
      </div>
      <WeeklyPlanConfirmationModal
        action={confirmation?.action ?? null}
        plan={confirmation?.plan ?? null}
        onClose={(open) => {
          if (!open) setConfirmation(null);
        }}
        onConfirm={handleConfirmModal}
      />
    </section>
  );
}
