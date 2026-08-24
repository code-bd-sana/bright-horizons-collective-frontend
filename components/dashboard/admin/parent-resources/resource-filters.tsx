import { ChevronDown, Search } from 'lucide-react';

type ResourceFiltersProps = {
  search: string;
  category: string;
  type: string;
  membership: string;
  status: string;
  onSearchChange: (value: string) => void;
  onFilterChange: (filter: 'category' | 'type' | 'membership' | 'status', value: string) => void;
};

function FilterSelect({
  label,
  value,
  options,
  onChange,
  className,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  className?: string;
}) {
  return (
    <label className={`relative h-9.5 ${className ?? ''}`}>
      <span className="sr-only">Filter by {label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-full w-full appearance-none rounded-3.5 border border-[#e7eceb] bg-[#f4f8f6] px-2 pr-8 font-manrope text-[13px] leading-5 text-[#607d8b] outline-none focus:border-[#2f7d7e]"
      >
        <option value="all">{label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-2 top-1/2 size-3.5 -translate-y-1/2 text-[#607d8b]"
        strokeWidth={1.6}
      />
    </label>
  );
}

export function ResourceFilters(props: ResourceFiltersProps) {
  return (
    <section className="rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)]">
      <div className="grid gap-3 lg:grid-cols-[minmax(192px,1fr)_188px_107px_194px_110px] lg:items-center">
        <label className="flex h-9.5 min-w-0 items-center gap-2 rounded-3.5 border border-[#e7eceb] bg-[#f4f8f6] px-3">
          <Search aria-hidden="true" className="size-4 shrink-0 text-[#607d8b]" strokeWidth={1.7} />
          <span className="sr-only">Search resources</span>
          <input
            value={props.search}
            onChange={(event) => props.onSearchChange(event.target.value)}
            placeholder="Search by title, keywords, or author..."
            className="min-w-0 flex-1 bg-transparent font-manrope text-sm text-[#263238] outline-none placeholder:text-[rgba(38,50,56,0.5)]"
          />
        </label>
        <FilterSelect
          label="Category"
          value={props.category}
          options={[
            'Development',
            'Daily Routines',
            'Communication',
            'Social-Emotional',
            'Planning',
          ]}
          className="w-full"
          onChange={(value) => props.onFilterChange('category', value)}
        />
        <FilterSelect
          label="Type"
          value={props.type}
          options={['Article', 'Guide', 'Printable']}
          className="w-full"
          onChange={(value) => props.onFilterChange('type', value)}
        />
        <FilterSelect
          label="Membership"
          value={props.membership}
          options={['All Members', 'Premium']}
          className="w-full"
          onChange={(value) => props.onFilterChange('membership', value)}
        />
        <FilterSelect
          label="Status"
          value={props.status}
          options={['Published', 'Draft']}
          className="w-full"
          onChange={(value) => props.onFilterChange('status', value)}
        />
      </div>
    </section>
  );
}
