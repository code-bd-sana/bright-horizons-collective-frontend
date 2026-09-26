'use client';

import { ArrowLeft, ChevronDown, Eye, Loader2, Mail, RefreshCw, Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAdminMemberDirectory, type MemberDirectoryItem } from './hooks/use-admin-memberships';

const tierStyles: Record<string, string> = {
  'Little Steps': 'bg-[#edf6f2] text-[#2f7d7e]',
  'Grow Together': 'bg-[#dcefe7] text-[#2f7d7e]',
  'Personalized Pathways': 'bg-[#fce9e2] text-[#a05a3a]',
  LITTLE_STEPS: 'bg-[#edf6f2] text-[#2f7d7e]',
  GROW_TOGETHER: 'bg-[#dcefe7] text-[#2f7d7e]',
  PERSONALIZED_PATHWAYS: 'bg-[#fce9e2] text-[#a05a3a]',
};

function normalizeTierSlug(slug: string | null): string {
  if (!slug) return 'all';
  const clean = slug.toLowerCase().replace(/[-_ ]/g, '');
  if (clean === 'littlesteps') return 'Little Steps';
  if (clean === 'growtogether') return 'Grow Together';
  if (clean === 'personalizedpathways') return 'Personalized Pathways';
  return 'all';
}

function tierToSlug(tier: string): string {
  if (tier === 'Little Steps') return 'little-steps';
  if (tier === 'Grow Together') return 'grow-together';
  if (tier === 'Personalized Pathways') return 'personalized-pathways';
  return 'all';
}

function formatDate(value?: string | Date | null): string {
  if (!value) return 'N/A';
  try {
    const d = new Date(value);
    if (isNaN(d.getTime())) return String(value);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return String(value);
  }
}

function MembershipTierBadge({ tier }: { tier?: string }) {
  const displayTier = tier || 'Little Steps';
  const style = tierStyles[displayTier] ?? 'bg-[#edf6f2] text-[#2f7d7e]';

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 ${style}`}
    >
      {displayTier}
    </span>
  );
}

function StatusBadge({ status }: { status?: string }) {
  const isPaused = status?.toLowerCase() === 'paused' || status?.toLowerCase() === 'deactivated';
  const style = isPaused ? 'bg-[#fff8e1] text-[#ca8a04]' : 'bg-[#edf6f2] text-[#2f7d7e]';
  const label = isPaused ? 'Paused' : 'Active';

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 ${style}`}
    >
      {label}
    </span>
  );
}

function MemberActions({ member }: { member: MemberDirectoryItem }) {
  return (
    <div className="flex items-center gap-1.5">
      <Link
        href={`/dashboard/admin/memberships/member-directory/${member.id}`}
        aria-label={`View ${member.name}`}
        title="View Member Details"
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e7eceb] text-[#607d8b] transition-colors hover:bg-[#f4f8f6] hover:text-[#2f7d7e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f7d7e]"
      >
        <Eye aria-hidden="true" size={14} strokeWidth={1.8} />
      </Link>
      <a
        href={`mailto:${member.email}`}
        aria-label={`Email ${member.name}`}
        title={`Email ${member.email}`}
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e7eceb] text-[#607d8b] transition-colors hover:bg-[#f4f8f6] hover:text-[#2f7d7e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f7d7e]"
      >
        <Mail aria-hidden="true" size={14} strokeWidth={1.8} />
      </a>
    </div>
  );
}

