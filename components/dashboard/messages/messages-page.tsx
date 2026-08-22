'use client';

import Image from 'next/image';
import { FormEvent, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

type Thread = {
  id: string;
  initial: string;
  name: string;
  preview: string;
  time: string;
  tone: string;
};

type SentMessage = {
  id: number;
  text: string;
};

const threads: Thread[] = [
  {
    id: 'jaicy-fine-motor',
    initial: 'J',
    name: 'Jaicy, OT',
    preview: "Great progress on fine motor this week! I've updated her plan for next week...",
    time: 'Today, 2:14 pm',
    tone: 'bg-[#2f7d7e]',
  },
  {
    id: 'support',
    initial: 'S',
    name: 'Support Team',
    preview: "Your membership renews on August 3rd. Here's what's changing...",
    time: 'Yesterday',
    tone: 'bg-[#8fb9a8]',
  },
  {
    id: 'jaicy-gross-motor',
    initial: 'J',
    name: 'Jaicy, OT',
    preview: "Quick note on Leo's gross motor goals before our next check-in...",
    time: 'Jul 10',
    tone: 'bg-[#2f7d7e]',
  },
];

const editorControls = [
  { id: 'bold', label: 'Bold', icon: '/figma/messages/bold.svg' },
  { id: 'italic', label: 'Italic', icon: '/figma/messages/italic.svg' },
  { id: 'list', label: 'Bulleted list', icon: '/figma/messages/bullet-list.svg' },
] as const;

function Avatar({
  initial,
  size = 'large',
  tone = 'bg-[#2f7d7e]',
}: {
  initial: string;
  size?: 'large' | 'small';
  tone?: string;
}) {
  return (
    <span
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full font-nunito text-sm font-bold leading-5 text-white',
        size === 'large' ? 'size-10' : 'size-8',
        tone
      )}
      aria-hidden="true"
    >
      {initial}
    </span>
  );
}

