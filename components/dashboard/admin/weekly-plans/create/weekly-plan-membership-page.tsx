'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useWeeklyPlanFormStore, type UiMembershipTier } from '@/features/weekly-plans';
import { WeeklyPlanFormStepper } from './weekly-plan-form-stepper';

const tiers: Array<{ name: UiMembershipTier; description: string; color: string }> = [
  {
    name: 'Little Steps',
    description: 'Specific to Little Steps membership plan',
    color: '#2f7d7e',
  },
  {
    name: 'Grow Together',
    description: 'Specific to Grow Together membership plan',
    color: '#2f7d7e',
  },
  {
    name: 'Personalized Pathways',
    description: 'Specific to Personalized Pathways membership plan',
    color: '#a05a3a',
  },
];

export function WeeklyPlanMembershipPage() {
  const router = useRouter();
  const formStore = useWeeklyPlanFormStore();
  const tier = formStore.membershipTier;

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
          <WeeklyPlanFormStepper currentStep={4} />
        </section>

        <section className="rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:p-6 2xl:p-6">
          <h2 className="font-nunito text-lg font-bold leading-7 text-[#263238]">4. Membership</h2>
          <div className="mt-5 space-y-4">
            <p className="font-manrope text-sm leading-[22.4px] text-[#607d8b]">
              Select the specific membership plan this weekly plan belongs to.
            </p>

            <div className="grid gap-3 md:grid-cols-3 2xl:grid-cols-3">
              {tiers.map((option) => {
                const selected = tier === option.name;
                const isPersonalized = option.name === 'Personalized Pathways';

                return (
                  <button
                    key={option.name}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => formStore.setMembershipTier(option.name)}
                    className={`flex min-h-20.75 flex-col gap-2 rounded-[14px] border-2 p-4.5 text-left transition-colors ${
                      selected
                        ? 'border-[#2f7d7e] bg-[#edf6f2]'
                        : 'border-[#e7eceb] bg-white hover:bg-[#f8fbfa]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className="flex size-4 items-center justify-center rounded-full border-2"
                        style={{ borderColor: option.color }}
                      >
                        {selected ? (
                          <span
                            className="size-2 rounded-full"
                            style={{ backgroundColor: option.color }}
                          />
                        ) : null}
                      </span>
                      <span
                        className="font-manrope text-sm font-semibold leading-5.25"
                        style={{ color: isPersonalized ? '#a05a3a' : '#2f7d7e' }}
                      >
                        {option.name}
                      </span>
                    </span>
                    <span className="font-manrope text-xs font-medium leading-4.5 text-[#607d8b]">
                      {option.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="flex items-center justify-between rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:p-5 2xl:p-5">
          <button
            type="button"
            onClick={() => router.push('/dashboard/admin/weekly-plans/create/schedule')}
            className="flex h-10.5 items-center justify-center rounded-[14px] border border-[#e7eceb] px-5 font-manrope text-sm font-semibold text-[#607d8b] transition-colors hover:bg-[#f4f8f6]"
          >
            ← Previous
          </button>
          <button
            type="button"
            onClick={() => router.push('/dashboard/admin/weekly-plans/create/review')}
            className="flex h-10.5 items-center justify-center rounded-[14px] bg-[#2f7d7e] px-6 font-manrope text-sm font-semibold text-white transition-colors hover:bg-[#266b6c]"
          >
            Next →
          </button>
        </section>
      </div>
    </section>
  );
}
