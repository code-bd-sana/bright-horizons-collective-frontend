'use client';

import { ArrowLeft, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { AssignmentCalendar } from './assignment-calendar';
import { AssignmentStepper } from './assignment-stepper';
import { useAssignPlanStore } from './store/use-assign-plan-store';

export function AssignWeeklyPlanSettingsPage() {
  const router = useRouter();
  const {
    selectedPlan,
    selectedChildIds,
    startDate,
    endDate,
    setTimeframeFromDate,
    replaceExisting,
    setReplaceExisting,
    notes,
    setNotes,
  } = useAssignPlanStore();

  // Guard: if no plan or no children selected, redirect back
  useEffect(() => {
    if (!selectedPlan) {
      toast.error('Please select a weekly plan first.');
      router.push('/dashboard/admin/weekly-plans/assign');
    } else if (selectedChildIds.length === 0) {
      toast.error('Please select at least one child first.');
      router.push('/dashboard/admin/weekly-plans/assign/children');
    }
  }, [selectedPlan, selectedChildIds, router]);

  const formattedStart = startDate
    ? new Date(`${startDate}T00:00:00`).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  const formattedEnd = endDate
    ? new Date(`${endDate}T00:00:00`).toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  return (
    <section className="mx-auto w-full min-w-0 max-w-196.75 pb-8 text-[#263238]">
      <div className="space-y-5">
        <button
          type="button"
          onClick={() => router.push('/dashboard/admin/weekly-plans/assign/children')}
          className="flex items-center gap-1.5 font-manrope text-sm font-medium leading-5 text-[#607d8b] hover:text-[#263238]"
        >
          <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.5} />
          Back to Children Selection
        </button>

        <div>
          <h1 className="font-nunito text-2xl font-bold leading-9 text-[#263238]">
            Assign Weekly Plan
          </h1>
          <p className="mt-0.5 font-manrope text-[13px] leading-[19.5px] text-[#607d8b]">
            Assigning:{' '}
            <span className="font-semibold text-[#263238]">
              {selectedPlan?.title || 'Weekly Plan'}
            </span>
            {selectedPlan?.weekNumber ? ` — Week ${selectedPlan.weekNumber}` : ''}
          </p>
        </div>

        <section className="overflow-x-auto rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)]">
          <AssignmentStepper currentStep={4} />
        </section>

        <section className="space-y-6 rounded-2xl border border-[#e7eceb] bg-white p-5 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:p-6">
          <div>
            <h2 className="font-nunito text-lg font-bold leading-7 text-[#263238]">
              4. Timeframe & Settings
            </h2>
            <p className="font-manrope text-xs text-[#607d8b]">
              Weekly plans run on a strict Monday to Sunday schedule. Select any date in the
              calendar to pick its week.
            </p>
          </div>

          {/* Timeframe Card */}
          <div className="space-y-4 rounded-xl border border-[#e7eceb] bg-[#f8faf9] p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <Calendar className="size-5 text-[#2f7d7e]" />
                <span className="font-nunito text-base font-bold text-[#263238]">
                  Weekly Schedule (Mon – Sun)
                </span>
              </div>
              <span className="rounded-full bg-[#dcefe7] px-3 py-1 font-nunito text-xs font-bold text-[#2f7d7e]">
                7 Days Duration
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-[#e7eceb] bg-white p-3.5">
                <span className="block font-manrope text-xs font-semibold text-[#607d8b]">
                  Start Date (Monday)
                </span>
                <span className="mt-1 block font-nunito text-sm font-bold text-[#263238]">
                  {formattedStart || 'Select from calendar'}
                </span>
              </div>
              <div className="rounded-xl border border-[#e7eceb] bg-white p-3.5">
                <span className="block font-manrope text-xs font-semibold text-[#607d8b]">
                  End Date (Sunday)
                </span>
                <span className="mt-1 block font-nunito text-sm font-bold text-[#263238]">
                  {formattedEnd || 'Select from calendar'}
                </span>
              </div>
            </div>

            {/* Embedded Calendar */}
            <div className="mt-2">
              <AssignmentCalendar
                startDate={startDate}
                endDate={endDate}
                onSelectWeek={(monday) => setTimeframeFromDate(monday)}
              />
            </div>
          </div>

          {/* Notes for Parents */}
          <label className="block">
            <span className="font-manrope text-[13px] font-semibold leading-[19.5px] text-[#263238]">
              Notes for Parents
            </span>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional message shown to families when they view this weekly plan..."
              className="mt-1.5 block w-full resize-none rounded-xl border border-[#e7eceb] bg-[#f4f8f6] px-3.75 py-2.75 font-manrope text-sm leading-5.25 text-[#263238] outline-none placeholder:text-[rgba(38,50,56,0.5)] focus:border-[#2f7d7e] focus:bg-white"
            />
          </label>

          {/* Replace Existing Switch */}
          <section className="flex items-center justify-between gap-4 rounded-xl border border-[#e7eceb] bg-[#f4f8f6] p-4">
            <div className="min-w-0">
              <h3 className="font-manrope text-sm font-semibold leading-5.25 text-[#263238]">
                Replace existing plan?
              </h3>
              <p className="font-manrope text-xs leading-4.5 text-[#607d8b]">
                If a child already has an active weekly plan, this will replace it.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={replaceExisting}
              onClick={() => setReplaceExisting(!replaceExisting)}
              className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                replaceExisting ? 'bg-[#2f7d7e]' : 'bg-[#d1d5db]'
              }`}
            >
              <span
                className={`absolute left-1 top-1 size-4 rounded-full bg-white transition-transform ${
                  replaceExisting ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </section>
        </section>

        {/* Footer Navigation */}
        <section className="flex flex-col gap-3 rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => router.push('/dashboard/admin/weekly-plans/assign/children')}
            className="w-full rounded-[14px] border border-[#e7eceb] px-4.25 py-2.75 font-manrope text-sm font-semibold leading-5 text-[#607d8b] hover:bg-[#f8faf9] sm:w-auto"
          >
            ← Previous
          </button>
          <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto">
            <button
              type="button"
              onClick={() => router.push('/dashboard/admin/weekly-plans')}
              className="rounded-[14px] border border-[#e7eceb] px-4.25 py-2.75 font-manrope text-sm font-semibold leading-5 text-[#607d8b] hover:bg-[#f8faf9]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                if (!startDate || !endDate) {
                  toast.error('Please select a weekly timeframe.');
                  return;
                }
                router.push('/dashboard/admin/weekly-plans/assign/review');
              }}
              className="rounded-[14px] bg-[#2f7d7e] px-5 py-2.5 font-manrope text-sm font-semibold leading-5 text-white transition hover:bg-[#276a6b]"
            >
              Next →
            </button>
          </div>
        </section>
      </div>
    </section>
  );
}
