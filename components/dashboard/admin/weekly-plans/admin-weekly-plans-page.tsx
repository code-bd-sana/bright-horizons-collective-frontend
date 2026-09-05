'use client';
import { Plus, UserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { adminWeeklyPlans, type AdminWeeklyPlan, type PlanStatus } from './weekly-plans-data';
import { WeeklyPlanConfirmationModal } from './weekly-plan-confirmation-modal';
import { WeeklyPlanFilters } from './weekly-plan-filters';
import { WeeklyPlansSummary } from './weekly-plans-summary';
import { WeeklyPlansTable } from './weekly-plans-table';

export function AdminWeeklyPlansPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [membership, setMembership] = useState('all');
  const [age, setAge] = useState('all');
  const [status, setStatus] = useState('all');
  const [confirmation, setConfirmation] = useState<{
    action: 'archive' | 'delete';
    plan: AdminWeeklyPlan;
  } | null>(null);
  const plans = useMemo(
    () =>
      adminWeeklyPlans.filter(
        (plan) =>
          (membership === 'all' || plan.membership === membership) &&
          (age === 'all' || plan.age === age) &&
          (status === 'all' || plan.status === (status as PlanStatus)) &&
          (!search || `${plan.title} ${plan.week}`.toLowerCase().includes(search.toLowerCase()))
      ),
    [age, membership, search, status]
  );
  return (
    <section className="mx-auto w-full max-w-383.5 pb-8 text-[#263238]">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-nunito text-[32px] font-medium leading-10 tracking-[-0.4px] sm:text-[40px] sm:leading-12">
            Weekly Plans
          </h1>
          <p className="mt-0.5 font-manrope text-sm leading-5.5 text-[#6c7787]">
            12 active plans · 4 therapists assigned this week
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => toast.success('Family assignment is ready.')}
            className="flex h-10 items-center gap-2 rounded-[14px] border border-[#cfe0e0] bg-[#e9f1ee] px-4 font-manrope text-sm font-semibold text-[#2f7d7e]"
          >
            <UserPlus size={15} />
            Assign
          </button>
          <button
            type="button"
            onClick={() => router.push('/dashboard/admin/weekly-plans/create')}
            className="flex h-10 items-center gap-2 rounded-[14px] bg-[#2f7d7e] px-4 font-manrope text-sm font-semibold text-white"
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
          <WeeklyPlansTable
            plans={plans}
            onAction={(action, plan) => {
              if (action === 'View') {
                router.push(`/dashboard/admin/weekly-plans/${plan.id}`);
                return;
              }

              if (action === 'Archive' || action === 'Delete') {
                setConfirmation({ action: action.toLowerCase() as 'archive' | 'delete', plan });
                return;
              }

              toast.success(`${action} is ready for “${plan.title}”.`);
            }}
          />
        </div>
      </div>
      <WeeklyPlanConfirmationModal
        action={confirmation?.action ?? null}
        plan={confirmation?.plan ?? null}
        onClose={(open) => {
          if (!open) setConfirmation(null);
        }}
        onConfirm={() => {
          if (!confirmation) return;
          toast.success(
            `“${confirmation.plan.title}” has been ${confirmation.action === 'archive' ? 'archived' : 'deleted'}.`
          );
          setConfirmation(null);
        }}
      />
    </section>
  );
}
