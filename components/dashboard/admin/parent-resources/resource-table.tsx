import { Archive, Copy, Eye, FileText, Pencil, Trash2 } from 'lucide-react';
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

export function ResourceTable({ resources, onAction }: ResourceTableProps) {
  return (
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
        <table className="w-full min-w-300 border-collapse text-left">
          <thead className="border-b border-[#e8ebe8] bg-[#fafcfc]">
            <tr className="font-nunito text-xs font-medium leading-4.5 text-[#607d8b]">
              <th className="w-[25%] px-4 py-4 font-medium">Resource</th>
              <th className="px-4 py-4 font-medium">Category</th>
              <th className="px-4 py-4 font-medium">Type</th>
              <th className="px-4 py-4 font-medium">Membership</th>
              <th className="px-4 py-4 font-medium">Downloads</th>
              <th className="px-4 py-4 font-medium">Status</th>
              <th className="px-4 py-4 font-medium">Last Updated</th>
              <th className="px-4 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e8ebe8]">
            {resources.map((resource) => (
              <tr key={resource.id} className="font-manrope text-sm leading-5.5 text-[#263238]">
                <td className="min-w-70 px-4 py-4">
                  <div className="flex items-center gap-4">
                    <FileText
                      aria-hidden="true"
                      className="size-4 shrink-0 text-[#2f7d7e]"
                      strokeWidth={1.7}
                    />
                    <div>
                      <p className="max-w-52 font-nunito text-sm font-medium leading-5 text-[#263238]">
                        {resource.title}
                      </p>
                      <p className="mt-1 text-xs leading-4.5 text-[#6c7787]">
                        {resource.author} · {resource.readTime}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-4 py-4">{resource.category}</td>
                <td className="whitespace-nowrap px-4 py-4">{resource.type}</td>
                <td className="whitespace-nowrap px-4 py-4">{resource.membership}</td>
                <td className="px-4 py-4">{resource.downloads}</td>
                <td className="px-4 py-4">
                  <StatusBadge status={resource.status} />
                </td>
                <td className="whitespace-nowrap px-4 py-4">{resource.updatedAt}</td>
                <td className="px-4 py-4">
                  <ResourceActions resource={resource} onAction={onAction} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <footer className="flex flex-col gap-3 border-t border-[#e8ebe8] px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-manrope text-xs leading-4.5 text-[#607d8b]">
          Showing {resources.length} of 94 resources
        </p>
        <div className="flex items-center gap-1 self-end">
          <button type="button" className="rounded-lg px-3 py-2 font-nunito text-xs text-[#607d8b]">
            Previous
          </button>
          <button
            type="button"
            className="size-8 rounded-lg bg-[#2f7d7e] font-nunito text-xs text-white"
          >
            1
          </button>
          <button type="button" className="size-8 rounded-lg font-nunito text-xs text-[#607d8b]">
            2
          </button>
          <button type="button" className="size-8 rounded-lg font-nunito text-xs text-[#607d8b]">
            3
          </button>
          <button type="button" className="rounded-lg px-3 py-2 font-nunito text-xs text-[#2f7d7e]">
            Next
          </button>
        </div>
      </footer>
    </section>
  );
}
