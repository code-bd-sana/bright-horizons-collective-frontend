'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ArrowUpDown, Check, ChevronDown } from 'lucide-react';
import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';

import { ExploreCard } from '@/components/dashboard/explore/explore-card';
import { getMasonryCardHeight } from '@/components/explore/explore-catalog';
import { TherapyToyModal } from '@/components/explore/therapy-toy-modal';
import type { TherapyToyModalToy } from '@/components/explore/therapy-toy-modal';
import { useExploreCatalog } from '@/features/explore/hooks/use-explore-catalog';
import { figmaExploreUiAssets } from '@/features/explore/data/figma-explore-assets';
import type {
  ActivityExploreItem,
  ExploreCardItem,
  ExploreFilterKey,
  ExploreFilters,
  ExploreItem,
  ExploreSortOrder,
  ExploreTab,
} from '@/features/explore/model/explore-types';
import { useAppStore } from '@/store/use-app-store';
import {
  useChildProfiles,
  useChildCompletedActivities,
} from '@/features/child-profiles/hooks/child-profiles.queries';
import { useToggleActivityComplete } from '@/features/activities/hooks/activities.mutations';
import { cn } from '@/lib/utils';

const tabLabels: Record<ExploreTab, string> = {
  activities: 'Activities',
  'parent-resources': 'Parent Resources',
  'therapy-toys': 'Therapy Toys',
};

const filterLabels: Record<ExploreFilterKey, string> = {
  age: 'Age',
  developmentalSkill: 'Developmental Skill',
  category: 'Category',
  collection: 'Collection',
  difficulty: 'Difficulty',
};

const filterOptions: Record<ExploreFilterKey, string[]> = {
  age: ['0–12 mo', '12–24 mo', '2–3 yr', '3–5 yr', '5–7 yr'],
  developmentalSkill: ['Fine Motor', 'Gross Motor', 'Sensory', 'Coordination', 'Visual-Motor'],
  category: ['Indoor', 'Outdoor', 'Messy Play', 'Quiet Time', 'Parent Education'],
  collection: ['Starter Series', 'Sensory Saturdays', 'OT Picks'],
  difficulty: ['Easy', 'Moderate', 'Advanced'],
};

const tabOrder = Object.keys(tabLabels) as ExploreTab[];
const filterOrder = Object.keys(filterLabels) as ExploreFilterKey[];

