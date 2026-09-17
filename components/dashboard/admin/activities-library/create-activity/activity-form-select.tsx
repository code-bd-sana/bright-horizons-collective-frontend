'use client';

import { ChevronDown } from 'lucide-react';

type Option = { label: string; value: string };

export function ActivityFormSelect({
  value,
  onChange,
  placeholder,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: readonly Option[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`h-11 w-full appearance-none rounded-xl border border-[#e1e8e6] bg-[#f4f8f7] px-3.5 pr-10 font-nunito text-sm font-medium leading-5 outline-none transition-colors focus:border-[#2f7d7e] ${
          value ? 'text-[#263238]' : 'text-[#9ba6ab]'
        }`}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-white text-[#263238]">
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        size={16}
        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#607d8b]"
      />
    </div>
  );
}
