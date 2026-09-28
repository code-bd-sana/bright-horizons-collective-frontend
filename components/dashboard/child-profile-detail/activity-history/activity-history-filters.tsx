'use client';

import { Search } from 'lucide-react';

export type TimeframeFilter = 'current-week' | 'last-month' | 'all';

type ActivityHistoryFiltersProps = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  timeframe: TimeframeFilter;
  onTimeframeChange: (timeframe: TimeframeFilter) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories?: string[];
};

const DEFAULT_CATEGORIES = [
  'All',
  'Fine Motor',
  'Gross Motor',
  'Sensory',
  'Communication',
  'Self-Care',
  'Coordination',
];

export function ActivityHistoryFilters({
  searchQuery,
  onSearchChange,
  timeframe,
  onTimeframeChange,
  selectedCategory,
  onCategoryChange,
  categories = DEFAULT_CATEGORIES,
}: ActivityHistoryFiltersProps) {
  return (
    <div className="flex min-w-0 flex-col gap-6 rounded-2xl border border-[#E8EBE8] bg-white p-4 shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.1)] sm:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full max-w-110.5 items-center gap-2 rounded-xl border border-[#D8DDD9] bg-white px-4 py-3 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] sm:px-5 sm:py-3.5 focus-within:border-[#2f7d7e]">
          <Search className="size-5 shrink-0 text-[#7D8488]" />
          <input
            type="text"
            placeholder="Search activities"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="min-w-0 flex-1 bg-transparent font-nunito text-sm font-medium leading-5 tracking-[-0.006em] text-[#263238] outline-none placeholder:text-[#7D8488]"
          />
        </div>

        <div className="flex w-full items-center gap-1.5 overflow-x-auto rounded-xl border border-[#E8EBE8] bg-[#EFEFEF] p-1.5 scrollbar-none md:w-auto md:overflow-visible [&::-webkit-scrollbar]:hidden">
          <button
            type="button"
            onClick={() => onTimeframeChange('current-week')}
            className={`flex shrink-0 items-center justify-center rounded-full px-3.5 py-1.5 font-nunito text-sm font-medium leading-5 tracking-[-0.006em] transition-colors ${
              timeframe === 'current-week'
                ? 'bg-[#2F7D7E] text-white shadow-xs'
                : 'text-[#515B60] hover:bg-white/80'
            }`}
          >
            Current Week
          </button>
          <button
            type="button"
            onClick={() => onTimeframeChange('last-month')}
            className={`flex shrink-0 items-center justify-center rounded-full px-3.5 py-1.5 font-nunito text-sm font-medium leading-5 tracking-[-0.006em] transition-colors ${
              timeframe === 'last-month'
                ? 'bg-[#2F7D7E] text-white shadow-xs'
                : 'text-[#515B60] hover:bg-white/80'
            }`}
          >
            Last Month
          </button>
          <button
            type="button"
            onClick={() => onTimeframeChange('all')}
            className={`flex shrink-0 items-center justify-center rounded-full px-3.5 py-1.5 font-nunito text-sm font-medium leading-5 tracking-[-0.006em] transition-colors ${
              timeframe === 'all'
                ? 'bg-[#2F7D7E] text-white shadow-xs'
                : 'text-[#515B60] hover:bg-white/80'
            }`}
          >
            All time
          </button>
        </div>
      </div>

      <div className="h-px w-full bg-[#E8EBE8]" />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <span className="shrink-0 font-nunito text-xs font-medium leading-4 text-[#7D8488]">
          Category:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onCategoryChange(cat)}
                className={`flex items-center gap-1 rounded-xl px-2.5 py-1.5 font-nunito text-xs font-medium leading-4 transition-colors ${
                  isSelected
                    ? 'bg-[#2F7D7E] text-white shadow-xs'
                    : 'border border-[#D4D6D7] bg-[#EFEFEF] text-[#515B60] hover:bg-[#e0e0e0]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
