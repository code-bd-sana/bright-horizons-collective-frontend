'use client';

import {
  Archive,
  BadgeCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  Eye,
  Loader2,
  Mail,
  Pencil,
  RefreshCw,
  Search,
  Trash,
  Users,
  WalletCards,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';

import { DeactivateFamilyModal } from './deactivate-family-modal';
import { useAdminFamilies, useAdminFamilyStats, type FamilyItem } from './hooks/use-admin-families';

const tierBadgeStyles: Record<string, string> = {
  'Little Steps': 'bg-[#edf6f2] text-[#2f7d7e]',
  'Grow Together': 'bg-[#dcefe7] text-[#2f7d7e]',
  'Personalized Pathways': 'bg-[#fce9e3] text-[#916d5f]',
  LITTLE_STEPS: 'bg-[#edf6f2] text-[#2f7d7e]',
  GROW_TOGETHER: 'bg-[#dcefe7] text-[#2f7d7e]',
  PERSONALIZED_PATHWAYS: 'bg-[#fce9e3] text-[#916d5f]',
};

function MembershipBadge({ membership }: { membership: string }) {
  const style = tierBadgeStyles[membership] || 'bg-[#edf6f2] text-[#2f7d7e]';
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 ${style}`}
    >
      {membership}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const isActive = status?.toLowerCase() === 'active';
  return (
    <span
      className={
        isActive
          ? 'inline-flex rounded-full bg-[#edf6f2] px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 text-[#4caf50]'
          : 'inline-flex rounded-full bg-[#fef2f2] px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 text-[#dc2626]'
      }
    >
      {isActive ? 'Active' : 'Inactive'}
    </span>
  );
}

function formatDate(dateStr?: string | Date | null): string {
  if (!dateStr) return 'N/A';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return String(dateStr);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return String(dateStr);
  }
}

function getInitials(name?: string, email?: string): string {
  if (name && name.trim()) {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }
  if (email && email.trim()) {
    return email.slice(0, 2).toUpperCase();
  }
  return 'FA';
}

function FamilyFilterDropdown({
  label,
  value,
  options,
  onChange,
  width,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  width: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const close = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  return (
    <div ref={ref} className={`relative w-full ${width}`}>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={() => setIsOpen((open) => !open)}
        className={`flex h-9.5 w-full items-center justify-between rounded-[14px] border px-2 font-manrope text-[13px] leading-5 transition-colors ${isOpen ? 'border-[#d5e5e5] bg-[#d5e5e5] text-[#0f1416]' : 'border-[#e7eceb] bg-[#f4f8f6] text-[#607d8b] hover:border-[#accbcb]'}`}
      >
        <span className="truncate">{value === 'all' ? label : value}</span>
        <ChevronDown
          aria-hidden="true"
          className={`size-3.5 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          strokeWidth={1.6}
        />
      </button>
      {isOpen && (
        <div
          role="listbox"
          aria-label={`${label} options`}
          className="absolute left-0 top-[calc(100%+8px)] z-30 w-full min-w-40 rounded-2xl border border-[#e8ebe8] bg-white p-3 shadow-[0_8px_12px_rgba(38,50,56,0.12)]"
        >
          <div className="flex flex-col gap-2.5">
            {['all', ...options].map((option) => (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={option === value}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`flex min-h-9 w-full items-center rounded-lg px-3 py-2 text-left font-nunito text-sm font-medium leading-5 tracking-[-0.084px] transition-colors ${option === value ? 'bg-[#e9f1ee] text-[#174a4d]' : 'text-[#263238] hover:bg-[#f4f8f6]'}`}
              >
                {option === 'all' ? 'All' : option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const ITEMS_PER_PAGE = 10;

export function FamiliesPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [membership, setMembership] = useState('all');
  const [status, setStatus] = useState('all');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deactivateTarget, setDeactivateTarget] = useState<FamilyItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: families = [], isLoading, isError, error, refetch } = useAdminFamilies();

  const { data: statsData } = useAdminFamilyStats();

  const stats = useMemo(() => {
    if (statsData) return statsData;
    const totalFamilies = families.length;
    const activeChildren = families.reduce(
      (acc, f) => acc + (Array.isArray(f.children) ? f.children.length : 0),
      0
    );
    const activeMemberships = families.filter(
      (f) => (f.status || '').toLowerCase() === 'active'
    ).length;

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const newThisMonth = families.filter((f) => {
      const d = new Date(f.registrationDate);
      return (
        !isNaN(d.getTime()) && d.getMonth() === currentMonth && d.getFullYear() === currentYear
      );
    }).length;

    return {
      totalFamilies,
      activeChildren,
      activeMemberships,
      newThisMonth,
    };
  }, [families, statsData]);

  const summaryCards = [
    {
      value: stats.totalFamilies.toString(),
      label: 'Total Families',
      icon: Users,
      className: 'border-[#dcfce7] bg-[#f0fdf4] text-[#4caf50]',
    },
    {
      value: stats.activeChildren.toString(),
      label: 'Active Children',
      icon: Users,
      className: 'border-[#fef9c3] bg-[#fefce8] text-[#b78b16]',
    },
    {
      value: stats.activeMemberships.toString(),
      label: 'Active Memberships',
      icon: WalletCards,
      className: 'border-[#ffedd5] bg-[#fff7ed] text-[#ea7b33]',
    },
    {
      value: stats.newThisMonth.toString(),
      label: 'New This Month',
      icon: BadgeCheck,
      className: 'border-[#dbeafe] bg-[#ecfeff] text-[#2f7d7e]',
    },
  ];

  const filteredFamilies = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return families.filter((family) => {
      const matchesMembership =
        membership === 'all' ||
        family.membership?.toLowerCase() === membership.toLowerCase() ||
        family.tierKey?.toLowerCase() === membership.toLowerCase().replace(/[- ]/g, '_');

      const matchesStatus =
        status === 'all' ||
        (status === 'Active' && family.status?.toLowerCase() === 'active') ||
        (status === 'Inactive' && family.status?.toLowerCase() !== 'active');

      const searchableChildren = Array.isArray(family.children) ? family.children.join(' ') : '';
      const searchableText =
        `${family.name} ${family.email} ${family.phone} ${searchableChildren}`.toLowerCase();
      const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery);

      return matchesMembership && matchesStatus && matchesQuery;
    });
  }, [families, membership, query, status]);

  const totalPages = Math.max(1, Math.ceil(filteredFamilies.length / ITEMS_PER_PAGE));
  const paginatedFamilies = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredFamilies.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredFamilies, currentPage]);

  const allSelected =
    paginatedFamilies.length > 0 &&
    paginatedFamilies.every((family) => selectedIds.includes(family.id));

  const toggleSelection = (id: string) =>
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((selectedId) => selectedId !== id) : [...current, id]
    );

  const action = (label: string, family: FamilyItem) => {
    if (label === 'View') {
      router.push(`/dashboard/admin/families/${family.id}`);
      return;
    }
    toast.success(`${label} action for ${family.name}.`);
  };

  return (
    <section className="mx-auto w-full min-w-0 max-w-383.5 pb-8 text-[#263238]">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-nunito text-2xl font-bold leading-8 tracking-[-0.4px] text-[#263238] sm:text-[32px] sm:leading-10 2xl:text-[40px] 2xl:leading-12">
            Families
          </h1>
          <p className="mt-0.5 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#6c7787]">
            Manage registered families, parent accounts, memberships, and child profiles.
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
      </header>

      {/* Summary Cards */}
      <div className="mt-8 grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4">
        {summaryCards.map(({ value, label, icon: Icon, className }) => (
          <article
            key={label}
            className="flex min-h-28 min-w-0 items-center rounded-2xl border border-[#e8ebe8] bg-white p-4 shadow-[0_1px_1px_rgba(0,0,0,0.05)] 2xl:h-38.5"
          >
            <span
              className={`mr-3 flex size-8 shrink-0 items-center justify-center rounded-lg border ${className}`}
            >
              <Icon aria-hidden="true" size={18} strokeWidth={1.7} />
            </span>
            <div className="min-w-0">
              <p className="font-nunito text-2xl font-bold leading-8 text-[#272f3a]">{value}</p>
              <p className="font-manrope text-sm font-medium leading-5.5 tracking-[0.084px] text-[#6c7787]">
                {label}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="mt-8 min-w-0 rounded-2xl border border-[#e7eceb] bg-white p-4.25 shadow-[0_4px_6px_rgba(0,0,0,0.06)]">
        <div className="grid gap-3 sm:grid-cols-2 xl:flex xl:flex-row 2xl:flex 2xl:flex-row">
          <label className="flex h-9.5 min-w-0 flex-1 items-center gap-2 rounded-[14px] border border-[#e7eceb] bg-[#f4f8f6] px-3 sm:col-span-2 xl:col-span-1 2xl:col-span-1">
            <Search aria-hidden="true" size={15} className="shrink-0 text-[#607d8b]" />
            <span className="sr-only">Search families</span>
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by parent name, email, phone, or child..."
              className="min-w-0 flex-1 bg-transparent font-manrope text-sm text-[#263238] outline-none placeholder:text-[rgba(38,50,56,0.5)]"
            />
          </label>
          <FamilyFilterDropdown
            label="Membership"
            value={membership}
            onChange={(val) => {
              setMembership(val);
              setCurrentPage(1);
            }}
            options={['Little Steps', 'Grow Together', 'Personalized Pathways']}
            width="xl:w-48.5 2xl:w-48.5"
          />
          <FamilyFilterDropdown
            label="Status"
            value={status}
            onChange={(val) => {
              setStatus(val);
              setCurrentPage(1);
            }}
            options={['Active', 'Inactive']}
            width="xl:w-27.5 2xl:w-27.5"
          />
        </div>
      </div>

      {/* Main Content */}
      {isLoading ? (
        <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-[#e8ebe8] bg-white py-16 shadow-sm">
          <Loader2 className="size-8 animate-spin text-[#2f7d7e]" />
          <p className="mt-3 font-manrope text-sm font-medium text-[#607d8b]">
            Loading families...
          </p>
        </div>
      ) : isError ? (
        <div className="mt-6 rounded-2xl border border-dashed border-[#e57373] bg-[#fff5f5] p-8 text-center font-manrope">
          <p className="text-sm font-semibold text-[#c62828]">Failed to load families</p>
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
      ) : (
        <>
          {/* Mobile View */}
          <section className="mt-6 grid gap-3 xl:grid-cols-2 2xl:hidden">
            {paginatedFamilies.map((family) => {
              const initials = family.initials || getInitials(family.name, family.email);
              return (
                <article
                  key={family.id}
                  className="min-w-0 rounded-2xl border border-[#e8ebe8] bg-white p-4 shadow-[0_1px_1.5px_rgba(0,0,0,0.1),0_1px_1px_rgba(0,0,0,0.1)]"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <input
                      aria-label={`Select ${family.name}`}
                      type="checkbox"
                      checked={selectedIds.includes(family.id)}
                      onChange={() => toggleSelection(family.id)}
                      className="mt-1 size-4 shrink-0 accent-[#2f7d7e]"
                    />
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#edf6f2] font-nunito text-xs font-bold text-[#2f7d7e]">
                      {initials}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-nunito text-sm font-semibold leading-5 text-[#263238]">
                        {family.name}
                      </p>
                      <p className="font-manrope text-[13px] leading-5 text-[#607d8b]">
                        {family.relationship}
                      </p>
                    </div>
                    <StatusBadge status={family.status} />
                  </div>

                  <dl className="mt-4 grid gap-3 rounded-[14px] bg-[#f4f8f6] p-3 sm:grid-cols-2">
                    <div className="min-w-0">
                      <dt className="font-manrope text-[11px] font-semibold tracking-[0.55px] text-[#607d8b] uppercase">
                        Email
                      </dt>
                      <dd className="mt-0.5 truncate font-manrope text-xs text-[#263238]">
                        {family.email}
                      </dd>
                    </div>
                    <div className="min-w-0">
                      <dt className="font-manrope text-[11px] font-semibold tracking-[0.55px] text-[#607d8b] uppercase">
                        Phone
                      </dt>
                      <dd className="mt-0.5 font-manrope text-xs text-[#263238]">{family.phone}</dd>
                    </div>
                  </dl>

                  <div className="mt-4">
                    <p className="font-manrope text-[11px] font-semibold tracking-[0.55px] text-[#607d8b] uppercase">
                      Children
                    </p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {family.children && family.children.length > 0 ? (
                        family.children.map((child) => (
                          <span
                            key={child}
                            className="rounded bg-[#e8ebe8] px-2 py-1 font-manrope text-xs leading-4.5 text-[#263238]"
                          >
                            {child}
                          </span>
                        ))
                      ) : (
                        <span className="font-manrope text-xs text-[#90a4ae]">
                          No children registered
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#e7eceb] pt-3">
                    <MembershipBadge membership={family.membership} />
                    <p className="font-manrope text-xs leading-4.5 text-[#607d8b]">
                      Registered {formatDate(family.registrationDate)}
                    </p>
                  </div>

                  {/* Action row (Note: action column will be fully done separately) */}
                  <div className="mt-3 flex items-center justify-between border-t border-[#f4f8f6] pt-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/dashboard/admin/families/${family.id}`}
                        aria-label={`View ${family.name}`}
                        className="flex size-8 items-center justify-center rounded-lg border border-[#e7eceb] text-[#607d8b] transition-colors hover:bg-[#f4f8f6] hover:text-[#2f7d7e]"
                      >
                        <Eye aria-hidden="true" size={14} strokeWidth={1.7} />
                      </Link>
                      <a
                        href={`mailto:${family.email}`}
                        aria-label={`Email ${family.name}`}
                        className="flex size-8 items-center justify-center rounded-lg border border-[#e7eceb] text-[#607d8b] transition-colors hover:bg-[#f4f8f6] hover:text-[#2f7d7e]"
                      >
                        <Mail aria-hidden="true" size={14} strokeWidth={1.7} />
                      </a>
                    </div>
                    <button
                      type="button"
                      aria-label={`Deactivate ${family.name}`}
                      onClick={() => setDeactivateTarget(family)}
                      className="flex size-8 items-center justify-center rounded-lg border border-[#e7eceb] text-[#607d8b] transition-colors hover:bg-[#fef2f2] hover:text-[#dc2626]"
                    >
                      <Trash aria-hidden="true" size={14} />
                    </button>
                  </div>
                </article>
              );
            })}
            {filteredFamilies.length === 0 ? (
              <p className="rounded-2xl border border-[#e8ebe8] bg-white p-8 text-center font-manrope text-sm text-[#607d8b] xl:col-span-2">
                No families match these filters.
              </p>
            ) : null}
          </section>

          {/* Desktop Table */}
          <div className="mt-6 hidden overflow-x-auto rounded-2xl border border-[#e8ebe8] bg-white shadow-[0_1px_1.5px_rgba(0,0,0,0.1),0_1px_1px_rgba(0,0,0,0.1)] 2xl:block">
            <table className="w-full min-w-370.5 border-separate border-spacing-0 text-left">
              <thead className="bg-[#f4f8f6]">
                <tr className="h-16">
                  <th className="w-70 px-5">
                    <label className="flex items-center gap-4">
                      <input
                        aria-label="Select all families on this page"
                        type="checkbox"
                        checked={allSelected}
                        onChange={() =>
                          setSelectedIds(
                            allSelected ? [] : paginatedFamilies.map((family) => family.id)
                          )
                        }
                        className="size-4 accent-[#2f7d7e]"
                      />
                      <span className="font-nunito text-sm font-semibold tracking-[-0.176px] text-[#607d8b]">
                        Parent Name
                      </span>
                    </label>
                  </th>
                  {[
                    'Email & Phone No.',
                    'Children',
                    'Membership',
                    'Status',
                    'Registration',
                    'Actions',
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="w-40 px-5 font-nunito text-sm font-semibold tracking-[-0.176px] text-[#607d8b]"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedFamilies.map((family) => {
                  const initials = family.initials || getInitials(family.name, family.email);
                  return (
                    <tr
                      key={family.id}
                      className="h-24 border-b border-[#e8ebe8] transition-colors hover:bg-[#fbfdfc] last:border-0"
                    >
                      <td className="px-5">
                        <div className="flex items-center gap-4">
                          <input
                            aria-label={`Select ${family.name}`}
                            type="checkbox"
                            checked={selectedIds.includes(family.id)}
                            onChange={() => toggleSelection(family.id)}
                            className="size-4 accent-[#2f7d7e]"
                          />
                          <div className="flex items-center gap-3">
                            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#edf6f2] font-nunito text-xs font-bold text-[#2f7d7e]">
                              {initials}
                            </span>
                            <div className="min-w-0">
                              <span className="block font-nunito text-sm font-semibold leading-5 text-[#263238]">
                                {family.name}
                              </span>
                              <span className="block font-manrope text-[13px] leading-5 text-[#607d8b]">
                                {family.relationship}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5">
                        <p className="font-manrope text-sm leading-5.5 text-[#263238]">
                          {family.email}
                        </p>
                        <p className="font-manrope text-[13px] leading-5 text-[#607d8b]">
                          {family.phone}
                        </p>
                      </td>
                      <td className="px-5">
                        <div className="flex flex-wrap gap-1.5">
                          {family.children && family.children.length > 0 ? (
                            family.children.map((child) => (
                              <span
                                key={child}
                                className="block w-fit rounded bg-[#e8ebe8] px-2 py-1 font-manrope text-xs leading-4.5 text-[#263238]"
                              >
                                {child}
                              </span>
                            ))
                          ) : (
                            <span className="font-manrope text-xs text-[#90a4ae]">No children</span>
                          )}
                        </div>
                      </td>
                      <td className="px-5">
                        <MembershipBadge membership={family.membership} />
                      </td>
                      <td className="px-5">
                        <StatusBadge status={family.status} />
                      </td>
                      <td className="px-5 font-manrope text-xs leading-4.5 text-[#607d8b]">
                        {formatDate(family.registrationDate)}
                      </td>
                      <td className="px-5">
                        <div className="flex items-center gap-1.5">
                          <Link
                            href={`/dashboard/admin/families/${family.id}`}
                            aria-label={`View ${family.name}`}
                            title="View details"
                            className="flex size-7 items-center justify-center rounded-[10px] text-[#607d8b] transition-colors hover:bg-[#f4f8f6] hover:text-[#2f7d7e]"
                          >
                            <Eye aria-hidden="true" size={14} strokeWidth={1.7} />
                          </Link>
                          <a
                            href={`mailto:${family.email}`}
                            aria-label={`Email ${family.name}`}
                            title={`Email ${family.email}`}
                            className="flex size-7 items-center justify-center rounded-[10px] text-[#607d8b] transition-colors hover:bg-[#f4f8f6] hover:text-[#2f7d7e]"
                          >
                            <Mail aria-hidden="true" size={14} strokeWidth={1.7} />
                          </a>
                          <button
                            type="button"
                            aria-label={`Edit ${family.name}`}
                            onClick={() => action('Edit', family)}
                            className="flex size-7 items-center justify-center rounded-[10px] text-[#607d8b] transition-colors hover:bg-[#f4f8f6] hover:text-[#2f7d7e]"
                          >
                            <Pencil aria-hidden="true" size={13} strokeWidth={1.7} />
                          </button>
                          <button
                            type="button"
                            aria-label={`Membership for ${family.name}`}
                            onClick={() => action('Membership', family)}
                            className="flex size-7 items-center justify-center rounded-[10px] text-[#607d8b] transition-colors hover:bg-[#f4f8f6] hover:text-[#2f7d7e]"
                          >
                            <Copy aria-hidden="true" size={13} strokeWidth={1.7} />
                          </button>
                          <button
                            type="button"
                            aria-label={`Verify ${family.name}`}
                            onClick={() => action('Verify', family)}
                            className="flex size-7 items-center justify-center rounded-[10px] text-[#607d8b] transition-colors hover:bg-[#f4f8f6] hover:text-[#2f7d7e]"
                          >
                            <Archive aria-hidden="true" size={13} strokeWidth={1.7} />
                          </button>
                          <button
                            type="button"
                            aria-label={`Deactivate ${family.name}`}
                            onClick={() => setDeactivateTarget(family)}
                            className="flex size-7 items-center justify-center rounded-[10px] text-[#607d8b] transition-colors hover:bg-[#fef2f2] hover:text-[#dc2626]"
                          >
                            <Trash aria-hidden="true" size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filteredFamilies.length === 0 && (
              <p className="p-10 text-center font-manrope text-sm text-[#607d8b]">
                No families match these filters.
              </p>
            )}
          </div>

          {/* Footer and Pagination */}
          <footer className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-manrope text-[13px] leading-4.875 text-[#607d8b]">
              Showing {filteredFamilies.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1}{' '}
              to {Math.min(currentPage * ITEMS_PER_PAGE, filteredFamilies.length)} of{' '}
              {filteredFamilies.length} {filteredFamilies.length === 1 ? 'family' : 'families'}
            </p>

            {totalPages > 1 && (
              <nav aria-label="Families pagination" className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="flex h-9 items-center gap-1 rounded-lg border border-[#e2e8f0] px-3 font-manrope text-xs font-semibold text-[#607d8b] transition-colors hover:bg-[#f4f8f6] disabled:opacity-40"
                >
                  <ChevronLeft size={14} />
                  <span>Previous</span>
                </button>

                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    aria-current={page === currentPage ? 'page' : undefined}
                    onClick={() => setCurrentPage(page)}
                    className={
                      page === currentPage
                        ? 'size-9 rounded-lg bg-[#2f7d7e] font-manrope text-xs font-semibold text-white'
                        : 'size-9 rounded-lg border border-[#e2e8f0] font-manrope text-xs font-semibold text-[#607d8b] transition-colors hover:bg-[#f4f8f6]'
                    }
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="flex h-9 items-center gap-1 rounded-lg border border-[#e2e8f0] px-3 font-manrope text-xs font-semibold text-[#607d8b] transition-colors hover:bg-[#f4f8f6] disabled:opacity-40"
                >
                  <span>Next</span>
                  <ChevronRight size={14} />
                </button>
              </nav>
            )}
          </footer>
        </>
      )}

      <DeactivateFamilyModal
        familyName={deactivateTarget?.name ?? null}
        onClose={(open) => !open && setDeactivateTarget(null)}
        onConfirm={() => {
          if (deactivateTarget)
            toast.success(`${deactivateTarget.name}'s account has been deactivated.`);
          setDeactivateTarget(null);
        }}
      />
    </section>
  );
}
