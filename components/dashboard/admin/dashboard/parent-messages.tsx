import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { parentMessages } from './admin-dashboard-data';

export function ParentMessages() {
  return (
    <section
      className="min-w-0 overflow-hidden rounded-2xl border border-[#e3e9e8] bg-white shadow-[0_4px_8px_rgba(38,50,56,0.05)]"
      aria-labelledby="parent-messages-heading"
    >
      <div className="flex min-h-20.75 flex-col items-start justify-center gap-2 px-4 py-4 min-[480px]:flex-row min-[480px]:items-center min-[480px]:justify-between min-[480px]:gap-4 sm:px-6 sm:py-5">
        <h2
          id="parent-messages-heading"
          className="font-nunito text-xl font-medium leading-7 text-[#263238] sm:text-2xl sm:leading-8"
        >
          Parent Messages
        </h2>
        <Link
          href="/dashboard/admin/messages"
          className="inline-flex items-center gap-1 font-manrope text-sm leading-5.5 text-[#27898a]"
        >
          Open Inbox <ArrowRight aria-hidden="true" size={16} strokeWidth={1.75} />
        </Link>
      </div>
      <div className="border-t border-[#e3e9e8]">
        {parentMessages.map(({ initials, name, child, message, time, state }) => (
          <article
            key={name}
            className="grid min-h-17.75 grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-1 border-b border-[#e3e9e8] px-4 py-3 last:border-b-0 2xl:flex 2xl:px-6"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#edf4f4] font-manrope text-xs font-semibold text-[#27898a]">
              {initials}
            </span>
            <div className="col-start-2 min-w-0 flex-1">
              <p className="truncate font-manrope text-sm leading-5.5 text-[#263238]">
                <span className="font-semibold">{name}</span>
                <span className="ml-2 text-xs text-[#7893a5]">· {child}</span>
              </p>
              <p className="truncate font-manrope text-sm leading-5.5 text-[#5f8096]">{message}</p>
            </div>
            <div className="col-start-2 flex shrink-0 items-center justify-between gap-3 text-left 2xl:block 2xl:text-right">
              <p className="font-manrope text-[11px] leading-4 text-[#a8bdc7]">{time}</p>
              <span
                className={`inline-flex rounded-full px-2 py-0.5 font-manrope text-xs leading-4 2xl:mt-1 ${state === 'Unread' ? 'bg-[#e9f3f2] text-[#27898a]' : 'bg-[#f3f6f6] text-[#7893a5]'}`}
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
