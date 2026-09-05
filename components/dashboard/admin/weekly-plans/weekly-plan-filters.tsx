'use client';

import { ChevronDown, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type FilterName = 'membership' | 'age' | 'status';

type WeeklyPlanFiltersProps = {
  search: string;
  membership: string;
  age: string;
  status: string;
  onSearchChange: (value: string) => void;
  onFilterChange: (filter: FilterName, value: string) => void;
};

type FilterOption = {
  label: string;
  value: string;
};

const filterOptions: Record<FilterName, { label: string; options: FilterOption[] }> = {
  membership: {
    label: 'Membership',
    options: [
      { label: 'All', value: 'all' },
      { label: 'Little Steps', value: 'Little Steps' },
      { label: 'Grow Together', value: 'Grow Together' },
      { label: 'Personalized Pathways', value: 'Personalized Pathways' },
    ],
  },
  age: {
    label: 'Age',
    options: [
      { label: '0–12 mo', value: '0–12 mo' },
      { label: '12–24 mo', value: '1–2 years' },
      { label: '2–3 yr', value: '2–3 years' },
      { label: '3–5 yr', value: '3–4 years' },
      { label: '5–7 yr', value: '5–7 yr' },
    ],
  },
  status: {
    label: 'Status',
    options: [
      { label: 'All', value: 'all' },
      { label: 'Published', value: 'Published' },
      { label: 'Draft', value: 'Draft' },
      { label: 'Archive', value: 'Archived' },
    ],
  },
};

function WeeklyPlanFilterDropdown({
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
        className={`flex h-9.5 w-full items-center justify-between rounded-[14px] border px-2 font-manrope text-[13px] leading-5 transition-colors ${isOpen ? 'border-[#d5e5e5] bg-[#d5e5e5] text-[#0f1416]' : 'border-[#e7eceb] bg-[#f4f8f6] text-[#607d8b] hover:border-[#accbcb]'}`}
      >
        <span className="truncate">
          {value === 'all' ? label : (selectedOption?.label ?? label)}
        </span>
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
          className="absolute left-0 top-[calc(100%+8px)] z-30 w-full min-w-40 rounded-2xl border border-[#e8ebe8] bg-white p-3 shadow-[0_8px_12px_rgba(38,50,56,0.12)]"
        >
          <div className="flex flex-col gap-2.5">
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
                  className={`flex min-h-9 w-full items-center rounded-lg px-3 py-2 text-left font-nunito text-sm font-medium leading-5 tracking-[-0.084px] transition-colors ${selected ? 'bg-[#e9f1ee] text-[#174a4d]' : 'text-[#263238] hover:bg-[#f4f8f6]'}`}
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

export function WeeklyPlanFilters(props: WeeklyPlanFiltersProps) {
  const [openFilter, setOpenFilter] = useState<FilterName | null>(null);

  return (
    <section className="rounded-2xl border border-[#e7eceb] bg-white p-4.25 shadow-[0_4px_6px_rgba(0,0,0,0.06)]">
      <div className="grid gap-3 lg:grid-cols-[minmax(192px,1fr)_194px_107px_110px] lg:items-center">
        <label className="flex h-9.5 min-w-0 items-center gap-2 rounded-[14px] border border-[#e7eceb] bg-[#f4f8f6] px-3.25">
          <Search
            aria-hidden="true"
            className="size-3.75 shrink-0 text-[#607d8b]"
            strokeWidth={1.7}
          />
          <span className="sr-only">Search weekly plans</span>
          <input
            value={props.search}
            onChange={(event) => props.onSearchChange(event.target.value)}
            placeholder="Search by title, keywords, or author..."
            className="min-w-0 flex-1 bg-transparent font-manrope text-sm leading-5 text-[#263238] outline-none placeholder:text-[rgba(38,50,56,0.5)]"
          />
        </label>
        {(Object.keys(filterOptions) as FilterName[]).map((filter) => (
          <WeeklyPlanFilterDropdown
            key={filter}
            filter={filter}
            value={props[filter]}
            isOpen={openFilter === filter}
            onOpenChange={setOpenFilter}
            onChange={(value) => props.onFilterChange(filter, value)}
          />
        ))}
      </div>
    </section>
  );
}
