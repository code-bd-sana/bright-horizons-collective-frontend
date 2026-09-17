'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import {
  useAdminTherapyToys,
  useAdminTherapyToySummary,
} from '@/features/therapy-toys/hooks/therapy-toys.queries';
import {
  useCreateTherapyToy,
  useDeleteTherapyToy,
  useUpdateTherapyToy,
  useUploadTherapyToyImage,
} from '@/features/therapy-toys/hooks/therapy-toys.mutations';
import type { TherapyToy } from '@/features/therapy-toys/model/therapy-toy.types';
import { TherapyToyFilters } from './therapy-toy-filters';
import { TherapyToyPreviewModal } from './therapy-toy-preview-modal';
import { TherapyToysSummary } from './therapy-toys-summary';
import { TherapyToysTable } from './therapy-toys-table';

function useDebouncedValue(value: string, delay = 350) {
  const [result, setResult] = useState(value);
  useEffect(() => {
    const timer = window.setTimeout(() => setResult(value), delay);
    return () => window.clearTimeout(timer);
  }, [delay, value]);
  return result;
}
const membership = {
  'Little Steps': 'LITTLE_STEPS',
  'Grow Together': 'GROW_TOGETHER',
  'Personalized Pathways': 'PERSONALIZED_PATHWAYS',
} as const;
const status = { Published: 'PUBLISHED', Draft: 'DRAFT', Archived: 'ARCHIVED' } as const;
const ageRange = (value: string) =>
  value === '0–12 months'
    ? [0, 12]
    : value === '1–3 years'
      ? [12, 36]
      : value === '3–5 years'
        ? [36, 60]
        : value === '5+ years'
          ? [60, undefined]
          : [undefined, undefined];

function getDuplicateName(name: string): string {
  const copyNumMatch = name.match(/^(.*) \(Copy (\d+)\)$/);
  if (copyNumMatch) {
    return `${copyNumMatch[1]} (Copy ${parseInt(copyNumMatch[2], 10) + 1})`;
  }
  if (name.endsWith(' (Copy)')) {
    return `${name.slice(0, -7)} (Copy 2)`;
  }
  return `${name} (Copy)`;
}

