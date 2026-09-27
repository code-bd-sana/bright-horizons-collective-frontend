'use client';

import { ArrowLeft, ChevronDown, Plus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { useWeeklyPlanFormStore, type SelectedActivity } from '@/features/weekly-plans';
import { WeeklyPlanFormStepper } from './weekly-plan-form-stepper';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const;

function DayScheduleCard({
  day,
  assignedActivities,
  availableActivities,
  onAssign,
  onRemove,
}: {
  day: string;
  assignedActivities: SelectedActivity[];
  availableActivities: SelectedActivity[];
  onAssign: (day: string, activityId: string) => void;
  onRemove: (day: string, activityId: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const isFilled = assignedActivities.length >= 1;

  return (
    <div className="relative flex min-h-36 flex-col gap-2 rounded-[14px] border border-[#e7eceb] bg-[#f4f8f6] p-3">
      <div className="flex items-center justify-between">
        <p className="font-nunito text-sm font-bold leading-5 text-[#2f7d7e]">{day}</p>
        <span className="font-manrope text-[11px] font-semibold text-[#607d8b]">
          {isFilled ? '1 activity' : 'No activity'}
        </span>
      </div>

      <div className="flex-1 space-y-1.5">
        {!isFilled ? (
          <p className="py-2 text-center font-manrope text-xs italic text-[#9aa8ae]">
            No activity scheduled
          </p>
        ) : (
          assignedActivities.map((act) => (
            <div
              key={act.id}
              className="flex items-center gap-1.5 rounded-[10px] border border-[#e7eceb] bg-white px-2.5 py-1.75 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
            >
              <span className="size-1.5 shrink-0 rounded-full bg-[#2f7d7e]" />
              <span className="min-w-0 flex-1 truncate font-manrope text-xs font-medium text-[#263238]">
                {act.title}
              </span>
              <button
                type="button"
                aria-label={`Remove ${act.title} from ${day}`}
                onClick={() => onRemove(day, act.id)}
                className="shrink-0 rounded p-0.5 text-[#607d8b] hover:bg-[#f4f8f6] hover:text-[#d32f2f]"
              >
                <X aria-hidden="true" className="size-3" strokeWidth={2} />
              </button>
            </div>
          ))
        )}
      </div>

      {!isFilled ? (
        <div className="relative pt-1">
          <button
            type="button"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex h-8 w-full items-center justify-between rounded-[10px] border border-dashed border-[rgba(47,125,126,0.25)] bg-[rgba(47,125,126,0.06)] px-2.5 font-nunito text-xs font-semibold text-[#2f7d7e] transition-colors hover:bg-[rgba(47,125,126,0.12)]"
          >
            <span className="flex items-center gap-1">
              <Plus size={13} strokeWidth={2} />
              Add activity
            </span>
            <ChevronDown
              aria-hidden="true"
              className={`size-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              strokeWidth={1.8}
            />
          </button>

          {isOpen ? (
            <div className="absolute bottom-[calc(100%+4px)] left-0 right-0 z-30 max-h-48 overflow-y-auto rounded-xl border border-[#e8ebe8] bg-white p-1.5 shadow-[0_8px_16px_rgba(38,50,56,0.14)]">
              {availableActivities.length === 0 ? (
                <div className="p-2.5 text-center font-manrope text-xs text-[#607d8b]">
                  All selected activities are already assigned. Unassign from another day to add
                  here.
                </div>
              ) : (
                availableActivities.map((act) => (
                  <button
                    key={act.id}
                    type="button"
                    onClick={() => {
                      onAssign(day, act.id);
                      setIsOpen(false);
                      toast.success(`“${act.title}” scheduled for ${day}.`);
                    }}
                    className="flex min-h-8 w-full items-center rounded-lg px-2.5 py-1.5 text-left font-manrope text-xs font-medium text-[#263238] transition-colors hover:bg-[#edf6f2] hover:text-[#2f7d7e]"
                  >
                    <span className="truncate">{act.title}</span>
                  </button>
                ))
              )}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export function WeeklyPlanSchedulePage() {
  const router = useRouter();
  const formStore = useWeeklyPlanFormStore();

  const selectedActivities = formStore.selectedActivities;
  const schedule = formStore.schedule;

  // Set of all activity IDs assigned to ANY day
  const assignedActivityIds = useMemo(() => {
    return new Set(Object.values(schedule).flat());
  }, [schedule]);

  // Activities from Step 2 not yet assigned to any day
  const availableActivities = useMemo(() => {
    return selectedActivities.filter((act) => !assignedActivityIds.has(act.id));
  }, [selectedActivities, assignedActivityIds]);

  const handleNext = () => {
    if (selectedActivities.length > 0 && assignedActivityIds.size === 0) {
      toast.error('Please assign at least one activity to the schedule.');
      return;
    }
    router.push('/dashboard/admin/weekly-plans/create/membership');
  };

  return (
    <section className="mx-auto w-full min-w-0 max-w-246.75 pb-8 text-[#263238]">
      <div className="w-full min-w-0 max-w-244.25 space-y-5">
        <button
          type="button"
          onClick={() => router.push('/dashboard/admin/weekly-plans')}
          className="flex items-center gap-1.5 font-manrope text-sm font-medium leading-5 text-[#607d8b] transition-colors hover:text-[#2f7d7e]"
        >
          <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.5} />
          Back to Weekly Plans
        </button>

        <h1 className="font-nunito text-2xl font-bold leading-9 text-[#263238]">
          {formStore.editingPlanId ? 'Edit Weekly Plan' : 'Create Weekly Plans'}
        </h1>

        <section className="overflow-x-auto rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)]">
          <WeeklyPlanFormStepper currentStep={3} />
        </section>

        <section className="rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:p-6 2xl:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-nunito text-lg font-bold leading-7 text-[#263238]">3. Schedule</h2>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#edf6f2] px-3 py-1 font-manrope text-xs font-semibold text-[#2f7d7e]">
                {assignedActivityIds.size} / {selectedActivities.length} assigned
              </span>
              {availableActivities.length > 0 ? (
                <span className="rounded-full bg-[#fff8e1] px-3 py-1 font-manrope text-xs font-semibold text-[#ca8a04]">
                  {availableActivities.length} unassigned
                </span>
              ) : null}
            </div>
          </div>

          <div className="mt-4 space-y-4">
            <p className="font-manrope text-sm leading-5.25 text-[#607d8b]">
              Assign selected activities to days Monday–Friday. Each day can have only one activity,
              and each activity can be scheduled on only one day.
            </p>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5 2xl:grid-cols-5">
              {DAYS.map((day) => {
                const dayActivityIds = schedule[day] ?? [];
                const assigned = dayActivityIds
                  .map((id) => selectedActivities.find((a) => a.id === id))
                  .filter(Boolean) as SelectedActivity[];

                return (
                  <DayScheduleCard
                    key={day}
                    day={day}
                    assignedActivities={assigned}
                    availableActivities={availableActivities}
                    onAssign={formStore.assignActivityToDay}
                    onRemove={formStore.removeActivityFromDay}
                  />
                );
              })}
            </div>
          </div>
        </section>

        <section className="flex items-center justify-between rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:p-5 2xl:p-5">
          <button
            type="button"
            onClick={() => router.push('/dashboard/admin/weekly-plans/create/activities')}
            className="flex h-10.5 items-center justify-center rounded-[14px] border border-[#e7eceb] px-5 font-manrope text-sm font-semibold text-[#607d8b] transition-colors hover:bg-[#f4f8f6]"
          >
            ← Previous
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="flex h-10.5 items-center justify-center rounded-[14px] bg-[#2f7d7e] px-6 font-manrope text-sm font-semibold text-white transition-colors hover:bg-[#266b6c]"
          >
            Next →
          </button>
        </section>
      </div>
    </section>
  );
}
