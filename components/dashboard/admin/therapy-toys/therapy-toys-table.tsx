'use client';

import { Archive, ChevronLeft, ChevronRight, Copy, Eye, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';

import type { TherapyToy, TherapyToyPage } from '@/features/therapy-toys/model/therapy-toy.types';

type Props = {
  page?: TherapyToyPage;
  isLoading: boolean;
  error?: Error | null;
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  onPreview: (toy: TherapyToy) => void;
  onArchive: (toy: TherapyToy) => void;
  onDelete: (toy: TherapyToy) => void;
  onDuplicate: (toy: TherapyToy) => void;
  onPageChange: (page: number) => void;
};
const tier = (value: string) =>
  value
    .split('_')
    .map((word) => word[0] + word.slice(1).toLowerCase())
    .join(' ');
const age = (toy: TherapyToy) => `${toy.minAgeMonths}–${toy.maxAgeMonths} mo`;
const date = (value: string) =>
  new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(
    new Date(value)
  );

export function TherapyToysTable({
  page,
  isLoading,
  error,
  selectedIds,
  onSelectionChange,
  onPreview,
  onArchive,
  onDelete,
  onDuplicate,
  onPageChange,
}: Props) {
  const toys = page?.items ?? [];
  const setChecked = (id: string, checked: boolean) =>
    onSelectionChange(
      checked ? [...new Set([...selectedIds, id])] : selectedIds.filter((value) => value !== id)
    );
  const selectAll = (checked: boolean) =>
    onSelectionChange(checked ? toys.map((toy) => toy.id) : []);
  if (error)
    return (
      <div className="rounded-2xl border border-[#f2c7c2] bg-[#fff8f7] p-8 text-center font-manrope text-sm text-[#b24b4b]">
        {error.message}
      </div>
    );
  if (isLoading)
    return (
      <div className="grid gap-3 xl:grid-cols-2 2xl:grid-cols-1">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="h-28 animate-pulse rounded-2xl bg-[#f4f8f6]" />
        ))}
      </div>
    );
  if (!toys.length)
    return (
      <div className="rounded-2xl border border-[#e7eceb] bg-white p-8 text-center font-manrope text-sm text-[#607d8b]">
        No therapy toys match these filters.
      </div>
    );
  return (
    <div className="flex min-w-0 flex-col gap-6">
      <div className="grid gap-3 xl:grid-cols-2 2xl:hidden">
        {toys.map((toy) => (
          <article
            key={toy.id}
            className="space-y-4 rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
          >
            <div className="flex items-start gap-3">
              <input
                aria-label={`Select ${toy.name}`}
                type="checkbox"
                checked={selectedIds.includes(toy.id)}
                onChange={(event) => setChecked(toy.id, event.target.checked)}
                className="mt-1 size-4 accent-[#2f7d7e]"
              />
              <div className="min-w-0 flex-1">
                <h2 className="font-manrope text-sm font-semibold text-[#263238]">{toy.name}</h2>
                <p className="mt-1 font-manrope text-xs text-[#607d8b]">
                  {toy.developmentArea} · {age(toy)}
                </p>
              </div>
              <span className="rounded-full bg-[#edf6f2] px-2.5 py-0.5 text-xs text-[#2f7d7e]">
                {toy.status}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => onPreview(toy)}
                className="rounded-lg border px-3 py-2 text-xs"
              >
                View
              </button>
              <Link
                href={`/dashboard/admin/therapy-toys/${toy.id}/edit`}
                className="rounded-lg border px-3 py-2 text-xs"
              >
                Edit
              </Link>
              <button
                type="button"
                onClick={() => onDuplicate(toy)}
                className="rounded-lg border px-3 py-2 text-xs"
              >
                Duplicate
              </button>
              <button
                type="button"
                onClick={() => onArchive(toy)}
                className="rounded-lg border px-3 py-2 text-xs"
              >
                {toy.status === 'PUBLISHED' ? 'Archive' : 'Publish'}
              </button>
              <button
                type="button"
                onClick={() => onDelete(toy)}
                className="rounded-lg border px-3 py-2 text-xs text-[#b24b4b]"
              >
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>
      <div className="hidden overflow-x-auto rounded-2xl border border-[#e7eceb] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)] 2xl:block">
        <table className="w-full min-w-300 table-fixed">
          <thead>
            <tr className="h-12.25 bg-[#f4f8f6] text-left font-manrope text-xs text-[#607d8b]">
              <th className="w-12 pl-4">
                <input
                  aria-label="Select all therapy toys"
                  type="checkbox"
                  checked={toys.length > 0 && toys.every((toy) => selectedIds.includes(toy.id))}
                  onChange={(event) => selectAll(event.target.checked)}
                  className="size-4 accent-[#2f7d7e]"
                />
              </th>
              <th>Toy</th>
              <th>Category</th>
              <th>Age Range</th>
              <th>Membership</th>
              <th>Status</th>
              <th>Last Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {toys.map((toy) => (
              <tr
                key={toy.id}
                className="h-22 border-t border-[#eef1ef] font-manrope text-[13px] text-[#607d8b]"
              >
                <td className="pl-4">
                  <input
                    aria-label={`Select ${toy.name}`}
                    type="checkbox"
                    checked={selectedIds.includes(toy.id)}
                    onChange={(event) => setChecked(toy.id, event.target.checked)}
                    className="size-4 accent-[#2f7d7e]"
                  />
                </td>
                <td className="font-semibold text-[#263238]">{toy.name}</td>
                <td>{toy.developmentArea}</td>
                <td>{age(toy)}</td>
                <td>
                  <span className="rounded-full bg-[#edf6f2] px-2.5 py-0.5 text-xs text-[#2f7d7e]">
                    {tier(toy.accessLevel[0] ?? '')}
                  </span>
                </td>
                <td>
                  <span className="rounded-full bg-[#edf6f2] px-2.5 py-0.5 text-xs text-[#2f7d7e]">
                    {toy.status}
                  </span>
                </td>
                <td>{date(toy.updatedAt)}</td>
                <td>
                  <div className="flex gap-1">
                    <button
                      aria-label={`View ${toy.name}`}
                      onClick={() => onPreview(toy)}
                      className="p-2"
                    >
                      <Eye size={14} />
                    </button>
                    <Link
                      aria-label={`Edit ${toy.name}`}
                      href={`/dashboard/admin/therapy-toys/${toy.id}/edit`}
                      className="p-2"
                    >
                      <Pencil size={14} />
                    </Link>
                    <button
                      aria-label={`Duplicate ${toy.name}`}
                      onClick={() => onDuplicate(toy)}
                      className="p-2"
                    >
                      <Copy size={14} />
                    </button>
                    <button
                      aria-label={`${toy.status === 'PUBLISHED' ? 'Archive' : 'Publish'} ${toy.name}`}
                      onClick={() => onArchive(toy)}
                      className="p-2"
                    >
                      <Archive size={14} />
                    </button>
                    <button
                      aria-label={`Delete ${toy.name}`}
                      onClick={() => onDelete(toy)}
                      className="p-2 text-[#b24b4b]"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <nav aria-label="Therapy toy pagination" className="flex justify-end gap-3">
        <button
          type="button"
          disabled={!page || page.pagination.page <= 1}
          onClick={() => page && onPageChange(page.pagination.page - 1)}
          className="flex items-center gap-1 rounded-lg px-3 py-2 disabled:opacity-40"
        >
          <ChevronLeft size={16} />
          Previous
        </button>
        <span className="rounded-lg bg-[#2f7d7e] px-4 py-2 text-sm text-white">
          {page?.pagination.page ?? 1}
        </span>
        <button
          type="button"
          disabled={!page || page.pagination.page >= page.pagination.totalPages}
          onClick={() => page && onPageChange(page.pagination.page + 1)}
          className="flex items-center gap-1 rounded-lg px-3 py-2 disabled:opacity-40"
        >
          Next
          <ChevronRight size={16} />
        </button>
      </nav>
    </div>
  );
}
