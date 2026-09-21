'use client';

import { useAdminTickets } from '@/features/support/hooks/support.queries';
import { useUpdateTicketStatus } from '@/features/support/hooks/support.mutations';
import type { SupportTicket, TicketStatus } from '@/features/support/model/support.types';
import {
  Bug,
  CheckCircle2,
  ChevronDown,
  Clock,
  Eye,
  HandHeart,
  Loader2,
  RefreshCw,
  RotateCcw,
  Search,
  Send,
  Star,
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';
import { TicketDetailModal } from './ticket-detail-modal';

type ActiveTab = 'CONTACT' | 'FEEDBACK' | 'ISSUE';

function StatusBadge({ status }: { status: TicketStatus }) {
  if (status === 'RESOLVED') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#edf6f2] px-2.5 py-1 font-manrope text-xs font-semibold text-[#4caf50]">
        <CheckCircle2 size={12} className="shrink-0" />
        Resolved
      </span>
    );
  }
  if (status === 'IN_PROGRESS') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eff6ff] px-2.5 py-1 font-manrope text-xs font-semibold text-[#2563eb]">
        <Clock size={12} className="shrink-0" />
        In Progress
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fff7ed] px-2.5 py-1 font-manrope text-xs font-semibold text-[#ea7b33]">
      <Clock size={12} className="shrink-0" />
      Open
    </span>
  );
}

