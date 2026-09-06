'use client';

import { DynamicForm } from '@/components/ui/dynamic-form';
import { Camera } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

import { AdminSettingsShell } from './admin-settings-shell';

const profileSchema = z.object({
  firstName: z.string().trim().min(1, 'Please enter a first name.'),
  lastName: z.string().trim().min(1, 'Please enter a last name.'),
  displayName: z.string().trim().min(1, 'Please enter a display name.'),
  email: z.email('Please enter a valid email address.'),
  phone: z.string().trim(),
  jobTitle: z.string().trim(),
});

type ProfileValues = z.infer<typeof profileSchema>;

const inputClassName =
  'h-[43px] w-full rounded-xl border border-[#e7eceb] bg-[#f4f8f6] px-3.5 py-2.5 font-manrope text-sm leading-[21px] text-[#263238] outline-none transition-colors focus:border-[#2f7d7e]';

function FormField({
  label,
  required = false,
  children,
  error,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <label className="flex min-w-0 flex-col gap-1.5">
      <span className="font-manrope text-[13px] font-semibold leading-[19.5px] text-[#263238]">
        {label}
        {required && <span className="text-[#e57373]"> *</span>}
      </span>
      {children}
      {error && <span className="font-manrope text-xs leading-4.5 text-[#e57373]">{error}</span>}
    </label>
  );
}

export function AdminProfileSettingsPage() {
  function saveProfile(data: ProfileValues) {
    toast.success(`${data.displayName}'s profile has been updated.`);
  }

  return (
    <AdminSettingsShell activeSection="profile">
      <main className="w-full max-w-3xl">
        <header>
          <h1 className="font-nunito text-[22px] font-bold leading-8.25 text-[#263238]">
            My Profile
          </h1>
          <p className="pt-0.5 font-manrope text-[13px] leading-[19.5px] text-[#607d8b]">
            Manage your administrator account information. Distinct from editing a family&apos;s
            parent account in the Families module.
          </p>
        </header>

        <DynamicForm
          defaultValues={{
            firstName: 'Sarah',
            lastName: 'K.',
            displayName: 'Sarah K.',
            email: 'sarah@brighthorizons.co',
            phone: '+1 (555) 012-3456',
            jobTitle: 'Head Administrator',
          }}
          fields={[]}
          onSubmit={saveProfile}
          schema={profileSchema}
        >
          {(form) => (
            <>
              <section className="mt-6 rounded-2xl border border-[#e7eceb] bg-white p-6 shadow-[0_4px_6px_rgba(0,0,0,0.06)]">
                <div className="flex flex-wrap items-center gap-5">
                  <span className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-[rgba(47,125,126,0.09)] font-nunito text-2xl font-bold leading-8 text-[#2f7d7e]">
                    SK
                  </span>
                  <div className="min-w-40 flex-1">
                    <p className="font-nunito text-xl font-bold leading-7.5 text-[#263238]">
                      Sarah K.
                    </p>
                    <p className="pt-px font-manrope text-sm leading-5.25 text-[#607d8b]">
                      Head Administrator
                    </p>
                    <p className="pt-px font-manrope text-[13px] leading-[19.5px] text-[#b0bec5]">
                      sarah@brighthorizons.co
                    </p>
                  </div>
                  <label className="flex h-9 cursor-pointer items-center gap-2 rounded-[14px] border border-[rgba(47,125,126,0.25)] bg-[rgba(47,125,126,0.03)] px-4 py-2 font-manrope text-sm font-semibold leading-5 text-[#2f7d7e] transition-colors hover:bg-[rgba(47,125,126,0.08)]">
                    <Camera aria-hidden="true" size={14} strokeWidth={1.7} />
                    Change Profile Photo
                    <input
                      accept="image/png,image/jpeg,image/webp"
                      className="sr-only"
                      type="file"
                      onChange={(event) => {
                        if (event.target.files?.[0]) toast.success('Profile photo selected.');
                      }}
                    />
                  </label>
                </div>
              </section>

              <section className="mt-3.5 rounded-2xl border border-[#e7eceb] bg-white p-6 shadow-[0_4px_6px_rgba(0,0,0,0.06)]">
                <h2 className="font-nunito text-[17px] font-bold leading-[25.5px] text-[#263238]">
                  Basic Information
                </h2>
                <div className="mt-5 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormField
                      label="First Name"
                      required
                      error={form.formState.errors.firstName?.message}
                    >
                      <input {...form.register('firstName')} className={inputClassName} />
                    </FormField>
                    <FormField
                      label="Last Name"
                      required
                      error={form.formState.errors.lastName?.message}
                    >
                      <input {...form.register('lastName')} className={inputClassName} />
                    </FormField>
                  </div>
                  <FormField
                    label="Display Name"
                    error={form.formState.errors.displayName?.message}
                  >
                    <input {...form.register('displayName')} className={inputClassName} />
                    <span className="font-manrope text-xs leading-4.5 text-[#607d8b]">
                      Shown in the admin header and activity logs
                    </span>
                  </FormField>
                  <FormField
                    label="Email Address"
                    required
                    error={form.formState.errors.email?.message}
                  >
                    <input {...form.register('email')} className={inputClassName} type="email" />
                  </FormField>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormField label="Phone Number" error={form.formState.errors.phone?.message}>
                      <input {...form.register('phone')} className={inputClassName} type="tel" />
                    </FormField>
                    <FormField label="Job Title" error={form.formState.errors.jobTitle?.message}>
                      <input {...form.register('jobTitle')} className={inputClassName} />
                    </FormField>
                  </div>
                </div>
              </section>
              <div className="mt-3 flex gap-3">
                <button
                  type="submit"
                  className="h-10 rounded-[14px] bg-[#2f7d7e] px-6 py-2.5 font-manrope text-sm font-semibold leading-5 text-white transition-colors hover:bg-[#266b6c]"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => form.reset()}
                  className="h-10 rounded-[14px] border border-[#e7eceb] bg-white px-5 py-2.5 font-manrope text-sm font-semibold leading-5 text-[#607d8b] transition-colors hover:bg-[#f4f8f6]"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </DynamicForm>
      </main>
    </AdminSettingsShell>
  );
}
