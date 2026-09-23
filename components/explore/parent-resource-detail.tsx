'use client';

import { ArrowLeft, Clock3, Download, FileText, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import {
  BACKEND_TO_UI_RESOURCE_TYPE,
  useParentResource,
  type ResourceAttachment,
} from '@/features/parent-resources';

const milestones = [
  [
    '0–12 months: The sensory and motor foundation',
    'The first year is dominated by sensorimotor development — learning to use the body and interpret the world through sensory experience. Key milestones include head control (by 4 months), reaching and grasping (4–6 months), sitting without support (6–8 months), and pulling to stand (9–12 months).',
  ],
  [
    '12–24 months: Toddler motor and language explosion',
    'Walking typically emerges between 9 and 15 months, with running and stair-climbing following close behind. Fine motor skills advance from whole-hand grasping to a more refined pincer grasp. Language and social milestones accelerate: first words, pointing to share interest, simple back-and-forth communication.',
  ],
  [
    '2–3 years: Skill building and independence',
    'This is the age of rapidly expanding independence. Children typically develop the ability to use utensils, undress themselves, kick and throw a ball with some direction, and engage in simple pretend play. Fine motor skills advance toward early scribbling and mark-making.',
  ],
  [
    '4–6 years: School readiness and refinement',
    'Fine motor precision accelerates dramatically in this window — cutting with scissors, drawing recognizable shapes, dressing and undressing independently, and beginning to write letters. Gross motor skills include skipping, pumping a swing, and navigating playground equipment with increasing confidence.',
  ],
] as const;

const relatedActivities = [
  ['Obstacle Course Adventure', '3–5 yr', 'Gross Motor', '/Home/activity-obstacle-course.png'],
  ['Tong Transfer Challenge', '3–6 yr', 'Fine Motor', '/Home/activity-tong-transfer.png'],
  ['Bilateral Drawing Rainbows', '3–5 yr', 'Visual-Motor', '/Home/activity-bilateral-drawing.png'],
] as const;

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-[#DCEEEE] px-2 py-0.5 font-manrope text-xs font-semibold leading-4 text-[#174A4D]">
      {children}
    </span>
  );
}

