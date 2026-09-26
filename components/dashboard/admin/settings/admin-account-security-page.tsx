'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

import { useChangePassword } from '@/components/dashboard/settings/hooks/use-user-profile';
import { AdminSettingsShell } from './admin-settings-shell';

const securitySchema = z
  .object({
    currentPassword: z.string().min(1, 'Please enter your current password.'),
    newPassword: z
      .string()
      .min(7, 'Your new password must be at least 7 characters.')
      .regex(/[A-Z]/, 'Must include at least one uppercase letter.')
      .regex(/[a-z]/, 'Must include at least one lowercase letter.')
      .regex(/[0-9]/, 'Must include at least one number.')
      .regex(/[^A-Za-z0-9]/, 'Must include at least one special character.'),
    confirmPassword: z.string().min(1, 'Please confirm your new password.'),
  })
  .refine((values) => values.newPassword !== values.currentPassword, {
    message: 'New password cannot be the same as your current password.',
    path: ['newPassword'],
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: 'Your new passwords do not match.',
    path: ['confirmPassword'],
  });

type SecurityValues = z.infer<typeof securitySchema>;
type PasswordFieldName = keyof SecurityValues;

const passwordFields = [
  {
    name: 'currentPassword',
    label: 'Current Password',
    placeholder: 'Enter your current password',
  },
  { name: 'newPassword', label: 'New Password', placeholder: 'Enter your new password' },
  {
    name: 'confirmPassword',
    label: 'Confirm New Password',
    placeholder: 'Re-enter your new password',
  },
] as const satisfies ReadonlyArray<{ name: PasswordFieldName; label: string; placeholder: string }>;

const securityTips = [
  "Use a strong, unique password that you don't use elsewhere.",
  'Never share your administrator credentials with anyone.',
  'Update your password regularly to reduce exposure.',
  'Sign out of shared or public devices immediately after use.',
  'Contact system support if you suspect unauthorized access.',
] as const;

export function AdminAccountSecurityPage() {
  const changePasswordMutation = useChangePassword();

  const [visiblePasswords, setVisiblePasswords] = useState<Record<PasswordFieldName, boolean>>({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const form = useForm<SecurityValues>({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = form;

  const watchedNewPassword = useWatch({ control, name: 'newPassword' }) || '';

  // Password criteria checklist
  const criteria = [
    { label: 'At least 7 characters', valid: watchedNewPassword.length >= 7 },
    { label: 'One uppercase letter', valid: /[A-Z]/.test(watchedNewPassword) },
    { label: 'One lowercase letter', valid: /[a-z]/.test(watchedNewPassword) },
    { label: 'One number', valid: /[0-9]/.test(watchedNewPassword) },
    { label: 'One special character', valid: /[^A-Za-z0-9]/.test(watchedNewPassword) },
  ];

  const onSubmit = async (data: SecurityValues) => {
    try {
      await changePasswordMutation.mutateAsync({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      reset({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch {
      // Handled by mutation onError toast
    }
  };

  return (
    <AdminSettingsShell activeSection="security">
      <main className="w-full min-w-0 max-w-3xl space-y-6">
        <header>
          <h1 className="font-nunito text-[22px] font-bold leading-8.25 text-[#263238]">
            Account Security
          </h1>
          <p className="pt-0.5 font-manrope text-[13px] leading-4.875 text-[#607d8b]">
            Update your login credentials and manage your administrator password.
          </p>
        </header>

        <section className="rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:p-5 2xl:p-6">
          <h2 className="font-nunito text-[17px] font-bold leading-6.375 text-[#263238]">
            Change Password
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-5">
            {passwordFields.map(({ name, label, placeholder }) => {
              const isVisible = visiblePasswords[name];
              const error = errors[name]?.message;

              return (
                <label key={name} className="flex flex-col gap-1.5">
                  <span className="font-manrope text-[13px] font-semibold leading-4.875 text-[#263238]">
                    {label} <span className="text-[#e57373]">*</span>
                  </span>
                  <span className="relative block">
                    <input
                      {...register(name)}
                      placeholder={placeholder}
                      className="h-10.75 w-full rounded-xl border border-[#e7eceb] bg-[#f4f8f6] py-2.5 pl-3.5 pr-10 font-manrope text-sm leading-5.25 text-[#263238] outline-none transition-colors placeholder:text-[#90a4ae] focus:border-[#2f7d7e]"
                      type={isVisible ? 'text' : 'password'}
                    />
                    <button
                      type="button"
                      aria-label={`${isVisible ? 'Hide' : 'Show'} ${label.toLowerCase()}`}
                      onClick={() =>
                        setVisiblePasswords((current) => ({
                          ...current,
                          [name]: !current[name],
                        }))
                      }
                      className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-[#90a4ae] transition-colors hover:text-[#2f7d7e]"
                    >
                      {isVisible ? (
                        <EyeOff aria-hidden="true" size={15} strokeWidth={1.45} />
                      ) : (
                        <Eye aria-hidden="true" size={15} strokeWidth={1.45} />
                      )}
                    </button>
                  </span>
                  {error ? (
                    <span className="font-manrope text-xs leading-4.5 text-[#e57373]">{error}</span>
                  ) : null}
                </label>
              );
            })}

            {/* Live Criteria Feedback */}
            <div className="rounded-xl border border-[#e7eceb] bg-[#f8faf9] p-3.5 sm:p-4">
              <p className="font-manrope text-xs font-semibold leading-4.5 text-[#607d8b]">
                Password Requirements:
              </p>
              <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {criteria.map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <span
                      className={`flex size-4 shrink-0 items-center justify-center rounded-full text-[10px] ${
                        item.valid ? 'bg-[#2f7d7e] text-white' : 'bg-[#e0e7e6] text-[#90a4ae]'
                      }`}
                    >
                      <Check aria-hidden="true" size={10} strokeWidth={2.5} />
                    </span>
                    <span
                      className={`font-manrope text-xs leading-4 transition-colors ${
                        item.valid ? 'font-semibold text-[#174a4d]' : 'text-[#78909c]'
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-1">
              <button
                type="submit"
                disabled={isSubmitting || changePasswordMutation.isPending}
                className="inline-flex w-full items-center justify-center gap-2 rounded-[14px] bg-[#2f7d7e] px-6 py-2.5 font-manrope text-sm font-semibold leading-5 text-white transition-colors hover:bg-[#266b6c] disabled:opacity-60 sm:w-auto"
              >
                {(isSubmitting || changePasswordMutation.isPending) && (
                  <Loader2 aria-hidden="true" size={14} className="animate-spin" />
                )}
                <span>Update Password</span>
              </button>
            </div>
          </form>
        </section>

        <section className="rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:p-5 2xl:p-6">
          <h2 className="font-nunito text-[17px] font-bold leading-6.375 text-[#263238]">
            Security Tips
          </h2>
          <ul className="mt-4 space-y-3">
            {securityTips.map((tip) => (
              <li key={tip} className="flex items-start gap-2.5">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[rgba(47,125,126,0.08)] text-[#2f7d7e]">
                  <Check aria-hidden="true" size={11} strokeWidth={2} />
                </span>
                <span className="font-manrope text-sm leading-5.6 text-[#607d8b]">{tip}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </AdminSettingsShell>
  );
}
