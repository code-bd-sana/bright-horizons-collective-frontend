'use client';

import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog';
import type { SupportTicket, TicketStatus } from '@/features/support/model/support.types';
import { CheckCircle2, Clock, Mail, Phone, RotateCcw, Star, User, X } from 'lucide-react';

type TicketDetailModalProps = {
  ticket: SupportTicket | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus?: (id: string, status: TicketStatus) => void;
  isUpdating?: boolean;
};

export function TicketDetailModal({
  ticket,
  isOpen,
  onClose,
  onUpdateStatus,
  isUpdating = false,
}: TicketDetailModalProps) {
  if (!ticket) return null;

  const isFeedback = ticket.type === 'FEEDBACK';
  const formattedDate = new Date(ticket.createdAt).toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="w-171 max-h-[calc(100dvh-2rem)] max-w-[calc(100%-2rem)] gap-0 overflow-y-auto rounded-2xl border border-[#eff1ef] bg-white p-6 text-[#263238] shadow-lg sm:p-8 sm:max-w-200"
      >
        <div className="flex items-center justify-between border-b border-[#e8ebe8] pb-4">
          <div className="flex items-center gap-2.5">
            <span
              className={
                ticket.type === 'CONTACT'
                  ? 'rounded-full bg-[#ecfeff] px-3 py-1 font-nunito text-xs font-semibold text-[#0891b2]'
                  : ticket.type === 'FEEDBACK'
                    ? 'rounded-full bg-[#fefce8] px-3 py-1 font-nunito text-xs font-semibold text-[#ca8a04]'
                    : 'rounded-full bg-[#fef2f2] px-3 py-1 font-nunito text-xs font-semibold text-[#e11d48]'
              }
            >
              {ticket.type === 'CONTACT'
                ? 'Contact Support'
                : ticket.type === 'FEEDBACK'
                  ? 'Feedback'
                  : 'Technical Issue'}
            </span>
            <span
              className={
                ticket.status === 'RESOLVED'
                  ? 'inline-flex items-center gap-1 rounded-full bg-[#edf6f2] px-2.5 py-0.5 font-manrope text-xs font-semibold text-[#4caf50]'
                  : ticket.status === 'IN_PROGRESS'
                    ? 'inline-flex items-center gap-1 rounded-full bg-[#eff6ff] px-2.5 py-0.5 font-manrope text-xs font-semibold text-[#2563eb]'
                    : 'inline-flex items-center gap-1 rounded-full bg-[#fff7ed] px-2.5 py-0.5 font-manrope text-xs font-semibold text-[#ea7b33]'
              }
            >
              {ticket.status === 'RESOLVED' ? (
                <CheckCircle2 size={12} className="shrink-0" />
              ) : (
                <Clock size={12} className="shrink-0" />
              )}
              {ticket.status === 'RESOLVED'
                ? 'Resolved'
                : ticket.status === 'IN_PROGRESS'
                  ? 'In Progress'
                  : 'Open'}
            </span>
          </div>
          <DialogClose
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-sm p-1 text-[#667085] outline-none hover:bg-[#f4f8f6] focus-visible:ring-2 focus-visible:ring-[#2f7d7e]"
          >
            <X size={20} strokeWidth={1.4} />
          </DialogClose>
        </div>

        <div className="mt-5 space-y-6">
          <DialogTitle className="font-nunito text-xl font-bold leading-7 text-[#263238] sm:text-2xl">
            {ticket.subject || 'Ticket Details'}
          </DialogTitle>

          {/* User information panel */}
          <div className="rounded-xl border border-[#e8ebe8] bg-[#f9fbfb] p-4">
            <p className="font-manrope text-xs font-semibold uppercase tracking-wider text-[#7d8488]">
              Submitted By
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2 text-sm text-[#263238]">
                <User size={15} className="text-[#2f7d7e]" />
                <span className="font-medium">{ticket.user?.name ?? 'Anonymous Parent'}</span>
              </div>
              {ticket.user?.email && (
                <div className="flex items-center gap-2 text-sm text-[#515b60]">
                  <Mail size={15} className="text-[#2f7d7e]" />
                  <span>{ticket.user.email}</span>
                </div>
              )}
              {ticket.user?.phone && (
                <div className="flex items-center gap-2 text-sm text-[#515b60]">
                  <Phone size={15} className="text-[#2f7d7e]" />
                  <span>{ticket.user.phone}</span>
                </div>
              )}
              <div className="ml-auto text-xs text-[#7d8488]">{formattedDate}</div>
            </div>
          </div>

          {/* Feedback Star Rating */}
          {ticket.rating && (
            <div>
              <p className="font-manrope text-xs font-semibold uppercase tracking-wider text-[#7d8488]">
                Rating
              </p>
              <div className="mt-1 flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={20}
                    fill={star <= (ticket.rating ?? 0) ? '#f59e0b' : 'none'}
                    className={star <= (ticket.rating ?? 0) ? 'text-[#f59e0b]' : 'text-[#d8ddd9]'}
                  />
                ))}
                <span className="ml-2 font-nunito text-base font-bold text-[#263238]">
                  {ticket.rating} / 5
                </span>
              </div>
            </div>
          )}

          {/* Message content */}
          <div>
            <p className="font-manrope text-xs font-semibold uppercase tracking-wider text-[#7d8488]">
              {ticket.type === 'FEEDBACK'
                ? 'Comments / Feedback'
                : ticket.type === 'ISSUE'
                  ? 'Issue Description'
                  : 'Message'}
            </p>
            <div className="mt-2 whitespace-pre-wrap rounded-xl border border-[#e8ebe8] bg-white p-4 font-manrope text-sm leading-relaxed text-[#263238]">
              {ticket.message}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-8 flex flex-col-reverse justify-end gap-3 border-t border-[#e8ebe8] pt-4 sm:flex-row sm:gap-4">
          <button
            type="button"
            onClick={onClose}
            className="h-11 rounded-full border border-[#d4d6d7] px-6 font-nunito text-sm font-medium text-[#14094b] transition-colors hover:bg-[#f4f8f6]"
          >
            Close
          </button>
          {!isFeedback && onUpdateStatus && (
            <>
              {ticket.status === 'OPEN' && (
                <>
                  <button
                    type="button"
                    disabled={isUpdating}
                    onClick={() => onUpdateStatus(ticket.id, 'IN_PROGRESS')}
                    className="flex h-11 items-center justify-center gap-2 rounded-full border border-[#93c5fd] bg-[#eff6ff] px-5 font-nunito text-sm font-semibold text-[#2563eb] transition-colors hover:bg-[#dbeafe] disabled:opacity-60"
                  >
                    <Clock size={16} />
                    <span>Mark as In Progress</span>
                  </button>
                  <button
                    type="button"
                    disabled={isUpdating}
                    onClick={() => onUpdateStatus(ticket.id, 'RESOLVED')}
                    className="flex h-11 items-center justify-center gap-2 rounded-full border border-[#2f7d7e] bg-[#2f7d7e] px-5 font-nunito text-sm font-semibold text-white transition-colors hover:bg-[#276a6b] disabled:opacity-60"
                  >
                    <CheckCircle2 size={16} />
                    <span>Mark as Done</span>
                  </button>
                </>
              )}
              {ticket.status === 'IN_PROGRESS' && (
                <>
                  <button
                    type="button"
                    disabled={isUpdating}
                    onClick={() => onUpdateStatus(ticket.id, 'OPEN')}
                    className="flex h-11 items-center justify-center gap-2 rounded-full border border-[#d4d6d7] bg-white px-5 font-nunito text-sm font-semibold text-[#515b60] transition-colors hover:bg-[#f4f8f6] disabled:opacity-60"
                  >
                    <RotateCcw size={16} />
                    <span>Revert to Open</span>
                  </button>
                  <button
                    type="button"
                    disabled={isUpdating}
                    onClick={() => onUpdateStatus(ticket.id, 'RESOLVED')}
                    className="flex h-11 items-center justify-center gap-2 rounded-full border border-[#2f7d7e] bg-[#2f7d7e] px-5 font-nunito text-sm font-semibold text-white transition-colors hover:bg-[#276a6b] disabled:opacity-60"
                  >
                    <CheckCircle2 size={16} />
                    <span>Mark as Done</span>
                  </button>
                </>
              )}
              {ticket.status === 'RESOLVED' && (
                <button
                  type="button"
                  disabled={isUpdating}
                  onClick={() => onUpdateStatus(ticket.id, 'OPEN')}
                  className="flex h-11 items-center justify-center gap-2 rounded-full border border-[#d4d6d7] bg-white px-6 font-nunito text-sm font-semibold text-[#515b60] transition-colors hover:bg-[#f4f8f6] disabled:opacity-60"
                >
                  <RotateCcw size={16} />
                  <span>Reopen Ticket</span>
                </button>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
