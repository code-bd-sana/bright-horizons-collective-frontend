'use client';

import { Eye, EyeOff, Loader2, TriangleAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useChangePassword, useDeactivateAccount } from './hooks/use-user-profile';

type PasswordFieldProps = {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  visible: boolean;
  disabled?: boolean;
  onChange: (value: string) => void;
  onVisibilityChange: () => void;
};

function PasswordField({
  id,
  label,
  value,
  placeholder,
  visible,
  disabled,
  onChange,
  onVisibilityChange,
}: PasswordFieldProps) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 block font-manrope text-base leading-6 tracking-[-0.02em] text-[#263238]">
        {label}
      </span>
      <span className="relative block">
        <input
          id={id}
          className="h-12 w-full rounded-xl border border-[#d5e5e5] bg-[#fafafa] px-3 pr-11 font-manrope text-base leading-6 tracking-[-0.02em] text-[#263238] outline-none transition-colors placeholder:text-[#7d8488] focus:border-[#2f7d7e] disabled:cursor-not-allowed disabled:opacity-60"
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          type={visible ? 'text' : 'password'}
          value={value}
          disabled={disabled}
        />
        <button
          aria-label={`${visible ? 'Hide' : 'Show'} ${label.toLowerCase()}`}
          className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-[#7d8488] transition-colors hover:text-[#2f7d7e] disabled:pointer-events-none"
          onClick={onVisibilityChange}
          type="button"
          disabled={disabled}
        >
          {visible ? <EyeOff size={20} strokeWidth={1.8} /> : <Eye size={20} strokeWidth={1.8} />}
        </button>
      </span>
    </label>
  );
}

