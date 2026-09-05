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
    <section className="overflow-hidden rounded-[18px] border border-[#e3e9e8] bg-white shadow-[0_5px_10px_rgba(38,50,56,0.055)]">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        className="flex h-18.25 w-full items-center justify-between border-b border-[#e3e9e8] px-5 text-left"
      >
        <span className="flex items-center gap-3">
          <span className="flex size-8 items-center justify-center rounded-full bg-[#edf6f5] text-[#278488]">
            <Icon aria-hidden="true" size={16} strokeWidth={1.8} />
          </span>
          <span className="font-nunito text-base font-bold leading-6 text-[#263238]">{title}</span>
        </span>
        <ChevronUp
          aria-hidden="true"
          size={16}
          strokeWidth={1.8}
          className={`text-[#607d8b] transition-transform ${isOpen ? '' : 'rotate-180'}`}
        />
      </button>
      {isOpen && <div className="p-5">{children}</div>}
    </section>
  );
}
