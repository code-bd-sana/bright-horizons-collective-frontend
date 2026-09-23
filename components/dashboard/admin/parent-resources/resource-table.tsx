'use client';

import {
  Archive,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileText,
  Loader2,
  Paperclip,
  Pencil,
  RotateCcw,
  Trash2,
} from 'lucide-react';
import type { ParentResource } from './parent-resources-types';
import { BACKEND_TO_UI_RESOURCE_TYPE } from '@/features/parent-resources';

export type ResourceTableProps = {
  resources: ParentResource[];
  isLoading?: boolean;
  meta?: { total: number; page: number; limit: number; totalPages: number };
  currentPage?: number;
  onPageChange?: (page: number) => void;
  onAction: (action: string, resource: ParentResource) => void;
};

function getMembershipLabel(accessLevel: string[] = []): string {
  if (accessLevel.includes('LITTLE_STEPS')) return 'Little Steps';
  if (accessLevel.includes('GROW_TOGETHER')) return 'Grow Together';
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
      <span className="inline-flex rounded-full bg-[#d5e5e5] px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 text-[#174a4d]">
        Published
      </span>
    );
  }
  if (status === 'DRAFT') {
    return (
      <span className="inline-flex rounded-full bg-[#fff3e0] px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 text-[#b8860b]">
        Draft
      </span>
    );
  }
  return (
    <span className="inline-flex rounded-full bg-[#f0f3f4] px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 text-[#607d8b]">
      Archived
    </span>
  );
}

