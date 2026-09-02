'use client';

import {
  Archive,
  BadgeCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  Ellipsis,
  Eye,
  Pencil,
  Search,
  Trash,
  Users,
  WalletCards,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type Membership = 'Little Steps' | 'Grow Together' | 'Personalized Pathways';
type Status = 'Active' | 'Inactive';

type Family = {
  id: number;
  name: string;
  relationship: 'Mother' | 'Father' | 'Caregiver';
  email: string;
  phone: string;
  children: string[];
  membership: Membership;
  status: Status;
  registration: string;
};

const families: Family[] = [
  {
    id: 1,
    name: 'Amara Okonkwo',
    relationship: 'Mother',
    email: 'sarah.k@example.com',
    phone: '(555) 234-5678',
    children: ['Leo Miller (3 yrs)', 'Emma Miller (4 yrs)'],
    membership: 'Little Steps',
    status: 'Active',
    registration: 'Apr 2, 2025',
  },
  {
    id: 2,
    name: 'Amara Okonkwo',
    relationship: 'Caregiver',
    email: 'sarah.k@example.com',
    phone: '(555) 234-5678',
    children: ['Leo Miller (3 yrs)', 'Emma Miller (4 yrs)'],
    membership: 'Little Steps',
    status: 'Active',
    registration: 'Apr 2, 2025',
  },
  {
    id: 3,
    name: 'Amara Okonkwo',
    relationship: 'Mother',
    email: 'sarah.k@example.com',
    phone: '(555) 234-5678',
    children: ['Leo Miller (3 yrs)', 'Emma Miller (4 yrs)'],
    membership: 'Grow Together',
    status: 'Active',
    registration: 'Apr 2, 2025',
  },
  {
    id: 4,
    name: 'Amara Okonkwo',
    relationship: 'Mother',
    email: 'sarah.k@example.com',
    phone: '(555) 234-5678',
    children: ['Leo Miller (3 yrs)', 'Emma Miller (4 yrs)'],
    membership: 'Grow Together',
    status: 'Active',
    registration: 'Apr 2, 2025',
  },
  {
    id: 5,
    name: 'Amara Okonkwo',
    relationship: 'Mother',
    email: 'sarah.k@example.com',
    phone: '(555) 234-5678',
    children: ['Leo Miller (3 yrs)', 'Emma Miller (4 yrs)'],
    membership: 'Personalized Pathways',
    status: 'Active',
    registration: 'Apr 2, 2025',
  },
  {
    id: 6,
    name: 'Amara Okonkwo',
    relationship: 'Mother',
    email: 'sarah.k@example.com',
    phone: '(555) 234-5678',
    children: ['Leo Miller (3 yrs)', 'Emma Miller (4 yrs)'],
    membership: 'Personalized Pathways',
    status: 'Active',
    registration: 'Apr 2, 2025',
  },
  {
    id: 7,
    name: 'Amara Okonkwo',
    relationship: 'Caregiver',
    email: 'sarah.k@example.com',
    phone: '(555) 234-5678',
    children: ['Leo Miller (3 yrs)', 'Emma Miller (4 yrs)'],
    membership: 'Grow Together',
    status: 'Inactive',
    registration: 'Apr 2, 2025',
  },
  {
    id: 8,
    name: 'Amara Okonkwo',
    relationship: 'Mother',
    email: 'sarah.k@example.com',
    phone: '(555) 234-5678',
    children: ['Leo Miller (3 yrs)', 'Emma Miller (4 yrs)'],
    membership: 'Little Steps',
    status: 'Active',
    registration: 'Apr 2, 2025',
  },
];

const summaryCards = [
  {
    value: '94',
    label: 'Total Families',
    icon: Users,
    className: 'border-[#dcfce7] bg-[#f0fdf4] text-[#4caf50]',
  },
  {
    value: '108',
    label: 'Active Children',
    icon: Users,
    className: 'border-[#fef9c3] bg-[#fefce8] text-[#b78b16]',
  },
  {
    value: '84',
    label: 'Active Memberships',
    icon: WalletCards,
    className: 'border-[#ffedd5] bg-[#fff7ed] text-[#ea7b33]',
  },
  {
    value: '62',
    label: 'New This Month',
    icon: BadgeCheck,
    className: 'border-[#dbeafe] bg-[#ecfeff] text-[#2f7d7e]',
  },
];

function MembershipBadge({ membership }: { membership: Membership }) {
  return (
    <span className="inline-flex rounded-full bg-[#fce9e3] px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 text-[#916d5f]">
      {membership}
    </span>
  );
}

function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={
        status === 'Active'
          ? 'inline-flex rounded-full bg-[#edf6f2] px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 text-[#4caf50]'
          : 'inline-flex rounded-full bg-[#fef2f2] px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 text-[#dc2626]'
      }
    >
      {status}
    </span>
  );
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

