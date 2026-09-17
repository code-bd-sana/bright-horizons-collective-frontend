'use client';

import {
  Archive,
  Clock3,
  Copy,
  Eye,
  FileText,
  Layers3,
  Loader2,
  PencilLine,
  Trash2,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { Activity } from '@/features/activities/model/activity.types';

function formatAgeRange(minMonths: number, maxMonths: number): string {
  if (minMonths === 0 && maxMonths <= 12) return '0–12 mo';
  if (minMonths >= 12 && maxMonths <= 24) return '12–24 mo';
  if (maxMonths <= 24) return `${minMonths}–${maxMonths} mo`;
  const minYears = Math.floor(minMonths / 12);
  const maxYears = Math.ceil(maxMonths / 12);
  if (minYears === maxYears) return `${minYears} yr`;
  return `${minYears}–${maxYears} yr`;
}

function getMembershipLabel(tiers: string[] = []): string {
  if (tiers.includes('LITTLE_STEPS')) return 'Little Steps';
  if (tiers.includes('GROW_TOGETHER')) return 'Grow Together';
  if (tiers.includes('PERSONALIZED_PATHWAYS')) return 'Personalized Pathways';
  return 'All Members';
}

function getDifficultyLabel(difficulty: string): string {
  switch (difficulty) {
    case 'EASY':
      return 'Easy';
    case 'MODERATE':
      return 'Moderate';
    case 'CHALLENGING':
      return 'Challenging';
    default:
      return difficulty || 'Easy';
  }
}

export function ActivityCard({
  activity,
  onArchive,
  onPublish,
  onDelete,
  onDuplicate,
  isArchiving = false,
  isDeleting = false,
}: {
  activity: Activity;
  onArchive?: (activity: Activity) => void;
  onPublish?: (activity: Activity) => void;
  onDelete?: (activity: Activity) => void;
  onDuplicate?: (activity: Activity) => void;
  isArchiving?: boolean;
  isDeleting?: boolean;
}) {
  const isPublished = activity.status === 'PUBLISHED';
  const isDraft = activity.status === 'DRAFT';
  const isArchived = activity.status === 'ARCHIVED';

  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#d8dfdf] bg-white p-4 shadow-[0_1px_2px_rgba(38,50,56,0.03)] 2xl:min-h-119.5">
      <div className="relative h-48 shrink-0 overflow-hidden rounded-[18px] bg-[#e8e8e8] sm:h-52">
        <Image
          src={
            activity.featuredImageUrl || '/images/admin/activities/stacking-sorting-challenge.png'
          }
          alt={activity.title}
          fill
          unoptimized={Boolean(
            activity.featuredImageUrl?.startsWith('http') ||
            activity.featuredImageUrl?.startsWith('/uploads')
          )}
          sizes="(min-width: 1280px) 32vw, (min-width: 768px) 48vw, 100vw"
          className="object-cover"
        />
        <span className="absolute left-4 top-3 rounded-full bg-[#516568]/80 px-2.5 py-1 font-manrope text-xs font-medium leading-4 text-white">
          {activity.developmentCategory}
        </span>
        <span
          className={`absolute right-4 top-3 rounded-full px-3 py-1 font-manrope text-xs font-semibold leading-4 ${
            isPublished
              ? 'bg-white text-[#007b75] shadow-xs'
              : isDraft
                ? 'bg-[#fffbeb] text-[#b45309] border border-[#fef3c7]'
                : 'bg-[#f3f4f6] text-[#6b7280] border border-[#e5e7eb]'
          }`}
        >
          {isPublished ? 'Published' : isDraft ? 'Draft' : 'Archived'}
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col pt-6">
        <h2 className="font-nunito text-base font-semibold leading-6 text-[#1e282d]">
          {activity.title}
        </h2>
        <p className="mt-1.5 line-clamp-2 font-manrope text-sm leading-5.5 text-[#5f8096]">
          {activity.shortDescription}
        </p>

        <div className="mt-2.5 flex flex-wrap gap-2">
          <span className="rounded-full bg-[#edfaff] px-2.5 py-0.5 font-manrope text-xs leading-4 text-[#36b7f2]">
            {activity.developmentCategory}
          </span>
          <span className="rounded-full bg-[#eef5f6] px-2.5 py-0.5 font-manrope text-xs leading-4 text-[#668a9e]">
            {formatAgeRange(activity.minAgeMonths, activity.maxAgeMonths)}
          </span>
          <span className="rounded-full bg-[#eaf7f5] px-2.5 py-0.5 font-manrope text-xs leading-4 text-[#27898a]">
            {getMembershipLabel(activity.accessLevel)}
          </span>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 font-manrope text-xs leading-4.5 text-[#668a9e] 2xl:flex-nowrap 2xl:justify-between 2xl:gap-0">
          <span className="flex items-center gap-1.5">
            <Clock3 aria-hidden="true" size={14} strokeWidth={1.5} />
            {activity.estimatedDuration || '15 min'}
          </span>
          <span className="flex items-center gap-1.5 2xl:mr-auto 2xl:ml-4">
            <Layers3 aria-hidden="true" size={14} strokeWidth={1.5} />
            {getDifficultyLabel(activity.difficultyLevel)}
          </span>
          <span className="flex items-center gap-1.5 text-[#27898a]">
            <FileText aria-hidden="true" size={14} strokeWidth={1.5} />
            {activity.otDesigned || (activity.isOtDesigned ? 'Therapist-approved' : 'OT Designed')}
          </span>
        </div>

        <div className="mt-6 -mx-4 -mb-4 flex min-h-15 items-start border-t border-[#e4e9e9] px-4 py-3 2xl:mt-auto 2xl:h-15 2xl:items-center 2xl:py-0">
          <div className="grid min-w-0 flex-1 grid-cols-2 gap-x-4 gap-y-2 text-[#5f8096] 2xl:flex 2xl:flex-none 2xl:items-center 2xl:gap-5">
            <Link
              href={`/dashboard/admin/activities-library/${activity.id}`}
              className="inline-flex items-center gap-1.5 font-manrope text-sm leading-5.5 hover:text-[#27898a] transition-colors"
            >
              <Eye aria-hidden="true" size={15} strokeWidth={1.5} />
              View
            </Link>
            <Link
              href={`/dashboard/admin/activities-library/${activity.id}/edit`}
              className="inline-flex items-center gap-1.5 font-manrope text-sm leading-5.5 hover:text-[#27898a] transition-colors"
            >
              <PencilLine aria-hidden="true" size={15} strokeWidth={1.5} />
              Edit
            </Link>
            <button
              type="button"
              onClick={() => onDuplicate?.(activity)}
              className="inline-flex items-center gap-1.5 font-manrope text-sm leading-5.5 hover:text-[#27898a] transition-colors"
            >
              <Copy aria-hidden="true" size={15} strokeWidth={1.5} />
              Duplicate
            </button>
            <button
              type="button"
              disabled={isArchiving}
              onClick={() => (isArchived ? onPublish?.(activity) : onArchive?.(activity))}
              className="inline-flex items-center gap-1.5 font-manrope text-sm leading-5.5 hover:text-[#27898a] transition-colors disabled:opacity-50"
            >
              {isArchiving ? (
                <Loader2 aria-hidden="true" size={15} className="animate-spin text-[#27898a]" />
              ) : (
                <Archive aria-hidden="true" size={15} strokeWidth={1.5} />
              )}
              {isArchived ? 'Publish' : 'Archive'}
            </button>
          </div>
          <button
            type="button"
            aria-label={`Delete ${activity.title}`}
            disabled={isDeleting}
            onClick={() => onDelete?.(activity)}
            className="ml-3 flex size-8 shrink-0 items-center justify-center text-[#fb6464] hover:text-[#d32f2f] transition-colors disabled:opacity-50 2xl:ml-auto 2xl:size-auto"
          >
            {isDeleting ? (
              <Loader2 aria-hidden="true" size={15} className="animate-spin text-[#fb6464]" />
            ) : (
              <Trash2 aria-hidden="true" size={15} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
