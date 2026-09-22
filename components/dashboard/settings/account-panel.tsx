'use client';

import { inputClassName } from '@/components/ui/form-fields';
import Image from 'next/image';
import { Loader2, Upload } from 'lucide-react';
import { FormEvent, type ReactNode, useState } from 'react';
import { toast } from 'sonner';
import {
  uploadAvatar,
  UserProfile,
  useUpdateUserProfile,
  useUserProfile,
} from './hooks/use-user-profile';

function SettingField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex min-w-0 flex-col gap-1.5 font-manrope text-lg leading-6.75 tracking-[-0.27px] text-[#263238]">
      {label}
      {children}
    </label>
  );
}

function AccountPanelForm({ initialProfile }: { initialProfile?: UserProfile }) {
  const updateProfileMutation = useUpdateUserProfile();

  const [name, setName] = useState(initialProfile?.name ?? '');
  const [phone, setPhone] = useState(initialProfile?.phone ?? '');
  const [relationship, setRelationship] = useState(initialProfile?.relationship ?? '');
  const [language, setLanguage] = useState(initialProfile?.language ?? 'English (United States)');
  const [profileImage, setProfileImage] = useState<string | null>(
    initialProfile?.profileImage ?? null
  );
  const [isUploading, setIsUploading] = useState(false);

  const email = initialProfile?.email ?? '';

  const handleCancel = () => {
    setName(initialProfile?.name ?? '');
    setPhone(initialProfile?.phone ?? '');
    setRelationship(initialProfile?.relationship ?? '');
    setLanguage(initialProfile?.language ?? 'English (United States)');
    setProfileImage(initialProfile?.profileImage ?? null);
    toast.info('Changes reverted.');
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size exceeds maximum limit of 5MB.');
      return;
    }

    try {
      setIsUploading(true);
      const url = await uploadAvatar(file);
      setProfileImage(url);
      await updateProfileMutation.mutateAsync({
        profileImage: url,
      });
      toast.success('Profile photo updated successfully.');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to upload photo.');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleRemovePhoto = async () => {
    try {
      setIsUploading(true);
      setProfileImage(null);
      await updateProfileMutation.mutateAsync({
        profileImage: null,
      });
      toast.success('Profile photo removed successfully.');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to remove photo.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Full Name is required.');
      return;
    }

    updateProfileMutation.mutate(
      {
        name: name.trim(),
        phone: phone.trim() || undefined,
        relationship: relationship.trim() || undefined,
        language: language.trim() || undefined,
        profileImage: profileImage ?? null,
      },
      {
        onSuccess: () => {
          toast.success('Account settings saved successfully.');
        },
      }
    );
  };

  const initials = name
    ? name
        .trim()
        .split(/\s+/)
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'U';

  return (
    <form onSubmit={handleSubmit}>
      {/* 1. Profile Picture Card */}
      <section className="flex min-h-41 items-center rounded-2xl border border-[#e8ebe8] bg-white p-4 sm:p-8">
        <div className="flex w-full flex-col items-center gap-3 text-center min-[420px]:flex-row min-[420px]:text-left sm:gap-4">
          <span className="relative flex size-25 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-[#d5e5e5] bg-[#2f7d7e] p-1">
            {profileImage ? (
              <Image
                src={profileImage}
                alt={name || 'Profile'}
                fill
                sizes="92px"
                unoptimized={profileImage.startsWith('http') || profileImage.startsWith('/uploads')}
                className="object-cover"
              />
            ) : (
              <span className="font-nunito text-3xl font-bold tracking-wider text-white">
                {initials}
              </span>
            )}
            {isUploading && (
              <span className="absolute inset-0 flex items-center justify-center bg-black/40">
                <Loader2 size={24} className="animate-spin text-white" />
              </span>
            )}
          </span>
          <div className="min-w-0">
            <p className="font-nunito text-xl font-medium leading-7 tracking-[-0.16px] text-[#263238] sm:text-2xl sm:leading-8">
              {name || 'Your Account'}
            </p>
            <p className="mt-1 font-manrope text-xs leading-4.5 text-[#7d8488]">
              JPG, PNG or WebP. Max 5MB
            </p>
            <div className="mx-auto mt-2 flex flex-wrap items-center gap-2 min-[420px]:mx-0">
              <label
                className={`flex min-h-8 w-fit cursor-pointer items-center gap-1.5 rounded-full border border-[#d5e5e5] bg-white px-3 font-nunito text-xs font-medium text-[#2f7d7e] transition-colors hover:bg-[#edf6f2] ${
                  isUploading ? 'pointer-events-none opacity-60' : ''
                }`}
              >
                {isUploading ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <Upload size={14} strokeWidth={1.7} aria-hidden="true" />
                    <span>{profileImage ? 'Change photo' : 'Upload photo'}</span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleFileChange}
                  disabled={isUploading}
                  className="sr-only"
                />
              </label>

              {profileImage && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  disabled={isUploading}
                  className="flex min-h-8 items-center rounded-full border border-[#e8ebe8] bg-white px-3 font-nunito text-xs font-medium text-[#c62828] transition-colors hover:bg-[#fdeeed] disabled:opacity-50"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Basic Information Card */}
      <section className="mt-6 rounded-2xl border border-[#e8ebe8] bg-white p-4 sm:p-8">
        <h2 className="font-nunito text-xl font-medium leading-7 tracking-[-0.16px] text-[#263238] sm:text-2xl sm:leading-8">
          Basic Information
        </h2>
        <div className="mt-6 grid gap-x-4 gap-y-6 sm:mt-8 sm:gap-y-7 md:grid-cols-2">
          <SettingField label="Full Name">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sarah Lin"
              className={inputClassName}
              required
            />
          </SettingField>

          <SettingField label="Email">
            <input
              type="email"
              value={email}
              disabled
              readOnly
              aria-readonly="true"
              className={`${inputClassName} cursor-not-allowed border-[#e8ebe8] bg-[#f8faf9] text-[#7d8488] select-none`}
            />
            <span className="font-manrope text-xs text-[#7d8488]">
              Email address cannot be changed.
            </span>
          </SettingField>

          <SettingField label="Phone">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. +1 (555) 000-0000"
              className={inputClassName}
            />
          </SettingField>

          <SettingField label="Caregiver Role/ Title">
            <input
              type="text"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              placeholder="e.g. Mother, Father, Caregiver"
              className={inputClassName}
            />
          </SettingField>
        </div>
      </section>

      {/* 3. Preferences Card */}
      <section className="mt-6 rounded-2xl border border-[#e8ebe8] bg-white p-4 sm:p-8">
        <h2 className="font-nunito text-xl font-medium leading-7 tracking-[-0.16px] text-[#263238] sm:text-2xl sm:leading-8">
          Preferences
        </h2>
        <div className="mt-6 grid gap-4 sm:mt-8 md:grid-cols-2">
          <SettingField label="Preferences">
            <input
              type="text"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              placeholder="e.g. English (United States)"
              className={inputClassName}
            />
          </SettingField>
        </div>
      </section>

      {/* 4. Action Buttons */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end sm:gap-4">
        <button
          type="button"
          onClick={handleCancel}
          disabled={updateProfileMutation.isPending || isUploading}
          className="h-14 w-full rounded-full border border-[#d4d6d7] bg-white font-nunito text-base font-medium tracking-[-0.176px] text-[#14094b] transition-colors hover:bg-[#f6fbfb] disabled:opacity-50 sm:w-30.75"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={updateProfileMutation.isPending || isUploading}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-full border border-[#d5e5e5] bg-[#2f7d7e] font-nunito text-base font-medium tracking-[-0.176px] text-white shadow-xs transition-colors hover:bg-[#266b6c] disabled:opacity-60 sm:w-46.75"
        >
          {updateProfileMutation.isPending ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <span>Save Changes</span>
          )}
        </button>
      </div>
    </form>
  );
}

export function AccountPanel() {
  const { data: userProfile, isLoading } = useUserProfile();

  if (isLoading) {
    return (
      <div className="flex min-h-80 items-center justify-center rounded-2xl border border-[#e8ebe8] bg-white p-8">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={32} className="animate-spin text-[#2f7d7e]" />
          <p className="font-manrope text-sm text-[#7d8488]">Loading account details...</p>
        </div>
      </div>
    );
  }

  return <AccountPanelForm key={userProfile?.id ?? 'default'} initialProfile={userProfile} />;
}