export function FamiliesPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [membership, setMembership] = useState('all');
  const [status, setStatus] = useState('all');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const filteredFamilies = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return families.filter(
      (family) =>
        (membership === 'all' || family.membership === membership) &&
        (status === 'all' || family.status === status) &&
        (!normalizedQuery ||
          `${family.name} ${family.email} ${family.phone} ${family.children.join(' ')}`
            .toLowerCase()
            .includes(normalizedQuery))
    );
  }, [membership, query, status]);

  const allSelected =
    filteredFamilies.length > 0 &&
    filteredFamilies.every((family) => selectedIds.includes(family.id));
  const toggleSelection = (id: number) =>
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((selectedId) => selectedId !== id) : [...current, id]
    );
  const action = (label: string, family: Family) => {
    if (label === 'View') {
      router.push(`/dashboard/admin/families/${family.id}`);
      return;
    }
    toast.success(`${label} is ready for ${family.name}.`);
  };

  return (
    <section className="mx-auto w-full max-w-383.5 pb-8 text-[#263238]">
      <header>
        <h1 className="font-nunito text-[32px] font-medium leading-10 tracking-[-0.4px] sm:text-[40px] sm:leading-12">
          Families
        </h1>
        <p className="mt-0.5 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#6c7787]">
          Manage registered families, parent accounts, memberships, and child profiles.
        </p>
      </header>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map(({ value, label, icon: Icon, className }) => (
          <article
            key={label}
            className="flex h-38.5 items-center rounded-2xl border border-[#e8ebe8] bg-white p-4 shadow-[0_1px_1px_rgba(0,0,0,0.05)]"
          >
            <span
              className={`mr-3 flex size-8 shrink-0 items-center justify-center rounded-lg border ${className}`}
            >
              <Icon size={18} strokeWidth={1.7} />
            </span>
            <div>
              <p className="font-nunito text-2xl font-medium leading-8 text-[#272f3a]">{value}</p>
              <p className="font-manrope text-sm font-medium leading-5.5 tracking-[0.084px] text-[#6c7787]">
                {label}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-[#e7eceb] bg-white p-4.25 shadow-[0_4px_6px_rgba(0,0,0,0.06)]">
        <div className="flex flex-col gap-3 lg:flex-row">
          <label className="flex h-9.5 min-w-0 flex-1 items-center gap-2 rounded-[14px] border border-[#e7eceb] bg-[#f4f8f6] px-3">
            <Search size={15} className="text-[#607d8b]" />
            <span className="sr-only">Search families</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by title, keywords, or parents..."
              className="min-w-0 flex-1 bg-transparent font-manrope text-sm text-[#263238] outline-none placeholder:text-[rgba(38,50,56,0.5)]"
            />
          </label>
          <FamilyFilterDropdown
            label="Membership"
            value={membership}
            onChange={setMembership}
            options={['Little Steps', 'Grow Together', 'Personalized Pathways']}
            width="lg:w-48.5"
          />
          <FamilyFilterDropdown
            label="Status"
            value={status}
            onChange={setStatus}
            options={['Active', 'Inactive']}
            width="lg:w-27.5"
          />
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-[#e8ebe8] bg-white shadow-[0_1px_1.5px_rgba(0,0,0,0.1),0_1px_1px_rgba(0,0,0,0.1)]">
        <table className="w-full min-w-370.5 border-separate border-spacing-0 text-left">
          <thead className="bg-[#f4f8f6]">
            <tr className="h-22">
              <th className="w-70 px-4">
                <label className="flex items-center gap-6">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={() =>
                      setSelectedIds(allSelected ? [] : filteredFamilies.map((family) => family.id))
                    }
                    className="size-4 accent-[#2f7d7e]"
                  />
                  <span className="font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-[#607d8b]">
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
                  className="w-40 px-4 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-[#607d8b]"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredFamilies.map((family) => (
              <tr key={family.id} className="h-28 border-b border-[#e8ebe8] last:border-0">
                <td className="px-4">
                  <div className="flex items-center gap-6">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(family.id)}
                      onChange={() => toggleSelection(family.id)}
                      className="size-4 accent-[#2f7d7e]"
                    />
                    <span className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-full bg-[#fce9e3] font-nunito text-xs font-semibold text-[#916d5f]">
                        AO
                      </span>
                      <span>
                        <span className="block font-nunito text-sm font-medium leading-5 text-[#263238]">
                          {family.name}
                        </span>
                        <span className="block font-manrope text-[13px] leading-5 text-[#607d8b]">
                          {family.relationship}
                        </span>
                      </span>
                    </span>
                  </div>
                </td>
                <td className="px-4">
                  <p className="font-manrope text-sm leading-5.5 text-[#263238]">{family.email}</p>
                  <p className="font-manrope text-[13px] leading-5 text-[#607d8b]">
                    {family.phone}
                  </p>
                </td>
                <td className="px-4">
                  <div className="space-y-1.5">
                    {family.children.map((child) => (
                      <span
                        key={child}
                        className="block w-fit rounded bg-[#e8ebe8] px-2 py-1 font-manrope text-xs leading-4.5 text-[#263238]"
                      >
                        {child}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4">
                  <MembershipBadge membership={family.membership} />
                </td>
                <td className="px-4">
                  <StatusBadge status={family.status} />
                </td>
                <td className="px-4 font-manrope text-xs leading-4.5 text-[#607d8b]">
                  {family.registration}
                </td>
                <td className="px-4">
                  <div className="flex items-center gap-1">
                    {[
                      [Eye, 'View'],
                      [Pencil, 'Email'],
                      [Copy, 'Membership'],
                      [Archive, 'Verify'],
                    ].map(([Icon, label]) => {
                      const ActionIcon = Icon as typeof Eye;
                      return (
                        <button
                          key={label as string}
                          type="button"
                          aria-label={`${label} ${family.name}`}
                          onClick={() => action(label as string, family)}
                          className="flex size-7 items-center justify-center rounded-[10px] text-[#607d8b] hover:bg-[#f4f8f6]"
                        >
                          <ActionIcon size={14} strokeWidth={1.7} />
                        </button>
                      );
                    })}
                    <button
                      type="button"
                      aria-label={`More actions for ${family.name}`}
                      onClick={() => action('More actions', family)}
                      className="flex size-7 items-center justify-center rounded-[10px] text-[#607d8b] hover:bg-[#f4f8f6]"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredFamilies.length === 0 && (
          <p className="p-10 text-center font-manrope text-sm text-[#607d8b]">
            No families match these filters.
          </p>
        )}
      </div>

      <nav
        aria-label="Families pagination"
        className="mt-6 flex flex-wrap justify-end gap-1 font-manrope text-sm text-[#0f172a]"
      >
        <button disabled className="flex h-10 items-center gap-1 px-3 opacity-50">
          <ChevronLeft size={16} />
          Previous
        </button>
        {[1, 2, 3, 4, 5, 6].map((page) => (
          <button
            key={page}
            aria-current={page === 1 ? 'page' : undefined}
            className={
              page === 1
                ? 'size-10 rounded-lg border border-[#e2e8f0] bg-[#2f7d7e] text-white'
                : 'size-10 rounded-lg'
            }
          >
            {page}
          </button>
        ))}
        <span className="flex size-10 items-center justify-center">
          <Ellipsis size={16} />
        </span>
        <button className="flex h-10 items-center gap-1 px-3">
          Next
          <ChevronRight size={16} />
        </button>
      </nav>
    </section>
  );
}
