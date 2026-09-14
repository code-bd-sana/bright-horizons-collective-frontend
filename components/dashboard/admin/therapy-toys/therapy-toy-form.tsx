'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDown, Loader2, Upload, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { FormProvider, useForm, useFormContext, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import {
  useCreateTherapyToy,
  useDeleteTherapyToyImage,
  useUpdateTherapyToy,
  useUploadTherapyToyImage,
} from '@/features/therapy-toys/hooks/therapy-toys.mutations';
import type { TherapyToy, TherapyToyStatus } from '@/features/therapy-toys/model/therapy-toy.types';

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/webp'] as const;
const developmentAreas = ['Fine Motor', 'Gross Motor', 'Sensory', 'Visual Motor', 'Regulation'];
const imageFileSchema = z.custom<File>(
  (value) => typeof File !== 'undefined' && value instanceof File,
  'Please select an image file.'
);

const formSchema = z
  .object({
    name: z.string().trim().min(1, 'Please enter a toy name.').max(200),
    description: z.string().trim().min(1, 'Please enter a description.').max(5000),
    developmentArea: z.string().min(1, 'Please select a development area.'),
    customDevelopmentArea: z.string().trim().max(100).optional(),
    price: z
      .string()
      .trim()
      .min(1, 'Please enter a price.')
      .refine((value) => {
        const number = Number(value.replace(/^\$/, ''));
        return (
          Number.isFinite(number) &&
          number >= 0 &&
          /^\d+(?:\.\d{1,2})?$/.test(value.replace(/^\$/, ''))
        );
      }, 'Enter a valid US dollar amount.'),
    minAgeMonths: z
      .string()
      .trim()
      .min(1, 'Please enter a minimum age.')
      .refine((value) => /^\d+$/.test(value), 'Use a whole number of months.'),
    maxAgeMonths: z
      .string()
      .trim()
      .min(1, 'Please enter a maximum age.')
      .refine((value) => /^\d+$/.test(value), 'Use a whole number of months.'),
    affiliateLink: z.string().trim().url('Please enter a valid affiliate link.'),
    image: imageFileSchema
      .nullable()
      .refine(
        (file) =>
          !file || acceptedImageTypes.includes(file.type as (typeof acceptedImageTypes)[number]),
        'Use a JPEG, PNG, or WebP image.'
      )
      .refine((file) => !file || file.size <= MAX_IMAGE_BYTES, 'Image must be 5 MB or smaller.'),
    imageUrl: z.string().url().nullable().optional(),
  })
  .refine((value) => Number(value.maxAgeMonths) >= Number(value.minAgeMonths), {
    message: 'Maximum age must be greater than or equal to minimum age.',
    path: ['maxAgeMonths'],
  })
  .refine(
    (value) => value.developmentArea !== 'Other' || Boolean(value.customDevelopmentArea?.trim()),
    {
      message: 'Enter the custom development area.',
      path: ['customDevelopmentArea'],
    }
  );

type FormValues = z.infer<typeof formSchema>;
type SubmitStatus = TherapyToyStatus;

const fieldLabelClassName =
  'block min-h-6.5 pb-1.5 font-nunito text-sm font-medium leading-5 tracking-[-0.084px] text-[#263238] 2xl:h-6.5';
const inputClassName =
  'h-10.5 w-full rounded-[20px] border border-[#ece8e2] bg-[#fcfaf7] px-3.25 py-2.75 font-nunito text-sm font-medium leading-5 text-[#171e22] outline-none transition-colors placeholder:text-[#a8adaf] focus:border-[#2f7d7e]';

function FieldError({ message }: { message?: string }) {
  return message ? (
    <span className="mt-1 block font-manrope text-xs text-[#b24b4b]">{message}</span>
  ) : null;
}

