'use client';

import {
  ArrowLeft,
  Bookmark,
  Check,
  Clock3,
  Download,
  FileDown,
  Loader2,
  Share2,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useActivities } from '@/features/activities/hooks/activities.queries';
import { formatAgeRange } from '@/features/activities/model/activity.mapper';
import {
  BACKEND_TO_UI_RESOURCE_TYPE,
  parentResourceKeys,
  toggleParentResourceFavorite,
  useParentResource,
  useParentResourceFavorites,
  useParentResources,
  type ParentResource,
  type ResourceAttachment,
} from '@/features/parent-resources';
import { cn } from '@/lib/utils';
import { useSession } from '@/services/api/auth/auth.queries';

const staticMilestones = [
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

const staticRelatedActivities = [
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

function FormattedContent({ content }: { content: string }) {
  const blocks = useMemo(() => {
    return content
      .split(/\n\s*\n/)
      .map((b) => b.trim())
      .filter(Boolean);
  }, [content]);

  return (
    <div className="flex flex-col gap-6 text-[#263238]">
      {blocks.map((block, index) => {
        if (block.startsWith('### ')) {
          return (
            <h3 key={index} className="pt-2 font-nunito text-xl font-bold leading-7 text-[#174A4D]">
              {block.replace(/^###\s+/, '')}
            </h3>
          );
        }
        if (block.startsWith('## ')) {
          return (
            <h2
              key={index}
              className="pt-4 font-nunito text-2xl font-bold leading-8 text-[#174A4D]"
            >
              {block.replace(/^##\s+/, '')}
            </h2>
          );
        }
        if (block.startsWith('# ')) {
          return (
            <h2
              key={index}
              className="pt-6 font-nunito text-3xl font-bold leading-9 text-[#174A4D]"
            >
              {block.replace(/^#\s+/, '')}
            </h2>
          );
        }
        if (block.startsWith('> ')) {
          return (
            <blockquote
              key={index}
              className="my-2 rounded-r-2xl border-l-4 border-[#2F7D7E] bg-[#F4F9F8] p-4 pl-6"
            >
              <p className="font-lora text-lg italic leading-relaxed text-[#174A4D]">
                {block.replace(/^>\s+/, '')}
              </p>
            </blockquote>
          );
        }
        if (block.startsWith('- ') || block.startsWith('* ')) {
          const items = block
            .split('\n')
            .map((item) => item.replace(/^[-*]\s+/, '').trim())
            .filter(Boolean);

          return (
            <ul key={index} className="flex flex-col gap-2 pl-4">
              {items.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 font-manrope text-base leading-7 text-[#263238]"
                >
                  <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[#2F7D7E]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p
            key={index}
            className="font-manrope text-base leading-7 text-[#263238] whitespace-pre-line"
          >
            {block}
          </p>
        );
      })}
    </div>
  );
}

type ParentResourceDetailProps = {
  resourceId?: string;
  dashboard?: boolean;
};

export function ParentResourceDetail({ resourceId, dashboard = false }: ParentResourceDetailProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const isAuthenticated = Boolean(session?.user);

  const Root = dashboard ? 'div' : 'main';
  const exploreHref = dashboard ? '/dashboard/explore?tab=parent-resources' : '/explore';

  const isDynamic = Boolean(resourceId && resourceId !== 'developmental-milestones');

  const {
    data: resource,
    isLoading,
    isError,
  } = useParentResource(isDynamic ? resourceId : undefined);

  // Favorites logic
  const favoritesQuery = useParentResourceFavorites({
    enabled: isAuthenticated && isDynamic,
  });
  const isFavoritedFromQuery = favoritesQuery.data?.resourceIds?.includes(resource?.id ?? '');
  const [isSavedOverride, setIsSavedOverride] = useState<boolean | null>(null);
  const isSaved =
    isSavedOverride !== null
      ? isSavedOverride
      : Boolean(isFavoritedFromQuery || resource?.isFavorited);

  const toggleFavoriteMutation = useMutation({
    mutationFn: toggleParentResourceFavorite,
    onMutate: async () => {
      const nextSaved = !isSaved;
      setIsSavedOverride(nextSaved);
      return { previousSaved: isSaved };
    },
    onSuccess: (result) => {
      if (result.status === 'favorited') {
        toast.success('Saved to your favorites.');
      } else {
        toast.success('Removed from favorites.');
      }
    },
    onError: (_err, _id, context) => {
      if (context) setIsSavedOverride(context.previousSaved);
      toast.error('Failed to update favorite.');
    },
    onSettled: () => {
      void queryClient.invalidateQueries({
        queryKey: [...parentResourceKeys.all, 'favorites'],
      });
    },
  });

  const handleToggleFavorite = () => {
    if (!isAuthenticated) {
      toast.info('Please log in to save favorites.');
      router.push('/login');
      return;
    }
    if (!resource?.id) return;
    toggleFavoriteMutation.mutate(resource.id);
  };

  const [hasCopied, setHasCopied] = useState(false);
  const handleShare = async () => {
    try {
      if (typeof window !== 'undefined') {
        await navigator.clipboard.writeText(window.location.href);
        setHasCopied(true);
        toast.success('Link copied to clipboard!');
        setTimeout(() => setHasCopied(false), 2000);
      }
    } catch {
      toast.error('Could not copy link.');
    }
  };

  // Related activities query
  const allActivitiesQuery = useActivities(
    { status: 'PUBLISHED', limit: 20 },
    { enabled: isDynamic }
  );
  const publishedActivities = useMemo(() => {
    return (allActivitiesQuery.data?.data ?? []).filter((a) => a.status === 'PUBLISHED');
  }, [allActivitiesQuery.data?.data]);

  const relatedActivities = useMemo(() => {
    if (!resource) return [];
    const relatedIds = new Set(resource.relatedActivitiesIds ?? []);

    // 1. Explicitly linked activities
    const explicit = publishedActivities.filter((a) => relatedIds.has(a.id));
    if (explicit.length >= 3) return explicit.slice(0, 3);

    // 2. Activities in same category
    const catLower = resource.category?.toLowerCase() || '';
    const sameCategory = publishedActivities.filter(
      (a) => !relatedIds.has(a.id) && a.developmentCategory?.toLowerCase().includes(catLower)
    );

    // 3. Fallback remaining published activities
    const combined = [...explicit, ...sameCategory];
    const combinedIds = new Set(combined.map((a) => a.id));
    const remaining = publishedActivities.filter((a) => !combinedIds.has(a.id));

    return [...combined, ...remaining].slice(0, 3);
  }, [publishedActivities, resource]);

  // Other related parent resources
  const otherResourcesQuery = useParentResources(
    { status: 'PUBLISHED', limit: 6 },
    { enabled: isDynamic }
  );
  const relatedParentResources = useMemo(() => {
    if (!resource) return [];
    const all = (otherResourcesQuery.data?.data ?? []) as ParentResource[];
    return all.filter((r) => r.id !== resource.id && r.status === 'PUBLISHED').slice(0, 2);
  }, [otherResourcesQuery.data?.data, resource]);

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
    const typeLabel = BACKEND_TO_UI_RESOURCE_TYPE[resource.resourceType] || resource.resourceType;

    return (
      <Root className={cn('text-[#263238]', !dashboard && 'bg-[#FDFDFC]')}>
        <div
          className={cn(
            'mx-auto flex w-full max-w-311 min-w-0 flex-col',
            dashboard
              ? 'gap-10 pb-12 sm:gap-12 2xl:gap-15'
              : 'gap-12 px-20 pt-40 pb-20 max-xl:px-8 max-lg:pt-36 max-md:gap-8 max-md:px-5 max-md:pt-36 max-md:pb-12'
          )}
        >
          {/* Breadcrumbs & Navigation */}
          <section className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <nav
                aria-label="Breadcrumb"
                className="flex flex-wrap items-center gap-2 font-nunito text-base font-medium text-[#7d8488] sm:text-lg"
              >
                <Link href={exploreHref} className="text-[#2F7D7E] hover:underline">
                  Explore
                </Link>
                <span className="font-manrope text-sm text-[#D8DDD9]">/</span>
                <Link href={exploreHref} className="text-[#2F7D7E] hover:underline">
                  Parent Resources
                </Link>
                <span className="font-manrope text-sm text-[#D8DDD9]">/</span>
                <span className="max-w-72 truncate font-semibold text-[#263238] sm:max-w-md">
                  {resource.title}
                </span>
              </nav>

              {/* Action buttons (Bookmark & Share) */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#D8DDD9] bg-white px-3.5 py-1.5 font-manrope text-xs font-semibold text-[#607077] shadow-xs transition-colors hover:bg-[#F7FAFA]"
                  title="Share resource"
                >
                  {hasCopied ? (
                    <Check aria-hidden="true" size={14} className="text-[#2F7D7E]" />
                  ) : (
                    <Share2 aria-hidden="true" size={14} />
                  )}
                  <span>{hasCopied ? 'Copied' : 'Share'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleToggleFavorite}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 font-manrope text-xs font-semibold shadow-xs transition-colors',
                    isSaved
                      ? 'border-[#2F7D7E] bg-[#DCEEEE] text-[#174A4D]'
                      : 'border-[#D8DDD9] bg-white text-[#607077] hover:bg-[#F7FAFA]'
                  )}
                  title={isSaved ? 'Remove from saved' : 'Save resource'}
                >
                  <Bookmark
                    aria-hidden="true"
                    size={14}
                    className={isSaved ? 'fill-[#2F7D7E] text-[#2F7D7E]' : ''}
                  />
                  <span>{isSaved ? 'Saved' : 'Save'}</span>
                </button>
              </div>
            </div>

            {/* Cover Image */}
            <div className="relative h-64 overflow-hidden rounded-2xl bg-[#DCEEEE] shadow-xs sm:h-80 md:h-105">
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

          {/* Title, Metadata, and Author */}
          <section className="flex flex-col gap-6">
            <div className="border-b border-[#E0E7E6] pb-8">
              <h1 className="font-nunito text-[32px] font-bold leading-10 tracking-[-0.4px] text-[#174A4D] sm:text-4xl sm:leading-11 md:text-[42px] md:leading-12.5">
                {resource.title}
              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                {resource.category && (
                  <span className="rounded-full bg-[#E0F0E9] px-3 py-1 font-nunito text-xs font-semibold text-[#16643B]">
                    {resource.category}
                  </span>
                )}
                <span className="rounded-full bg-[#DCEEEE] px-3 py-1 font-nunito text-xs font-semibold text-[#174A4D]">
                  {typeLabel}
                </span>
                {resource.estimatedReadTime && (
                  <span className="flex items-center gap-1.5 rounded-full border border-[#D8DDD9] bg-white px-3 py-1 font-manrope text-xs font-medium text-[#607077]">
                    <Clock3 className="size-3 text-[#2F7D7E]" />
                    {resource.estimatedReadTime}
                  </span>
                )}
              </div>

              <div className="mt-6 flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-[#2F7D7E] font-nunito text-sm font-bold text-white shadow-xs">
                  {(resource.author || 'J')[0]?.toUpperCase()}
                </span>
                <div>
                  <p className="font-manrope text-sm font-bold text-[#263238]">
                    {resource.author || 'Jaicy, Licensed Pediatric Occupational Therapist'}
                  </p>
                  <p className="font-manrope text-xs text-[#7D8488]">
                    Occupational Therapy & Child Development Specialist
                  </p>
                </div>
              </div>
            </div>

            {/* Lead Summary */}
            {resource.summary && (
              <div className="rounded-2xl bg-[#F6FAF8] border border-[#E0EBE6] p-6 sm:p-7">
                <p className="font-nunito text-lg font-medium leading-7 text-[#174A4D] sm:text-xl sm:leading-8">
                  {resource.summary}
                </p>
              </div>
            )}
          </section>

          {/* Formatted Content */}
          {resource.content && (
            <section className="flex flex-col gap-4">
              <FormattedContent content={resource.content} />
            </section>
          )}

          {/* Downloadable Attachments */}
          {attachments.length > 0 && (
            <section className="flex flex-col gap-4 rounded-2xl border border-[#D8DDD9] bg-[#F7FAFA] p-6 sm:p-8">
              <div>
                <h2 className="font-nunito text-xl font-bold leading-7 text-[#174A4D]">
                  Downloadable Materials ({attachments.length})
                </h2>
                <p className="mt-1 font-manrope text-xs text-[#607077] sm:text-sm">
                  Therapist-created printables, guides, and reference sheets included with this
                  resource.
                </p>
              </div>
              <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {attachments.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-3 rounded-xl border border-[#E0E7E6] bg-white p-4 shadow-xs transition-colors hover:border-[#2F7D7E]/50"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[rgba(47,125,126,0.1)] text-[#2F7D7E]">
                        <FileDown aria-hidden="true" size={20} strokeWidth={1.8} />
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
                      download
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

          {/* Membership CTA Banner */}
          <section className="flex flex-col gap-8">
            <div className="flex items-center justify-between gap-6 rounded-2xl border border-[#D8DDD9] bg-[#DCEEEE] p-6 sm:p-7 max-md:flex-col max-md:items-start">
              <div>
                <h2 className="font-nunito text-lg font-bold leading-6 text-[#174A4D] sm:text-xl">
                  {dashboard
                    ? 'Need personalized OT guidance for your child?'
                    : 'Want a personalized plan built around your child?'}
                </h2>
                <p className="pt-1 font-manrope text-sm font-medium leading-5.5 text-[#607077]">
                  {dashboard
                    ? 'Explore membership tiers to get tailored clinical roadmaps, consults, and custom home programs.'
                    : 'Explore membership and get personalized activity plans and developmental guides from our OT team.'}
                </p>
              </div>
              <Link
                href={dashboard ? '/dashboard/membership' : '/register'}
                className="shrink-0 rounded-full bg-[#2F7D7E] px-6 py-2.5 font-nunito text-base font-semibold leading-6 text-white transition-colors hover:bg-[#276a6b] max-sm:w-full max-sm:text-center"
              >
                {dashboard ? 'View Membership' : 'Explore Membership'}
              </Link>
            </div>
          </section>

          {/* Related Activities */}
          {relatedActivities.length > 0 && (
            <section className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <h2 className="font-nunito text-xl font-bold leading-7 text-[#174A4D] sm:text-2xl sm:leading-8">
                  Related Activities
                </h2>
                <p className="font-manrope text-sm text-[#607077]">
                  Hands-on activities designed to put this guidance into playful practice at home.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {relatedActivities.map((relActivity) => {
                  const itemHref = dashboard
                    ? `/dashboard/explore/activities/${relActivity.id}`
                    : `/explore/activities/${relActivity.id}`;
                  const relImageSrc =
                    relActivity.featuredImageUrl ||
                    '/images/admin/activities/stacking-sorting-challenge.png';

                  return (
                    <Link
                      href={itemHref}
                      key={relActivity.id}
                      className="group flex flex-col overflow-hidden rounded-2xl border border-[#E8EBE8] bg-white shadow-[0px_1px_2px_rgba(38,50,56,0.05)] transition-all hover:shadow-[0px_4px_16px_rgba(38,50,56,0.12)] hover:-translate-y-0.5"
                    >
                      <div className="relative h-44 w-full bg-[#DCEEEE] overflow-hidden">
                        <Image
                          src={relImageSrc}
                          alt={relActivity.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(min-width: 1280px) 340px, (min-width: 640px) 50vw, 100vw"
                          unoptimized={Boolean(
                            relImageSrc.startsWith('http') || relImageSrc.startsWith('/uploads')
                          )}
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between p-4">
                        <div>
                          <h3 className="font-nunito text-base font-semibold leading-6 text-[#263238] line-clamp-1 transition-colors group-hover:text-[#2F7D7E]">
                            {relActivity.title}
                          </h3>
                          <p className="mt-1 line-clamp-2 font-manrope text-xs leading-4.5 text-[#515B60]">
                            {relActivity.shortDescription}
                          </p>
                        </div>
                        <div className="mt-3 flex flex-wrap items-center gap-1.5">
                          <span className="rounded-full bg-[#DCEEEE] px-2.5 py-0.5 font-nunito text-xs leading-4 text-[#174A4D]">
                            {formatAgeRange(relActivity.minAgeMonths, relActivity.maxAgeMonths)}
                          </span>
                          <span className="rounded-full bg-[#DCEEEE] px-2.5 py-0.5 font-nunito text-xs leading-4 text-[#174A4D]">
                            {relActivity.developmentCategory}
                          </span>
                          {relActivity.estimatedDuration && (
                            <span className="flex items-center gap-1 px-1 font-nunito text-xs leading-4 text-[#607077]">
                              <Clock3 className="size-3" />
                              {relActivity.estimatedDuration}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* Related Parent Resources */}
          {relatedParentResources.length > 0 && (
            <section className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <h2 className="font-nunito text-xl font-bold leading-7 text-[#174A4D] sm:text-2xl sm:leading-8">
                  More Parent Resources
                </h2>
                <p className="font-manrope text-sm text-[#607077]">
                  Explore complementary articles, guides, and toolkits.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {relatedParentResources.map((relRes) => {
                  const itemHref = dashboard
                    ? `/dashboard/explore/parent-resources/${relRes.id}`
                    : `/explore/parent-resources/${relRes.id}`;
                  const relCover = relRes.coverImageUrl || '/figma/explore/resource-parent.png';

                  return (
                    <Link
                      href={itemHref}
                      key={relRes.id}
                      className="group flex flex-col sm:flex-row overflow-hidden rounded-2xl border border-[#E8EBE8] bg-white shadow-[0px_1px_2px_rgba(38,50,56,0.05)] transition-all hover:shadow-[0px_4px_16px_rgba(38,50,56,0.12)] hover:-translate-y-0.5"
                    >
                      <div className="relative h-40 w-full sm:w-48 shrink-0 bg-[#DCEEEE] overflow-hidden">
                        <Image
                          src={relCover}
                          alt={relRes.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(min-width: 640px) 192px, 100vw"
                          unoptimized={Boolean(
                            relCover.startsWith('http') || relCover.startsWith('/uploads')
                          )}
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between p-4">
                        <div>
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <span className="rounded-full bg-[#E0F0E9] px-2 py-0.5 font-nunito text-[10px] font-semibold text-[#16643B]">
                              {BACKEND_TO_UI_RESOURCE_TYPE[relRes.resourceType] ||
                                relRes.resourceType}
                            </span>
                            {relRes.category && (
                              <span className="rounded-full bg-[#DCEEEE] px-2 py-0.5 font-nunito text-[10px] font-semibold text-[#174A4D]">
                                {relRes.category}
                              </span>
                            )}
                          </div>
                          <h3 className="font-nunito text-base font-bold leading-6 text-[#263238] line-clamp-2 transition-colors group-hover:text-[#2F7D7E]">
                            {relRes.title}
                          </h3>
                          <p className="mt-1 line-clamp-2 font-manrope text-xs leading-4.5 text-[#515B60]">
                            {relRes.summary}
                          </p>
                        </div>
                        {relRes.estimatedReadTime && (
                          <div className="mt-3 flex items-center gap-1 font-manrope text-xs text-[#7D8488]">
                            <Clock3 className="size-3 text-[#2F7D7E]" />
                            {relRes.estimatedReadTime}
                          </div>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </Root>
    );
  }

  // Fallback static milestone page for developmental-milestones
  const activityHref = dashboard
    ? '/dashboard/explore/activities/bubble-wrap-stomp-counting'
    : '/explore/activities/bubble-wrap-stomp-counting';

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
          {staticMilestones.map(([title, body]) => (
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
              {staticRelatedActivities.map(([title, age, skill, image]) => (
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
