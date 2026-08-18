'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const inputClassName =
  'h-11 w-full rounded-full border border-[#D8DDD9] bg-white px-4 py-2.5 font-manrope text-base leading-6 tracking-[-0.176px] text-[#263238] shadow-[0_1px_2px_rgba(16,24,40,0.05)] outline-none transition-colors placeholder:text-[#A8ADAF] focus:border-[#2F7D7E]';

export function FieldLabel({
  children,
  optional = false,
}: {
  children: ReactNode;
  optional?: boolean;
}) {
  return (
    <span className="font-manrope text-lg leading-6.75 tracking-[-0.27px] text-[#263238]">
      {children}
      {optional ? (
        <span className="text-[#7D8488]"> (Optional)</span>
      ) : (
        <span className="text-[#B24B4B]"> *</span>
      )}
    </span>
  );
}

export function TextField({
  id,
  label,
  placeholder,
  optional,
  type = 'text',
  className = '',
  defaultValue = '',
}: {
  id: string;
  label: string | ReactNode;
  placeholder: string;
  optional?: boolean;
  type?: React.HTMLInputTypeAttribute;
  className?: string;
  defaultValue?: string;
}) {
  return (
    <label htmlFor={id} className={`flex min-w-0 flex-col gap-1.5 ${className}`}>
      {typeof label === 'string' ? <FieldLabel optional={optional}>{label}</FieldLabel> : label}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        required={!optional}
        defaultValue={defaultValue}
        className={inputClassName}
      />
    </label>
  );
}

export function SelectField({
  id,
  label,
  placeholder,
  optional,
  options,
  hideLabel = false,
  defaultValue = '',
}: {
  id: string;
  label: string | ReactNode;
  placeholder: string;
  optional?: boolean;
  options: string[];
  hideLabel?: boolean;
  defaultValue?: string;
}) {
  return (
    <label htmlFor={id} className={`flex min-w-0 flex-col ${hideLabel ? '' : 'gap-1.5'}`}>
      {!hideLabel &&
        (typeof label === 'string' ? <FieldLabel optional={optional}>{label}</FieldLabel> : label)}
      <span className={`${inputClassName} flex items-center justify-between px-3.5`}>
        <select
          id={id}
          required={!optional}
          defaultValue={defaultValue}
          className="min-w-0 flex-1 appearance-none bg-transparent font-manrope text-base leading-6 tracking-[-0.176px] outline-none"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="h-5 w-5 text-[#263238]" />
      </span>
    </label>
  );
}

export function ToggleChips({
  label,
  helper,
  options,
  initiallySelected = [],
}: {
  label: string;
  helper: string;
  options: string[];
  initiallySelected?: string[];
}) {
  const [selected, setSelected] = useState(() => new Set(initiallySelected));

  const toggle = (option: string) => {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(option)) next.delete(option);
      else next.add(option);
      return next;
    });
  };

  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="font-manrope text-lg leading-6.75 tracking-[-0.27px] text-[#263238]">
        {label}
      </legend>
      <div className="flex flex-wrap gap-x-4 gap-y-3">
        {options.map((option) => {
          const isSelected = selected.has(option);
          return (
            <button
              key={option}
              type="button"
              aria-pressed={isSelected}
              onClick={() => toggle(option)}
              className={`rounded-full border px-2.5 py-1.5 font-nunito text-base font-medium leading-6 tracking-[-0.176px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2F7D7E] ${
                isSelected
                  ? 'border-[#FCE9E3] bg-[#F2B59F] text-[#493630]'
                  : 'border-[#D4D6D7] bg-white text-[#7D8488]'
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
      <p className="font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#515B60]">
        {helper}
      </p>
    </fieldset>
  );
}
