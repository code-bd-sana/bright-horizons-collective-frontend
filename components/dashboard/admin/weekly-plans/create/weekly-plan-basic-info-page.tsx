'use client';

import { DynamicForm } from '@/components/ui/dynamic-form';
import { ArrowLeft, ImageUp, TriangleAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Controller } from 'react-hook-form';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { WeeklyPlanFormSelect } from './weekly-plan-form-select';
import { WeeklyPlanFormStepper } from './weekly-plan-form-stepper';

const basicInfoSchema = z.object({
  title: z.string().trim().min(1, 'Please enter a plan title.'),
  ageGroup: z.string(),
  category: z.string(),
  weekNumber: z.string(),
  featuredImage: z.unknown().optional(),
});

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

function FooterButton({
  children,
  className,
  ...props
}: React.ComponentProps<'button'> & { className?: string }) {
  return (
    <button
      type="button"
      className={`rounded-[14px] border px-4.25 py-2.75 font-manrope text-sm font-semibold leading-5 transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function WeeklyPlanBasicInfoPage() {
  const router = useRouter();
  const [featuredImageName, setFeaturedImageName] = useState('');

  function saveBasicInfo(data: BasicInfoValues) {
    toast.success(`Basic information for “${data.title}” has been saved.`);
  }

  return (
    <section className="mx-auto w-full max-w-261.25 pb-8 text-[#263238]">
      <div className="w-full max-w-244.25 space-y-5">
        <button
          type="button"
          onClick={() => router.push('/dashboard/admin/weekly-plans')}
          className="flex items-center gap-1.5 font-manrope text-sm font-medium leading-5 text-[#607d8b]"
        >
          <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.5} />
          Back to Weekly Plans
        </button>

        <h1 className="font-nunito text-2xl font-bold leading-9 text-[#263238]">
          Create Weekly Plans
        </h1>

        <section className="overflow-x-auto rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)]">
          <WeeklyPlanFormStepper />
        </section>

        <DynamicForm
          defaultValues={{
            title: 'Sensory Foundations',
            ageGroup: '',
            category: '',
            weekNumber: '1',
            featuredImage: undefined,
          }}
          fields={[]}
          onSubmit={saveBasicInfo}
          schema={basicInfoSchema}
        >
          {(form) => (
            <>
              <section className="rounded-2xl border border-[#e7eceb] bg-white p-6 shadow-[0_4px_6px_rgba(0,0,0,0.06)]">
                <h2 className="font-nunito text-lg font-bold leading-7 text-[#263238]">
                  1. Basic Info
                </h2>

                <div className="mt-5 space-y-3">
                  <label className="block">
                    <FormLabel required>Plan Title</FormLabel>
                    <input {...form.register('title')} className={`mt-1.5 ${inputClassName}`} />
                    {form.formState.errors.title ? (
                      <span className="mt-1 block font-manrope text-xs text-[#e57373]">
                        {form.formState.errors.title.message}
                      </span>
                    ) : null}
                  </label>

                  <div className="grid gap-5 md:grid-cols-2">
                    <label className="block">
                      <FormLabel>Age Group</FormLabel>
                      <div className="mt-1.5">
                        <Controller
                          control={form.control}
                          name="ageGroup"
                          render={({ field }) => (
                            <WeeklyPlanFormSelect
                              ariaLabel="Age Group"
                              value={field.value}
                              onChange={field.onChange}
                              options={[
                                { label: '0–12 months', value: '0–12 months' },
                                { label: '1–2 years', value: '1–2 years' },
                                { label: '2–3 years', value: '2–3 years' },
                                { label: '3–5 years', value: '3–5 years' },
                                { label: '5–7 years', value: '5–7 years' },
                              ]}
                            />
                          )}
                        />
                      </div>
                    </label>

                    <label className="block">
                      <FormLabel>Development Category</FormLabel>
                      <div className="mt-1.5">
                        <Controller
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <WeeklyPlanFormSelect
                              ariaLabel="Development Category"
                              value={field.value}
                              onChange={field.onChange}
                              options={[
                                { label: 'Sensory Play', value: 'Sensory Play' },
                                { label: 'Fine Motor', value: 'Fine Motor' },
                                { label: 'Gross Motor', value: 'Gross Motor' },
                                { label: 'Communication', value: 'Communication' },
                                { label: 'Regulation', value: 'Regulation' },
                              ]}
                            />
                          )}
                        />
                      </div>
                    </label>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
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

                    <label className="block">
                      <FormLabel>Featured Image</FormLabel>
                      <span className="mt-1.5 flex h-13.5 cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-[#e7eceb] px-4.5 font-manrope text-[13px] leading-[19.5px] text-[#607d8b] transition-colors hover:bg-[#f8fbfa]">
                        <ImageUp aria-hidden="true" size={18} strokeWidth={1.6} />
                        {featuredImageName || 'Click to upload (optional)'}
                        <input
                          accept="image/png,image/jpeg,image/webp"
                          className="sr-only"
                          type="file"
                          onChange={(event) => {
                            const file = event.target.files?.[0];
                            form.setValue('featuredImage', file);
                            setFeaturedImageName(file?.name ?? '');
                          }}
                        />
                      </span>
                    </label>
                  </div>
                </div>
              </section>

              <section className="flex flex-col gap-4 rounded-2xl border border-[#e7eceb] bg-white p-5 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:flex-row sm:items-center sm:justify-between">
                <div className="flex gap-2">
                  <FooterButton disabled className="border-[#e7eceb] text-[#607d8b] opacity-40">
                    ← Previous
                  </FooterButton>
                  <button
                    type="submit"
                    className="rounded-[14px] border border-[#2f7d7e] px-4.25 py-2.75 font-manrope text-sm font-semibold leading-5 text-[#2f7d7e]"
                  >
                    Next →
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <FooterButton
                    onClick={() => toast.success('Weekly plan saved as a draft.')}
                    className="border-[#e7eceb] text-[#607d8b]"
                  >
                    Save as Draft
                  </FooterButton>
                  <FooterButton
                    onClick={() => toast.success('Plan preview is ready.')}
                    className="border-[#e7eceb] text-[#607d8b]"
                  >
                    Preview
                  </FooterButton>
                  <FooterButton
                    onClick={() => toast.success('Weekly plan changes saved.')}
                    className="border-[#2f7d7e] bg-[#2f7d7e] text-white"
                  >
                    Save Changes
                  </FooterButton>
                </div>
              </section>
            </>
          )}
        </DynamicForm>

        <div className="flex items-center gap-2 rounded-[14px] border border-[rgba(246,195,68,0.25)] bg-[#fff8e1] px-4.25 py-3.25 font-manrope text-[13px] leading-[19.5px] text-[#b8860b]">
          <TriangleAlert aria-hidden="true" size={15} strokeWidth={1.7} />
          You have unsaved changes. Navigating away will discard them.
        </div>
      </div>
    </section>
  );
}
