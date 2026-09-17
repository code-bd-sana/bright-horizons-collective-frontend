'use client';

import { ArrowRight, Bookmark, ChevronDown, Clock3, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import { TherapyToyModal, type TherapyToyModalToy } from '@/components/explore/therapy-toy-modal';
import { useTherapyToys } from '@/features/therapy-toys/hooks/therapy-toys.queries';
import { mapTherapyToyToModal } from '@/features/therapy-toys/model/therapy-toy.mapper';
import type { TherapyToy } from '@/features/therapy-toys/model/therapy-toy.types';
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

function getMasonryCardHeight(index: number, total: number): number {
  if (total <= 0) return 540;

  const col1Count = Math.ceil(total / 3);
  const col2Count = Math.ceil((total - col1Count) / 2);

  let col = 0;
  let row = index;

  if (index < col1Count) {
    col = 0;
    row = index;
  } else if (index < col1Count + col2Count) {
    col = 1;
    row = index - col1Count;
  } else {
    col = 2;
    row = index - (col1Count + col2Count);
  }

  const smallColForRow = (1 - (row % 3) + 3) % 3;
  return col === smallColForRow ? 480 : 540;
}

function ResourceCard({
  item,
  height,
  saved,
  onSave,
  onOpenToy,
}: {
  item: ExploreItem;
  height: number;
  saved: boolean;
  onSave: () => void;
  onOpenToy?: (item: ExploreItem) => void;
}) {
  const action =
    item.type === 'Activities'
      ? 'View Activity'
      : item.type === 'Parent Resources'
        ? 'Read Resource'
        : 'See Why We Recommend It';

  return (
    <article
      onClick={item.type === 'Therapy Toys' ? () => onOpenToy?.(item) : undefined}
      className={`relative overflow-hidden rounded-2xl border border-[#EDEEF0] bg-white p-4 text-white shadow-[0px_2px_16px_rgba(198,202,209,0.22)] ${item.type === 'Therapy Toys' ? 'cursor-pointer' : ''}`}
      style={{ height: height || 540 }}
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
            onClick={(event) => {
              event.stopPropagation();
              onSave();
            }}
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
          {item.type !== 'Therapy Toys' ? (
            <Link
              href={
                item.type === 'Activities'
                  ? '/explore/activities/bubble-wrap-stomp-counting'
                  : '/explore/parent-resources/developmental-milestones'
              }
              className="flex items-center gap-1 px-2.5 py-2 font-manrope text-base font-semibold leading-6.75 tracking-[-0.24px] text-[#F2B59F]"
            >
              {action}
              <ArrowRight className="size-5" />
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => onOpenToy?.(item)}
              className="flex items-center gap-1 px-2.5 py-2 font-manrope text-base font-semibold leading-6.75 tracking-[-0.24px] text-[#F2B59F]"
            >
              {action}
              <ArrowRight className="size-5" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function RealTherapyToyCard({
  toy,
  height,
  saved,
  onSave,
  onOpen,
}: {
  toy: TherapyToy;
  height: number;
  saved: boolean;
  onSave: () => void;
  onOpen: () => void;
}) {
  const isFeatured = toy.status === 'PUBLISHED';
  const imageSrc = toy.imageUrl || '/Home/therapy-toy-kinetic-sand.png';

  return (
    <article
      onClick={onOpen}
      className="relative cursor-pointer overflow-hidden rounded-2xl border border-[#EDEEF0] bg-white p-4 text-white shadow-[0px_2px_16px_rgba(198,202,209,0.22)]"
      style={{ height: height || 540 }}
    >
      <Image
        src={imageSrc}
        alt={toy.name}
        fill
        sizes="(min-width: 1280px) 23vw, 46vw"
        className="object-cover"
        unoptimized={Boolean(toy.imageUrl?.startsWith('http'))}
      />
      <div className="absolute inset-x-0 bottom-0 h-[58%] bg-linear-to-t from-[#242424]/85 via-[#242424]/42 to-transparent" />

      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between gap-3">
          {isFeatured ? (
            <span className="rounded-full bg-[#E3F7EC] px-2 py-1 font-manrope text-[10px] leading-3.5 text-[#16643B]">
              OT Favorite
            </span>
          ) : (
            <span />
          )}
          <button
            type="button"
            aria-label={saved ? `Remove ${toy.name} from saved` : `Save ${toy.name}`}
            onClick={(event) => {
              event.stopPropagation();
              onSave();
            }}
            className="flex size-6 items-center justify-center rounded-full bg-white/90 text-[#607077] shadow-[0px_1px_4px_rgba(0,0,0,0.12)]"
          >
            <Bookmark className={saved ? 'size-4 fill-[#2F7D7E] text-[#2F7D7E]' : 'size-4'} />
          </button>
        </div>

        <div className="flex flex-col items-start gap-4">
          <div>
            <h3 className="font-nunito text-xl font-medium leading-7">{toy.name}</h3>
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <span className="rounded-full bg-[#DCEEEE] px-2.5 py-0.5 font-nunito text-xs leading-4 text-[#174A4D]">
                {toy.minAgeMonths}–{toy.maxAgeMonths} mo
              </span>
              <span className="rounded-full bg-[#DCEEEE] px-2.5 py-0.5 font-nunito text-xs leading-4 text-[#174A4D]">
                {toy.developmentArea}
              </span>
              {toy.price !== null && toy.price !== undefined ? (
                <span className="flex items-center gap-1 px-1 font-nunito text-xs leading-4 text-white">
                  ${toy.price.toFixed(2)}
                </span>
              ) : null}
            </div>
          </div>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onOpen();
            }}
            className="flex items-center gap-1 px-2.5 py-2 font-manrope text-base font-semibold leading-6.75 tracking-[-0.24px] text-[#F2B59F]"
          >
            See Why We Recommend It
            <ArrowRight className="size-5" />
          </button>
        </div>
      </div>
    </article>
  );
}

type ExploreCatalogProps = {
  activeType: ExploreContentType;
  onActiveTypeChange: (type: ExploreContentType) => void;
};

export function ExploreCatalog({ activeType, onActiveTypeChange }: ExploreCatalogProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SelectedFilters>(emptyFilters);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [selectedToy, setSelectedToy] = useState<TherapyToyModalToy | null>(null);
  const publicToysQuery = useTherapyToys({
    search: activeType === 'Therapy Toys' ? query || undefined : undefined,
    category: activeType === 'Therapy Toys' ? filters.category[0] : undefined,
    limit: 100,
  });
  const [openGroup, setOpenGroup] = useState<FilterKey | null>('age');

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

  const toggleFilter = (key: FilterKey, option: string) => {
    setFilters((current) => ({
      ...current,
      [key]: current[key].includes(option)
        ? current[key].filter((value) => value !== option)
        : [...current[key], option],
    }));
  };

  const realToys = useMemo(() => {
    if (activeType !== 'Therapy Toys') return [];
    return (publicToysQuery.data?.items ?? []).filter((toy) => {
      const values = [toy.developmentArea, `${toy.minAgeMonths}–${toy.maxAgeMonths} mo`];
      return filterGroups.every(
        ({ key }) =>
          filters[key].length === 0 ||
          filters[key].some((value) => values.includes(value) || value === toy.developmentArea)
      );
    });
  }, [activeType, filters, publicToysQuery.data]);

  return (
    <section className="bg-[#FDFDFC] pb-20 pt-12">
      <div className="mx-auto flex max-w-480 items-center gap-9 px-20 max-xl:px-8 max-md:flex-col max-md:items-stretch max-md:gap-5 max-md:px-5">
        <div className="grid w-full grid-cols-3 gap-1.75 md:flex md:w-auto md:shrink-0">
          {contentTypes.map((type) => (
            <button
              type="button"
              key={type}
              onClick={() => onActiveTypeChange(type)}
              className={`flex h-12 min-w-0 items-center justify-center rounded-full px-2 text-center font-nunito text-xs font-medium leading-4.5 tracking-[-0.084px] transition-colors sm:px-3 sm:leading-5 md:flex-1 md:whitespace-nowrap md:px-4 md:text-sm ${activeType === type ? 'bg-[#2F7D7E] text-white' : 'bg-[#EFEFEF] text-[#64748B] hover:bg-[#E3F7EC]'}`}
            >
              {type}
            </button>
          ))}
        </div>
        <span className="h-12 w-px shrink-0 bg-[#E8EBE8] max-md:hidden" />
        <label className="flex h-12 w-full shrink-0 items-center gap-1.75 rounded-2xl border border-[#FCE9E3] bg-[#FBF6F4] px-5.25 text-[#7D8488] md:flex-1">
          <Search className="size-6 shrink-0 text-[#9AA3A6]" strokeWidth={1.5} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search activities, speech, sensory play, routines, milestones, toys..."
            className="min-w-0 flex-1 w-full bg-transparent font-nunito text-sm outline-none placeholder:text-[#7D8488] text-ellipsis"
          />
        </label>
      </div>

      <div className="mx-auto mt-12 flex max-w-480 items-start gap-6 px-20 max-xl:px-8 max-md:flex-col max-md:px-5">
        <div className="w-101.5 shrink-0 max-xl:w-80 max-md:w-full">
          <aside className="w-90.25 rounded-3xl border border-[#E8EBE8] bg-white p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] max-xl:w-full">
            <div className="flex flex-col gap-10 max-md:gap-6">
              {filterGroups.map(({ key, label, options }) => (
                <div key={key} className="w-full">
                  <button
                    type="button"
                    onClick={() => setOpenGroup((current) => (current === key ? null : key))}
                    className="flex w-full items-center justify-between font-nunito text-xl font-medium leading-7 text-[#0F1416]"
                  >
                    {label}
                    <ChevronDown
                      className={`size-6 text-[#2F7D7E] transition-transform ${openGroup === key ? '' : '-rotate-90'}`}
                    />
                  </button>
                  {openGroup === key && (
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

        <div className="min-w-0 flex-1 w-full">
          {activeType === 'Therapy Toys' ? (
            publicToysQuery.isLoading ? (
              <div className="columns-1 gap-6 lg:columns-2 xl:columns-3">
                {Array.from({ length: 6 }, (_, index) => (
                  <div
                    key={index}
                    className="mb-6 break-inside-avoid animate-pulse rounded-2xl bg-[#edf4f1]"
                    style={{ height: getMasonryCardHeight(index, 6) }}
                  />
                ))}
              </div>
            ) : publicToysQuery.isError ? (
              <div className="rounded-2xl border border-[#f2c7c2] bg-[#fff8f7] p-8 text-center font-manrope text-sm text-[#b24b4b]">
                Unable to load therapy toys.
              </div>
            ) : realToys.length ? (
              <div className="columns-1 gap-6 lg:columns-2 xl:columns-3">
                {realToys.map((toy, index) => (
                  <div key={toy.id} className="mb-6 break-inside-avoid">
                    <RealTherapyToyCard
                      toy={toy}
                      height={getMasonryCardHeight(index, realToys.length)}
                      saved={savedIds.includes(toy.id)}
                      onSave={() =>
                        setSavedIds((current) =>
                          current.includes(toy.id)
                            ? current.filter((id) => id !== toy.id)
                            : [...current, toy.id]
                        )
                      }
                      onOpen={() => setSelectedToy(mapTherapyToyToModal(toy))}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-[#ACCBCB] px-6 text-center">
                <p className="font-nunito text-xl font-semibold text-[#263238]">
                  No therapy toys found.
                </p>
              </div>
            )
          ) : results.length ? (
            <div className="columns-1 gap-6 lg:columns-2 xl:columns-3">
              {results.map((item, index) => (
                <div key={item.id} className="mb-6 break-inside-avoid">
                  <ResourceCard
                    item={item}
                    height={getMasonryCardHeight(index, results.length)}
                    saved={savedIds.includes(item.id)}
                    onSave={() =>
                      setSavedIds((current) =>
                        current.includes(item.id)
                          ? current.filter((id) => id !== item.id)
                          : [...current, item.id]
                      )
                    }
                    onOpenToy={(item) =>
                      setSelectedToy({
                        id: item.id,
                        name: item.title,
                        imageUrl: item.image,
                        minAgeMonths: 12,
                        maxAgeMonths: 36,
                        developmentAreas: [item.skill],
                        badge: item.featured ? 'OT Favorite' : undefined,
                        price: null,
                        description:
                          'A therapist-selected therapy toy recommendation to support playful developmental practice at home.',
                        affiliateLink: null,
                      })
                    }
                  />
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
      <TherapyToyModal
        toy={selectedToy}
        saved={selectedToy ? savedIds.includes(selectedToy.id) : false}
        saving={false}
        canSave={false}
        onLoginRequired={() => router.push('/login')}
        onSavedChange={(saved) => {
          if (!selectedToy) return;
          setSavedIds((current) =>
            saved
              ? [...new Set([...current, selectedToy.id])]
              : current.filter((id) => id !== selectedToy.id)
          );
        }}
        onClose={(open) => !open && setSelectedToy(null)}
      />
    </section>
  );
}

export default ExploreCatalog;
