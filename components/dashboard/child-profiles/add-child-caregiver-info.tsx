'use client';

import { DynamicForm } from '@/components/ui/dynamic-form';
import { AddChildStepper } from './add-child-stepper';
import { AddChildSelect } from './add-child-select';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
const countryOptions = [{ label: 'US', value: 'US' }];
const inputClassName =
  'h-11 w-full rounded-full border border-[#d8ddd9] bg-white px-4 py-2.5 font-manrope text-base leading-6 tracking-[-0.176px] text-[#515b60] shadow-[0_1px_2px_rgba(16,24,40,0.05)] outline-none focus:border-[#2f7d7e]';

export function AddChildCaregiverInfo() {
  const router = useRouter();

  function submitCaregiverInfo(data: CaregiverInfoValues) {
    toast.success(`${data.name}'s caregiver information has been saved.`);
    router.push('/dashboard/child-profiles/add-child/development-focus');
  }

  return (
    <section className="mx-auto w-full min-w-0 max-w-212.75 pb-8 pt-4 text-[#263238] sm:pt-6.5">
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
            <section className="mt-8 rounded-2xl border border-[#eff1ef] bg-white p-4 sm:mt-10 sm:p-6 2xl:mt-14 2xl:min-h-105.75 2xl:p-8">
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

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-2.5">
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
                  <div className="flex flex-col gap-1.5">
                    <span className="font-manrope text-lg font-medium leading-6.75 tracking-[-0.27px]">
                      Phone
                    </span>
                    <span className="flex min-h-11 items-stretch rounded-[14px] border border-[#e7eceb] bg-[#f4f8f6] shadow-[0_1px_2px_rgba(16,24,40,0.05)] focus-within:border-[#2f7d7e]">
                      <AddChildSelect
                        ariaLabel="Country code"
                        name="country"
                        onValueChange={(value) =>
                          form.setValue('country', value, {
                            shouldDirty: true,
                            shouldValidate: true,
                          })
                        }
                        options={countryOptions}
                        placeholder="Country"
                        triggerClassName="w-19 shrink-0 rounded-r-none border-0 border-r border-[#d8ddd9] bg-transparent px-3 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 data-popup-open:bg-[#d5e5e5]"
                        value={form.watch('country')}
                      />
                      <input
                        aria-label="Phone number"
                        className="min-w-0 flex-1 bg-transparent py-2.5 pl-3 pr-3.5 font-manrope text-base leading-6 tracking-[-0.176px] text-[#515b60] outline-none"
                        {...form.register('phone')}
                      />
                    </span>
                    {form.formState.errors.phone && (
                      <span className="font-manrope text-xs text-[#b24b4b]">
                        {form.formState.errors.phone.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </section>

            <div className="mt-8 flex flex-col gap-3 sm:mt-14 sm:flex-row sm:flex-wrap sm:gap-4">
              <button
                className="h-14 w-full rounded-full border border-[#d5e5e5] bg-[#2f7d7e] px-4 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-white sm:w-auto"
                type="submit"
              >
                Continue to Development &amp; Focus
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
