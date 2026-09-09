'use client';

import { DynamicForm } from '@/components/ui/dynamic-form';
import { AddChildStepper } from './add-child-stepper';
import { AddChildSelect } from './add-child-select';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Camera } from 'lucide-react';
import { useState } from 'react';
import { z } from 'zod';
import { toast } from 'sonner';

const basicInfoSchema = z.object({
  nickname: z.string().trim().min(1, 'Please enter a nickname.'),
  gender: z.string().optional(),
  ageYears: z.string().min(1, 'Select years.'),
  ageMonths: z.string().min(1, 'Select months.'),
  photo: z.unknown().optional(),
});

type BasicInfoValues = z.infer<typeof basicInfoSchema>;

const genderOptions = ['Girl', 'Boy', 'Non-binary', 'Prefer not to say'].map((value) => ({
  label: value,
  value,
}));

const yearOptions = Array.from({ length: 18 }, (_, value) => ({
  label: String(value),
  value: String(value),
}));

const monthOptions = Array.from({ length: 12 }, (_, value) => ({
  label: String(value),
  value: String(value),
}));

export function AddChildBasicInfo() {
  const router = useRouter();
  const [photoPreview, setPhotoPreview] = useState('/Home/figma-child-profile-emma.png');

  function updatePhoto(file: File | undefined, setPhoto: (file: File) => void) {
    if (!file) return;

    setPhoto(file);
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  function submitBasicInfo(data: BasicInfoValues) {
    toast.success(`${data.nickname}'s basic information has been saved.`);
    router.push('/dashboard/child-profiles/add-child/caregiver-information');
  }

  return (
    <section className="mx-auto w-full min-w-0 max-w-212.75 pb-8 pt-4 text-[#263238] sm:pt-6.5">
      <AddChildStepper currentStep={1} />

      <DynamicForm
        defaultValues={{
          nickname: 'Emma',
          gender: 'Girl',
          ageYears: '4',
          ageMonths: '3',
          photo: undefined,
        }}
        fields={[]}
        onSubmit={submitBasicInfo}
        schema={basicInfoSchema}
      >
        {(form) => (
          <>
            <section className="mt-8 rounded-2xl border border-[#eff1ef] bg-white p-4 sm:mt-10 sm:p-6 2xl:mt-14 2xl:min-h-129.75 2xl:p-8">
              <h2 className="font-nunito text-2xl font-semibold leading-8 text-[#263238]">
                Basic Information
              </h2>
              <div className="mt-8 flex flex-col items-start gap-4 min-[400px]:flex-row min-[400px]:items-center">
                <span className="relative size-16 shrink-0 overflow-hidden rounded-full bg-[#b16262] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                  <Image
                    alt="Child profile preview"
                    fill
                    sizes="64px"
                    src={photoPreview}
                    className="object-cover object-[50%_25%]"
                  />
                </span>
                <label className="flex h-10 cursor-pointer items-center gap-2 rounded-full border border-[#e2e8e8] px-4 py-2 font-manrope text-sm font-semibold leading-5 text-[#7d8488] transition-colors hover:bg-[#f8fbfa]">
                  <Camera aria-hidden="true" size={14} strokeWidth={1.7} />
                  Change photo
                  <input
                    accept="image/png,image/jpeg"
                    className="sr-only"
                    onChange={(event) =>
                      updatePhoto(event.target.files?.[0], (file) => form.setValue('photo', file))
                    }
                    type="file"
                  />
                </label>
              </div>

              <div className="mt-8 space-y-6">
                <label className="flex flex-col gap-1.5">
                  <span className="font-manrope text-lg font-medium leading-6.75 tracking-[-0.27px]">
                    Nickname
                  </span>
                  <input
                    className="h-11 w-full rounded-full border border-[#d8ddd9] bg-white px-4 py-2.5 font-manrope text-base leading-6 tracking-[-0.176px] text-[#515b60] shadow-[0_1px_2px_rgba(16,24,40,0.05)] outline-none focus:border-[#2f7d7e]"
                    {...form.register('nickname')}
                  />
                  {form.formState.errors.nickname && (
                    <span className="font-manrope text-xs text-[#b24b4b]">
                      {form.formState.errors.nickname.message}
                    </span>
                  )}
                </label>

                <div className="flex flex-col gap-1.5">
                  <span className="font-manrope text-lg font-medium leading-6.75 tracking-[-0.27px]">
                    Gender <span className="text-[#7d8488]">(Optional)</span>
                  </span>
                  <AddChildSelect
                    ariaLabel="Gender"
                    name="gender"
                    onValueChange={(value) =>
                      form.setValue('gender', value, { shouldDirty: true, shouldValidate: true })
                    }
                    options={genderOptions}
                    placeholder="Select gender"
                    value={form.watch('gender') ?? ''}
                  />
                </div>

                <fieldset className="flex flex-col gap-1.5">
                  <legend className="font-manrope text-lg font-medium leading-6.75 tracking-[-0.27px]">
                    Age
                  </legend>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <span className="sr-only">Years</span>
                      <AddChildSelect
                        ariaLabel="Age in years"
                        name="ageYears"
                        onValueChange={(value) =>
                          form.setValue('ageYears', value, {
                            shouldDirty: true,
                            shouldValidate: true,
                          })
                        }
                        options={yearOptions}
                        placeholder="Select Year"
                        value={form.watch('ageYears')}
                      />
                    </div>
                    <div>
                      <span className="sr-only">Months</span>
                      <AddChildSelect
                        ariaLabel="Additional months"
                        name="ageMonths"
                        onValueChange={(value) =>
                          form.setValue('ageMonths', value, {
                            shouldDirty: true,
                            shouldValidate: true,
                          })
                        }
                        options={monthOptions}
                        placeholder="Select Month"
                        value={form.watch('ageMonths')}
                      />
                    </div>
                  </div>
                </fieldset>
              </div>
            </section>

            <div className="mt-8 flex flex-col gap-3 sm:mt-14 sm:flex-row sm:flex-wrap sm:gap-4">
              <button
                className="h-14 w-full rounded-full border border-[#d5e5e5] bg-[#2f7d7e] px-4 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-white sm:w-auto"
                type="submit"
              >
                Continue to Caregiver Information
              </button>
              <Link
                className="flex h-14 w-full items-center justify-center rounded-full border border-[#d4d6d7] bg-white px-4 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-[#14094b] sm:w-30.75"
                href="/dashboard/child-profiles"
              >
                Cancel
              </Link>
            </div>
          </>
        )}
      </DynamicForm>
    </section>
  );
}