function ImageField({
  initialUrl,
  onRemoveExisting,
}: {
  initialUrl: string | null;
  onRemoveExisting: () => void;
}) {
  const {
    control,
    register,
    setValue,
    formState: { errors },
  } = useFormContext<FormValues>();
  const imageUrl = useWatch({ control, name: 'imageUrl' });
  const image = useWatch({ control, name: 'image' });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  const clearImage = () => {
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    objectUrlRef.current = null;
    setImagePreview(null);
    setValue('image', null, { shouldDirty: true, shouldValidate: true });
    if (imageUrl) onRemoveExisting();
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    objectUrlRef.current = file ? URL.createObjectURL(file) : null;
    setImagePreview(objectUrlRef.current);
    setValue('image', file, { shouldDirty: true, shouldValidate: true });
  };

  const preview = imagePreview ?? imageUrl ?? initialUrl;

  return (
    <fieldset className="mt-4">
      <legend className="mb-1.5 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#263238]">
        Product Image
      </legend>
      <div className="relative">
        <label className="flex min-h-31.5 cursor-pointer flex-col items-center justify-center gap-2 rounded-[14px] border-2 border-dashed border-[#e7eceb] p-5.5 font-manrope text-xs leading-4.5 text-[#607d8b] transition-colors hover:bg-[#fcfaf7]">
          {preview ? (
            preview.startsWith('blob:') ? (
              <Image
                src={preview}
                alt="Therapy toy preview"
                className="h-24 max-w-full rounded-xl object-contain"
              />
            ) : (
              <Image
                src={preview}
                alt="Therapy toy preview"
                width={160}
                height={96}
                className="h-24 max-w-full rounded-xl object-contain"
              />
            )
          ) : (
            <Upload aria-hidden="true" size={24} strokeWidth={1.8} />
          )}
          <span className="max-w-full truncate">
            {image?.name ?? (preview ? 'Replace image' : 'Upload image')}
          </span>
          <input
            {...register('image')}
            accept="image/png,image/jpeg,image/webp"
            className="sr-only"
            type="file"
            onChange={handleImageChange}
          />
        </label>
        {preview ? (
          <button
            type="button"
            onClick={clearImage}
            aria-label="Remove therapy toy image"
            className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-white text-[#607d8b] shadow-sm hover:text-[#b24b4b]"
          >
            <X size={14} />
          </button>
        ) : null}
      </div>
      <FieldError message={errors.image?.message as string | undefined} />
      <p className="mt-1.5 font-manrope text-xs leading-4.5 text-[#607d8b]">
        One JPEG, PNG, or WebP image up to 5 MB.
      </p>
    </fieldset>
  );
}

function ToyFields({
  initialUrl,
  onRemoveExisting,
}: {
  initialUrl: string | null;
  onRemoveExisting: () => void;
}) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<FormValues>();
  const developmentArea = useWatch({ control, name: 'developmentArea' });
  return (
    <div className="p-4 sm:p-6 2xl:p-6">
      <label className="block">
        <span className={fieldLabelClassName}>Toy Name</span>
        <input {...register('name')} className={inputClassName} />
        <FieldError message={errors.name?.message} />
      </label>
      <label className="mt-4 block">
        <span className={fieldLabelClassName}>Description / Why we love it</span>
        <textarea
          {...register('description')}
          className="h-23.25 w-full resize-none rounded-[20px] border border-[#ece8e2] bg-[#fcfaf7] px-3.25 py-2.75 font-nunito text-sm font-medium leading-5 text-[#171e22] outline-none transition-colors placeholder:text-[#a8adaf] focus:border-[#2f7d7e]"
          placeholder="Why we love it"
        />
        <FieldError message={errors.description?.message} />
      </label>
      <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,380px)_minmax(0,1fr)] xl:gap-5 2xl:grid-cols-[minmax(0,380px)_minmax(0,1fr)] 2xl:gap-5">
        <label className="block">
          <span className={fieldLabelClassName}>Development Area</span>
          <span className="relative block">
            <select
              {...register('developmentArea')}
              className="h-10.75 w-full appearance-none rounded-[20px] border border-[#ece8e2] bg-[#fcfaf7] px-2.75 pr-10 font-nunito text-xs font-medium leading-4 text-[#263238] outline-none focus:border-[#2f7d7e]"
            >
              <option value="">Select area</option>
              {developmentAreas.map((area) => (
                <option key={area}>{area}</option>
              ))}
              <option>Other</option>
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2"
            />
          </span>
          <FieldError message={errors.developmentArea?.message} />
        </label>
        <label className="block">
          <span className={fieldLabelClassName}>Price (USD)</span>
          <input
            {...register('price')}
            inputMode="decimal"
            placeholder="24.99"
            className={inputClassName}
          />
          <FieldError message={errors.price?.message} />
        </label>
      </div>
      {developmentArea === 'Other' ? (
        <label className="mt-4 block">
          <span className={fieldLabelClassName}>Custom Development Area</span>
          <input {...register('customDevelopmentArea')} className={inputClassName} />
          <FieldError message={errors.customDevelopmentArea?.message as string | undefined} />
        </label>
      ) : null}
      <div className="mt-4 grid gap-4 xl:grid-cols-2 xl:gap-5">
        <label className="block">
          <span className={fieldLabelClassName}>Min Age (months)</span>
          <input {...register('minAgeMonths')} inputMode="numeric" className={inputClassName} />
          <FieldError message={errors.minAgeMonths?.message} />
        </label>
        <label className="block">
          <span className={fieldLabelClassName}>Max Age (months)</span>
          <input {...register('maxAgeMonths')} inputMode="numeric" className={inputClassName} />
          <FieldError message={errors.maxAgeMonths?.message} />
        </label>
      </div>
      <ImageField initialUrl={initialUrl} onRemoveExisting={onRemoveExisting} />
      <label className="mt-4 block">
        <span className={fieldLabelClassName}>Affiliate Link</span>
        <input {...register('affiliateLink')} type="url" className={inputClassName} />
        <FieldError message={errors.affiliateLink?.message} />
      </label>
      <input type="hidden" {...register('imageUrl')} />
    </div>
  );
}

