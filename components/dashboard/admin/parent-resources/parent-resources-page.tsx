'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { ArchiveResourceModal } from './archive-resource-modal';
import { DeleteResourceModal } from './delete-resource-modal';
import { parentResources } from './parent-resources-data';
import { ResourceFilters } from './resource-filters';
import { ResourceSummary } from './resource-summary';
import { ResourceTable } from './resource-table';
import type { ParentResource } from './parent-resources-types';

export function ParentResourcesPage() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    type: 'all',
    membership: 'all',
    status: 'all',
  });
  const [archiveTarget, setArchiveTarget] = useState<ParentResource | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ParentResource | null>(null);

  const filteredResources = useMemo(() => {
    const query = search.trim().toLowerCase();
    return parentResources.filter(
      (resource) =>
        (filters.category === 'all' || resource.category === filters.category) &&
        (filters.type === 'all' || resource.type === filters.type) &&
        (filters.membership === 'all' || resource.membership === filters.membership) &&
        (filters.status === 'all' || resource.status === filters.status) &&
        (!query ||
          `${resource.title} ${resource.author} ${resource.category}`.toLowerCase().includes(query))
    );
  }, [filters, search]);

  const updateFilter = (filter: keyof typeof filters, value: string) =>
    setFilters((current) => ({ ...current, [filter]: value }));
  const handleAction = (action: string, resource: ParentResource) => {
    if (action === 'Archive') {
      setArchiveTarget(resource);
      return;
    }

    if (action === 'Delete') {
      setDeleteTarget(resource);
      return;
    }

    toast.success(`${action} is ready for “${resource.title}”.`);
  };

  const archiveResource = (resource: ParentResource) => {
    setArchiveTarget(null);
    toast.success(`“${resource.title}” has been archived.`);
  };

  const deleteResource = (resource: ParentResource) => {
    setDeleteTarget(null);
    toast.success(`“${resource.title}” has been deleted.`);
  };

  return (
    <section className="mx-auto w-full max-w-383.5 pb-8 text-[#3d3d3d]">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-nunito text-[32px] font-medium leading-10 tracking-[-0.4px] sm:text-[40px] sm:leading-12">
            Parent Resources
          </h1>
          <p className="mt-0.5 max-w-204.5 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#6b6b6b]">
            Manage educational articles, guides, printables, and learning resources available to
            parents.
          </p>
        </div>
        <Link
          href="/dashboard/admin/parent-resources/add-resource"
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
            onSearchChange={setSearch}
            onFilterChange={updateFilter}
          />
          <ResourceTable resources={filteredResources} onAction={handleAction} />
        </div>
      </div>
      <ArchiveResourceModal
        resource={archiveTarget}
        onClose={() => setArchiveTarget(null)}
        onConfirm={archiveResource}
      />
      <DeleteResourceModal
        resource={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={deleteResource}
      />
    </section>
  );
}
