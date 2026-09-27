'use client';

import { ArrowLeft, Calendar, CheckCircle2, Loader2, TriangleAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { toast } from 'sonner';
import { useAdminFamilies } from '@/components/dashboard/admin/families/hooks/use-admin-families';
import {
  CATEGORY_BACKEND_TO_UI,
  getPlanMembershipTier,
  useAssignWeeklyPlan,
} from '@/features/weekly-plans';
import { AssignmentStepper } from './assignment-stepper';
import { useAssignPlanStore } from './store/use-assign-plan-store';

const membershipStyles: Record<string, string> = {
  'Grow Together': 'bg-[#dcefe7] text-[#2f7d7e]',
  'Little Steps': 'bg-[#edf6f2] text-[#2f7d7e]',
  'Personalized Pathways': 'bg-[#fce9e2] text-[#a05a3a]',
};

interface ReviewFamilyItem {
  id: string;
  name: string;
  childrenList?: Array<{
    id: string;
    name: string;
    age?: number;
    ageYears?: number;
    ageMonths?: number;
  }>;
}

export function AssignWeeklyPlanReviewPage() {
  const router = useRouter();
  const { data: rawFamilies } = useAdminFamilies();
  const assignMutation = useAssignWeeklyPlan();

  const {
    selectedPlan,
    selectedFamilyIds,
    selectedChildIds,
    startDate,
    endDate,
    replaceExisting,
    notes,
    resetStore,
  } = useAssignPlanStore();

  const selectedTier = useMemo(
    () => (selectedPlan ? getPlanMembershipTier(selectedPlan.accessLevels) : 'Little Steps'),
    [selectedPlan]
  );

  const categoryDisplay = useMemo(() => {
    if (!selectedPlan) return '';
    if (selectedPlan.category === 'OTHER' || selectedPlan.customCategory) {
      return selectedPlan.customCategory || 'Custom Category';
    }
    return selectedPlan.category
      ? CATEGORY_BACKEND_TO_UI[selectedPlan.category] || selectedPlan.category
      : 'General';
  }, [selectedPlan]);

  const selectedFamiliesData = useMemo<ReviewFamilyItem[]>(() => {
    if (!Array.isArray(rawFamilies)) return [];
    return (rawFamilies as unknown as ReviewFamilyItem[]).filter((f) =>
      selectedFamilyIds.includes(f.id)
    );
  }, [rawFamilies, selectedFamilyIds]);

  const selectedChildrenDetails = useMemo(() => {
    const list: Array<{
      id: string;
      name: string;
      familyName: string;
      ageText: string;
    }> = [];

    for (const fam of selectedFamiliesData) {
      for (const ch of fam.childrenList || []) {
        if (selectedChildIds.includes(ch.id)) {
          let ageText = '';
          if (ch.ageYears !== undefined && ch.ageMonths !== undefined) {
            ageText = `${ch.ageYears}y ${ch.ageMonths}m`;
          } else if (ch.ageYears !== undefined) {
            ageText = `${ch.ageYears} yrs`;
          } else if (ch.age !== undefined) {
            ageText = `${ch.age} yrs`;
          }

          list.push({
            id: ch.id,
            name: ch.name,
            familyName: fam.name,
            ageText,
          });
        }
      }
    }
    return list;
  }, [selectedFamiliesData, selectedChildIds]);

  const hasMissingPrerequisites =
    !selectedPlan || selectedChildIds.length === 0 || !startDate || !endDate;

  const formattedStart = startDate
    ? new Date(`${startDate}T00:00:00`).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Not set';

  const formattedEnd = endDate
    ? new Date(`${endDate}T00:00:00`).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Not set';

  async function handleConfirmAssignment() {
    if (!selectedPlan) {
      toast.error('Please select a weekly plan.');
      router.push('/dashboard/admin/weekly-plans/assign');
      return;
    }
    if (selectedChildIds.length === 0) {
      toast.error('Please select at least one child.');
      router.push('/dashboard/admin/weekly-plans/assign/children');
      return;
    }
    if (!startDate || !endDate) {
      toast.error('Please choose a weekly timeframe.');
      router.push('/dashboard/admin/weekly-plans/assign/settings');
      return;
    }

    try {
      const payload = {
        weeklyPlanId: selectedPlan.id,
        childIds: selectedChildIds,
        startDate: new Date(`${startDate}T00:00:00.000Z`).toISOString(),
        endDate: new Date(`${endDate}T23:59:59.999Z`).toISOString(),
        replaceExisting,
        notes: notes.trim() || undefined,
      };

      await assignMutation.mutateAsync(payload);
      toast.success(
        `Successfully assigned "${selectedPlan.title}" to ${selectedChildIds.length} children!`
      );
      resetStore();
      router.push('/dashboard/admin/weekly-plans');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to assign weekly plan.';
      toast.error(message);
    }
  }

  return (
    <section className="mx-auto w-full min-w-0 max-w-196.75 pb-8 text-[#263238]">
      <div className="space-y-5">
        <button
          type="button"
          onClick={() => router.push('/dashboard/admin/weekly-plans/assign/settings')}
          className="flex items-center gap-1.5 font-manrope text-sm font-medium leading-5 text-[#607d8b] hover:text-[#263238]"
        >
          <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.5} />
          Back to Settings
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
          <AssignmentStepper currentStep={5} />
        </section>

        {/* Validation Warning if anything is missing */}
        {hasMissingPrerequisites && (
          <div className="flex items-start gap-3 rounded-2xl border border-[rgba(229,115,115,0.25)] bg-[#fce9e2] p-4 text-[#e57373]">
            <TriangleAlert className="mt-0.5 size-5 shrink-0" />
            <div className="space-y-1 text-sm font-manrope">
              <p className="font-bold">Missing Required Information</p>
              <ul className="list-inside list-disc text-xs text-[#b84e4e]">
                {!selectedPlan && <li>No weekly plan selected.</li>}
                {selectedChildIds.length === 0 && <li>No children selected for assignment.</li>}
                {(!startDate || !endDate) && <li>Weekly timeframe not selected.</li>}
              </ul>
            </div>
          </div>
        )}

        {/* Review Summary */}
        <section className="space-y-6 rounded-2xl border border-[#e7eceb] bg-white p-5 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:p-6">
          <div>
            <h2 className="font-nunito text-lg font-bold leading-7 text-[#263238]">
              5. Review & Confirm
            </h2>
            <p className="font-manrope text-xs text-[#607d8b]">
              Please double check all assignment details before submitting.
            </p>
          </div>

          <div className="divide-y divide-[#e7eceb] rounded-xl border border-[#e7eceb] bg-[#fafcfb]">
            {/* Plan Info */}
            <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <span className="block font-manrope text-xs font-semibold uppercase tracking-wider text-[#607d8b]">
                  Weekly Plan
                </span>
                <div className="flex items-center gap-2">
                  <h3 className="font-nunito text-base font-bold text-[#263238]">
                    {selectedPlan?.title || 'No plan selected'}
                  </h3>
                  {selectedPlan?.weekNumber ? (
                    <span className="rounded-md bg-[#edf6f2] px-2 py-0.5 font-nunito text-xs font-bold text-[#2f7d7e]">
                      Week {selectedPlan.weekNumber}
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-manrope text-[#607d8b]">
                  <span>Category: {categoryDisplay}</span>
                  {selectedPlan?.activitiesCount !== undefined && (
                    <>
                      <span>•</span>
                      <span>{selectedPlan.activitiesCount} activities</span>
                    </>
                  )}
                  {selectedPlan?.minAgeMonths !== undefined &&
                    selectedPlan?.maxAgeMonths !== undefined && (
                      <>
                        <span>•</span>
                        <span>
                          Age: {selectedPlan.minAgeMonths}–{selectedPlan.maxAgeMonths} mos
                        </span>
                      </>
                    )}
                </div>
              </div>
              <div>
                <span
                  className={`inline-block rounded-full px-3 py-1 font-nunito text-xs font-bold ${
                    membershipStyles[selectedTier] || 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {selectedTier}
                </span>
              </div>
            </div>

            {/* Recipients Info */}
            <div className="p-4">
              <div className="flex items-center justify-between">
                <span className="block font-manrope text-xs font-semibold uppercase tracking-wider text-[#607d8b]">
                  Assigned Children ({selectedChildIds.length})
                </span>
                <span className="font-manrope text-xs text-[#607d8b]">
                  Across {selectedFamilyIds.length} Families
                </span>
              </div>

              {selectedChildrenDetails.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedChildrenDetails.map((child) => (
                    <div
                      key={child.id}
                      className="flex items-center gap-2 rounded-xl border border-[#e0e8e6] bg-white px-3 py-1.5 shadow-xs"
                    >
                      <div className="size-2 rounded-full bg-[#2f7d7e]" />
                      <span className="font-nunito text-sm font-bold text-[#263238]">
                        {child.name}
                      </span>
                      {child.ageText && (
                        <span className="text-xs font-manrope text-[#607d8b]">
                          ({child.ageText})
                        </span>
                      )}
                      <span className="text-xs font-manrope text-[#7c9a99]">
                        • {child.familyName}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-2 font-manrope text-sm font-medium text-[#263238]">
                  {selectedChildIds.length} children selected
                </p>
              )}
            </div>

            {/* Timeframe Info */}
            <div className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="block font-manrope text-xs font-semibold uppercase tracking-wider text-[#607d8b]">
                  Weekly Timeframe
                </span>
                <div className="mt-1 flex items-center gap-2">
                  <Calendar className="size-4 text-[#2f7d7e]" />
                  <p className="font-nunito text-sm font-bold text-[#263238]">
                    {formattedStart} — {formattedEnd}
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-[#dcefe7] px-3 py-1 text-center font-nunito text-xs font-bold text-[#2f7d7e]">
                7 Days Duration (Mon – Sun)
              </span>
            </div>

            {/* Replace Existing Info */}
            <div className="flex items-center justify-between p-4">
              <span className="font-manrope text-xs font-semibold uppercase tracking-wider text-[#607d8b]">
                Replace Existing Active Plans?
              </span>
              <span
                className={`rounded-lg px-2.5 py-1 font-nunito text-xs font-bold ${
                  replaceExisting ? 'bg-[#fce9e2] text-[#e57373]' : 'bg-[#edf6f2] text-[#2f7d7e]'
                }`}
              >
                {replaceExisting ? 'Yes, Replace' : 'No'}
              </span>
            </div>

            {/* Notes for Parents Info */}
            <div className="p-4">
              <span className="block font-manrope text-xs font-semibold uppercase tracking-wider text-[#607d8b]">
                Notes for Parents
              </span>
              <p className="mt-1 font-manrope text-sm italic text-[#263238]">
                {notes.trim() ? `"${notes.trim()}"` : 'None entered'}
              </p>
            </div>
          </div>
        </section>

        {/* Footer Navigation */}
        <section className="flex flex-col gap-3 rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => router.push('/dashboard/admin/weekly-plans/assign/settings')}
            className="w-full rounded-[14px] border border-[#e7eceb] px-4.25 py-2.75 font-manrope text-sm font-semibold leading-5 text-[#607d8b] hover:bg-[#f8faf9] sm:w-auto"
          >
            ← Previous
          </button>
          <div className="grid w-full gap-2 sm:flex sm:w-auto">
            <button
              type="button"
              onClick={() => router.push('/dashboard/admin/weekly-plans')}
              className="rounded-[14px] border border-[#e7eceb] px-4.25 py-2.75 font-manrope text-sm font-semibold leading-5 text-[#607d8b] hover:bg-[#f8faf9]"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={hasMissingPrerequisites || assignMutation.isPending}
              onClick={handleConfirmAssignment}
              className="flex items-center justify-center gap-2 rounded-[14px] bg-[#2f7d7e] px-6 py-2.5 font-manrope text-sm font-semibold leading-5 text-white transition hover:bg-[#276a6b] disabled:opacity-50"
            >
              {assignMutation.isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Assigning Plan...
                </>
              ) : (
                <>
                  <CheckCircle2 className="size-4" />
                  Assign Weekly Plan
                </>
              )}
            </button>
          </div>
        </section>
      </div>
    </section>
  );
}
