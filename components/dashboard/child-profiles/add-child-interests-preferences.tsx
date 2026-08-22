'use client';

import { DynamicForm } from '@/components/ui/dynamic-form';
import { AddChildStepper } from './add-child-stepper';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { z } from 'zod';
import { toast } from 'sonner';

const interestsPreferencesSchema = z.object({
  favorites: z.array(z.string()).min(1, 'Choose at least one favorite.'),
  activityTypes: z.array(z.string()).min(1, 'Choose at least one activity type.'),
});

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
      className={`rounded-full border px-2.25 py-1.75 font-nunito text-base font-medium leading-6 tracking-[-0.176px] transition-colors ${selected ? 'border-[#fce9e3] bg-[#f2b59f] text-[#515b60]' : 'border-[#d4d6d7] bg-white text-[#7d8488]'}`}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
}

export function AddChildInterestsPreferences() {
  const router = useRouter();

  function completeProfile() {
    toast.success('Child profile added successfully.');
    router.push('/dashboard/child-profiles');
  }

  return (
    <section className="mx-auto w-full max-w-212.75 pb-8 pt-6.5 text-[#263238]">
      <AddChildStepper currentStep={4} />

      <DynamicForm
        defaultValues={{
          favorites: ['Vehicle', 'Sports'],
          activityTypes: ['Active', 'Outdoor Play'],
        }}
        fields={[]}
        onSubmit={completeProfile}
        schema={interestsPreferencesSchema}
      >
        {(form) => {
          const selectedFavorites = form.watch('favorites');
          const selectedActivityTypes = form.watch('activityTypes');

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

          return (
            <>
              <section className="mt-14 rounded-2xl border border-[#eff1ef] bg-white p-8">
                <h1 className="font-nunito text-2xl font-semibold leading-8 text-[#263238]">
                  Interests &amp; Preferences
                </h1>

                <div className="mt-8 space-y-8">
                  <fieldset className="flex flex-col gap-4">
                    <legend className="font-manrope text-lg font-medium leading-6.75 tracking-[-0.27px]">
                      What they love
                    </legend>
                    <div className="flex flex-wrap gap-4">
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
                    <div className="flex flex-wrap gap-4">
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

              <div className="mt-14 flex flex-wrap gap-4">
                <button
                  className="flex h-14 items-center gap-1 rounded-[32px] border border-[#d5e5e5] bg-[#2f7d7e] px-4 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-white"
                  type="submit"
                >
                  <Plus aria-hidden="true" size={24} strokeWidth={1.7} />
                  Add Child Profile
                </button>
                <Link
                  className="flex h-14 w-30.75 items-center justify-center rounded-[32px] border border-[#d4d6d7] bg-white px-4 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-[#14094b]"
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
