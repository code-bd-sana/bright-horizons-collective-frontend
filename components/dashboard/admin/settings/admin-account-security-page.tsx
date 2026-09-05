'use client';

import { DynamicForm } from '@/components/ui/dynamic-form';
import { Check, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

import { AdminSettingsShell } from './admin-settings-shell';

const securitySchema = z
  .object({
    currentPassword: z.string().min(1, 'Please enter your current password.'),
    newPassword: z.string().min(8, 'Your new password must be at least 8 characters.'),
    confirmPassword: z.string().min(1, 'Please confirm your new password.'),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: 'Your new passwords do not match.',
    path: ['confirmPassword'],
  });

type SecurityValues = z.infer<typeof securitySchema>;
type PasswordFieldName = keyof SecurityValues;

const passwordFields = [
  { name: 'currentPassword', label: 'Current Password' },
  { name: 'newPassword', label: 'New Password' },
  { name: 'confirmPassword', label: 'Confirm New Password' },
] as const satisfies ReadonlyArray<{ name: PasswordFieldName; label: string }>;

const securityTips = [
  "Use a strong, unique password that you don't use elsewhere.",
  'Never share your administrator credentials with anyone.',
  'Update your password every 90 days to reduce exposure.',
  'Sign out of shared or public devices immediately after use.',
  'Contact your platform administrator if you suspect unauthorized access.',
] as const;

export function AdminAccountSecurityPage() {
  const [visiblePasswords, setVisiblePasswords] = useState<Record<PasswordFieldName, boolean>>({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  return (
    <AdminSettingsShell activeSection="security">
      <main className="w-full max-w-3xl space-y-6">
        <header>
          <h1 className="font-nunito text-[22px] font-bold leading-8.25 text-[#263238]">
            Account Security
          </h1>
          <p className="pt-0.5 font-manrope text-[13px] leading-[19.5px] text-[#607d8b]">
            Update your login credentials and review recent account activity.
          </p>
        </header>

        <DynamicForm
          defaultValues={{
            currentPassword: 'password10',
            newPassword: 'password10',
            confirmPassword: 'password10',
          }}
          fields={[]}
          onSubmit={() => {
            toast.success('Your password has been updated.');
          }}
          schema={securitySchema}
        >
          {(form) => (
            <section className="rounded-2xl border border-[#e7eceb] bg-white p-6 shadow-[0_4px_6px_rgba(0,0,0,0.06)]">
              <h2 className="font-nunito text-[17px] font-bold leading-[25.5px] text-[#263238]">
                Change Password
              </h2>
              <div className="mt-5 space-y-5">
                {passwordFields.map(({ name, label }) => {
                  const isVisible = visiblePasswords[name];
                  return (
                    <label key={name} className="flex flex-col gap-1.5">
                      <span className="font-manrope text-[13px] font-semibold leading-[19.5px] text-[#263238]">
                        {label} <span className="text-[#e57373]">*</span>
                      </span>
                      <span className="relative block">
                        <input
                          {...form.register(name)}
                          className="h-10.75 w-full rounded-xl border border-[#e7eceb] bg-[#f4f8f6] py-2.5 pl-3.5 pr-10 font-manrope text-sm leading-5.25 text-[#263238] outline-none transition-colors focus:border-[#2f7d7e]"
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
                      {form.formState.errors[name] && (
                        <span className="font-manrope text-xs leading-4.5 text-[#e57373]">
                          {form.formState.errors[name].message}
                        </span>
                      )}
                    </label>
                  );
                })}
                <button
                  type="submit"
                  className="rounded-[14px] bg-[#2f7d7e] px-6 py-2.5 font-manrope text-sm font-semibold leading-5 text-white transition-colors hover:bg-[#266b6c]"
                >
                  Update Password
                </button>
              </div>
            </section>
          )}
        </DynamicForm>

        <section className="rounded-2xl border border-[#e7eceb] bg-white p-6 shadow-[0_4px_6px_rgba(0,0,0,0.06)]">
          <h2 className="font-nunito text-[17px] font-bold leading-[25.5px] text-[#263238]">
            Security Tips
          </h2>
          <ul className="mt-4 space-y-3">
            {securityTips.map((tip) => (
              <li key={tip} className="flex items-start gap-2.5">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[rgba(47,125,126,0.08)] text-[#2f7d7e]">
                  <Check aria-hidden="true" size={11} strokeWidth={2} />
                </span>
                <span className="font-manrope text-sm leading-[22.4px] text-[#607d8b]">{tip}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </AdminSettingsShell>
  );
}
