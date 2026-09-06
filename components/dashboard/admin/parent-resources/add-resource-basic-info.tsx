'use client';

import { DynamicForm } from '@/components/ui/dynamic-form';
import { ChevronDown, FileText, ImageUp } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { ResourceFormNavigation } from './resource-form-navigation';
import { ResourceFormStepper } from './resource-form-stepper';

const resourceTypes = ['Article', 'PDF', 'Printable', 'Checklist', 'Guide'] as const;

const basicInfoSchema = z.object({
  title: z.string().trim().min(1, 'Please enter a resource title.'),
  summary: z.string().trim().min(1, 'Please enter a summary.'),
  category: z.string().min(1, 'Please select a category.'),
  resourceType: z.enum(resourceTypes, { message: 'Please select a resource type.' }),
  author: z.string().trim().min(1, 'Please enter an author.'),
  readingTime: z.string().trim().min(1, 'Please enter an estimated reading time.'),
  coverImage: z.unknown().optional(),
});

type BasicInfoValues = z.infer<typeof basicInfoSchema>;

const inputClassName =
  'h-10.75 w-full rounded-[14px] border border-[#d9e1e0] bg-white px-3.75 font-manrope text-sm leading-5.25 text-[#263238] shadow-[0_1px_2px_rgba(16,24,40,0.05)] outline-none placeholder:text-[#9aa8ae] focus:border-[#2f7d7e]';

