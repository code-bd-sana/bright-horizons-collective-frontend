'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AlertTriangle, Loader2, PenLine, Trash2, User } from 'lucide-react';
import { FormEvent, useRef, useState } from 'react';
import { toast } from 'sonner';

import { useActiveChild } from '@/features/child-profiles/context/child-profile-detail-context';
import {
  useDeleteChildProfile,
  useUpdateChildProfile,
  useUploadChildAvatar,
} from '@/features/child-profiles/hooks/child-profiles.mutations';
import { FieldLabel, SelectField, TextField, ToggleChips } from '@/components/ui/form-fields';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useAppStore } from '@/store/use-app-store';
import type { ChildProfile } from '@/features/child-profiles/model/child-profile.types';

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex min-w-0 flex-col gap-6 rounded-2xl border border-[#EFF1EF] bg-white p-4 sm:p-6 2xl:gap-8 2xl:p-8">
      <div className="flex items-center gap-3">
        <h2 className="font-nunito text-2xl font-semibold leading-8 text-[#263238]">{title}</h2>
      </div>
      <div className="flex flex-col gap-6 sm:gap-8">{children}</div>
    </section>
  );
}

const GENDER_OPTIONS = ['Girl', 'Boy', 'Non-binary', 'Prefer not to say'];
const YEAR_OPTIONS = Array.from({ length: 18 }, (_, i) => String(i));
const MONTH_OPTIONS = Array.from({ length: 12 }, (_, i) => String(i));

const RELATIONSHIP_OPTIONS = [
  'Father',
  'Mother',
  'Caregiver',
  'Grandparent',
  'Foster parent',
  'Other',
];

const SUPPORT_OPTIONS = [
  'Fine Motor',
  'Gross Motor',
  'Language',
  'Social-Emotional',
  'Sensory',
  'Cognitive',
  'Sleep Routines',
  'Focus & Attention',
];

const FAVORITES_OPTIONS = [
  'Animals',
  'Music',
  'Dinosaurs',
  'Art',
  'Vehicles',
  'Space',
  'Books',
  'Sports',
  'Cooking',
  'Puzzles',
  'Cats',
  'Dogs',
];

const ACTIVITY_TYPE_OPTIONS = [
  'Active',
  'Calming',
  'Creative',
  'Quick',
  'Outdoor Play',
  'Building',
  'Pretend Play',
  'Science Experiments',
];

