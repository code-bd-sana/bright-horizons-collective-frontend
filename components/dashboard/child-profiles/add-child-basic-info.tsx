'use client';

import { DynamicForm } from '@/components/ui/dynamic-form';
import { AddChildStepper } from './add-child-stepper';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Camera, ChevronDown } from 'lucide-react';
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

const selectClassName =
  'h-11 w-full appearance-none bg-transparent px-3.5 pr-10 font-manrope text-base leading-6 tracking-[-0.176px] text-[#515b60] outline-none';

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
    <section className="mx-auto w-full max-w-212.75 pb-8 pt-6.5 text-[#263238]">
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
            <section className="mt-14 min-h-129.75 rounded-2xl border border-[#eff1ef] bg-white p-8">
              <h2 className="font-nunito text-2xl font-semibold leading-8 text-[#263238]">
                Basic Information
              </h2>
              <div className="mt-8 flex items-center gap-4">
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

                <label className="flex flex-col gap-1.5">
                  <span className="font-manrope text-lg font-medium leading-6.75 tracking-[-0.27px]">
                    Gender <span className="text-[#7d8488]">(Optional)</span>
                  </span>
                  <span className="relative rounded-full border border-[#d8ddd9] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.05)]">
                    <select
                      aria-label="Gender"
                      className={selectClassName}
                      {...form.register('gender')}
                    >
                      <option>Girl</option>
                      <option>Boy</option>
                      <option>Non-binary</option>
                      <option>Prefer not to say</option>
                    </select>
                    <ChevronDown
                      aria-hidden="true"
                      className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2"
                      strokeWidth={1.5}
                    />
                  </span>
                </label>

                <fieldset className="flex flex-col gap-1.5">
                  <legend className="font-manrope text-lg font-medium leading-6.75 tracking-[-0.27px]">
                    Age
                  </legend>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <label className="relative rounded-full border border-[#d8ddd9] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.05)]">
                      <span className="sr-only">Years</span>
                      <select
                        aria-label="Age in years"
                        className={selectClassName}
                        {...form.register('ageYears')}
                      >
                        {Array.from({ length: 18 }, (_, value) => (
                          <option key={value} value={String(value)}>
                            {value}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        aria-hidden="true"
                        className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2"
                        strokeWidth={1.5}
                      />
                    </label>
                    <label className="relative rounded-full border border-[#d8ddd9] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.05)]">
                      <span className="sr-only">Months</span>
                      <select
                        aria-label="Additional months"
                        className={selectClassName}
                        {...form.register('ageMonths')}
                      >
                        {Array.from({ length: 12 }, (_, value) => (
                          <option key={value} value={String(value)}>
                            {value}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        aria-hidden="true"
                        className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2"
                        strokeWidth={1.5}
                      />
                    </label>
                  </div>
                </fieldset>
              </div>
            </section>

            <div className="mt-14 flex flex-wrap gap-4">
              <button
                className="h-14 rounded-[32px] border border-[#d5e5e5] bg-[#2f7d7e] px-4 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-white"
                type="submit"
              >
                Continue to Caregiver Information
              </button>
              <Link
                className="flex h-14 w-30.75 items-center justify-center rounded-[32px] border border-[#d4d6d7] bg-white px-4 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-[#14094b]"
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
