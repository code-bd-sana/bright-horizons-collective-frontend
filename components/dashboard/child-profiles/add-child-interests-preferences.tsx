'use client';

import { DynamicForm } from '@/components/ui/dynamic-form';
import { AddChildStepper } from './add-child-stepper';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { z } from 'zod';
import { toast } from 'sonner';
import { useAddChildWizard } from '@/features/child-profiles/context/add-child-context';
import {
  useCreateChildProfile,
  useUploadChildAvatar,
} from '@/features/child-profiles/hooks/child-profiles.mutations';

const interestsPreferencesSchema = z.object({
  favorites: z.array(z.string()).min(1, 'Choose at least one favorite.'),
  activityTypes: z.array(z.string()).min(1, 'Choose at least one activity type.'),
});

type InterestsPreferencesValues = z.infer<typeof interestsPreferencesSchema>;

const favorites = [
  'Animals',
  'Music',
  'Dinosaurs',
  'Art',
  'Vehicle',
  'Space',
  'Books',
  'Sports',
  'Cooking',
  'Puzzles',
  'Cats',
  'Dogs',
];

const activityTypes = [
  'Active',
  'Calming',
  'Creative',
  'Quick',
  'Outdoor Play',
  'Building',
  'Pretend Play',
  'Science Experiments',
];

function InterestChip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      aria-pressed={selected}
      className={`rounded-full border px-4 py-2 font-nunito text-base font-medium leading-6 tracking-[-0.176px] transition-colors ${selected ? 'border-[#2f7d7e] bg-[#2f7d7e] text-white' : 'border-[#d4d6d7] bg-white text-[#515b60] hover:border-[#2f7d7e]'}`}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
}

