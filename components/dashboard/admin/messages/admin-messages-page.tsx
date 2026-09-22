'use client';

import Link from 'next/link';
import {
  Search,
  ChevronLeft,
  FileText,
  Paperclip,
  Send,
  X,
  Loader2,
  MessageSquare,
  Baby,
} from 'lucide-react';
import { FormEvent, useEffect, useRef, useState, useMemo } from 'react';
import { toast } from 'sonner';

import { useAdminThreads, useThreadMessages } from '@/features/messages/hooks/messages.queries';
import { useSendMessage } from '@/features/messages/hooks/messages.mutations';
import { useSession } from '@/services/api/auth/auth.queries';
import {
  MessageAttachment,
  isImageAttachment,
} from '@/features/messages/components/message-attachment';
import type { Message, MessageThread } from '@/features/messages/model/message.types';
import { useQueryClient } from '@tanstack/react-query';
import { useThreadSocket } from '@/features/messages/socket/messages-socket-context';
import { messageKeys } from '@/features/messages/message.keys';

function formatMessageTime(isoString: string): string {
  try {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch {
    return '';
  }
}

function formatRelativeTime(isoString: string): string {
  try {
    const date = new Date(isoString);
    const now = new Date();
    const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffSeconds < 60) return 'Just now';
    if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)}m ago`;
    if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)}h ago`;

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

