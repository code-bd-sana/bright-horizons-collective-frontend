import {
  Activity,
  Archive,
  Blocks,
  ChevronLeft,
  ChevronRight,
  Copy,
  Ellipsis,
  Eye,
  Pencil,
  Trash2,
} from 'lucide-react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { TherapyToy } from './therapy-toys-types';

type TherapyToysTableProps = {
  toys: TherapyToy[];
  onAction: (action: string, toy: TherapyToy) => void;
};

const actions = [
  { label: 'View', icon: Eye },
  { label: 'Edit', icon: Pencil },
  { label: 'Duplicate', icon: Copy },
  { label: 'Archive', icon: Archive },
  { label: 'Delete', icon: Trash2 },
] as const;

const rowHeights = [
  'h-[89px]',
  'h-[89px]',
  'h-[89px]',
  'h-[110px]',
  'h-[110px]',
  'h-[89px]',
  'h-[109px]',
];

function ToyBadge({ children, status = false }: { children: React.ReactNode; status?: boolean }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 ${status ? 'bg-[#edf6f2] text-[#4caf50]' : 'bg-[#edf6f2] text-[#2f7d7e]'}`}
    >
      {children}
    </span>
  );
}

function ToyActions({
  toy,
  onAction,
}: {
  toy: TherapyToy;
  onAction: TherapyToysTableProps['onAction'];
}) {
  return (
    <div className="flex w-39 items-center gap-1">
      {actions.map(({ label, icon: Icon }) => (
        <button
          key={label}
          type="button"
          aria-label={`${label} ${toy.title}`}
          onClick={() => onAction(label, toy)}
          className="flex size-7 items-center justify-center rounded-[10px] text-[#607d8b] transition-colors hover:bg-[#e9f1ee] hover:text-[#2f7d7e]"
        >
          <Icon aria-hidden="true" size={14} strokeWidth={1.6} />
        </button>
      ))}
    </div>
  );
}

function ToyCheckbox({ label }: { label: string }) {
  return (
    <input
      aria-label={label}
      type="checkbox"
      className="size-4 shrink-0 appearance-none rounded-lg border border-[#a8b6bd] bg-white checked:border-[#2f7d7e] checked:bg-[#2f7d7e] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#2f7d7e]"
    />
  );
}

export function TherapyToysTable({ toys, onAction }: TherapyToysTableProps) {
  return (
    <div className="flex flex-col gap-6">
      <section className="overflow-hidden rounded-2xl border border-[#e7eceb] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
        <div className="divide-y divide-[#e7eceb] lg:hidden">
          {toys.map((toy) => (
            <article key={toy.id} className="space-y-4 p-4">
              <div className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-[14px] bg-[rgba(47,125,126,0.09)]">
                  <Blocks
                    aria-hidden="true"
                    size={13}
                    strokeWidth={1.6}
                    className="text-[#2f7d7e]"
                  />
                </span>
                <div className="min-w-0">
                  <h2 className="font-manrope text-sm font-semibold leading-5.25 text-[#263238]">
                    {toy.title}
                  </h2>
                  <p className="font-manrope text-xs leading-4.5 text-[#607d8b]">{toy.brand}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 font-manrope text-xs leading-4.5 text-[#607d8b]">
                <p>
                  Category<span className="mt-1 block text-[#263238]">{toy.category}</span>
                </p>
                <p>
                  Age Range<span className="mt-1 block text-[#263238]">{toy.ageRange}</span>
                </p>
                <p>
                  Primary Skill<span className="mt-1 block text-[#263238]">{toy.primarySkill}</span>
                </p>
                <p>
                  Updated<span className="mt-1 block text-[#263238]">{toy.updatedAt}</span>
                </p>
              </div>
              <div className="flex items-center justify-between gap-3">
                <ToyBadge status>{toy.status}</ToyBadge>
                <ToyActions toy={toy} onAction={onAction} />
              </div>
            </article>
          ))}
        </div>
        <div className="hidden lg:block">
          <Table className="min-w-381.75 table-fixed border-collapse">
            <colgroup>
              <col className="w-71" />
              <col className="w-37.5" />
              <col className="w-41.25" />
              <col className="w-53.5" />
              <col className="w-42.75" />
              <col className="w-40.75" />
              <col className="w-43.75" />
              <col className="w-39" />
            </colgroup>
            <TableHeader className="[&_tr]:border-0">
              <TableRow className="h-12.25 bg-[#f4f8f6] hover:bg-[#f4f8f6]">
                <TableHead className="p-0 pl-4 font-manrope text-xs font-semibold leading-4.5 text-[#607d8b]">
                  <div className="flex items-center justify-between pr-18.5">
                    <ToyCheckbox label="Select all therapy toys" />
                    <span>Toy</span>
                  </div>
                </TableHead>
                {[
                  'Category',
                  'Age Range',
                  'Primary Skill',
                  'Membership',
                  'Status',
                  'Last Updated',
                  'Actions',
                ].map((header) => (
                  <TableHead
                    key={header}
                    className="p-0 font-manrope text-xs font-semibold leading-4.5 text-[#607d8b]"
                  >
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {toys.map((toy, index) => (
                <TableRow
                  key={toy.id}
                  className={`${rowHeights[index % rowHeights.length]} hover:bg-transparent`}
                >
                  <TableCell className="p-0 pl-4 align-middle whitespace-normal">
                    <div className="flex items-center gap-8">
                      <ToyCheckbox label={`Select ${toy.title}`} />
                      <div className="flex items-center gap-3">
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-[14px] bg-[rgba(47,125,126,0.09)]">
                          <Activity
                            aria-hidden="true"
                            size={13}
                            strokeWidth={1.6}
                            className="text-[#2f7d7e]"
                          />
                        </span>
                        <div className="w-28.5">
                          <p className="font-manrope text-sm font-semibold leading-5.25 text-[#263238]">
                            {toy.title}
                          </p>
                          <p className="font-manrope text-xs leading-4.5 text-[#607d8b]">
                            {toy.brand}
                          </p>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="p-0 font-manrope text-[13px] leading-[19.5px] text-[#607d8b]">
                    {toy.category}
                  </TableCell>
                  <TableCell className="p-0 align-middle whitespace-normal">
                    <span className="block w-25 font-manrope text-[13px] leading-[19.5px] text-[#607d8b]">
                      {toy.ageRange}
                    </span>
                  </TableCell>
                  <TableCell className="p-0">
                    <div className="flex items-center gap-1.5 font-manrope text-[13px] leading-[19.5px] text-[#263238]">
                      <Activity
                        aria-hidden="true"
                        size={13}
                        strokeWidth={1.6}
                        className="shrink-0 text-[#2f7d7e]"
                      />
                      <span>{toy.primarySkill}</span>
                    </div>
                  </TableCell>
                  <TableCell className="p-0">
                    <ToyBadge>{toy.membership}</ToyBadge>
                  </TableCell>
                  <TableCell className="p-0">
                    <ToyBadge status={toy.status === 'Published'}>{toy.status}</ToyBadge>
                  </TableCell>
                  <TableCell className="p-0 font-manrope text-xs leading-4.5 text-[#607d8b]">
                    {toy.updatedAt}
                  </TableCell>
                  <TableCell className="p-0">
                    <ToyActions toy={toy} onAction={onAction} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
      <nav
        aria-label="Therapy toy table pagination"
        className="flex w-full justify-center lg:justify-end"
      >
        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled
            className="flex h-10 min-w-20 items-center justify-center gap-1 overflow-hidden rounded-md px-3 py-2 font-manrope text-sm font-medium leading-5.5 tracking-[-0.084px] text-[#0f172a] opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft aria-hidden="true" size={16} strokeWidth={1.7} />
            <span className="px-1">Previous</span>
          </button>
          {[1, 2, 3, 4, 5, 6].map((page) => (
            <button
              key={page}
              type="button"
              aria-current={page === 1 ? 'page' : undefined}
              className={`size-10 rounded-lg border font-manrope text-sm font-medium leading-5.5 tracking-[0.84px] ${page === 1 ? 'border-[#e2e8f0] bg-[#2f7d7e] text-white' : 'border-transparent text-[#0f172a] hover:bg-[#e9f1ee]'}`}
            >
              {page}
            </button>
          ))}
          <span
            aria-hidden="true"
            className="flex size-10 items-center justify-center rounded-lg text-[#0f172a]"
          >
            <Ellipsis size={16} strokeWidth={1.7} />
          </span>
          <button
            type="button"
            className="flex h-10 min-w-20 items-center justify-center gap-1 overflow-hidden rounded-md px-3 py-2 font-manrope text-sm font-medium leading-5.5 tracking-[-0.084px] text-[#0f172a] hover:bg-[#e9f1ee]"
          >
            <span className="px-1">Next</span>
            <ChevronRight aria-hidden="true" size={16} strokeWidth={1.7} />
          </button>
        </div>
      </nav>
    </div>
  );
}
