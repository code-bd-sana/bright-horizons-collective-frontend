'use client';

import { ArrowLeft, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import {
  CATEGORY_UI_TO_BACKEND,
  TIER_UI_TO_BACKEND,
  useCreateWeeklyPlan,
  useUpdateWeeklyPlan,
  useWeeklyPlanFormStore,
  type CreateWeeklyPlanPayload,
} from '@/features/weekly-plans';
import { WeeklyPlanFormStepper } from './weekly-plan-form-stepper';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const;

function PlanPreviewCard() {
  const formStore = useWeeklyPlanFormStore();

  const title = formStore.title || 'Untitled Plan';
  const weekNumber = formStore.weekNumber || '1';
  const displayCategory =
    formStore.category === 'Other'
      ? formStore.customCategory || 'Other'
      : formStore.category || 'Sensory Play';
  const minAge = formStore.minAgeMonths || '0';
  const maxAge = formStore.maxAgeMonths || '36';
  const description =
    formStore.description ||
    'A structured weekly plan of developmental activities designed to build fine motor, sensory, and cognitive skills.';

  return (
    <section className="overflow-hidden rounded-2xl border border-[#e7eceb] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
      <div className="border-b border-[#e7eceb] bg-[rgba(47,125,126,0.03)] px-5 pt-5 pb-5.25">
        <h3 className="font-nunito text-xl font-bold leading-7.5 text-[#263238]">
          {title} — Week {weekNumber}
        </h3>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="rounded-full bg-[#edf6f2] px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 text-[#2f7d7e]">
            {formStore.membershipTier}
          </span>
          <span className="rounded-full bg-[#edf6f2] px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 text-[#2f7d7e]">
            {displayCategory}
          </span>
          <span className="rounded-full bg-[#f4f8f6] px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 text-[#607d8b]">
            {minAge}–{maxAge} months
          </span>
        </div>
      </div>

      <div className="p-5">
        <p className="font-manrope text-sm leading-[22.4px] text-[#607d8b]">{description}</p>

        <div className="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-5 2xl:grid-cols-5">
          {DAYS.map((day) => {
            const dayActivityIds = formStore.schedule[day] ?? [];
            const dayActivities = dayActivityIds
              .map((id) => formStore.selectedActivities.find((a) => a.id === id))
              .filter(Boolean);

            return (
              <div key={day} className="min-h-24 rounded-[14px] bg-[#f4f8f6] p-3">
                <p className="font-nunito text-xs font-bold leading-4.5 text-[#2f7d7e]">{day}</p>
                {dayActivities.length === 0 ? (
                  <p className="mt-1.5 font-manrope text-[11px] italic text-[#9aa8ae]">Rest day</p>
                ) : (
                  <div className="mt-1.5 space-y-1">
                    {dayActivities.map((act) => (
                      <p
                        key={act!.id}
                        className="truncate font-manrope text-[11px] font-medium leading-[14.3px] text-[#263238]"
                      >
                        · {act!.title}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function WeeklyPlanReviewPage() {
  const router = useRouter();
  const formStore = useWeeklyPlanFormStore();
  const createPlanMutation = useCreateWeeklyPlan();
  const updatePlanMutation = useUpdateWeeklyPlan();
  const [submittingStatus, setSubmittingStatus] = useState<'DRAFT' | 'PUBLISHED' | null>(null);

  async function handleSubmit(isPublish: boolean) {
    if (!formStore.title.trim()) {
      toast.error('Plan title is required. Please go back to Step 1.');
      return;
    }

    const categoryBackend = CATEGORY_UI_TO_BACKEND[formStore.category] ?? null;
    const accessLevels = TIER_UI_TO_BACKEND[formStore.membershipTier];

    const activitiesPayload: Array<{ activityId: string; day: string }> = [];
    for (const [day, activityIds] of Object.entries(formStore.schedule)) {
      for (const actId of activityIds) {
        activitiesPayload.push({ activityId: actId, day });
      }
    }

    const payload: CreateWeeklyPlanPayload = {
      title: formStore.title.trim(),
      description: formStore.description.trim() || undefined,
      weekNumber: formStore.weekNumber ? Number(formStore.weekNumber) : undefined,
      minAgeMonths: Number(formStore.minAgeMonths || 0),
      maxAgeMonths: Number(formStore.maxAgeMonths || 36),
      category: categoryBackend,
      customCategory: formStore.category === 'Other' ? formStore.customCategory.trim() : undefined,
      featuredImage: formStore.featuredImageUrl || undefined,
      status: isPublish ? 'PUBLISHED' : 'DRAFT',
      accessLevels,
      activities: activitiesPayload,
    };

    setSubmittingStatus(isPublish ? 'PUBLISHED' : 'DRAFT');

    try {
      if (formStore.editingPlanId) {
        await updatePlanMutation.mutateAsync({
          id: formStore.editingPlanId,
          payload,
        });
        toast.success(
          isPublish
            ? 'Weekly plan updated and published successfully.'
            : 'Weekly plan updated and saved as draft successfully.'
        );
      } else {
        await createPlanMutation.mutateAsync(payload);
        toast.success(
          isPublish
            ? 'Weekly plan published successfully.'
            : 'Weekly plan saved as draft successfully.'
        );
      }
      formStore.resetForm();
      router.push('/dashboard/admin/weekly-plans');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save weekly plan.';
      toast.error(msg);
    } finally {
      setSubmittingStatus(null);
    }
  }

  const isSubmitting = submittingStatus !== null;

  return (
    <section className="mx-auto w-full min-w-0 max-w-243.25 pb-8 text-[#263238]">
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
          <WeeklyPlanFormStepper currentStep={5} />
        </section>

        <section className="rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:p-6 2xl:p-6">
          <h2 className="font-nunito text-lg font-bold leading-7 text-[#263238]">5. Review</h2>
          <div className="mt-5 space-y-4">
            <p className="font-manrope text-sm leading-5.25 text-[#607d8b]">
              Review your plan before publishing. This is what administrators will see in the Weekly
              Plan Details view.
            </p>
            <PlanPreviewCard />
          </div>
        </section>

        <section className="flex flex-col gap-4 rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:flex-row sm:items-center sm:justify-between sm:p-5 2xl:flex-row 2xl:items-center 2xl:justify-between 2xl:p-5">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => router.push('/dashboard/admin/weekly-plans/create/membership')}
            className="flex h-10.5 items-center justify-center rounded-[14px] border border-[#e7eceb] px-5 font-manrope text-sm font-semibold text-[#607d8b] transition-colors hover:bg-[#f4f8f6]"
          >
            ← Previous
          </button>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => {
                formStore.resetForm();
                router.push('/dashboard/admin/weekly-plans');
              }}
              className="flex h-10.5 items-center justify-center rounded-[14px] border border-[#e7eceb] px-4.5 font-manrope text-sm font-semibold text-[#607d8b] transition-colors hover:bg-[#f4f8f6]"
            >
              Discard
            </button>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleSubmit(false)}
              className="flex h-10.5 items-center justify-center rounded-[14px] border border-[#2f7d7e] px-4.5 font-manrope text-sm font-semibold text-[#2f7d7e] transition-colors hover:bg-[#edf6f2]"
            >
              {submittingStatus === 'DRAFT' ? (
                <span className="flex items-center gap-1.5">
                  <Loader2 className="size-4 animate-spin" />
                  Saving Draft...
                </span>
              ) : (
                'Save Draft'
              )}
            </button>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleSubmit(true)}
              className="flex h-10.5 items-center justify-center rounded-[14px] bg-[#2f7d7e] px-6 font-manrope text-sm font-semibold text-white transition-colors hover:bg-[#266b6c]"
            >
              {submittingStatus === 'PUBLISHED' ? (
                <span className="flex items-center gap-1.5">
                  <Loader2 className="size-4 animate-spin" />
                  Publishing...
                </span>
              ) : (
                'Publish Plan'
              )}
            </button>
          </div>
        </section>
      </div>
    </section>
  );
}