export function AddResourceBasicInfo() {
  const [coverImageName, setCoverImageName] = useState('');
  const router = useRouter();

  function saveBasicInfo(data: BasicInfoValues) {
    toast.success(`Basic information for “${data.title}” has been saved.`);
    router.push('/dashboard/admin/parent-resources/add-resource/content');
  }

  return (
    <section className="mx-auto w-full max-w-231.5 pb-8 pt-6 text-[#263238] lg:pt-0">
      <Link
        href="/dashboard/admin/parent-resources"
        className="inline-flex items-center gap-1.5 font-manrope text-sm font-medium leading-5 text-[#607d8b]"
      >
        <span aria-hidden="true">←</span>
        Back to Parent Resources
      </Link>

      <h1 className="mt-5 font-nunito text-2xl font-bold leading-9">Create Resource</h1>

      <div className="mt-5 overflow-x-auto rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
        <ResourceFormStepper currentStep={1} />
      </div>

      <DynamicForm
        defaultValues={{
          title: '',
          summary: '',
          category: '',
          resourceType: 'Article',
          author: 'Sarah K.',
          readingTime: '',
          coverImage: undefined,
        }}
        fields={[]}
        onSubmit={saveBasicInfo}
        schema={basicInfoSchema}
      >
        {(form) => (
          <>
            <section className="mt-5 rounded-2xl border border-[#e7eceb] bg-white p-5 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:p-6.25">
              <h2 className="font-nunito text-xl font-bold leading-6.75">1. Basic Info</h2>

              <div className="mt-5 space-y-5">
                <label className="block max-w-179.5">
                  <span className="font-manrope text-sm font-semibold leading-5 text-[#263238]">
                    Resource Title *
                  </span>
                  <input
                    {...form.register('title')}
                    className={`mt-1.5 ${inputClassName}`}
                    placeholder="e.g. Understanding Sensory Processing in Young Children"
                  />
                  {form.formState.errors.title && (
                    <span className="mt-1 block font-manrope text-xs text-[#b24b4b]">
                      {form.formState.errors.title.message}
                    </span>
                  )}
                </label>

                <label className="block max-w-179.5">
                  <span className="font-manrope text-sm font-semibold leading-5 text-[#263238]">
                    Summary *
                  </span>
                  <textarea
                    {...form.register('summary')}
                    className="mt-1.5 h-20 w-full resize-none rounded-[14px] border border-[#d9e1e0] bg-white px-3.75 py-2.75 font-manrope text-sm leading-5.25 text-[#263238] shadow-[0_1px_2px_rgba(16,24,40,0.05)] outline-none placeholder:text-[#9aa8ae] focus:border-[#2f7d7e]"
                    placeholder="Brief description of this resource..."
                  />
                  <span className="mt-1.5 block font-manrope text-xs leading-4.5 text-[#607d8b]">
                    Shown in the library and search results
                  </span>
                  {form.formState.errors.summary && (
                    <span className="mt-1 block font-manrope text-xs text-[#b24b4b]">
                      {form.formState.errors.summary.message}
                    </span>
                  )}
                </label>

                <div className="grid max-w-179.5 gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="font-manrope text-sm font-semibold leading-5">Category *</span>
                    <span className="relative mt-1.5 block">
                      <select
                        {...form.register('category')}
                        className={`${inputClassName} appearance-none pr-10`}
                      >
                        <option value="">Select category</option>
                        <option>Sensory Development</option>
                        <option>Fine Motor</option>
                        <option>Daily Living</option>
                        <option>Communication</option>
                        <option>Emotional Regulation</option>
                        <option>Gross Motor</option>
                        <option>Parent Education</option>
                      </select>
                      <ChevronDown
                        aria-hidden="true"
                        className="pointer-events-none absolute right-3 top-1/2 size-3.25 -translate-y-1/2 text-[#607d8b]"
                        strokeWidth={1.8}
                      />
                    </span>
                    {form.formState.errors.category && (
                      <span className="mt-1 block font-manrope text-xs text-[#b24b4b]">
                        {form.formState.errors.category.message}
                      </span>
                    )}
                  </label>

                  <fieldset>
                    <legend className="font-manrope text-sm font-semibold leading-5">
                      Resource Type *
                    </legend>
                    <div className="mt-1.5 grid grid-cols-3 gap-2">
                      {resourceTypes.map((type) => {
                        const selected = form.watch('resourceType') === type;
                        return (
                          <label
                            key={type}
                            className={`flex h-9.5 cursor-pointer items-center gap-1.5 rounded-[14px] border px-3 font-manrope text-sm leading-5 transition-colors ${selected ? 'border-[#2f7d7e] bg-[rgba(47,125,126,0.07)] text-[#2f7d7e]' : 'border-[#e7eceb] text-[#607d8b]'}`}
                          >
                            <FileText aria-hidden="true" size={14} strokeWidth={1.6} />
                            <span>{type}</span>
                            <input
                              className="sr-only"
                              type="radio"
                              value={type}
                              {...form.register('resourceType')}
                            />
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                </div>

                <div className="grid max-w-179.5 gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="font-manrope text-sm font-semibold leading-5">Author</span>
                    <input {...form.register('author')} className={`mt-1.5 ${inputClassName}`} />
                  </label>
                  <label className="block">
                    <span className="font-manrope text-sm font-semibold leading-5">
                      Estimated Reading Time
                    </span>
                    <input
                      {...form.register('readingTime')}
                      className={`mt-1.5 ${inputClassName}`}
                      placeholder="e.g. 8 min read"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="font-manrope text-sm font-semibold leading-5">Cover Image</span>
                  <span className="mt-1.5 flex h-14 cursor-pointer items-center gap-3 rounded-[14px] border border-dashed border-[#c8d3d1] px-4.5 font-manrope text-sm leading-5 text-[#607d8b] hover:bg-[#f8fbfa]">
                    <ImageUp aria-hidden="true" size={18} strokeWidth={1.7} />
                    {coverImageName || 'Click to upload cover image'}
                    <input
                      accept="image/png,image/jpeg,image/webp"
                      className="sr-only"
                      type="file"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        form.setValue('coverImage', file);
                        setCoverImageName(file?.name ?? '');
                      }}
                    />
                  </span>
                </label>
              </div>
            </section>

            <ResourceFormNavigation
              currentStep={1}
              nextButtonType="submit"
              saveChangesButtonType="submit"
            />
          </>
        )}
      </DynamicForm>
    </section>
  );
}