export function TherapyToysPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search);
  const [filterValues, setFilterValues] = useState({
    category: 'all',
    age: 'all',
    membership: 'all',
    status: 'all',
  });
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [preview, setPreview] = useState<TherapyToy | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<TherapyToy | null>(null);
  const [statusTarget, setStatusTarget] = useState<TherapyToy | null>(null);
  const [duplicatingId, setDuplicatingId] = useState<string | null>(null);
  const [minAgeMonths, maxAgeMonths] = ageRange(filterValues.age);
  const filters = useMemo(
    () => ({
      page,
      limit: 12,
      search: debouncedSearch || undefined,
      category: filterValues.category === 'all' ? undefined : filterValues.category,
      minAgeMonths,
      maxAgeMonths,
      membership:
        filterValues.membership === 'all'
          ? undefined
          : membership[filterValues.membership as keyof typeof membership],
      status:
        filterValues.status === 'all'
          ? undefined
          : status[filterValues.status as keyof typeof status],
    }),
    [debouncedSearch, filterValues, maxAgeMonths, minAgeMonths, page]
  );
  const toysQuery = useAdminTherapyToys(filters);
  const summaryQuery = useAdminTherapyToySummary();
  const updateToy = useUpdateTherapyToy();
  const deleteToy = useDeleteTherapyToy();
  const createToy = useCreateTherapyToy();
  const uploadImage = useUploadTherapyToyImage();
  const updateFilter = (key: keyof typeof filterValues, value: string) => {
    setPage(1);
    setFilterValues((current) => ({ ...current, [key]: value }));
  };
  const duplicate = async (toy: TherapyToy) => {
    setDuplicatingId(toy.id);
    const toastId = toast.loading(`Duplicating “${toy.name}”...`);

    try {
      let duplicatedImageUrl: string | undefined = undefined;

      if (toy.imageUrl) {
        try {
          const response = await fetch(toy.imageUrl);
          if (response.ok) {
            const blob = await response.blob();
            let mimeType: 'image/jpeg' | 'image/png' | 'image/webp' = 'image/jpeg';
            if (blob.type === 'image/png') mimeType = 'image/png';
            else if (blob.type === 'image/webp') mimeType = 'image/webp';
            else mimeType = 'image/jpeg';
            const ext =
              mimeType === 'image/png' ? 'png' : mimeType === 'image/webp' ? 'webp' : 'jpg';
            const cleanSlug =
              toy.name
                .toLowerCase()
                .replace(/[^a-z0-9]/g, '-')
                .slice(0, 30) || 'toy';
            const file = new File([blob], `${cleanSlug}-copy-${Date.now()}.${ext}`, {
              type: mimeType,
            });
            const uploadResult = await uploadImage.mutateAsync(file);
            duplicatedImageUrl = uploadResult.url;
          }
        } catch (imageError) {
          console.warn(
            '[therapy-toys] Could not clone image, continuing without image:',
            imageError
          );
        }
      }

      const created = await createToy.mutateAsync({
        name: getDuplicateName(toy.name),
        description: toy.description,
        developmentArea: toy.developmentArea,
        price: toy.price ?? 0,
        minAgeMonths: toy.minAgeMonths,
        maxAgeMonths: toy.maxAgeMonths,
        imageUrl: duplicatedImageUrl,
        affiliateLink: toy.affiliateLink ?? undefined,
        accessLevel: toy.accessLevel,
        status: 'DRAFT',
      });

      toast.success(`“${toy.name}” duplicated as a draft.`, { id: toastId });
      router.push(`/dashboard/admin/therapy-toys/${created.id}/edit`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to duplicate therapy toy.';
      toast.error(message, { id: toastId });
    } finally {
      setDuplicatingId(null);
    }
  };
  return (
    <section className="mx-auto w-full min-w-0 max-w-383.5 pb-8 text-[#3d3d3d]">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-nunito text-2xl font-medium leading-8 tracking-[-0.4px] sm:text-[32px] sm:leading-10 2xl:text-[40px] 2xl:leading-12">
            Therapy Toys
          </h1>
          <p className="mt-0.5 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#6b6b6b]">
            Manage therapist-recommended toys and developmental tools available to parents.
          </p>
        </div>
        <Link
          href="/dashboard/admin/therapy-toys/add-toy"
          className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-[#2f7d7e] px-4 py-2.5 font-nunito text-sm font-medium text-white sm:w-auto"
        >
          <Plus size={15} />
          Add Therapy Toy
        </Link>
      </header>
      <div className="mt-8 space-y-8">
        <TherapyToysSummary summary={summaryQuery.data} isLoading={summaryQuery.isLoading} />
        <div className="space-y-6">
          <TherapyToyFilters
            search={search}
            {...filterValues}
            onSearchChange={setSearch}
            onFilterChange={updateFilter}
          />
          <TherapyToysTable
            page={toysQuery.data}
            isLoading={toysQuery.isLoading}
            error={toysQuery.error}
            selectedIds={selectedIds}
            onSelectionChange={setSelectedIds}
            onPreview={setPreview}
            onArchive={setStatusTarget}
            onDelete={setDeleteTarget}
            onDuplicate={duplicate}
            duplicatingId={duplicatingId}
            onPageChange={setPage}
          />
        </div>
      </div>
      <TherapyToyPreviewModal toy={preview} onClose={(open) => !open && setPreview(null)} />
      <Dialog open={Boolean(statusTarget)} onOpenChange={(open) => !open && setStatusTarget(null)}>
        <DialogContent className="w-md max-w-[calc(100%-2rem)] rounded-2xl p-6">
          <DialogTitle>
            {statusTarget?.status === 'PUBLISHED' ? 'Archive therapy toy?' : 'Publish therapy toy?'}
          </DialogTitle>
          <p className="font-manrope text-sm text-[#607d8b]">
            {statusTarget?.status === 'PUBLISHED'
              ? `“${statusTarget?.name}” will be archived and hidden from parents in the explore catalog.`
              : `“${statusTarget?.name}” will be published and visible to parents in the explore catalog.`}
          </p>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setStatusTarget(null)}
              className="rounded-xl border px-4 py-2 font-manrope text-sm font-semibold text-[#607d8b]"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={updateToy.isPending}
              onClick={() => {
                if (!statusTarget) return;
                const nextStatus = statusTarget.status === 'PUBLISHED' ? 'ARCHIVED' : 'PUBLISHED';
                updateToy.mutate(
                  {
                    id: statusTarget.id,
                    input: { status: nextStatus },
                  },
                  {
                    onSuccess: () => {
                      toast.success(
                        nextStatus === 'ARCHIVED'
                          ? 'Therapy toy archived.'
                          : 'Therapy toy published.'
                      );
                      setStatusTarget(null);
                    },
                    onError: (error) => toast.error(error.message),
                  }
                );
              }}
              className={`rounded-xl px-4 py-2 font-manrope text-sm font-semibold text-white disabled:opacity-50 ${
                statusTarget?.status === 'PUBLISHED'
                  ? 'bg-[#8b4b3e] hover:bg-[#723b30]'
                  : 'bg-[#2f7d7e] hover:bg-[#256465]'
              }`}
            >
              {statusTarget?.status === 'PUBLISHED' ? 'Archive' : 'Publish'}
            </button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={Boolean(deleteTarget)} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <DialogContent className="w-md max-w-[calc(100%-2rem)] rounded-2xl p-6">
          <DialogTitle>Delete therapy toy?</DialogTitle>
          <p className="font-manrope text-sm text-[#607d8b]">
            This permanently deletes “{deleteTarget?.name}” and its managed image.
          </p>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setDeleteTarget(null)}
              className="rounded-xl border px-4 py-2 font-manrope text-sm font-semibold text-[#607d8b]"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={deleteToy.isPending}
              onClick={() =>
                deleteTarget &&
                deleteToy.mutate(deleteTarget.id, {
                  onSuccess: () => {
                    toast.success('Therapy toy deleted.');
                    setDeleteTarget(null);
                  },
                  onError: (error) => toast.error(error.message),
                })
              }
              className="rounded-xl bg-[#b24b4b] px-4 py-2 font-manrope text-sm font-semibold text-white disabled:opacity-50"
            >
              Delete
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
