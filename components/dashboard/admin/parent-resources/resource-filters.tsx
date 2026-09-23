'use client';

import { ChevronDown, Search } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

export type FilterName = 'category' | 'type' | 'membership' | 'status';

export type ResourceFiltersProps = {
  search: string;
  category: string;
  type: string;
  membership: string;
  status: string;
  availableCategories?: string[];
  onSearchChange: (value: string) => void;
  onFilterChange: (filter: FilterName, value: string) => void;
};

const defaultCategories = [
  'Sensory Development',
  'Fine Motor',
  'Gross Motor',
  'Daily Living',
  'Communication',
  'Emotional Regulation',
];

const baseFilterOptions: Record<FilterName, { label: string; values: string[]; width: string }> = {
  category: {
    label: 'Category',
    values: defaultCategories,
    width: '2xl:w-47',
  },
  type: {
    label: 'Type',
    values: ['Article', 'Guide', 'PDF', 'Printable', 'Checklist'],
    width: '2xl:w-26.75',
  },
  membership: {
    label: 'Membership',
    values: ['Little Steps', 'Grow Together', 'Personalized Pathways'],
    width: '2xl:w-48.5',
  },
  status: {
    label: 'Status',
    values: ['Published', 'Draft', 'Archived'],
    width: '2xl:w-27.5',
  },
};

function FilterDropdown({
  label,
  values,
  width,
  value,
  isOpen,
  onOpenChange,
  onChange,
}: {
  label: string;
  values: string[];
  width: string;
  value: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onChange: (value: string) => void;
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

  return (
    <div ref={containerRef} className={`relative w-full ${width}`}>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={() => onOpenChange(!isOpen)}
        className={`flex h-9.5 w-full items-center justify-between rounded-[14px] border px-2 font-manrope text-[13px] leading-5 transition-colors ${
          isOpen
            ? 'border-[#d5e5e5] bg-[#d5e5e5] text-[#0f1416]'
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
      {isOpen && (
        <div
          className="absolute left-0 top-[calc(100%+8px)] z-30 max-h-64 w-full min-w-40 overflow-y-auto rounded-2xl border border-[#e8ebe8] bg-white p-3 shadow-[0_8px_12px_rgba(38,50,56,0.12)]"
          role="listbox"
          aria-label={`${label} options`}
        >
          <div className="flex flex-col gap-1.5">
            {['all', ...values].map((option) => {
              const selected = value === option;
              return (
                <button
                  key={option}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onChange(option);
                    onOpenChange(false);
                  }}
                  className={`flex min-h-9 w-full items-center rounded-lg px-3 py-2 text-left font-nunito text-sm font-medium leading-5 tracking-[-0.084px] transition-colors ${
                    selected ? 'bg-[#e9f1ee] text-[#174a4d]' : 'text-[#263238] hover:bg-[#f4f8f6]'
                  }`}
                >
                  {option === 'all' ? `All ${label}` : option}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export function ResourceFilters({
  search,
  category,
  type,
  membership,
  status,
  availableCategories = [],
  onSearchChange,
  onFilterChange,
}: ResourceFiltersProps) {
  const [openFilter, setOpenFilter] = useState<FilterName | null>(null);

  const categories = useMemo(() => {
    const set = new Set([...defaultCategories, ...availableCategories.filter(Boolean)]);
    return Array.from(set);
  }, [availableCategories]);

  const filterConfigs: {
    key: FilterName;
    label: string;
    values: string[];
    width: string;
    currentValue: string;
  }[] = [
    {
      key: 'category',
      label: baseFilterOptions.category.label,
      values: categories,
      width: baseFilterOptions.category.width,
      currentValue: category,
    },
    {
      key: 'type',
      label: baseFilterOptions.type.label,
      values: baseFilterOptions.type.values,
      width: baseFilterOptions.type.width,
      currentValue: type,
    },
    {
      key: 'membership',
      label: baseFilterOptions.membership.label,
      values: baseFilterOptions.membership.values,
      width: baseFilterOptions.membership.width,
      currentValue: membership,
    },
    {
      key: 'status',
      label: baseFilterOptions.status.label,
      values: baseFilterOptions.status.values,
      width: baseFilterOptions.status.width,
      currentValue: status,
    },
  ];

  return (
    <section className="min-w-0 rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)]">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-[minmax(192px,1fr)_188px_107px_194px_110px] 2xl:items-center">
        <label className="flex h-9.5 min-w-0 items-center gap-2 rounded-[14px] border border-[#e7eceb] bg-[#f4f8f6] px-3 sm:col-span-2 xl:col-span-1 2xl:col-span-1">
          <Search aria-hidden="true" className="size-4 shrink-0 text-[#607d8b]" strokeWidth={1.7} />
          <span className="sr-only">Search resources</span>
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by title, author, or category..."
            className="min-w-0 flex-1 bg-transparent font-manrope text-sm text-[#263238] outline-none placeholder:text-[rgba(38,50,56,0.5)]"
          />
        </label>
        {filterConfigs.map((cfg) => (
          <FilterDropdown
            key={cfg.key}
            label={cfg.label}
            values={cfg.values}
            width={cfg.width}
            value={cfg.currentValue}
            isOpen={openFilter === cfg.key}
            onOpenChange={(open) => setOpenFilter(open ? cfg.key : null)}
            onChange={(value) => onFilterChange(cfg.key, value)}
          />
        ))}
      </div>
    </section>
  );
}
