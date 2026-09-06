'use client';

import { ArrowLeft, TriangleAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { WeeklyPlanFormStepper } from './weekly-plan-form-stepper';

type Tier = 'Little Steps' | 'Grow Together' | 'Personalized Pathways';

const tiers: Array<{ name: Tier; description: string; color: string }> = [
  { name: 'Little Steps', description: 'Available to all members', color: '#2f7d7e' },
  { name: 'Grow Together', description: 'Grow Together and above', color: '#2f7d7e' },
  {
    name: 'Personalized Pathways',
    description: 'Personalized Pathways only',
    color: '#a05a3a',
  },
];

function FlowButton({ children, className, ...props }: React.ComponentProps<'button'>) {
  return (
    <button
      type="button"
      className={`rounded-[14px] border px-4.25 py-2.75 font-manrope text-sm font-semibold leading-5 transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function WeeklyPlanMembershipPage() {
  const router = useRouter();
  const [tier, setTier] = useState<Tier>('Little Steps');

  return (
    <section className="mx-auto w-full max-w-243.25 pb-8 text-[#263238]">
      <div className="w-full max-w-244.25 space-y-5">
        <button
          type="button"
          onClick={() => router.push('/dashboard/admin/weekly-plans')}
          className="flex items-center gap-1.5 font-manrope text-sm font-medium leading-5 text-[#607d8b]"
        >
          <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.5} />
          Back to Weekly Plans
        </button>
        <h1 className="font-nunito text-2xl font-bold leading-9 text-[#263238]">
          Create Weekly Plans
        </h1>
        <section className="overflow-x-auto rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)]">
          <WeeklyPlanFormStepper currentStep={4} />
        </section>

        <section className="rounded-2xl border border-[#e7eceb] bg-white p-6 shadow-[0_4px_6px_rgba(0,0,0,0.06)]">
          <h2 className="font-nunito text-lg font-bold leading-7 text-[#263238]">4. Membership</h2>
          <div className="mt-5 space-y-4">
            <p className="font-manrope text-sm leading-[22.4px] text-[#607d8b]">
              Control which membership tier can be assigned this plan. Families on lower tiers will
              not see this plan during assignment.
            </p>
            <div className="rounded-xl border border-[rgba(246,195,68,0.19)] bg-[#fff8e1] px-4.25 py-3.25 font-manrope text-[13px] leading-[19.5px] text-[#b8860b]">
              <strong className="font-bold">Open item for client confirmation: </strong>
              Personalized Pathways is documented as giving each child an individually personalized
              plan. This form supports both bulk (Grow Together) and one-child (Personalized
              Pathways) assignments. Confirm this is the intended workflow rather than a separate
              authoring tool.
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {tiers.map((option) => {
                const selected = tier === option.name;
                const isPersonalized = option.name === 'Personalized Pathways';

                return (
                  <button
                    key={option.name}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setTier(option.name)}
                    className={`flex min-h-20.75 flex-col gap-2 rounded-[14px] border-2 p-4.5 text-left transition-colors ${selected ? 'border-[#2f7d7e] bg-[#edf6f2]' : 'border-[#e7eceb] bg-white'}`}
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

        <section className="flex flex-col gap-4 rounded-2xl border border-[#e7eceb] bg-white p-5 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            <FlowButton
              onClick={() => router.push('/dashboard/admin/weekly-plans/create/schedule')}
              className="border-[#e7eceb] text-[#607d8b]"
            >
              ← Previous
            </FlowButton>
            <FlowButton
              onClick={() => router.push('/dashboard/admin/weekly-plans/create/review')}
              className="border-[#2f7d7e] text-[#2f7d7e]"
            >
              Next →
            </FlowButton>
          </div>
          <div className="flex flex-wrap gap-2">
            <FlowButton
              onClick={() => toast.success('Weekly plan saved as a draft.')}
              className="border-[#e7eceb] text-[#607d8b]"
            >
              Save as Draft
            </FlowButton>
            <FlowButton
              onClick={() => toast.success('Plan preview is ready.')}
              className="border-[#e7eceb] text-[#607d8b]"
            >
              Preview
            </FlowButton>
            <FlowButton
              onClick={() => toast.success('Weekly plan changes saved.')}
              className="border-[#2f7d7e] bg-[#2f7d7e] text-white"
            >
              Save Changes
            </FlowButton>
          </div>
        </section>
        <div className="flex items-center gap-2 rounded-[14px] border border-[rgba(246,195,68,0.25)] bg-[#fff8e1] px-4.25 py-3.25 font-manrope text-[13px] leading-[19.5px] text-[#b8860b]">
          <TriangleAlert aria-hidden="true" size={15} strokeWidth={1.7} />
          You have unsaved changes. Navigating away will discard them.
        </div>
      </div>
    </section>
  );
}
