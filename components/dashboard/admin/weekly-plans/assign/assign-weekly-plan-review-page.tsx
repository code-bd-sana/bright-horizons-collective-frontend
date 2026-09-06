'use client';

import { ArrowLeft, TriangleAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { AssignmentStepper } from './assignment-stepper';

const assignmentSummary = [
  { label: 'Plan', value: 'Fine Motor Builder — Week 2' },
  {
    label: 'Families',
    value: 'The Okonkwo Family, The Martinez Family, The Chen Family',
    wide: true,
  },
  { label: 'Children', value: '4 children' },
  { label: 'Start Date', value: 'Not set' },
  { label: 'Replace Existing', value: 'No' },
];

export function AssignWeeklyPlanReviewPage() {
  const router = useRouter();

  return (
    <section className="mx-auto w-full max-w-196.75 pb-8 text-[#263238]">
      <div className="space-y-5">
        <button
          type="button"
          onClick={() => router.push('/dashboard/admin/weekly-plans')}
          className="flex items-center gap-1.5 font-manrope text-sm font-medium leading-5 text-[#607d8b]"
        >
          <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.5} />
          Back
        </button>

        <div>
          <h1 className="font-nunito text-2xl font-bold leading-9 text-[#263238]">
            Assign Weekly Plan
          </h1>
          <p className="mt-0.5 font-manrope text-[13px] leading-[19.5px] text-[#607d8b]">
            Assigning: Sensory Foundations — Week 1
          </p>
        </div>

        <section className="overflow-x-auto rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)]">
          <AssignmentStepper currentStep={5} />
        </section>

        <section className="rounded-2xl border border-[#e7eceb] bg-white p-6 shadow-[0_4px_6px_rgba(0,0,0,0.06)]">
          <h2 className="font-nunito text-lg font-bold leading-7 text-[#263238]">5. Review</h2>
          <div className="mt-5">
            <p className="font-manrope text-sm leading-5.25 text-[#607d8b]">
              Review your assignment before confirming.
            </p>
            <dl className="mt-5">
              {assignmentSummary.map(({ label, value, wide }) => (
                <div
                  key={label}
                  className="flex items-start justify-between border-b border-[#e7eceb] py-3"
                >
                  <dt className="font-manrope text-[13px] font-semibold leading-[19.5px] text-[#607d8b]">
                    {label}
                  </dt>
                  <dd
                    className={`font-manrope text-sm leading-5.25 text-[#263238] text-right ${wide ? 'max-w-93.5' : ''}`}
                  >
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-3 flex items-center gap-2 rounded-[14px] border border-[rgba(229,115,115,0.19)] bg-[#fce9e2] p-3">
              <TriangleAlert
                aria-hidden="true"
                size={15}
                strokeWidth={1.7}
                className="shrink-0 text-[#e57373]"
              />
              <p className="font-manrope text-[13px] leading-[19.5px] text-[#e57373]">
                Please select at least one family and set a start date before confirming.
              </p>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-between rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)]">
          <button
            type="button"
            onClick={() => router.push('/dashboard/admin/weekly-plans/assign/settings')}
            className="rounded-[14px] border border-[#e7eceb] px-4.25 py-2.75 font-manrope text-sm font-semibold leading-5 text-[#607d8b]"
          >
            ← Previous
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => router.push('/dashboard/admin/weekly-plans')}
              className="rounded-[14px] border border-[#e7eceb] px-4.25 py-2.75 font-manrope text-sm font-semibold leading-5 text-[#607d8b]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() =>
                toast.error(
                  'Please select at least one family and set a start date before confirming.'
                )
              }
              className="rounded-[14px] bg-[#2f7d7e] px-5 py-2.5 font-manrope text-sm font-semibold leading-5 text-white"
            >
              Assign Weekly Plan
            </button>
          </div>
        </section>
      </div>
    </section>
  );
}
