'use client';

import { ArrowLeft, ChevronDown, TriangleAlert, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { WeeklyPlanFormStepper } from './weekly-plan-form-stepper';

const schedule = [
  ['Monday', 'Color Sorting Sensory Play', '#2f7d7e'],
  ['Tuesday', 'Sensory Bin: Kinetic Sand', '#2f7d7e'],
  ['Wednesday', 'Color Sorting Sensory Play', '#2f7d7e'],
  ['Thursday', 'Animal Sound Story', '#f6c344'],
  ['Friday', 'Sensory Bin: Kinetic Sand', '#2f7d7e'],
] as const;

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

function DayScheduleCard({ day, activity, tone }: { day: string; activity: string; tone: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex min-h-30 flex-col gap-2 rounded-[14px] border border-[#e7eceb] bg-[#f4f8f6] p-3">
      <p className="font-nunito text-[13px] font-bold leading-[19.5px] text-[#2f7d7e]">{day}</p>
      <div className="flex items-center gap-1.5 rounded-[10px] border border-[#e7eceb] bg-white px-2.25 py-1.75">
        <span className="size-1.5 shrink-0 rounded-full" style={{ backgroundColor: tone }} />
        <span className="min-w-0 flex-1 truncate font-manrope text-[11px] leading-[16.5px] text-[#263238]">
          {activity}
        </span>
        <X aria-hidden="true" className="size-2.75 shrink-0 text-[#607d8b]" strokeWidth={1.7} />
      </div>
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="flex h-7.5 w-full items-center justify-between rounded-[10px] border border-dashed border-[rgba(47,125,126,0.25)] bg-[rgba(47,125,126,0.06)] px-2.25 font-nunito text-xs leading-4 text-[#2f7d7e]"
      >
        Add activity
        <ChevronDown aria-hidden="true" className="size-2.75" strokeWidth={1.7} />
      </button>
      {isOpen ? (
        <div className="absolute left-3 right-3 top-[calc(100%-2px)] z-30 rounded-xl border border-[#e8ebe8] bg-white p-2 shadow-[0_8px_12px_rgba(38,50,56,0.12)]">
          {['Color Sorting Sensory Play', 'Animal Sound Story', 'Sensory Bin: Kinetic Sand'].map(
            (item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  toast.success(`${item} added to ${day}.`);
                }}
                className="flex min-h-8 w-full items-center rounded-lg px-2.5 py-1.5 text-left font-nunito text-xs text-[#263238] hover:bg-[#f4f8f6]"
              >
                {item}
              </button>
            )
          )}
        </div>
      ) : null}
    </div>
  );
}

export function WeeklyPlanSchedulePage() {
  const router = useRouter();

  return (
    <section className="mx-auto w-full max-w-237.25 pb-8 text-[#263238]">
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
          <WeeklyPlanFormStepper currentStep={3} />
        </section>

        <section className="rounded-2xl border border-[#e7eceb] bg-white p-6 shadow-[0_4px_6px_rgba(0,0,0,0.06)]">
          <h2 className="font-nunito text-lg font-bold leading-7 text-[#263238]">3. Schedule</h2>
          <div className="mt-5 space-y-4">
            <p className="font-manrope text-sm leading-5.25 text-[#607d8b]">
              Assign selected activities to days Monday–Friday. An activity can appear on multiple
              days.
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {schedule.map(([day, activity, tone]) => (
                <DayScheduleCard key={day} day={day} activity={activity} tone={tone} />
              ))}
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4 rounded-2xl border border-[#e7eceb] bg-white p-5 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            <FlowButton
              onClick={() => router.push('/dashboard/admin/weekly-plans/create/activities')}
              className="border-[#e7eceb] text-[#607d8b]"
            >
              ← Previous
            </FlowButton>
            <FlowButton
              onClick={() => router.push('/dashboard/admin/weekly-plans/create/membership')}
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
