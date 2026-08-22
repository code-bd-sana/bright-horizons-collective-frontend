'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, useState } from 'react';

import { ExploreCard } from '@/components/dashboard/explore/explore-card';
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

function FilterChevron() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4 shrink-0 text-[#2f7d7e]">
      <path d="m5 6.5 3 3 3-3" fill="none" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}

function ExploreFiltersBar({
  filters,
  onToggle,
}: {
  filters: ExploreFilters;
  onToggle: (key: ExploreFilterKey, value: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-start gap-4" aria-label="Explore filters">
      {filterOrder.map((key) => (
        <details key={key} className="group relative z-20">
          <summary className="flex cursor-pointer list-none items-center gap-1 rounded-xl border border-[#d4d6d7] bg-white px-[9px] py-[7px] font-nunito text-xs font-medium leading-4 whitespace-nowrap text-[#515b60] outline-none marker:hidden focus-visible:ring-2 focus-visible:ring-[#2f7d7e] [&::-webkit-details-marker]:hidden">
            {filterLabels[key]}
            {filters[key].length > 0 ? ` (${filters[key].length})` : null}
            <span className="transition-transform group-open:rotate-180">
              <FilterChevron />
            </span>
          </summary>
          <fieldset className="absolute left-0 top-[38px] z-30 flex w-[145px] flex-col gap-1 rounded-xl border border-[#e8ebe8] bg-white p-2.5 shadow-[0_8px_24px_rgba(38,50,56,0.14)] max-sm:fixed max-sm:left-4 max-sm:right-4 max-sm:top-auto max-sm:w-auto">
            <legend className="mb-1 w-full font-nunito text-xs font-medium leading-4 text-[#263238]">
              {filterLabels[key]}
            </legend>
            {filterOptions[key].map((option) => (
              <label
                key={option}
                className="flex cursor-pointer items-center gap-1.5 font-manrope text-[9px] leading-3.5 text-[#515b60]"
              >
                <input
                  type="checkbox"
                  checked={filters[key].includes(option)}
                  onChange={() => onToggle(key, option)}
                  className="size-3 appearance-none rounded-[3px] border border-[#d4d6d7] bg-white checked:border-[#2f7d7e] checked:bg-[#2f7d7e]"
                />
                {option}
              </label>
            ))}
          </fieldset>
        </details>
      ))}
    </div>
  );
}

function CardsGrid({
  items,
  columns = 4,
  savingItemId,
  onSavedChange,
}: {
  items: ExploreItem[];
  columns?: 3 | 4;
  savingItemId: string | null;
  onSavedChange: (item: ExploreCardItem, saved: boolean) => void;
}) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-6 sm:grid-cols-2',
        columns === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
      )}
    >
      {items.map((item) => (
        <ExploreCard
          key={item.id}
          item={item}
          saving={savingItemId === item.id}
          onSavedChange={onSavedChange}
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
}: {
  title: string;
  items: ExploreItem[];
  columns: 3 | 4;
  className?: string;
  savingItemId: string | null;
  onSavedChange: (item: ExploreCardItem, saved: boolean) => void;
}) {
  return (
    <section
      className={cn(
        'rounded-2xl border border-[#e8ebe8] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:p-6 lg:p-8',
        className
      )}
    >
      <h2 className="mb-6 font-nunito text-2xl font-medium leading-8 text-[#263238]">{title}</h2>
      {items.length > 0 ? (
        <CardsGrid
          items={items}
          columns={columns}
          savingItemId={savingItemId}
          onSavedChange={onSavedChange}
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
    <section className="relative mx-auto mt-16 flex min-h-[409px] w-full max-w-[1219px] items-center justify-center overflow-hidden rounded-2xl border border-[#d5e5e5] p-6 lg:mt-24 lg:p-8">
      <Image src={figmaExploreUiAssets.newsletter.glow} alt="" fill className="object-cover" />
      <Image
        src={figmaExploreUiAssets.newsletter.top}
        alt=""
        width={358}
        height={344}
        className="absolute left-1/2 top-[-168px] -translate-x-1/2"
      />
      <Image
        src={figmaExploreUiAssets.newsletter.right}
        alt=""
        width={237}
        height={227}
        className="absolute -right-6 bottom-[-38px] max-sm:hidden"
      />
      <Image
        src={figmaExploreUiAssets.newsletter.left}
        alt=""
        width={358}
        height={344}
        className="absolute -bottom-28 -left-20 max-sm:hidden"
      />
      <div className="relative z-10 flex w-full max-w-[442px] flex-col items-center gap-3 text-center">
        <h2 className="font-nunito text-[28px] font-medium leading-9 tracking-[-0.16px] text-[#2f7d7e] sm:text-[32px] sm:leading-10">
          Get Weekly Learning Updates
        </h2>
        <p className="font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#7d8488]">
          Join 5,000+ parents receiving research-backed tips and new resource alerts tailored to
          their child&apos;s development.
        </p>
        <form onSubmit={handleSubmit} className="mt-1 flex w-full max-w-96 items-stretch gap-2">
          <input
            type="email"
            required
            aria-label="Email address"
            placeholder="Enter your email address"
            className="min-w-0 flex-1 rounded-full border border-[#e2e8f0] bg-white px-3 py-2.5 font-manrope text-xs leading-[18px] text-[#263238] outline-none placeholder:text-[#64748b] focus:border-[#2f7d7e]"
          />
          <button
            type="submit"
            className="min-w-20 rounded-full bg-[#f2b59f] px-4 py-2 font-nunito text-sm font-medium leading-5 tracking-[-0.084px] text-white outline-none focus-visible:ring-2 focus-visible:ring-[#2f7d7e] focus-visible:ring-offset-2"
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
}: {
  items: ExploreItem[];
  savingItemId: string | null;
  onSavedChange: (item: ExploreCardItem, saved: boolean) => void;
}) {
  const columns = [items.slice(0, 2), items.slice(2, 4), items.slice(4, 6)];

  return (
    <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {columns.map((column, columnIndex) => (
        <div key={columnIndex} className="flex min-w-0 flex-col gap-6">
          {column.map((item) => (
            <ExploreCard
              key={item.id}
              item={item}
              saving={savingItemId === item.id}
              onSavedChange={onSavedChange}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function DashboardExplorePage({ initialTab }: { initialTab: ExploreTab }) {
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
    <div className="min-w-0 bg-[var(--explore-background)] pb-12 lg:px-2">
      <header className="flex max-w-[720px] flex-col gap-3 sm:min-h-24">
        <h1 className="font-nunito text-[28px] font-medium leading-9 tracking-[-0.16px] text-[#263238] sm:text-[32px] sm:leading-10">
          {title}
        </h1>
        <p className="font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#515b60]">
          {description}
        </p>
      </header>

      <nav aria-label="Explore categories" className="mt-10 flex flex-wrap gap-2 sm:mt-9">
        {tabOrder.map((tab) => {
          const active = tab === initialTab;
          return (
            <Link
              key={tab}
              href={`/dashboard/explore?tab=${tab}`}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'flex h-12 items-center justify-center rounded-full px-4 font-nunito text-sm font-medium leading-5 tracking-[-0.084px] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#2f7d7e] focus-visible:ring-offset-2',
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
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            aria-label="Loading explore items"
          >
            {Array.from({ length: initialTab === 'therapy-toys' ? 6 : 8 }, (_, index) => (
              <div
                key={index}
                className={cn(
                  'animate-pulse rounded-3xl bg-[#e9f1ee]',
                  initialTab === 'therapy-toys' ? 'h-[540px]' : 'h-[434px]'
                )}
              />
            ))}
          </div>
        ) : initialTab === 'therapy-toys' ? (
          <TherapyToyColumns
            items={data.items}
            savingItemId={savingItemId}
            onSavedChange={handleSavedChange}
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
          <section className="mt-12 rounded-2xl border border-[#e8ebe8] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:mt-14 sm:p-6 lg:p-8">
            <h2 className="mb-6 font-nunito text-2xl font-medium leading-8 text-[#263238]">
              Printable Resources
            </h2>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
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
          title="Saved Resources"
          items={data.savedItems}
          columns={3}
          className="mt-16 lg:mt-[130px]"
          savingItemId={savingItemId}
          onSavedChange={handleSavedChange}
        />
      ) : null}
    </div>
  );
}
