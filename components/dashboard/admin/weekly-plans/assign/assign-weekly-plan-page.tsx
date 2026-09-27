'use client';

import { ArrowLeft, Check, ClipboardList, Loader2, Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import {
  CATEGORY_BACKEND_TO_UI,
  getPlanMembershipTier,
  useAdminWeeklyPlans,
} from '@/features/weekly-plans';
import { AssignmentStepper } from './assignment-stepper';
import { useAssignPlanStore, type AssignablePlan } from './store/use-assign-plan-store';

interface BackendWeeklyPlanItem {
  id: string;
  title: string;
  description?: string | null;
  weekNumber?: number | null;
  minAgeMonths?: number | null;
  maxAgeMonths?: number | null;
  category?: string | null;
  customCategory?: string | null;
  featuredImage?: string | null;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  accessLevels?: string[];
  _count?: { activities: number; assignments: number };
  createdAt: string;
  updatedAt: string;
}

function AssignmentStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[14px] bg-[#f4f8f6] p-3">
      <p className="font-manrope text-[11px] font-semibold uppercase tracking-[0.55px] text-[#607d8b]">
        {label}
      </p>
      <p className="mt-0.5 font-manrope text-[13px] font-semibold leading-[19.5px] text-[#263238]">
        {value}
      </p>
    </div>
  );
}

