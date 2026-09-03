import { Search } from 'lucide-react';
import { activityFilters } from './activities-library-data';

export function ActivityLibraryControls({
  query,
  activeFilter,
  onQueryChange,
  onFilterChange,
}: {
  query: string;
  activeFilter: (typeof activityFilters)[number];
  onQueryChange: (value: string) => void;
  onFilterChange: (filter: (typeof activityFilters)[number]) => void;
}) {
  return (
    <div className="flex flex-col justify-between gap-5 2xl:flex-row 2xl:items-center">
      <label className="flex h-10 w-full max-w-110.5 items-center rounded-lg border border-[#f6ddd5] bg-[#fdf8f7] px-5">
        <Search
          aria-hidden="true"
          size={16}
          strokeWidth={1.5}
          className="mr-2 shrink-0 text-[#9ba6ab]"
        />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          type="search"
          placeholder="Search activities, resources, articles..."
          className="min-w-0 flex-1 bg-transparent font-manrope text-xs leading-4 text-[#263238] outline-none placeholder:text-[#7d8488]"
        />
      </label>
      <div className="flex flex-wrap justify-start gap-2 2xl:justify-end">
        {activityFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => onFilterChange(filter)}
            className={`h-10 rounded-full border px-3 font-manrope text-sm leading-5.5 transition-colors ${activeFilter === filter ? 'border-[#58aeb0] bg-[#58aeb0] text-white' : 'border-[#e7e1dd] bg-white text-[#636363] hover:border-[#58aeb0]'}`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}