function ResourceActions({
  resource,
  onAction,
}: {
  resource: ParentResource;
  onAction: ResourceTableProps['onAction'];
}) {
  const isArchived = resource.status === 'ARCHIVED';

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        title="Preview resource"
        aria-label={`Preview ${resource.title}`}
        onClick={() => onAction('Preview', resource)}
        className="flex size-7 items-center justify-center rounded-[10px] text-[#607d8b] transition-colors hover:bg-[#e9f1ee] hover:text-[#2f7d7e]"
      >
        <Eye aria-hidden="true" size={14} strokeWidth={1.6} />
      </button>

      <button
        type="button"
        title="Edit resource"
        aria-label={`Edit ${resource.title}`}
        onClick={() => onAction('Edit', resource)}
        className="flex size-7 items-center justify-center rounded-[10px] text-[#607d8b] transition-colors hover:bg-[#e9f1ee] hover:text-[#2f7d7e]"
      >
        <Pencil aria-hidden="true" size={14} strokeWidth={1.6} />
      </button>

      <button
        type="button"
        title={isArchived ? 'Restore resource' : 'Archive resource'}
        aria-label={`${isArchived ? 'Restore' : 'Archive'} ${resource.title}`}
        onClick={() => onAction(isArchived ? 'Restore' : 'Archive', resource)}
        className={`flex size-7 items-center justify-center rounded-[10px] transition-colors ${
          isArchived
            ? 'text-[#2f7d7e] hover:bg-[#edf6f2]'
            : 'text-[#607d8b] hover:bg-[#fff8e1] hover:text-[#b8860b]'
        }`}
      >
        {isArchived ? (
          <RotateCcw aria-hidden="true" size={14} strokeWidth={1.6} />
        ) : (
          <Archive aria-hidden="true" size={14} strokeWidth={1.6} />
        )}
      </button>

      <button
        type="button"
        title="Delete resource"
        aria-label={`Delete ${resource.title}`}
        onClick={() => onAction('Delete', resource)}
        className="flex size-7 items-center justify-center rounded-[10px] text-[#607d8b] transition-colors hover:bg-[#fce9e2] hover:text-[#d32f2f]"
      >
        <Trash2 aria-hidden="true" size={14} strokeWidth={1.6} />
      </button>
    </div>
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

export function ResourceTable({
  resources,
  isLoading = false,
  meta,
  currentPage = 1,
  onPageChange,
  onAction,
}: ResourceTableProps) {
  const totalPages = meta?.totalPages ?? 1;

  return (
    <div className="flex min-w-0 flex-col gap-6">
      <section className="grid gap-3 xl:grid-cols-2 2xl:block">
        {/* Mobile / Tablet cards */}
        <div className="contents 2xl:hidden">
          {isLoading ? (
            <div className="flex items-center justify-center rounded-2xl border border-[#e7eceb] bg-white p-12 text-[#607d8b] xl:col-span-2">
              <Loader2 className="size-6 animate-spin text-[#2f7d7e]" />
              <span className="ml-2 font-manrope text-sm">Loading resources...</span>
            </div>
          ) : resources.length === 0 ? (
            <p className="rounded-2xl border border-[#e7eceb] bg-white p-8 text-center font-manrope text-sm text-[#607d8b] xl:col-span-2">
              No resources found matching the selected filters.
            </p>
          ) : (
            resources.map((resource) => {
              const membership = getMembershipLabel(resource.accessLevel);
              const uiType =
                BACKEND_TO_UI_RESOURCE_TYPE[resource.resourceType] || resource.resourceType;
              const attachmentsCount = resource.attachments?.length ?? 0;

              return (
                <article
                  key={resource.id}
                  className="min-w-0 space-y-4 rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
                >
                  <div className="flex gap-3">
                    <FileText
                      aria-hidden="true"
                      className="mt-0.5 size-4 shrink-0 text-[#2f7d7e]"
                      strokeWidth={1.7}
                    />
                    <div className="min-w-0">
                      <h2 className="font-nunito text-base font-bold leading-6 text-[#263238]">
                        {resource.title}
                      </h2>
                      <p className="font-manrope text-xs leading-4.5 text-[#6c7787]">
                        {resource.author || 'Jaicy'} · {resource.estimatedReadTime || '5 min read'}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 font-manrope text-xs leading-4.5 text-[#607d8b]">
                    <p>
                      Category{' '}
                      <span className="mt-1 block font-medium text-[#263238]">
                        {resource.category || 'General'}
                      </span>
                    </p>
                    <p>
                      Type <span className="mt-1 block font-medium text-[#263238]">{uiType}</span>
                    </p>
                    <p>
                      Attachments{' '}
                      <span className="mt-1 block font-medium text-[#263238]">
                        {attachmentsCount > 0
                          ? `${attachmentsCount} ${attachmentsCount === 1 ? 'file' : 'files'}`
                          : '—'}
                      </span>
                    </p>
                    <p>
                      Updated{' '}
                      <span className="mt-1 block font-medium text-[#263238]">
                        {formatDate(resource.updatedAt)}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 border-t border-[#e7eceb] pt-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusBadge status={resource.status} />
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 ${getMembershipBadgeClass(membership)}`}
                      >
                        {membership}
                      </span>
                    </div>
                    <div className="flex justify-end pt-1">
                      <ResourceActions resource={resource} onAction={onAction} />
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto rounded-2xl border border-[#e7eceb] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)] 2xl:block">
          <div role="table" className="min-w-350">
            <div
              role="row"
              className="grid h-12.25 grid-cols-[minmax(240px,1.6fr)_140px_100px_150px_110px_95px_110px_130px] items-center border-b border-[#e7eceb] bg-[#f4f8f6] px-5 font-manrope text-xs font-semibold leading-4.5 text-[#607d8b]"
            >
              <div role="columnheader">Resource</div>
              <div role="columnheader">Category</div>
              <div role="columnheader">Type</div>
              <div role="columnheader">Membership</div>
              <div role="columnheader">Attachments</div>
              <div role="columnheader">Status</div>
              <div role="columnheader">Last Updated</div>
              <div role="columnheader" className="text-right">
                Actions
              </div>
            </div>

            <div role="rowgroup">
              {isLoading ? (
                <div className="flex h-48 items-center justify-center text-[#607d8b]">
                  <Loader2 className="size-6 animate-spin text-[#2f7d7e]" />
                  <span className="ml-2 font-manrope text-sm">Loading resources...</span>
                </div>
              ) : resources.length === 0 ? (
                <div className="flex h-36 items-center justify-center p-8 text-center font-manrope text-sm text-[#607d8b]">
                  No resources found matching the selected filters.
                </div>
              ) : (
                resources.map((resource) => {
                  const membership = getMembershipLabel(resource.accessLevel);
                  const uiType =
                    BACKEND_TO_UI_RESOURCE_TYPE[resource.resourceType] || resource.resourceType;
                  const attachmentsCount = resource.attachments?.length ?? 0;

                  return (
                    <div
                      key={resource.id}
                      role="row"
                      className="grid min-h-18 grid-cols-[minmax(240px,1.6fr)_140px_100px_150px_110px_95px_110px_130px] items-center border-b border-[#e7eceb] px-5 py-3 font-manrope text-sm leading-5.5 text-[#263238] transition-colors hover:bg-[#fafcfb] last:border-b-0"
                    >
                      {/* Resource title + author */}
                      <div role="cell" className="flex items-center gap-3 pr-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#edf6f2] text-[#2f7d7e]">
                          <FileText size={18} strokeWidth={1.8} />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-manrope text-sm font-semibold leading-5 text-[#263238]">
                            {resource.title}
                          </p>
                          <p className="truncate font-manrope text-xs leading-4.5 text-[#607d8b]">
                            {resource.author || 'Jaicy'} ·{' '}
                            {resource.estimatedReadTime || '5 min read'}
                          </p>
                        </div>
                      </div>

                      {/* Category */}
                      <div role="cell" className="truncate pr-3 text-sm text-[#263238]">
                        {resource.category || 'General'}
                      </div>

                      {/* Type */}
                      <div role="cell" className="whitespace-nowrap text-sm text-[#263238]">
                        {uiType}
                      </div>

                      {/* Membership */}
                      <div role="cell">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 whitespace-nowrap ${getMembershipBadgeClass(membership)}`}
                        >
                          {membership}
                        </span>
                      </div>

                      {/* Attachments */}
                      <div role="cell" className="flex items-center gap-1.5 text-sm text-[#607d8b]">
                        {attachmentsCount > 0 ? (
                          <>
                            <Paperclip size={13} className="text-[#2f7d7e]" />
                            <span className="font-medium text-[#263238]">
                              {attachmentsCount} {attachmentsCount === 1 ? 'file' : 'files'}
                            </span>
                          </>
                        ) : (
                          <span className="text-[#a0aab0]">—</span>
                        )}
                      </div>

                      {/* Status */}
                      <div role="cell">
                        <StatusBadge status={resource.status} />
                      </div>

                      {/* Last Updated */}
                      <div role="cell" className="whitespace-nowrap text-xs text-[#607d8b]">
                        {formatDate(resource.updatedAt)}
                      </div>

                      {/* Actions */}
                      <div role="cell" className="flex justify-end">
                        <ResourceActions resource={resource} onAction={onAction} />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Pagination */}
      {totalPages > 1 && onPageChange && (
        <nav
          aria-label="Resource table pagination"
          className="flex w-full items-center justify-between border-t border-[#e7eceb] pt-4"
        >
          <p className="font-manrope text-xs text-[#607d8b]">
            Showing page <span className="font-semibold text-[#263238]">{currentPage}</span> of{' '}
            <span className="font-semibold text-[#263238]">{totalPages}</span>
            {meta?.total ? ` (${meta.total} total resources)` : ''}
          </p>

          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => onPageChange(currentPage - 1)}
              aria-label="Previous page"
              className="flex size-9 items-center justify-center rounded-lg border border-[#e7eceb] text-[#263238] transition-colors hover:bg-[#e9f1ee] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={16} strokeWidth={1.8} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <button
                key={pg}
                type="button"
                aria-current={pg === currentPage ? 'page' : undefined}
                onClick={() => onPageChange(pg)}
                className={`size-9 rounded-lg font-nunito text-xs font-semibold transition-colors ${
                  pg === currentPage
                    ? 'bg-[#2f7d7e] text-white'
                    : 'border border-[#e7eceb] text-[#263238] hover:bg-[#e9f1ee]'
                }`}
              >
                {pg}
              </button>
            ))}

            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => onPageChange(currentPage + 1)}
              aria-label="Next page"
              className="flex size-9 items-center justify-center rounded-lg border border-[#e7eceb] text-[#263238] transition-colors hover:bg-[#e9f1ee] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight size={16} strokeWidth={1.8} />
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}
