'use client';

import { ArrowLeft, Check, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import { useAdminFamilies } from '@/components/dashboard/admin/families/hooks/use-admin-families';
import { AssignmentStepper } from './assignment-stepper';
import { useAssignPlanStore } from './store/use-assign-plan-store';

interface FamilyListItem {
  id: string;
  name: string;
  children: string[];
  childrenList?: Array<{
    id: string;
    name: string;
    age?: number;
    ageYears?: number;
    ageMonths?: number;
  }>;
  membership: string;
}

export function AssignWeeklyPlanChildrenPage() {
  const router = useRouter();
  const { data: rawFamilies, isLoading } = useAdminFamilies();
  const {
    selectedPlan,
    selectedFamilyIds,
    selectedChildIds,
    toggleChild,
    selectAllChildren,
    deselectAllChildren,
  } = useAssignPlanStore();

  // Guard: if no plan or no families selected, route back
  useEffect(() => {
    if (!selectedPlan) {
      toast.error('Please select a weekly plan first.');
      router.push('/dashboard/admin/weekly-plans/assign');
    } else if (selectedFamilyIds.length === 0) {
      toast.error('Please select at least one family first.');
      router.push('/dashboard/admin/weekly-plans/assign/families');
    }
  }, [selectedPlan, selectedFamilyIds, router]);

  const selectedFamiliesData = useMemo(() => {
    if (!Array.isArray(rawFamilies)) return [];

    return (rawFamilies as FamilyListItem[]).filter((f) => selectedFamilyIds.includes(f.id));
  }, [rawFamilies, selectedFamilyIds]);

  // Collect all available child IDs across the selected families
  const allAvailableChildIds = useMemo(() => {
    const ids: string[] = [];
    for (const f of selectedFamiliesData) {
      for (const c of f.childrenList || []) {
        ids.push(c.id);
      }
    }
    return ids;
  }, [selectedFamiliesData]);

  const allSelected =
    allAvailableChildIds.length > 0 &&
    allAvailableChildIds.every((id) => selectedChildIds.includes(id));

  const handleToggleAll = () => {
    if (allSelected) {
      deselectAllChildren();
    } else {
      selectAllChildren(allAvailableChildIds);
    }
  };

  const handleNext = () => {
    if (selectedChildIds.length === 0) {
      toast.error('Please select at least one child to assign the weekly plan to.');
      return;
    }
    router.push('/dashboard/admin/weekly-plans/assign/settings');
  };

  return (
    <section className="mx-auto w-full min-w-0 max-w-243.25 pb-8 text-[#263238]">
      <div className="space-y-5">
        <button
          type="button"
          onClick={() => router.push('/dashboard/admin/weekly-plans/assign/families')}
          className="flex items-center gap-1.5 font-manrope text-sm font-medium leading-5 text-[#607d8b] transition-colors hover:text-[#2f7d7e]"
        >
          <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.5} />
          Back to Choose Families
        </button>

        <div>
          <h1 className="font-nunito text-2xl font-bold leading-9 text-[#263238]">
            Assign Weekly Plan
          </h1>
          <p className="mt-0.5 font-manrope text-[13px] leading-[19.5px] text-[#607d8b]">
            Assigning: {selectedPlan?.title || 'Weekly Plan'}
          </p>
        </div>

        <section className="overflow-x-auto rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)]">
          <AssignmentStepper currentStep={3} />
        </section>

        <section className="rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:p-6 2xl:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-nunito text-lg font-bold leading-7 text-[#263238]">
                3. Choose Children
              </h2>
              <p className="mt-1 font-manrope text-sm leading-5.25 text-[#607d8b]">
                Select which children from the chosen families will receive this plan.
              </p>
            </div>
            {allAvailableChildIds.length > 0 && (
              <button
                type="button"
                onClick={handleToggleAll}
                className="h-9 rounded-xl border border-[#cfe0e0] bg-[#e9f1ee] px-3 font-manrope text-xs font-semibold text-[#2f7d7e] transition-colors hover:bg-[#dcefe7]"
              >
                {allSelected ? 'Deselect All Children' : 'Select All Children'}
              </button>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between border-b border-[#e7eceb] pb-3">
            <span className="font-manrope text-xs font-semibold text-[#2f7d7e]">
              {selectedChildIds.length} of {allAvailableChildIds.length} children selected
            </span>
          </div>

          {isLoading ? (
            <div className="flex min-h-48 flex-col items-center justify-center py-10 text-[#607d8b]">
              <Loader2 className="size-7 animate-spin text-[#2f7d7e]" />
              <p className="mt-2 font-manrope text-xs font-medium">Loading children details...</p>
            </div>
          ) : selectedFamiliesData.length === 0 ? (
            <div className="mt-4 rounded-xl border border-dashed border-[#cfe0e0] p-8 text-center font-manrope text-sm text-[#607d8b]">
              No families selected. Please go back and select at least one family.
            </div>
          ) : (
            <div className="mt-4 space-y-6">
              {selectedFamiliesData.map((family) => {
                const children = family.childrenList || [];

                return (
                  <div
                    key={family.id}
                    className="rounded-xl border border-[#e7eceb] bg-[#fafcfb] p-4"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-[#e7eceb]">
                      <h3 className="font-nunito text-[15px] font-bold leading-5.5 text-[#263238]">
                        {family.name}
                      </h3>
                      <span className="rounded-full bg-[#edf6f2] px-2.5 py-0.5 font-manrope text-xs font-medium text-[#2f7d7e]">
                        {family.membership}
                      </span>
                    </div>

                    {children.length === 0 ? (
                      <p className="mt-3 font-manrope text-xs italic text-[#9aa8ae]">
                        No children profiles registered for this family.
                      </p>
                    ) : (
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {children.map((child) => {
                          const isSelected = selectedChildIds.includes(child.id);
                          const ageDisplay =
                            child.ageYears && child.ageYears > 0
                              ? `${child.ageYears} yrs`
                              : child.age && child.age > 0
                                ? `${child.age} yrs`
                                : child.ageMonths && child.ageMonths > 0
                                  ? `${child.ageMonths} mo`
                                  : 'Child';

                          return (
                            <button
                              key={child.id}
                              type="button"
                              onClick={() => toggleChild(child.id)}
                              className={`flex items-center justify-between rounded-xl border p-3 text-left transition-colors ${
                                isSelected
                                  ? 'border-[#2f7d7e] bg-white shadow-sm'
                                  : 'border-[#e7eceb] bg-white/70 hover:bg-white'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[rgba(143,185,168,0.2)] font-nunito text-sm font-bold text-[#2f7d7e]">
                                  {child.name.charAt(0).toUpperCase()}
                                </span>
                                <div>
                                  <p className="font-manrope text-sm font-semibold text-[#263238]">
                                    {child.name}
                                  </p>
                                  <p className="font-manrope text-xs text-[#607d8b]">
                                    {ageDisplay}
                                  </p>
                                </div>
                              </div>
                              <span
                                className={`flex size-5 shrink-0 items-center justify-center rounded-lg ${
                                  isSelected
                                    ? 'bg-[#2f7d7e] text-white'
                                    : 'bg-[#eef2f2] text-transparent'
                                }`}
                              >
                                <Check size={13} strokeWidth={2.4} />
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <section className="flex flex-col gap-3 rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:flex-row sm:items-center sm:justify-between 2xl:flex-row 2xl:items-center 2xl:justify-between">
          <button
            type="button"
            onClick={() => router.push('/dashboard/admin/weekly-plans/assign/families')}
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
              disabled={selectedChildIds.length === 0}
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
