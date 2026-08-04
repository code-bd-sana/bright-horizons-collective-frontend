'use client';

import Image from 'next/image';
import { ArrowRight, Bookmark, ChevronDown, Clock3, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

import {
  contentTypes,
  exploreItems,
  filterGroups,
  type ExploreContentType,
  type ExploreItem,
  type FilterKey,
} from '@/lib/explore-data';

type SelectedFilters = Record<FilterKey, string[]>;

const emptyFilters: SelectedFilters = {
  age: [],
  skill: [],
  category: [],
  collection: [],
  difficulty: [],
};

function ResourceCard({
  item,
  height,
  saved,
  onSave,
}: {
  item: ExploreItem;
  height: number;
  saved: boolean;
  onSave: () => void;
}) {
  const action =
    item.type === 'Activities'
      ? 'View Activity'
      : item.type === 'Parent Resources'
        ? 'Read Resource'
        : 'View Toy';

  return (
    <article
      className="relative overflow-hidden rounded-2xl border border-[#EDEEF0] bg-white p-4 text-white shadow-[0px_2px_16px_rgba(198,202,209,0.22)]"
      style={{ height }}
    >
      <Image
        src={item.image}
        alt=""
        fill
        sizes="(min-width: 1280px) 23vw, 46vw"
        className="object-cover"
      />
      <div className="absolute inset-x-0 bottom-0 h-[58%] bg-linear-to-t from-[#242424]/85 via-[#242424]/42 to-transparent" />

      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between gap-3">
          {item.featured ? (
            <span className="rounded-full bg-[#E3F7EC] px-2 py-1 font-manrope text-[10px] leading-3.5 text-[#16643B]">
              OT Favorite
            </span>
          ) : (
            <span />
          )}
          <button
            type="button"
            aria-label={saved ? `Remove ${item.title} from saved` : `Save ${item.title}`}
            onClick={onSave}
            className="flex size-6 items-center justify-center rounded-full bg-white/90 text-[#607077] shadow-[0px_1px_4px_rgba(0,0,0,0.12)]"
          >
            <Bookmark className={saved ? 'size-4 fill-[#2F7D7E] text-[#2F7D7E]' : 'size-4'} />
          </button>
        </div>

        <div className="flex flex-col items-start gap-4">
          <div>
            <h3 className="font-nunito text-xl font-medium leading-7">{item.title}</h3>
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <span className="rounded-full bg-[#DCEEEE] px-2.5 py-0.5 font-nunito text-xs leading-4 text-[#174A4D]">
                {item.age}
              </span>
              <span className="rounded-full bg-[#DCEEEE] px-2.5 py-0.5 font-nunito text-xs leading-4 text-[#174A4D]">
                {item.skill}
              </span>
              <span className="flex items-center gap-1 px-1 font-nunito text-xs leading-4">
                <Clock3 className="size-3" />
                {item.duration}
              </span>
            </div>
          </div>
          <button
            type="button"
            className="flex items-center gap-1 px-2.5 py-2 font-manrope text-base font-semibold leading-6.75 tracking-[-0.24px] text-[#F2B59F]"
          >
            {action}
            <ArrowRight className="size-5" />
          </button>
        </div>
      </div>
    </article>
  );
}

export function ExploreCatalog() {
  const [activeType, setActiveType] = useState<ExploreContentType>('Activities');
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SelectedFilters>(emptyFilters);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [openGroups, setOpenGroups] = useState<Record<FilterKey, boolean>>({
    age: true,
    skill: true,
    category: true,
    collection: true,
    difficulty: true,
  });

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return exploreItems.filter((item) => {
      if (item.type !== activeType) return false;
      const matchesQuery =
        !normalizedQuery ||
        [item.title, item.age, item.skill, item.category, item.collection, item.difficulty]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesFilters = filterGroups.every(
        ({ key }) => filters[key].length === 0 || filters[key].includes(item[key])
      );
      return matchesQuery && matchesFilters;
    });
  }, [activeType, filters, query]);

  const masonryColumns = useMemo(
    () =>
      results.reduce<ExploreItem[][]>(
        (columns, item, index) => {
          columns[index % 3].push(item);
          return columns;
        },
        [[], [], []]
      ),
    [results]
  );

  const toggleFilter = (key: FilterKey, option: string) => {
    setFilters((current) => ({
      ...current,
      [key]: current[key].includes(option)
        ? current[key].filter((value) => value !== option)
        : [...current[key], option],
    }));
  };

  return (
    <section className="bg-[#FDFDFC] pb-20 pt-12">
      <div className="mx-auto flex max-w-480 items-center gap-9 px-20 max-xl:px-8 max-lg:flex-col max-lg:items-stretch max-lg:gap-5 max-md:px-5">
        <div className="flex shrink-0 flex-wrap items-center gap-1.75">
          {contentTypes.map((type) => (
            <button
              type="button"
              key={type}
              onClick={() => setActiveType(type)}
              className={`h-12 rounded-full px-4 font-nunito text-sm font-medium leading-5 tracking-[-0.084px] transition-colors ${activeType === type ? 'bg-[#2F7D7E] text-white' : 'bg-[#EFEFEF] text-[#64748B] hover:bg-[#E3F7EC]'}`}
            >
              {type}
            </button>
          ))}
        </div>
        <span className="h-12 w-px shrink-0 bg-[#E8EBE8] max-lg:hidden" />
        <label className="flex h-12 min-w-0 flex-1 items-center gap-1.75 rounded-2xl border border-[#FCE9E3] bg-[#FBF6F4] px-5.25 text-[#7D8488]">
          <Search className="size-6 shrink-0 text-[#9AA3A6]" strokeWidth={1.5} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search activities, speech, sensory play, routines, milestones, toys..."
            className="min-w-0 flex-1 bg-transparent font-nunito text-sm outline-none placeholder:text-[#7D8488]"
          />
        </label>
      </div>

      <div className="mx-auto mt-12 flex max-w-480 items-start gap-6 px-20 max-xl:px-8 max-lg:flex-col max-lg:px-5">
        <div className="w-101.5 shrink-0 max-lg:w-full">
          <aside className="w-90.25 rounded-3xl border border-[#E8EBE8] bg-white p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] max-lg:w-full">
            <div className="flex flex-col gap-10">
              {filterGroups.map(({ key, label, options }) => (
                <div key={key} className="w-full">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenGroups((current) => ({ ...current, [key]: !current[key] }))
                    }
                    className="flex w-full items-center justify-between font-nunito text-xl font-medium leading-7 text-[#0F1416]"
                  >
                    {label}
                    <ChevronDown
                      className={`size-6 text-[#2F7D7E] transition-transform ${openGroups[key] ? '' : '-rotate-90'}`}
                    />
                  </button>
                  {openGroups[key] && (
                    <div className="mt-3 flex flex-col gap-2.5">
                      {options.map((option) => {
                        const checked = filters[key].includes(option);
                        return (
                          <label
                            key={option}
                            className="flex cursor-pointer items-center gap-2.5 font-nunito text-sm font-medium leading-5 tracking-[-0.084px] text-[#263238]"
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleFilter(key, option)}
                              className="sr-only"
                            />
                            <span
                              className={`flex size-4 items-center justify-center rounded border ${checked ? 'border-[#2F7D7E] bg-[#2F7D7E]' : 'border-[#8FB9A8] bg-white'}`}
                            >
                              {checked && <span className="size-1.5 rounded-sm bg-white" />}
                            </span>
                            {option}
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </aside>
        </div>

        <div className="min-w-0 flex-1">
          {results.length ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {masonryColumns.map((column, columnIndex) => (
                <div key={columnIndex} className="flex flex-col gap-6">
                  {column.map((item, itemIndex) => (
                    <ResourceCard
                      key={item.id}
                      item={item}
                      height={columnIndex === 1 && itemIndex === 0 ? 480 : 540}
                      saved={savedIds.includes(item.id)}
                      onSave={() =>
                        setSavedIds((current) =>
                          current.includes(item.id)
                            ? current.filter((id) => id !== item.id)
                            : [...current, item.id]
                        )
                      }
                    />
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-[#ACCBCB] px-6 text-center">
              <p className="font-nunito text-xl font-semibold text-[#263238]">
                No matching resources yet.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setFilters(emptyFilters);
                }}
                className="mt-3 font-manrope text-sm font-semibold text-[#2F7D7E] underline"
              >
                Clear search and filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ExploreCatalog;
