'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FileText, Paperclip, Send, X, Loader2, MessageSquare } from 'lucide-react';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import { useParentThread } from '@/features/messages/hooks/messages.queries';
import { useSendMessage } from '@/features/messages/hooks/messages.mutations';
import { useSession } from '@/services/api/auth/auth.queries';
import { useAppStore } from '@/store/use-app-store';
import { useChildProfiles } from '@/features/child-profiles/hooks/child-profiles.queries';
import { MessageAttachment } from '@/features/messages/components/message-attachment';
import type { Message } from '@/features/messages/model/message.types';

function formatMessageTime(isoString: string): string {
  try {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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

function DateSeparator({ label }: { label: string }) {
  return (
    <div className="flex w-full justify-center my-2">
      <span className="rounded-full bg-[#eeeeee] px-4 py-1 font-manrope text-[11px] font-medium tracking-[0.22px] text-[#515b60]">
        {label}
      </span>
    </div>
  );
}

export function ParentMessagesPage() {
  const { data: session } = useSession();
  const { data: thread, isLoading, isError } = useParentThread();
  const sendMessageMutation = useSendMessage();

  const { data: children = [] } = useChildProfiles();
  const { selectedChildId } = useAppStore();
  const activeChild = children.find((c) => c.id === selectedChildId) || children[0] || null;

  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentUserId = session?.user?.id;

  const messages = thread?.messages || [];

  // Scroll to bottom whenever new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    const content = message.trim();
    if (!content && !selectedFile) return;

    try {
      await sendMessageMutation.mutateAsync({
        threadId: thread?.id,
        content: content || undefined,
        file: selectedFile || undefined,
      });

      setMessage('');
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to send message.';
      toast.error(msg);
    }
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

  const adminName = thread?.admin?.name || 'Jaicy, OT';

  return (
    <div className="mx-auto flex h-[calc(100dvh-6.5rem)] w-full max-w-5xl min-w-0 flex-col">
      <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-[#d8ddd9] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
        {/* Chat Header */}
        <header className="flex shrink-0 items-center justify-between border-b border-[#edeef0] bg-[#fffdf8] px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center gap-3">
            <span className="relative flex size-11 items-center justify-center rounded-full bg-[#2f7d7e] font-nunito text-base font-bold text-white shadow-xs">
              J
              <span
                className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-white bg-[#22c55e]"
                title="Online"
              />
            </span>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h1 className="font-nunito text-lg font-bold leading-6 text-[#263238]">
                  {adminName}
                </h1>
                <span className="hidden rounded-full border border-[#accbcb] bg-[#e9f3f2] px-2 py-0.5 font-nunito text-[11px] font-medium text-[#2f7d7e] sm:inline-block">
                  Therapist Support
                </span>
              </div>
              <p className="font-manrope text-xs text-[#7d8488]">
                Occupational Therapist ·{' '}
                <span className="text-[#22c55e] font-medium">Active Now</span>
              </p>
            </div>
          </div>

          {activeChild && (
            <div className="flex items-center gap-2">
              <span className="hidden text-right text-xs font-manrope text-[#7d8488] md:block">
                Discussing plan for:
              </span>
              <Link
                href={`/dashboard/child-profiles/${activeChild.id}`}
                className="flex items-center gap-2 rounded-full border border-[#accbcb] bg-[#f7fbfa] px-3 py-1.5 transition-colors hover:bg-[#ebf5f3]"
              >
                <span className="relative flex size-5 overflow-hidden rounded-full bg-[#d5e5e5]">
                  {activeChild.photoUrl ? (
                    <Image
                      src={activeChild.photoUrl}
                      alt={activeChild.name}
                      fill
                      sizes="20px"
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <span className="flex size-full items-center justify-center font-nunito text-[10px] font-bold text-[#2f7d7e]">
                      {activeChild.name.charAt(0)}
                    </span>
                  )}
                </span>
                <span className="font-nunito text-xs font-semibold text-[#2f7d7e]">
                  {activeChild.name}
                </span>
              </Link>
            </div>
          )}
        </header>

        {/* Chat Messages Body */}
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
          {isLoading ? (
            <div className="flex flex-1 items-center justify-center">
              <Loader2 className="size-8 animate-spin text-[#2f7d7e]" />
            </div>
          ) : isError ? (
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <p className="font-manrope text-sm text-[#b24b4b]">
                Unable to load messages. Please try again.
              </p>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center text-center px-4">
              <div className="flex size-14 items-center justify-center rounded-full bg-[#f0f7f5] text-[#2f7d7e]">
                <MessageSquare className="size-7" />
              </div>
              <h2 className="mt-4 font-nunito text-lg font-bold text-[#263238]">
                Start a Conversation with Jaicy
              </h2>
              <p className="mt-1.5 max-w-md font-manrope text-sm text-[#7d8488]">
                Ask questions about your child&apos;s weekly plan, activity adaptations,
                developmental milestones, or therapy toy recommendations.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {[
                  'How can I adapt this week’s activity?',
                  'Tips for handling transitions?',
                  'Recommendation for sensory toys?',
                ].map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => setMessage(prompt)}
                    className="rounded-full border border-[#d8ddd9] bg-white px-3.5 py-1.5 font-manrope text-xs font-medium text-[#515b60] transition-colors hover:border-[#2f7d7e] hover:text-[#2f7d7e]"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {messages.map((msg: Message, index: number) => {
                const isSentByMe = msg.senderId === currentUserId || msg.sender?.role === 'PARENTS';

                const prevMsg = messages[index - 1];
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
                      /* Sent Bubble (Parent) */
                      <div className="flex w-full justify-end">
                        <div className="flex max-w-[85%] min-w-0 flex-col items-end gap-1 sm:max-w-md">
                          {hasText ? (
                            <div className="rounded-bl-2xl rounded-tl-2xl rounded-tr-2xl bg-[#d5e5e5] px-4 py-3 font-manrope text-sm leading-6 tracking-[-0.176px] text-[#272f3a] sm:text-base">
                              <p className="whitespace-pre-wrap">{msg.content}</p>
                              {hasAttachment && (
                                <div className="mt-2.5">
                                  <MessageAttachment url={msg.attachment!} isSentByMe={false} />
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
                    ) : (
                      /* Received Message (Admin / Therapist) */
                      <div className="flex items-start gap-3 sm:gap-4">
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#2f7d7e] font-nunito text-xs font-bold text-white">
                          J
                        </span>
                        <div className="flex min-w-0 max-w-[85%] flex-1 flex-col items-start gap-1 sm:max-w-md">
                          {hasText ? (
                            <div className="rounded-bl-2xl rounded-br-2xl rounded-tr-2xl border border-[#e8ebe8] bg-white px-4 py-3 font-manrope text-sm leading-6 tracking-[-0.176px] text-[#272f3a] shadow-2xs sm:text-base">
                              <p className="whitespace-pre-wrap">{msg.content}</p>
                              {hasAttachment && (
                                <div className="mt-2.5">
                                  <MessageAttachment url={msg.attachment!} isSentByMe={false} />
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

        {/* Message Composer */}
        <div className="border-t border-[#edeef0] bg-[#fafafa] p-3 sm:p-4">
          {/* Selected File Preview */}
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

          <form onSubmit={handleSend} className="flex flex-col gap-2">
            <div className="flex items-end gap-2">
              <div className="relative flex min-h-11 flex-1 items-center rounded-2xl border border-[#d8ddd9] bg-white px-3 py-2 shadow-2xs focus-within:border-[#2f7d7e]">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSend(e);
                    }
                  }}
                  placeholder={`Message ${adminName}...`}
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
                disabled={sendMessageMutation.isPending || (!message.trim() && !selectedFile)}
                className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[#2f7d7e] text-white shadow-xs transition-opacity hover:bg-[#276a6b] disabled:opacity-50 disabled:hover:bg-[#2f7d7e]"
                aria-label="Send message"
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
      </section>
    </div>
  );
}

export default ParentMessagesPage;
