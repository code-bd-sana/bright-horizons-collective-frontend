'use client';

import { ArrowLeft, Check, Loader2, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { useAdminFamilies } from '@/components/dashboard/admin/families/hooks/use-admin-families';
import { getPlanMembershipTier } from '@/features/weekly-plans';
import { AssignmentStepper } from './assignment-stepper';
import { useAssignPlanStore } from './store/use-assign-plan-store';

const TIER_RANKS: Record<string, number> = {
  'Little Steps': 1,
  'Grow Together': 2,
  'Personalized Pathways': 3,
  LITTLE_STEPS: 1,
  GROW_TOGETHER: 2,
  PERSONALIZED_PATHWAYS: 3,
};

const membershipStyles: Record<string, string> = {
  'Grow Together': 'bg-[#dcefe7] text-[#2f7d7e]',
  'Little Steps': 'bg-[#edf6f2] text-[#2f7d7e]',
  'Personalized Pathways': 'bg-[#fce9e2] text-[#a05a3a]',
};

interface FamilyListItem {
  id: string;
  name: string;
  initials?: string;
  children: string[];
  childrenList?: Array<{ id: string; name: string; age?: number; ageYears?: number }>;
  membership: string;
  tierKey?: string;
  status: string;
}

export function AssignWeeklyPlanFamiliesPage() {
  const router = useRouter();
  const { data: rawFamilies, isLoading } = useAdminFamilies();
  const { selectedPlan, selectedFamilyIds, toggleFamily, selectAllFamilies, deselectAllFamilies } =
    useAssignPlanStore();

  const [search, setSearch] = useState('');

  // If no plan is selected, redirect back to Step 1
  useEffect(() => {
    if (!selectedPlan) {
      toast.error('Please select a weekly plan first.');
      router.push('/dashboard/admin/weekly-plans/assign');
    }
  }, [selectedPlan, router]);

  const planTier = selectedPlan ? getPlanMembershipTier(selectedPlan.accessLevels) : 'Little Steps';
  const requiredRank = TIER_RANKS[planTier] ?? 1;

  // Filter families by tier eligibility
  const eligibleFamilies = useMemo(() => {
    if (!Array.isArray(rawFamilies)) return [];

    return (rawFamilies as FamilyListItem[]).filter((f) => {
      const familyRank = TIER_RANKS[f.membership] ?? TIER_RANKS[f.tierKey ?? ''] ?? 1;
      return familyRank >= requiredRank;
    });
  }, [rawFamilies, requiredRank]);

  const filteredFamilies = useMemo(() => {
    if (!search.trim()) return eligibleFamilies;
    const term = search.toLowerCase();
    return eligibleFamilies.filter(
      (f) =>
        f.name.toLowerCase().includes(term) ||
        f.children.some((c) => c.toLowerCase().includes(term))
    );
  }, [eligibleFamilies, search]);

  const allEligibleSelected =
    filteredFamilies.length > 0 && filteredFamilies.every((f) => selectedFamilyIds.includes(f.id));

  const handleToggleAll = () => {
    if (allEligibleSelected) {
      deselectAllFamilies();
    } else {
      selectAllFamilies(
        filteredFamilies.map((f) => ({
          id: f.id,
          childIds: (f.childrenList || []).map((c) => c.id),
        }))
      );
    }
  };

  const handleNext = () => {
    if (selectedFamilyIds.length === 0) {
      toast.error('Please select at least one family to continue.');
      return;
    }
    router.push('/dashboard/admin/weekly-plans/assign/children');
  };

  return (
    <section className="mx-auto w-full min-w-0 max-w-243.25 pb-8 text-[#263238]">
      <div className="space-y-5">
        <button
          type="button"
          onClick={() => router.push('/dashboard/admin/weekly-plans/assign')}
          className="flex items-center gap-1.5 font-manrope text-sm font-medium leading-5 text-[#607d8b] transition-colors hover:text-[#2f7d7e]"
        >
          <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.5} />
          Back to Plan Selection
        </button>

        <div>
          <h1 className="font-nunito text-2xl font-bold leading-9 text-[#263238]">
            Assign Weekly Plan
          </h1>
          <p className="mt-0.5 font-manrope text-[13px] leading-[19.5px] text-[#607d8b]">
            Assigning: {selectedPlan?.title || 'Weekly Plan'} ({planTier})
          </p>
        </div>

        <section className="overflow-x-auto rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)]">
          <AssignmentStepper currentStep={2} />
        </section>

        <section className="rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:p-6 2xl:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-nunito text-lg font-bold leading-7 text-[#263238]">
                2. Choose Families
              </h2>
              <p className="mt-1 font-manrope text-sm leading-5.25 text-[#607d8b]">
                Showing families eligible for the <strong>{planTier}</strong> tier (and higher).
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleToggleAll}
                className="h-9 rounded-xl border border-[#cfe0e0] bg-[#e9f1ee] px-3 font-manrope text-xs font-semibold text-[#2f7d7e] transition-colors hover:bg-[#dcefe7]"
              >
                {allEligibleSelected ? 'Deselect All' : 'Select All Eligible'}
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:w-72">
              <Search
                aria-hidden="true"
                className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#607d8b]"
                strokeWidth={1.7}
              />
              <input
                type="text"
                placeholder="Search families or children..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-10 w-full rounded-xl border border-[#e7eceb] bg-[#f4f8f6] pl-9 pr-3 font-manrope text-xs text-[#263238] outline-none focus:border-[#2f7d7e]"
              />
            </div>
            <p className="font-manrope text-xs font-semibold text-[#2f7d7e]">
              {selectedFamilyIds.length} of {eligibleFamilies.length} eligible families selected
            </p>
          </div>

          {isLoading ? (
            <div className="flex min-h-48 flex-col items-center justify-center py-10 text-[#607d8b]">
              <Loader2 className="size-7 animate-spin text-[#2f7d7e]" />
              <p className="mt-2 font-manrope text-xs font-medium">Loading eligible families...</p>
            </div>
          ) : filteredFamilies.length === 0 ? (
            <div className="mt-4 rounded-xl border border-dashed border-[#cfe0e0] p-8 text-center font-manrope text-sm text-[#607d8b]">
              {eligibleFamilies.length === 0
                ? `No families found with ${planTier} tier membership or higher.`
                : 'No families match your search.'}
            </div>
          ) : (
            <div className="mt-4 space-y-2">
              {filteredFamilies.map((family) => {
                const isSelected = selectedFamilyIds.includes(family.id);
                const childrenCount = family.childrenList?.length ?? family.children.length;
                const childrenNames =
                  family.children.length > 0 ? family.children.join(', ') : 'No children added';
                const familyChildIds = (family.childrenList || []).map((c) => c.id);

                return (
                  <button
                    key={family.id}
                    type="button"
                    onClick={() => toggleFamily(family.id, familyChildIds)}
                    className={`grid w-full min-w-0 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 rounded-xl border p-3 text-left transition-colors sm:flex sm:gap-4 sm:p-4 ${
                      isSelected
                        ? 'border-[#2f7d7e] bg-[rgba(47,125,126,0.04)]'
                        : 'border-[#e7eceb] bg-white hover:bg-[#fafcfb]'
                    }`}
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[rgba(47,125,126,0.09)] font-nunito text-base font-bold text-[#2f7d7e]">
                      {family.initials || family.name.charAt(0).toUpperCase()}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block font-manrope text-sm font-semibold leading-5 text-[#263238]">
                        {family.name}
                      </span>
                      <span className="block font-manrope text-xs text-[#607d8b]">
                        {childrenCount} {childrenCount === 1 ? 'child' : 'children'}:{' '}
                        {childrenNames}
                      </span>
                    </span>

                    <span
                      className={`col-start-2 row-start-2 w-fit rounded-full px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 sm:shrink-0 ${
                        membershipStyles[family.membership] || 'bg-[#edf6f2] text-[#2f7d7e]'
                      }`}
                    >
                      {family.membership}
                    </span>

                    <span
                      className={`col-start-3 row-start-1 flex size-5 shrink-0 items-center justify-center rounded-lg sm:col-auto sm:row-auto ${
                        isSelected ? 'bg-[#2f7d7e] text-white' : 'bg-[#eef2f2] text-transparent'
                      }`}
                    >
                      <Check size={13} strokeWidth={2.4} />
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </section>

        <section className="flex flex-col gap-3 rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:flex-row sm:items-center sm:justify-between 2xl:flex-row 2xl:items-center 2xl:justify-between">
          <button
            type="button"
            onClick={() => router.push('/dashboard/admin/weekly-plans/assign')}
            className="w-full rounded-[14px] border border-[#e7eceb] px-4.25 py-2.75 font-manrope text-sm font-semibold leading-5 text-[#607d8b] hover:bg-[#f4f8f6] sm:w-auto 2xl:w-auto"
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
              disabled={selectedFamilyIds.length === 0}
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