function formatFileSize(bytes?: number) {
  if (!bytes) return '0 KB';
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

type ParentResourceDetailProps = {
  resourceId?: string;
  dashboard?: boolean;
};

export function ParentResourceDetail({ resourceId, dashboard = false }: ParentResourceDetailProps) {
  const Root = dashboard ? 'div' : 'main';
  const exploreHref = dashboard ? '/dashboard/explore?tab=parent-resources' : '/explore';
  const activityHref = dashboard
    ? '/dashboard/explore/activities/bubble-wrap-stomp-counting'
    : '/explore/activities/bubble-wrap-stomp-counting';

  const isDynamic = Boolean(resourceId && resourceId !== 'developmental-milestones');
  const {
    data: resource,
    isLoading,
    isError,
  } = useParentResource(isDynamic ? resourceId : undefined);

  if (isDynamic) {
    if (isLoading) {
      return (
        <Root
          className={cn('text-[#263238]', !dashboard && 'bg-[#FDFDFC] pt-32 pb-20 px-4 sm:px-8')}
        >
          <div className="mx-auto flex w-full max-w-311 min-w-0 flex-col gap-10 pb-12">
            <div className="flex items-center gap-2 font-manrope text-sm text-[#7d8488]">
              <Link
                href={exploreHref}
                className="inline-flex items-center gap-1 text-[#2f7d7e] hover:underline"
              >
                <ArrowLeft aria-hidden="true" size={15} strokeWidth={1.5} />
                Parent Resources
              </Link>
              <span className="text-[#d8ddd9]">/</span>
              <span>Loading resource...</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-3 py-24 text-[#515b60]">
              <Loader2 className="size-8 animate-spin text-[#2f7d7e]" />
              <p className="font-manrope text-sm">Loading parent resource details...</p>
            </div>
          </div>
        </Root>
      );
    }

    if (isError || !resource || resource.status !== 'PUBLISHED') {
      return (
        <Root
          className={cn('text-[#263238]', !dashboard && 'bg-[#FDFDFC] pt-32 pb-20 px-4 sm:px-8')}
        >
          <div className="mx-auto flex w-full max-w-311 min-w-0 flex-col gap-10 pb-12">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-2 font-manrope text-sm leading-5.5 tracking-[-0.084px]"
            >
              <Link
                href={exploreHref}
                className="inline-flex items-center gap-1 text-[#2f7d7e] hover:underline"
              >
                <ArrowLeft aria-hidden="true" size={15} strokeWidth={1.5} />
                Parent Resources
              </Link>
              <span className="text-lg leading-5 text-[#d8ddd9]">/</span>
              <span className="text-[#263238]">Not Found</span>
            </nav>
            <div className="rounded-2xl border border-[#e8ebe8] bg-white p-12 text-center shadow-xs">
              <h2 className="font-nunito text-xl font-semibold text-[#263238]">
                Parent Resource Not Found
              </h2>
              <p className="mt-2 font-manrope text-sm text-[#7d8488]">
                The parent resource you are looking for is not published or does not exist.
              </p>
              <Link
                href={exploreHref}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#2f7d7e] px-5 py-2.5 font-manrope text-sm font-medium text-white transition-colors hover:bg-[#276a6b]"
              >
                <ArrowLeft aria-hidden="true" size={16} />
                Back to Parent Resources
              </Link>
            </div>
          </div>
        </Root>
      );
    }

    const coverSrc = resource.coverImageUrl || '/figma/explore/resource-parent.png';
    const isUnoptimized = Boolean(coverSrc.startsWith('http') || coverSrc.startsWith('/uploads'));
    const attachments = (resource.attachments as ResourceAttachment[] | null) ?? [];

    return (
      <Root className={cn('text-[#263238]', !dashboard && 'bg-[#FDFDFC]')}>
        <div
          className={cn(
            'mx-auto flex w-full max-w-311 min-w-0 flex-col',
            dashboard
              ? 'gap-10 pb-12 sm:gap-12 2xl:gap-15'
              : 'gap-15 px-20 pt-40 pb-20 max-xl:px-8 max-lg:pt-36 max-md:gap-10 max-md:px-5 max-md:pt-36 max-md:pb-12'
          )}
        >
          <section className="flex flex-col gap-8">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-1.5 font-nunito text-2xl font-medium leading-8 max-md:text-lg max-sm:text-base max-sm:leading-6"
            >
              <Link href={exploreHref} className="text-[#2F7D7E] hover:underline">
                Explore
              </Link>
              <span className="font-manrope text-lg text-[#D8DDD9]">/</span>
              <Link href={exploreHref} className="text-[#2F7D7E] hover:underline">
                Parent Resources
              </Link>
              <span className="font-manrope text-lg text-[#D8DDD9]">/</span>
              <span className="truncate">{resource.title}</span>
            </nav>
            <div className="relative h-60 overflow-hidden rounded-2xl bg-[#DCEEEE] sm:h-80 md:h-101.25">
              <Image
                src={coverSrc}
                alt={resource.title}
                fill
                priority
                unoptimized={isUnoptimized}
                className="object-cover"
                sizes="(min-width: 1280px) 1244px, 100vw"
              />
            </div>
          </section>

          <section className="flex flex-col gap-8">
            <div className="border-b border-[#ADB1AE] pb-6">
              <h1 className="font-nunito text-[40px] font-bold leading-12 tracking-[-0.4px] text-[#174A4D] max-md:text-[32px] max-md:leading-10 max-sm:text-3xl max-sm:leading-9">
                {resource.title}
              </h1>
              <div className="mt-6 flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-1.25">
                  {resource.category && (
                    <span className="rounded-full border border-[#DCEEEE] bg-[#E0F0E9] px-2.25 py-1.75 font-nunito text-xs font-medium leading-4 text-[#174A4D]">
                      {resource.category}
                    </span>
                  )}
                  <span className="rounded-full border border-[#DCEEEE] px-2.25 py-1.75 font-nunito text-xs font-medium leading-4 text-[#174A4D]">
                    {BACKEND_TO_UI_RESOURCE_TYPE[resource.resourceType] || resource.resourceType}
                  </span>
                  {resource.estimatedReadTime && (
                    <span className="flex items-center gap-1 px-2 py-1.5 font-manrope text-xs leading-4.5 text-[#607077]">
                      <Clock3 className="size-3" />
                      {resource.estimatedReadTime}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-full bg-[#2F7D7E] font-nunito text-sm font-bold leading-5 text-white">
                    {(resource.author || 'J')[0]?.toUpperCase()}
                  </span>
                  <span className="min-w-0 font-manrope text-sm font-semibold leading-5">
                    By {resource.author || 'Jaicy, Licensed Pediatric Occupational Therapist'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <p className="font-nunito text-lg font-medium leading-6 tracking-[-0.27px] text-[#263238]">
                {resource.summary}
              </p>
            </div>
          </section>

          {resource.content && (
            <section className="flex flex-col gap-4">
              <div className="whitespace-pre-wrap font-manrope text-base leading-7 text-[#263238]">
                {resource.content}
              </div>
            </section>
          )}

          {attachments.length > 0 && (
            <section className="rounded-2xl border border-[#D8DDD9] bg-white p-6 shadow-xs">
              <h2 className="font-nunito text-xl font-bold leading-7 text-[#174A4D]">
                Downloadable Attachments ({attachments.length})
              </h2>
              <div className="mt-4 divide-y divide-[#E7ECEB]">
                {attachments.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[rgba(47,125,126,0.08)] text-[#2f7d7e]">
                        <FileText aria-hidden="true" size={18} strokeWidth={1.7} />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-manrope text-sm font-semibold text-[#263238]">
                          {file.name}
                        </p>
                        <p className="font-manrope text-xs text-[#607d8b]">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#2F7D7E] px-4 py-2 font-manrope text-xs font-semibold text-white transition-colors hover:bg-[#276a6b]"
                    >
                      <Download aria-hidden="true" size={14} strokeWidth={1.7} />
                      Download
                    </a>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="flex flex-col gap-8">
            <div className="flex items-center justify-between gap-6 rounded-2xl border border-[#D8DDD9] bg-[#DCEEEE] p-6.25 max-md:flex-col max-md:items-start">
              <div>
                <h2 className="font-nunito text-base font-bold leading-6 text-[#174A4D]">
                  Want a plan built around your child?
                </h2>
                <p className="pt-1 font-manrope text-sm font-medium leading-5.5 tracking-[0.084px] text-[#607077]">
                  Explore membership and get personalized activity plans from our OT team.
                </p>
              </div>
              <Link
                href="/register"
                className="shrink-0 rounded-full bg-[#2F7D7E] px-5 py-2.5 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-white max-sm:w-full max-sm:text-center"
              >
                Explore Membership
              </Link>
            </div>
          </section>
        </div>
      </Root>
    );
  }

  // Fallback static milestone page for developmental-milestones
  return (
    <Root className={cn('text-[#263238]', !dashboard && 'bg-[#FDFDFC]')}>
      <div
        className={cn(
          'mx-auto flex w-full max-w-311 min-w-0 flex-col',
          dashboard
            ? 'gap-10 pb-12 sm:gap-12 2xl:gap-15'
            : 'gap-15 px-20 pt-40 pb-20 max-xl:px-8 max-lg:pt-36 max-md:gap-10 max-md:px-5 max-md:pt-36 max-md:pb-12'
        )}
      >
        <section className="flex flex-col gap-8">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 font-nunito text-2xl font-medium leading-8 max-md:text-lg max-sm:text-base max-sm:leading-6"
          >
            <Link href={exploreHref} className="text-[#2F7D7E] hover:underline">
              Explore
            </Link>
            <span className="font-manrope text-lg text-[#D8DDD9]">/</span>
            <Link href={exploreHref} className="text-[#2F7D7E] hover:underline">
              Parent Resources
            </Link>
            <span className="font-manrope text-lg text-[#D8DDD9]">/</span>
            <span>Developmental Milestones: What to Expect at Every Stage</span>
          </nav>
          <div className="relative h-60 overflow-hidden rounded-2xl bg-[#DCEEEE] sm:h-80 md:h-101.25">
            <Image
              src="/Home/activity-bubble-wrap-stomp.png"
              alt="Colourful toy numbers and vehicles"
              fill
              priority
              className="object-cover object-bottom"
              sizes="(min-width: 1280px) 1244px, 100vw"
            />
          </div>
        </section>

        <section className="flex flex-col gap-8">
          <div className="border-b border-[#ADB1AE] pb-6">
            <h1 className="font-nunito text-[40px] font-bold leading-12 tracking-[-0.4px] text-[#174A4D] max-md:text-[32px] max-md:leading-10 max-sm:text-3xl max-sm:leading-9">
              Developmental Milestones: What to Expect at Every Stage
            </h1>
            <div className="mt-6 flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-1.25">
                <span className="rounded-full border border-[#DCEEEE] bg-[#E0F0E9] px-2.25 py-1.75 font-nunito text-xs font-medium leading-4">
                  Sensory
                </span>
                <span className="rounded-full border border-[#DCEEEE] px-2.25 py-1.75 font-nunito text-xs font-medium leading-4">
                  Article
                </span>
                <span className="flex items-center gap-1 px-2 py-1.5 font-manrope text-xs leading-4.5 text-[#607077]">
                  <Clock3 className="size-3" />
                  12 minute read
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-full bg-[#2F7D7E] font-nunito text-sm font-bold leading-5 text-white">
                  J
                </span>
                <span className="min-w-0 font-manrope text-sm font-semibold leading-5">
                  By Jaicy, Licensed Pediatric Occupational Therapist
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <p className="font-nunito text-lg font-medium leading-6 tracking-[-0.27px]">
              Developmental milestones exist to give parents and clinicians a shared reference point
              — a way to notice when a child may benefit from additional support. They are not
              checklists for perfection, and they are not meant to cause alarm at every missed
              window. Children develop at their own pace, within ranges, and across multiple domains
              simultaneously.
            </p>
            <blockquote className="border-l-4 border-[#2F7D7E] py-2 pl-6">
              <p className="max-w-174 font-lora text-lg italic leading-[31.5px]">
                “A milestone is a signpost, not a deadline. Most children reach them — the timing
                just varies within a range that&apos;s often wider than parents expect.”
              </p>
            </blockquote>
          </div>
        </section>

        <section className="flex flex-col gap-8">
          {milestones.map(([title, body]) => (
            <article key={title} className="flex flex-col gap-4">
              <h2 className="font-nunito text-xl font-bold leading-7 text-[#174A4D]">{title}</h2>
              <p className="font-manrope text-base leading-6 tracking-[-0.176px]">{body}</p>
            </article>
          ))}
        </section>

        <section className="flex flex-col gap-8">
          <div className="flex items-center justify-between gap-6 rounded-2xl border border-[#D8DDD9] bg-[#DCEEEE] p-6.25 max-md:flex-col max-md:items-start">
            <div>
              <h2 className="font-nunito text-base font-bold leading-6 text-[#174A4D]">
                Want a plan built around your child?
              </h2>
              <p className="pt-1 font-manrope text-sm font-medium leading-5.5 tracking-[0.084px] text-[#607077]">
                Explore membership and get personalized activity plans from our OT team.
              </p>
            </div>
            <Link
              href="/register"
              className="shrink-0 rounded-full bg-[#2F7D7E] px-5 py-2.5 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-white max-sm:w-full max-sm:text-center"
            >
              Explore Membership
            </Link>
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="font-nunito text-xl font-bold leading-7">Related Activities</h2>
            <div
              className={cn(
                'grid grid-cols-1 gap-4 sm:grid-cols-2',
                dashboard ? '2xl:grid-cols-3' : 'xl:grid-cols-3'
              )}
            >
              {relatedActivities.map(([title, age, skill, image]) => (
                <Link
                  href={activityHref}
                  key={title}
                  className="h-61 overflow-hidden rounded-2xl border border-[#D8DDD9] bg-white shadow-[0px_2px_8px_rgba(38,50,56,0.06)]"
                >
                  <div className="relative h-32">
                    <Image
                      src={image}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(min-width: 1280px) 404px, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-nunito text-sm font-bold leading-[19.25px]">{title}</h3>
                    <div className="mt-1.5 flex gap-1">
                      <Chip>{age}</Chip>
                      <Chip>{skill}</Chip>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Root>
  );
}

export default ParentResourceDetail;
