'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

import { ArchiveResourceModal } from './archive-resource-modal';
import { DeleteResourceModal } from './delete-resource-modal';
import { ResourceFilters, type FilterName } from './resource-filters';
import { ResourceSummary } from './resource-summary';
import { ResourceTable } from './resource-table';
import type { ParentResource, UiResourceType } from './parent-resources-types';
import {
  useAdminParentResources,
  useDeleteParentResource,
  useUpdateParentResource,
  useResourceFormStore,
  UI_TO_BACKEND_RESOURCE_TYPE,
} from '@/features/parent-resources';

export function ParentResourcesPage() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    type: 'all',
    membership: 'all',
    status: 'all',
  });
  const [page, setPage] = useState(1);
  const [archiveTarget, setArchiveTarget] = useState<ParentResource | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ParentResource | null>(null);

  const { populateFromResource, resetForm } = useResourceFormStore();
  const deleteMutation = useDeleteParentResource();
  const updateMutation = useUpdateParentResource();

  const queryParams = useMemo(() => {
    const params: Record<string, unknown> = {
      page,
      limit: 10,
    };
    if (search.trim()) params.search = search.trim();
    if (filters.category !== 'all') params.category = filters.category;
    if (filters.type !== 'all') {
      params.type =
        UI_TO_BACKEND_RESOURCE_TYPE[filters.type as UiResourceType] ?? filters.type.toUpperCase();
    }
    if (filters.membership !== 'all') {
      const tierMap: Record<string, string> = {
        'Little Steps': 'LITTLE_STEPS',
        'Grow Together': 'GROW_TOGETHER',
        'Personalized Pathways': 'PERSONALIZED_PATHWAYS',
      };
      params.accessLevel = tierMap[filters.membership] ?? filters.membership;
    }
    if (filters.status !== 'all') {
      params.status = filters.status.toUpperCase();
    }
    return params;
  }, [page, search, filters]);

  const { data: resourcesResponse, isLoading } = useAdminParentResources(queryParams);

  const resources = useMemo(() => resourcesResponse?.data ?? [], [resourcesResponse?.data]);
  const meta = resourcesResponse?.meta;

  const availableCategories = useMemo(() => {
    return Array.from(new Set(resources.map((r) => r.category).filter(Boolean)));
  }, [resources]);

  const updateFilter = (filter: FilterName, value: string) => {
    setFilters((current) => ({ ...current, [filter]: value }));
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleAction = async (action: string, resource: ParentResource) => {
    if (action === 'Preview') {
      router.push(`/dashboard/admin/parent-resources/${resource.id}`);
      return;
    }

    if (action === 'Edit') {
      populateFromResource(resource);
      router.push('/dashboard/admin/parent-resources/add-resource');
      return;
    }

    if (action === 'Archive') {
      setArchiveTarget(resource);
      return;
    }

    if (action === 'Restore') {
      try {
        await updateMutation.mutateAsync({
          id: resource.id,
          input: { status: 'PUBLISHED' },
        });
        toast.success(`“${resource.title}” has been restored to published.`);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to restore resource.';
        toast.error(message);
      }
      return;
    }

    if (action === 'Delete') {
      setDeleteTarget(resource);
      return;
    }

    toast.info(`${action} is ready for “${resource.title}”.`);
  };

  const archiveResource = async (resource: ParentResource) => {
    const isArchived = resource.status === 'ARCHIVED';
    try {
      await updateMutation.mutateAsync({
        id: resource.id,
        input: { status: isArchived ? 'PUBLISHED' : 'ARCHIVED' },
      });
      toast.success(
        isArchived
          ? `“${resource.title}” has been restored.`
          : `“${resource.title}” has been archived.`
      );
      setArchiveTarget(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to archive resource.';
      toast.error(message);
    }
  };

  const deleteResource = async (resource: ParentResource) => {
    try {
      await deleteMutation.mutateAsync(resource.id);
      toast.success(`“${resource.title}” has been deleted.`);
      setDeleteTarget(null);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to delete resource.';
      toast.error(message);
    }
  };

  return (
    <section className="mx-auto w-full min-w-0 max-w-383.5 pb-8 text-[#3d3d3d]">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-nunito text-2xl font-medium leading-8 tracking-[-0.4px] sm:text-[32px] sm:leading-10 2xl:text-[40px] 2xl:leading-12">
            Parent Resources
          </h1>
          <p className="mt-0.5 max-w-204.5 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#6b6b6b]">
            Manage educational articles, guides, printables, and learning resources available to
            parents.
          </p>
        </div>
        <Link
          href="/dashboard/admin/parent-resources/add-resource"
          onClick={() => resetForm()}
          className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-[#2f7d7e] px-4 py-2.5 font-nunito text-sm font-medium leading-5 tracking-[-0.084px] text-white sm:w-auto"
        >
          <Plus aria-hidden="true" size={16} strokeWidth={2} />
          Add Resource
        </Link>
      </header>
      <div className="mt-8 space-y-8">
        <ResourceSummary />
        <div className="space-y-6">
          <ResourceFilters
            search={search}
            category={filters.category}
            type={filters.type}
            membership={filters.membership}
            status={filters.status}
            availableCategories={availableCategories}
            onSearchChange={handleSearchChange}
            onFilterChange={updateFilter}
          />
          <ResourceTable
            resources={resources}
            isLoading={isLoading}
            meta={meta}
            currentPage={page}
            onPageChange={setPage}
            onAction={handleAction}
          />
        </div>
      </div>
      <ArchiveResourceModal
        resource={archiveTarget}
        isPending={updateMutation.isPending}
        onClose={() => setArchiveTarget(null)}
        onConfirm={archiveResource}
      />
      <DeleteResourceModal
        resource={deleteTarget}
        isPending={deleteMutation.isPending}
        onClose={() => setDeleteTarget(null)}
        onConfirm={deleteResource}
      />
    </section>
  );
}
