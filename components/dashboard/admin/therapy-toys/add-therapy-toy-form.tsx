'use client';

import { DynamicForm } from '@/components/ui/dynamic-form';
import { ChevronDown, Upload, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { z } from 'zod';

const therapyToySchema = z.object({
  toyName: z.string().trim().min(1, 'Please enter a toy name.'),
  description: z.string(),
  developmentArea: z.string().min(1, 'Please select a development area.'),
  price: z.string().trim().min(1, 'Please enter a price.'),
  minAge: z.string().trim().min(1, 'Please enter a minimum age.'),
  maxAge: z.string().trim().min(1, 'Please enter a maximum age.'),
  productImages: z.array(z.unknown()).default([]),
  supportingImages: z.array(z.unknown()).default([]),
  affiliateLink: z.url('Please enter a valid affiliate link.'),
});

type TherapyToyFormValues = z.infer<typeof therapyToySchema>;

const fieldLabelClassName =
  'block h-[26px] pb-1.5 font-nunito text-sm font-medium leading-5 tracking-[-0.084px] text-[#263238]';

const inputClassName =
  'h-[42px] w-full rounded-[20px] border border-[#ece8e2] bg-[#fcfaf7] px-[13px] py-[11px] font-nunito text-sm font-medium leading-5 text-[#171e22] outline-none transition-colors placeholder:text-[#a8adaf] focus:border-[#2f7d7e]';

const uploadHint = 'Primary product shot + supplementary angles or in-use photos';

export function AddTherapyToyForm() {
  const router = useRouter();

  function addToy(data: TherapyToyFormValues) {
    toast.success(`“${data.toyName}” has been added to Therapy Toys.`);
    router.push('/dashboard/admin/therapy-toys');
  }

  function saveAsDraft() {
    toast.success('Therapy toy saved as a draft.');
    router.push('/dashboard/admin/therapy-toys');
  }

  return (
    <section className="mx-auto flex w-full max-w-366.25 flex-col items-center gap-10.5 pb-8 text-[#263238]">
      <nav aria-label="Breadcrumb" className="flex w-full max-w-211.25 items-center gap-1.5">
        <Link
          href="/dashboard/admin/therapy-toys"
          className="font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#2f7d7e]"
        >
          Therapy Toys
        </Link>
        <span
          aria-hidden="true"
          className="font-manrope text-lg leading-6.75 tracking-[-0.27px] text-[#d8ddd9]"
        >
          /
        </span>
        <span className="font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#263238]">
          Add new Toy
        </span>
      </nav>

      <div className="h-auto w-full max-w-366.25 overflow-hidden rounded-3xl drop-shadow-[0px_25px_28.45px_rgba(0,0,0,0.12)] lg:h-250.75">
        <div className="mx-auto w-full max-w-211.25 rounded-3xl bg-white lg:h-250.75">
          <header className="flex h-20.25 items-center justify-between border-b border-[#ece8e2] px-6 pb-6.25 pt-6">
            <h1 className="font-nunito text-lg font-bold leading-7 text-[#3d3d3d]">
              Add Therapy Toy
            </h1>
            <Link
              href="/dashboard/admin/therapy-toys"
              aria-label="Close add therapy toy form"
              className="inline-flex size-8 items-center justify-center rounded-[20px] text-[#6b6b6b] transition-colors hover:bg-[#fcfaf7]"
            >
              <X aria-hidden="true" size={16} strokeWidth={1.75} />
            </Link>
          </header>

          <DynamicForm
            defaultValues={{
              toyName: 'Lacing Cards Challenge Set',
              description: '',
              developmentArea: 'Fine Motor',
              price: '$24.99',
              minAge: '3',
              maxAge: '4',
              productImages: [],
              supportingImages: [],
              affiliateLink: 'https://www.fatbraintoys.com/',
            }}
            fields={[]}
            onSubmit={addToy}
            schema={therapyToySchema}
          >
            {(form) => {
              const productImages = form.watch('productImages') as File[];
              const supportingImages = form.watch('supportingImages') as File[];

              return (
                <div className="p-6">
                  <label className="block">
                    <span className={fieldLabelClassName}>Toy Name</span>
                    <input {...form.register('toyName')} className={inputClassName} />
                    {form.formState.errors.toyName && (
                      <span className="mt-1 block font-manrope text-xs text-[#b24b4b]">
                        {form.formState.errors.toyName.message}
                      </span>
                    )}
                  </label>

                  <label className="mt-4 block">
                    <span className={fieldLabelClassName}>Description/ Why we love it</span>
                    <textarea
                      {...form.register('description')}
                      className="h-23.25 w-full resize-none rounded-[20px] border border-[#ece8e2] bg-[#fcfaf7] px-3.25 py-2.75 font-nunito text-sm font-medium leading-5 text-[#171e22] outline-none transition-colors placeholder:text-[#a8adaf] focus:border-[#2f7d7e]"
                      placeholder="Why we love it"
                    />
                  </label>

                  <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-5">
                    <label className="block">
                      <span className={fieldLabelClassName}>Development Area</span>
                      <span className="relative block">
                        <select
                          {...form.register('developmentArea')}
                          className="h-10.75 w-full appearance-none rounded-[20px] border border-[#ece8e2] bg-[#fcfaf7] px-2.75 pr-10 font-nunito text-xs font-medium leading-4 text-[#263238] outline-none transition-colors focus:border-[#2f7d7e]"
                        >
                          <option>Fine Motor</option>
                          <option>Gross Motor</option>
                          <option>Sensory</option>
                          <option>Language &amp; Communication</option>
                          <option>Social &amp; Emotional</option>
                        </select>
                        <ChevronDown
                          aria-hidden="true"
                          className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-black"
                          strokeWidth={2.5}
                        />
                      </span>
                      {form.formState.errors.developmentArea && (
                        <span className="mt-1 block font-manrope text-xs text-[#b24b4b]">
                          {form.formState.errors.developmentArea.message}
                        </span>
                      )}
                    </label>

                    <label className="block">
                      <span className={fieldLabelClassName}>Price</span>
                      <input {...form.register('price')} className={inputClassName} />
                      {form.formState.errors.price && (
                        <span className="mt-1 block font-manrope text-xs text-[#b24b4b]">
                          {form.formState.errors.price.message}
                        </span>
                      )}
                    </label>
                  </div>

                  <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-5">
                    <label className="block">
                      <span className={fieldLabelClassName}>Min Age</span>
                      <input
                        {...form.register('minAge')}
                        className={inputClassName}
                        inputMode="numeric"
                      />
                      {form.formState.errors.minAge && (
                        <span className="mt-1 block font-manrope text-xs text-[#b24b4b]">
                          {form.formState.errors.minAge.message}
                        </span>
                      )}
                    </label>

                    <label className="block">
                      <span className={fieldLabelClassName}>Max Age</span>
                      <input
                        {...form.register('maxAge')}
                        className={inputClassName}
                        inputMode="numeric"
                      />
                      {form.formState.errors.maxAge && (
                        <span className="mt-1 block font-manrope text-xs text-[#b24b4b]">
                          {form.formState.errors.maxAge.message}
                        </span>
                      )}
                    </label>
                  </div>

                  <fieldset className="mt-4 pt-0">
                    <legend className="mb-1.5 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#263238]">
                      Product Images
                    </legend>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      {[0, 1, 2].map((index) => (
                        <label
                          key={index}
                          className="flex h-22.5 cursor-pointer flex-col items-center justify-center gap-2 rounded-[14px] border-2 border-dashed border-[#e7eceb] p-5.5 font-manrope text-xs leading-4.5 text-[#607d8b] transition-colors hover:bg-[#fcfaf7]"
                        >
                          <Upload aria-hidden="true" size={20} strokeWidth={1.8} />
                          <span className="max-w-full truncate">
                            {productImages[index]?.name || 'Upload File'}
                          </span>
                          <input
                            accept="image/png,image/jpeg,image/webp"
                            className="sr-only"
                            type="file"
                            onChange={(event) => {
                              const file = event.target.files?.[0];
                              if (!file) return;
                              const nextImages = [...productImages];
                              nextImages[index] = file;
                              form.setValue('productImages', nextImages, { shouldDirty: true });
                            }}
                          />
                        </label>
                      ))}
                    </div>
                    <p className="mt-1.5 font-manrope text-xs leading-4.5 text-[#607d8b]">
                      {uploadHint}
                    </p>
                  </fieldset>

                  <fieldset className="mt-4">
                    <legend className="mb-1.5 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#263238]">
                      Product Images
                    </legend>
                    <label className="flex h-31.5 cursor-pointer flex-col items-center justify-center gap-2 rounded-[14px] border-2 border-dashed border-[#e7eceb] p-5.5 font-manrope text-xs leading-4.5 text-[#607d8b] transition-colors hover:bg-[#fcfaf7]">
                      <Upload aria-hidden="true" size={24} strokeWidth={1.8} />
                      <span className="max-w-full truncate">
                        {supportingImages[0]?.name || 'Upload File'}
                      </span>
                      <input
                        accept="image/png,image/jpeg,image/webp"
                        className="sr-only"
                        type="file"
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          if (file)
                            form.setValue('supportingImages', [file], { shouldDirty: true });
                        }}
                      />
                    </label>
                    <p className="mt-1.5 font-manrope text-xs leading-4.5 text-[#607d8b]">
                      {uploadHint}
                    </p>
                  </fieldset>

                  <label className="mt-4 block">
                    <span className={fieldLabelClassName}>Affiliate Link</span>
                    <input
                      {...form.register('affiliateLink')}
                      className={inputClassName}
                      type="url"
                    />
                    {form.formState.errors.affiliateLink && (
                      <span className="mt-1 block font-manrope text-xs text-[#b24b4b]">
                        {form.formState.errors.affiliateLink.message}
                      </span>
                    )}
                  </label>

                  <div className="flex h-16.5 items-start gap-3 pt-6">
                    <button
                      type="submit"
                      className="h-10.5 rounded-[20px] bg-[#2f7d7e] px-4 py-2.5 font-nunito text-sm font-semibold leading-5 text-[#fffdf8] transition-colors hover:bg-[#266b6c]"
                    >
                      Add Toy
                    </button>
                    <button
                      type="button"
                      onClick={saveAsDraft}
                      className="h-10.5 rounded-[20px] border border-[#ece8e2] bg-white px-4.25 py-2.75 font-nunito text-sm font-medium leading-5 tracking-[-0.084px] text-[#263238] transition-colors hover:bg-[#fcfaf7]"
                    >
                      Save as Draft
                    </button>
                  </div>
                </div>
              );
            }}
          </DynamicForm>
        </div>
      </div>
    </section>
  );
}
