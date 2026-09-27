'use client';

import { DynamicForm } from '@/components/ui/dynamic-form';
import { ArrowLeft, ImageUp, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Controller } from 'react-hook-form';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import {
  CATEGORY_OPTIONS,
  useWeeklyPlanFormStore,
  useUploadWeeklyPlanImage,
} from '@/features/weekly-plans';
import { WeeklyPlanFormSelect } from './weekly-plan-form-select';
import { WeeklyPlanFormStepper } from './weekly-plan-form-stepper';

const basicInfoSchema = z
  .object({
    title: z.string().trim().min(1, 'Please enter a plan title.'),
    description: z.string().trim().optional(),
    minAgeMonths: z.coerce.number().min(0, 'Min age must be 0 or higher.'),
    maxAgeMonths: z.coerce.number().min(0, 'Max age must be 0 or higher.'),
    category: z.string().min(1, 'Please select a development category.'),
    customCategory: z.string().optional(),
    weekNumber: z.string().optional(),
  })
  .refine((data) => Number(data.maxAgeMonths) >= Number(data.minAgeMonths), {
    message: 'Max age cannot be less than min age.',
    path: ['maxAgeMonths'],
  })
  .refine(
    (data) => {
      if (data.category === 'Other') {
        return Boolean(data.customCategory && data.customCategory.trim().length > 0);
      }
      return true;
    },
    {
      message: 'Please enter a custom development category.',
      path: ['customCategory'],
    }
  );

type BasicInfoValues = z.infer<typeof basicInfoSchema>;

const inputClassName =
  'h-10.75 w-full rounded-xl border border-[#e7eceb] bg-[#f4f8f6] px-3.75 font-manrope text-sm leading-5.25 text-[#263238] outline-none placeholder:text-[#607d8b] focus:border-[#2f7d7e]';

function FormLabel({
  children,
  required = false,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <span className="font-manrope text-[13px] font-semibold leading-[19.5px] text-[#263238]">
      {children}
      {required ? <span className="text-[#e57373]"> *</span> : null}
    </span>
  );
}

