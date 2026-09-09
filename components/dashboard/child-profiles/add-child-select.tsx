'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type AddChildSelectOption = {
  label: string;
  value: string;
};

export function AddChildSelect({
  ariaLabel,
  name,
  options,
  placeholder,
  value,
  onValueChange,
  triggerClassName = '',
}: {
  ariaLabel: string;
  name: string;
  options: AddChildSelectOption[];
  placeholder: string;
  value: string;
  onValueChange: (value: string) => void;
  triggerClassName?: string;
}) {
  return (
    <Select
      items={options}
      name={name}
      onValueChange={(nextValue) => {
        if (nextValue !== null) onValueChange(nextValue);
      }}
      value={value}
    >
      <SelectTrigger
        aria-label={ariaLabel}
        className={`h-11 w-full rounded-[14px] border-[#e7eceb] bg-[#f4f8f6] px-3.5 font-manrope text-base leading-6 tracking-[-0.176px] text-[#515b60] shadow-[0_1px_2px_rgba(16,24,40,0.05)] hover:border-[#accbcb] focus-visible:border-[#2f7d7e] focus-visible:ring-2 focus-visible:ring-[#2f7d7e] focus-visible:ring-offset-2 data-popup-open:border-[#d5e5e5] data-popup-open:bg-[#d5e5e5] data-popup-open:text-[#0f1416] **:data-[slot=select-value]:truncate [&>svg]:transition-transform [&[data-popup-open]>svg]:rotate-180 [&_svg]:size-5 [&_svg]:text-[#263238] ${triggerClassName}`}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent
        align="start"
        sideOffset={8}
        className="min-w-40 rounded-2xl border border-[#e8ebe8] bg-white p-3 shadow-[0_10px_28px_rgba(38,50,56,0.14)] ring-0"
      >
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="min-h-9 rounded-xl px-2.5 py-2 font-manrope text-xs leading-4 text-[#515b60] hover:bg-[#f4f8f6] focus:bg-[#f4f8f6] focus:text-[#515b60] data-selected:bg-[#e9f1ee] data-selected:text-[#174a4d] [&>span:last-child]:hidden"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
