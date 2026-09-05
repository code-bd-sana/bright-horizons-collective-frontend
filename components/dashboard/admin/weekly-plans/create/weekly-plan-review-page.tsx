'use client';

import { ArrowLeft, TriangleAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { WeeklyPlanFormStepper } from './weekly-plan-form-stepper';

const schedule = [
  ['Mon', 'Color Sorting Sensory Play'],
  ['Tue', 'Sensory Bin: Kinetic Sand'],
  ['Wed', 'Color Sorting Sensory Play'],
  ['Thu', 'Animal Sound Story'],
  ['Fri', 'Sensory Bin: Kinetic Sand'],
];

function PublishingButton({ children, className, ...props }: React.ComponentProps<'button'>) {
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

function PlanPreviewCard() {
  return (
    <section className="overflow-hidden rounded-2xl border border-[#e7eceb] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
      <div className="border-b border-[#e7eceb] bg-[rgba(47,125,126,0.03)] px-5 pt-5 pb-5.25">
        <h3 className="font-nunito text-xl font-bold leading-7.5 text-[#263238]">
          Sensory Foundations — Week 1
        </h3>
        <div className="mt-2 flex gap-2">
          <span className="rounded-full bg-[#edf6f2] px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 text-[#2f7d7e]">
            Published
          </span>
          <span className="rounded-full bg-[#edf6f2] px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 text-[#2f7d7e]">
            Little Steps
          </span>
        </div>
      </div>
      <div className="p-5">
        <p className="font-manrope text-sm leading-[22.4px] text-[#607d8b]">
          A structured week of sensory-play activities building early color and texture recognition
          for infants and young toddlers.
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          {schedule.map(([day, activity]) => (
            <div key={day} className="h-20.25 rounded-[14px] bg-[#f4f8f6] p-3">
              <p className="font-nunito text-xs font-bold leading-4.5 text-[#2f7d7e]">{day}</p>
              <p className="mt-1.5 font-manrope text-[11px] leading-[14.3px] text-[#263238]">
                · {activity}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WeeklyPlanReviewPage() {
  const router = useRouter();

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
          <WeeklyPlanFormStepper currentStep={5} />
        </section>

        <section className="rounded-2xl border border-[#e7eceb] bg-white p-6 shadow-[0_4px_6px_rgba(0,0,0,0.06)]">
          <h2 className="font-nunito text-lg font-bold leading-7 text-[#263238]">5. Review</h2>
          <div className="mt-5 space-y-4">
            <p className="font-manrope text-sm leading-5.25 text-[#607d8b]">
              Review your plan before publishing. This is what administrators will see in the Weekly
              Plan Details view.
            </p>
            <PlanPreviewCard />
          </div>
        </section>

        <section className="flex flex-col gap-4 rounded-2xl border border-[#e7eceb] bg-white p-5 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-nunito text-xl font-bold leading-7.5 text-[#263238]">Publishing</h2>
          <div className="flex flex-wrap gap-2">
            <PublishingButton
              onClick={() => router.push('/dashboard/admin/weekly-plans')}
              className="border-[#e7eceb] text-[#607d8b]"
            >
              Discard
            </PublishingButton>
            <PublishingButton
              onClick={() => toast.success('Weekly plan saved as a draft.')}
              className="border-[#82b1b2] text-[#2f7d7e]"
            >
              Save Draft
            </PublishingButton>
            <PublishingButton
              onClick={() => toast.success('Plan preview is ready.')}
              className="border-[#e7eceb] text-[#607d8b]"
            >
              Preview
            </PublishingButton>
            <PublishingButton
              onClick={() => {
                toast.success('Weekly plan published.');
                router.push('/dashboard/admin/weekly-plans');
              }}
              className="border-[#2f7d7e] bg-[#2f7d7e] text-white"
            >
              Publish
            </PublishingButton>
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
