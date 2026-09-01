'use client';

import { ArrowLeft, ChevronDown, Eye, Pencil, Search, Trash2 } from 'lucide-react';
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

type MembershipTier = 'Little Steps' | 'Grow Together' | 'Personalized Pathways';
type MemberStatus = 'Active' | 'Paused';

type Member = {
  initials: string;
  name: string;
  email: string;
  children: string;
  membershipTier: MembershipTier;
  status: MemberStatus;
  joinDate: string;
  renewalDate: string;
  currentPlan: 'Not Started' | 'In Progress' | 'Completed' | 'Paused';
};

const members: Member[] = [
  {
    initials: 'AO',
    name: 'Amara Okonkwo',
    email: 'amara.okonkwo@example.com',
    children: 'Zara, Kofi',
    membershipTier: 'Grow Together',
    status: 'Active',
    joinDate: 'Jan 12, 2025',
    renewalDate: 'Jan 12, 2026',
    currentPlan: 'In Progress',
  },
  {
    initials: 'EM',
    name: 'Elena Martinez',
    email: 'elena.martinez@example.com',
    children: 'Sofia',
    membershipTier: 'Little Steps',
    status: 'Active',
    joinDate: 'Feb 3, 2025',
    renewalDate: 'Feb 3, 2026',
    currentPlan: 'Not Started',
  },
  {
    initials: 'WC',
    name: 'Wei Chen',
    email: 'wei.chen@example.com',
    children: 'Eli',
    membershipTier: 'Personalized Pathways',
    status: 'Active',
    joinDate: 'Dec 15, 2024',
    renewalDate: 'Dec 15, 2025',
    currentPlan: 'In Progress',
  },
  {
    initials: 'PP',
    name: 'Priya Patel',
    email: 'priya.patel@example.com',
    children: 'Mia, Arjun',
    membershipTier: 'Grow Together',
    status: 'Active',
    joinDate: 'Mar 7, 2025',
    renewalDate: 'Mar 7, 2026',
    currentPlan: 'In Progress',
  },
  {
    initials: 'YT',
    name: 'Yuki Tanaka',
    email: 'yuki.tanaka@example.com',
    children: 'Ren',
    membershipTier: 'Little Steps',
    status: 'Active',
    joinDate: 'Jan 28, 2025',
    renewalDate: 'Jan 28, 2026',
    currentPlan: 'Completed',
  },
  {
    initials: 'MW',
    name: 'Marcus Williams',
    email: 'marcus.williams@example.com',
    children: 'Jade',
    membershipTier: 'Grow Together',
    status: 'Active',
    joinDate: 'Nov 5, 2024',
    renewalDate: 'Nov 5, 2025',
    currentPlan: 'In Progress',
  },
  {
    initials: 'LN',
    name: 'Lan Nguyen',
    email: 'lan.nguyen@example.com',
    children: 'Linh, Bao',
    membershipTier: 'Personalized Pathways',
    status: 'Paused',
    joinDate: 'Oct 20, 2024',
    renewalDate: 'Oct 20, 2025',
    currentPlan: 'Paused',
  },
  {
    initials: 'FA',
    name: 'Fatima Al-Rashid',
    email: 'fatima.alrashid@example.com',
    children: 'Omar',
    membershipTier: 'Little Steps',
    status: 'Active',
    joinDate: 'Apr 2, 2025',
    renewalDate: 'Apr 2, 2026',
    currentPlan: 'Not Started',
  },
];

const tierStyles: Record<MembershipTier, string> = {
  'Little Steps': 'bg-[#edf6f2] text-[#2f7d7e]',
  'Grow Together': 'bg-[#dcefe7] text-[#2f7d7e]',
  'Personalized Pathways': 'bg-[#fce9e2] text-[#a05a3a]',
};

function MembershipTierBadge({ tier }: { tier: MembershipTier }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 ${tierStyles[tier]}`}
    >
      {tier}
    </span>
  );
}

function StatusBadge({ status }: { status: MemberStatus }) {
  const style = status === 'Active' ? 'bg-[#edf6f2] text-[#2f7d7e]' : 'bg-[#fff8e1] text-[#ca8a04]';

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 ${style}`}
    >
      {status}
    </span>
  );
}

