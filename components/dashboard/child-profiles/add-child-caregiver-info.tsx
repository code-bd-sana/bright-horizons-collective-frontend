'use client';

import { DynamicForm } from '@/components/ui/dynamic-form';
import { AddChildStepper } from './add-child-stepper';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { z } from 'zod';
import { toast } from 'sonner';

const caregiverInfoSchema = z.object({
  name: z.string().trim().min(1, 'Please enter a name.'),
  relationship: z.string().min(1, 'Choose a relationship.'),
  email: z.string().email('Enter a valid email address.'),
  country: z.string().min(1),
  phone: z.string().trim().min(1, 'Please enter a phone number.'),
});

type CaregiverInfoValues = z.infer<typeof caregiverInfoSchema>;

const relationships = ['Father', 'Mother', 'Caregiver', 'Grandparent', 'Foster parent', 'Other'];
const inputClassName =
  'h-11 w-full rounded-full border border-[#d8ddd9] bg-white px-4 py-2.5 font-manrope text-base leading-6 tracking-[-0.176px] text-[#515b60] shadow-[0_1px_2px_rgba(16,24,40,0.05)] outline-none focus:border-[#2f7d7e]';

export function AddChildCaregiverInfo() {
  function submitCaregiverInfo(data: CaregiverInfoValues) {
    toast.success(`${data.name}'s caregiver information has been saved.`);
  }

  return (
    <section className="mx-auto w-full max-w-212.75 pb-8 pt-6.5 text-[#263238]">
      <AddChildStepper currentStep={2} />

      <DynamicForm
        defaultValues={{
          name: 'Sarah',
          relationship: 'Mother',
          email: 'sarah@example.com',
          country: 'US',
          phone: '+1 (555) 000-0000',
        }}
        fields={[]}
        onSubmit={submitCaregiverInfo}
        schema={caregiverInfoSchema}
      >
        {(form) => (
          <>
            <section className="mt-14 min-h-105.75 rounded-2xl border border-[#eff1ef] bg-white p-8">
              <h1 className="font-nunito text-2xl font-semibold leading-8 text-[#263238]">
                Caregiver Information
              </h1>

              <div className="mt-8 space-y-8">
                <label className="flex flex-col gap-1.5">
                  <span className="font-manrope text-lg font-medium leading-6.75 tracking-[-0.27px]">
                    Name
                  </span>
                  <input className={inputClassName} {...form.register('name')} />
                  {form.formState.errors.name && (
                    <span className="font-manrope text-xs text-[#b24b4b]">
                      {form.formState.errors.name.message}
                    </span>
                  )}
                </label>

                <fieldset className="flex flex-col gap-3">
                  <legend className="font-manrope text-lg font-medium leading-6.75 tracking-[-0.27px]">
                    Relationship to the child
                  </legend>
                  <div className="flex flex-wrap gap-4">
                    {relationships.map((relationship) => {
                      const selected = form.watch('relationship') === relationship;

                      return (
                        <button
                          aria-pressed={selected}
                          className={`rounded-full border border-[#d4d6d7] px-2.25 py-1.75 font-nunito text-base font-medium leading-6 tracking-[-0.176px] transition-colors ${selected ? 'bg-[#f2b59f] text-[#515b60]' : 'bg-white text-[#7d8488]'}`}
                          key={relationship}
                          onClick={() => form.setValue('relationship', relationship)}
                          type="button"
                        >
                          {relationship}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="grid gap-2.5 md:grid-cols-2">
                  <label className="flex flex-col gap-1.5">
                    <span className="font-manrope text-lg font-medium leading-6.75 tracking-[-0.27px]">
                      Email
                    </span>
                    <input className={inputClassName} type="email" {...form.register('email')} />
                    {form.formState.errors.email && (
                      <span className="font-manrope text-xs text-[#b24b4b]">
                        {form.formState.errors.email.message}
                      </span>
                    )}
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="font-manrope text-lg font-medium leading-6.75 tracking-[-0.27px]">
                      Phone
                    </span>
                    <span className="flex h-11 items-center rounded-full border border-[#d8ddd9] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.05)] focus-within:border-[#2f7d7e]">
                      <span className="relative flex items-center">
                        <select
                          aria-label="Country code"
                          className="h-11 w-17.5 appearance-none bg-transparent pl-3.5 pr-6 font-inter text-base leading-6 text-[#263238] outline-none"
                          {...form.register('country')}
                        >
                          <option value="US">US</option>
                        </select>
                        <ChevronDown
                          aria-hidden="true"
                          className="pointer-events-none absolute right-1 size-5"
                          strokeWidth={1.5}
                        />
                      </span>
                      <input
                        className="min-w-0 flex-1 bg-transparent py-2.5 pr-3.5 font-manrope text-base leading-6 tracking-[-0.176px] text-[#515b60] outline-none"
                        {...form.register('phone')}
                      />
                    </span>
                    {form.formState.errors.phone && (
                      <span className="font-manrope text-xs text-[#b24b4b]">
                        {form.formState.errors.phone.message}
                      </span>
                    )}
                  </label>
                </div>
              </div>
            </section>

            <div className="mt-14 flex flex-wrap gap-4">
              <button
                className="h-14 rounded-[32px] border border-[#d5e5e5] bg-[#2f7d7e] px-4 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-white"
                type="submit"
              >
                Continue to Development &amp; Focus
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
