'use client';

import Image from 'next/image';
import Link from 'next/link';

import {
  UniversalCard,
  UniversalCardArtwork,
  UniversalCardBadge,
  UniversalCardBody,
  UniversalCardMedia,
  UniversalCardOverlay,
  UniversalCardSaveButton,
} from '@/components/dashboard/explore/universal-card';
import type {
  ActivityExploreItem,
  ExploreCardItem,
  ParentResourceExploreItem,
  PrintableExploreItem,
  TherapyToyExploreItem,
} from '@/features/explore/model/explore-types';
import { figmaExploreUiAssets } from '@/features/explore/data/figma-explore-assets';
import { cn } from '@/lib/utils';

type ExploreCardProps = {
  item: ExploreCardItem;
  className?: string;
  saving?: boolean;
  onSavedChange?: (item: ExploreCardItem, saved: boolean) => void;
};

type RecipeCardProps<T extends ExploreCardItem> = Omit<ExploreCardProps, 'item'> & { item: T };

function ActivityCard({
  item,
  className,
  saving,
  onSavedChange,
}: RecipeCardProps<ActivityExploreItem>) {
  return (
    <UniversalCard
      recipe="activity"
      state={item.highlighted ? 'highlighted' : item.saved ? 'saved' : 'default'}
      className={className}
    >
      <UniversalCardMedia recipe="activity">
        <UniversalCardArtwork
          src={item.imageSrc}
          alt={item.imageAlt}
          maskSrc={figmaExploreUiAssets.activity.mask}
          maskPosition="44.978px 184.721px"
          maskSize="253.045px 244.813px"
          frameClassName="left-1/2 top-[-172px] h-[516px] w-[344px] -translate-x-1/2"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
        <UniversalCardOverlay>
          <UniversalCardBadge tone="activity">{item.badge}</UniversalCardBadge>
          <UniversalCardSaveButton
            label={item.title}
            saved={item.saved}
            disabled={saving}
            onSavedChange={(saved) => onSavedChange?.(item, saved)}
            iconSrc={figmaExploreUiAssets.activity.bookmark}
            savedIconSrc={figmaExploreUiAssets.activity.bookmarkSaved}
          />
        </UniversalCardOverlay>
      </UniversalCardMedia>

      <UniversalCardBody recipe="activity">
        <h3 className="truncate font-nunito text-2xl font-medium leading-8 text-[var(--explore-text-primary)] max-xl:text-lg max-xl:leading-6">
          {item.title}
        </h3>
        <div className="flex flex-col items-start gap-2">
          <div className="flex max-w-full items-center gap-[5px]">
            <span className="inline-flex h-[30px] min-w-0 items-center rounded-full border border-[var(--explore-primary-light)] px-[9px] py-[7px] font-nunito text-xs font-medium leading-4 whitespace-nowrap">
              <span className="text-[var(--explore-text-primary)]">Material:</span>
              <span className="ml-1 truncate text-[var(--explore-text-secondary)]">
                {item.material}
              </span>
            </span>
            <span className="inline-flex h-[30px] shrink-0 items-center gap-1 px-2 py-1.5 font-manrope text-xs leading-[18px] whitespace-nowrap text-[#607077]">
              <Image src={figmaExploreUiAssets.activity.clock} alt="" width={12} height={12} />
              {item.duration}
            </span>
          </div>
          <div className="flex max-h-[30px] max-w-full flex-wrap items-start gap-[5px] overflow-hidden">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex h-[30px] items-center rounded-full border border-[#accbcb] bg-white px-[9px] py-[7px] font-nunito text-xs font-medium leading-4 whitespace-nowrap text-[var(--explore-primary)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </UniversalCardBody>
    </UniversalCard>
  );
}

function ResourceCard({
  item,
  className,
  saving,
  onSavedChange,
}: RecipeCardProps<ParentResourceExploreItem>) {
  return (
    <UniversalCard
      recipe="resource"
      state={item.highlighted ? 'highlighted' : item.saved ? 'saved' : 'default'}
      className={className}
    >
      <UniversalCardMedia recipe="resource">
        <UniversalCardArtwork
          src={item.imageSrc}
          alt={item.imageAlt}
          maskSrc={figmaExploreUiAssets.resource.mask}
          maskPosition="19.221px 68.953px"
          maskSize="255.559px 245.637px"
          frameClassName="left-1/2 top-[-58px] h-[403px] w-[294px] -translate-x-1/2"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
        <UniversalCardOverlay>
          <UniversalCardBadge>{item.badge}</UniversalCardBadge>
          <UniversalCardSaveButton
            label={item.title}
            saved={item.saved}
            disabled={saving}
            onSavedChange={(saved) => onSavedChange?.(item, saved)}
            iconSrc={figmaExploreUiAssets.resource.bookmark}
            savedIconSrc={figmaExploreUiAssets.resource.bookmarkSaved}
          />
        </UniversalCardOverlay>
      </UniversalCardMedia>

      <UniversalCardBody recipe="resource">
        <div className="flex w-full items-start justify-between gap-3">
          <h3 className="min-w-0 flex-1 truncate font-nunito text-xl font-medium leading-7 text-[var(--explore-text-primary)] max-xl:text-base">
            {item.title}
          </h3>
          <span className="shrink-0 font-manrope text-sm leading-[22px] tracking-[-0.084px] whitespace-nowrap text-[var(--explore-text-secondary)] max-xl:text-xs">
            {item.readTime}
          </span>
        </div>
        <p className="line-clamp-2 font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[var(--explore-text-secondary)] max-xl:text-xs max-xl:leading-[18px]">
          {item.description}
        </p>
        <Link
          href={item.href}
          className="inline-flex w-fit items-center gap-[5px] font-manrope text-xs font-semibold leading-[18px] tracking-[0.48px] text-[var(--explore-primary)] outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-[var(--explore-primary)] focus-visible:ring-offset-2"
        >
          {item.actionLabel}
          <Image src={figmaExploreUiAssets.resource.arrow} alt="" width={14} height={14} />
        </Link>
      </UniversalCardBody>
    </UniversalCard>
  );
}

function PrintableCard({
  item,
  className,
  saving,
  onSavedChange,
}: RecipeCardProps<PrintableExploreItem>) {
  return (
    <UniversalCard
      recipe="printable"
      state={item.saved ? 'saved' : 'default'}
      className={cn('h-[274px] max-[700px]:h-auto', className)}
    >
      <UniversalCardMedia recipe="printable">
        <UniversalCardArtwork
          src={item.imageSrc}
          alt={item.imageAlt}
          maskSrc={figmaExploreUiAssets.resource.printableMask}
          maskPosition="16.133px 55.809px"
          maskSize="200.397px 193.146px"
          frameClassName="left-[9.67px] top-[0.14px] h-[318.783px] w-[232.762px]"
          sizes="259px"
        />
        <UniversalCardOverlay className="right-0">
          <UniversalCardBadge>{item.badge}</UniversalCardBadge>
          <UniversalCardSaveButton
            label={item.title}
            saved={item.saved}
            disabled={saving}
            onSavedChange={(saved) => onSavedChange?.(item, saved)}
            iconSrc={figmaExploreUiAssets.resource.bookmark}
            savedIconSrc={figmaExploreUiAssets.resource.bookmarkSaved}
          />
        </UniversalCardOverlay>
      </UniversalCardMedia>

      <UniversalCardBody recipe="printable">
        <h3 className="font-nunito text-xl font-medium leading-7 text-[var(--explore-text-primary)]">
          {item.title}
        </h3>
        <p className="font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[var(--explore-text-secondary)]">
          {item.description}
        </p>
        <Link
          href={item.href}
          className="inline-flex w-fit items-center gap-[5px] font-manrope text-xs font-semibold leading-[18px] tracking-[0.48px] text-[var(--explore-primary)] outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-[var(--explore-primary)] focus-visible:ring-offset-2"
        >
          <Image src={figmaExploreUiAssets.resource.download} alt="" width={14} height={14} />
          {item.downloadLabel}
        </Link>
      </UniversalCardBody>
    </UniversalCard>
  );
}

function TherapyToyCard({
  item,
  className,
  saving,
  onSavedChange,
}: RecipeCardProps<TherapyToyExploreItem>) {
  return (
    <UniversalCard
      recipe="therapyToy"
      state={item.saved ? 'saved' : 'default'}
      className={cn(item.compact ? 'h-[470px]' : 'h-[540px]', className)}
    >
      <UniversalCardMedia recipe="therapyToy">
        <Image
          src={item.imageSrc}
          alt={item.imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-t from-[#172120]/95 via-[#172120]/55 to-transparent" />
        <UniversalCardOverlay className="inset-x-0 top-0 h-14 px-4 pt-4">
          <UniversalCardBadge className="bg-[#e5f2e8] text-[#2f7d50]">
            {item.badge}
          </UniversalCardBadge>
          <UniversalCardSaveButton
            label={item.title}
            saved={item.saved}
            disabled={saving}
            onSavedChange={(saved) => onSavedChange?.(item, saved)}
            iconSrc={figmaExploreUiAssets.therapyToy.bookmark}
            savedIconSrc={figmaExploreUiAssets.therapyToy.bookmarkSaved}
          />
        </UniversalCardOverlay>
      </UniversalCardMedia>

      <UniversalCardBody recipe="therapyToy">
        <h3 className="font-nunito text-xl font-medium leading-7 text-white">{item.title}</h3>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-white/95 px-2.5 py-1 font-nunito text-xs font-medium leading-4 text-[#515b60]">
            {item.age}
          </span>
          {item.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-[#dceeee] px-2.5 py-1 font-nunito text-xs font-medium leading-4 text-[#2f7d7e]"
            >
              {skill}
            </span>
          ))}
        </div>
        <Link
          href={item.href}
          className="inline-flex w-fit items-center gap-1 rounded-[10px] py-2.5 font-manrope text-base font-semibold leading-[27px] tracking-[-0.24px] text-[#f2b59f] outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          See Why We Recommend It
          <Image
            src={
              item.id.startsWith('saved-')
                ? figmaExploreUiAssets.therapyToy.savedSectionArrow
                : figmaExploreUiAssets.therapyToy.arrow
            }
            alt=""
            width={20}
            height={20}
          />
        </Link>
      </UniversalCardBody>
    </UniversalCard>
  );
}

export function ExploreCard(props: ExploreCardProps) {
  if (props.item.kind === 'activity') return <ActivityCard {...props} item={props.item} />;
  if (props.item.kind === 'parent-resource') return <ResourceCard {...props} item={props.item} />;
  if (props.item.kind === 'printable') return <PrintableCard {...props} item={props.item} />;
  return <TherapyToyCard {...props} item={props.item} />;
}
