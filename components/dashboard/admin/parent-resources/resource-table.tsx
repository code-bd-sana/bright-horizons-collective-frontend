import {
  Archive,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  Ellipsis,
  Eye,
  FileText,
  Pencil,
  Trash2,
} from 'lucide-react';
import type { ParentResource } from './parent-resources-types';

type ResourceTableProps = {
  resources: ParentResource[];
  onAction: (action: string, resource: ParentResource) => void;
};

const actions = [
  { label: 'Preview', icon: Eye },
  { label: 'Edit', icon: Pencil },
  { label: 'Duplicate', icon: Copy },
  { label: 'Archive', icon: Archive },
  { label: 'Delete', icon: Trash2 },
] as const;

function StatusBadge({ status }: { status: ParentResource['status'] }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 font-manrope text-xs leading-4 ${status === 'Published' ? 'bg-[#d5e5e5] text-[#174a4d]' : 'bg-[#fce9e3] text-[#8b4b3e]'}`}
    >
      {status}
    </span>
  );
}

function MembershipBadge({ membership }: { membership: string }) {
  return (
    <span className="inline-flex rounded-full bg-[#edf6f2] px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 text-[#2f7d7e] whitespace-nowrap">
      {membership}
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
  return (
    <div className="flex items-center gap-1">
      {actions.map(({ label, icon: Icon }) => (
        <button
          key={label}
          type="button"
          aria-label={`${label} ${resource.title}`}
          onClick={() => onAction(label, resource)}
          className="flex size-7 items-center justify-center rounded-[10px] text-[#607d8b] transition-colors hover:bg-[#e9f1ee] hover:text-[#2f7d7e]"
        >
          <Icon aria-hidden="true" size={14} strokeWidth={1.6} />
        </button>
      ))}
    </div>
  );
}

function ResourceCheckbox({ label }: { label: string }) {
  return (
    <input
      aria-label={label}
      type="checkbox"
      className="size-4 shrink-0 appearance-none rounded-lg border border-[#a8b6bd] bg-white checked:border-[#2f7d7e] checked:bg-[#2f7d7e] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#2f7d7e]"
    />
  );
}

export function ResourceTable({ resources, onAction }: ResourceTableProps) {
  return (
    <div className="flex flex-col gap-6">
      <section className="overflow-hidden rounded-2xl border border-[#e7eceb] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
        <div className="divide-y divide-[#e8ebe8] lg:hidden">
          {resources.map((resource) => (
            <article key={resource.id} className="space-y-4 p-4">
              <div className="flex gap-3">
                <FileText
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-[#2f7d7e]"
                  strokeWidth={1.7}
                />
                <div className="min-w-0">
                  <h2 className="font-nunito text-base font-medium leading-6 text-[#263238]">
                    {resource.title}
                  </h2>
                  <p className="font-manrope text-xs leading-4.5 text-[#6c7787]">
                    {resource.author} · {resource.readTime}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 font-manrope text-xs leading-4.5 text-[#607d8b]">
                <p>
                  Category <span className="mt-1 block text-[#263238]">{resource.category}</span>
                </p>
                <p>
                  Type <span className="mt-1 block text-[#263238]">{resource.type}</span>
                </p>
                <p>
                  Downloads <span className="mt-1 block text-[#263238]">{resource.downloads}</span>
                </p>
                <p>
                  Updated <span className="mt-1 block text-[#263238]">{resource.updatedAt}</span>
                </p>
              </div>
              <div className="flex items-center justify-between gap-3">
                <StatusBadge status={resource.status} />
                <ResourceActions resource={resource} onAction={onAction} />
              </div>
            </article>
          ))}
        </div>
        <div className="hidden overflow-x-auto lg:block">
          <div role="table" className="min-w-379.25">
            <div
              role="row"
              className="grid h-12.25 grid-cols-[280px_107px_77px_152px_64px_77px_77px_156px] justify-between border-b border-[#e7eceb] bg-[#f4f8f6] px-4 font-manrope text-xs font-semibold leading-4.5 text-[#607d8b]"
            >
              <div role="columnheader" className="flex items-center gap-8">
                <ResourceCheckbox label="Select all resources" />
                <span>Resource</span>
              </div>
              <div role="columnheader" className="flex items-center">
                Category
              </div>
              <div role="columnheader" className="flex items-center">
                Type
              </div>
              <div role="columnheader" className="flex items-center">
                Membership
              </div>
              <div role="columnheader" className="flex items-center">
                Downloads
              </div>
              <div role="columnheader" className="flex items-center">
                Status
              </div>
              <div role="columnheader" className="flex items-center">
                Last Updated
              </div>
              <div role="columnheader" className="flex items-center">
                Actions
              </div>
            </div>
            <div role="rowgroup">
              {resources.map((resource, index) => (
                <div
                  key={resource.id}
                  role="row"
                  className={`grid grid-cols-[280px_107px_77px_152px_64px_77px_77px_156px] justify-between border-b border-[#e7eceb] px-4 font-manrope text-sm leading-5.5 text-[#263238] last:border-b-0 ${index === 0 ? 'h-27.5' : 'h-22.25'}`}
                >
                  <div role="cell" className="flex items-center gap-8">
                    <ResourceCheckbox label={`Select ${resource.title}`} />
                    <div className="w-45">
                      <p className="font-manrope text-sm font-semibold leading-5.25 text-[#263238]">
                        {resource.title}
                      </p>
                      <p className="font-manrope text-xs leading-4.5 whitespace-nowrap text-[#607d8b]">
                        {resource.author} · {resource.readTime}
                      </p>
                    </div>
                  </div>
                  <div
                    role="cell"
                    className="flex items-center text-sm leading-5 whitespace-normal"
                  >
                    {resource.category}
                  </div>
                  <div role="cell" className="flex items-center gap-1.5 whitespace-nowrap">
                    <FileText
                      aria-hidden="true"
                      size={14}
                      strokeWidth={1.6}
                      className="text-[#607d8b]"
                    />
                    {resource.type}
                  </div>
                  <div role="cell" className="flex items-center">
                    <MembershipBadge membership={resource.membership} />
                  </div>
                  <div role="cell" className="flex items-center gap-1 text-sm">
                    <Download
                      aria-hidden="true"
                      size={12}
                      strokeWidth={1.7}
                      className="text-[#607d8b]"
                    />
                    {resource.downloads}
                  </div>
                  <div role="cell" className="flex items-center">
                    <StatusBadge status={resource.status} />
                  </div>
                  <div
                    role="cell"
                    className="flex items-center whitespace-nowrap text-xs leading-4.5"
                  >
                    {resource.updatedAt}
                  </div>
                  <div role="cell" className="flex items-center">
                    <ResourceActions resource={resource} onAction={onAction} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <nav
        aria-label="Resource table pagination"
        className="flex w-full justify-center lg:justify-end"
      >
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Previous page"
            className="flex size-10 items-center justify-center rounded-lg text-[#0f172a] transition-colors hover:bg-[#e9f1ee]"
          >
            <ChevronLeft size={16} strokeWidth={1.7} />
          </button>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              type="button"
              aria-current={page === 1 ? 'page' : undefined}
              className={`size-10 rounded-lg font-nunito text-sm font-medium ${page === 1 ? 'bg-[#2f7d7e] text-white' : 'text-[#0f172a] hover:bg-[#e9f1ee]'}`}
            >
              {page}
            </button>
          ))}
          <span
            className="flex size-10 items-center justify-center text-[#0f172a]"
            aria-hidden="true"
          >
            <Ellipsis size={16} strokeWidth={1.7} />
          </span>
          <button
            type="button"
            className="size-10 rounded-lg font-nunito text-sm font-medium text-[#0f172a] hover:bg-[#e9f1ee]"
          >
            10
          </button>
          <button
            type="button"
            aria-label="Next page"
            className="flex size-10 items-center justify-center rounded-lg text-[#0f172a] transition-colors hover:bg-[#e9f1ee]"
          >
            <ChevronRight size={16} strokeWidth={1.7} />
          </button>
        </div>
      </nav>
    </div>
  );
}