export function AssignWeeklyPlanPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planIdFromQuery = searchParams.get('planId');

  const { data: rawPlans, isLoading } = useAdminWeeklyPlans();
  const { selectedPlan, setSelectedPlan } = useAssignPlanStore();

  const [searchTerm, setSearchTerm] = useState('');

  const plans: AssignablePlan[] = useMemo(() => {
    if (!Array.isArray(rawPlans)) return [];

    return (rawPlans as BackendWeeklyPlanItem[])
      .filter((p) => p.status !== 'ARCHIVED')
      .map((p) => {
        const tier = getPlanMembershipTier(p.accessLevels);
        const cat =
          p.customCategory ||
          (p.category && CATEGORY_BACKEND_TO_UI[p.category]
            ? CATEGORY_BACKEND_TO_UI[p.category]
            : p.category || 'Sensory Play');

        return {
          id: p.id,
          title: p.title,
          weekNumber: p.weekNumber ?? 1,
          accessLevels: p.accessLevels,
          minAgeMonths: p.minAgeMonths,
          maxAgeMonths: p.maxAgeMonths,
          category: cat,
          customCategory: p.customCategory,
          description: p.description,
          activitiesCount: p._count?.activities ?? 0,
          status: p.status === 'PUBLISHED' ? 'Published' : 'Draft',
          featuredImage: p.featuredImage,
          membershipTier: tier,
          assignedFamiliesCount: p._count?.assignments ?? 0,
        };
      });
  }, [rawPlans]);

  // Preselect from URL if provided
  useEffect(() => {
    if (
      planIdFromQuery &&
      plans.length > 0 &&
      (!selectedPlan || selectedPlan.id !== planIdFromQuery)
    ) {
      const match = plans.find((p) => p.id === planIdFromQuery);
      if (match) setSelectedPlan(match);
    }
  }, [planIdFromQuery, plans, selectedPlan, setSelectedPlan]);

  const filteredPlans = useMemo(() => {
    if (!searchTerm.trim()) return plans;
    const term = searchTerm.toLowerCase();
    return plans.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        `week ${p.weekNumber}`.toLowerCase().includes(term) ||
        (p.category && p.category.toLowerCase().includes(term))
    );
  }, [plans, searchTerm]);

  const handleNext = () => {
    if (!selectedPlan) {
      toast.error('Please select a weekly plan to assign.');
      return;
    }
    router.push('/dashboard/admin/weekly-plans/assign/families');
  };

  const getTierClass = (tier?: string) => {
    if (tier === 'Grow Together') return 'bg-[#dcefe7] text-[#2f7d7e]';
    if (tier === 'Personalized Pathways') return 'bg-[#fce9e2] text-[#a05a3a]';
    return 'bg-[#e9f1ee] text-[#515b60]';
  };

  return (
    <section className="mx-auto w-full min-w-0 max-w-243.25 pb-8 text-[#263238]">
      <div className="space-y-5">
        <button
          type="button"
          onClick={() => router.push('/dashboard/admin/weekly-plans')}
          className="flex items-center gap-1.5 font-manrope text-sm font-medium leading-5 text-[#607d8b] transition-colors hover:text-[#2f7d7e]"
        >
          <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.5} />
          Back to Weekly Plans
        </button>

        <div>
          <h1 className="font-nunito text-2xl font-bold leading-9 text-[#263238]">
            Assign Weekly Plan
          </h1>
          <p className="mt-0.5 font-manrope text-[13px] leading-[19.5px] text-[#607d8b]">
            {selectedPlan ? `Assigning: ${selectedPlan.title}` : 'Step 1: Choose a plan to assign'}
          </p>
        </div>

        <section className="overflow-x-auto rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)]">
          <AssignmentStepper currentStep={1} />
        </section>

        <section className="rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:p-6 2xl:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-nunito text-lg font-bold leading-7 text-[#263238]">
              1. Select Weekly Plan
            </h2>
            <div className="relative w-full sm:w-72">
              <Search
                aria-hidden="true"
                className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#607d8b]"
                strokeWidth={1.7}
              />
              <input
                type="text"
                placeholder="Search plans by name, week, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10 w-full rounded-xl border border-[#e7eceb] bg-[#f4f8f6] pl-9 pr-3 font-manrope text-xs text-[#263238] outline-none focus:border-[#2f7d7e]"
              />
            </div>
          </div>

          <p className="mt-2 font-manrope text-sm leading-5.25 text-[#607d8b]">
            Choose the weekly plan template you want to assign to families.
          </p>

          {isLoading ? (
            <div className="flex min-h-48 flex-col items-center justify-center py-10 text-[#607d8b]">
              <Loader2 className="size-7 animate-spin text-[#2f7d7e]" />
              <p className="mt-2 font-manrope text-xs font-medium">Loading weekly plans...</p>
            </div>
          ) : filteredPlans.length === 0 ? (
            <div className="mt-4 rounded-xl border border-dashed border-[#cfe0e0] p-8 text-center font-manrope text-sm text-[#607d8b]">
              No weekly plans found matching your search.
            </div>
          ) : (
            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {filteredPlans.map((plan) => {
                const isSelected = selectedPlan?.id === plan.id;
                const tier = getPlanMembershipTier(plan.accessLevels);
                const ageText =
                  plan.minAgeMonths !== undefined && plan.maxAgeMonths !== undefined
                    ? `${plan.minAgeMonths}–${plan.maxAgeMonths} mo`
                    : 'All ages';

                return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setSelectedPlan(plan)}
                    className={`flex flex-col justify-between rounded-xl border-2 p-4 text-left transition-all ${
                      isSelected
                        ? 'border-[#2f7d7e] bg-[#edf6f2] shadow-sm'
                        : 'border-[#e7eceb] bg-white hover:border-[#cfe0e0] hover:bg-[#fafcfb]'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[rgba(47,125,126,0.08)] text-[#2f7d7e]">
                            <ClipboardList size={15} />
                          </span>
                          <span className="font-nunito text-xs font-bold text-[#607d8b]">
                            Week {plan.weekNumber ?? 1}
                          </span>
                        </div>
                        <span
                          className={`flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors ${
                            isSelected
                              ? 'border-[#2f7d7e] bg-[#2f7d7e] text-white'
                              : 'border-[#d0d7d9] bg-white text-transparent'
                          }`}
                        >
                          <Check size={12} strokeWidth={2.5} />
                        </span>
                      </div>

                      <h3 className="mt-2 font-nunito text-[15px] font-bold leading-5.5 text-[#263238]">
                        {plan.title}
                      </h3>

                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        <span
                          className={`rounded-full px-2 py-0.5 font-manrope text-[11px] font-semibold leading-3.5 ${getTierClass(tier)}`}
                        >
                          {tier}
                        </span>
                        <span className="rounded-full bg-[#f4f8f6] px-2 py-0.5 font-manrope text-[11px] font-medium leading-3.5 text-[#607d8b]">
                          {ageText}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-[#e7eceb] pt-2 font-manrope text-xs text-[#607d8b]">
                      <span>{plan.activitiesCount} activities</span>
                      <span
                        className={
                          plan.status === 'Published'
                            ? 'font-medium text-[#4caf50]'
                            : 'font-medium text-[#b8860b]'
                        }
                      >
                        {plan.status}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Selected Plan Preview */}
          {selectedPlan && (
            <div className="mt-6 rounded-2xl border border-[#cfe0e0] bg-[#f8fbfa] p-5 shadow-sm">
              <h3 className="font-nunito text-base font-bold text-[#2f7d7e]">
                Selected Plan Details
              </h3>
              <div className="mt-2">
                <p className="font-nunito text-lg font-bold text-[#263238]">
                  {selectedPlan.title} — Week {selectedPlan.weekNumber ?? 1}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#edf6f2] px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 text-[#4caf50]">
                    {selectedPlan.status}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 ${getTierClass(getPlanMembershipTier(selectedPlan.accessLevels))}`}
                  >
                    {getPlanMembershipTier(selectedPlan.accessLevels)}
                  </span>
                  <span className="rounded-full bg-[#f4f8f6] px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 text-[#607d8b]">
                    {selectedPlan.minAgeMonths ?? 0}–{selectedPlan.maxAgeMonths ?? 36} months
                  </span>
                  {selectedPlan.category && (
                    <span className="rounded-full bg-[rgba(47,125,126,0.06)] px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 text-[#2f7d7e]">
                      {selectedPlan.category}
                    </span>
                  )}
                </div>
                <p className="mt-3 font-manrope text-sm leading-[22.4px] text-[#607d8b]">
                  {selectedPlan.description ||
                    'A structured weekly plan of developmental activities designed to build fine motor, sensory, and cognitive skills.'}
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <AssignmentStat
                    label="Activities"
                    value={`${selectedPlan.activitiesCount ?? 0} activities`}
                  />
                  <AssignmentStat
                    label="Membership Plan"
                    value={getPlanMembershipTier(selectedPlan.accessLevels)}
                  />
                  <AssignmentStat
                    label="Category"
                    value={selectedPlan.category || 'General Development'}
                  />
                </div>
              </div>
            </div>
          )}
        </section>

        <section className="flex flex-col gap-3 rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:flex-row sm:items-center sm:justify-between 2xl:flex-row 2xl:items-center 2xl:justify-between">
          <button
            type="button"
            disabled
            className="w-full rounded-[14px] border border-[#e7eceb] px-4.25 py-2.75 font-manrope text-sm font-semibold leading-5 text-[#607d8b] opacity-40 sm:w-auto 2xl:w-auto"
          >
            ← Previous
          </button>
          <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto 2xl:flex 2xl:w-auto">
            <button
              type="button"
              onClick={() => router.push('/dashboard/admin/weekly-plans')}
              className="rounded-[14px] border border-[#e7eceb] px-4.25 py-2.75 font-manrope text-sm font-semibold leading-5 text-[#607d8b] hover:bg-[#f4f8f6]"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!selectedPlan}
              onClick={handleNext}
              className="rounded-[14px] bg-[#2f7d7e] px-5 py-2.5 font-manrope text-sm font-semibold leading-5 text-white transition-colors hover:bg-[#266b6c] disabled:opacity-50"
            >
              Next →
            </button>
          </div>
        </section>
      </div>
    </section>
  );
}