type TherapyToyFormProps = { toy?: TherapyToy; isLoading?: boolean };

export function TherapyToyForm({ toy, isLoading = false }: TherapyToyFormProps) {
  const router = useRouter();
  const [activeSubmitStatus, setActiveSubmitStatus] = useState<SubmitStatus | null>(null);
  const [imageRemoved, setImageRemoved] = useState(false);
  const createToy = useCreateTherapyToy();
  const updateToy = useUpdateTherapyToy();
  const uploadImage = useUploadTherapyToyImage();
  const deleteImage = useDeleteTherapyToyImage();
  const busy =
    isLoading ||
    createToy.isPending ||
    updateToy.isPending ||
    uploadImage.isPending ||
    deleteImage.isPending;
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: {
      name: toy?.name ?? '',
      description: toy?.description ?? '',
      developmentArea: developmentAreas.includes(toy?.developmentArea ?? '')
        ? toy?.developmentArea
        : toy
          ? 'Other'
          : '',
      customDevelopmentArea:
        toy && !developmentAreas.includes(toy.developmentArea) ? toy.developmentArea : '',
      price: toy?.price?.toFixed(2) ?? '',
      minAgeMonths: toy ? String(toy.minAgeMonths) : '',
      maxAgeMonths: toy ? String(toy.maxAgeMonths) : '',
      affiliateLink: toy?.affiliateLink ?? '',
      image: null,
      imageUrl: toy?.imageUrl ?? null,
    },
  });

  const removeExistingImage = () => {
    setImageRemoved(true);
    form.setValue('imageUrl', null, { shouldDirty: true });
  };

  const submit = async (values: FormValues, status: SubmitStatus) => {
    if (busy) return;
    const developmentArea =
      values.developmentArea === 'Other'
        ? (values.customDevelopmentArea?.trim() ?? '')
        : values.developmentArea;
    const uploadedUrls: string[] = [];
    try {
      let imageUrl = imageRemoved ? null : (values.imageUrl ?? null);
      if (values.image) {
        const uploaded = await uploadImage.mutateAsync(values.image);
        imageUrl = uploaded.url;
        uploadedUrls.push(uploaded.url);
      }
      const payload = {
        name: values.name.trim(),
        description: values.description.trim(),
        developmentArea,
        price: Number(values.price.replace(/^\$/, '')),
        minAgeMonths: Number(values.minAgeMonths),
        maxAgeMonths: Number(values.maxAgeMonths),
        affiliateLink: values.affiliateLink.trim(),
        imageUrl: imageUrl ?? undefined,
        status,
      };
      if (toy) await updateToy.mutateAsync({ id: toy.id, input: { ...payload, imageUrl } });
      else await createToy.mutateAsync(payload);
      toast.success(
        toy
          ? 'Therapy toy updated.'
          : status === 'DRAFT'
            ? 'Therapy toy saved as a draft.'
            : 'Therapy toy published.'
      );
      router.push('/dashboard/admin/therapy-toys');
    } catch (error) {
      await Promise.allSettled(uploadedUrls.map((url) => deleteImage.mutateAsync({ url })));
      toast.error(error instanceof Error ? error.message : 'Unable to save the therapy toy.');
    }
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    const submitter = event.nativeEvent.submitter as HTMLButtonElement | null;
    const status = submitter?.dataset.status === 'draft' ? 'DRAFT' : (toy?.status ?? 'PUBLISHED');
    setActiveSubmitStatus(status);
    void form.handleSubmit((values) => submit(values, status))(event);
  };

  return (
    <section className="mx-auto flex w-full min-w-0 max-w-366.25 flex-col items-center gap-6 pb-8 text-[#263238] sm:gap-10.5 2xl:gap-10.5">
      <nav
        aria-label="Breadcrumb"
        className="flex w-full min-w-0 max-w-211.25 items-center gap-1.5"
      >
        <Link
          href="/dashboard/admin/therapy-toys"
          className="font-manrope text-sm leading-5.5 text-[#2f7d7e]"
        >
          Therapy Toys
        </Link>
        <span aria-hidden="true" className="text-[#d8ddd9]">
          /
        </span>
        <span className="truncate font-manrope text-sm text-[#263238]">
          {toy ? 'Edit Toy' : 'Add new Toy'}
        </span>
      </nav>
      <div className="h-auto w-full min-w-0 max-w-211.25 overflow-hidden rounded-3xl bg-white drop-shadow-[0px_25px_28.45px_rgba(0,0,0,0.12)]">
        <header className="flex h-18 items-center justify-between border-b border-[#ece8e2] px-4 py-5 sm:h-20.25 sm:px-6 2xl:h-20.25 2xl:px-6">
          <h1 className="font-nunito text-lg font-bold leading-7 text-[#3d3d3d]">
            {toy ? 'Edit Therapy Toy' : 'Add Therapy Toy'}
          </h1>
          <Link
            href="/dashboard/admin/therapy-toys"
            aria-label="Close therapy toy form"
            className="inline-flex size-8 items-center justify-center rounded-[20px] text-[#6b6b6b] hover:bg-[#fcfaf7]"
          >
            <X size={16} />
          </Link>
        </header>
        <FormProvider {...form}>
          <form onSubmit={handleFormSubmit}>
            <ToyFields initialUrl={toy?.imageUrl ?? null} onRemoveExisting={removeExistingImage} />
            <div className="flex flex-wrap gap-3 p-4 pt-0 sm:p-6 sm:pt-0 2xl:p-6 2xl:pt-0">
              <button
                type="submit"
                data-status={toy?.status ?? 'PUBLISHED'}
                disabled={busy}
                className="flex h-10.5 items-center justify-center gap-2 rounded-[20px] bg-[#2f7d7e] px-4 font-nunito text-sm font-semibold text-white disabled:opacity-50"
              >
                {busy && activeSubmitStatus !== 'DRAFT' ? (
                  <Loader2 className="animate-spin" size={14} />
                ) : null}
                {toy ? 'Save Changes' : 'Add Toy'}
              </button>
              {!toy ? (
                <button
                  type="submit"
                  data-status="draft"
                  disabled={busy}
                  className="h-10.5 rounded-[20px] border border-[#ece8e2] bg-white px-4 font-nunito text-sm font-medium disabled:opacity-50"
                >
                  Save as Draft
                </button>
              ) : null}
            </div>
          </form>
        </FormProvider>
      </div>
    </section>
  );
}
