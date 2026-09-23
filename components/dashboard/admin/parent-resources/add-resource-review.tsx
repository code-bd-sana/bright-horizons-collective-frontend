'use client';

import { useCreateParentResource, useResourceFormStore } from '@/features/parent-resources';
import { BookOpen, Clock3, Download, FileText } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { ResourceFormNavigation } from './resource-form-navigation';
import { ResourceFormStepper } from './resource-form-stepper';

export function AddResourceReview() {
  const router = useRouter();
  const {
    title,
    summary,
    category,
    resourceType,
    author,
    readingTime,
    coverImageUrl,
    content,
    attachments,
    membershipTier,
    getCreatePayload,
    resetForm,
  } = useResourceFormStore();

  const createResourceMutation = useCreateParentResource();
  const [savingStatus, setSavingStatus] = useState<'PUBLISHED' | 'DRAFT' | null>(null);

  async function handleSave(status: 'PUBLISHED' | 'DRAFT') {
    if (!title?.trim()) {
      toast.error('Please enter a resource title.');
      router.push('/dashboard/admin/parent-resources/add-resource');
      return;
    }

    if (!summary?.trim()) {
      toast.error('Please enter a summary for the resource.');
      router.push('/dashboard/admin/parent-resources/add-resource');
      return;
    }

    setSavingStatus(status);
    const payload = getCreatePayload();
    payload.status = status;

    try {
      await createResourceMutation.mutateAsync(payload);
      toast.success(
        status === 'PUBLISHED'
          ? `“${title}” has been added successfully!`
          : `“${title}” has been saved as draft!`
      );
      resetForm();
      router.push('/dashboard/admin/parent-resources');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to save resource.';
      toast.error(message);
    } finally {
      setSavingStatus(null);
    }
  }

  const tierBadgeLabels: Record<string, string> = {
    'little-steps': 'Little Steps (Free)',
    'grow-together': 'Grow Together',
    'personalized-pathways': 'Personalized Pathways',
  };

  return (
    <section className="mx-auto w-full min-w-0 max-w-231.5 pb-8 pt-6 text-[#263238] lg:pt-0 2xl:pt-0">
      <Link
        href="/dashboard/admin/parent-resources"
        className="inline-flex items-center gap-1.5 font-manrope text-sm font-medium leading-5 text-[#607d8b]"
      >
        <span aria-hidden="true">←</span>
        Back to Parent Resources
      </Link>

      <h1 className="mt-5 font-nunito text-2xl font-bold leading-9">Create Resource</h1>

      <div className="mt-5 overflow-x-auto rounded-2xl border border-[#e7eceb] bg-white p-4.25 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
        <ResourceFormStepper currentStep={7} />
      </div>

      <section className="mt-5 rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:p-5 2xl:p-6.25">
        <h2 className="font-nunito text-lg font-bold leading-6.75">7. Review &amp; Publish</h2>
        <p className="mt-5 font-manrope text-sm leading-5.25 text-[#607d8b]">
          Preview how this resource will appear in the Parent Dashboard. Verify all details before
          publishing.
        </p>

        <article className="mt-4 w-full max-w-215.25 overflow-hidden rounded-2xl border border-[#e7eceb] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
          {coverImageUrl ? (
            <div className="relative h-48 w-full overflow-hidden bg-slate-100 sm:h-64">
              <Image
                src={coverImageUrl}
                alt={title || 'Resource cover'}
                fill
                unoptimized
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex h-32 items-center justify-center bg-[rgba(47,125,126,0.09)]">
              <BookOpen aria-hidden="true" className="size-10 text-[#2f7d7e]" strokeWidth={1.5} />
            </div>
          )}

          <div className="p-4 sm:p-5 2xl:p-6">
            <div className="flex flex-wrap items-center gap-1.25">
              <span className="rounded-full border border-[#dceeee] bg-[#e0f0e9] px-2.25 py-1.75 font-nunito text-xs font-medium leading-4 text-[#263238]">
                {category || 'Uncategorized'}
              </span>
              <span className="rounded-full border border-[#dceeee] px-2.25 py-1.75 font-nunito text-xs font-medium leading-4 text-[#263238]">
                {resourceType || 'Article'}
              </span>
              {readingTime && (
                <span className="flex items-center gap-1 px-2 py-1.5 font-manrope text-xs leading-4.5 text-[#607077]">
                  <Clock3 aria-hidden="true" className="size-3" />
                  {readingTime}
                </span>
              )}
              <span className="ml-auto rounded-full bg-[#f4f8f6] px-2.5 py-1 font-manrope text-xs font-semibold text-[#2f7d7e]">
                {tierBadgeLabels[membershipTier] || 'Little Steps'}
              </span>
            </div>

            <div className="mt-4 flex items-start gap-3 sm:items-center 2xl:items-center">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#2f7d7e] font-nunito text-sm font-bold leading-5 text-white">
                {(author || 'S')[0]?.toUpperCase()}
              </span>
              <span className="font-manrope text-sm font-medium leading-5 text-[#263238]">
                {author || 'Sarah K.'}
              </span>
            </div>

            <h3 className="min-h-10.5 pt-3 font-nunito text-xl font-bold leading-7.5 text-[#263238]">
              {title || 'Untitled Resource'}
            </h3>

            {summary && (
              <div className="border-t border-[#e7eceb] pt-4">
                <p className="font-nunito text-base font-medium leading-6 text-[#455a64]">
                  {summary}
                </p>
              </div>
            )}

            {content ? (
              <div className="mt-6 border-t border-[#e7eceb] pt-5">
                <div className="prose max-w-none font-manrope text-base leading-relaxed text-[#263238] whitespace-pre-line">
                  {content}
                </div>
              </div>
            ) : (
              <p className="mt-6 border-t border-[#e7eceb] pt-5 font-manrope text-sm italic text-[#90a4ae]">
                No written body content added yet.
              </p>
            )}

            {attachments && attachments.length > 0 && (
              <section className="mt-8 border-t border-[#e7eceb] pt-5">
                <h4 className="font-nunito text-lg font-bold text-[#263238]">
                  Downloadable Attachments ({attachments.length})
                </h4>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {attachments.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 rounded-xl border border-[#e7eceb] bg-[#f8fbfa] p-3 text-sm"
                    >
                      <FileText className="size-5 shrink-0 text-[#2f7d7e]" />
                      <span className="flex-1 truncate font-medium text-[#263238]">
                        {file.name}
                      </span>
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-lg p-1 text-[#2f7d7e] hover:bg-[#e0f0e9]"
                        aria-label={`Download ${file.name}`}
                      >
                        <Download className="size-4" />
                      </a>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </article>
      </section>

      <ResourceFormNavigation
        currentStep={7}
        showNext={false}
        showPrimaryAction={true}
        primaryActionText="Add Resource"
        isSubmitting={savingStatus === 'PUBLISHED'}
        isSavingDraft={savingStatus === 'DRAFT'}
        onPrevious={() => router.push('/dashboard/admin/parent-resources/add-resource/seo')}
        onPrimaryAction={() => void handleSave('PUBLISHED')}
        onSaveDraft={() => void handleSave('DRAFT')}
      />
    </section>
  );
}
