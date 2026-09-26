'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Camera, Loader2, Lock, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import {
  uploadAvatar,
  useUpdateUserProfile,
  useUserProfile,
} from '@/components/dashboard/settings/hooks/use-user-profile';
import { AdminSettingsShell } from './admin-settings-shell';

const profileSchema = z.object({
  firstName: z.string().trim().min(1, 'Please enter a first name.'),
  lastName: z.string().trim().min(1, 'Please enter a last name.'),
  phone: z.string().trim().optional(),
});

type ProfileValues = z.infer<typeof profileSchema>;

const inputClassName =
  'h-10.75 w-full rounded-xl border border-[#e7eceb] bg-[#f4f8f6] px-3.5 py-2.5 font-manrope text-sm leading-5.25 text-[#263238] outline-none transition-colors focus:border-[#2f7d7e]';

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
      <span className="font-manrope text-[13px] font-semibold leading-4.875 text-[#263238]">
        {label}
        {required && <span className="text-[#e57373]"> *</span>}
      </span>
      {children}
      {error ? (
        <span className="font-manrope text-xs leading-4.5 text-[#e57373]">{error}</span>
      ) : null}
    </label>
  );
}

export function AdminProfileSettingsPage() {
  const { data: profile, isLoading, isError } = useUserProfile();
  const updateProfileMutation = useUpdateUserProfile();
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  // Derived initial values from current profile
  const initialFirstName =
    profile?.firstName ?? (profile?.name ? (profile.name.trim().split(/\s+/)[0] ?? '') : '');

  const initialLastName =
    profile?.lastName ?? (profile?.name ? profile.name.trim().split(/\s+/).slice(1).join(' ') : '');

  const initialPhone = profile?.phone ?? '';
  const email = profile?.email ?? '';

  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: initialFirstName,
      lastName: initialLastName,
      phone: initialPhone,
    },
    values: profile
      ? {
          firstName: initialFirstName,
          lastName: initialLastName,
          phone: initialPhone,
        }
      : undefined,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = form;

  const watchedFirstName = useWatch({ control, name: 'firstName' });
  const watchedLastName = useWatch({ control, name: 'lastName' });

  const currentFirstName = watchedFirstName ?? initialFirstName;
  const currentLastName = watchedLastName ?? initialLastName;

  const firstChar = (currentFirstName || '').trim()[0] || '';
  const lastChar = (currentLastName || '').trim()[0] || '';
  const initials = (firstChar + lastChar).toUpperCase() || 'AD';

  const full = `${currentFirstName} ${currentLastName}`.trim();
  const displayName = full || profile?.name || 'Administrator';

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size exceeds maximum limit of 5MB.');
      return;
    }

    try {
      setIsUploadingPhoto(true);
      const url = await uploadAvatar(file);
      await updateProfileMutation.mutateAsync({
        profileImage: url,
      });
      toast.success('Profile photo updated successfully.');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to upload profile photo.');
    } finally {
      setIsUploadingPhoto(false);
      event.target.value = '';
    }
  };

  const handleRemovePhoto = async () => {
    try {
      setIsUploadingPhoto(true);
      await updateProfileMutation.mutateAsync({
        profileImage: null,
      });
      toast.success('Profile photo removed.');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to remove profile photo.');
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const onSubmit = async (data: ProfileValues) => {
    try {
      const trimmedFirst = data.firstName.trim();
      const trimmedLast = data.lastName.trim();
      const trimmedPhone = data.phone?.trim() || null;
      const combinedName = `${trimmedFirst} ${trimmedLast}`.trim();

      await updateProfileMutation.mutateAsync({
        firstName: trimmedFirst,
        lastName: trimmedLast,
        name: combinedName,
        phone: trimmedPhone,
      });

      toast.success('Your profile has been updated successfully.');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to update profile.');
    }
  };

  return (
    <AdminSettingsShell activeSection="profile">
      <main className="w-full min-w-0 max-w-3xl">
        <header>
          <h1 className="font-nunito text-[22px] font-bold leading-8.25 text-[#263238]">
            My Profile
          </h1>
          <p className="pt-0.5 font-manrope text-[13px] leading-4.875 text-[#607d8b]">
            Manage your administrator account information. Distinct from editing a family&apos;s
            parent account in the Families module.
          </p>
        </header>

        {isLoading ? (
          <div className="mt-6 flex flex-col items-center justify-center gap-3 rounded-2xl border border-[#e7eceb] bg-white py-16 text-[#607d8b]">
            <Loader2 className="size-7 animate-spin text-[#2f7d7e]" />
            <p className="font-manrope text-sm">Loading administrator profile...</p>
          </div>
        ) : isError ? (
          <div className="mt-6 rounded-2xl border border-[#f2c7c2] bg-[#fff8f7] p-6 text-center text-[#b24b4b]">
            <p className="font-manrope text-sm font-semibold">Unable to load profile data.</p>
            <p className="mt-1 font-manrope text-xs text-[#7d8488]">
              Please check your connection and refresh the page.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Avatar & Header Summary */}
            <section className="mt-6 rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:p-5 2xl:p-6">
              <div className="flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5 2xl:flex-row 2xl:flex-wrap 2xl:items-center 2xl:gap-5">
                {profile?.profileImage ? (
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl border border-[#e7eceb] bg-[#f4f8f6]">
                    <Image
                      src={profile.profileImage}
                      alt={displayName}
                      fill
                      className="object-cover"
                      unoptimized={Boolean(
                        profile.profileImage.startsWith('http') ||
                        profile.profileImage.startsWith('/uploads')
                      )}
                    />
                  </div>
                ) : (
                  <span className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-[rgba(47,125,126,0.09)] font-nunito text-2xl font-bold leading-8 text-[#2f7d7e]">
                    {initials}
                  </span>
                )}

                <div className="min-w-0 flex-1 2xl:min-w-40">
                  <p className="font-nunito text-xl font-bold leading-7.5 text-[#263238]">
                    {displayName}
                  </p>
                  <p className="pt-px font-manrope text-sm leading-5.25 font-semibold text-[#2f7d7e]">
                    Administrator
                  </p>
                  <p className="break-all pt-px font-manrope text-[13px] leading-4.875 text-[#90a4ae] sm:break-normal 2xl:break-normal">
                    {email || 'admin@brighthorizons.co'}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <label className="flex h-9 cursor-pointer items-center justify-center gap-2 rounded-[14px] border border-[rgba(47,125,126,0.25)] bg-[rgba(47,125,126,0.03)] px-4 py-2 font-manrope text-sm font-semibold leading-5 text-[#2f7d7e] transition-colors hover:bg-[rgba(47,125,126,0.08)]">
                    {isUploadingPhoto ? (
                      <Loader2 aria-hidden="true" size={14} className="animate-spin" />
                    ) : (
                      <Camera aria-hidden="true" size={14} strokeWidth={1.7} />
                    )}
                    <span>{isUploadingPhoto ? 'Uploading...' : 'Change Profile Photo'}</span>
                    <input
                      accept="image/png,image/jpeg,image/webp,image/jpg"
                      className="sr-only"
                      type="file"
                      disabled={isUploadingPhoto}
                      onChange={handleFileChange}
                    />
                  </label>

                  {profile?.profileImage && (
                    <button
                      type="button"
                      disabled={isUploadingPhoto}
                      onClick={handleRemovePhoto}
                      className="flex h-9 items-center justify-center gap-1.5 rounded-[14px] border border-[#e7eceb] px-3 font-manrope text-xs font-semibold text-[#e57373] transition-colors hover:bg-[#fff5f5]"
                      title="Remove profile photo"
                    >
                      <Trash2 aria-hidden="true" size={13} />
                      <span>Remove</span>
                    </button>
                  )}
                </div>
              </div>
            </section>

            {/* Basic Information Form */}
            <section className="mt-3.5 rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:p-5 2xl:p-6">
              <h2 className="font-nunito text-[17px] font-bold leading-6.375 text-[#263238]">
                Basic Information
              </h2>
              <div className="mt-5 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField label="First Name" required error={errors.firstName?.message}>
                    <input
                      {...register('firstName')}
                      className={inputClassName}
                      placeholder="First name"
                    />
                  </FormField>
                  <FormField label="Last Name" required error={errors.lastName?.message}>
                    <input
                      {...register('lastName')}
                      className={inputClassName}
                      placeholder="Last name"
                    />
                  </FormField>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <FormField label="Phone Number" error={errors.phone?.message}>
                    <input
                      {...register('phone')}
                      className={inputClassName}
                      type="tel"
                      placeholder="+1 (555) 012-3456"
                    />
                  </FormField>

                  <FormField label="Email Address">
                    <div className="relative">
                      <input
                        value={email}
                        disabled
                        readOnly
                        className="h-10.75 w-full rounded-xl border border-[#d8e2df] bg-[#edf2f1] py-2.5 pl-3.5 pr-10 font-manrope text-sm leading-5.25 text-[#78909c] cursor-not-allowed select-none outline-none"
                      />
                      <span
                        className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#90a4ae]"
                        title="Email cannot be changed"
                      >
                        <Lock aria-hidden="true" size={15} />
                      </span>
                    </div>
                    <span className="font-manrope text-xs leading-4.5 text-[#607d8b]">
                      Email address cannot be changed. This is your primary administrator
                      identifier.
                    </span>
                  </FormField>
                </div>
              </div>
            </section>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting || updateProfileMutation.isPending}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-[14px] bg-[#2f7d7e] px-6 py-2.5 font-manrope text-sm font-semibold leading-5 text-white transition-colors hover:bg-[#266b6c] disabled:opacity-60"
              >
                {(isSubmitting || updateProfileMutation.isPending) && (
                  <Loader2 aria-hidden="true" size={14} className="animate-spin" />
                )}
                <span>Save Changes</span>
              </button>
              <button
                type="button"
                onClick={() => reset()}
                disabled={isSubmitting || updateProfileMutation.isPending}
                className="h-10 rounded-[14px] border border-[#e7eceb] bg-white px-5 py-2.5 font-manrope text-sm font-semibold leading-5 text-[#607d8b] transition-colors hover:bg-[#f4f8f6] disabled:opacity-60"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </main>
    </AdminSettingsShell>
  );
}
