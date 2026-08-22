'use client';

import { Eye, EyeOff, TriangleAlert } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

type PasswordFieldProps = {
  label: string;
  value: string;
  placeholder: string;
  visible: boolean;
  onChange: (value: string) => void;
  onVisibilityChange: () => void;
};

function PasswordField({
  label,
  value,
  placeholder,
  visible,
  onChange,
  onVisibilityChange,
}: PasswordFieldProps) {
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

export function SecurityPanel() {
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
