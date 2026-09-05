'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { AssignmentCalendar } from './assignment-calendar';
import { AssignmentStepper } from './assignment-stepper';

export function AssignWeeklyPlanSettingsPage() {
  const router = useRouter();
  const [replaceExisting, setReplaceExisting] = useState(false);
  const [openCalendar, setOpenCalendar] = useState<'start' | 'end' | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  function selectDate(field: 'start' | 'end', value: string) {
    if (field === 'start') setStartDate(value);
    else setEndDate(value);
    setOpenCalendar(null);
  }

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
          <AssignmentStepper currentStep={4} />
        </section>

        <section className="rounded-2xl border border-[#e7eceb] bg-white p-6 shadow-[0_4px_6px_rgba(0,0,0,0.06)]">
          <h2 className="font-nunito text-lg font-bold leading-7 text-[#263238]">4. Settings</h2>
          <div className="mt-5 space-y-5">
            <div className="relative">
              <span className="font-manrope text-[13px] font-semibold leading-[19.5px] text-[#263238]">
                Start Date <span className="text-[#e57373]">*</span>
              </span>
              <button
                type="button"
                onClick={() => setOpenCalendar((current) => (current === 'start' ? null : 'start'))}
                className="mt-1.5 h-10.75 w-full rounded-xl border border-[#e7eceb] bg-[#f4f8f6] px-3 text-left font-manrope text-[13px] leading-[19.5px] text-[#263238]"
              >
                {startDate || <span className="text-[#7d8488]">mm/dd/yyyy</span>}
              </button>
              {openCalendar === 'start' ? (
                <div className="absolute left-0 top-[calc(100%+8px)] z-30">
                  <AssignmentCalendar onSelect={(value) => selectDate('start', value)} />
                </div>
              ) : null}
            </div>

            <div className="relative">
              <span className="font-manrope text-[13px] font-semibold leading-[19.5px] text-[#263238]">
                End Date
              </span>
              <button
                type="button"
                onClick={() => setOpenCalendar((current) => (current === 'end' ? null : 'end'))}
                className="mt-1.5 h-10.75 w-full rounded-xl border border-[#e7eceb] bg-[#f4f8f6] px-3 text-left font-manrope text-[13px] leading-[19.5px] text-[#263238]"
              >
                {endDate || <span className="text-[#7d8488]">mm/dd/yyyy</span>}
              </button>
              <span className="mt-1 block font-manrope text-xs leading-4.5 text-[#607d8b]">
                Leave blank for open-ended plans
              </span>
              {openCalendar === 'end' ? (
                <div className="absolute left-0 top-[calc(100%+8px)] z-30">
                  <AssignmentCalendar onSelect={(value) => selectDate('end', value)} />
                </div>
              ) : null}
            </div>

            <label className="block">
              <span className="font-manrope text-[13px] font-semibold leading-[19.5px] text-[#263238]">
                Notes for Parents
              </span>
              <textarea
                rows={3}
                placeholder="Optional message shown to families when they receive this assignment..."
                className="mt-1.5 block h-20 w-full resize-none rounded-xl border border-[#e7eceb] bg-[#f4f8f6] px-3.75 py-2.75 font-manrope text-sm leading-5.25 text-[#263238] outline-none placeholder:text-[rgba(38,50,56,0.5)] focus:border-[#2f7d7e]"
              />
            </label>

            <section className="flex items-center justify-between rounded-[14px] border border-[#e7eceb] bg-[#f4f8f6] p-4">
              <div>
                <h3 className="font-manrope text-sm font-semibold leading-5.25 text-[#263238]">
                  Replace existing plan?
                </h3>
                <p className="font-manrope text-xs leading-4.5 text-[#607d8b]">
                  If a child already has an active plan, this will replace it.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={replaceExisting}
                onClick={() => setReplaceExisting((current) => !current)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${replaceExisting ? 'bg-[#2f7d7e]' : 'bg-[#d1d5db]'}`}
              >
                <span
                  className={`absolute left-1 top-1 size-4 rounded-full bg-white transition-transform ${replaceExisting ? 'translate-x-5' : 'translate-x-0'}`}
                />
              </button>
            </section>
          </div>
        </section>

        <section className="flex items-center justify-between rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)]">
          <button
            type="button"
            onClick={() => router.push('/dashboard/admin/weekly-plans/assign/children')}
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
              onClick={() => {
                toast.success('Assignment settings saved.');
                router.push('/dashboard/admin/weekly-plans/assign/review');
              }}
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
