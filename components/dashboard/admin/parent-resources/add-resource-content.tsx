'use client';

import { useResourceFormStore, useSaveResourceDraft } from '@/features/parent-resources';
import { DynamicForm } from '@/components/ui/dynamic-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { z } from 'zod';
import { ResourceFormNavigation } from './resource-form-navigation';
import { ResourceFormStepper } from './resource-form-stepper';

const contentSchema = z.object({
  content: z.string().trim().min(1, 'Please add the resource content.'),
});

type ContentValues = z.infer<typeof contentSchema>;

export function AddResourceContent() {
  const router = useRouter();
  const { content, setContent, editingResourceId } = useResourceFormStore();
  const { saveDraft, isSavingDraft } = useSaveResourceDraft();

  function saveContent(data: ContentValues) {
    setContent(data.content);
    toast.success('Resource content saved.');
    router.push('/dashboard/admin/parent-resources/add-resource/attachments');
  }

  return (
    <section className="mx-auto w-full min-w-0 max-w-231.5 pb-8 pt-6 text-[#263238] lg:pt-0 2xl:pt-0">
      <Link
        href="/dashboard/admin/parent-resources"
        className="inline-flex items-center gap-1.5 font-manrope text-sm font-medium leading-5 text-[#607d8b]"
      >
        <span aria-hidden="true">←</span>
        Back to Parent Resources
      </Link>

      <h1 className="mt-5 font-nunito text-2xl font-bold leading-9">
        {editingResourceId ? 'Edit Resource' : 'Create Resource'}
      </h1>

      <div className="mt-5 overflow-x-auto rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
        <ResourceFormStepper currentStep={2} />
      </div>

      <DynamicForm
        defaultValues={{ content: content || '' }}
        fields={[]}
        onSubmit={saveContent}
        schema={contentSchema}
      >
        {(form) => (
          <>
            <section className="mt-5 rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:p-5 2xl:p-6.25">
              <h2 className="font-nunito text-lg font-bold leading-6.75">2. Content</h2>

              <div className="mt-5 space-y-4">
                <p className="max-w-179.5 font-manrope text-sm leading-5.25 text-[#607d8b]">
                  Write the full content of this resource.
                </p>

                <label className="block">
                  <span className="sr-only">Resource content</span>
                  <textarea
                    {...form.register('content')}
                    className="h-80 w-full resize-y rounded-xl border border-[#e7eceb] bg-[#f4f8f6] px-3.75 py-2.75 font-manrope text-sm leading-5.95 text-[#263238] outline-none placeholder:text-[rgba(38,50,56,0.5)] focus:border-[#2f7d7e]"
                    placeholder="Write the full content of this resource here..."
                  />
                  {form.formState.errors.content && (
                    <span className="mt-1 block font-manrope text-xs text-[#b24b4b]">
                      {form.formState.errors.content.message}
                    </span>
                  )}
                </label>
              </div>
            </section>

            <ResourceFormNavigation
              currentStep={2}
              nextButtonType="submit"
              isSavingDraft={isSavingDraft}
              showPrimaryAction={false}
              onPrevious={() => {
                const currentContent = form.getValues('content');
                setContent(currentContent);
                router.push('/dashboard/admin/parent-resources/add-resource');
              }}
              onSaveDraft={async () => {
                const currentContent = form.getValues('content');
                setContent(currentContent);
                await saveDraft({ content: currentContent });
              }}
            />
          </>
        )}
      </DynamicForm>
    </section>
  );
}
