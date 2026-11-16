'use client';

import { ArrowUpDown, Check, ChevronDown, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export type FilterName = 'category' | 'age' | 'membership' | 'status';

export type TherapyToyFiltersProps = {
  search: string;
  category: string;
  age: string;
  membership: string;
  status: string;
  sortByTime?: 'new-to-old' | 'old-to-new';
  onSearchChange: (value: string) => void;
  onFilterChange: (filter: FilterName, value: string) => void;
  onSortByTimeChange?: (value: 'new-to-old' | 'old-to-new') => void;
};

const filterOptions: Record<FilterName, { label: string; values: string[] }> = {
  category: {
    label: 'Category',
    values: ['Fine Motor', 'Gross Motor', 'Sensory', 'Visual Motor', 'Regulation'],
  },
  age: {
    label: 'Age',
    values: ['0–12 months', '1–3 years', '3–5 years', '5+ years'],
  },
  membership: {
    label: 'Membership',
    values: ['Little Steps', 'Grow Together', 'Personalized Pathways'],
  },
  status: {
    label: 'Status',
    values: ['Published', 'Draft', 'Archived'],
  },
};

function ToyFilterDropdown({
  filter,
  value,
  isRightAligned = false,
  isOpen,
  onOpenChange,
  onChange,
}: {
  filter: FilterName;
  value: string;
  isRightAligned?: boolean;
  isOpen: boolean;
  onOpenChange: (filter: FilterName | null) => void;
  onChange: (value: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { label, values } = filterOptions[filter];

  useEffect(() => {
    if (!isOpen) return;
    const close = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) onOpenChange(null);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onOpenChange(null);
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen, onOpenChange]);

  const isActive = value !== 'all';

  return (
    <div ref={containerRef} className={`relative w-full min-w-0 ${isOpen ? 'z-50' : 'z-10'}`}>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={() => onOpenChange(isOpen ? null : filter)}
        className={`flex h-9.5 w-full min-w-0 items-center justify-between gap-1.5 rounded-[14px] border px-2.5 font-manrope text-[13px] leading-5 transition-colors ${
          isOpen
            ? 'border-[#d5e5e5] bg-[#d5e5e5] text-[#0f1416]'
            : isActive
              ? 'border-[#2f7d7e] bg-[#edf6f5] text-[#278488] font-medium'
              : 'border-[#e7eceb] bg-[#f4f8f6] text-[#607d8b] hover:border-[#accbcb]'
        }`}
      >
        <span className="truncate">{value === 'all' ? label : value}</span>
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
          className={`absolute top-[calc(100%+8px)] z-50 max-h-64 w-full min-w-44 overflow-y-auto rounded-2xl border border-[#e8ebe8] bg-white p-3 shadow-[0_8px_12px_rgba(38,50,56,0.12)] ${
            isRightAligned ? 'right-0' : 'left-0'
          }`}
        >
          <div className="flex flex-col gap-1.5">
            {['all', ...values].map((option) => {
              const selected = option === value;

              return (
                <button
                  key={option}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onChange(option);
                    onOpenChange(null);
                  }}
                  className={`flex min-h-8.5 w-full items-center rounded-lg px-2.5 py-1.5 text-left font-nunito text-sm font-medium leading-5 tracking-[-0.084px] transition-colors ${
                    selected ? 'bg-[#e9f1ee] text-[#174a4d]' : 'text-[#263238] hover:bg-[#f4f8f6]'
                  }`}
                >
                  {option === 'all' ? `All ${label}` : option}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ToySortDropdown({
  value = 'new-to-old',
  isOpen,
  onOpenChange,
  onChange,
}: {
  value?: 'new-to-old' | 'old-to-new';
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onChange: (value: 'new-to-old' | 'old-to-new') => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const close = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) onOpenChange(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onOpenChange(false);
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen, onOpenChange]);

  const sortOptions = [
    { label: 'New to Old', sublabel: 'Newest first', value: 'new-to-old' as const },
    { label: 'Old to New', sublabel: 'Oldest first', value: 'old-to-new' as const },
  ];

  return (
    <div
      ref={containerRef}
      className={`relative w-full min-w-0 col-span-1 sm:col-span-2 lg:col-span-1 xl:col-span-1 ${
        isOpen ? 'z-50' : 'z-10'
      }`}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={() => onOpenChange(!isOpen)}
        className={`flex h-9.5 w-full min-w-0 items-center justify-between gap-1.5 rounded-[14px] border px-2.5 font-manrope text-[13px] leading-5 transition-colors ${
          isOpen
            ? 'border-[#d5e5e5] bg-[#d5e5e5] text-[#0f1416]'
            : value === 'old-to-new'
              ? 'border-[#2f7d7e] bg-[#edf6f5] text-[#278488] font-medium'
              : 'border-[#e7eceb] bg-[#f4f8f6] text-[#607d8b] hover:border-[#accbcb]'
        }`}
      >
        <span className="flex min-w-0 items-center gap-1.5 truncate">
          <ArrowUpDown
            aria-hidden="true"
            className="size-3.5 shrink-0 opacity-70"
            strokeWidth={1.6}
          />
          <span className="truncate">
            Sort: {value === 'old-to-new' ? 'Old to New' : 'New to Old'}
          </span>
        </span>
        <ChevronDown
          aria-hidden="true"
          className={`size-3.5 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          strokeWidth={1.6}
        />
      </button>
      {isOpen && (
        <div
          className="absolute right-0 top-[calc(100%+8px)] z-50 w-full min-w-48 rounded-2xl border border-[#e8ebe8] bg-white p-3 shadow-[0_8px_12px_rgba(38,50,56,0.12)]"
          role="listbox"
          aria-label="Sort options"
        >
          <div className="mb-2 px-1 font-manrope text-[11px] font-semibold uppercase tracking-wider text-[#7d8488]">
            Sort by Time
          </div>
          <div className="flex flex-col gap-1">
            {sortOptions.map((option) => {
              const selected = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onChange(option.value);
                    onOpenChange(false);
                  }}
                  className={`flex min-h-8.5 w-full items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-left font-nunito text-sm font-medium leading-5 tracking-[-0.084px] transition-colors ${
                    selected ? 'bg-[#e9f1ee] text-[#174a4d]' : 'text-[#263238] hover:bg-[#f4f8f6]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`grid size-4 shrink-0 place-items-center rounded border ${
                        selected ? 'border-[#2f7d7e] bg-[#2f7d7e]' : 'border-[#cbd5d1] bg-white'
                      }`}
                    >
                      {selected ? <Check aria-hidden="true" className="size-3 text-white" /> : null}
                    </span>
                    <span>{option.label}</span>
                  </div>
                  <span className="text-[11px] text-[#7d8488]">{option.sublabel}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export function TherapyToyFilters(props: TherapyToyFiltersProps) {
  const [openFilter, setOpenFilter] = useState<FilterName | 'sort' | null>(null);

  const filters: FilterName[] = ['category', 'age', 'membership', 'status'];

  return (
    <section
      className={`min-w-0 rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)] relative transition-all ${
        openFilter ? 'z-50' : 'z-20'
      }`}
    >
      <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[minmax(160px,1fr)_165px_105px_180px_105px_165px] 2xl:grid-cols-[minmax(192px,1fr)_175px_110px_185px_110px_170px] xl:items-center">
        <label className="flex h-9.5 min-w-0 items-center gap-2 rounded-[14px] border border-[#e7eceb] bg-[#f4f8f6] px-3 col-span-1 sm:col-span-2 lg:col-span-1 xl:col-span-1">
          <Search
            aria-hidden="true"
            className="size-3.75 shrink-0 text-[#607d8b]"
            strokeWidth={1.7}
          />
          <span className="sr-only">Search therapy toys</span>
          <input
            value={props.search}
            onChange={(event) => props.onSearchChange(event.target.value)}
            placeholder="Search by title, keywords, or author..."
            className="min-w-0 flex-1 bg-transparent font-manrope text-sm text-[#263238] outline-none placeholder:text-[rgba(38,50,56,0.5)]"
          />
        </label>
        {filters.map((filter) => (
          <ToyFilterDropdown
            key={filter}
            filter={filter}
            value={props[filter]}
            isRightAligned={filter === 'status'}
            isOpen={openFilter === filter}
            onOpenChange={setOpenFilter}
            onChange={(value) => props.onFilterChange(filter, value)}
          />
        ))}
        {props.onSortByTimeChange && (
          <ToySortDropdown
            value={props.sortByTime}
            isOpen={openFilter === 'sort'}
            onOpenChange={(open) => setOpenFilter(open ? 'sort' : null)}
            onChange={props.onSortByTimeChange}
          />
        )}
      </div>
    </section>
  );
}
