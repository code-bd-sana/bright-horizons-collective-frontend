'use client';

import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

import {
  UniversalCard,
  UniversalCardArtwork,
  UniversalCardBadge,
  UniversalCardBody,
  UniversalCardMedia,
  UniversalCardOverlay,
  UniversalCardSaveButton,
  type UniversalCardProps,
} from '@/components/dashboard/explore/universal-card';
import { cn } from '@/lib/utils';

const ASSET_ROOT = '/dashboard/explore';

type SaveableCardProps = {
  saved?: boolean;
  defaultSaved?: boolean;
  onSavedChange?: (saved: boolean) => void;
};

function useSavedState({ saved, defaultSaved = false, onSavedChange }: SaveableCardProps) {
  const [internalSaved, setInternalSaved] = React.useState(defaultSaved);
  const isSaved = saved ?? internalSaved;

  const setSaved = (nextSaved: boolean) => {
    if (saved === undefined) setInternalSaved(nextSaved);
    onSavedChange?.(nextSaved);
  };

  return [isSaved, setSaved] as const;
}

type CardShellProps = Omit<UniversalCardProps, 'children' | 'recipe' | 'state' | 'as'>;

type ActivityCardProps = CardShellProps &
  SaveableCardProps & {
    title: string;
    imageSrc?: string;
    imageAlt?: string;
    maskSrc?: string;
    difficulty: string;
    material: string;
    duration: string;
    tags: React.ReactNode[];
    highlighted?: boolean;
    media?: React.ReactNode;
    body?: React.ReactNode;
  };