export function WeeklyPlanBasicInfoPage() {
  const router = useRouter();
  const formStore = useWeeklyPlanFormStore();
  const uploadImageMutation = useUploadWeeklyPlanImage();

  const [featuredImageName, setFeaturedImageName] = useState(formStore.featuredImageName || '');
  const [isUploading, setIsUploading] = useState(false);

  async function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setFeaturedImageName(file.name);
    setIsUploading(true);
    try {
      const { url } = await uploadImageMutation.mutateAsync(file);
      formStore.setBasicInfo({
        featuredImageUrl: url,
        featuredImageName: file.name,
        featuredImageFile: file,
      });
      toast.success('Featured image uploaded successfully.');
    } catch {
      toast.error('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  }

  function saveBasicInfo(data: BasicInfoValues) {
    formStore.setBasicInfo({
      title: data.title,
      description: data.description ?? '',
      minAgeMonths: String(data.minAgeMonths),
      maxAgeMonths: String(data.maxAgeMonths),
      category: data.category,
      customCategory: data.category === 'Other' ? (data.customCategory ?? '') : '',
      weekNumber: data.weekNumber || '1',
    });

    router.push('/dashboard/admin/weekly-plans/create/activities');
  }

  return (
    <section className="mx-auto w-full min-w-0 max-w-261.25 pb-8 text-[#263238]">
      <div className="w-full min-w-0 max-w-244.25 space-y-5">
        <button
          type="button"
          onClick={() => router.push('/dashboard/admin/weekly-plans')}
          className="flex items-center gap-1.5 font-manrope text-sm font-medium leading-5 text-[#607d8b] transition-colors hover:text-[#2f7d7e]"
        >
          <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.5} />
          Back to Weekly Plans
        </button>

        <h1 className="font-nunito text-2xl font-bold leading-9 text-[#263238]">
          Create Weekly Plans
        </h1>

        <section className="overflow-x-auto rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)]">
          <WeeklyPlanFormStepper currentStep={1} />
        </section>

        <DynamicForm
          defaultValues={{
            title: formStore.title || '',
            description: formStore.description || '',
            minAgeMonths: Number(formStore.minAgeMonths || 0),
            maxAgeMonths: Number(formStore.maxAgeMonths || 36),
            category: formStore.category || 'Sensory Play',
            customCategory: formStore.customCategory || '',
            weekNumber: formStore.weekNumber || '1',
          }}
          fields={[]}
          onSubmit={saveBasicInfo}
          schema={basicInfoSchema}
        >
          {(form) => {
            const watchedCategory = form.watch('category');

            return (
              <>
                <section className="rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:p-6 2xl:p-6">
                  <h2 className="font-nunito text-lg font-bold leading-7 text-[#263238]">
                    1. Basic Info
                  </h2>

                  <div className="mt-5 space-y-4">
                    <label className="block">
                      <FormLabel required>Plan Title</FormLabel>
                      <input
                        placeholder="e.g. Sensory Foundations"
                        {...form.register('title')}
                        className={`mt-1.5 ${inputClassName}`}
                      />
                      {form.formState.errors.title ? (
                        <span className="mt-1 block font-manrope text-xs text-[#e57373]">
                          {form.formState.errors.title.message}
                        </span>
                      ) : null}
                    </label>

                    <label className="block">
                      <FormLabel>Plan Description</FormLabel>
                      <textarea
                        rows={3}
                        placeholder="Enter a brief overview of this weekly plan and its developmental focus..."
                        {...form.register('description')}
                        className="mt-1.5 w-full rounded-xl border border-[#e7eceb] bg-[#f4f8f6] p-3.75 font-manrope text-sm leading-5.25 text-[#263238] outline-none placeholder:text-[#607d8b] focus:border-[#2f7d7e]"
                      />
                    </label>

                    <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-2">
                      <label className="block">
                        <FormLabel required>Starting Age (Months)</FormLabel>
                        <input
                          {...form.register('minAgeMonths')}
                          type="number"
                          min="0"
                          className={`mt-1.5 ${inputClassName}`}
                        />
                        {form.formState.errors.minAgeMonths ? (
                          <span className="mt-1 block font-manrope text-xs text-[#e57373]">
                            {form.formState.errors.minAgeMonths.message}
                          </span>
                        ) : null}
                      </label>

                      <label className="block">
                        <FormLabel required>Ending Age (Months)</FormLabel>
                        <input
                          {...form.register('maxAgeMonths')}
                          type="number"
                          min="0"
                          className={`mt-1.5 ${inputClassName}`}
                        />
                        {form.formState.errors.maxAgeMonths ? (
                          <span className="mt-1 block font-manrope text-xs text-[#e57373]">
                            {form.formState.errors.maxAgeMonths.message}
                          </span>
                        ) : null}
                      </label>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-2">
                      <label className="block">
                        <FormLabel required>Development Category</FormLabel>
                        <div className="mt-1.5">
                          <Controller
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                              <WeeklyPlanFormSelect
                                ariaLabel="Development Category"
                                value={field.value}
                                onChange={field.onChange}
                                options={CATEGORY_OPTIONS.map((opt) => ({
                                  label: opt.label,
                                  value: opt.value,
                                }))}
                              />
                            )}
                          />
                        </div>
                      </label>

                      {watchedCategory === 'Other' ? (
                        <label className="block">
                          <FormLabel required>Custom Development Category</FormLabel>
                          <input
                            placeholder="Type custom category..."
                            {...form.register('customCategory')}
                            className={`mt-1.5 ${inputClassName}`}
                          />
                          {form.formState.errors.customCategory ? (
                            <span className="mt-1 block font-manrope text-xs text-[#e57373]">
                              {form.formState.errors.customCategory.message}
                            </span>
                          ) : null}
                        </label>
                      ) : null}

                      <label className="block">
                        <FormLabel>Week Number</FormLabel>
                        <input
                          {...form.register('weekNumber')}
                          type="number"
                          min="1"
                          className={`mt-1.5 ${inputClassName}`}
                        />
                        <span className="mt-1 block font-manrope text-xs leading-4.5 text-[#607d8b]">
                          Optional — for sequenced curricula
                        </span>
                      </label>
                    </div>

                    <label className="block">
                      <FormLabel>Featured Image</FormLabel>
                      <span className="mt-1.5 flex h-13.5 min-w-0 cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-[#e7eceb] px-4.5 font-manrope text-[13px] leading-[19.5px] text-[#607d8b] transition-colors hover:bg-[#f8fbfa]">
                        {isUploading ? (
                          <Loader2
                            aria-hidden="true"
                            className="size-4 animate-spin text-[#2f7d7e]"
                          />
                        ) : (
                          <ImageUp
                            aria-hidden="true"
                            className="shrink-0"
                            size={18}
                            strokeWidth={1.6}
                          />
                        )}
                        <span className="truncate">
                          {isUploading
                            ? 'Uploading image...'
                            : featuredImageName || 'Click to upload (optional)'}
                        </span>
                        <input
                          accept="image/png,image/jpeg,image/webp"
                          className="sr-only"
                          type="file"
                          disabled={isUploading}
                          onChange={handleImageChange}
                        />
                      </span>
                    </label>
                  </div>
                </section>

                <section className="flex items-center justify-end rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:p-5 2xl:p-5">
                  <button
                    type="submit"
                    className="flex h-10.5 items-center justify-center rounded-[14px] bg-[#2f7d7e] px-6 font-manrope text-sm font-semibold leading-5 text-white transition-colors hover:bg-[#266b6c]"
                  >
                    Next →
                  </button>
                </section>
              </>
            );
          }}
        </DynamicForm>
      </div>
    </section>
  );
}
