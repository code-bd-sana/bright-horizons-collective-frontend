'use client';

import { ChevronUp, type LucideIcon } from 'lucide-react';
import { type ReactNode, useState } from 'react';

export function ActivityFormSection({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: LucideIcon;
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section className="min-w-0 overflow-hidden rounded-[18px] border border-[#e3e9e8] bg-white shadow-[0_5px_10px_rgba(38,50,56,0.055)]">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        className="flex min-h-18.25 w-full items-center justify-between gap-3 border-b border-[#e3e9e8] px-4 py-4 text-left sm:px-5"
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="flex size-8 items-center justify-center rounded-full bg-[#edf6f5] text-[#278488]">
            <Icon aria-hidden="true" size={16} strokeWidth={1.8} />
          </span>
          <span className="min-w-0 font-nunito text-sm font-bold leading-5 text-[#263238] sm:text-base sm:leading-6">
            {title}
          </span>
        </span>
        <ChevronUp
          aria-hidden="true"
          size={16}
          strokeWidth={1.8}
          className={`text-[#607d8b] transition-transform ${isOpen ? '' : 'rotate-180'}`}
        />
      </button>
      {isOpen && <div className="p-4 sm:p-5">{children}</div>}
    </section>
  );
}
