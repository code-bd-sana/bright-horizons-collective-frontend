import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { parentMessages } from './admin-dashboard-data';

export function ParentMessages() {
  return (
    <section
      className="overflow-hidden rounded-2xl border border-[#e3e9e8] bg-white shadow-[0_4px_8px_rgba(38,50,56,0.05)]"
      aria-labelledby="parent-messages-heading"
    >
      <div className="flex min-h-20.75 items-center justify-between gap-4 px-6 py-5">
        <h2
          id="parent-messages-heading"
          className="font-nunito text-2xl font-medium leading-8 text-[#263238]"
        >
          Parent Messages
        </h2>
        <Link
          href="/dashboard/admin/messages"
          className="inline-flex items-center gap-1 whitespace-nowrap font-manrope text-sm leading-5.5 text-[#27898a]"
        >
          Open Inbox <ArrowRight aria-hidden="true" size={16} strokeWidth={1.75} />
        </Link>
      </div>
      <div className="border-t border-[#e3e9e8]">
        {parentMessages.map(({ initials, name, child, message, time, state }) => (
          <article
            key={name}
            className="flex min-h-17.75 items-center gap-3 border-b border-[#e3e9e8] px-6 py-3 last:border-b-0"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#edf4f4] font-manrope text-xs font-semibold text-[#27898a]">
              {initials}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-manrope text-sm leading-5.5 text-[#263238]">
                <span className="font-semibold">{name}</span>
                <span className="ml-2 text-xs text-[#7893a5]">· {child}</span>
              </p>
              <p className="truncate font-manrope text-sm leading-5.5 text-[#5f8096]">{message}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="font-manrope text-[11px] leading-4 text-[#a8bdc7]">{time}</p>
              <span
                className={`mt-1 inline-flex rounded-full px-2 py-0.5 font-manrope text-xs leading-4 ${state === 'Unread' ? 'bg-[#e9f3f2] text-[#27898a]' : 'bg-[#f3f6f6] text-[#7893a5]'}`}
              >
                {state}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
