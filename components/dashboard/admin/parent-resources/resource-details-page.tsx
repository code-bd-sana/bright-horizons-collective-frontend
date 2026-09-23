'use client';

import {
  Archive,
  ArrowLeft,
  BookOpen,
  Copy,
  Download,
  FileText,
  Pencil,
  RotateCcw,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { ArchiveResourceModal } from './archive-resource-modal';
import { DeleteResourceModal } from './delete-resource-modal';
import type { ParentResource } from './parent-resources-types';
import {
  BACKEND_TO_UI_RESOURCE_TYPE,
  useDeleteParentResource,
  useResourceFormStore,
  useUpdateParentResource,
} from '@/features/parent-resources';

type ResourceDetailsPageProps = {
  resource: ParentResource;
};

function formatMembership(accessLevel: string[] = []): string {
  if (accessLevel.includes('GROW_TOGETHER') && accessLevel.includes('PERSONALIZED_PATHWAYS')) {
    return 'Grow Together';
  }
  if (accessLevel.includes('PERSONALIZED_PATHWAYS')) return 'Personalized Pathways';
  return 'Little Steps';
}

function getMembershipBadgeClass(membership: string): string {
  if (membership === 'Personalized Pathways') {
    return 'bg-[#fce9e2] text-[#a05a3a]';
  }
  if (membership === 'Grow Together') {
    return 'bg-[#dcefe7] text-[#2f7d7e]';
  }
  return 'bg-[#edf6f2] text-[#2f7d7e]';
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'PUBLISHED') {
    return (
      <span className="inline-flex rounded-full bg-[#edf6f2] px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 text-[#4caf50]">
        Published
      </span>
    );
  }
  if (status === 'DRAFT') {
    return (
      <span className="inline-flex rounded-full bg-[#fff8e1] px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 text-[#b8860b]">
        Draft
      </span>
    );
  }
  return (
    <span className="inline-flex rounded-full bg-[#f4f8f6] px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 text-[#607d8b]">
      Archived
    </span>
  );
}