function PersonalInformationForm({ child, refetch }: { child: ChildProfile; refetch: () => void }) {
  const router = useRouter();
  const { selectedChildId, setSelectedChildId } = useAppStore();

  const updateMutation = useUpdateChildProfile();
  const deleteMutation = useDeleteChildProfile();
  const uploadAvatarMutation = useUploadChildAvatar();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  // Form states initialized directly from child
  const [photoUrl, setPhotoUrl] = useState<string | null>(child.photoUrl ?? null);
  const [name, setName] = useState(child.name ?? '');
  const [gender, setGender] = useState(child.gender ?? 'Girl');
  const [ageYears, setAgeYears] = useState(String(child.ageYears ?? child.age ?? 0));
  const [ageMonths, setAgeMonths] = useState(String(child.ageMonths ?? 0));
  const [caregiverName, setCaregiverName] = useState(child.caregiverName ?? '');
  const [caregiverRelationship, setCaregiverRelationship] = useState(
    child.caregiverRelationship ?? ''
  );
  const [caregiverEmail, setCaregiverEmail] = useState(child.caregiverEmail ?? '');
  const [caregiverPhone, setCaregiverPhone] = useState(child.caregiverPhone ?? '');
  const [areasOfSupport, setAreasOfSupport] = useState<string[]>(child.areasOfSupport ?? []);
  const [notes, setNotes] = useState(child.notes ?? '');
  const [favorites, setFavorites] = useState<string[]>(child.favorites ?? []);
  const [activityTypes, setActivityTypes] = useState<string[]>(child.activityTypes ?? []);

  const handlePhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Avatar image must not exceed 5 MB.');
      return;
    }

    try {
      setIsUploadingPhoto(true);
      const res = await uploadAvatarMutation.mutateAsync(file);
      setPhotoUrl(res.url);
      toast.success('Photo uploaded successfully.');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to upload photo.';
      toast.error(msg);
    } finally {
      setIsUploadingPhoto(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemovePhoto = () => {
    setPhotoUrl(null);
  };

  const handleSaveChanges = async (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Please enter a nickname or name for the child.');
      return;
    }

    try {
      await updateMutation.mutateAsync({
        id: child.id,
        input: {
          name: name.trim(),
          photoUrl: photoUrl ?? undefined,
          gender: gender || undefined,
          ageYears: parseInt(ageYears, 10) || 0,
          ageMonths: parseInt(ageMonths, 10) || 0,
          caregiverName: caregiverName.trim() || undefined,
          caregiverRelationship: caregiverRelationship || undefined,
          caregiverEmail: caregiverEmail.trim() || undefined,
          caregiverPhone: caregiverPhone.trim() || undefined,
          areasOfSupport,
          notes: notes.trim() || undefined,
          favorites,
          activityTypes,
        },
      });

      refetch();
      toast.success('Child profile updated successfully!');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update child profile.';
      toast.error(msg);
    }
  };

  const handleConfirmRemoveChild = async () => {
    try {
      await deleteMutation.mutateAsync(child.id);

      if (selectedChildId === child.id) {
        setSelectedChildId(null);
      }

      setIsDeleteModalOpen(false);
      toast.success(`${child.name}'s profile has been removed.`);
      router.replace('/dashboard/child-profiles');
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to remove child profile.';
      toast.error(msg);
    }
  };

  const isSaving = updateMutation.isPending;
  const isDeleting = deleteMutation.isPending;

  return (
    <div className="mx-auto mt-8 flex w-full min-w-0 max-w-179.5 flex-col gap-8 pb-12 sm:mt-10 sm:gap-10 2xl:mt-14 2xl:gap-14">
      <form onSubmit={handleSaveChanges} className="flex flex-col gap-6 sm:gap-8">
        <Card title="Basic Information">
          {/* Avatar & Photo Actions */}
          <div className="flex flex-col items-start gap-4 min-[400px]:flex-row min-[400px]:items-center">
            <div className="flex h-16 w-16 shrink-0 overflow-hidden rounded-full bg-[#E5ECE9] shadow-[0_1px_2px_rgba(0,0,0,0.05)] items-center justify-center">
              {isUploadingPhoto ? (
                <Loader2 className="size-6 animate-spin text-[#2F7D7E]" />
              ) : photoUrl ? (
                <div className="relative h-full w-full">
                  <Image
                    src={photoUrl}
                    alt={name || 'Child'}
                    fill
                    className="object-cover"
                    sizes="64px"
                    unoptimized={
                      photoUrl.startsWith('http') ||
                      photoUrl.startsWith('/uploads') ||
                      photoUrl.startsWith('data:')
                    }
                  />
                </div>
              ) : (
                <User className="size-8 text-[#7D8488]" />
              )}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePhotoSelect}
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
            />

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                disabled={isUploadingPhoto || isSaving}
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 rounded-full border border-[#E2E8E8] bg-white px-4 py-2 transition-colors hover:bg-gray-50 disabled:opacity-60"
              >
                {isUploadingPhoto ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-[#7D8488]" />
                ) : (
                  <PenLine className="h-3.5 w-3.5 text-[#7D8488]" />
                )}
                <span className="font-manrope text-sm font-semibold leading-5 text-[#7D8488]">
                  {photoUrl ? 'Change photo' : 'Upload photo'}
                </span>
              </button>

              {photoUrl && (
                <button
                  type="button"
                  disabled={isUploadingPhoto || isSaving}
                  onClick={handleRemovePhoto}
                  className="flex items-center gap-1.5 rounded-full border border-transparent px-3 py-2 text-xs font-semibold text-[#b24b4b] hover:bg-[#fef2f2] transition-colors disabled:opacity-60"
                >
                  <Trash2 className="size-3.5" />
                  <span>Remove</span>
                </button>
              )}
            </div>
          </div>

          <TextField
            id="nickname"
            label="Nickname"
            placeholder="What do you call them?"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isSaving}
          />

          <SelectField
            id="gender"
            label={
              <span className="font-manrope text-lg font-medium leading-6.75 tracking-[-0.015em] text-[#263238]">
                Gender <span className="font-medium text-[#7D8488]">(Optional)</span>
              </span>
            }
            placeholder="e.g. Girl, Boy, Non-binary, Prefer not to say..."
            options={GENDER_OPTIONS}
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            disabled={isSaving}
          />

          <div className="flex flex-col gap-1.5">
            <FieldLabel>Age</FieldLabel>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <SelectField
                id="age-years"
                label=""
                placeholder="Select Year"
                options={YEAR_OPTIONS}
                value={ageYears}
                onChange={(e) => setAgeYears(e.target.value)}
                hideLabel={true}
                disabled={isSaving}
              />
              <SelectField
                id="age-months"
                label=""
                placeholder="Select Month"
                options={MONTH_OPTIONS}
                value={ageMonths}
                onChange={(e) => setAgeMonths(e.target.value)}
                hideLabel={true}
                disabled={isSaving}
              />
            </div>
          </div>
        </Card>

        <Card title="Caregiver Information">
          <TextField
            id="caregiver-name"
            label="Name"
            placeholder="First name or nickname"
            value={caregiverName}
            onChange={(e) => setCaregiverName(e.target.value)}
            optional
            disabled={isSaving}
          />

          <ToggleChips
            label="Relationship to the child"
            helper=""
            options={RELATIONSHIP_OPTIONS}
            value={caregiverRelationship ? [caregiverRelationship] : []}
            onChange={(selected) => setCaregiverRelationship(selected[0] || '')}
            singleSelect
            disabled={isSaving}
          />

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-2.5">
            <TextField
              id="caregiver-email"
              label="Email"
              placeholder="caregiver@example.com"
              type="email"
              value={caregiverEmail}
              onChange={(e) => setCaregiverEmail(e.target.value)}
              optional
              disabled={isSaving}
            />
            <TextField
              id="caregiver-phone"
              label="Phone"
              placeholder="+1 (555) 000-0000"
              type="tel"
              value={caregiverPhone}
              onChange={(e) => setCaregiverPhone(e.target.value)}
              optional
              disabled={isSaving}
            />
          </div>
        </Card>

        <Card title="Development & Focus">
          <ToggleChips
            label="Areas of Support"
            helper="Select the developmental areas you'd like to focus on right now."
            options={SUPPORT_OPTIONS}
            value={areasOfSupport}
            onChange={setAreasOfSupport}
            disabled={isSaving}
          />

          <label htmlFor="goals" className="flex flex-col gap-1.5">
            <FieldLabel optional>Specific Goals or Notes</FieldLabel>
            <textarea
              id="goals"
              placeholder="e.g. Working on pincer grasp, needs help with transitioning between activities..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={isSaving}
              className="min-h-37.5 w-full resize-y rounded-3xl border border-[#D8DDD9] bg-white px-4 py-3 font-manrope text-base leading-6 tracking-[-0.176px] text-[#515B60] shadow-[0_1px_2px_rgba(16,24,40,0.05)] outline-none transition-colors placeholder:text-[#A8ADAF] focus:border-[#2F7D7E] disabled:opacity-60"
            />
          </label>
        </Card>

        <Card title="Interests & Preferences">
          <ToggleChips
            label="What they love"
            helper="Pick a few favorites to spark weekly ideas"
            options={FAVORITES_OPTIONS}
            value={favorites}
            onChange={setFavorites}
            disabled={isSaving}
          />

          <ToggleChips
            label="Preferred Activity Types"
            helper="Choose the styles of play they enjoy most"
            options={ACTIVITY_TYPE_OPTIONS}
            value={activityTypes}
            onChange={setActivityTypes}
            disabled={isSaving}
          />
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:h-14 sm:flex-row sm:items-center sm:justify-start sm:gap-4">
          <button
            type="submit"
            disabled={isSaving || isDeleting}
            className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#2F7D7E] px-6 py-2 font-nunito text-base font-medium text-white shadow-[0px_0.6px_0px_0px_#401392,inset_0px_0.7px_2px_0px_#FFFFFF] transition-colors hover:bg-[#276a6b] disabled:opacity-60 disabled:cursor-not-allowed sm:w-auto sm:min-w-44"
          >
            {isSaving && <Loader2 className="size-4 animate-spin" />}
            <span>{isSaving ? 'Saving Changes…' : 'Save Changes'}</span>
          </button>

          <Link
            href={`/dashboard/child-profiles/${child.id}`}
            className="flex h-14 w-full items-center justify-center rounded-full border border-[#D4D6D7] bg-white px-6 py-2 font-nunito text-base font-medium text-[#14094B] shadow-[0px_0.4px_0px_0px_#2B223C,inset_0px_0.4px_0.5px_0px_rgba(255,255,255,0.75)] transition-colors hover:bg-gray-50 sm:w-auto sm:min-w-32"
          >
            Cancel
          </Link>
        </div>
      </form>

      {/* Danger Zone: Remove Child Profile */}
      <div className="flex flex-col gap-3 rounded-2xl border border-[#F5C6CB] bg-[#FEF6F6] p-5">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#B24B4B]" />
          <div className="flex min-w-0 flex-col gap-1">
            <h3 className="font-nunito text-sm font-semibold leading-5 text-[#263238]">
              Remove this child profile
            </h3>
            <p className="pb-1 font-manrope text-xs font-normal leading-4.75 text-[#515B60]">
              This will permanently delete {child.name}&apos;s weekly plan history, activity
              history, progress data, and achievements. This cannot be undone.
            </p>
            <button
              type="button"
              disabled={isSaving || isDeleting}
              onClick={() => setIsDeleteModalOpen(true)}
              className="w-fit font-manrope text-sm font-semibold leading-5 text-[#B24B4B] underline decoration-[#B24B4B] underline-offset-2 hover:text-[#913b3b] disabled:opacity-60"
            >
              Remove this child
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent
          showCloseButton={false}
          className="max-h-[calc(100dvh-2rem)] w-md max-w-[calc(100%-2rem)] gap-5 overflow-y-auto rounded-2xl border-0 bg-white p-5 shadow-[0_20px_30px_rgba(0,0,0,0.12)] sm:max-w-md sm:p-6"
        >
          <div className="flex items-start gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-[14px] bg-[#fce9e2] text-[#e57373]">
              <AlertTriangle aria-hidden="true" size={24} strokeWidth={1.75} />
            </span>
            <div className="min-w-0 flex-1">
              <DialogTitle className="font-nunito text-xl font-bold leading-7 text-[#263238]">
                Remove Child Profile?
              </DialogTitle>
              <p className="pt-2 font-manrope text-sm leading-5.5 text-[#607d8b]">
                Are you sure you want to delete{' '}
                <strong className="text-[#263238]">{child.name}</strong>&apos;s profile? All weekly
                plan history, progress tracking, and activity records associated with this child
                will be permanently removed.
              </p>
              <p className="pt-2 font-manrope text-xs leading-4.5 text-[#b24b4b] font-medium">
                This action cannot be undone.
              </p>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-[#e7eceb] pt-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              disabled={isDeleting}
              onClick={() => setIsDeleteModalOpen(false)}
              className="w-full rounded-xl border border-[#e7eceb] px-5 py-2.5 font-manrope text-sm font-semibold leading-5 text-[#607d8b] transition-colors hover:bg-[#f5f7f6] disabled:opacity-60 sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={isDeleting}
              onClick={handleConfirmRemoveChild}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#e57373] px-5 py-2.5 font-manrope text-sm font-semibold leading-5 text-white shadow-xs transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed sm:w-auto"
            >
              {isDeleting && <Loader2 className="size-4 animate-spin" />}
              <span>{isDeleting ? 'Removing…' : 'Yes, Remove Child'}</span>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function PersonalInformationPage() {
  const { child, refetch } = useActiveChild();

  if (!child) return null;

  return (
    <PersonalInformationForm
      key={`${child.id}-${child.updatedAt}`}
      child={child}
      refetch={refetch}
    />
  );
}