function DropdownFilter({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
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

  const currentLabel = options.find((opt) => opt.value === value)?.label ?? label;

  return (
    <div ref={ref} className="relative shrink-0 w-28.75 sm:w-44">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={() => setIsOpen((open) => !open)}
        className={`flex h-11 min-h-11 w-full items-center justify-between rounded-[14px] border px-2.5 sm:px-3.5 font-manrope text-xs sm:text-sm font-medium transition-all ${
          isOpen
            ? 'border-[#2f7d7e] bg-white text-[#0f1416] ring-2 ring-[#2f7d7e]/10'
            : 'border-[#dce4e2] bg-[#f4f8f6] text-[#607d8b] hover:border-[#accbcb]'
        }`}
      >
        <span className="truncate">{currentLabel}</span>
        <ChevronDown
          aria-hidden="true"
          className={`ml-1 sm:ml-2 size-3.5 sm:size-4 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          strokeWidth={1.8}
        />
      </button>
      {isOpen && (
        <div
          role="listbox"
          className="absolute right-0 top-[calc(100%+6px)] z-30 w-44 sm:w-48 rounded-2xl border border-[#e8ebe8] bg-white p-2 shadow-[0_8px_12px_rgba(38,50,56,0.12)]"
        >
          <div className="flex flex-col gap-1">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={option.value === value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`flex min-h-9 w-full items-center rounded-lg px-3 py-2 text-left font-nunito text-xs sm:text-sm font-medium transition-colors ${
                  option.value === value
                    ? 'bg-[#e9f1ee] text-[#174a4d]'
                    : 'text-[#263238] hover:bg-[#f4f8f6]'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function AdminSupportPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('CONTACT');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [ratingFilter, setRatingFilter] = useState('ALL');
  const [viewingTicket, setViewingTicket] = useState<SupportTicket | null>(null);

  const {
    data: tickets = [],
    isLoading,
    isRefetching,
    refetch,
  } = useAdminTickets(undefined, {
    refetchInterval: 10000,
  });

  const updateStatusMutation = useUpdateTicketStatus();

  // Tab ticket groups
  const contactTickets = useMemo(
    () => tickets.filter((ticket) => ticket.type === 'CONTACT'),
    [tickets]
  );
  const feedbackTickets = useMemo(
    () => tickets.filter((ticket) => ticket.type === 'FEEDBACK'),
    [tickets]
  );
  const issueTickets = useMemo(
    () => tickets.filter((ticket) => ticket.type === 'ISSUE'),
    [tickets]
  );

  // Filtered tickets based on active tab and search/filter controls
  const filteredTickets = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    let currentList: SupportTicket[];

    if (activeTab === 'CONTACT') {
      currentList = contactTickets;
      if (statusFilter !== 'ALL') {
        currentList = currentList.filter((t) => t.status === statusFilter);
      }
    } else if (activeTab === 'FEEDBACK') {
      currentList = feedbackTickets;
      if (ratingFilter !== 'ALL') {
        const targetRating = Number(ratingFilter);
        currentList = currentList.filter((t) => t.rating === targetRating);
      }
    } else {
      currentList = issueTickets;
      if (statusFilter !== 'ALL') {
        currentList = currentList.filter((t) => t.status === statusFilter);
      }
    }

    if (!query) return currentList;

    return currentList.filter((ticket) => {
      const matchName = ticket.user?.name?.toLowerCase().includes(query);
      const matchEmail = ticket.user?.email?.toLowerCase().includes(query);
      const matchSubject = ticket.subject?.toLowerCase().includes(query);
      const matchMessage = ticket.message?.toLowerCase().includes(query);
      return matchName || matchEmail || matchSubject || matchMessage;
    });
  }, [
    activeTab,
    contactTickets,
    feedbackTickets,
    issueTickets,
    ratingFilter,
    searchQuery,
    statusFilter,
  ]);

  // Feedback statistics
  const feedbackStats = useMemo(() => {
    const total = feedbackTickets.length;
    if (total === 0) {
      return {
        average: 0,
        total: 0,
        breakdown: [5, 4, 3, 2, 1].map((stars) => ({ stars, count: 0, percentage: 0 })),
      };
    }
    const sum = feedbackTickets.reduce((acc, t) => acc + (t.rating || 0), 0);
    const avg = Number((sum / total).toFixed(1));

    const breakdown = [5, 4, 3, 2, 1].map((stars) => {
      const count = feedbackTickets.filter((t) => t.rating === stars).length;
      return {
        stars,
        count,
        percentage: Math.round((count / total) * 100),
      };
    });

    return { average: avg, total, breakdown };
  }, [feedbackTickets]);

  // Overall metrics
  const totalOpenTickets = useMemo(
    () => tickets.filter((t) => t.type !== 'FEEDBACK' && t.status === 'OPEN').length,
    [tickets]
  );
  const totalInProgressTickets = useMemo(
    () => tickets.filter((t) => t.type !== 'FEEDBACK' && t.status === 'IN_PROGRESS').length,
    [tickets]
  );
  const totalResolvedTickets = useMemo(
    () => tickets.filter((t) => t.status === 'RESOLVED').length,
    [tickets]
  );

  const handleUpdateStatus = async (ticket: SupportTicket, newStatus: TicketStatus) => {
    try {
      await updateStatusMutation.mutateAsync({
        id: ticket.id,
        status: newStatus,
      });
      const message =
        newStatus === 'IN_PROGRESS'
          ? 'Ticket marked as in progress.'
          : newStatus === 'RESOLVED'
            ? 'Ticket marked as resolved!'
            : 'Ticket reopened as open.';
      toast.success(message);
      if (viewingTicket?.id === ticket.id) {
        setViewingTicket((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to update ticket status.';
      toast.error(message);
    }
  };

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <section className="mx-auto w-full min-w-0 max-w-383.5 pb-12 text-[#263238]">
      {/* Page Header */}
      <header className="flex flex-col gap-1 sm:gap-2">
        <div className="flex items-center justify-between gap-3">
          <h1 className="font-nunito text-2xl font-medium leading-8 tracking-[-0.4px] sm:text-[32px] sm:leading-10">
            Support & Feedback
          </h1>
          <button
            type="button"
            onClick={() => refetch()}
            disabled={isLoading || isRefetching}
            className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-[#d8ddd9] bg-white px-3 sm:px-4 font-nunito text-xs font-semibold text-[#515b60] shadow-xs transition-colors hover:bg-[#f4f8f6] disabled:opacity-60"
          >
            <RefreshCw size={13} className={isRefetching ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
        </div>
        <p className="font-manrope text-xs sm:text-sm leading-5 text-[#6c7787]">
          Review parent inquiries, product ratings, and technical issue reports.
        </p>
      </header>

      {/* Overview Stat Cards - 2 cards per row on mobile */}
      <div className="mt-6 sm:mt-8 grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <article className="flex min-h-24 sm:min-h-26 items-center rounded-2xl border border-[#e8ebe8] bg-white p-3 sm:p-4 shadow-xs">
          <span className="mr-2.5 sm:mr-3 flex size-8 sm:size-10 shrink-0 items-center justify-center rounded-xl border border-[#cffafe] bg-[#ecfeff] text-[#0891b2]">
            <Send aria-hidden="true" size={16} className="sm:size-4.5" strokeWidth={1.8} />
          </span>
          <div className="min-w-0">
            <p className="font-nunito text-xl sm:text-2xl font-semibold leading-7 sm:leading-8 text-[#272f3a]">
              {contactTickets.length}
            </p>
            <p className="truncate font-manrope text-[11px] sm:text-xs font-medium text-[#6c7787]">
              Contact Inquiries
            </p>
          </div>
        </article>

        <article className="flex min-h-24 sm:min-h-26 items-center rounded-2xl border border-[#e8ebe8] bg-white p-3 sm:p-4 shadow-xs">
          <span className="mr-2.5 sm:mr-3 flex size-8 sm:size-10 shrink-0 items-center justify-center rounded-xl border border-[#fef3c7] bg-[#fefce8] text-[#ca8a04]">
            <Star aria-hidden="true" size={16} className="sm:size-4.5" strokeWidth={1.8} />
          </span>
          <div className="min-w-0">
            <div className="flex items-baseline gap-1">
              <span className="font-nunito text-xl sm:text-2xl font-semibold leading-7 sm:leading-8 text-[#272f3a]">
                {feedbackStats.average > 0 ? feedbackStats.average : '—'}
              </span>
              {feedbackStats.average > 0 && (
                <span className="font-manrope text-[10px] sm:text-xs text-[#6c7787]">/ 5.0</span>
              )}
            </div>
            <p className="truncate font-manrope text-[11px] sm:text-xs font-medium text-[#6c7787]">
              Avg Rating ({feedbackStats.total})
            </p>
          </div>
        </article>

        <article className="flex min-h-24 sm:min-h-26 items-center rounded-2xl border border-[#e8ebe8] bg-white p-3 sm:p-4 shadow-xs">
          <span className="mr-2.5 sm:mr-3 flex size-8 sm:size-10 shrink-0 items-center justify-center rounded-xl border border-[#fee2e2] bg-[#fef2f2] text-[#dc2626]">
            <Bug aria-hidden="true" size={16} className="sm:size-4.5" strokeWidth={1.8} />
          </span>
          <div className="min-w-0">
            <p className="font-nunito text-xl sm:text-2xl font-semibold leading-7 sm:leading-8 text-[#272f3a]">
              {issueTickets.length}
            </p>
            <p className="truncate font-manrope text-[11px] sm:text-xs font-medium text-[#6c7787]">
              Issue Reports
            </p>
          </div>
        </article>

        <article className="flex min-h-24 sm:min-h-26 items-center rounded-2xl border border-[#e8ebe8] bg-white p-3 sm:p-4 shadow-xs">
          <span className="mr-2.5 sm:mr-3 flex size-8 sm:size-10 shrink-0 items-center justify-center rounded-xl border border-[#dcfce7] bg-[#f0fdf4] text-[#16a34a]">
            <CheckCircle2 aria-hidden="true" size={16} className="sm:size-4.5" strokeWidth={1.8} />
          </span>
          <div className="min-w-0">
            <p className="font-nunito text-xl sm:text-2xl font-semibold leading-7 sm:leading-8 text-[#272f3a]">
              {totalResolvedTickets}
            </p>
            <p className="truncate font-manrope text-[11px] sm:text-xs font-medium text-[#6c7787]">
              Resolved ({totalOpenTickets} Open, {totalInProgressTickets} In Progress)
            </p>
          </div>
        </article>
      </div>

      {/* Tabs bar */}
      <div className="mt-6 sm:mt-8 border-b border-[#e8ebe8]">
        <div className="overflow-x-auto scrollbar-none [-webkit-overflow-scrolling:touch]">
          <nav className="flex space-x-4 sm:space-x-8 min-w-max pb-px" aria-label="Support Tabs">
            <button
              type="button"
              onClick={() => {
                setActiveTab('CONTACT');
                setStatusFilter('ALL');
              }}
              className={`flex shrink-0 items-center gap-2 border-b-2 px-1 pb-3 font-nunito text-sm font-semibold transition-colors sm:text-base ${
                activeTab === 'CONTACT'
                  ? 'border-[#2f7d7e] text-[#2f7d7e]'
                  : 'border-transparent text-[#6c7787] hover:border-[#d8ddd9] hover:text-[#263238]'
              }`}
            >
              <Send size={16} />
              <span>Contact Support</span>
              <span
                className={`ml-1 rounded-full px-2 py-0.5 text-xs ${
                  activeTab === 'CONTACT'
                    ? 'bg-[#2f7d7e]/10 text-[#2f7d7e]'
                    : 'bg-[#f4f8f6] text-[#6c7787]'
                }`}
              >
                {contactTickets.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('FEEDBACK');
                setRatingFilter('ALL');
              }}
              className={`flex shrink-0 items-center gap-2 border-b-2 px-1 pb-3 font-nunito text-sm font-semibold transition-colors sm:text-base ${
                activeTab === 'FEEDBACK'
                  ? 'border-[#2f7d7e] text-[#2f7d7e]'
                  : 'border-transparent text-[#6c7787] hover:border-[#d8ddd9] hover:text-[#263238]'
              }`}
            >
              <HandHeart size={16} />
              <span>Product Feedback</span>
              <span
                className={`ml-1 rounded-full px-2 py-0.5 text-xs ${
                  activeTab === 'FEEDBACK'
                    ? 'bg-[#2f7d7e]/10 text-[#2f7d7e]'
                    : 'bg-[#f4f8f6] text-[#6c7787]'
                }`}
              >
                {feedbackTickets.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('ISSUE');
                setStatusFilter('ALL');
              }}
              className={`flex shrink-0 items-center gap-2 border-b-2 px-1 pb-3 font-nunito text-sm font-semibold transition-colors sm:text-base ${
                activeTab === 'ISSUE'
                  ? 'border-[#2f7d7e] text-[#2f7d7e]'
                  : 'border-transparent text-[#6c7787] hover:border-[#d8ddd9] hover:text-[#263238]'
              }`}
            >
              <Bug size={16} />
              <span>Issue Reports</span>
              <span
                className={`ml-1 rounded-full px-2 py-0.5 text-xs ${
                  activeTab === 'ISSUE'
                    ? 'bg-[#2f7d7e]/10 text-[#2f7d7e]'
                    : 'bg-[#f4f8f6] text-[#6c7787]'
                }`}
              >
                {issueTickets.length}
              </span>
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Specific Content: Feedback Overview Rating Card if Tab 2 */}
      {activeTab === 'FEEDBACK' && feedbackStats.total > 0 && (
        <div className="mt-6 rounded-2xl border border-[#e8ebe8] bg-white p-4 sm:p-5 shadow-xs">
          <div className="grid gap-5 md:grid-cols-3 md:items-center">
            {/* Rating score column */}
            <div className="flex flex-col items-center justify-center border-b border-[#e8ebe8] pb-4 md:border-b-0 md:border-r md:pb-0">
              <p className="font-nunito text-4xl sm:text-5xl font-bold text-[#263238]">
                {feedbackStats.average}
              </p>
              <div className="mt-2 flex gap-1 text-[#f59e0b]">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={20}
                    strokeWidth={1.8}
                    fill={s <= Math.round(feedbackStats.average) ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
              <p className="mt-1.5 font-manrope text-xs text-[#6c7787]">
                Based on {feedbackStats.total} parent review
                {feedbackStats.total === 1 ? '' : 's'}
              </p>
            </div>

            {/* Stars breakdown progress bars */}
            <div className="space-y-2 md:col-span-2 md:px-4">
              {feedbackStats.breakdown.map((item) => (
                <div key={item.stars} className="flex items-center gap-3">
                  <span className="w-12 font-manrope text-xs font-semibold text-[#515b60]">
                    {item.stars} star{item.stars === 1 ? '' : 's'}
                  </span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#f4f8f6]">
                    <div
                      className="h-full rounded-full bg-[#f59e0b] transition-all"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="w-10 text-right font-manrope text-xs text-[#6c7787]">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="mt-5 sm:mt-6 rounded-2xl border border-[#e7eceb] bg-white p-3 sm:p-4 shadow-xs">
        <div className="flex items-center gap-2 sm:gap-3">
          <label className="flex h-11 min-h-11 min-w-0 flex-1 items-center gap-2.5 rounded-[14px] border border-[#dce4e2] bg-[#f4f8f6] px-3 sm:px-3.5 transition-all focus-within:border-[#2f7d7e] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#2f7d7e]/10">
            <Search aria-hidden="true" size={17} className="shrink-0 text-[#607d8b]" />
            <span className="sr-only">Search tickets</span>
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={
                activeTab === 'CONTACT'
                  ? 'Search inquiries...'
                  : activeTab === 'FEEDBACK'
                    ? 'Search feedback...'
                    : 'Search issues...'
              }
              className="h-full w-full min-w-0 bg-transparent font-manrope text-xs sm:text-sm font-medium text-[#263238] outline-none placeholder:text-[#8c9ba0] leading-normal"
            />
          </label>

          {activeTab === 'FEEDBACK' ? (
            <DropdownFilter
              label="All Ratings"
              value={ratingFilter}
              options={[
                { label: 'All Ratings', value: 'ALL' },
                { label: '5 Stars', value: '5' },
                { label: '4 Stars', value: '4' },
                { label: '3 Stars', value: '3' },
                { label: '2 Stars', value: '2' },
                { label: '1 Star', value: '1' },
              ]}
              onChange={setRatingFilter}
            />
          ) : (
            <DropdownFilter
              label="All Statuses"
              value={statusFilter}
              options={[
                { label: 'All Statuses', value: 'ALL' },
                { label: 'Open', value: 'OPEN' },
                { label: 'In Progress', value: 'IN_PROGRESS' },
                { label: 'Resolved', value: 'RESOLVED' },
              ]}
              onChange={setStatusFilter}
            />
          )}
        </div>
      </div>

      {/* Loading state */}
      {isLoading ? (
        <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-[#e8ebe8] bg-white p-16 text-center">
          <Loader2 size={32} className="animate-spin text-[#2f7d7e]" />
          <p className="mt-3 font-manrope text-sm text-[#6c7787]">Loading tickets...</p>
        </div>
      ) : filteredTickets.length === 0 ? (
        /* Empty state */
        <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-[#e8ebe8] bg-white p-12 text-center shadow-xs">
          <div className="flex size-14 items-center justify-center rounded-full bg-[#f4f8f6] text-[#607d8b]">
            {activeTab === 'CONTACT' ? (
              <Send size={24} />
            ) : activeTab === 'FEEDBACK' ? (
              <HandHeart size={24} />
            ) : (
              <Bug size={24} />
            )}
          </div>
          <p className="mt-4 font-nunito text-lg font-semibold text-[#263238]">
            No{' '}
            {activeTab === 'CONTACT'
              ? 'inquiries'
              : activeTab === 'FEEDBACK'
                ? 'feedback'
                : 'issues'}{' '}
            found
          </p>
          <p className="mt-1 font-manrope text-sm text-[#6c7787]">
            {searchQuery || statusFilter !== 'ALL' || ratingFilter !== 'ALL'
              ? 'Try adjusting your search or filters.'
              : `No ${activeTab.toLowerCase()} tickets have been submitted yet.`}
          </p>
        </div>
      ) : (
        <>
          {/* Mobile / Tablet Cards View */}
          <section className="mt-6 grid gap-3.5 sm:grid-cols-2 lg:hidden">
            {filteredTickets.map((ticket) => {
              const formattedDate = new Date(ticket.createdAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              });

              return (
                <article
                  key={ticket.id}
                  className="rounded-2xl border border-[#e8ebe8] bg-white p-4 shadow-xs"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#eef3f3] font-nunito text-xs font-semibold text-[#2f7d7e]">
                        {getInitials(ticket.user?.name)}
                      </span>
                      <div>
                        <p className="font-nunito text-sm font-semibold text-[#263238]">
                          {ticket.user?.name ?? 'Parent'}
                        </p>
                        <p className="font-manrope text-xs text-[#6c7787]">
                          {ticket.user?.email ?? 'No email'}
                        </p>
                      </div>
                    </div>
                    {ticket.type !== 'FEEDBACK' ? (
                      <StatusBadge status={ticket.status} />
                    ) : (
                      <div className="flex items-center gap-1 text-[#f59e0b]">
                        <Star size={14} fill="currentColor" />
                        <span className="font-nunito text-xs font-bold text-[#263238]">
                          {ticket.rating}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-3 rounded-xl bg-[#f4f8f6] p-3">
                    <p className="font-nunito text-xs font-bold text-[#263238]">{ticket.subject}</p>
                    <p className="mt-1 line-clamp-2 font-manrope text-xs leading-relaxed text-[#515b60]">
                      {ticket.message}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-[#e8ebe8] pt-3">
                    <span className="font-manrope text-xs text-[#6c7787]">{formattedDate}</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label="View details"
                        onClick={() => setViewingTicket(ticket)}
                        className="flex h-8 items-center gap-1.5 rounded-lg border border-[#e8ebe8] px-2.5 font-nunito text-xs font-medium text-[#515b60] hover:bg-[#f4f8f6]"
                      >
                        <Eye size={13} />
                        <span>View</span>
                      </button>
                      {ticket.type !== 'FEEDBACK' && (
                        <>
                          {ticket.status === 'OPEN' ? (
                            <button
                              type="button"
                              disabled={updateStatusMutation.isPending}
                              onClick={() => handleUpdateStatus(ticket, 'IN_PROGRESS')}
                              className="flex h-8 items-center gap-1 rounded-lg border border-[#bfdbfe] bg-[#eff6ff] px-2.5 font-nunito text-xs font-semibold text-[#2563eb] transition-colors hover:bg-[#dbeafe] disabled:opacity-60"
                            >
                              <Clock size={12} />
                              <span>In Progress</span>
                            </button>
                          ) : ticket.status === 'IN_PROGRESS' ? (
                            <button
                              type="button"
                              disabled={updateStatusMutation.isPending}
                              onClick={() => handleUpdateStatus(ticket, 'RESOLVED')}
                              className="flex h-8 items-center gap-1 rounded-lg bg-[#2f7d7e] px-2.5 font-nunito text-xs font-semibold text-white transition-colors hover:bg-[#276a6b] disabled:opacity-60"
                            >
                              <CheckCircle2 size={12} />
                              <span>Mark Done</span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              disabled={updateStatusMutation.isPending}
                              onClick={() => handleUpdateStatus(ticket, 'OPEN')}
                              className="flex h-8 items-center gap-1 rounded-lg border border-[#d8ddd9] bg-white px-2.5 font-nunito text-xs font-semibold text-[#515b60] transition-colors hover:bg-[#f4f8f6] disabled:opacity-60"
                            >
                              <RotateCcw size={12} />
                              <span>Reopen</span>
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </section>

          {/* Desktop Table View */}
          <div className="mt-6 hidden overflow-x-auto rounded-2xl border border-[#e8ebe8] bg-white shadow-xs lg:block">
            <table className="w-full border-separate border-spacing-0 text-left">
              <thead className="bg-[#f4f8f6]">
                <tr className="h-12">
                  <th className="px-5 font-nunito text-xs font-semibold uppercase tracking-wider text-[#607d8b]">
                    Parent
                  </th>
                  {activeTab === 'FEEDBACK' ? (
                    <>
                      <th className="w-36 px-4 font-nunito text-xs font-semibold uppercase tracking-wider text-[#607d8b]">
                        Rating
                      </th>
                      <th className="px-4 font-nunito text-xs font-semibold uppercase tracking-wider text-[#607d8b]">
                        Comments
                      </th>
                    </>
                  ) : activeTab === 'ISSUE' ? (
                    <>
                      <th className="w-48 px-4 font-nunito text-xs font-semibold uppercase tracking-wider text-[#607d8b]">
                        Issue Area
                      </th>
                      <th className="px-4 font-nunito text-xs font-semibold uppercase tracking-wider text-[#607d8b]">
                        Description
                      </th>
                      <th className="w-32 px-4 font-nunito text-xs font-semibold uppercase tracking-wider text-[#607d8b]">
                        Status
                      </th>
                    </>
                  ) : (
                    <>
                      <th className="w-56 px-4 font-nunito text-xs font-semibold uppercase tracking-wider text-[#607d8b]">
                        Subject
                      </th>
                      <th className="px-4 font-nunito text-xs font-semibold uppercase tracking-wider text-[#607d8b]">
                        Message
                      </th>
                      <th className="w-32 px-4 font-nunito text-xs font-semibold uppercase tracking-wider text-[#607d8b]">
                        Status
                      </th>
                    </>
                  )}
                  <th className="w-32 px-4 font-nunito text-xs font-semibold uppercase tracking-wider text-[#607d8b]">
                    Date
                  </th>
                  <th className="w-48 px-5 text-right font-nunito text-xs font-semibold uppercase tracking-wider text-[#607d8b]">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map((ticket) => {
                  const formattedDate = new Date(ticket.createdAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  });

                  return (
                    <tr
                      key={ticket.id}
                      className="border-b border-[#e8ebe8] transition-colors hover:bg-[#fafbfb] last:border-0"
                    >
                      {/* Parent details */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#eef3f3] font-nunito text-xs font-bold text-[#2f7d7e]">
                            {getInitials(ticket.user?.name)}
                          </span>
                          <div className="min-w-0">
                            <p className="truncate font-nunito text-sm font-semibold text-[#263238]">
                              {ticket.user?.name ?? 'Parent'}
                            </p>
                            <p className="truncate font-manrope text-xs text-[#6c7787]">
                              {ticket.user?.email ?? 'No email'}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Tab-dependent columns */}
                      {activeTab === 'FEEDBACK' ? (
                        <>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-1 text-[#f59e0b]">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <Star
                                  key={s}
                                  size={15}
                                  strokeWidth={1.8}
                                  fill={s <= (ticket.rating ?? 0) ? 'currentColor' : 'none'}
                                />
                              ))}
                              <span className="ml-1.5 font-nunito text-xs font-bold text-[#263238]">
                                {ticket.rating}
                              </span>
                            </div>
                          </td>
                          <td className="max-w-md px-4 py-4">
                            <p className="line-clamp-2 font-manrope text-xs leading-relaxed text-[#515b60]">
                              {ticket.message}
                            </p>
                          </td>
                        </>
                      ) : activeTab === 'ISSUE' ? (
                        <>
                          <td className="px-4 py-4">
                            <span className="inline-block rounded-md bg-[#fef2f2] px-2.5 py-1 font-manrope text-xs font-medium text-[#e11d48]">
                              {ticket.subject}
                            </span>
                          </td>
                          <td className="max-w-md px-4 py-4">
                            <p className="line-clamp-2 font-manrope text-xs leading-relaxed text-[#515b60]">
                              {ticket.message}
                            </p>
                          </td>
                          <td className="px-4 py-4">
                            <StatusBadge status={ticket.status} />
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-4 py-4">
                            <p className="line-clamp-1 font-nunito text-sm font-semibold text-[#263238]">
                              {ticket.subject}
                            </p>
                          </td>
                          <td className="max-w-md px-4 py-4">
                            <p className="line-clamp-2 font-manrope text-xs leading-relaxed text-[#515b60]">
                              {ticket.message}
                            </p>
                          </td>
                          <td className="px-4 py-4">
                            <StatusBadge status={ticket.status} />
                          </td>
                        </>
                      )}

                      {/* Date */}
                      <td className="whitespace-nowrap px-4 py-4 font-manrope text-xs text-[#6c7787]">
                        {formattedDate}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            title="View details"
                            onClick={() => setViewingTicket(ticket)}
                            className="flex size-8 items-center justify-center rounded-lg border border-[#e8ebe8] text-[#607d8b] transition-colors hover:bg-[#f4f8f6] hover:text-[#263238]"
                          >
                            <Eye size={15} />
                          </button>
                          {ticket.type !== 'FEEDBACK' && (
                            <>
                              {ticket.status === 'OPEN' ? (
                                <button
                                  type="button"
                                  disabled={updateStatusMutation.isPending}
                                  onClick={() => handleUpdateStatus(ticket, 'IN_PROGRESS')}
                                  className="flex h-8 items-center gap-1.5 rounded-lg border border-[#bfdbfe] bg-[#eff6ff] px-3 font-nunito text-xs font-semibold text-[#2563eb] transition-colors hover:bg-[#dbeafe] disabled:opacity-60"
                                >
                                  <Clock size={13} />
                                  <span>In Progress</span>
                                </button>
                              ) : ticket.status === 'IN_PROGRESS' ? (
                                <button
                                  type="button"
                                  disabled={updateStatusMutation.isPending}
                                  onClick={() => handleUpdateStatus(ticket, 'RESOLVED')}
                                  className="flex h-8 items-center gap-1.5 rounded-lg bg-[#2f7d7e] px-3 font-nunito text-xs font-semibold text-white transition-colors hover:bg-[#276a6b] disabled:opacity-60"
                                >
                                  <CheckCircle2 size={13} />
                                  <span>Mark Done</span>
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  disabled={updateStatusMutation.isPending}
                                  onClick={() => handleUpdateStatus(ticket, 'OPEN')}
                                  className="flex h-8 items-center gap-1.5 rounded-lg border border-[#d8ddd9] bg-white px-3 font-nunito text-xs font-semibold text-[#515b60] transition-colors hover:bg-[#f4f8f6] disabled:opacity-60"
                                >
                                  <RotateCcw size={13} />
                                  <span>Reopen</span>
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Ticket detail modal */}
      <TicketDetailModal
        ticket={viewingTicket}
        isOpen={Boolean(viewingTicket)}
        onClose={() => setViewingTicket(null)}
        onUpdateStatus={(_id, status) => {
          if (viewingTicket) {
            handleUpdateStatus(viewingTicket, status);
          }
        }}
        isUpdating={updateStatusMutation.isPending}
      />
    </section>
  );
}
