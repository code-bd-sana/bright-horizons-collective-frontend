'use client';

import {
  ArrowLeft,
  Check,
  ChevronDown,
  Hand,
  ImageIcon,
  Search,
  TriangleAlert,
  X,
  Zap,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { WeeklyPlanFormStepper } from './weekly-plan-form-stepper';

type Activity = {
  id: number;
  title: string;
  details: string;
  tone: string;
};

const activities: Activity[] = [
  {
    id: 1,
    title: 'Color Sorting Sensory Play',
    details: 'Sensory Play · 20 min · 1–2 years',
    tone: 'bg-[rgba(47,125,126,0.09)] text-[#2f7d7e]',
  },
  {
    id: 2,
    title: 'Finger Grasp Pom-Pom Transfer',
    details: 'Fine Motor · 15 min · 1–2 years',
    tone: 'bg-[rgba(143,185,168,0.09)] text-[#6c9988]',
  },
  {
    id: 3,
    title: 'Balance Beam Walk',
    details: 'Gross Motor · 25 min · 2–3 years',
    tone: 'bg-[rgba(242,181,159,0.09)] text-[#d88d73]',
  },
  {
    id: 4,
    title: 'Shape Puzzle Matching',
    details: 'Cognitive · 15 min · 1–2 years',
    tone: 'bg-[rgba(139,207,232,0.16)] text-[#49a8d1]',
  },
  {
    id: 5,
    title: 'Animal Sound Story',
    details: 'Language · 15 min · 2–3 years',
    tone: 'bg-[rgba(246,195,68,0.09)] text-[#c69009]',
  },
  {
    id: 6,
    title: 'Obstacle Course Challenge',
    details: 'Gross Motor · 30 min · 3–5 years',
    tone: 'bg-[rgba(242,181,159,0.09)] text-[#d88d73]',
  },
  {
    id: 7,
    title: 'Sensory Bin: Kinetic Sand',
    details: 'Sensory Play · 20 min · 2–3 years',
    tone: 'bg-[rgba(47,125,126,0.09)] text-[#2f7d7e]',
  },
  {
    id: 8,
    title: 'Verbal Directions Game',
    details: 'Language · 15 min · 2–3 years',
    tone: 'bg-[rgba(246,195,68,0.09)] text-[#c69009]',
  },
];

function ActivityIcon({ index }: { index: number }) {
  const Icon = index % 3 === 0 ? Zap : index % 3 === 1 ? Hand : ImageIcon;
  return <Icon aria-hidden="true" size={15} strokeWidth={1.7} />;
}

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

export function WeeklyPlanActivitiesPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState<number[]>([1, 5]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const visibleActivities = useMemo(
    () =>
      activities.filter((activity) =>
        `${activity.title} ${activity.details}`.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );
  const selectedActivities = activities.filter((activity) => selectedIds.includes(activity.id));
  const toggleActivity = (activityId: number) => {
    setSelectedIds((current) =>
      current.includes(activityId)
        ? current.filter((id) => id !== activityId)
        : [...current, activityId]
    );
  };

  return (
    <section className="mx-auto w-full max-w-246.75 pb-8 text-[#263238]">
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
          <WeeklyPlanFormStepper currentStep={2} />
        </section>

        <section className="rounded-2xl border border-[#e7eceb] bg-white p-6 shadow-[0_4px_6px_rgba(0,0,0,0.06)]">
          <h2 className="font-nunito text-lg font-bold leading-7 text-[#263238]">2. Activities</h2>
          <div className="mt-5 space-y-4">
            <p className="font-manrope text-sm leading-5.25 text-[#607d8b]">
              Search and select activities from the library to include in this plan. Selected
              activities will be organised into the weekly schedule in the next step.
            </p>
            <div className="flex flex-wrap items-center gap-1.5 rounded-[14px] border border-[rgba(47,125,126,0.13)] bg-[#edf6f2] p-3">
              <span className="font-manrope text-xs font-semibold leading-4.5 text-[#2f7d7e]">
                {selectedActivities.length} selected:
              </span>
              {selectedActivities.map((activity) => (
                <button
                  key={activity.id}
                  type="button"
                  onClick={() => toggleActivity(activity.id)}
                  className="flex items-center gap-1 rounded-full border border-[rgba(47,125,126,0.19)] bg-white px-2.25 py-0.75 font-manrope text-xs font-medium leading-4 text-[#2f7d7e]"
                >
                  {activity.title}
                  <X aria-hidden="true" size={10} strokeWidth={1.8} />
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <label className="flex h-9.5 min-w-0 flex-1 items-center gap-2 rounded-[14px] border border-[#e7eceb] bg-[#f4f8f6] px-3">
                <Search
                  aria-hidden="true"
                  className="size-3.5 shrink-0 text-[#607d8b]"
                  strokeWidth={1.7}
                />
                <span className="sr-only">Search activities</span>
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search activities..."
                  className="min-w-0 flex-1 bg-transparent font-manrope text-[13px] leading-5 text-[#263238] outline-none placeholder:text-[rgba(38,50,56,0.5)]"
                />
              </label>
              <div className="relative w-28 shrink-0">
                <button
                  type="button"
                  aria-label="Filter activities"
                  aria-expanded={isFilterOpen}
                  onClick={() => setIsFilterOpen((open) => !open)}
                  className={`flex h-9.5 w-full items-center justify-between rounded-[14px] border px-2 font-manrope text-[13px] leading-5 transition-colors ${isFilterOpen ? 'border-[#d5e5e5] bg-[#d5e5e5] text-[#0f1416]' : 'border-[#e7eceb] bg-[#f4f8f6] text-[#607d8b]'}`}
                >
                  <span />
                  <ChevronDown
                    aria-hidden="true"
                    className={`size-3.5 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`}
                    strokeWidth={1.6}
                  />
                </button>
                {isFilterOpen ? (
                  <div className="absolute right-0 top-[calc(100%+8px)] z-30 min-w-40 rounded-2xl border border-[#e8ebe8] bg-white p-3 shadow-[0_8px_12px_rgba(38,50,56,0.12)]">
                    <div className="flex flex-col gap-2.5">
                      {[
                        'All categories',
                        'Sensory Play',
                        'Fine Motor',
                        'Gross Motor',
                        'Language',
                      ].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setIsFilterOpen(false)}
                          className="flex min-h-9 items-center rounded-lg px-3 py-2 text-left font-nunito text-sm font-medium leading-5 tracking-[-0.084px] text-[#263238] hover:bg-[#f4f8f6]"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="max-h-76 space-y-1.5 overflow-y-auto pr-1">
              {visibleActivities.map((activity, index) => {
                const selected = selectedIds.includes(activity.id);
                return (
                  <button
                    key={activity.id}
                    type="button"
                    onClick={() => toggleActivity(activity.id)}
                    className={`flex w-full items-center gap-3 rounded-[14px] border p-3 text-left transition-colors ${selected ? 'border-[#2f7d7e] bg-[rgba(47,125,126,0.03)]' : 'border-[#e7eceb] bg-white hover:bg-[#f8fbfa]'}`}
                  >
                    <span
                      className={`flex size-9 shrink-0 items-center justify-center rounded-[14px] ${activity.tone}`}
                    >
                      <ActivityIcon index={index} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-manrope text-[13px] font-semibold leading-[19.5px] text-[#263238]">
                        {activity.title}
                      </span>
                      <span className="block truncate font-manrope text-[11px] font-medium leading-[16.5px] text-[#607d8b]">
                        {activity.details}
                      </span>
                    </span>
                    <span
                      className={`flex size-5 shrink-0 items-center justify-center rounded ${selected ? 'bg-[#2f7d7e] text-white' : 'bg-[#eef2f2] text-[#607d8b]'}`}
                    >
                      {selected ? <Check aria-hidden="true" size={14} strokeWidth={2.1} /> : null}
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
              onClick={() => router.push('/dashboard/admin/weekly-plans/create')}
              className="border-[#e7eceb] text-[#607d8b]"
            >
              ← Previous
            </FlowButton>
            <FlowButton
              onClick={() => router.push('/dashboard/admin/weekly-plans/create/schedule')}
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
