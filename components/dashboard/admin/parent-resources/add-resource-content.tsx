'use client';

import { DynamicForm } from '@/components/ui/dynamic-form';
import Link from 'next/link';
import { toast } from 'sonner';
import { z } from 'zod';
import { ResourceFormStepper } from './resource-form-stepper';

const contentSchema = z.object({
  content: z.string().trim().min(1, 'Please add the resource content.'),
});

const toolbarActions = [
  'Bold',
  'Italic',
  'H2',
  'H3',
  '• List',
  '1. List',
  'Link',
  'Image',
  'Video',
  'Callout',
];

export function AddResourceContent() {
  function saveContent() {
    toast.success('Resource content has been saved.');
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
        <ResourceFormStepper currentStep={2} />
      </div>

      <DynamicForm
        defaultValues={{ content: '' }}
        fields={[]}
        onSubmit={saveContent}
        schema={contentSchema}
      >
        {(form) => (
          <>
            <section className="mt-5 rounded-2xl border border-[#e7eceb] bg-white p-5 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:p-6.25">
              <h2 className="font-nunito text-lg font-bold leading-6.75">2. Content</h2>

              <div className="mt-5 space-y-5">
                <p className="max-w-179.5 font-manrope text-sm leading-5.25 text-[#607d8b]">
                  Use the rich text editor to compose the full content of this resource. Formatting
                  toolbar appears above the editor.
                </p>

                <div className="rounded-[14px] border border-[#e7eceb] bg-[#f4f8f6] p-3">
                  <div className="flex flex-wrap gap-1.5">
                    {toolbarActions.map((action) => (
                      <button
                        key={action}
                        type="button"
                        onClick={() => toast.message(`${action} formatting is ready.`)}
                        className="rounded-[10px] border border-[#e7eceb] bg-white px-2.75 py-1.75 font-manrope text-xs font-semibold leading-4 text-[#607d8b] hover:bg-[#edf6f2] hover:text-[#2f7d7e]"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="block">
                  <span className="sr-only">Resource content</span>
                  <textarea
                    {...form.register('content')}
                    className="h-70 w-full resize-y rounded-xl border border-[#e7eceb] bg-[#f4f8f6] px-3.75 py-2.75 font-manrope text-sm leading-5.95 text-[#263238] outline-none placeholder:text-[rgba(38,50,56,0.5)] focus:border-[#2f7d7e]"
                    placeholder="Write the full content of this resource here. Use the toolbar above for formatting — headings, bullet lists, callout boxes, embedded videos, and hyperlinks are all supported."
                  />
                  {form.formState.errors.content && (
                    <span className="mt-1 block font-manrope text-xs text-[#b24b4b]">
                      {form.formState.errors.content.message}
                    </span>
                  )}
                </label>

                <aside className="rounded-[14px] border border-[rgba(47,125,126,0.13)] bg-[#edf6f2] p-3 font-manrope text-xs leading-4.5 text-[#2f7d7e]">
                  <strong>Callout box:</strong> Use this to highlight key information or safety
                  notes for parents. Wrap text in [callout] tags to render a teal highlight box in
                  the parent view.
                </aside>
              </div>
            </section>

            <footer className="mt-5 flex flex-col gap-4 rounded-2xl border border-[#e7eceb] bg-white p-5 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:flex-row sm:items-center sm:justify-between sm:p-5.25">
              <div className="flex gap-2">
                <Link
                  href="/dashboard/admin/parent-resources/add-resource"
                  className="flex h-10.5 items-center rounded-[14px] border border-[#e7eceb] px-4.25 font-manrope text-sm font-semibold leading-5 text-[#607d8b]"
                >
                  ← Previous
                </Link>
                <button
                  type="submit"
                  className="h-10.5 rounded-[14px] border border-[#2f7d7e] px-4.25 font-manrope text-sm font-semibold leading-5 text-[#2f7d7e]"
                >
                  Next →
                </button>
              </div>
              <div className="flex flex-wrap gap-2 sm:justify-end">
                <button
                  type="button"
                  className="h-10.5 rounded-[14px] border border-[#e7eceb] px-4.25 font-manrope text-sm font-semibold leading-5 text-[#607d8b]"
                >
                  Save as Draft
                </button>
                <button
                  type="button"
                  className="h-10.5 rounded-[14px] border border-[#e7eceb] px-4.25 font-manrope text-sm font-semibold leading-5 text-[#607d8b]"
                >
                  Preview
                </button>
                <button
                  type="submit"
                  className="h-10.5 rounded-[14px] bg-[#2f7d7e] px-5 font-manrope text-sm font-semibold leading-5 text-white"
                >
                  Save Changes
                </button>
              </div>
            </footer>
          </>
        )}
      </DynamicForm>
    </section>
  );
}
