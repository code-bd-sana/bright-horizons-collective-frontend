'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Check, ChevronDown } from 'lucide-react';
import { FormEvent, useEffect, useRef, useState } from 'react';

import { ExploreCard } from '@/components/dashboard/explore/explore-card';
import { TherapyToyModal } from '@/components/explore/therapy-toy-modal';
import { useExploreCatalog } from '@/features/explore/hooks/use-explore-catalog';
import { figmaExploreUiAssets } from '@/features/explore/data/figma-explore-assets';
import {
  emptyExploreFilters,
  type ExploreCardItem,
  type ExploreFilterKey,
  type ExploreFilters,
  type ExploreItem,
  type ExploreTab,
} from '@/features/explore/model/explore-types';
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
    <div ref={dropdownRef} className={cn('relative min-w-0', isOpen && 'z-30')}>
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
          className="absolute left-0 top-[calc(100%+8px)] z-30 w-full min-w-40 rounded-2xl border border-[#e8ebe8] bg-white p-3 shadow-[0_10px_28px_rgba(38,50,56,0.14)]"
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

function ExploreFiltersBar({
  filters,
  onToggle,
}: {
  filters: ExploreFilters;
  onToggle: (key: ExploreFilterKey, value: string) => void;
}) {
  const [openFilter, setOpenFilter] = useState<ExploreFilterKey | null>(null);

  return (
    <section
      aria-label="Explore filters"
      className="rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)]"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
        {filterOrder.map((key) => (
          <ExploreFilterDropdown
            key={key}
            filterKey={key}
            values={filters[key]}
            isOpen={openFilter === key}
            onOpenChange={(open) => setOpenFilter(open ? key : null)}
            onToggle={(value) => onToggle(key, value)}
          />
        ))}
      </div>
    </section>
  );
}

function CardsGrid({
  items,
  columns = 4,
  savingItemId,
  onSavedChange,
  onOpenTherapyToy,
}: {
  items: ExploreItem[];
  columns?: 3 | 4;
  savingItemId: string | null;
  onSavedChange: (item: ExploreCardItem, saved: boolean) => void;
  onOpenTherapyToy?: () => void;
}) {
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
          saving={savingItemId === item.id}
          onSavedChange={onSavedChange}
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
  onSavedChange,
  onOpenTherapyToy,
}: {
  title: string;
  items: ExploreItem[];
  columns: 3 | 4;
  className?: string;
  savingItemId: string | null;
  onSavedChange: (item: ExploreCardItem, saved: boolean) => void;
  onOpenTherapyToy?: () => void;
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
          onSavedChange={onSavedChange}
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
  onOpenTherapyToy: () => void;
}) {
  return (
    <div className="columns-1 gap-6 sm:columns-2 2xl:columns-3">
      {items.map((item) => (
        <div key={item.id} className="mb-6 break-inside-avoid">
          <ExploreCard
            item={item}
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
  const [isToyModalOpen, setToyModalOpen] = useState(false);
  const [filters, setFilters] = useState<ExploreFilters>(() => ({
    ...emptyExploreFilters,
    age: [],
    developmentalSkill: [],
    category: [],
    collection: [],
    difficulty: [],
  }));
  const { data, isLoading, setSaved, savingItemId } = useExploreCatalog(initialTab, filters);

  const handleFilterToggle = (key: ExploreFilterKey, value: string) => {
    setFilters((current) => ({
      ...current,
      [key]: current[key].includes(value)
        ? current[key].filter((option) => option !== value)
        : [...current[key], value],
    }));
  };

  const handleSavedChange = (item: ExploreCardItem, saved: boolean) => {
    setSaved({ itemId: item.id, saved });
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
          return (
            <Link
              key={tab}
              href={`/dashboard/explore?tab=${tab}`}
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

      <div className="mt-8 sm:mt-11">
        <ExploreFiltersBar filters={filters} onToggle={handleFilterToggle} />
      </div>

      <div className="mt-10 sm:mt-14">
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
                  'animate-pulse rounded-3xl bg-[#e9f1ee]',
                  initialTab === 'therapy-toys'
                    ? cn(
                        'mb-6 h-auto break-inside-avoid rounded-2xl',
                        index === 2 ? 'aspect-422/470' : 'aspect-422/540'
                      )
                    : 'h-108.5'
                )}
              />
            ))}
          </div>
        ) : initialTab === 'therapy-toys' ? (
          <TherapyToyColumns
            items={data.items}
            savingItemId={savingItemId}
            onSavedChange={handleSavedChange}
            onOpenTherapyToy={() => setToyModalOpen(true)}
          />
        ) : (
          <CardsGrid
            items={data.items}
            savingItemId={savingItemId}
            onSavedChange={handleSavedChange}
          />
        )}
      </div>

      {data && initialTab === 'activities' ? (
        <SavedPanel
          title="Saved Activities"
          items={data.savedItems}
          columns={4}
          className="mt-12 sm:mt-20"
          savingItemId={savingItemId}
          onSavedChange={handleSavedChange}
        />
      ) : null}

      {data && initialTab === 'parent-resources' ? (
        <>
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
          onOpenTherapyToy={() => setToyModalOpen(true)}
        />
      ) : null}

      <TherapyToyModal isOpen={isToyModalOpen} onClose={setToyModalOpen} />
    </div>
  );
}
