'use client';
import { Archive, ChevronLeft, ChevronRight, ClipboardList, Copy, Eye, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { AdminWeeklyPlan } from './weekly-plans-data';

export function WeeklyPlansTable({
  plans,
  onAction,
}: {
  plans: AdminWeeklyPlan[];
  onAction: (action: string, plan: AdminWeeklyPlan) => void;
}) {
  const badge = (plan: AdminWeeklyPlan) =>
    plan.status === 'Published'
      ? 'bg-[#edf6f2] text-[#2f7d7e]'
      : plan.status === 'Draft'
        ? 'bg-[#fff8e1] text-[#b8860b]'
        : 'bg-[#fce9e3] text-[#916d5f]';
  const membership = (value: AdminWeeklyPlan['membership']) =>
    value === 'Little Steps'
      ? 'bg-[#d4d6d7] text-[#515b60]'
      : value === 'Grow Together'
        ? 'bg-[#dcefe7] text-[#2f7d7e]'
        : 'bg-[#fce9e2] text-[#a05a3a]';
  return (
    <div className="flex min-w-0 flex-col gap-6">
      <section className="grid gap-3 2xl:hidden">
        {plans.map((plan) => (
          <article
            key={plan.id}
            className="min-w-0 rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
          >
            <div className="flex min-w-0 items-start gap-3">
              <input
                aria-label={`Select ${plan.title}`}
                type="checkbox"
                className="mt-1 size-4 shrink-0 accent-[#2f7d7e]"
              />
              <span className="flex size-9 shrink-0 items-center justify-center rounded-[14px] bg-[#edf6f2] text-[#2f7d7e]">
                <ClipboardList aria-hidden="true" size={16} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-manrope text-sm font-semibold leading-5.25 text-[#263238]">
                  {plan.title}
                </p>
                <p className="font-manrope text-xs leading-4.5 text-[#607d8b]">{plan.week}</p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-0.5 font-manrope text-xs font-semibold ${badge(plan)}`}
              >
                {plan.status}
              </span>
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-3 rounded-[14px] bg-[#f4f8f6] p-3 sm:grid-cols-4 xl:grid-cols-4">
              <div className="min-w-0">
                <dt className="font-manrope text-[11px] font-semibold uppercase tracking-[0.55px] text-[#607d8b]">
                  Age Group
                </dt>
                <dd className="mt-0.5 font-manrope text-xs text-[#263238]">{plan.age}</dd>
              </div>
              <div className="min-w-0">
                <dt className="font-manrope text-[11px] font-semibold uppercase tracking-[0.55px] text-[#607d8b]">
                  Activities
                </dt>
                <dd className="mt-0.5 font-manrope text-xs text-[#263238]">{plan.activities}</dd>
              </div>
              <div className="min-w-0">
                <dt className="font-manrope text-[11px] font-semibold uppercase tracking-[0.55px] text-[#607d8b]">
                  Assigned
                </dt>
                <dd className="mt-0.5 font-manrope text-xs text-[#263238]">{plan.assigned}</dd>
              </div>
              <div className="min-w-0">
                <dt className="font-manrope text-[11px] font-semibold uppercase tracking-[0.55px] text-[#607d8b]">
                  Updated
                </dt>
                <dd className="mt-0.5 font-manrope text-xs text-[#263238]">{plan.updated}</dd>
              </div>
            </dl>

            <div className="mt-4 flex flex-col gap-3 border-t border-[#e7eceb] pt-3 sm:flex-row sm:items-center sm:justify-between">
              <span
                className={`w-fit rounded-full px-2.5 py-0.5 font-manrope text-xs font-semibold ${membership(plan.membership)}`}
              >
                {plan.membership}
              </span>
              <div className="grid grid-cols-4 gap-2 sm:flex">
                {[
                  [Eye, 'View'],
                  [Copy, 'Copy'],
                  [Archive, 'Archive'],
                  [Trash2, 'Delete'],
                ].map(([Icon, label]) => {
                  const ActionIcon = Icon as typeof Eye;
                  return (
                    <button
                      key={label as string}
                      type="button"
                      aria-label={`${label} ${plan.title}`}
                      onClick={() => onAction(label as string, plan)}
                      className="flex h-9 items-center justify-center gap-1.5 rounded-xl border border-[#e7eceb] px-2 font-manrope text-xs font-medium text-[#607d8b] hover:bg-[#e9f1ee]"
                    >
                      <ActionIcon aria-hidden="true" size={14} />
                      <span className="hidden sm:inline">{label as string}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </article>
        ))}
        {plans.length === 0 ? (
          <div className="rounded-2xl border border-[#e7eceb] bg-white p-8 text-center font-manrope text-sm text-[#607d8b]">
            No weekly plans match these filters.
          </div>
        ) : null}
      </section>

      <section className="hidden overflow-x-auto rounded-2xl border border-[#e7eceb] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)] 2xl:block">
        <Table className="min-w-381.75 table-fixed border-collapse">
          <colgroup>
            <col className="w-67" />
            {Array.from({ length: 7 }).map((_, i) => (
              <col key={i} className="w-43.5" />
            ))}
          </colgroup>
          <TableHeader>
            <TableRow className="h-12.25 bg-[#f4f8f6] hover:bg-[#f4f8f6]">
              <TableHead className="pl-4 font-manrope text-xs font-semibold text-[#607d8b]">
                <span className="flex gap-3">
                  <input
                    aria-label="Select all plans"
                    type="checkbox"
                    className="size-4 accent-[#2f7d7e]"
                  />
                  Plan Name
                </span>
              </TableHead>
              {[
                'Age Group',
                'Activities',
                'Membership',
                'Assigned',
                'Status',
                'Last Updated',
                'Actions',
              ].map((header) => (
                <TableHead
                  key={header}
                  className="font-manrope text-xs font-semibold text-[#607d8b]"
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {plans.map((plan) => (
              <TableRow key={plan.id} className="h-21.75 hover:bg-transparent">
                <TableCell className="pl-4">
                  <div className="flex gap-3">
                    <input
                      aria-label={`Select ${plan.title}`}
                      type="checkbox"
                      className="mt-3 size-4 accent-[#2f7d7e]"
                    />
                    <ClipboardList size={16} className="mt-3 shrink-0 text-[#2f7d7e]" />
                    <div>
                      <p className="font-manrope text-sm font-semibold leading-5.25 text-[#263238]">
                        {plan.title}
                      </p>
                      <p className="font-manrope text-xs text-[#607d8b]">{plan.week}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-manrope text-xs text-[#607d8b]">{plan.age}</TableCell>
                <TableCell className="font-manrope text-xs text-[#263238]">
                  {plan.activities}
                </TableCell>
                <TableCell>
                  <span
                    className={`rounded-full px-2.5 py-0.5 font-manrope text-xs font-semibold ${membership(plan.membership)}`}
                  >
                    {plan.membership}
                  </span>
                </TableCell>
                <TableCell className="font-manrope text-xs text-[#263238]">
                  {plan.assigned}
                </TableCell>
                <TableCell>
                  <span
                    className={`rounded-full px-2.5 py-0.5 font-manrope text-xs font-semibold ${badge(plan)}`}
                  >
                    {plan.status}
                  </span>
                </TableCell>
                <TableCell className="font-manrope text-xs text-[#263238]">
                  {plan.updated}
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {[
                      [Eye, 'View'],
                      [Copy, 'Copy'],
                      [Archive, 'Archive'],
                      [Trash2, 'Delete'],
                    ].map(([Icon, label]) => {
                      const ActionIcon = Icon as typeof Eye;
                      return (
                        <button
                          key={label as string}
                          type="button"
                          aria-label={`${label} ${plan.title}`}
                          onClick={() => onAction(label as string, plan)}
                          className="flex size-7 items-center justify-center rounded-[10px] text-[#607d8b] hover:bg-[#e9f1ee]"
                        >
                          <ActionIcon size={14} />
                        </button>
                      );
                    })}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
      <nav className="flex max-w-full justify-start gap-1 overflow-x-auto pb-1 font-manrope text-sm sm:justify-end 2xl:justify-end 2xl:overflow-visible 2xl:pb-0">
        <button
          type="button"
          disabled
          className="flex h-10 shrink-0 items-center gap-1 px-2 opacity-50 sm:px-3"
        >
          <ChevronLeft size={16} />
          Previous
        </button>
        {[1, 2, 3, 4, 5, 6].map((page) => (
          <button
            key={page}
            type="button"
            className={
              page === 1 ? 'size-10 rounded-lg bg-[#2f7d7e] text-white' : 'size-10 rounded-lg'
            }
          >
            {page}
          </button>
        ))}
        <button type="button" className="flex h-10 shrink-0 items-center gap-1 px-2 sm:px-3">
          Next
          <ChevronRight size={16} />
        </button>
      </nav>
    </div>
  );
}
