'use client';

import { inputClassName } from '@/components/ui/form-fields';
import Image from 'next/image';
import { ChevronDown, Upload } from 'lucide-react';
import { FormEvent, type ReactNode, useState } from 'react';
import { toast } from 'sonner';

function SettingField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex min-w-0 flex-col gap-1.5 font-manrope text-lg leading-6.75 tracking-[-0.27px] text-[#263238]">
      {label}
      {children}
    </label>
  );
}

function SelectControl({ value, options }: { value: string; options: string[] }) {
  return (
    <span className={`${inputClassName} relative flex items-center px-3.5`}>
      <select
        defaultValue={value}
        className="min-w-0 flex-1 appearance-none bg-transparent outline-none"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <ChevronDown className="size-5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
    </span>
  );
}

export function AccountPanel() {
  const [name, setName] = useState('Sarah Lin');
  const [email, setEmail] = useState('sarah@example.com');
  const [phone, setPhone] = useState('+1 (555) 000-0000');
  const [role, setRole] = useState('Parent/ Caregiver');

  function saveAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    toast.success('Account settings saved successfully.');
  }

  return (
    <form onSubmit={saveAccount}>
      <section className="flex min-h-41 items-center rounded-2xl border border-[#e8ebe8] bg-white p-4 sm:p-8">
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="relative size-25 shrink-0 overflow-hidden rounded-2xl border-2 border-[#d5e5e5] bg-[#2f7d7e] p-1">
            <Image
              src="/Home/figma-dashboard-profile-avatar.png"
              alt="Sarah Lin"
              fill
              sizes="92px"
              className="object-cover object-[50%_12%]"
            />
          </span>
          <div>
            <p className="font-nunito text-2xl font-medium leading-8 tracking-[-0.16px] text-[#263238]">
              Sarah Lin
            </p>
            <p className="mt-1 font-manrope text-xs leading-4.5 text-[#7d8488]">
              JPG or PNG. Max 5MB
            </p>
            <label className="mt-2 flex h-6.5 w-fit cursor-pointer items-center gap-1 rounded-full border border-[#d5e5e5] bg-white px-2 font-nunito text-xs font-medium text-[#2f7d7e]">
              <Upload size={14} strokeWidth={1.7} aria-hidden="true" />
              Upload photo
              <input type="file" accept="image/png,image/jpeg" className="sr-only" />
            </label>
          </div>
        </div>
      </section>
      <section className="mt-6 rounded-2xl border border-[#e8ebe8] bg-white p-4 sm:p-8">
        <h2 className="font-nunito text-2xl font-medium leading-8 tracking-[-0.16px] text-[#263238]">
          Basic Information
        </h2>
        <div className="mt-6 grid gap-x-4 gap-y-6 sm:mt-8 sm:gap-y-7 md:grid-cols-2">
          <SettingField label="Full Name">
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={inputClassName}
            />
          </SettingField>
          <SettingField label="Email">
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={inputClassName}
            />
          </SettingField>
          <SettingField label="Phone">
            <span className={`${inputClassName} flex items-center gap-3 px-3.5`}>
              <select
                aria-label="Country code"
                defaultValue="US"
                className="w-12 appearance-none bg-transparent outline-none"
              >
                <option>US</option>
              </select>
              <ChevronDown size={16} strokeWidth={1.5} />
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                className="min-w-0 flex-1 bg-transparent outline-none"
              />
            </span>
          </SettingField>
          <SettingField label="Caregiver Role/ Title">
            <input
              value={role}
              onChange={(event) => setRole(event.target.value)}
              className={inputClassName}
            />
          </SettingField>
        </div>
      </section>
      <section className="mt-6 rounded-2xl border border-[#e8ebe8] bg-white p-4 sm:p-8">
        <h2 className="font-nunito text-2xl font-medium leading-8 tracking-[-0.16px] text-[#263238]">
          Preferences
        </h2>
        <div className="mt-6 grid gap-4 sm:mt-8 md:grid-cols-2">
          <SettingField label="Language">
            <SelectControl
              value="English (United States)"
              options={['English (United States)', 'Spanish (United States)']}
            />
          </SettingField>
          <SettingField label="Time Zone">
            <SelectControl
              value="(GMT-05:00) Eastern Time (US & Canada)"
              options={[
                '(GMT-05:00) Eastern Time (US & Canada)',
                '(GMT-06:00) Central Time (US & Canada)',
              ]}
            />
          </SettingField>
        </div>
      </section>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end sm:gap-4">
        <button
          type="reset"
          className="h-14 w-full rounded-full border border-[#d4d6d7] bg-white font-nunito text-base font-medium tracking-[-0.176px] text-[#14094b] sm:w-30.75"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="h-14 w-full rounded-full border border-[#d5e5e5] bg-[#2f7d7e] font-nunito text-base font-medium tracking-[-0.176px] text-white sm:w-46.75"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}