function ActivityCard({
  title,
  imageSrc = `${ASSET_ROOT}/activity-balance.png`,
  imageAlt = '',
  maskSrc = `${ASSET_ROOT}/activity-mask.svg`,
  difficulty,
  material,
  duration,
  tags,
  highlighted = false,
  saved,
  defaultSaved,
  onSavedChange,
  media,
  body,
  className,
  ...props
}: ActivityCardProps) {
  const [isSaved, setSaved] = useSavedState({ saved, defaultSaved, onSavedChange });

  return (
    <UniversalCard
      recipe="activity"
      state={highlighted ? 'highlighted' : isSaved ? 'saved' : 'default'}
      className={className}
      {...props}
    >
      <UniversalCardMedia recipe="activity">
        {media ?? (
          <UniversalCardArtwork
            src={imageSrc}
            alt={imageAlt}
            maskSrc={maskSrc}
            maskPosition="9.978px 38.721px"
            maskSize="253.045px 244.813px"
            frameClassName="left-[45px] top-[-26px] h-[416px] w-[297px]"
          />
        )}
        <UniversalCardOverlay>
          <UniversalCardBadge tone="activity">{difficulty}</UniversalCardBadge>
          <UniversalCardSaveButton
            label={title}
            saved={isSaved}
            onSavedChange={setSaved}
            iconSrc={`${ASSET_ROOT}/activity-bookmark.svg`}
            savedIconSrc={`${ASSET_ROOT}/bookmark-filled.svg`}
          />
        </UniversalCardOverlay>
      </UniversalCardMedia>

      <UniversalCardBody recipe="activity">
        {body ?? (
          <>
            <h3 className="font-nunito text-2xl font-medium leading-8 text-[var(--explore-text-primary)]">
              {title}
            </h3>
            <div className="flex flex-col items-start gap-2">
              <div className="flex items-center gap-[5px]">
                <span className="inline-flex h-[30px] items-center rounded-full border border-[var(--explore-primary-light)] px-[9px] py-[7px] font-nunito text-xs font-medium leading-4 whitespace-nowrap">
                  <span className="text-[var(--explore-text-primary)]">Material:</span>
                  <span className="ml-1 text-[var(--explore-text-secondary)]">{material}</span>
                </span>
                <span className="inline-flex h-[30px] items-center gap-1 px-2 py-1.5 font-manrope text-xs leading-[18px] whitespace-nowrap text-[#607077]">
                  <Image
                    src={`${ASSET_ROOT}/duration.svg`}
                    alt=""
                    width={12}
                    height={12}
                    className="size-3"
                  />
                  {duration}
                </span>
              </div>
              <div className="flex flex-wrap items-start gap-[5px]">
                {tags.map((tag, index) => (
                  <span
                    key={`${typeof tag === 'string' ? tag : 'tag'}-${index}`}
                    className="inline-flex h-[30px] items-center rounded-full border border-[#accbcb] bg-white px-[9px] py-[7px] font-nunito text-xs font-medium leading-4 whitespace-nowrap text-[var(--explore-primary)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
      </UniversalCardBody>
    </UniversalCard>
  );
}

type ResourceCardProps = CardShellProps &
  SaveableCardProps & {
    title: string;
    description: React.ReactNode;
    imageSrc?: string;
    imageAlt?: string;
    maskSrc?: string;
    category?: string;
    readTime?: string;
    href: string;
    actionLabel?: string;
    highlighted?: boolean;
    media?: React.ReactNode;
    body?: React.ReactNode;
  };

function ResourceCard({
  title,
  description,
  imageSrc = `${ASSET_ROOT}/resource-guides.png`,
  imageAlt = '',
  maskSrc = `${ASSET_ROOT}/resource-mask.svg`,
  category = 'Sensory',
  readTime = '5 min Read',
  href,
  actionLabel = 'Explore',
  highlighted = false,
  saved,
  defaultSaved,
  onSavedChange,
  media,
  body,
  className,
  ...props
}: ResourceCardProps) {
  const [isSaved, setSaved] = useSavedState({ saved, defaultSaved, onSavedChange });

  return (
    <UniversalCard
      recipe="resource"
      state={highlighted ? 'highlighted' : isSaved ? 'saved' : 'default'}
      className={className}
      {...props}
    >
      <UniversalCardMedia recipe="resource">
        {media ?? (
          <UniversalCardArtwork
            src={imageSrc}
            alt={imageAlt}
            maskSrc={maskSrc}
            maskPosition="3.221px 68.953px"
            maskSize="255.559px 245.637px"
            frameClassName="left-[51px] top-[-58px] h-[474px] w-[259px]"
          />
        )}
        <UniversalCardOverlay>
          <UniversalCardBadge>{category}</UniversalCardBadge>
          <UniversalCardSaveButton
            label={title}
            saved={isSaved}
            onSavedChange={setSaved}
            iconSrc={`${ASSET_ROOT}/resource-bookmark.svg`}
            savedIconSrc={`${ASSET_ROOT}/resource-bookmark-filled.svg`}
          />
        </UniversalCardOverlay>
      </UniversalCardMedia>

      <UniversalCardBody recipe="resource">
        {body ?? (
          <>
            <div className="flex w-full items-start justify-between gap-4">
              <h3 className="min-w-0 flex-1 font-nunito text-xl font-medium leading-7 text-[var(--explore-text-primary)]">
                {title}
              </h3>
              <span className="shrink-0 font-manrope text-sm leading-[22px] tracking-[-0.084px] whitespace-nowrap text-[var(--explore-text-secondary)]">
                {readTime}
              </span>
            </div>
            <p className="font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[var(--explore-text-secondary)]">
              {description}
            </p>
            <Link
              href={href}
              className="inline-flex w-fit items-center gap-[5px] font-manrope text-xs font-semibold leading-[18px] tracking-[0.48px] text-[var(--explore-primary)] outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-[var(--explore-primary)] focus-visible:ring-offset-2"
            >
              {actionLabel}
              <Image
                src={`${ASSET_ROOT}/arrow-up-right.svg`}
                alt=""
                width={14}
                height={14}
                className="size-3.5"
              />
            </Link>
          </>
        )}
      </UniversalCardBody>
    </UniversalCard>
  );
}

type PrintableResourceCardProps = CardShellProps &
  SaveableCardProps & {
    title: string;
    description: React.ReactNode;
    imageSrc?: string;
    imageAlt?: string;
    maskSrc?: string;
    category?: string;
    href: string;
    downloadLabel?: string;
    highlighted?: boolean;
    media?: React.ReactNode;
    body?: React.ReactNode;
  };

function PrintableResourceCard({
  title,
  description,
  imageSrc = `${ASSET_ROOT}/printable-routine.png`,
  imageAlt = '',
  maskSrc = `${ASSET_ROOT}/printable-mask.svg`,
  category = 'Sensory',
  href,
  downloadLabel = 'Download (1.2 MB)',
  highlighted = false,
  saved,
  defaultSaved,
  onSavedChange,
  media,
  body,
  className,
  ...props
}: PrintableResourceCardProps) {
  const [isSaved, setSaved] = useSavedState({ saved, defaultSaved, onSavedChange });

  return (
    <UniversalCard
      recipe="printable"
      state={highlighted ? 'highlighted' : isSaved ? 'saved' : 'default'}
      className={cn('h-[274px] max-[700px]:h-auto', className)}
      {...props}
    >
      <UniversalCardMedia recipe="printable">
        {media ?? (
          <UniversalCardArtwork
            src={imageSrc}
            alt={imageAlt}
            maskSrc={maskSrc}
            maskPosition="16.133px 55.809px"
            maskSize="200.397px 193.146px"
            frameClassName="left-[9.67px] top-[0.14px] h-[318.783px] w-[232.762px]"
            sizes="259px"
          />
        )}
        <UniversalCardOverlay className="right-0">
          <UniversalCardBadge>{category}</UniversalCardBadge>
          <UniversalCardSaveButton
            label={title}
            saved={isSaved}
            onSavedChange={setSaved}
            iconSrc={`${ASSET_ROOT}/printable-bookmark.svg`}
            savedIconSrc={`${ASSET_ROOT}/resource-bookmark-filled.svg`}
          />
        </UniversalCardOverlay>
      </UniversalCardMedia>

      <UniversalCardBody recipe="printable">
        {body ?? (
          <>
            <h3 className="font-nunito text-xl font-medium leading-7 text-[var(--explore-text-primary)]">
              {title}
            </h3>
            <p className="font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[var(--explore-text-secondary)]">
              {description}
            </p>
            <Link
              href={href}
              className="inline-flex w-fit items-center gap-[5px] font-manrope text-xs font-semibold leading-[18px] tracking-[0.48px] text-[var(--explore-primary)] outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-[var(--explore-primary)] focus-visible:ring-offset-2"
            >
              <Image
                src={`${ASSET_ROOT}/download.svg`}
                alt=""
                width={14}
                height={14}
                className="size-3.5"
              />
              {downloadLabel}
            </Link>
          </>
        )}
      </UniversalCardBody>
    </UniversalCard>
  );
}

export { ActivityCard, PrintableResourceCard, ResourceCard };
export type { ActivityCardProps, PrintableResourceCardProps, ResourceCardProps };