function formatMessageDateHeader(isoString: string): string {
  try {
    const date = new Date(isoString);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'TODAY';
    }
    if (date.toDateString() === yesterday.toDateString()) {
      return 'YESTERDAY';
    }
    return date.toLocaleDateString([], {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return 'RECENT';
  }
}

function formatFileSize(bytes?: number): string {
  if (!bytes) return '';
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getMessagePreview(msg?: Message | null): string {
  if (!msg) return 'No messages yet';
  if (msg.content?.trim()) return msg.content;
  if (msg.attachment) {
    return isImageAttachment(msg.attachment) ? '📷 Photo' : '📎 Attachment';
  }
  return 'Message';
}

function formatChildAge(child?: { ageYears?: number; ageMonths?: number; age?: number }): string {
  if (!child) return '';
  const years = child.ageYears ?? 0;
  const months = child.ageMonths ?? 0;
  if (years > 0 && months > 0) return `${years}y ${months}m`;
  if (years > 0) return `${years}y`;
  if (months > 0) return `${months}m`;
  if (child.age && child.age > 0) return `${child.age}y`;
  return '';
}

function getChildrenSummary(
  children?: { name: string; ageYears?: number; ageMonths?: number; age?: number }[]
): string {
  if (!children || children.length === 0) return '';
  return children
    .map((c) => {
      const age = formatChildAge(c);
      return age ? `${c.name} (${age})` : c.name;
    })
    .join(', ');
}

function DateSeparator({ label }: { label: string }) {
  return (
    <div className="flex w-full justify-center my-2">
      <span className="rounded-full bg-[#eeeeee] px-4 py-1 font-manrope text-[11px] font-medium tracking-[0.22px] text-[#515b60]">
        {label}
      </span>
    </div>
  );
}

export function AdminMessagesPage() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const { data: threads = [], isLoading: isThreadsLoading } = useAdminThreads();
  const sendMessageMutation = useSendMessage();

  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [conversationOpen, setConversationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [replyText, setReplyText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [partnerTyping, setPartnerTyping] = useState(false);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentUserId = session?.user?.id;

  // Fallback to first thread when none is explicitly selected
  const activeThread = useMemo(() => {
    if (selectedThreadId) {
      const found = threads.find((t) => t.id === selectedThreadId);
      if (found) return found;
    }
    return threads[0] || null;
  }, [threads, selectedThreadId]);

  // Query live messages for the active thread
  const { data: activeThreadMessages = [], isLoading: isMessagesLoading } = useThreadMessages(
    activeThread?.id
  );

  const { sendTyping } = useThreadSocket(activeThread?.id, {
    onNewMessage: (msg) => {
      // Update active thread messages in cache
      queryClient.setQueryData(
        messageKeys.threadMessages(msg.threadId),
        (old: Message[] | undefined) => {
          if (!old) return [msg];
          if (old.some((m) => m.id === msg.id)) return old;
          return [...old, msg];
        }
      );
      // Update thread list in cache so sidebar preview shows latest message
      queryClient.setQueryData(messageKeys.adminThreads(), (old: MessageThread[] | undefined) => {
        if (!old) return old;
        return old.map((t) =>
          t.id === msg.threadId ? { ...t, messages: [msg], updatedAt: msg.createdAt } : t
        );
      });
      if (msg.threadId === activeThread?.id) {
        setPartnerTyping(false);
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    onMessagesRead: (payload) => {
      queryClient.setQueryData(
        messageKeys.threadMessages(payload.threadId),
        (old: Message[] | undefined) => {
          if (!old) return old;
          return old.map((m) => (m.senderId !== payload.readerUserId ? { ...m, isRead: true } : m));
        }
      );
    },
    onUserTyping: (payload) => {
      if (payload.userId !== currentUserId && payload.threadId === activeThread?.id) {
        setPartnerTyping(payload.isTyping);
        if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
        if (payload.isTyping) {
          typingTimerRef.current = setTimeout(() => {
            setPartnerTyping(false);
          }, 3500);
        }
      }
    },
  });

  // Filter threads by search query (matching parent name or child name)
  const filteredThreads = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return threads;
    return threads.filter((t) => {
      const parentName = t.parent?.name?.toLowerCase() || '';
      const parentEmail = t.parent?.email?.toLowerCase() || '';
      const childrenNames = t.parent?.children?.map((c) => c.name.toLowerCase()).join(' ') || '';
      return parentName.includes(q) || parentEmail.includes(q) || childrenNames.includes(q);
    });
  }, [threads, searchQuery]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeThreadMessages.length]);

  const handleSendReply = async (e: FormEvent) => {
    e.preventDefault();
    const content = replyText.trim();
    if (!content && !selectedFile) return;
    if (!activeThread?.id) return;

    sendTyping(false);
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);

    try {
      await sendMessageMutation.mutateAsync({
        threadId: activeThread.id,
        content: content || undefined,
        file: selectedFile || undefined,
      });

      setReplyText('');
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to send message.';
      toast.error(msg);
    }
  };

  const handleReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyText(e.target.value);
    sendTyping(true);
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    typingTimerRef.current = setTimeout(() => {
      sendTyping(false);
    }, 2500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error('File size cannot exceed 10 MB.');
      return;
    }
    setSelectedFile(file);
  };

  return (
    <div className="mx-auto flex h-[calc(100dvh-6.5rem)] w-full max-w-7xl min-w-0 flex-col">
      <div className="grid h-full min-h-0 w-full min-w-0 items-stretch gap-6 xl:grid-cols-[380px_minmax(0,1fr)]">
        {/* Left Column: Parent Conversations Master List */}
        <aside
          className={`flex min-h-0 flex-col overflow-hidden rounded-2xl border border-[#d8ddd9] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)] ${
            conversationOpen ? 'hidden xl:flex' : 'flex'
          }`}
          aria-label="Parent Conversations"
        >
          {/* Header */}
          <div className="border-b border-[#edeef0] p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <h1 className="font-nunito text-xl font-bold leading-7 text-[#263238]">
                Parent Messages
              </h1>
              <span className="rounded-full bg-[#f0f7f5] px-2.5 py-0.5 font-nunito text-xs font-semibold text-[#2f7d7e]">
                {threads.length} {threads.length === 1 ? 'thread' : 'threads'}
              </span>
            </div>

            {/* Search Input */}
            <div className="relative mt-3">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#7d8488]" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search parents or children..."
                className="h-9 w-full rounded-xl border border-[#d8ddd9] bg-[#fafafa] pl-9 pr-3 font-manrope text-xs text-[#263238] outline-none placeholder:text-[#a8adaf] focus:border-[#2f7d7e]"
              />
            </div>
          </div>

          {/* Threads List */}
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-2 sm:p-3">
            {isThreadsLoading ? (
              <div className="flex flex-1 items-center justify-center p-8">
                <Loader2 className="size-6 animate-spin text-[#2f7d7e]" />
              </div>
            ) : filteredThreads.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
                <MessageSquare className="size-8 text-[#a8adaf]" />
                <p className="mt-2 font-nunito text-sm font-semibold text-[#263238]">
                  No conversations found
                </p>
                <p className="mt-1 font-manrope text-xs text-[#7d8488]">
                  {searchQuery
                    ? 'Try a different search keyword.'
                    : 'When parents send messages, they will appear here.'}
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-1.5">
                {filteredThreads.map((threadItem: MessageThread) => {
                  const isSelected = threadItem.id === activeThread?.id;
                  const parent = threadItem.parent;
                  const childrenSummary = getChildrenSummary(parent?.children);
                  const lastMsg = threadItem.messages?.[0];
                  const unread = threadItem.unreadCount || 0;

                  return (
                    <button
                      key={threadItem.id}
                      type="button"
                      onClick={() => {
                        setSelectedThreadId(threadItem.id);
                        setConversationOpen(true);
                      }}
                      className={`flex w-full items-start gap-3 rounded-xl p-3 text-left transition-colors ${
                        isSelected ? 'border border-[#8fb9a8] bg-[#f0f7f5]' : 'hover:bg-[#f8fbfa]'
                      }`}
                    >
                      <span className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-[#2f7d7e] font-nunito text-sm font-bold text-white shadow-xs">
                        {parent?.name ? parent.name.charAt(0).toUpperCase() : 'P'}
                        {unread > 0 && (
                          <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-[#b24b4b] text-[9px] font-bold text-white border-2 border-white">
                            {unread}
                          </span>
                        )}
                      </span>

                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-center justify-between gap-1">
                          <span className="truncate font-nunito text-sm font-bold text-[#263238]">
                            {parent?.name || 'Parent'}
                          </span>
                          <span className="shrink-0 font-manrope text-[11px] text-[#7d8488]">
                            {lastMsg ? formatRelativeTime(lastMsg.createdAt) : ''}
                          </span>
                        </div>

                        {childrenSummary && (
                          <span className="flex items-center gap-1 font-manrope text-xs text-[#2f7d7e] truncate font-medium">
                            <Baby className="size-3 shrink-0" />
                            {childrenSummary}
                          </span>
                        )}

                        <p
                          className={`mt-0.5 truncate font-manrope text-xs ${
                            unread > 0 ? 'font-semibold text-[#1e282d]' : 'text-[#7d8488]'
                          }`}
                        >
                          {getMessagePreview(lastMsg)}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </aside>

        {/* Right Column: Active Conversation Pane */}
        <section
          className={`flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-[#d8ddd9] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)] ${
            conversationOpen ? 'flex' : 'hidden xl:flex'
          }`}
          aria-label="Active Conversation"
        >
          {activeThread ? (
            <>
              {/* Conversation Header */}
              <header className="flex shrink-0 items-center justify-between border-b border-[#edeef0] bg-[#fffdf8] px-4 py-3 sm:px-6 sm:py-4">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setConversationOpen(false)}
                    className="flex size-9 shrink-0 items-center justify-center rounded-lg text-[#2f7d7e] hover:bg-[#f0f7f5] xl:hidden"
                    aria-label="Back to threads"
                  >
                    <ChevronLeft className="size-5" />
                  </button>

                  <span className="relative flex size-10 items-center justify-center rounded-full bg-[#2f7d7e] font-nunito text-base font-bold text-white shadow-xs">
                    {activeThread.parent?.name
                      ? activeThread.parent.name.charAt(0).toUpperCase()
                      : 'P'}
                  </span>

                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <h2 className="font-nunito text-base font-bold leading-6 text-[#263238]">
                        {activeThread.parent?.name || 'Parent'}
                      </h2>
                      <span className="text-xs font-manrope text-[#7d8488]">
                        ({activeThread.parent?.email})
                      </span>
                    </div>

                    {activeThread.parent?.children && activeThread.parent.children.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                        <span className="text-[11px] font-manrope text-[#7d8488]">Children:</span>
                        {activeThread.parent.children.map((ch) => (
                          <Link
                            key={ch.id}
                            href={`/dashboard/child-profiles/${ch.id}`}
                            className="rounded-full border border-[#accbcb] bg-[#f0f7f5] px-2 py-0.5 font-nunito text-[11px] font-medium text-[#2f7d7e] hover:bg-[#e0efe9]"
                          >
                            {ch.name} ({formatChildAge(ch)})
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </header>

              {/* Messages Body */}
              <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
                {isMessagesLoading && activeThreadMessages.length === 0 ? (
                  <div className="flex flex-1 items-center justify-center">
                    <Loader2 className="size-8 animate-spin text-[#2f7d7e]" />
                  </div>
                ) : activeThreadMessages.length === 0 ? (
                  <div className="flex flex-1 flex-col items-center justify-center text-center p-6">
                    <MessageSquare className="size-8 text-[#7d8488]" />
                    <p className="mt-2 font-nunito text-sm font-semibold text-[#263238]">
                      No messages in this conversation yet.
                    </p>
                    <p className="font-manrope text-xs text-[#7d8488]">
                      Send a message below to reach out to{' '}
                      {activeThread.parent?.name || 'the parent'}.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {activeThreadMessages.map((msg: Message, index: number) => {
                      // Admin is sender
                      const isSentByMe =
                        msg.senderId === currentUserId || msg.sender?.role === 'ADMIN';

                      const prevMsg = activeThreadMessages[index - 1];
                      const showDateHeader =
                        !prevMsg ||
                        formatMessageDateHeader(prevMsg.createdAt) !==
                          formatMessageDateHeader(msg.createdAt);

                      const hasText = Boolean(msg.content?.trim());
                      const hasAttachment = Boolean(msg.attachment);

                      return (
                        <div key={msg.id} className="flex flex-col">
                          {showDateHeader && (
                            <DateSeparator label={formatMessageDateHeader(msg.createdAt)} />
                          )}

                          {isSentByMe ? (
                            /* Sent Bubble (Admin) */
                            <div className="flex w-full justify-end">
                              <div className="flex max-w-[85%] min-w-0 flex-col items-end gap-1 sm:max-w-md">
                                {hasText ? (
                                  <div className="rounded-bl-2xl rounded-tl-2xl rounded-tr-2xl bg-[#2f7d7e] px-4 py-3 font-manrope text-sm leading-6 tracking-[-0.176px] text-white sm:text-base">
                                    <p className="whitespace-pre-wrap">{msg.content}</p>
                                    {hasAttachment && (
                                      <div className="mt-2.5">
                                        <MessageAttachment
                                          url={msg.attachment!}
                                          isSentByMe={true}
                                        />
                                      </div>
                                    )}
                                  </div>
                                ) : hasAttachment ? (
                                  <MessageAttachment url={msg.attachment!} isSentByMe={true} />
                                ) : null}
                                <span className="font-manrope text-[11px] leading-4 text-[#7d8488]">
                                  {formatMessageTime(msg.createdAt)}
                                </span>
                              </div>
                            </div>
                          ) : (
                            /* Received Bubble (Parent) */
                            <div className="flex items-start gap-3 sm:gap-4">
                              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#8fb9a8] font-nunito text-xs font-bold text-white">
                                {activeThread.parent?.name
                                  ? activeThread.parent.name.charAt(0).toUpperCase()
                                  : 'P'}
                              </span>
                              <div className="flex min-w-0 max-w-[85%] flex-1 flex-col items-start gap-1 sm:max-w-md">
                                {hasText ? (
                                  <div className="rounded-bl-2xl rounded-br-2xl rounded-tr-2xl border border-[#e8ebe8] bg-white px-4 py-3 font-manrope text-sm leading-6 tracking-[-0.176px] text-[#272f3a] shadow-2xs sm:text-base">
                                    <p className="whitespace-pre-wrap">{msg.content}</p>
                                    {hasAttachment && (
                                      <div className="mt-2.5">
                                        <MessageAttachment
                                          url={msg.attachment!}
                                          isSentByMe={false}
                                        />
                                      </div>
                                    )}
                                  </div>
                                ) : hasAttachment ? (
                                  <MessageAttachment url={msg.attachment!} isSentByMe={false} />
                                ) : null}
                                <span className="font-manrope text-[11px] leading-4 text-[#7d8488]">
                                  {formatMessageTime(msg.createdAt)}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              {/* Reply Composer */}
              <div className="border-t border-[#edeef0] bg-[#fafafa] p-3 sm:p-4">
                {selectedFile && (
                  <div className="mb-2 flex items-center justify-between rounded-xl border border-[#d8ddd9] bg-white px-3 py-2">
                    <div className="flex items-center gap-2 truncate">
                      <FileText className="size-4 text-[#2f7d7e] shrink-0" />
                      <span className="truncate font-manrope text-xs font-medium text-[#263238]">
                        {selectedFile.name}
                      </span>
                      <span className="text-[10px] text-[#7d8488] shrink-0">
                        ({formatFileSize(selectedFile.size)})
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFile(null);
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                      className="flex size-5 items-center justify-center rounded-full text-[#7d8488] transition-colors hover:bg-gray-100 hover:text-[#b24b4b]"
                      aria-label="Remove attachment"
                    >
                      <X className="size-3.5" />
                    </button>
                  </div>
                )}

                {/* Typing Indicator */}
                {partnerTyping && (
                  <div className="mb-2 flex items-center gap-2 px-1 font-manrope text-xs italic text-[#7d8488]">
                    <span className="flex items-center gap-1">
                      <span className="size-1.5 animate-bounce rounded-full bg-[#2f7d7e]" />
                      <span className="size-1.5 animate-bounce rounded-full bg-[#2f7d7e] [animation-delay:0.2s]" />
                      <span className="size-1.5 animate-bounce rounded-full bg-[#2f7d7e] [animation-delay:0.4s]" />
                    </span>
                    <span>{activeThread.parent?.name || 'Parent'} is typing...</span>
                  </div>
                )}

                <form onSubmit={handleSendReply} className="flex flex-col gap-2">
                  <div className="flex items-end gap-2">
                    <div className="relative flex min-h-11 flex-1 items-center rounded-2xl border border-[#d8ddd9] bg-white px-3 py-2 shadow-2xs focus-within:border-[#2f7d7e]">
                      <textarea
                        value={replyText}
                        onChange={handleReplyChange}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendReply(e);
                          }
                        }}
                        placeholder={`Reply to ${activeThread.parent?.name || 'parent'}...`}
                        rows={1}
                        className="min-h-6 flex-1 resize-none bg-transparent font-manrope text-sm leading-5 text-[#272f3a] outline-none placeholder:text-[#a8adaf]"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="ml-1 flex size-8 shrink-0 items-center justify-center rounded-lg text-[#7d8488] transition-colors hover:bg-[#f0f7f5] hover:text-[#2f7d7e]"
                        aria-label="Attach file"
                      >
                        <Paperclip className="size-4.5" />
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif,application/pdf"
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={
                        sendMessageMutation.isPending || (!replyText.trim() && !selectedFile)
                      }
                      className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#2f7d7e] text-white shadow-xs transition-opacity hover:bg-[#276a6b] disabled:opacity-50 disabled:hover:bg-[#2f7d7e]"
                      aria-label="Send reply"
                    >
                      {sendMessageMutation.isPending ? (
                        <Loader2 className="size-5 animate-spin" />
                      ) : (
                        <Send className="size-4.5" />
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center text-center p-8">
              <MessageSquare className="size-12 text-[#a8adaf]" />
              <h2 className="mt-3 font-nunito text-lg font-bold text-[#263238]">
                Select a Conversation
              </h2>
              <p className="mt-1 font-manrope text-sm text-[#7d8488]">
                Choose a parent conversation from the left to view their messages and reply.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default AdminMessagesPage;
