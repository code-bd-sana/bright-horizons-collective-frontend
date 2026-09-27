'use client';

import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useAdminThreads } from '@/features/messages/hooks/messages.queries';
import { isImageAttachment } from '@/features/messages/components/message-attachment';
import type { Message } from '@/features/messages/model/message.types';

function getInitials(name?: string): string {
  if (!name) return 'P';
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return parts[0].slice(0, 2).toUpperCase();
}

function getChildSummary(
  children?: Array<{ name: string; ageYears?: number; ageMonths?: number; age?: number }>
): string {
  if (!children || children.length === 0) return '';
  const first = children[0];
  const age =
    first.ageYears !== undefined
      ? `${first.ageYears}y`
      : first.age !== undefined
        ? `${first.age}y`
        : '';
  return age ? `${first.name}, ${age}` : first.name;
}

function formatRelativeTime(isoString?: string): string {
  if (!isoString) return '';
  try {
    const date = new Date(isoString);
    const now = new Date();
    const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffSeconds < 60) return 'Just now';
    if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)} min ago`;
    if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)} hr ago`;

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }

    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  } catch {
    return '';
  }
}

function getMessagePreview(msg?: Message | null): string {
  if (!msg) return 'No messages yet';
  if (msg.content?.trim()) return msg.content;
  if (msg.attachment) {
    return isImageAttachment(msg.attachment) ? 'Photo' : 'Attachment';
  }
  return 'New message';
}

export function ParentMessages() {
  const { data: threads = [], isLoading } = useAdminThreads();

  // Filter for threads with unread messages from parents, sorted by most recent
  const unreadThreads = threads
    .filter((t) => (t.unreadCount ?? 0) > 0)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  return (
    <section
      className="min-w-0 overflow-hidden rounded-2xl border border-[#e3e9e8] bg-white shadow-[0_4px_8px_rgba(38,50,56,0.05)]"
      aria-labelledby="parent-messages-heading"
    >
      <div className="flex min-h-20.75 flex-col items-start justify-center gap-2 px-4 py-4 min-[480px]:flex-row min-[480px]:items-center min-[480px]:justify-between min-[480px]:gap-4 sm:px-6 sm:py-5">
        <div className="flex items-center gap-2">
          <h2
            id="parent-messages-heading"
            className="font-nunito text-xl font-medium leading-7 text-[#263238] sm:text-2xl sm:leading-8"
          >
            Parent Messages
          </h2>
          {unreadThreads.length > 0 && (
            <span className="rounded-full bg-[#e9f3f2] px-2 py-0.5 font-manrope text-xs font-semibold text-[#27898a]">
              {unreadThreads.length} unread
            </span>
          )}
        </div>
        <Link
          href="/dashboard/admin/messages"
          className="inline-flex items-center gap-1 font-manrope text-sm leading-5.5 text-[#27898a] hover:underline"
        >
          Open Inbox <ArrowRight aria-hidden="true" size={16} strokeWidth={1.75} />
        </Link>
      </div>

      <div className="border-t border-[#e3e9e8]">
        {isLoading ? (
          <div className="space-y-4 p-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 animate-pulse">
                <div className="size-9 rounded-full bg-gray-200" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-4 w-32 rounded bg-gray-200" />
                  <div className="h-3 w-48 rounded bg-gray-100" />
                </div>
              </div>
            ))}
          </div>
        ) : unreadThreads.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <CheckCircle2 className="size-8 text-[#2f7d7e]" />
            <p className="mt-2 font-nunito text-base font-bold text-[#263238]">
              No Unread Messages
            </p>
            <p className="mt-0.5 font-manrope text-xs text-[#7893a5]">
              All parent messages have been reviewed.
            </p>
          </div>
        ) : (
          unreadThreads.map((thread) => {
            const parentName = thread.parent?.name || 'Parent';
            const initials = getInitials(parentName);
            const childInfo = getChildSummary(thread.parent?.children);
            const latestMsg = thread.messages?.[0];
            const preview = getMessagePreview(latestMsg);
            const time = formatRelativeTime(latestMsg?.createdAt || thread.updatedAt);
            const badgeText =
              (thread.unreadCount ?? 0) > 1 ? `${thread.unreadCount} Unread` : 'Unread';

            return (
              <Link
                key={thread.id}
                href={`/dashboard/admin/messages?threadId=${thread.id}`}
                className="grid min-h-17.75 grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-1 border-b border-[#e3e9e8] px-4 py-3 transition-colors hover:bg-[#fbfdfc] last:border-b-0 2xl:flex 2xl:px-6"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#edf4f4] font-manrope text-xs font-semibold text-[#27898a]">
                  {initials}
                </span>
                <div className="col-start-2 min-w-0 flex-1">
                  <p className="truncate font-manrope text-sm leading-5.5 text-[#263238]">
                    <span className="font-semibold">{parentName}</span>
                    {childInfo && (
                      <span className="ml-2 text-xs text-[#7893a5]">· {childInfo}</span>
                    )}
                  </p>
                  <p className="truncate font-manrope text-sm leading-5.5 text-[#5f8096]">
                    {preview}
                  </p>
                </div>
                <div className="col-start-2 flex shrink-0 items-center justify-between gap-3 text-left 2xl:block 2xl:text-right">
                  <p className="font-manrope text-[11px] leading-4 text-[#a8bdc7]">{time}</p>
                  <span className="inline-flex rounded-full bg-[#e9f3f2] px-2 py-0.5 font-manrope text-xs leading-4 font-semibold text-[#27898a] 2xl:mt-1">
                    {badgeText}
                  </span>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </section>
  );
}
