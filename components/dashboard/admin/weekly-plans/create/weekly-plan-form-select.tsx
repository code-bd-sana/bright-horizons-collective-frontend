'use client';

import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type WeeklyPlanFormSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: readonly { label: string; value: string }[];
  ariaLabel: string;
};

export function WeeklyPlanFormSelect({
  value,
  onChange,
  options,
  ariaLabel,
}: WeeklyPlanFormSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const close = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
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

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        type="button"
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={() => setIsOpen((open) => !open)}
        className={`flex h-9.5 w-full items-center justify-between rounded-[14px] border px-2 font-manrope text-[13px] leading-5 transition-colors ${isOpen ? 'border-[#d5e5e5] bg-[#d5e5e5] text-[#0f1416]' : 'border-[#e7eceb] bg-[#f4f8f6] text-[#607d8b] hover:border-[#accbcb]'}`}
      >
        <span className="truncate">{options.find((option) => option.value === value)?.label}</span>
        <ChevronDown
          aria-hidden="true"
          className={`size-3.5 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          strokeWidth={1.6}
        />
      </button>
      {isOpen ? (
        <div
          role="listbox"
          aria-label={`${ariaLabel} options`}
          className="absolute left-0 top-[calc(100%+8px)] z-30 w-full min-w-40 rounded-2xl border border-[#e8ebe8] bg-white p-3 shadow-[0_8px_12px_rgba(38,50,56,0.12)]"
        >
          <div className="flex flex-col gap-2.5">
            {options.map((option) => {
              const selected = option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`flex min-h-9 w-full items-center rounded-lg px-3 py-2 text-left font-nunito text-sm font-medium leading-5 tracking-[-0.084px] transition-colors ${selected ? 'bg-[#e9f1ee] text-[#174a4d]' : 'text-[#263238] hover:bg-[#f4f8f6]'}`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
