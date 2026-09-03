'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
    <Select value={value} onValueChange={(nextValue) => onChange(nextValue ?? '')}>
      <SelectTrigger className="h-11 w-full rounded-xl border-[#e1e8e6] bg-[#f4f8f7] px-3.5 font-nunito text-sm font-medium text-[#263238] shadow-none hover:bg-[#f4f8f7] focus-visible:border-[#2f7d7e] focus-visible:ring-0 data-placeholder:text-[#9ba6ab]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="rounded-xl bg-white p-2 shadow-[0_8px_12px_rgba(38,50,56,0.12)] ring-0">
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="min-h-8 rounded-lg px-2.5 py-1.5 font-nunito text-sm leading-5 text-[#263238] focus:bg-[#d5e5e5]"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
