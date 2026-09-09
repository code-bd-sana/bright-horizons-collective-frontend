'use client';

import { ArrowLeft, ChevronDown, ExternalLink, Search } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { memberSlug, members, type MembershipTier } from './member-directory-data';

type Plan = MembershipTier | null;

type SubscriptionEvent = {
  memberName: string;
  previousPlan: Plan;
  newPlan: MembershipTier;
  date: string;
  updatedBy: string;
  notes: string;
};

const subscriptionEvents: SubscriptionEvent[] = [
  {
    memberName: 'Amara Okonkwo',
    previousPlan: 'Little Steps',
    newPlan: 'Grow Together',
    date: 'Jan 12, 2025',
    updatedBy: 'Sarah K.',
    notes: 'Family requested upgrade after initial assessment.',
  },
  {
    memberName: 'Wei Chen',
    previousPlan: 'Grow Together',
    newPlan: 'Personalized Pathways',
    date: 'Dec 15, 2024',
    updatedBy: 'James R.',
    notes: 'Eli requires individualized plan support.',
  },
  {
    memberName: 'Lan Nguyen',
    previousPlan: 'Little Steps',
    newPlan: 'Personalized Pathways',
    date: 'Oct 20, 2024',
    updatedBy: 'Sarah K.',
    notes: '—',
  },
  {
    memberName: 'Marcus Williams',
    previousPlan: 'Little Steps',
    newPlan: 'Grow Together',
    date: 'Nov 5, 2024',
    updatedBy: 'James R.',
    notes: 'Upgrade requested via parent portal.',
  },
  {
    memberName: 'Priya Patel',
    previousPlan: 'Little Steps',
    newPlan: 'Grow Together',
    date: 'Mar 7, 2025',
    updatedBy: 'Sarah K.',
    notes: '—',
  },
  {
    memberName: 'Yuki Tanaka',
    previousPlan: null,
    newPlan: 'Little Steps',
    date: 'Jan 28, 2025',
    updatedBy: 'System',
    notes: 'New registration.',
  },
  {
    memberName: 'Elena Martinez',
    previousPlan: null,
    newPlan: 'Little Steps',
    date: 'Feb 3, 2025',
    updatedBy: 'System',
    notes: 'New registration.',
  },
  {
    memberName: 'Fatima Al-Rashid',
    previousPlan: null,
    newPlan: 'Little Steps',
    date: 'Apr 2, 2025',
    updatedBy: 'System',
    notes: 'New registration.',
  },
];

const planStyles: Record<MembershipTier, string> = {
  'Little Steps': 'bg-[#edf6f2] text-[#2f7d7e]',
  'Grow Together': 'bg-[#dcefe7] text-[#2f7d7e]',
  'Personalized Pathways': 'bg-[#fce9e2] text-[#a05a3a]',
};