function DirectoryTable({ directoryMembers }: { directoryMembers: MemberDirectoryItem[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#e7eceb] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
      <Table className="min-w-292.5 table-fixed border-collapse">
        <colgroup>
          <col className="w-[18%]" />
          <col className="w-[12%]" />
          <col className="w-[15%]" />
          <col className="w-[9%]" />
          <col className="w-[11%]" />
          <col className="w-[11%]" />
          <col className="w-[14%]" />
          <col className="w-[10%]" />
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
            <TableRow
              key={member.id || member.email}
              className="h-15.25 border-[#e7eceb] hover:bg-[#fbfdfc]"
            >
              <TableCell className="px-5">
                <div className="flex items-center gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[rgba(47,125,126,0.09)] font-nunito text-xs font-bold leading-4 text-[#2f7d7e]">
                    {member.initials}
                  </span>
                  <div className="min-w-0">
                    <span className="block truncate font-manrope text-sm font-semibold leading-5 text-[#263238]">
                      {member.name}
                    </span>
                    <span className="block truncate font-manrope text-xs text-[#607d8b]">
                      {member.email}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="px-5 font-manrope text-[13px] leading-4.875 text-[#263238]">
                {member.children}
              </TableCell>
              <TableCell className="px-5">
                <MembershipTierBadge tier={member.membershipTier} />
              </TableCell>
              <TableCell className="px-5">
                <StatusBadge status={member.status} />
              </TableCell>
              <TableCell className="px-5 font-manrope text-[13px] leading-4.875 text-[#263238]">
                {formatDate(member.joinDate)}
              </TableCell>
              <TableCell className="px-5 font-manrope text-[13px] leading-4.875 text-[#263238]">
                {member.renewalDate ? formatDate(member.renewalDate) : 'N/A'}
              </TableCell>
              <TableCell className="px-5 font-manrope text-[13px] leading-4.875 text-[#263238]">
                {member.currentPlan || member.membershipTier}
              </TableCell>
              <TableCell className="px-5">
                <MemberActions member={member} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function MobileMemberCards({ directoryMembers }: { directoryMembers: MemberDirectoryItem[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-2 2xl:hidden">
      {directoryMembers.map((member) => (
        <article
          key={member.id || member.email}
          className="rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
        >
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[rgba(47,125,126,0.09)] font-nunito text-xs font-bold text-[#2f7d7e]">
              {member.initials}
            </span>
            <div className="min-w-0">
              <p className="truncate font-manrope text-sm font-semibold text-[#263238]">
                {member.name}
              </p>
              <p className="truncate font-manrope text-xs text-[#607d8b]">
                {member.children || member.email}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <MembershipTierBadge tier={member.membershipTier} />
            <StatusBadge status={member.status} />
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-[#e7eceb] pt-4">
            <div>
              <dt className="font-manrope text-[11px] font-semibold tracking-wider text-[#607d8b] uppercase">
                Joined
              </dt>
              <dd className="mt-1 font-manrope text-xs text-[#263238]">
                {formatDate(member.joinDate)}
              </dd>
            </div>
            <div>
              <dt className="font-manrope text-[11px] font-semibold tracking-wider text-[#607d8b] uppercase">
                Renewal
              </dt>
              <dd className="mt-1 font-manrope text-xs text-[#263238]">
                {member.renewalDate ? formatDate(member.renewalDate) : 'N/A'}
              </dd>
            </div>
            <div className="col-span-2">
              <dt className="font-manrope text-[11px] font-semibold tracking-wider text-[#607d8b] uppercase">
                Current Plan
              </dt>
              <dd className="mt-1 font-manrope text-xs text-[#263238]">
                {member.currentPlan || member.membershipTier}
              </dd>
            </div>
          </dl>
          <div className="mt-4 flex justify-end">
            <MemberActions member={member} />
          </div>
        </article>
      ))}
    </div>
  );
}

export function MemberDirectoryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tierParam = searchParams.get('tier');

  const selectedTier = useMemo(() => normalizeTierSlug(tierParam), [tierParam]);
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const handleTierChange = (newTier: string) => {
    const slug = tierToSlug(newTier);
    if (slug === 'all') {
      router.replace('/dashboard/admin/memberships/member-directory', { scroll: false });
    } else {
      router.replace(`/dashboard/admin/memberships/member-directory?tier=${slug}`, {
        scroll: false,
      });
    }
  };

  const {
    data: memberList = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useAdminMemberDirectory({
    search: search.trim(),
    tier: selectedTier === 'all' ? undefined : selectedTier,
  });

  const filteredMembers = useMemo(() => {
    if (!Array.isArray(memberList)) return [];
    if (selectedStatus === 'all') return memberList;
    return memberList.filter((m) => {
      const s = (m.status || '').toLowerCase();
      return s === selectedStatus.toLowerCase();
    });
  }, [memberList, selectedStatus]);

  return (
    <section className="mx-auto w-full min-w-0 max-w-383.5 pb-8">
      {/* Top Navigation Breadcrumbs */}
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/dashboard/admin/memberships/manage-plans"
          className="inline-flex items-center gap-1.5 font-manrope text-sm font-medium leading-5 text-[#607d8b] transition-colors hover:text-[#2f7d7e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f7d7e]"
        >
          <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.8} />
          Back to Plans
        </Link>
        <span className="text-[#cbd8d5]">•</span>
        <Link
          href="/dashboard/admin/memberships"
          className="font-manrope text-sm font-medium leading-5 text-[#607d8b] transition-colors hover:text-[#2f7d7e]"
        >
          Memberships Overview
        </Link>
      </div>

      {/* Header */}
      <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-nunito text-2xl font-bold leading-9 text-[#263238]">
            Member Directory
            {selectedTier !== 'all' && (
              <span className="ml-2 font-normal text-[#2f7d7e]">— {selectedTier}</span>
            )}
          </h1>
          <p className="pt-0.5 font-manrope text-sm leading-5.25 text-[#607d8b]">
            {selectedTier !== 'all'
              ? `Viewing all families subscribed to the ${selectedTier} plan.`
              : 'All subscribed families across every membership tier.'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => refetch()}
          disabled={isLoading}
          className="inline-flex items-center gap-1.5 self-start rounded-xl border border-[#e7eceb] bg-white px-3 py-1.5 font-manrope text-xs font-semibold text-[#607d8b] shadow-sm transition-colors hover:bg-[#f8fbfa] disabled:opacity-50 sm:self-auto"
        >
          <RefreshCw size={13} className={isLoading ? 'animate-spin' : ''} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="mt-6 rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:p-4.25 2xl:p-4.25">
        <div className="grid items-center gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_210px_130px_auto] 2xl:flex 2xl:flex-wrap">
          <label className="flex h-9.5 min-w-0 items-center gap-2 rounded-[14px] border border-[#e7eceb] bg-[#f4f8f6] px-3 text-[#607d8b] sm:col-span-2 xl:col-span-1 2xl:w-[calc(100%-490px)] 2xl:min-w-107.5">
            <Search aria-hidden="true" size={15} strokeWidth={1.8} />
            <span className="sr-only">Search members</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by parent name, child, or email..."
              className="min-w-0 flex-1 bg-transparent font-manrope text-sm leading-5 text-[#263238] outline-none placeholder:text-[rgba(38,50,56,0.5)]"
            />
          </label>

          <label className="relative h-9.5 w-full 2xl:w-52">
            <span className="sr-only">Filter by membership tier</span>
            <select
              value={selectedTier}
              onChange={(event) => handleTierChange(event.target.value)}
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

          <label className="relative h-9.5 w-full 2xl:w-32">
            <span className="sr-only">Filter by status</span>
            <select
              value={selectedStatus}
              onChange={(event) => setSelectedStatus(event.target.value)}
              className="h-full w-full appearance-none rounded-[14px] border border-[#e7eceb] bg-[#f4f8f6] px-3 pr-7 font-manrope text-sm leading-5 text-[#263238] outline-none focus-visible:ring-2 focus-visible:ring-[#2f7d7e]"
            >
              <option value="all">All Status</option>
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

          <p className="font-manrope text-[13px] font-medium leading-4.875 text-[#607d8b]">
            {filteredMembers.length} {filteredMembers.length === 1 ? 'member' : 'members'}
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      {isLoading ? (
        <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-[#e7eceb] bg-white py-16 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
          <Loader2 className="size-8 animate-spin text-[#2f7d7e]" />
          <p className="mt-3 font-manrope text-sm font-medium text-[#607d8b]">Loading members...</p>
        </div>
      ) : isError ? (
        <div className="mt-6 rounded-2xl border border-dashed border-[#e57373] bg-[#fff5f5] p-8 text-center font-manrope">
          <p className="text-sm font-semibold text-[#c62828]">Failed to load member directory</p>
          <p className="mt-1 text-xs text-[#78909c]">
            {error instanceof Error ? error.message : 'Please check your connection and try again.'}
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-[#2f7d7e] px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#266b6c]"
          >
            <RefreshCw size={12} />
            <span>Try Again</span>
          </button>
        </div>
      ) : filteredMembers.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-[#cbd8d5] bg-white py-12 text-center font-manrope shadow-sm">
          <p className="text-base font-semibold text-[#263238]">No members found</p>
          <p className="mt-1 text-sm text-[#607d8b]">
            {selectedTier !== 'all'
              ? `There are currently no members subscribed to the ${selectedTier} tier.`
              : search
                ? `No members found matching "${search}".`
                : 'No members in the directory yet.'}
          </p>
          {selectedTier !== 'all' && (
            <button
              type="button"
              onClick={() => handleTierChange('all')}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#2f7d7e] px-4 py-2 font-manrope text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#266b6c]"
            >
              View All Members
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="mt-6 hidden 2xl:block">
            <DirectoryTable directoryMembers={filteredMembers} />
          </div>
          <div className="mt-4 2xl:hidden">
            <MobileMemberCards directoryMembers={filteredMembers} />
          </div>

          <footer className="mt-6 flex flex-col items-start gap-4 px-1 pt-1 sm:flex-row sm:items-center sm:justify-between 2xl:flex-row 2xl:items-center 2xl:justify-between">
            <p className="font-manrope text-[13px] leading-4.875 text-[#607d8b]">
              Showing {filteredMembers.length} of {memberList.length} members
            </p>
          </footer>
        </>
      )}
    </section>
  );
}