function ExploreFilterDropdown({
  filterKey,
  values,
  isOpen,
  onOpenChange,
  onToggle,
}: {
  filterKey: ExploreFilterKey;
  values: string[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onToggle: (value: string) => void;
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) onOpenChange(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onOpenChange(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onOpenChange]);

  const label = filterLabels[filterKey];

  return (
    <div ref={dropdownRef} className={cn('relative min-w-0', isOpen ? 'z-50' : 'z-10')}>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={() => onOpenChange(!isOpen)}
        className={cn(
          'flex h-9.5 w-full items-center justify-between gap-2 rounded-[14px] border px-2 font-manrope text-[13px] leading-5 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#2f7d7e] focus-visible:ring-offset-2',
          isOpen
            ? 'border-[#d5e5e5] bg-[#d5e5e5] text-[#0f1416]'
            : 'border-[#e7eceb] bg-[#f4f8f6] text-[#607d8b] hover:border-[#accbcb]'
        )}
      >
        <span className="truncate">
          {label}
          {values.length > 0 ? ` (${values.length})` : ''}
        </span>
        <ChevronDown
          aria-hidden="true"
          className={cn('size-4 shrink-0 transition-transform', isOpen && 'rotate-180')}
        />
      </button>

      {isOpen ? (
        <div
          role="listbox"
          aria-label={label}
          aria-multiselectable="true"
          className="absolute left-0 top-[calc(100%+8px)] z-50 w-full min-w-40 rounded-2xl border border-[#e8ebe8] bg-white p-3 shadow-[0_10px_28px_rgba(38,50,56,0.14)]"
        >
          <div className="flex flex-col gap-1">
            {filterOptions[filterKey].map((option) => {
              const selected = values.includes(option);

              return (
                <button
                  key={option}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => onToggle(option)}
                  className={cn(
                    'flex min-h-9 w-full items-center gap-2 rounded-xl px-2.5 py-2 text-left font-manrope text-xs leading-4 text-[#515b60] outline-none transition-colors hover:bg-[#f4f8f6] focus-visible:ring-2 focus-visible:ring-[#2f7d7e]',
                    selected && 'bg-[#e9f1ee] text-[#174a4d]'
                  )}
                >
                  <span
                    className={cn(
                      'grid size-4 shrink-0 place-items-center rounded border',
                      selected ? 'border-[#2f7d7e] bg-[#2f7d7e]' : 'border-[#cbd5d1] bg-white'
                    )}
                  >
                    {selected ? <Check aria-hidden="true" className="size-3 text-white" /> : null}
                  </span>
                  <span>{option}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ExploreSortDropdown({
  value,
  isOpen,
  onOpenChange,
  onChange,
}: {
  value: ExploreSortOrder;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onChange: (order: ExploreSortOrder) => void;
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) onOpenChange(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onOpenChange(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onOpenChange]);

  const sortOptions: { label: string; sublabel: string; value: ExploreSortOrder }[] = [
    { label: 'New to Old', sublabel: 'Newest first', value: 'new-to-old' },
    { label: 'Old to New', sublabel: 'Oldest first', value: 'old-to-new' },
  ];

  return (
    <div ref={dropdownRef} className={cn('relative min-w-0', isOpen ? 'z-50' : 'z-10')}>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={() => onOpenChange(!isOpen)}
        className={cn(
          'flex h-9.5 w-full items-center justify-between gap-2 rounded-[14px] border px-2.5 font-manrope text-[13px] leading-5 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#2f7d7e] focus-visible:ring-offset-2',
          isOpen || value === 'old-to-new'
            ? 'border-[#accbcb] bg-[#e9f1ee] text-[#174a4d] font-medium'
            : 'border-[#e7eceb] bg-[#f4f8f6] text-[#607d8b] hover:border-[#accbcb]'
        )}
      >
        <span className="flex items-center gap-1.5 truncate">
          <ArrowUpDown aria-hidden="true" className="size-3.5 shrink-0 opacity-70" />
          <span>Sort: {value === 'old-to-new' ? 'Old to New' : 'New to Old'}</span>
        </span>
        <ChevronDown
          aria-hidden="true"
          className={cn('size-4 shrink-0 transition-transform', isOpen && 'rotate-180')}
        />
      </button>

      {isOpen ? (
        <div
          role="listbox"
          aria-label="Sort by time"
          className="absolute right-0 sm:left-0 top-[calc(100%+8px)] z-50 w-full min-w-48 rounded-2xl border border-[#e8ebe8] bg-white p-3 shadow-[0_10px_28px_rgba(38,50,56,0.14)]"
        >
          <div className="mb-2 px-1 font-manrope text-[11px] font-semibold uppercase tracking-wider text-[#7d8488]">
            Sort by Time
          </div>
          <div className="flex flex-col gap-1">
            {sortOptions.map((option) => {
              const selected = value === option.value;

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
                  className={cn(
                    'flex min-h-9 w-full items-center justify-between gap-2 rounded-xl px-2.5 py-2 text-left font-manrope text-xs leading-4 text-[#515b60] outline-none transition-colors hover:bg-[#f4f8f6] focus-visible:ring-2 focus-visible:ring-[#2f7d7e]',
                    selected && 'bg-[#e9f1ee] text-[#174a4d] font-medium'
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        'grid size-4 shrink-0 place-items-center rounded border',
                        selected ? 'border-[#2f7d7e] bg-[#2f7d7e]' : 'border-[#cbd5d1] bg-white'
                      )}
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
      ) : null}
    </div>
  );
}

function ExploreFiltersBar({
  filters,
  onToggle,
  sortOrder,
  onSortChange,
}: {
  filters: ExploreFilters;
  onToggle: (key: ExploreFilterKey, value: string) => void;
  sortOrder: ExploreSortOrder;
  onSortChange: (order: ExploreSortOrder) => void;
}) {
  const [openDropdown, setOpenDropdown] = useState<ExploreFilterKey | 'sort' | null>(null);

  return (
    <section
      aria-label="Explore filters and sorting"
      className={cn(
        'relative rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)] transition-all',
        openDropdown ? 'z-50' : 'z-20'
      )}
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
        {filterOrder.map((key) => (
          <ExploreFilterDropdown
            key={key}
            filterKey={key}
            values={filters[key]}
            isOpen={openDropdown === key}
            onOpenChange={(open) => setOpenDropdown(open ? key : null)}
            onToggle={(value) => onToggle(key, value)}
          />
        ))}
        <ExploreSortDropdown
          value={sortOrder}
          isOpen={openDropdown === 'sort'}
          onOpenChange={(open) => setOpenDropdown(open ? 'sort' : null)}
          onChange={onSortChange}
        />
      </div>
    </section>
  );
}

function CardsGrid({
  items,
  columns = 4,
  savingItemId,
  completingItemId,
  childName,
  onSavedChange,
  onToggleComplete,
  onOpenTherapyToy,
}: {
  items: ExploreItem[];
  columns?: 3 | 4;
  savingItemId: string | null;
  completingItemId?: string | null;
  childName?: string;
  onSavedChange: (item: ExploreCardItem, saved: boolean) => void;
  onToggleComplete?: (item: ActivityExploreItem) => void;
  onOpenTherapyToy?: (
    item: import('@/features/explore/model/explore-types').TherapyToyExploreItem
  ) => void;
}) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#d8dfdf] bg-white px-6 py-16 text-center">
        <p className="font-nunito text-lg font-semibold text-[#263238]">No items found</p>
        <p className="mt-1 max-w-md font-manrope text-sm text-[#65758a]">
          No items match your current filter criteria. Try adjusting or clearing your filters.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-6 sm:grid-cols-2',
        columns === 4 ? '2xl:grid-cols-4' : '2xl:grid-cols-3'
      )}
    >
      {items.map((item) => (
        <ExploreCard
          key={item.id}
          item={item}
          height={item.kind === 'therapy-toy' ? 540 : undefined}
          saving={savingItemId === item.id}
          completing={completingItemId === item.id}
          childName={childName}
          onSavedChange={onSavedChange}
          onToggleComplete={onToggleComplete}
          onOpenTherapyToy={onOpenTherapyToy}
        />
      ))}
    </div>
  );
}

function SavedPanel({
  title,
  items,
  columns,
  className,
  savingItemId,
  completingItemId,
  childName,
  onSavedChange,
  onToggleComplete,
  onOpenTherapyToy,
}: {
  title: string;
  items: ExploreItem[];
  columns: 3 | 4;
  className?: string;
  savingItemId: string | null;
  completingItemId?: string | null;
  childName?: string;
  onSavedChange: (item: ExploreCardItem, saved: boolean) => void;
  onToggleComplete?: (item: ActivityExploreItem) => void;
  onOpenTherapyToy?: (
    item: import('@/features/explore/model/explore-types').TherapyToyExploreItem
  ) => void;
}) {
  return (
    <section
      className={cn(
        'rounded-2xl border border-[#e8ebe8] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:p-6 2xl:p-8',
        className
      )}
    >
      <h2 className="mb-6 font-nunito text-xl font-medium leading-7 text-[#263238] sm:text-2xl sm:leading-8">
        {title}
      </h2>
      {items.length > 0 ? (
        <CardsGrid
          items={items}
          columns={columns}
          savingItemId={savingItemId}
          completingItemId={completingItemId}
          childName={childName}
          onSavedChange={onSavedChange}
          onToggleComplete={onToggleComplete}
          onOpenTherapyToy={onOpenTherapyToy}
        />
      ) : (
        <p className="font-manrope text-sm leading-6 text-[#7d8488]">
          Your saved items will appear here.
        </p>
      )}
    </section>
  );
}

function NewsletterPanel() {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubscribed(true);
  };

  return (
    <section className="relative mx-auto mt-16 flex min-h-80 w-full max-w-304.75 items-center justify-center overflow-hidden rounded-2xl border border-[#d5e5e5] p-5 sm:min-h-96 sm:p-6 2xl:mt-24 2xl:min-h-102.25 2xl:p-8">
      <Image src={figmaExploreUiAssets.newsletter.glow} alt="" fill className="object-cover" />
      <Image
        src={figmaExploreUiAssets.newsletter.top}
        alt=""
        width={358}
        height={344}
        className="absolute left-1/2 -top-44 w-72 -translate-x-1/2 sm:-top-42 sm:w-89.5"
      />
      <Image
        src={figmaExploreUiAssets.newsletter.right}
        alt=""
        width={237}
        height={227}
        className="absolute -right-6 -bottom-9.5 max-sm:hidden"
      />
      <Image
        src={figmaExploreUiAssets.newsletter.left}
        alt=""
        width={358}
        height={344}
        className="absolute -bottom-28 -left-20 max-sm:hidden"
      />
      <div className="relative z-10 flex w-full max-w-110.5 flex-col items-center gap-3 text-center">
        <h2 className="font-nunito text-[28px] font-medium leading-9 tracking-[-0.16px] text-[#2f7d7e] sm:text-[32px] sm:leading-10">
          Get Weekly Learning Updates
        </h2>
        <p className="font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#7d8488]">
          Join 5,000+ parents receiving research-backed tips and new resource alerts tailored to
          their child&apos;s development.
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-1 flex w-full max-w-96 flex-col items-stretch gap-2 sm:flex-row"
        >
          <input
            type="email"
            required
            aria-label="Email address"
            placeholder="Enter your email address"
            className="min-h-11 min-w-0 flex-1 rounded-full border border-[#e2e8f0] bg-white px-3 py-2.5 font-manrope text-xs leading-4.5 text-[#263238] outline-none placeholder:text-[#64748b] focus:border-[#2f7d7e]"
          />
          <button
            type="submit"
            className="min-h-11 min-w-20 rounded-full bg-[#f2b59f] px-4 py-2 font-nunito text-sm font-medium leading-5 tracking-[-0.084px] text-white outline-none focus-visible:ring-2 focus-visible:ring-[#2f7d7e] focus-visible:ring-offset-2"
          >
            {subscribed ? 'Subscribed' : 'Subscribe'}
          </button>
        </form>
      </div>
    </section>
  );
}

function TherapyToyColumns({
  items,
  savingItemId,
  onSavedChange,
  onOpenTherapyToy,
}: {
  items: ExploreItem[];
  savingItemId: string | null;
  onSavedChange: (item: ExploreCardItem, saved: boolean) => void;
  onOpenTherapyToy: (
    item: import('@/features/explore/model/explore-types').TherapyToyExploreItem
  ) => void;
}) {
  return (
    <div className="columns-1 gap-6 sm:columns-2 2xl:columns-3">
      {items.map((item, index) => (
        <div key={item.id} className="mb-6 break-inside-avoid">
          <ExploreCard
            item={item}
            height={getMasonryCardHeight(index, items.length)}
            saving={savingItemId === item.id}
            onSavedChange={onSavedChange}
            onOpenTherapyToy={onOpenTherapyToy}
          />
        </div>
      ))}
    </div>
  );
}

export function DashboardExplorePage({ initialTab }: { initialTab: ExploreTab }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [selectedToy, setSelectedToy] = useState<TherapyToyModalToy | null>(null);
  const [filters, setFilters] = useState<ExploreFilters>(() => {
    const getParamValues = (name: string): string[] => {
      const val = searchParams?.get(name);
      return val ? val.split(',').filter(Boolean) : [];
    };
    return {
      age: getParamValues('age'),
      developmentalSkill: getParamValues('skill'),
      category: getParamValues('category'),
      collection: getParamValues('collection'),
      difficulty: getParamValues('difficulty'),
    };
  });
  const [sortOrder, setSortOrder] = useState<ExploreSortOrder>(() => {
    const sort = searchParams?.get('sort');
    return sort === 'old-to-new' || sort === 'oldest' ? 'old-to-new' : 'new-to-old';
  });
  const { data, isLoading, setSaved, savingItemId } = useExploreCatalog(
    initialTab,
    filters,
    sortOrder
  );

  const { selectedChildId } = useAppStore();
  const { data: children = [] } = useChildProfiles();
  const activeChild = useMemo(() => {
    return children.find((c) => c.id === selectedChildId) || children[0] || null;
  }, [children, selectedChildId]);

  const { data: completedData } = useChildCompletedActivities(activeChild?.id);
  const completedActivityIds = useMemo(
    () => new Set(completedData?.completedActivityIds ?? []),
    [completedData]
  );

  const toggleCompleteMutation = useToggleActivityComplete();

  const handleToggleComplete = (item: ActivityExploreItem) => {
    if (!activeChild) {
      toast.error('Please select a child profile first.');
      return;
    }

    const willComplete = !completedActivityIds.has(item.id);
    toggleCompleteMutation.mutate(
      { id: item.id, childId: activeChild.id },
      {
        onSuccess: () => {
          toast.success(
            willComplete
              ? `Marked "${item.title}" as completed for ${activeChild.name}`
              : `Marked "${item.title}" as incomplete for ${activeChild.name}`
          );
        },
        onError: () => {
          toast.error('Failed to update completion status');
        },
      }
    );
  };

  const enrichedItems = useMemo(() => {
    if (!data?.items) return [];
    if (initialTab !== 'activities') return data.items;
    return data.items.map((item) => {
      if (item.kind === 'activity') {
        return {
          ...item,
          isCompleted: completedActivityIds.has(item.id),
        };
      }
      return item;
    });
  }, [data, initialTab, completedActivityIds]);

  const enrichedSavedItems = useMemo(() => {
    if (!data?.savedItems) return [];
    if (initialTab !== 'activities') return data.savedItems;
    return data.savedItems.map((item) => {
      if (item.kind === 'activity') {
        return {
          ...item,
          isCompleted: completedActivityIds.has(item.id),
        };
      }
      return item;
    });
  }, [data, initialTab, completedActivityIds]);

  const completingItemId =
    typeof toggleCompleteMutation.variables === 'object'
      ? toggleCompleteMutation.variables?.id
      : typeof toggleCompleteMutation.variables === 'string'
        ? toggleCompleteMutation.variables
        : null;

  const handleFilterToggle = (key: ExploreFilterKey, value: string) => {
    setFilters((current) => {
      const updatedValues = current[key].includes(value)
        ? current[key].filter((option) => option !== value)
        : [...current[key], value];
      const next = {
        ...current,
        [key]: updatedValues,
      };

      const params = new URLSearchParams(searchParams?.toString() ?? '');
      const paramKey = key === 'developmentalSkill' ? 'skill' : key;
      if (updatedValues.length > 0) {
        params.set(paramKey, updatedValues.join(','));
      } else {
        params.delete(paramKey);
      }
      if (sortOrder === 'old-to-new') {
        params.set('sort', sortOrder);
      } else {
        params.delete('sort');
      }
      params.set('tab', initialTab);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });

      return next;
    });
  };

  const handleSortChange = (newOrder: ExploreSortOrder) => {
    setSortOrder(newOrder);
    const params = new URLSearchParams(searchParams?.toString() ?? '');
    if (newOrder === 'old-to-new') {
      params.set('sort', newOrder);
    } else {
      params.delete('sort');
    }
    params.set('tab', initialTab);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleSavedChange = (item: ExploreCardItem, saved: boolean) => {
    setSaved(
      { itemId: item.id, saved },
      {
        onSuccess: () => {
          toast.success(
            saved ? `Saved "${item.title}" to favorites` : `Removed "${item.title}" from favorites`
          );
        },
        onError: () => {
          toast.error('Failed to update favorite status');
        },
      }
    );
  };

  const handleOpenTherapyToy = (
    item: import('@/features/explore/model/explore-types').TherapyToyExploreItem
  ) => {
    const ageMatch = item.age.match(/(\d+)/g)?.map(Number) ?? [0, 36];
    setSelectedToy({
      id: item.id,
      name: item.title,
      imageUrl: item.imageSrc,
      minAgeMonths: ageMatch[0] ?? 0,
      maxAgeMonths: ageMatch[1] ?? 2160,
      developmentAreas: item.skills,
      badge: item.badge,
      price: item.price ?? null,
      description:
        item.description ??
        'A therapist-selected therapy toy recommendation to support playful developmental practice at home.',
      affiliateLink: item.affiliateLink ?? null,
      galleryImages: item.galleryImages,
    });
  };

  const title =
    initialTab === 'parent-resources' ? 'Explore Trusted Guidance' : 'Explore the Library';
  const description =
    initialTab === 'parent-resources'
      ? "Curated resources from certified pediatric therapists to help you navigate every stage of your child's growth with confidence and care."
      : 'Browse therapist-designed activities, developmental resources, and therapy toy recommendations tailored for every stage of childhood.';

  return (
    <div className="min-w-0 bg-(--explore-background) pb-12 2xl:px-2">
      <header className="flex max-w-180 flex-col gap-3 sm:min-h-24">
        <h1 className="font-nunito text-[28px] font-medium leading-9 tracking-[-0.16px] text-[#263238] sm:text-[32px] sm:leading-10">
          {title}
        </h1>
        <p className="font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#515b60]">
          {description}
        </p>
      </header>

      <nav
        aria-label="Explore categories"
        className="mt-8 grid w-full grid-cols-3 gap-2 sm:mt-9 sm:flex sm:w-auto"
      >
        {tabOrder.map((tab) => {
          const active = tab === initialTab;
          const href =
            sortOrder === 'old-to-new'
              ? `/dashboard/explore?tab=${tab}&sort=old-to-new`
              : `/dashboard/explore?tab=${tab}`;
          return (
            <Link
              key={tab}
              href={href}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'flex min-h-12 items-center justify-center rounded-full px-2 text-center font-nunito text-xs font-medium leading-4 tracking-[-0.084px] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#2f7d7e] focus-visible:ring-offset-2 sm:px-4 sm:text-sm sm:leading-5',
                active ? 'bg-[#2f7d7e] text-white' : 'text-[#64748b] hover:bg-[#e9f1ee]'
              )}
            >
              {tabLabels[tab]}
            </Link>
          );
        })}
      </nav>

      <div className="relative z-30 mt-8 sm:mt-11">
        <ExploreFiltersBar
          filters={filters}
          onToggle={handleFilterToggle}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
        />
      </div>

      <div className="relative z-10 mt-10 sm:mt-14">
        {isLoading || !data ? (
          <div
            className={cn(
              initialTab === 'therapy-toys'
                ? 'columns-1 gap-6 sm:columns-2 2xl:columns-3'
                : 'grid grid-cols-1 gap-6 sm:grid-cols-2 2xl:grid-cols-4'
            )}
            aria-label="Loading explore items"
          >
            {Array.from({ length: initialTab === 'therapy-toys' ? 6 : 8 }, (_, index) => (
              <div
                key={index}
                className={cn(
                  'animate-pulse',
                  initialTab === 'therapy-toys'
                    ? 'mb-6 break-inside-avoid rounded-2xl bg-[#edf4f1]'
                    : 'h-108.5 rounded-3xl bg-[#e9f1ee]'
                )}
                style={
                  initialTab === 'therapy-toys'
                    ? { height: getMasonryCardHeight(index, 6) }
                    : undefined
                }
              />
            ))}
          </div>
        ) : initialTab === 'therapy-toys' ? (
          <TherapyToyColumns
            items={data.items}
            savingItemId={savingItemId}
            onSavedChange={handleSavedChange}
            onOpenTherapyToy={handleOpenTherapyToy}
          />
        ) : (
          <CardsGrid
            items={enrichedItems}
            savingItemId={savingItemId}
            completingItemId={completingItemId}
            childName={activeChild?.name}
            onSavedChange={handleSavedChange}
            onToggleComplete={initialTab === 'activities' ? handleToggleComplete : undefined}
          />
        )}
      </div>

      {data && initialTab === 'activities' ? (
        <SavedPanel
          title="Saved Activities"
          items={enrichedSavedItems}
          columns={4}
          className="mt-12 sm:mt-20"
          savingItemId={savingItemId}
          completingItemId={completingItemId}
          childName={activeChild?.name}
          onSavedChange={handleSavedChange}
          onToggleComplete={handleToggleComplete}
        />
      ) : null}

      {data && initialTab === 'parent-resources' ? (
        <>
          {data.printableItems.length > 0 ? (
            <section className="mt-12 rounded-2xl border border-[#e8ebe8] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:mt-14 sm:p-6 2xl:p-8">
              <h2 className="mb-6 font-nunito text-xl font-medium leading-7 text-[#263238] sm:text-2xl sm:leading-8">
                Printable Resources
              </h2>
              <div className="grid grid-cols-1 gap-8 2xl:grid-cols-2">
                {data.printableItems.map((item) => (
                  <ExploreCard
                    key={item.id}
                    item={item}
                    saving={savingItemId === item.id}
                    onSavedChange={handleSavedChange}
                  />
                ))}
              </div>
            </section>
          ) : null}
          <SavedPanel
            title="Saved Resources"
            items={data.savedItems}
            columns={3}
            className="mt-12 sm:mt-14"
            savingItemId={savingItemId}
            onSavedChange={handleSavedChange}
          />
          <NewsletterPanel />
        </>
      ) : null}

      {data && initialTab === 'therapy-toys' ? (
        <SavedPanel
          title="Saved Therapy Toys"
          items={data.savedItems}
          columns={3}
          className="mt-12 sm:mt-16 2xl:mt-24"
          savingItemId={savingItemId}
          onSavedChange={handleSavedChange}
          onOpenTherapyToy={handleOpenTherapyToy}
        />
      ) : null}

      <TherapyToyModal
        toy={selectedToy}
        saved={
          selectedToy ? Boolean(data?.savedItems.some((item) => item.id === selectedToy.id)) : false
        }
        saving={selectedToy?.id === savingItemId}
        canSave
        onSavedChange={(saved) => {
          if (selectedToy) setSaved({ itemId: selectedToy.id, saved });
        }}
        onClose={(open) => !open && setSelectedToy(null)}
      />
    </div>
  );
}