function ThreadList({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (thread: Thread) => void;
}) {
  return (
    <aside
      className="flex min-h-[360px] rounded-2xl border border-[#d8ddd9] bg-white p-5 min-[1800px]:min-h-[960px]"
      aria-label="Message conversations"
    >
      <div className="flex w-full flex-col gap-8">
        <header className="flex flex-col gap-1">
          <h1 className="font-nunito text-xl font-medium leading-7 text-[#475569]">Messages</h1>
          <p className="font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#7d8488]">
            Messages are typically answered within 1-2 business days
          </p>
        </header>

        <div className="flex flex-col gap-1.5">
          {threads.map((thread) => {
            const selected = thread.id === activeId;
            return (
              <button
                key={thread.id}
                type="button"
                onClick={() => onSelect(thread)}
                aria-pressed={selected}
                className={cn(
                  'flex w-full items-center gap-4 rounded-2xl p-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f7d7e]',
                  selected ? 'rounded-xl bg-[#e9f1ee]' : 'hover:bg-[#f7f8f7]'
                )}
              >
                <Avatar initial={thread.initial} tone={thread.tone} />
                <span className="flex min-w-0 flex-1 flex-col gap-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="truncate font-nunito text-sm font-semibold leading-5 tracking-[-0.084px] text-[#263238]">
                      {thread.name}
                    </span>
                    <span className="shrink-0 font-manrope text-xs leading-[18px] text-[#a8adaf]">
                      {thread.time}
                    </span>
                  </span>
                  <span className="line-clamp-2 font-manrope text-xs leading-[18px] text-[#7d8488]">
                    {thread.preview}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

function DateSeparator({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full justify-center">
      <span className="rounded-full bg-[#eeeeee] px-4 pb-[4.5px] pt-[3px] font-manrope text-[11px] font-medium leading-[15px] tracking-[0.22px] text-[#515b60]">
        {children}
      </span>
    </div>
  );
}

function ReceivedMessage({ children, time }: { children: React.ReactNode; time: string }) {
  return (
    <div className="flex items-start gap-3 sm:gap-5">
      <Avatar initial="J" size="small" />
      <div className="flex max-w-[448px] min-w-0 flex-col items-start gap-1">
        <div className="rounded-bl-2xl rounded-br-2xl rounded-tr-2xl border border-[#e8ebe8] bg-white px-4 py-3 font-manrope text-sm leading-6 tracking-[-0.176px] text-[#272f3a] sm:text-base">
          {children}
        </div>
        <span className="font-manrope text-xs leading-[18px] text-[#7d8488]">{time}</span>
      </div>
    </div>
  );
}

function SentBubble({ children, time }: { children: React.ReactNode; time: string }) {
  return (
    <div className="flex w-full justify-end">
      <div className="flex max-w-[448px] min-w-0 flex-col items-end gap-1">
        <div className="rounded-bl-2xl rounded-tl-2xl rounded-tr-2xl bg-[#d5e5e5] px-4 py-3 font-manrope text-sm leading-6 tracking-[-0.176px] text-[#272f3a] sm:text-base">
          {children}
        </div>
        <span className="font-manrope text-xs leading-[18px] text-[#7d8488]">{time}</span>
      </div>
    </div>
  );
}

function AttachmentCard() {
  return (
    <div className="flex w-full items-center gap-4 rounded-xl border border-[#e8ebe8] bg-white p-[17px]">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#fce9e3]">
        <Image src="/figma/messages/pdf-file.svg" alt="" width={20} height={20} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="truncate font-nunito text-sm font-medium leading-5 tracking-[-0.084px] text-[#263238]">
          Fine_Motor_Guide_V2.pdf
        </span>
        <span className="font-manrope text-xs leading-[18px] text-[#7d8488]">
          1.4 MB • PDF Document
        </span>
      </span>
      <button
        type="button"
        className="flex size-8 shrink-0 items-center justify-center rounded-md hover:bg-[#f4f7f6]"
        aria-label="Download Fine Motor Guide"
      >
        <Image src="/figma/messages/download.svg" alt="" width={13} height={13} />
      </button>
    </div>
  );
}

function MessageComposer({ onSend }: { onSend: (message: string) => void }) {
  const [message, setMessage] = useState('');
  const [activeControls, setActiveControls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;
    onSend(trimmedMessage);
    setMessage('');
  };

  const toggleControl = (control: string) => {
    setActiveControls((current) =>
      current.includes(control) ? current.filter((item) => item !== control) : [...current, control]
    );
  };

  return (
    <form
      onSubmit={submit}
      className="flex min-h-[121px] w-full flex-col gap-3 rounded-xl border border-[#d8ddd9] bg-[#fafafa] p-[9px]"
    >
      <div className="flex h-[25px] items-start border-b border-[#e8ebe8] px-2 pb-[9px] pt-1">
        <div className="flex items-center gap-3">
          {editorControls.map((control) => {
            const active = activeControls.includes(control.id);
            return (
              <button
                key={control.id}
                type="button"
                aria-label={control.label}
                aria-pressed={active}
                onClick={() => toggleControl(control.id)}
                className={cn(
                  'flex size-4 items-center justify-center rounded-sm',
                  active && 'bg-[#d5e5e5]'
                )}
              >
                <Image src={control.icon} alt="" width={16} height={16} />
              </button>
            );
          })}
          <span className="h-4 w-px bg-[#bbcac6]" aria-hidden="true" />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex size-4 items-center justify-center"
            aria-label="Attach a file"
          >
            <Image src="/figma/messages/attachment.svg" alt="" width={16} height={16} />
          </button>
          <input ref={fileInputRef} type="file" className="sr-only" tabIndex={-1} />
        </div>
      </div>

      <div className="flex min-h-[62px] items-end gap-4 px-2 pb-2">
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault();
              event.currentTarget.form?.requestSubmit();
            }
          }}
          aria-label="Message"
          placeholder="Type a message..."
          rows={2}
          className={cn(
            'min-h-10 flex-1 resize-none bg-transparent pb-[7px] font-manrope text-base leading-6 tracking-[-0.176px] text-[#272f3a] outline-none placeholder:text-[#7d8488]',
            activeControls.includes('bold') && 'font-bold',
            activeControls.includes('italic') && 'italic'
          )}
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className="flex h-10 shrink-0 items-center justify-center rounded-[14px] bg-[#2f7d7e] px-5 py-2.5 font-sans text-sm font-semibold leading-5 text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
        >
          Send
        </button>
      </div>
    </form>
  );
}

function Conversation({ thread }: { thread: Thread }) {
  const [sentMessages, setSentMessages] = useState<SentMessage[]>([]);

  return (
    <section
      className="flex min-h-[680px] min-w-0 flex-col gap-8 rounded-2xl border border-[#d8ddd9] bg-white p-4 sm:p-6 min-[1800px]:h-[960px] min-[1800px]:w-[848px] min-[1800px]:p-8"
      aria-label={`Conversation with ${thread.name}`}
    >
      <div className="flex min-h-0 flex-1 flex-col gap-5">
        <header className="flex items-center gap-2.5 border-b border-[#edeef0] pb-3">
          <span className="relative">
            <Avatar initial={thread.initial} tone={thread.tone} />
            <span
              className="absolute bottom-[3px] right-0 size-2.5 rounded-full border-2 border-white bg-[#22c55e]"
              aria-label="Online"
            />
          </span>
          <span className="flex min-w-0 flex-col text-sm tracking-[-0.084px]">
            <span className="truncate font-nunito font-semibold leading-5 text-[#263238]">
              {thread.name}
            </span>
            <span className="font-manrope leading-[22px] text-[#7d8488]">Active Now</span>
          </span>
        </header>

        <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto pr-1 scrollbar-none [&::-webkit-scrollbar]:hidden">
          <DateSeparator>YESTERDAY</DateSeparator>
          <ReceivedMessage time="10:15 AM">
            Hi Sarah! I wanted to check in and see how Emma did with the “Stack and Sort” game we
            discussed during Monday&apos;s session.
          </ReceivedMessage>
          <SentBubble time="10:25 AM">
            It went really well! He stayed engaged for about 12 minutes before getting distracted.
            He struggled a bit with the smaller yellow blocks but managed the large ones easily.
          </SentBubble>
          <div className="flex items-start gap-3 sm:gap-5">
            <Avatar initial="J" size="small" />
            <div className="flex w-full max-w-[448px] min-w-0 flex-col items-start gap-1">
              <div className="rounded-bl-2xl rounded-br-2xl rounded-tr-2xl border border-[#e8ebe8] bg-white px-4 py-3 font-manrope text-sm leading-6 tracking-[-0.176px] text-[#272f3a] sm:text-base">
                That&apos;s great progress! 12 minutes is a significant improvement in focus. For
                the smaller blocks, try using the “Hand-over Hand” technique I&apos;ve outlined in
                the attachment below.
              </div>
              <AttachmentCard />
              <span className="font-manrope text-xs leading-[18px] text-[#7d8488]">10:45 AM</span>
            </div>
          </div>
          <DateSeparator>TODAY</DateSeparator>
          <SentBubble time="Just now">
            Will do! We&apos;ll practice it tonight. Do we still have the session scheduled for
            Friday at 4 PM?
          </SentBubble>
          {sentMessages.map((sentMessage) => (
            <SentBubble key={sentMessage.id} time="Just now">
              {sentMessage.text}
            </SentBubble>
          ))}
        </div>
      </div>

      <MessageComposer
        onSend={(text) => setSentMessages((current) => [...current, { id: Date.now(), text }])}
      />
    </section>
  );
}

export function MessagesPage() {
  const [activeThread, setActiveThread] = useState(threads[0]);

  return (
    <div className="w-full min-[1800px]:ml-[97px] min-[1800px]:w-[1280px]">
      <div className="grid items-stretch gap-6 xl:grid-cols-[minmax(300px,368px)_minmax(0,1fr)] min-[1800px]:grid-cols-[408px_848px]">
        <ThreadList activeId={activeThread.id} onSelect={setActiveThread} />
        <Conversation key={activeThread.id} thread={activeThread} />
      </div>
    </div>
  );
}
