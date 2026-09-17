'use client';

import { ChevronDown, Search, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export type ActivityFiltersState = {
  search: string;
  category: string;
  ageRange: string;
  durationRange: string;
  difficulty: string;
  membership: string;
  status: string;
};

export type FilterName =
  'category' | 'ageRange' | 'durationRange' | 'difficulty' | 'membership' | 'status';

type FilterOption = {
  label: string;
  value: string;
};

const filterOptions: Record<FilterName, { label: string; options: FilterOption[] }> = {
  category: {
    label: 'Category',
    options: [
      { label: 'All Categories', value: 'all' },
      { label: 'Fine Motor', value: 'Fine Motor' },
      { label: 'Gross Motor', value: 'Gross Motor' },
      { label: 'Sensory', value: 'Sensory' },
      { label: 'Coordination', value: 'Coordination' },
      { label: 'Visual-Motor', value: 'Visual-Motor' },
      { label: 'Speech & Language', value: 'Speech & Language' },
      { label: 'Social-Emotional', value: 'Social-Emotional' },
      { label: 'Self Regulation', value: 'Self Regulation' },
    ],
  },
  ageRange: {
    label: 'Age',
    options: [
      { label: 'All Ages', value: 'all' },
      { label: '0–12 mo', value: '0-12' },
      { label: '12–24 mo', value: '12-24' },
      { label: '2–3 yr', value: '24-36' },
      { label: '3–5 yr', value: '36-60' },
      { label: '5+ yr', value: '60-2160' },
    ],
  },
  durationRange: {
    label: 'Duration',
    options: [
      { label: 'All Durations', value: 'all' },
      { label: 'Under 10 min', value: 'under-10' },
      { label: '10–20 min', value: '10-20' },
      { label: '20–30 min', value: '20-30' },
      { label: '30+ min', value: '30-plus' },
    ],
  },
  difficulty: {
    label: 'Difficulty',
    options: [
      { label: 'All Difficulties', value: 'all' },
      { label: 'Easy', value: 'EASY' },
      { label: 'Moderate', value: 'MODERATE' },
      { label: 'Challenging', value: 'CHALLENGING' },
    ],
  },
  membership: {
    label: 'Membership',
    options: [
      { label: 'All Memberships', value: 'all' },
      { label: 'Little Steps', value: 'LITTLE_STEPS' },
      { label: 'Grow Together', value: 'GROW_TOGETHER' },
      { label: 'Personalized Pathways', value: 'PERSONALIZED_PATHWAYS' },
    ],
  },
  status: {
    label: 'Status',
    options: [
      { label: 'All Statuses', value: 'all' },
      { label: 'Published', value: 'PUBLISHED' },
      { label: 'Draft', value: 'DRAFT' },
      { label: 'Archived', value: 'ARCHIVED' },
    ],
  },
};

function ActivityFilterDropdown({
  filter,
  value,
  isOpen,
  onOpenChange,
  onChange,
}: {
  filter: FilterName;
  value: string;
  isOpen: boolean;
  onOpenChange: (filter: FilterName | null) => void;
  onChange: (value: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { label, options } = filterOptions[filter];
  const selectedOption = options.find((option) => option.value === value);
  const isActive = value !== 'all';

  useEffect(() => {
    if (!isOpen) return;

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) onOpenChange(null);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onOpenChange(null);
    };

    document.addEventListener('mousedown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);

    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen, onOpenChange]);

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={() => onOpenChange(isOpen ? null : filter)}
        className={`flex h-9.5 w-full items-center justify-between rounded-[14px] border px-2.5 font-manrope text-[13px] leading-5 transition-colors ${
          isOpen
            ? 'border-[#d5e5e5] bg-[#d5e5e5] text-[#0f1416]'
            : isActive
              ? 'border-[#2f7d7e] bg-[#edf6f5] text-[#278488] font-medium'
              : 'border-[#e7eceb] bg-[#f4f8f6] text-[#607d8b] hover:border-[#accbcb]'
        }`}
      >
        <span className="truncate">{!isActive ? label : (selectedOption?.label ?? label)}</span>
        <ChevronDown
          aria-hidden="true"
          className={`size-3.5 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          strokeWidth={1.6}
        />
      </button>
      {isOpen ? (
        <div
          role="listbox"
          aria-label={`${label} options`}
          className="absolute left-0 top-[calc(100%+8px)] z-30 max-h-64 w-full min-w-44 overflow-y-auto rounded-2xl border border-[#e8ebe8] bg-white p-3 shadow-[0_8px_12px_rgba(38,50,56,0.12)]"
        >
          <div className="flex flex-col gap-1.5">
            {options.map((option) => {
              const selected = option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onChange(option.value);
                    onOpenChange(null);
                  }}
                  className={`flex min-h-8.5 w-full items-center rounded-lg px-2.5 py-1.5 text-left font-nunito text-sm font-medium leading-5 tracking-[-0.084px] transition-colors ${
                    selected ? 'bg-[#e9f1ee] text-[#174a4d]' : 'text-[#263238] hover:bg-[#f4f8f6]'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function ActivityFilters({
  filters,
  onSearchChange,
  onFilterChange,
  onResetFilters,
}: {
  filters: ActivityFiltersState;
  onSearchChange: (value: string) => void;
  onFilterChange: (filter: FilterName, value: string) => void;
  onResetFilters: () => void;
}) {
  const [openFilter, setOpenFilter] = useState<FilterName | null>(null);

  const filterNames: FilterName[] = [
    'category',
    'ageRange',
    'durationRange',
    'difficulty',
    'membership',
    'status',
  ];

  const hasActiveFilters =
    Boolean(filters.search.trim()) || filterNames.some((key) => filters[key] !== 'all');

  return (
    <section className="min-w-0 rounded-2xl border border-[#e7eceb] bg-white p-4.25 shadow-[0_4px_6px_rgba(0,0,0,0.06)]">
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 xl:items-center">
        <label className="flex h-9.5 min-w-0 items-center gap-2 rounded-[14px] border border-[#e7eceb] bg-[#f4f8f6] px-3.25 sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-1">
          <Search
            aria-hidden="true"
            className="size-3.75 shrink-0 text-[#607d8b]"
            strokeWidth={1.7}
          />
          <span className="sr-only">Search activities</span>
          <input
            value={filters.search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search activities..."
            className="min-w-0 flex-1 bg-transparent font-manrope text-sm leading-5 text-[#263238] outline-none placeholder:text-[rgba(38,50,56,0.5)]"
          />
        </label>

        {filterNames.map((filter) => (
          <ActivityFilterDropdown
            key={filter}
            filter={filter}
            value={filters[filter]}
            isOpen={openFilter === filter}
            onOpenChange={setOpenFilter}
            onChange={(value) => onFilterChange(filter, value)}
          />
        ))}
      </div>

      {hasActiveFilters && (
        <div className="mt-3 flex items-center justify-end border-t border-[#f0f4f4] pt-2.5">
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-1.5 font-manrope text-xs font-semibold text-[#607d8b] transition-colors hover:text-[#e57373]"
          >
            <X size={14} strokeWidth={2} />
            Reset all filters
          </button>
        </div>
      )}
    </section>
  );
}