function formatDate(dateStr?: string | null) {
  if (!dateStr) return '—';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

function formatFileSize(bytes?: number) {
  if (!bytes) return '0 KB';
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function DetailCard({
  label,
  value,
  large = false,
}: {
  label: string;
  value: string;
  large?: boolean;
}) {
  return (
    <div
      className={`rounded-[14px] bg-[#f4f8f6] p-3 ${
        large ? 'min-h-21.75 2xl:h-21.625' : 'min-h-16.5 2xl:h-16.375'
      }`}
    >
      <p className="font-manrope text-[11px] font-semibold uppercase leading-4.125 tracking-[0.55px] text-[#607d8b]">
        {label}
      </p>
      <p className="pt-1 font-manrope text-sm font-semibold leading-5.25 text-[#263238]">{value}</p>
    </div>
  );
}

export function ResourceDetailsPage({ resource }: ResourceDetailsPageProps) {
  const router = useRouter();
  const [resourceOverride, setResourceOverride] = useState<ParentResource | null>(null);
  const [archiveTarget, setArchiveTarget] = useState<ParentResource | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ParentResource | null>(null);

  const { populateFromResource, setBasicInfo, setEditingResourceId } = useResourceFormStore();
  const updateMutation = useUpdateParentResource();
  const deleteMutation = useDeleteParentResource();

  const currentResource =
    (resourceOverride?.id === resource.id ? resourceOverride : null) ?? resource;
  const isArchived = currentResource.status === 'ARCHIVED';
  const membershipLabel = formatMembership(currentResource.accessLevel);

  const handleEdit = () => {
    populateFromResource(currentResource);
    router.push('/dashboard/admin/parent-resources/add-resource');
  };

  const handleDuplicate = () => {
    populateFromResource(currentResource);
    setBasicInfo({ title: `${currentResource.title} (Copy)` });
    setEditingResourceId(null);
    toast.info(`Duplicating “${currentResource.title}”.`);
    router.push('/dashboard/admin/parent-resources/add-resource');
  };

  const handleArchiveConfirm = async (target: ParentResource) => {
    const targetIsArchived = target.status === 'ARCHIVED';
    try {
      const updated = await updateMutation.mutateAsync({
        id: target.id,
        input: { status: targetIsArchived ? 'PUBLISHED' : 'ARCHIVED' },
      });
      if (updated) {
        setResourceOverride(updated);
      } else {
        setResourceOverride({
          ...target,
          status: targetIsArchived ? 'PUBLISHED' : 'ARCHIVED',
        });
      }
      toast.success(
        targetIsArchived
          ? `“${target.title}” has been restored.`
          : `“${target.title}” has been archived.`
      );
      setArchiveTarget(null);
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to update resource status.';
      toast.error(message);
    }
  };

  const handleDeleteConfirm = async (target: ParentResource) => {
    try {
      await deleteMutation.mutateAsync(target.id);
      toast.success(`“${target.title}” has been deleted.`);
      setDeleteTarget(null);
      router.push('/dashboard/admin/parent-resources');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to delete resource.';
      toast.error(message);
    }
  };

  const detailCards = [
    { label: 'Category', value: currentResource.category || '—' },
    {
      label: 'Type',
      value:
        BACKEND_TO_UI_RESOURCE_TYPE[currentResource.resourceType] || currentResource.resourceType,
    },
    { label: 'Reading Time', value: currentResource.estimatedReadTime || '—' },
    { label: 'Author', value: currentResource.author || 'Jaicy' },
  ];

  const publishingCards = [
    { label: 'Author / Created By', value: currentResource.author || 'Jaicy' },
    { label: 'Created Date', value: formatDate(currentResource.createdAt) },
    { label: 'Last Updated', value: formatDate(currentResource.updatedAt) },
    { label: 'Status', value: currentResource.status },
  ];

  return (
    <section className="mx-auto flex w-full min-w-0 max-w-3xl flex-col gap-6 pb-8 text-[#263238]">
      <Link
        href="/dashboard/admin/parent-resources"
        className="inline-flex w-fit items-center gap-1.5 font-manrope text-sm font-medium leading-5 text-[#607d8b]"
      >
        <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.6} />
        Back to Parent Resources
      </Link>

      <article className="overflow-hidden rounded-2xl border border-[#e7eceb] bg-white p-px shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
        {currentResource.coverImageUrl ? (
          <div className="relative h-48 w-full overflow-hidden rounded-[14px] bg-[#f4f8f6] sm:h-64">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentResource.coverImageUrl}
              alt={currentResource.title}
              className="size-full object-cover"
            />
          </div>
        ) : (
          <div className="flex h-36 items-center justify-center rounded-[14px] bg-[rgba(47,125,126,0.09)] sm:h-48 2xl:h-48">
            <BookOpen aria-hidden="true" size={36} strokeWidth={1.5} className="text-[#2f7d7e]" />
          </div>
        )}
        <div className="p-4 sm:p-5 2xl:p-6">
          <div className="flex min-h-29.75 flex-col justify-between">
            <div>
              <div className="flex flex-wrap gap-2">
                <StatusBadge status={currentResource.status} />
                <span
                  className={`rounded-full px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 ${getMembershipBadgeClass(
                    membershipLabel
                  )}`}
                >
                  {membershipLabel}
                </span>
                <span className="rounded-full bg-[rgba(47,125,126,0.08)] px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 text-[#2f7d7e]">
                  {BACKEND_TO_UI_RESOURCE_TYPE[currentResource.resourceType] ||
                    currentResource.resourceType}
                </span>
                {currentResource.category && (
                  <span className="rounded-full bg-[#f4f8f6] px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 text-[#607d8b]">
                    {currentResource.category}
                  </span>
                )}
              </div>
              <h1 className="pt-3 font-nunito text-[22px] font-bold leading-8.25 text-[#263238]">
                {currentResource.title}
              </h1>
            </div>

            <div className="flex flex-wrap gap-2 pt-4">
              <button
                type="button"
                onClick={handleDuplicate}
                className="inline-flex h-9.5 items-center justify-center gap-2 rounded-[14px] border border-[#e7eceb] px-3.25 py-2.25 font-manrope text-sm font-semibold leading-5 text-[#607d8b] transition-colors hover:bg-[#f4f8f6]"
              >
                <Copy aria-hidden="true" size={14} strokeWidth={1.6} />
                Duplicate
              </button>
              <button
                type="button"
                onClick={() => setArchiveTarget(currentResource)}
                className={`inline-flex h-9.5 items-center justify-center gap-2 rounded-[14px] border px-3.25 py-2.25 font-manrope text-sm font-semibold leading-5 transition-colors ${
                  isArchived
                    ? 'border-[#2f7d7e] bg-[#edf6f2] text-[#2f7d7e] hover:bg-[#dcefe7]'
                    : 'border-[rgba(184,134,11,0.25)] bg-[#fff8e1] text-[#b8860b] hover:bg-[#feefc3]'
                }`}
              >
                {isArchived ? (
                  <>
                    <RotateCcw aria-hidden="true" size={14} strokeWidth={1.6} />
                    Restore
                  </>
                ) : (
                  <>
                    <Archive aria-hidden="true" size={14} strokeWidth={1.6} />
                    Archive
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setDeleteTarget(currentResource)}
                className="inline-flex h-9.5 items-center justify-center gap-2 rounded-[14px] border border-[#fce9e2] bg-[#fff5f2] px-3.25 py-2.25 font-manrope text-sm font-semibold leading-5 text-[#d32f2f] transition-colors hover:bg-[#fde8e4]"
              >
                <Trash2 aria-hidden="true" size={14} strokeWidth={1.6} />
                Delete
              </button>
              <button
                type="button"
                onClick={handleEdit}
                className="inline-flex h-9.5 items-center justify-center gap-2 rounded-[14px] bg-[#2f7d7e] px-4 py-2 font-manrope text-sm font-semibold leading-5 text-white transition-colors hover:bg-[#266869]"
              >
                <Pencil aria-hidden="true" size={14} strokeWidth={1.6} />
                Edit Resource
              </button>
            </div>
          </div>
        </div>
      </article>

      <article className="rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:p-5 2xl:p-6.25">
        <h2 className="font-nunito text-lg font-bold leading-6.75">Overview</h2>
        <p className="pt-4 font-manrope text-[15px] leading-6.375 text-[#607d8b]">
          {currentResource.summary}
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4">
          {detailCards.map(({ label, value }) => (
            <DetailCard key={label} label={label} value={value} large />
          ))}
        </div>
      </article>

      <article className="rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:p-5 2xl:p-6.25">
        <h2 className="font-nunito text-lg font-bold leading-6.75">Content</h2>
        {currentResource.content?.trim() ? (
          <div className="pt-4 whitespace-pre-wrap font-manrope text-[15px] leading-6.75 text-[#263238]">
            {currentResource.content}
          </div>
        ) : (
          <p className="pt-4 font-manrope text-sm italic text-[#607d8b]">
            No content has been added to this resource yet.
          </p>
        )}
      </article>

      <article className="rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:p-5 2xl:p-6.25">
        <h2 className="font-nunito text-lg font-bold leading-6.75">
          Attachments{' '}
          {currentResource.attachments?.length ? `(${currentResource.attachments.length})` : ''}
        </h2>
        {currentResource.attachments && currentResource.attachments.length > 0 ? (
          <div className="mt-4 divide-y divide-[#e7eceb]">
            {currentResource.attachments.map((file, idx) => (
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
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-[10px] border border-[#e7eceb] px-3 py-1.5 font-manrope text-xs font-semibold text-[#2f7d7e] transition-colors hover:bg-[#edf6f2]"
                >
                  <Download aria-hidden="true" size={13} strokeWidth={1.7} />
                  Download
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="pt-3 font-manrope text-sm text-[#607d8b]">
            No downloadable attachments uploaded for this resource.
          </p>
        )}
      </article>

      {(currentResource.seoTitle || currentResource.seoDescription) && (
        <article className="rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:p-5 2xl:p-6.25">
          <h2 className="font-nunito text-lg font-bold leading-6.75">SEO &amp; Metadata</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[14px] bg-[#f4f8f6] p-3">
              <p className="font-manrope text-[11px] font-semibold uppercase tracking-[0.55px] text-[#607d8b]">
                Meta Title
              </p>
              <p className="pt-1 font-manrope text-sm font-semibold text-[#263238]">
                {currentResource.seoTitle || currentResource.title}
              </p>
            </div>
            <div className="rounded-[14px] bg-[#f4f8f6] p-3 sm:col-span-2">
              <p className="font-manrope text-[11px] font-semibold uppercase tracking-[0.55px] text-[#607d8b]">
                Meta Description
              </p>
              <p className="pt-1 font-manrope text-sm text-[#263238]">
                {currentResource.seoDescription || currentResource.summary}
              </p>
            </div>
          </div>
        </article>
      )}

      <article className="rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:p-5 2xl:p-6.25">
        <h2 className="font-nunito text-lg font-bold leading-6.75">Publishing Information</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4">
          {publishingCards.map(({ label, value }) => (
            <DetailCard key={label} label={label} value={value} />
          ))}
        </div>
      </article>

      <ArchiveResourceModal
        resource={archiveTarget}
        isPending={updateMutation.isPending}
        onClose={() => setArchiveTarget(null)}
        onConfirm={handleArchiveConfirm}
      />

      <DeleteResourceModal
        resource={deleteTarget}
        isPending={deleteMutation.isPending}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
      />
    </section>
  );
}
