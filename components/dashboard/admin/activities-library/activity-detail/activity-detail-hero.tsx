import Image from 'next/image';
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

export function ActivityDetailHero({ activity }: { activity: Activity }) {
  const isPublished = activity.status === 'PUBLISHED';
  const isDraft = activity.status === 'DRAFT';

  const imageSrc =
    activity.featuredImageUrl || '/images/admin/activities/stacking-sorting-challenge.png';

  const materialsText =
    activity.materialsSummary ||
    (Array.isArray(activity.materialsNeeded) && activity.materialsNeeded.length > 0
      ? `${activity.materialsNeeded.length} ${activity.materialsNeeded.length === 1 ? 'item' : 'items'} required`
      : 'None required');

  const otDesignedText =
    activity.otDesigned || (activity.isOtDesigned ? 'Therapist-approved' : 'OT Designed');

  return (
    <section className="min-w-0 rounded-2xl border border-[#e8ebe8] bg-white p-4 shadow-[0_1px_1px_rgba(0,0,0,0.05)] sm:p-6 2xl:p-8">
      <div className="relative h-64 overflow-hidden rounded-2xl bg-[#d2e3dc] sm:h-90 2xl:h-119.25">
        <Image
          src={imageSrc}
          alt={activity.title}
          fill
          priority
          unoptimized={Boolean(
            activity.featuredImageUrl?.startsWith('http') ||
            activity.featuredImageUrl?.startsWith('/uploads')
          )}
          sizes="(min-width: 768px) 999px, 100vw"
          className="object-cover object-center"
        />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2.5">
          <span className="rounded-full border border-[#e9f1ee] bg-[#e0f0e9] px-2.5 py-1.5 font-nunito text-xs font-medium leading-4 text-[#263238]">
            {getDifficultyLabel(activity.difficultyLevel)}
          </span>
          <span className="rounded-full border border-[#e9f1ee] bg-[#e0f0e9] px-2.5 py-1.5 font-nunito text-xs font-medium leading-4 text-[#263238]">
            {activity.developmentCategory}
          </span>
          <span className="rounded-full border border-[#e9f1ee] bg-white px-2.5 py-1.5 font-nunito text-xs font-medium leading-4 text-[#263238]">
            {formatAgeRange(activity.minAgeMonths, activity.maxAgeMonths)}
          </span>
        </div>
        <div className="absolute right-4 top-4">
          <span
            className={`rounded-full px-3 py-1 font-manrope text-xs font-semibold leading-4 ${
              isPublished
                ? 'bg-white text-[#007b75] shadow-xs'
                : isDraft
                  ? 'border border-[#fef3c7] bg-[#fffbeb] text-[#b45309]'
                  : 'border border-[#e5e7eb] bg-[#f3f4f6] text-[#6b7280]'
            }`}
          >
            {isPublished ? 'Published' : isDraft ? 'Draft' : 'Archived'}
          </span>
        </div>
      </div>
      <div className="mt-8">
        <div className="max-w-180">
          <h1 className="font-nunito text-2xl font-medium leading-8 tracking-[-0.16px] text-[#263238] sm:text-[28px] sm:leading-10 2xl:text-[32px]">
            {activity.title}
          </h1>
          <p className="mt-3 max-w-146 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#515b60]">
            {activity.shortDescription}
          </p>
        </div>
        <dl className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-8 2xl:grid-cols-4">
          <div>
            <dt className="font-nunito text-xs font-medium uppercase leading-4 text-[#7d8488]">
              Duration
            </dt>
            <dd className="mt-1 font-manrope text-base leading-6 tracking-[-0.176px] text-[#263238]">
              {activity.estimatedDuration || '15 min'}
            </dd>
          </div>
          <div>
            <dt className="font-nunito text-xs font-medium uppercase leading-4 text-[#7d8488]">
              Materials
            </dt>
            <dd className="mt-1 font-manrope text-base leading-6 tracking-[-0.176px] text-[#263238]">
              {materialsText}
            </dd>
          </div>
          <div>
            <dt className="font-nunito text-xs font-medium uppercase leading-4 text-[#7d8488]">
              Development Goal
            </dt>
            <dd className="mt-1 font-manrope text-base leading-6 tracking-[-0.176px] text-[#263238]">
              {activity.developmentGoal || 'General development'}
            </dd>
          </div>
          <div>
            <dt className="font-nunito text-xs font-medium uppercase leading-4 text-[#7d8488]">
              OT Designed
            </dt>
            <dd className="mt-1 font-manrope text-base leading-6 tracking-[-0.176px] text-[#263238]">
              {otDesignedText}
            </dd>
          </div>
        </dl>
        {activity.learningObjective ? (
          <section className="mt-8 sm:mt-10 2xl:mt-12">
            <h2 className="font-nunito text-xl font-medium leading-7 text-[#263238]">
              Learning Objective
            </h2>
            <p className="mt-3 max-w-146 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#515b60]">
              {activity.learningObjective}
            </p>
          </section>
        ) : null}
      </div>
    </section>
  );
}
