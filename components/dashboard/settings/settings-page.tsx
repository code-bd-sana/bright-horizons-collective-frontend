'use client';

// Settings feature entry point.
import { inputClassName } from '@/components/ui/form-fields';
import Image from 'next/image';
import {
  Bell,
  ChevronDown,
  CreditCard,
  Eye,
  EyeOff,
  FileText,
  ShieldCheck,
  TriangleAlert,
  Upload,
  UserRound,
} from 'lucide-react';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

type SettingsSection = 'account' | 'billing' | 'security' | 'notifications' | 'legal';

const settingsNavigation: Array<{ id: SettingsSection; label: string; icon: typeof UserRound }> = [
  { id: 'account', label: 'Account', icon: UserRound },
  { id: 'billing', label: 'Membership & Billing', icon: CreditCard },
  { id: 'security', label: 'Security', icon: ShieldCheck },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'legal', label: 'Legal', icon: FileText },
];

function SettingField({ label, children }: { label: string; children: React.ReactNode }) {
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

function AccountPanel() {
  const [name, setName] = useState('Sarah Lin');
  const [email, setEmail] = useState('sarah@example.com');
  const [phone, setPhone] = useState('+1 (555) 000-0000');
  const [role, setRole] = useState('Parent/ Caregiver');
  const saveAccount = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success('Account settings saved successfully.');
  };

  return (
    <form onSubmit={saveAccount}>
      <section className="flex min-h-41 items-center rounded-2xl border border-[#e8ebe8] bg-white p-8">
        <div className="flex items-center gap-4">
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
      <section className="mt-6 rounded-2xl border border-[#e8ebe8] bg-white p-8">
        <h2 className="font-nunito text-2xl font-medium leading-8 tracking-[-0.16px] text-[#263238]">
          Basic Information
        </h2>
        <div className="mt-8 grid gap-x-4 gap-y-7 md:grid-cols-2">
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
      <section className="mt-6 rounded-2xl border border-[#e8ebe8] bg-white p-8">
        <h2 className="font-nunito text-2xl font-medium leading-8 tracking-[-0.16px] text-[#263238]">
          Preferences
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
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
      <div className="mt-8 flex justify-end gap-4">
        <button
          type="reset"
          className="h-14 w-30.75 rounded-full border border-[#d4d6d7] bg-white font-nunito text-base font-medium tracking-[-0.176px] text-[#14094b]"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="h-14 w-46.75 rounded-full border border-[#d5e5e5] bg-[#2f7d7e] font-nunito text-base font-medium tracking-[-0.176px] text-white"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}

function PasswordField({
  label,
  value,
  placeholder,
  visible,
  onChange,
  onVisibilityChange,
}: {
  label: string;
  value: string;
  placeholder: string;
  visible: boolean;
  onChange: (value: string) => void;
  onVisibilityChange: () => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-manrope text-base leading-6 tracking-[-0.02em] text-[#263238]">
        {label}
      </span>
      <span className="relative block">
        <input
          className="h-12 w-full rounded-xl border border-[#d5e5e5] bg-[#fafafa] px-3 pr-11 font-manrope text-base leading-6 tracking-[-0.02em] text-[#263238] outline-none transition-colors placeholder:text-[#7d8488] focus:border-[#2f7d7e]"
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          type={visible ? 'text' : 'password'}
          value={value}
        />
        <button
          aria-label={`${visible ? 'Hide' : 'Show'} ${label.toLowerCase()}`}
          className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-[#7d8488] transition-colors hover:text-[#2f7d7e]"
          onClick={onVisibilityChange}
          type="button"
        >
          {visible ? <EyeOff size={20} strokeWidth={1.8} /> : <Eye size={20} strokeWidth={1.8} />}
        </button>
      </span>
    </label>
  );
}

function SecurityPanel() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [visibleFields, setVisibleFields] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  function savePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (newPassword.length < 8) {
      toast.error('Your new password must be at least 8 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Your new passwords do not match.');
      return;
    }

    toast.success('Your password has been updated.');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  }

  return (
    <div className="w-full max-w-188.25">
      <form className="rounded-2xl border border-[#eff1ef] bg-white p-8" onSubmit={savePassword}>
        <h2 className="font-nunito text-2xl font-semibold leading-8 tracking-[-0.03em] text-[#263238]">
          Change Password
        </h2>
        <div className="mt-8 space-y-4">
          <PasswordField
            label="Current Password"
            onChange={setCurrentPassword}
            onVisibilityChange={() =>
              setVisibleFields((fields) => ({ ...fields, current: !fields.current }))
            }
            placeholder="••••••••"
            value={currentPassword}
            visible={visibleFields.current}
          />
          <PasswordField
            label="New Password"
            onChange={setNewPassword}
            onVisibilityChange={() =>
              setVisibleFields((fields) => ({ ...fields, new: !fields.new }))
            }
            placeholder="Min. 8 characters"
            value={newPassword}
            visible={visibleFields.new}
          />
          <PasswordField
            label="Confirm Password"
            onChange={setConfirmPassword}
            onVisibilityChange={() =>
              setVisibleFields((fields) => ({ ...fields, confirm: !fields.confirm }))
            }
            placeholder="Re-enter password"
            value={confirmPassword}
            visible={visibleFields.confirm}
          />
        </div>
        <button
          className="mt-8 flex h-10 items-center justify-center rounded-xl border border-[#accbcb] bg-linear-to-r from-[rgba(47,125,126,0.6)] to-[#2f7d7e] px-4 font-nunito text-base font-medium leading-6 tracking-[-0.02em] text-white shadow-[0_1px_2px_rgba(38,50,56,0.08)] transition-opacity hover:opacity-90"
          type="submit"
        >
          Change Password
        </button>
      </form>

      <section className="mt-12 rounded-2xl border border-[#f5c6cb] bg-[#fef6f6] p-5">
        <div className="flex gap-3">
          <TriangleAlert
            aria-hidden="true"
            className="mt-0.5 shrink-0 text-[#b24b4b]"
            size={16}
            strokeWidth={1.8}
          />
          <div>
            <h3 className="font-nunito text-sm font-semibold leading-5 tracking-[-0.02em] text-[#263238]">
              Delete Account
            </h3>
            <p className="mt-1 max-w-86 font-manrope text-xs leading-4.75 tracking-[-0.02em] text-[#515b60]">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <button
              className="mt-3 font-manrope text-sm font-semibold leading-5 tracking-[-0.02em] text-[#b24b4b] underline underline-offset-2 transition-colors hover:text-[#8d3838]"
              onClick={() => toast.error('Account deletion requires confirmation from support.')}
              type="button"
            >
              Delete Account
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function OtherPanel({ section }: { section: Exclude<SettingsSection, 'account' | 'security'> }) {
  const content = {
    billing: ['Membership & Billing', 'Manage your membership plan, payment method, and invoices.'],
    notifications: [
      'Notifications',
      'Choose how and when Bright Horizons Collective contacts you.',
    ],
    legal: ['Legal', 'Review the terms, privacy policy, and other account documents.'],
  }[section];
  return (
    <section className="rounded-2xl border border-[#e8ebe8] bg-white p-8">
      <h2 className="font-nunito text-2xl font-medium leading-8 tracking-[-0.16px] text-[#263238]">
        {content[0]}
      </h2>
      <p className="mt-2 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#7d8488]">
        {content[1]}
      </p>
      <div className="mt-8 rounded-xl border border-[#e8ebe8] bg-[#fffdf8] p-5 font-manrope text-sm leading-5.5 text-[#515b60]">
        This section is ready for your account preferences.
      </div>
    </section>
  );
}

export function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingsSection>('account');
  return (
    <section className="-mt-3 mx-auto w-full max-w-343.5 pb-8 text-[#263238]">
      <header>
        <h1 className="font-nunito text-[32px] font-medium leading-10 tracking-[-0.16px]">
          Settings & Account Management
        </h1>
        <p className="mt-1 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#7d8488]">
          Manage your parent account, security, notification preferences, membership, support, and
          legal terms.
        </p>
      </header>
      <div className="mt-10 grid items-start gap-6 xl:grid-cols-[286px_minmax(0,1fr)]">
        <nav
          className="rounded-xl border border-[#d8ddd9] bg-white p-4"
          aria-label="Settings navigation"
        >
          <div className="flex flex-col gap-2">
            {settingsNavigation.map(({ id, label, icon: Icon }) => {
              const isActive = activeSection === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveSection(id)}
                  className={`flex h-9 items-center gap-3 rounded-xl px-3 text-left font-nunito text-sm font-medium leading-5 tracking-[-0.084px] transition-colors ${isActive ? 'bg-[#2f7d7e] text-white' : 'text-[#515b60] hover:bg-[#fce9e3]/50'}`}
                >
                  <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                  {label}
                </button>
              );
            })}
          </div>
        </nav>
        <div>
          {activeSection === 'account' ? (
            <AccountPanel />
          ) : activeSection === 'security' ? (
            <SecurityPanel />
          ) : (
            <OtherPanel section={activeSection} />
          )}
        </div>
      </div>
    </section>
  );
}
