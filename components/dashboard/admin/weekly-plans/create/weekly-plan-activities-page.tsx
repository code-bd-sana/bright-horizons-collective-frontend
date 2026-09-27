'use client';

import {
  ArrowLeft,
  Check,
  ChevronDown,
  Hand,
  ImageIcon,
  Loader2,
  Search,
  X,
  Zap,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { useAdminActivities } from '@/features/activities/hooks/activities.queries';
import { type Activity } from '@/features/activities/model/activity.types';
import { useWeeklyPlanFormStore } from '@/features/weekly-plans';
import { WeeklyPlanFormStepper } from './weekly-plan-form-stepper';

function ActivityIcon({ index }: { index: number }) {
  const Icon = index % 3 === 0 ? Zap : index % 3 === 1 ? Hand : ImageIcon;
  return <Icon aria-hidden="true" size={15} strokeWidth={1.7} />;
}

export function WeeklyPlanActivitiesPage() {
  const router = useRouter();
  const formStore = useWeeklyPlanFormStore();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All categories');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data: activitiesEnvelope, isLoading } = useAdminActivities({ limit: 100 });
  const allActivities: Activity[] = useMemo(
    () => activitiesEnvelope?.data ?? [],
    [activitiesEnvelope]
  );

  const visibleActivities = useMemo(() => {
    return allActivities.filter((act) => {
      const matchesSearch =
        search.trim() === '' ||
        act.title.toLowerCase().includes(search.toLowerCase()) ||
        act.shortDescription.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All categories' ||
        act.developmentCategory.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [allActivities, search, selectedCategory]);

  const selectedActivities = formStore.selectedActivities;
  const selectedIds = useMemo(
    () => new Set(selectedActivities.map((act) => act.id)),
    [selectedActivities]
  );

  const handleToggle = (activity: Activity) => {
    formStore.toggleActivity({
      id: activity.id,
      title: activity.title,
      category: activity.developmentCategory,
      duration: activity.estimatedDuration ?? undefined,
      age: `${activity.minAgeMonths}–${activity.maxAgeMonths} mo`,
    });
  };

  const handleNext = () => {
    if (selectedActivities.length === 0) {
      toast.error('Please select at least one activity before continuing.');
      return;
    }
    router.push('/dashboard/admin/weekly-plans/create/schedule');
  };

  const categoryFilterOptions = [
    'All categories',
    'Sensory',
    'Fine Motor',
    'Gross Motor',
    'Coordination',
    'Visual-Motor',
    'Speech & Language',
  ];

  return (
    <section className="mx-auto w-full min-w-0 max-w-246.75 pb-8 text-[#263238]">
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
          Create Weekly Plans
        </h1>

        <section className="overflow-x-auto rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)]">
          <WeeklyPlanFormStepper currentStep={2} />
        </section>

        <section className="rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:p-6 2xl:p-6">
          <h2 className="font-nunito text-lg font-bold leading-7 text-[#263238]">2. Activities</h2>
          <div className="mt-5 space-y-4">
            <p className="font-manrope text-sm leading-5.25 text-[#607d8b]">
              Search and select activities from the library to include in this plan. Selected
              activities will be organised into the weekly schedule in the next step.
            </p>

            {selectedActivities.length > 0 ? (
              <div className="flex flex-wrap items-center gap-1.5 rounded-[14px] border border-[rgba(47,125,126,0.13)] bg-[#edf6f2] p-3">
                <span className="font-manrope text-xs font-semibold leading-4.5 text-[#2f7d7e]">
                  {selectedActivities.length} selected:
                </span>
                {selectedActivities.map((act) => (
                  <button
                    key={act.id}
                    type="button"
                    onClick={() => formStore.removeActivity(act.id)}
                    className="flex items-center gap-1 rounded-full border border-[rgba(47,125,126,0.19)] bg-white px-2.25 py-0.75 font-manrope text-xs font-medium leading-4 text-[#2f7d7e] transition-colors hover:bg-[#e4f0ed]"
                  >
                    <span className="max-w-40 truncate">{act.title}</span>
                    <X aria-hidden="true" size={12} strokeWidth={2} />
                  </button>
                ))}
              </div>
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row 2xl:flex-row">
              <label className="flex h-10.5 min-w-0 flex-1 items-center gap-2 rounded-[14px] border border-[#e7eceb] bg-[#f4f8f6] px-3.5">
                <Search
                  aria-hidden="true"
                  className="size-4 shrink-0 text-[#607d8b]"
                  strokeWidth={1.7}
                />
                <span className="sr-only">Search activities</span>
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search activities by title or description..."
                  className="min-w-0 flex-1 bg-transparent font-manrope text-sm text-[#263238] outline-none placeholder:text-[rgba(38,50,56,0.5)]"
                />
              </label>

              <div className="relative w-full shrink-0 sm:w-48 2xl:w-48">
                <button
                  type="button"
                  aria-label="Filter activities"
                  aria-expanded={isFilterOpen}
                  onClick={() => setIsFilterOpen((open) => !open)}
                  className={`flex h-10.5 w-full items-center justify-between rounded-[14px] border px-3 font-manrope text-sm transition-colors ${
                    isFilterOpen
                      ? 'border-[#2f7d7e] bg-[#edf6f2] text-[#2f7d7e]'
                      : 'border-[#e7eceb] bg-[#f4f8f6] text-[#607d8b]'
                  }`}
                >
                  <span className="truncate">{selectedCategory}</span>
                  <ChevronDown
                    aria-hidden="true"
                    className={`size-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`}
                    strokeWidth={1.6}
                  />
                </button>
                {isFilterOpen ? (
                  <div className="absolute right-0 top-[calc(100%+8px)] z-30 min-w-48 rounded-2xl border border-[#e8ebe8] bg-white p-2 shadow-[0_8px_12px_rgba(38,50,56,0.12)]">
                    <div className="flex flex-col gap-1">
                      {categoryFilterOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setSelectedCategory(option);
                            setIsFilterOpen(false);
                          }}
                          className={`flex min-h-9 items-center rounded-lg px-3 py-1.5 text-left font-manrope text-sm font-medium transition-colors ${
                            selectedCategory === option
                              ? 'bg-[#edf6f2] font-semibold text-[#2f7d7e]'
                              : 'text-[#263238] hover:bg-[#f4f8f6]'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="max-h-96 space-y-2 overflow-y-auto pr-1">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12 text-[#607d8b]">
                  <Loader2 className="size-6 animate-spin text-[#2f7d7e]" />
                  <p className="mt-2 font-manrope text-sm">Loading activities from library...</p>
                </div>
              ) : visibleActivities.length === 0 ? (
                <div className="rounded-xl border border-dashed border-[#e7eceb] p-8 text-center text-[#607d8b]">
                  <p className="font-manrope text-sm">
                    No activities found matching your criteria.
                  </p>
                </div>
              ) : (
                visibleActivities.map((activity, index) => {
                  const selected = selectedIds.has(activity.id);

                  return (
                    <button
                      key={activity.id}
                      type="button"
                      onClick={() => handleToggle(activity)}
                      className={`flex w-full items-center gap-3.5 rounded-[14px] border p-3.5 text-left transition-colors ${
                        selected
                          ? 'border-[#2f7d7e] bg-[rgba(47,125,126,0.05)]'
                          : 'border-[#e7eceb] bg-white hover:bg-[#f8fbfa]'
                      }`}
                    >
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-[14px] bg-[rgba(47,125,126,0.09)] text-[#2f7d7e]">
                        <ActivityIcon index={index} />
                      </span>

                      <div className="min-w-0 flex-1">
                        <span className="block truncate font-manrope text-sm font-semibold text-[#263238]">
                          {activity.title}
                        </span>
                        <span className="block truncate font-manrope text-xs text-[#607d8b]">
                          {activity.developmentCategory} · {activity.minAgeMonths}–
                          {activity.maxAgeMonths} mo
                          {activity.estimatedDuration ? ` · ${activity.estimatedDuration}` : ''}
                        </span>
                      </div>

                      <span
                        className={`flex size-5 shrink-0 items-center justify-center rounded transition-colors ${
                          selected ? 'bg-[#2f7d7e] text-white' : 'bg-[#eef2f2] text-[#607d8b]'
                        }`}
                      >
                        {selected ? <Check aria-hidden="true" size={14} strokeWidth={2.4} /> : null}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </section>

        <section className="flex items-center justify-between rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:p-5 2xl:p-5">
          <button
            type="button"
            onClick={() => router.push('/dashboard/admin/weekly-plans/create')}
            className="flex h-10.5 items-center justify-center rounded-[14px] border border-[#e7eceb] px-5 font-manrope text-sm font-semibold text-[#607d8b] transition-colors hover:bg-[#f4f8f6]"
          >
            ← Previous
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="flex h-10.5 items-center justify-center rounded-[14px] bg-[#2f7d7e] px-6 font-manrope text-sm font-semibold text-white transition-colors hover:bg-[#266b6c]"
          >
            Next →
          </button>
        </section>
      </div>
    </section>
  );
}