export function AddChildInterestsPreferences() {
  const router = useRouter();
  const { state, reset } = useAddChildWizard();
  const createChildMutation = useCreateChildProfile();
  const uploadAvatarMutation = useUploadChildAvatar();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function completeProfile(data: InterestsPreferencesValues) {
    if (!state.nickname.trim()) {
      toast.error('Please complete the basic information first.');
      router.push('/dashboard/child-profiles/add-child');
      return;
    }

    setIsSubmitting(true);
    try {
      let photoUrl = state.photoUrl || undefined;
      if (state.photoFile) {
        try {
          const uploadResult = await uploadAvatarMutation.mutateAsync(state.photoFile);
          photoUrl = uploadResult.url;
        } catch (uploadErr) {
          console.error('Avatar upload failed, proceeding without avatar:', uploadErr);
        }
      }

      await createChildMutation.mutateAsync({
        name: state.nickname.trim(),
        photoUrl,
        gender: state.gender || undefined,
        ageYears: Number(state.ageYears) || 0,
        ageMonths: Number(state.ageMonths) || 0,
        caregiverName: state.caregiverName || undefined,
        caregiverRelationship: state.relationship || undefined,
        caregiverEmail: state.email || undefined,
        caregiverPhone: state.phone || undefined,
        areasOfSupport: state.areasOfSupport,
        notes: state.notes || undefined,
        favorites: data.favorites,
        activityTypes: data.activityTypes,
      });

      toast.success(`${state.nickname}'s profile added successfully!`);
      reset();
      router.push('/dashboard/child-profiles');
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to create child profile. Please try again.';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mx-auto w-full min-w-0 max-w-212.75 pb-8 pt-4 text-[#263238] sm:pt-6.5">
      <AddChildStepper currentStep={4} />

      <DynamicForm
        defaultValues={{
          favorites: state.favorites,
          activityTypes: state.activityTypes,
        }}
        fields={[]}
        onSubmit={completeProfile}
        schema={interestsPreferencesSchema}
      >
        {(form) => {
          const selectedFavorites = form.watch('favorites') || [];
          const selectedActivityTypes = form.watch('activityTypes') || [];

          function toggleSelection(field: 'favorites' | 'activityTypes', value: string) {
            const selected = field === 'favorites' ? selectedFavorites : selectedActivityTypes;
            form.setValue(
              field,
              selected.includes(value)
                ? selected.filter((selectedValue) => selectedValue !== value)
                : [...selected, value],
              { shouldValidate: true }
            );
          }

          const isBusy = isSubmitting || createChildMutation.isPending;

          return (
            <>
              <section className="mt-8 rounded-2xl border border-[#eff1ef] bg-white p-4 sm:mt-10 sm:p-6 2xl:mt-14 2xl:p-8">
                <h1 className="font-nunito text-2xl font-semibold leading-8 text-[#263238]">
                  Interests &amp; Preferences
                </h1>

                <div className="mt-8 space-y-8">
                  <fieldset className="flex flex-col gap-4">
                    <legend className="font-manrope text-lg font-medium leading-6.75 tracking-[-0.27px]">
                      What they love
                    </legend>
                    <div className="flex flex-wrap gap-2.5 sm:gap-4">
                      {favorites.map((favorite) => (
                        <InterestChip
                          key={favorite}
                          label={favorite}
                          onClick={() => toggleSelection('favorites', favorite)}
                          selected={selectedFavorites.includes(favorite)}
                        />
                      ))}
                    </div>
                    <p className="font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#515b60]">
                      Pick a few favorites to spark weekly ideas
                    </p>
                    {form.formState.errors.favorites && (
                      <span className="font-manrope text-xs text-[#b24b4b]">
                        {form.formState.errors.favorites.message}
                      </span>
                    )}
                  </fieldset>

                  <fieldset className="flex flex-col gap-4">
                    <legend className="font-manrope text-lg font-medium leading-6.75 tracking-[-0.27px]">
                      Preferred Activity Types
                    </legend>
                    <div className="flex flex-wrap gap-2.5 sm:gap-4">
                      {activityTypes.map((activityType) => (
                        <InterestChip
                          key={activityType}
                          label={activityType}
                          onClick={() => toggleSelection('activityTypes', activityType)}
                          selected={selectedActivityTypes.includes(activityType)}
                        />
                      ))}
                    </div>
                    <p className="font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#515b60]">
                      Choose the styles of play they enjoy most
                    </p>
                    {form.formState.errors.activityTypes && (
                      <span className="font-manrope text-xs text-[#b24b4b]">
                        {form.formState.errors.activityTypes.message}
                      </span>
                    )}
                  </fieldset>
                </div>
              </section>

              <div className="mt-8 flex flex-col gap-3 sm:mt-14 sm:flex-row sm:flex-wrap sm:gap-4">
                <button
                  type="button"
                  disabled={isBusy}
                  onClick={() =>
                    router.push('/dashboard/child-profiles/add-child/development-focus')
                  }
                  className="flex h-14 w-full items-center justify-center rounded-full border border-[#d4d6d7] bg-white px-6 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-[#515b60] transition-colors hover:bg-gray-50 disabled:opacity-60 sm:w-auto"
                >
                  Back
                </button>
                <button
                  disabled={isBusy}
                  className="flex h-14 w-full items-center justify-center gap-2 rounded-full border border-[#d5e5e5] bg-[#2f7d7e] px-8 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-white transition-colors hover:bg-[#276a6b] disabled:opacity-60 sm:w-auto"
                  type="submit"
                >
                  {isBusy && <Loader2 className="size-5 animate-spin text-white" />}
                  <span>{isBusy ? 'Saving Profile...' : 'Complete Profile'}</span>
                </button>
                <Link
                  className="flex h-14 w-full items-center justify-center rounded-full border border-[#d4d6d7] bg-white px-6 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-[#515b60] transition-colors hover:bg-gray-50 sm:w-auto"
                  href="/dashboard/child-profiles"
                >
                  Cancel
                </Link>
              </div>
            </>
          );
        }}
      </DynamicForm>
    </section>
  );
}

export default AddChildInterestsPreferences;
