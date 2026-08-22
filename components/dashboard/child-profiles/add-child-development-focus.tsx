'use client';

import { DynamicForm } from '@/components/ui/dynamic-form';
import { AddChildStepper } from './add-child-stepper';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { toast } from 'sonner';

const developmentFocusSchema = z.object({
  areasOfSupport: z.array(z.string()).min(1, 'Choose at least one area of support.'),
  notes: z.string().optional(),
});

type DevelopmentFocusValues = z.infer<typeof developmentFocusSchema>;

const supportAreas = [
  'Gross Motor',
  'Fine Motor',
  'Language',
  'Social-Emotional',
  'Sensory',
  'Cognitive',
  'Sleep Routines',
  'Focus & Attention',
];

export function AddChildDevelopmentFocus() {
  const router = useRouter();

  function submitDevelopmentFocus(data: DevelopmentFocusValues) {
    toast.success(`${data.areasOfSupport.length} development areas have been saved.`);
    router.push('/dashboard/child-profiles/add-child/interests-preferences');
  }

  return (
    <section className="mx-auto w-full max-w-212.75 pb-8 pt-6.5 text-[#263238]">
      <AddChildStepper currentStep={3} />

      <DynamicForm
        defaultValues={{
          areasOfSupport: ['Fine Motor', 'Focus & Attention'],
          notes:
            'Maya responds wonderfully to music during play routines. Enjoys bright colors and tactile textures.',
        }}
        fields={[]}
        onSubmit={submitDevelopmentFocus}
        schema={developmentFocusSchema}
      >
        {(form) => {
          const selectedAreas = form.watch('areasOfSupport');

          function toggleArea(area: string) {
            form.setValue(
              'areasOfSupport',
              selectedAreas.includes(area)
                ? selectedAreas.filter((selectedArea) => selectedArea !== area)
                : [...selectedAreas, area],
              { shouldValidate: true }
            );
          }

          return (
            <>
              <section className="mt-14 rounded-2xl border border-[#eff1ef] bg-white p-8">
                <h1 className="font-nunito text-2xl font-semibold leading-8 text-[#263238]">
                  Development &amp; Focus
                </h1>

                <div className="mt-8 space-y-8">
                  <fieldset className="flex flex-col gap-4">
                    <legend className="font-manrope text-lg font-medium leading-6.75 tracking-[-0.27px]">
                      Areas of Support
                    </legend>
                    <div className="flex flex-wrap gap-4">
                      {supportAreas.map((area) => {
                        const selected = selectedAreas.includes(area);

                        return (
                          <button
                            aria-pressed={selected}
                            className={`rounded-full border px-2.25 py-1.75 font-nunito text-base font-medium leading-6 tracking-[-0.176px] transition-colors ${selected ? 'border-[#fce9e3] bg-[#f2b59f] text-[#515b60]' : 'border-[#d4d6d7] bg-white text-[#7d8488]'}`}
                            key={area}
                            onClick={() => toggleArea(area)}
                            type="button"
                          >
                            {area}
                          </button>
                        );
                      })}
                    </div>
                    <p className="font-manrope text-base leading-6 tracking-[-0.176px] text-[#7d8488]">
                      Select the developmental areas you&apos;d like to focus on right now.
                    </p>
                    {form.formState.errors.areasOfSupport && (
                      <span className="font-manrope text-xs text-[#b24b4b]">
                        {form.formState.errors.areasOfSupport.message}
                      </span>
                    )}
                  </fieldset>

                  <label className="flex flex-col gap-4">
                    <span className="font-manrope text-lg font-medium leading-6.75 tracking-[-0.27px]">
                      Specific Goals or Notes (Optional)
                    </span>
                    <textarea
                      className="h-37.5 w-full resize-none rounded-[24px] border border-[#d8ddd9] bg-white p-4 font-manrope text-base leading-6 tracking-[-0.176px] text-[#515b60] shadow-[0_1px_2px_rgba(16,24,40,0.05)] outline-none placeholder:text-[#a8adaf] focus:border-[#2f7d7e]"
                      {...form.register('notes')}
                    />
                  </label>
                </div>
              </section>

              <div className="mt-14 flex flex-wrap gap-4">
                <button
                  className="h-14 rounded-[32px] border border-[#d5e5e5] bg-[#2f7d7e] px-4 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-white"
                  type="submit"
                >
                  Continue to Interests &amp; Preferences
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