function MemberActions({ name }: { name: string }) {
  const actions = [
    { label: `View ${name}`, icon: Eye },
    { label: `Edit ${name}`, icon: Pencil },
    { label: `Remove ${name}`, icon: Trash2 },
  ];

  return (
    <div className="flex items-center gap-1">
      {actions.map(({ label, icon: Icon }) => (
        <button
          key={label}
          type="button"
          aria-label={label}
          className="flex size-7 items-center justify-center rounded-[10px] text-[#607d8b] transition-colors hover:bg-[#f4f8f6] hover:text-[#2f7d7e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f7d7e]"
        >
          <Icon aria-hidden="true" size={14} strokeWidth={1.6} />
        </button>
      ))}
    </div>
  );
}

function DirectoryTable({ directoryMembers }: { directoryMembers: Member[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#e7eceb] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
      <Table className="min-w-292.5 table-fixed border-collapse">
        <colgroup>
          <col className="w-[16%]" />
          <col className="w-[10%]" />
          <col className="w-[16%]" />
          <col className="w-[10%]" />
          <col className="w-[12%]" />
          <col className="w-[12%]" />
          <col className="w-[12%]" />
          <col className="w-[6%]" />
        </colgroup>
        <TableHeader className="border-[#e7eceb] bg-[#f4f8f6]">
          <TableRow className="h-10.75 border-[#e7eceb] hover:bg-[#f4f8f6]">
            {[
              'Parent Name',
              'Children',
              'Membership Tier',
              'Status',
              'Join Date',
              'Renewal Date',
              'Current Plan',
              'Actions',
            ].map((heading) => (
              <TableHead
                key={heading}
                className="px-5 font-manrope text-xs font-semibold leading-4.5 text-[#607d8b]"
              >
                {heading}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {directoryMembers.map((member) => (
            <TableRow key={member.email} className="h-15.25 border-[#e7eceb] hover:bg-[#fbfdfc]">
              <TableCell className="px-5">
                <div className="flex items-center gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[rgba(47,125,126,0.09)] font-nunito text-xs font-bold leading-4 text-[#2f7d7e]">
                    {member.initials}
                  </span>
                  <span className="truncate font-manrope text-sm font-semibold leading-5.25 text-[#263238]">
                    {member.name}
                  </span>
                </div>
              </TableCell>
              <TableCell className="px-5 font-manrope text-[13px] leading-[19.5px] text-[#263238]">
                {member.children}
              </TableCell>
              <TableCell className="px-5">
                <MembershipTierBadge tier={member.membershipTier} />
              </TableCell>
              <TableCell className="px-5">
                <StatusBadge status={member.status} />
              </TableCell>
              <TableCell className="px-5 font-manrope text-[13px] leading-[19.5px] text-[#263238]">
                {member.joinDate}
              </TableCell>
              <TableCell className="px-5 font-manrope text-[13px] leading-[19.5px] text-[#263238]">
                {member.renewalDate}
              </TableCell>
              <TableCell className="px-5 font-manrope text-[13px] leading-[19.5px] text-[#263238]">
                {member.currentPlan}
              </TableCell>
              <TableCell className="px-3">
                <MemberActions name={member.name} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function MobileMemberCards({ directoryMembers }: { directoryMembers: Member[] }) {
  return (
    <div className="space-y-3 lg:hidden">
      {directoryMembers.map((member) => (
        <article
          key={member.email}
          className="rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[rgba(47,125,126,0.09)] font-nunito text-xs font-bold text-[#2f7d7e]">
                {member.initials}
              </span>
              <div className="min-w-0">
                <p className="truncate font-manrope text-sm font-semibold text-[#263238]">
                  {member.name}
                </p>
                <p className="truncate font-manrope text-xs text-[#607d8b]">{member.children}</p>
              </div>
            </div>
            <MemberActions name={member.name} />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <MembershipTierBadge tier={member.membershipTier} />
            <StatusBadge status={member.status} />
          </div>
        </article>
      ))}
    </div>
  );
}

export function MemberDirectoryPage() {
  const [search, setSearch] = useState('');
  const [selectedTier, setSelectedTier] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredMembers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return members.filter((member) => {
      const searchableText = `${member.name} ${member.email} ${member.children}`.toLowerCase();
      const hasQueryMatch = !query || searchableText.includes(query);
      const hasTierMatch = selectedTier === 'all' || member.membershipTier === selectedTier;
      const hasStatusMatch = selectedStatus === 'all' || member.status === selectedStatus;

      return hasQueryMatch && hasTierMatch && hasStatusMatch;
    });
  }, [search, selectedStatus, selectedTier]);

  return (
    <section className="mx-auto w-full max-w-383.5 pb-8">
      <Link
        href="/dashboard/admin/memberships"
        className="inline-flex items-center gap-1.5 font-manrope text-sm font-medium leading-5 text-[#607d8b] transition-colors hover:text-[#2f7d7e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f7d7e]"
      >
        <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.8} />
        Back to Memberships
      </Link>

      <div className="mt-6">
        <h1 className="font-nunito text-2xl font-bold leading-9 text-[#263238]">
          Member Directory
        </h1>
        <p className="pt-0.5 font-manrope text-sm leading-5.25 text-[#607d8b]">
          All subscribed families across every membership tier.
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-[#e7eceb] bg-white p-4.25 shadow-[0_4px_6px_rgba(0,0,0,0.06)]">
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex h-9.5 w-full items-center gap-2 rounded-[14px] border border-[#e7eceb] bg-[#f4f8f6] px-3 text-[#607d8b] lg:w-[calc(100%-477px)] lg:min-w-107.5">
            <Search aria-hidden="true" size={15} strokeWidth={1.8} />
            <span className="sr-only">Search members</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by parent name, child, or email..."
              className="min-w-0 flex-1 bg-transparent font-manrope text-sm leading-5 text-[#263238] outline-none placeholder:text-[rgba(38,50,56,0.5)]"
            />
          </label>

          <label className="relative h-9.5 w-full sm:w-48.5">
            <span className="sr-only">Filter by membership tier</span>
            <select
              value={selectedTier}
              onChange={(event) => setSelectedTier(event.target.value)}
              className="h-full w-full appearance-none rounded-[14px] border border-[#e7eceb] bg-[#f4f8f6] px-3 pr-8 font-manrope text-sm leading-5 text-[#263238] outline-none focus-visible:ring-2 focus-visible:ring-[#2f7d7e]"
            >
              <option value="all">All Tiers</option>
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

          <label className="relative h-9.5 w-full sm:w-27.75">
            <span className="sr-only">Filter by status</span>
            <select
              value={selectedStatus}
              onChange={(event) => setSelectedStatus(event.target.value)}
              className="h-full w-full appearance-none rounded-[14px] border border-[#e7eceb] bg-[#f4f8f6] px-3 pr-7 font-manrope text-sm leading-5 text-[#263238] outline-none focus-visible:ring-2 focus-visible:ring-[#2f7d7e]"
            >
              <option value="all">All</option>
              <option value="Active">Active</option>
              <option value="Paused">Paused</option>
            </select>
            <ChevronDown
              aria-hidden="true"
              size={15}
              strokeWidth={1.8}
              className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-[#607d8b]"
            />
          </label>

          <p className="font-manrope text-[13px] leading-[19.5px] text-[#607d8b]">
            {filteredMembers.length} members
          </p>
        </div>
      </div>

      <div className="mt-6 hidden lg:block">
        <DirectoryTable directoryMembers={filteredMembers} />
      </div>
      <div className="mt-4 lg:hidden">
        <MobileMemberCards directoryMembers={filteredMembers} />
      </div>

      {filteredMembers.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-[#cbd8d5] bg-white py-10 text-center font-manrope text-sm text-[#607d8b]">
          No members match these filters.
        </div>
      ) : null}

      <footer className="mt-6 flex items-center justify-between gap-4 px-1 pt-1">
        <p className="font-manrope text-[13px] leading-[19.5px] text-[#607d8b]">
          Showing {filteredMembers.length} of {members.length} members
        </p>
        <nav className="flex items-center gap-2" aria-label="Member directory pages">
          <button
            type="button"
            aria-current="page"
            className="flex size-8 items-center justify-center rounded-[10px] bg-[#2f7d7e] font-manrope text-sm font-medium leading-5 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f7d7e]"
          >
            1
          </button>
          <button
            type="button"
            className="flex size-8 items-center justify-center rounded-[10px] bg-[#f4f8f6] font-manrope text-sm font-medium leading-5 text-[#607d8b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f7d7e]"
          >
            2
          </button>
        </nav>
      </footer>
    </section>
  );
}