function PlanBadge({ plan }: { plan: Plan }) {
  if (!plan) {
    return <span className="font-manrope text-[13px] leading-4.875 text-[#b0bec5]">—</span>;
  }

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 ${planStyles[plan]}`}
    >
      {plan}
    </span>
  );
}

function SubscriptionHistoryTable({ events }: { events: SubscriptionEvent[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#e7eceb] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
      <Table className="min-w-292.5 table-fixed border-collapse">
        <colgroup>
          <col className="w-[16.9%]" />
          <col className="w-[15.1%]" />
          <col className="w-[18.2%]" />
          <col className="w-[13.1%]" />
          <col className="w-[12.4%]" />
          <col className="w-[24.3%]" />
        </colgroup>
        <TableHeader className="border-[#e7eceb] bg-[#f4f8f6]">
          <TableRow className="h-10.75 border-[#e7eceb] hover:bg-[#f4f8f6]">
            {['Parent / Family', 'Previous Plan', 'New Plan', 'Date', 'Updated By', 'Notes'].map(
              (heading) => (
                <TableHead
                  key={heading}
                  className="px-5 font-manrope text-xs font-semibold leading-4.5 text-[#607d8b]"
                >
                  {heading}
                </TableHead>
              )
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.length > 0 ? (
            events.map((event) => {
              const member = members.find((item) => item.name === event.memberName);

              return (
                <TableRow
                  key={`${event.memberName}-${event.date}`}
                  className="h-13.25 border-[#e7eceb] hover:bg-[#fbfdfc]"
                >
                  <TableCell className="px-5">
                    {member ? (
                      <Link
                        href={`/dashboard/admin/memberships/member-directory/${memberSlug(member)}`}
                        className="inline-flex items-center gap-2 font-manrope text-sm font-medium leading-5.25 text-[#263238] transition-colors hover:text-[#2f7d7e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f7d7e]"
                      >
                        {event.memberName}
                        <ExternalLink
                          aria-hidden="true"
                          size={12}
                          strokeWidth={1.8}
                          className="text-[#607d8b]"
                        />
                      </Link>
                    ) : (
                      event.memberName
                    )}
                  </TableCell>
                  <TableCell className="px-5">
                    <PlanBadge plan={event.previousPlan} />
                  </TableCell>
                  <TableCell className="px-5">
                    <PlanBadge plan={event.newPlan} />
                  </TableCell>
                  <TableCell className="px-5 font-manrope text-[13px] leading-4.875 text-[#607d8b]">
                    {event.date}
                  </TableCell>
                  <TableCell className="px-5 font-manrope text-[13px] leading-4.875 text-[#607d8b]">
                    {event.updatedBy}
                  </TableCell>
                  <TableCell
                    className={`px-5 font-manrope text-[13px] leading-4.875 ${event.notes === '—' ? 'text-[#b0bec5]' : 'text-[#607d8b]'}`}
                  >
                    {event.notes}
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow className="h-26.5 border-[#e7eceb]">
              <TableCell
                colSpan={6}
                className="px-5 text-center font-manrope text-sm text-[#607d8b]"
              >
                No subscription events match these filters.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function MobileSubscriptionEvents({ events }: { events: SubscriptionEvent[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-2 2xl:hidden">
      {events.map((event) => {
        const member = members.find((item) => item.name === event.memberName);

        return (
          <article
            key={`${event.memberName}-${event.date}`}
            className="rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
          >
            <div className="flex flex-col items-start gap-1 sm:flex-row sm:justify-between sm:gap-3">
              {member ? (
                <Link
                  href={`/dashboard/admin/memberships/member-directory/${memberSlug(member)}`}
                  className="font-manrope text-sm font-semibold text-[#263238] transition-colors hover:text-[#2f7d7e]"
                >
                  {event.memberName}
                </Link>
              ) : (
                <p className="font-manrope text-sm font-semibold text-[#263238]">
                  {event.memberName}
                </p>
              )}
              <p className="shrink-0 font-manrope text-xs text-[#607d8b]">{event.date}</p>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <PlanBadge plan={event.previousPlan} />
              <span className="font-manrope text-xs text-[#607d8b]">to</span>
              <PlanBadge plan={event.newPlan} />
            </div>
            <dl className="mt-3 grid gap-2 border-t border-[#e7eceb] pt-3">
              <div>
                <dt className="font-manrope text-[11px] font-semibold tracking-wider text-[#607d8b] uppercase">
                  Updated By
                </dt>
                <dd className="mt-0.5 font-manrope text-xs text-[#263238]">{event.updatedBy}</dd>
              </div>
              <div>
                <dt className="font-manrope text-[11px] font-semibold tracking-wider text-[#607d8b] uppercase">
                  Notes
                </dt>
                <dd className="mt-0.5 font-manrope text-xs leading-4.5 text-[#607d8b]">
                  {event.notes}
                </dd>
              </div>
            </dl>
          </article>
        );
      })}
      {events.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#cbd8d5] bg-white py-10 text-center font-manrope text-sm text-[#607d8b] md:col-span-2">
          No subscription events match these filters.
        </div>
      ) : null}
    </div>
  );
}

export function SubscriptionHistoryPage() {
  const [search, setSearch] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('all');

  const filteredEvents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return subscriptionEvents.filter((event) => {
      const matchesSearch = !query || event.memberName.toLowerCase().includes(query);
      const matchesPlan =
        selectedPlan === 'all' ||
        event.previousPlan === selectedPlan ||
        event.newPlan === selectedPlan;

      return matchesSearch && matchesPlan;
    });
  }, [search, selectedPlan]);

  return (
    <section className="mx-auto w-full min-w-0 max-w-383.5 pb-8">
      <Link
        href="/dashboard/admin/memberships"
        className="inline-flex items-center gap-1.5 font-manrope text-sm font-medium leading-5 text-[#607d8b] transition-colors hover:text-[#2f7d7e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f7d7e]"
      >
        <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.8} />
        Back to Memberships
      </Link>

      <div className="mt-6">
        <h1 className="font-nunito text-2xl font-bold leading-9 text-[#263238]">
          Subscription History
        </h1>
        <p className="pt-0.5 font-manrope text-sm leading-5.25 text-[#607d8b]">
          Full historical record of membership changes across all families.
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:p-4.25 2xl:p-4.25">
        <div className="grid items-center gap-3 sm:grid-cols-[minmax(0,1fr)_194px] xl:grid-cols-[minmax(0,1fr)_194px_auto] 2xl:flex 2xl:flex-wrap">
          <label className="flex h-9.5 min-w-0 items-center gap-2 rounded-[14px] border border-[#e7eceb] bg-[#f4f8f6] px-3 text-[#607d8b] 2xl:w-212">
            <Search aria-hidden="true" size={15} strokeWidth={1.8} />
            <span className="sr-only">Search subscription history</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by family name..."
              className="min-w-0 flex-1 bg-transparent font-manrope text-sm leading-5 text-[#263238] outline-none placeholder:text-[rgba(38,50,56,0.5)]"
            />
          </label>
          <label className="relative h-9.5 w-full 2xl:w-48.5">
            <span className="sr-only">Filter by membership plan</span>
            <select
              value={selectedPlan}
              onChange={(event) => setSelectedPlan(event.target.value)}
              className="h-full w-full appearance-none rounded-[14px] border border-[#e7eceb] bg-[#f4f8f6] px-3 pr-8 font-manrope text-sm leading-5 text-[#263238] outline-none focus-visible:ring-2 focus-visible:ring-[#2f7d7e]"
            >
              <option value="all">All Plans</option>
              <option value="Little Steps">Little Steps</option>
              <option value="Grow Together">Grow Together</option>
              <option value="Personalized Pathways">Personalized Pathways</option>
            </select>
            <ChevronDown
              aria-hidden="true"
              size={15}
              strokeWidth={1.8}
              className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[#607d8b]"
            />
          </label>
          <p className="font-manrope text-[13px] leading-4.875 text-[#607d8b] sm:col-span-2 xl:col-span-1">
            {filteredEvents.length} events
          </p>
        </div>
      </div>

      <div className="mt-6 hidden 2xl:block">
        <SubscriptionHistoryTable events={filteredEvents} />
      </div>
      <div className="mt-4 2xl:hidden">
        <MobileSubscriptionEvents events={filteredEvents} />
      </div>
    </section>
  );
}
