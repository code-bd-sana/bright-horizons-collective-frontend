'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { AssignmentStepper } from './assignment-stepper';

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
            Assigning: Fine Motor Builder — Week 2
          </p>
        </div>

        <section className="overflow-x-auto rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)]">
          <AssignmentStepper currentStep={1} />
        </section>

        <section className="rounded-2xl border border-[#e7eceb] bg-white p-6 shadow-[0_4px_6px_rgba(0,0,0,0.06)]">
          <h2 className="font-nunito text-lg font-bold leading-7 text-[#263238]">
            1. Plan Summary
          </h2>
          <div className="mt-5 space-y-4">
            <p className="font-manrope text-sm leading-5.25 text-[#607d8b]">
              You are about to assign the following plan:
            </p>
            <section className="rounded-2xl border border-[#e7eceb] bg-white p-5 shadow-[0_4px_6px_rgba(0,0,0,0.06)]">
              <div className="max-w-145">
                <h3 className="font-nunito text-lg font-bold leading-7 text-[#263238]">
                  Fine Motor Builder — Week 2
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#edf6f2] px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 text-[#4caf50]">
                    Published
                  </span>
                  <span className="rounded-full bg-[#edf6f2] px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 text-[#2f7d7e]">
                    Little Steps
                  </span>
                  <span className="rounded-full bg-[rgba(47,125,126,0.06)] px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 text-[#2f7d7e]">
                    1–2 years
                  </span>
                </div>
                <p className="mt-3 font-manrope text-sm leading-[22.4px] text-[#607d8b]">
                  Five days of targeted fine motor activities progressing from pincer grasp to
                  hand-eye coordination challenges.
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <AssignmentStat label="Activities" value="5" />
                  <AssignmentStat label="Already Assigned To" value="28 families" />
                  <AssignmentStat label="Category" value="Fine Motor" />
                </div>
              </div>
            </section>
          </div>
        </section>

        <section className="flex items-center justify-between rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)]">
          <button
            type="button"
            disabled
            className="rounded-[14px] border border-[#e7eceb] px-4.25 py-2.75 font-manrope text-sm font-semibold leading-5 text-[#607d8b] opacity-40"
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
              onClick={() => router.push('/dashboard/admin/weekly-plans/assign/families')}
              className="rounded-[14px] bg-[#2f7d7e] px-5 py-2.5 font-manrope text-sm font-semibold leading-5 text-white"
            >
              Next →
            </button>
          </div>
        </section>
      </div>
    </section>
  );
}
