'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Bookmark } from 'lucide-react';

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
  height?: number;
  saving?: boolean;
  onSavedChange?: (item: ExploreCardItem, saved: boolean) => void;
  onOpenTherapyToy?: (item: TherapyToyExploreItem) => void;
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
      className={cn('cursor-pointer', className)}
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
          unoptimized={Boolean(
            item.imageSrc?.startsWith('http') || item.imageSrc?.startsWith('/uploads')
          )}
        />
      </UniversalCardMedia>

      <UniversalCardOverlay className="pointer-events-none z-30">
        <UniversalCardBadge tone="activity">{item.badge}</UniversalCardBadge>
        <UniversalCardSaveButton
          label={item.title}
          saved={item.saved}
          disabled={saving}
          onSavedChange={(saved) => onSavedChange?.(item, saved)}
          iconSrc={figmaExploreUiAssets.activity.bookmark}
          savedIconSrc={figmaExploreUiAssets.activity.bookmarkSaved}
          className="pointer-events-auto"
        />
      </UniversalCardOverlay>

      <UniversalCardBody recipe="activity">
        <h3 className="truncate font-nunito text-2xl font-medium leading-8 text-(--explore-text-primary) max-xl:text-lg max-xl:leading-6">
          {item.title}
        </h3>
        <div className="flex flex-col items-start gap-2">
          <div className="flex max-w-full items-center gap-1.25">
            <span className="inline-flex h-7.5 min-w-0 items-center rounded-full border border-(--explore-primary-light) px-2.25 py-1.75 font-nunito text-xs font-medium leading-4 whitespace-nowrap">
              <span className="text-(--explore-text-primary)">Material:</span>
              <span className="ml-1 truncate text-(--explore-text-secondary)">{item.material}</span>
            </span>
            <span className="inline-flex h-7.5 shrink-0 items-center gap-1 px-2 py-1.5 font-manrope text-xs leading-4.5 whitespace-nowrap text-[#607077]">
              <Image src={figmaExploreUiAssets.activity.clock} alt="" width={12} height={12} />
              {item.duration}
            </span>
          </div>
          <div className="flex max-h-7.5 max-w-full flex-wrap items-start gap-1.25 overflow-hidden">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex h-7.5 items-center rounded-full border border-[#accbcb] bg-white px-2.25 py-1.75 font-nunito text-xs font-medium leading-4 whitespace-nowrap text-(--explore-primary)"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </UniversalCardBody>
      <Link
        href={item.href}
        aria-label={`View ${item.title}`}
        className="absolute inset-0 z-20 rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-(--explore-primary) focus-visible:ring-inset"
      />
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
      className={cn('cursor-pointer', className)}
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
          unoptimized={Boolean(
            item.imageSrc?.startsWith('http') || item.imageSrc?.startsWith('/uploads')
          )}
        />
        <UniversalCardOverlay className="pointer-events-none z-30">
          <UniversalCardBadge>{item.badge}</UniversalCardBadge>
          <UniversalCardSaveButton
            label={item.title}
            saved={item.saved}
            disabled={saving}
            onSavedChange={(saved) => onSavedChange?.(item, saved)}
            iconSrc={figmaExploreUiAssets.resource.bookmark}
            savedIconSrc={figmaExploreUiAssets.resource.bookmarkSaved}
            className="pointer-events-auto"
          />
        </UniversalCardOverlay>
      </UniversalCardMedia>

      <UniversalCardBody recipe="resource">
        <div className="flex w-full items-start justify-between gap-3">
          <h3 className="min-w-0 flex-1 truncate font-nunito text-xl font-medium leading-7 text-(--explore-text-primary) max-xl:text-base">
            {item.title}
          </h3>
          <span className="shrink-0 font-manrope text-sm leading-5.5 tracking-[-0.084px] whitespace-nowrap text-(--explore-text-secondary) max-xl:text-xs">
            {item.readTime}
          </span>
        </div>
        <p className="line-clamp-2 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-(--explore-text-secondary) max-xl:text-xs max-xl:leading-4.5">
          {item.description}
        </p>
        <span className="inline-flex w-fit items-center gap-1.25 font-manrope text-xs font-semibold leading-4.5 tracking-[0.48px] text-(--explore-primary)">
          {item.actionLabel}
          <Image src={figmaExploreUiAssets.resource.arrow} alt="" width={14} height={14} />
        </span>
      </UniversalCardBody>
      <Link
        href={item.href}
        aria-label={`View ${item.title}`}
        className="absolute inset-0 z-20 rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-(--explore-primary) focus-visible:ring-inset"
      />
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
      className={cn('h-68.5 max-[700px]:h-auto', className)}
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
          unoptimized={Boolean(
            item.imageSrc?.startsWith('http') || item.imageSrc?.startsWith('/uploads')
          )}
        />
        <UniversalCardOverlay className="pointer-events-none right-0 z-30">
          <UniversalCardBadge>{item.badge}</UniversalCardBadge>
          <UniversalCardSaveButton
            label={item.title}
            saved={item.saved}
            disabled={saving}
            onSavedChange={(saved) => onSavedChange?.(item, saved)}
            iconSrc={figmaExploreUiAssets.resource.bookmark}
            savedIconSrc={figmaExploreUiAssets.resource.bookmarkSaved}
            className="pointer-events-auto"
          />
        </UniversalCardOverlay>
      </UniversalCardMedia>

      <UniversalCardBody recipe="printable">
        <h3 className="font-nunito text-xl font-medium leading-7 text-(--explore-text-primary)">
          {item.title}
        </h3>
        <p className="font-manrope text-sm leading-5.5 tracking-[-0.084px] text-(--explore-text-secondary)">
          {item.description}
        </p>
        <Link
          href={item.href}
          className="inline-flex w-fit items-center gap-1.25 font-manrope text-xs font-semibold leading-4.5 tracking-[0.48px] text-(--explore-primary) outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-(--explore-primary) focus-visible:ring-offset-2"
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
  height,
  saving,
  onSavedChange,
  onOpenTherapyToy,
}: RecipeCardProps<TherapyToyExploreItem> & { height?: number }) {
  const isFeatured = item.badge ? true : false;
  const imageSrc = item.imageSrc || '/Home/therapy-toy-kinetic-sand.png';

  return (
    <article
      onClick={() => onOpenTherapyToy?.(item)}
      className={cn(
        'relative cursor-pointer overflow-hidden rounded-2xl border border-[#EDEEF0] bg-white p-4 text-white shadow-[0px_2px_16px_rgba(198,202,209,0.22)]',
        className
      )}
      style={{ height: height || 540 }}
    >
      <Image
        src={imageSrc}
        alt={item.title}
        fill
        sizes="(min-width: 1280px) 23vw, 46vw"
        className="object-cover"
        unoptimized={Boolean(item.imageSrc?.startsWith('http'))}
      />
      <div className="absolute inset-x-0 bottom-0 h-[58%] bg-linear-to-t from-[#242424]/85 via-[#242424]/42 to-transparent" />

      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between gap-3">
          {isFeatured ? (
            <span className="rounded-full bg-[#E3F7EC] px-2 py-1 font-manrope text-[10px] leading-3.5 text-[#16643B]">
              {item.badge || 'OT Favorite'}
            </span>
          ) : (
            <span />
          )}
          <button
            type="button"
            disabled={saving}
            aria-label={item.saved ? `Remove ${item.title} from saved` : `Save ${item.title}`}
            onClick={(event) => {
              event.stopPropagation();
              onSavedChange?.(item, !item.saved);
            }}
            className="flex size-6 items-center justify-center rounded-full bg-white/90 text-[#607077] shadow-[0px_1px_4px_rgba(0,0,0,0.12)] disabled:opacity-50"
          >
            <Bookmark className={item.saved ? 'size-4 fill-[#2F7D7E] text-[#2F7D7E]' : 'size-4'} />
          </button>
        </div>

        <div className="flex flex-col items-start gap-4">
          <div>
            <h3 className="font-nunito text-xl font-medium leading-7">{item.title}</h3>
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <span className="rounded-full bg-[#DCEEEE] px-2.5 py-0.5 font-nunito text-xs leading-4 text-[#174A4D]">
                {item.age}
              </span>
              {item.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-[#DCEEEE] px-2.5 py-0.5 font-nunito text-xs leading-4 text-[#174A4D]"
                >
                  {skill}
                </span>
              ))}
              {item.price !== null && item.price !== undefined ? (
                <span className="flex items-center gap-1 px-1 font-nunito text-xs leading-4 text-white">
                  ${Number(item.price).toFixed(2)}
                </span>
              ) : null}
            </div>
          </div>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onOpenTherapyToy?.(item);
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

export function ExploreCard(props: ExploreCardProps) {
  if (props.item.kind === 'activity') return <ActivityCard {...props} item={props.item} />;
  if (props.item.kind === 'parent-resource') return <ResourceCard {...props} item={props.item} />;
  if (props.item.kind === 'printable') return <PrintableCard {...props} item={props.item} />;
  return <TherapyToyCard {...props} item={props.item} height={props.height} />;
}