export function SecurityPanel() {
  const router = useRouter();
  const changePasswordMutation = useChangePassword();
  const deactivateAccountMutation = useDeactivateAccount();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [visibleFields, setVisibleFields] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  // Account deletion modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');

  async function handleSavePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!currentPassword) {
      toast.error('Please enter your current password.');
      return;
    }

    if (!newPassword) {
      toast.error('Please enter a new password.');
      return;
    }

    const hasUpper = /[A-Z]/.test(newPassword);
    const hasLower = /[a-z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);
    const hasSymbol = /[^A-Za-z0-9]/.test(newPassword);

    if (newPassword.length < 7 || !hasUpper || !hasLower || !hasNumber || !hasSymbol) {
      toast.error(
        'Password must contain at least 7 characters, including uppercase, lowercase, number, and special character.'
      );
      return;
    }

    if (currentPassword === newPassword) {
      toast.error('New password cannot be the same as your current password.');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Your new passwords do not match.');
      return;
    }

    try {
      await changePasswordMutation.mutateAsync({
        currentPassword,
        newPassword,
      });

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch {
      // Error handled by mutation onError callback
    }
  }

  async function handleConfirmDelete() {
    if (deleteConfirmationText !== 'DELETE') {
      toast.error('Please type DELETE to confirm account deletion.');
      return;
    }

    try {
      await deactivateAccountMutation.mutateAsync();
      setIsDeleteModalOpen(false);
      toast.success('Your account has been deactivated.');
      router.replace('/login');
      router.refresh();
    } catch {
      // Error handled by mutation onError callback
    }
  }

  return (
    <div className="w-full max-w-188.25">
      <form
        className="rounded-2xl border border-[#eff1ef] bg-white p-4 sm:p-8"
        onSubmit={handleSavePassword}
      >
        <h2 className="font-nunito text-xl font-semibold leading-7 tracking-[-0.03em] text-[#263238] sm:text-2xl sm:leading-8">
          Change Password
        </h2>
        <p className="mt-1 font-manrope text-sm leading-5 text-[#7d8488]">
          Must contain at least 7 characters with uppercase, lowercase, number, and a special
          character.
        </p>

        <div className="mt-8 space-y-4">
          <PasswordField
            id="current-password"
            label="Current Password"
            onChange={setCurrentPassword}
            onVisibilityChange={() =>
              setVisibleFields((fields) => ({ ...fields, current: !fields.current }))
            }
            placeholder="••••••••"
            value={currentPassword}
            visible={visibleFields.current}
            disabled={changePasswordMutation.isPending}
          />
          <PasswordField
            id="new-password"
            label="New Password"
            onChange={setNewPassword}
            onVisibilityChange={() =>
              setVisibleFields((fields) => ({ ...fields, new: !fields.new }))
            }
            placeholder="Min. 7 characters with upper, lower, number & symbol"
            value={newPassword}
            visible={visibleFields.new}
            disabled={changePasswordMutation.isPending}
          />
          <PasswordField
            id="confirm-password"
            label="Confirm Password"
            onChange={setConfirmPassword}
            onVisibilityChange={() =>
              setVisibleFields((fields) => ({ ...fields, confirm: !fields.confirm }))
            }
            placeholder="Re-enter new password"
            value={confirmPassword}
            visible={visibleFields.confirm}
            disabled={changePasswordMutation.isPending}
          />
        </div>

        <button
          className="mt-8 flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-[#accbcb] bg-linear-to-r from-[rgba(47,125,126,0.6)] to-[#2f7d7e] px-4 font-nunito text-base font-medium leading-6 tracking-[-0.02em] text-white shadow-[0_1px_2px_rgba(38,50,56,0.08)] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          type="submit"
          disabled={changePasswordMutation.isPending}
        >
          {changePasswordMutation.isPending && <Loader2 className="size-4 animate-spin" />}
          {changePasswordMutation.isPending ? 'Updating Password…' : 'Change Password'}
        </button>
      </form>

      {/* Danger Zone: Delete Account */}
      <section className="mt-8 rounded-2xl border border-[#f5c6cb] bg-[#fef6f6] p-4 sm:mt-12 sm:p-6">
        <div className="flex gap-3.5">
          <TriangleAlert
            aria-hidden="true"
            className="mt-0.5 shrink-0 text-[#b24b4b]"
            size={20}
            strokeWidth={1.8}
          />
          <div>
            <h3 className="font-nunito text-base font-semibold leading-6 tracking-[-0.02em] text-[#263238]">
              Delete Account
            </h3>
            <p className="mt-1 max-w-xl font-manrope text-sm leading-5 tracking-[-0.01em] text-[#515b60]">
              Once you delete your account, your profile will be deactivated and you will be signed
              out immediately. If you need your account reactivated later, you must contact support.
            </p>
            <button
              className="mt-4 inline-flex items-center font-manrope text-sm font-semibold leading-5 text-[#b24b4b] underline underline-offset-4 transition-colors hover:text-[#8d3838]"
              onClick={() => {
                setDeleteConfirmationText('');
                setIsDeleteModalOpen(true);
              }}
              type="button"
            >
              Delete Account
            </button>
          </div>
        </div>
      </section>

      {/* Delete Account Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent
          showCloseButton={false}
          className="max-h-[calc(100dvh-2rem)] w-md max-w-[calc(100%-2rem)] gap-5 overflow-y-auto rounded-2xl border-0 bg-white p-5 shadow-[0_20px_30px_rgba(0,0,0,0.12)] sm:max-w-md sm:p-6"
        >
          <div className="flex items-start gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-[14px] bg-[#fce9e2] text-[#e57373]">
              <TriangleAlert aria-hidden="true" size={24} strokeWidth={1.75} />
            </span>
            <div className="min-w-0 flex-1">
              <DialogTitle className="font-nunito text-xl font-bold leading-7 text-[#263238]">
                Delete Account?
              </DialogTitle>
              <p className="pt-2 font-manrope text-sm leading-5.5 text-[#607d8b]">
                This will immediately{' '}
                <strong className="text-[#263238]">deactivate your account</strong> and sign you
                out. Your data, children profiles, and history will be safely preserved, but you
                will not be able to log back in.
              </p>
              <p className="pt-2 font-manrope text-xs leading-4.5 text-[#7d8488]">
                To restore your account later, an administrator can reactivate it upon contacting
                support.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-[#e7eceb] bg-[#fafafa] p-3.5">
            <label
              htmlFor="confirm-delete-input"
              className="block font-manrope text-xs font-medium text-[#515b60]"
            >
              To confirm deactivation, please type{' '}
              <span className="font-bold text-[#b24b4b]">DELETE</span> below:
            </label>
            <input
              id="confirm-delete-input"
              type="text"
              value={deleteConfirmationText}
              onChange={(e) => setDeleteConfirmationText(e.target.value)}
              placeholder="DELETE"
              disabled={deactivateAccountMutation.isPending}
              className="mt-2 h-10 w-full rounded-lg border border-[#d5e5e5] bg-white px-3 font-manrope text-sm text-[#263238] outline-none transition-colors focus:border-[#b24b4b] disabled:opacity-60"
            />
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-[#e7eceb] pt-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              disabled={deactivateAccountMutation.isPending}
              onClick={() => {
                setIsDeleteModalOpen(false);
                setDeleteConfirmationText('');
              }}
              className="w-full rounded-xl border border-[#e7eceb] px-5 py-2.5 font-manrope text-sm font-semibold leading-5 text-[#607d8b] transition-colors hover:bg-[#f5f7f6] disabled:opacity-60 sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={deleteConfirmationText !== 'DELETE' || deactivateAccountMutation.isPending}
              onClick={handleConfirmDelete}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#e57373] px-5 py-2.5 font-manrope text-sm font-semibold leading-5 text-white shadow-xs transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {deactivateAccountMutation.isPending && <Loader2 className="size-4 animate-spin" />}
              {deactivateAccountMutation.isPending ? 'Deactivating…' : 'Yes, Delete Account'}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
