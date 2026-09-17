'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  BookOpen,
  CircleDot,
  ClipboardList,
  FileText,
  GripVertical,
  ImageUp,
  Layers,
  Loader2,
  Minus,
  Plus,
  ShieldCheck,
  Target,
  X,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import {
  useCreateActivity,
  useUpdateActivity,
  useUploadActivityImage,
} from '@/features/activities/hooks/activities.mutations';
import type { Activity, CreateActivityInput } from '@/features/activities/model/activity.types';
import { ActivityFormSection } from './activity-form-section';
import { ActivityFormSelect } from './activity-form-select';

const categoryOptions = [
  { label: 'Fine Motor', value: 'Fine Motor' },
  { label: 'Gross Motor', value: 'Gross Motor' },
  { label: 'Sensory', value: 'Sensory' },
  { label: 'Coordination', value: 'Coordination' },
  { label: 'Visual-Motor', value: 'Visual-Motor' },
  { label: 'Speech & Language', value: 'Speech & Language' },
  { label: 'Social-Emotional', value: 'Social-Emotional' },
  { label: 'Self Regulation', value: 'Self Regulation' },
  { label: 'Other', value: 'Other' },
] as const;

const difficultyOptions = [
  { label: 'Easy', value: 'EASY' },
  { label: 'Moderate', value: 'MODERATE' },
  { label: 'Challenging', value: 'CHALLENGING' },
] as const;

const activityFormSchema = z
  .object({
    title: z.string().trim().min(1, 'Please enter an activity title.').max(200),
    shortDescription: z.string().trim().min(1, 'Please enter a short description.').max(5000),
    learningObjective: z.string(),
    category: z.string().min(1, 'Please select a development category.'),
    customCategory: z.string(),
    minAgeMonths: z
      .string()
      .trim()
      .min(1, 'Please enter starting age.')
      .refine((val) => /^\d+$/.test(val), 'Starting age must be a whole number of months.'),
    maxAgeMonths: z
      .string()
      .trim()
      .min(1, 'Please enter ending age.')
      .refine((val) => /^\d+$/.test(val), 'Ending age must be a whole number of months.'),
    developmentGoal: z.string().trim().min(1, 'Please describe the development goal.'),
    materialsSummary: z.string(),
    otDesigned: z.string(),
    estimatedDuration: z.string().trim().min(1, 'Please enter an estimated duration.'),
    difficultyLevel: z.enum(['EASY', 'MODERATE', 'CHALLENGING']),
    materials: z
      .array(
        z.object({
          name: z.string().trim().min(1, 'Enter a material name.'),
        })
      )
      .min(1, 'Please add at least one material.'),
    steps: z
      .array(
        z.object({
          title: z.string().trim().min(1, 'Enter a step title.'),
          description: z.string(),
        })
      )
      .min(1, 'Please add at least one step.'),
    makeEasier: z.string(),
    makeHarder: z.string(),
    parentTips: z.string(),
    safetyNotes: z.string(),
    accessLevel: z.enum(['little-steps', 'grow-together', 'personalized-pathways']),
  })
  .refine((val) => Number(val.maxAgeMonths) >= Number(val.minAgeMonths), {
    message: 'Ending age must be greater than or equal to starting age.',
    path: ['maxAgeMonths'],
  })
  .refine((val) => val.category !== 'Other' || Boolean(val.customCategory.trim()), {
    message: 'Please enter the custom development category.',
    path: ['customCategory'],
  });

type ActivityFormValues = z.infer<typeof activityFormSchema>;

const labelClassName = 'font-nunito text-sm font-medium leading-5 text-[#263238]';
const inputClassName =
  'mt-1.5 h-11 w-full rounded-xl border border-[#e1e8e6] bg-[#f4f8f7] px-3.5 font-nunito text-sm font-medium leading-5 text-[#263238] outline-none transition-colors placeholder:text-[#9ba6ab] focus:border-[#2f7d7e]';
const textareaClassName =
  'mt-1.5 w-full resize-none rounded-xl border border-[#e1e8e6] bg-[#f4f8f7] px-3.5 py-3 font-nunito text-sm font-medium leading-5 text-[#263238] outline-none transition-colors placeholder:text-[#9ba6ab] focus:border-[#2f7d7e]';

function mapAccessLevel(level: 'little-steps' | 'grow-together' | 'personalized-pathways') {
  switch (level) {
    case 'little-steps':
      return ['LITTLE_STEPS', 'GROW_TOGETHER', 'PERSONALIZED_PATHWAYS'];
    case 'grow-together':
      return ['GROW_TOGETHER', 'PERSONALIZED_PATHWAYS'];
    case 'personalized-pathways':
      return ['PERSONALIZED_PATHWAYS'];
    default:
      return ['LITTLE_STEPS', 'GROW_TOGETHER', 'PERSONALIZED_PATHWAYS'];
  }
}

function reverseAccessLevel(
  levels: string[] = []
): 'little-steps' | 'grow-together' | 'personalized-pathways' {
  if (levels.includes('LITTLE_STEPS')) return 'little-steps';
  if (levels.includes('GROW_TOGETHER')) return 'grow-together';
  if (levels.includes('PERSONALIZED_PATHWAYS')) return 'personalized-pathways';
  return 'little-steps';
}

function getInitialFormValues(activity?: Activity, isDuplicate = false): ActivityFormValues {
  if (!activity) {
    return {
      title: '',
      shortDescription: '',
      learningObjective: '',
      category: '',
      customCategory: '',
      minAgeMonths: '0',
      maxAgeMonths: '36',
      developmentGoal: '',
      materialsSummary: '',
      otDesigned: 'Therapist-approved',
      estimatedDuration: '',
      difficultyLevel: 'EASY',
      materials: [{ name: '' }],
      steps: [{ title: '', description: '' }],
      makeEasier: '',
      makeHarder: '',
      parentTips: '',
      safetyNotes: '',
      accessLevel: 'little-steps',
    };
  }

  const isStandard = categoryOptions.some(
    (opt) =>
      opt.value !== 'Other' &&
      opt.value.toLowerCase() === activity.developmentCategory?.toLowerCase()
  );
  const matchedCategory = isStandard
    ? (categoryOptions.find(
        (opt) => opt.value.toLowerCase() === activity.developmentCategory.toLowerCase()
      )?.value ?? activity.developmentCategory)
    : 'Other';

  return {
    title: isDuplicate ? `${activity.title} (Copy)` : activity.title,
    shortDescription: activity.shortDescription ?? '',
    learningObjective: activity.learningObjective ?? '',
    category: matchedCategory,
    customCategory: isStandard ? '' : activity.developmentCategory,
    minAgeMonths: String(activity.minAgeMonths ?? 0),
    maxAgeMonths: String(activity.maxAgeMonths ?? 36),
    developmentGoal: activity.developmentGoal ?? '',
    materialsSummary: activity.materialsSummary ?? '',
    otDesigned: activity.otDesigned ?? (activity.isOtDesigned ? 'Therapist-approved' : ''),
    estimatedDuration: activity.estimatedDuration ?? '',
    difficultyLevel: activity.difficultyLevel ?? 'EASY',
    materials:
      activity.materialsNeeded && activity.materialsNeeded.length > 0
        ? activity.materialsNeeded.map((m) => ({ name: m.name }))
        : [{ name: '' }],
    steps:
      activity.instructions && activity.instructions.length > 0
        ? activity.instructions.map((s) => ({ title: s.title, description: s.description ?? '' }))
        : [{ title: '', description: '' }],
    makeEasier: activity.makeItEasier ?? '',
    makeHarder: activity.makeItHarder ?? '',
    parentTips: activity.parentTips ?? '',
    safetyNotes: activity.safetyNotes ?? '',
    accessLevel: reverseAccessLevel(activity.accessLevel),
  };
}

type CreateActivityFormProps = {
  activity?: Activity;
  isDuplicate?: boolean;
};

export function CreateActivityForm({
  activity,
  isDuplicate = false,
}: CreateActivityFormProps = {}) {
  const router = useRouter();
  const isEditMode = Boolean(activity && !isDuplicate);

  const [submitStatus, setSubmitStatus] = useState<'DRAFT' | 'PUBLISHED'>(
    activity?.status === 'DRAFT' ? 'DRAFT' : 'PUBLISHED'
  );
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    activity?.featuredImageUrl ?? null
  );
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(
    activity?.featuredImageUrl ?? null
  );
  const objectUrlRef = useRef<string | null>(null);

  const createActivityMutation = useCreateActivity();
  const updateActivityMutation = useUpdateActivity();
  const uploadImageMutation = useUploadActivityImage();

  const isSubmitting =
    createActivityMutation.isPending ||
    updateActivityMutation.isPending ||
    uploadImageMutation.isPending;

  const form = useForm<ActivityFormValues>({
    resolver: zodResolver(activityFormSchema),
    mode: 'onBlur',
    defaultValues: getInitialFormValues(activity, isDuplicate),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  const watchedCategory = useWatch({ control, name: 'category' });

  const materialsArray = useFieldArray({ control, name: 'materials' });
  const stepsArray = useFieldArray({ control, name: 'steps' });

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    objectUrlRef.current = file ? URL.createObjectURL(file) : null;
    setImagePreview(objectUrlRef.current);
    setSelectedImage(file);
  };

  const clearImage = () => {
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    objectUrlRef.current = null;
    setImagePreview(null);
    setSelectedImage(null);
    setExistingImageUrl(null);
  };

  const handleFormSubmit = async (
    values: ActivityFormValues,
    targetStatus: 'DRAFT' | 'PUBLISHED' = 'PUBLISHED'
  ) => {
    try {
      let featuredImageUrl: string | undefined = existingImageUrl ?? undefined;

      if (selectedImage) {
        const uploadResult = await uploadImageMutation.mutateAsync(selectedImage);
        featuredImageUrl = uploadResult.url;
      } else if (!imagePreview) {
        featuredImageUrl = undefined;
      }

      const cleanMaterials = values.materials
        .filter((m) => m.name.trim().length > 0)
        .map((m) => ({ name: m.name.trim() }));

      const cleanSteps = values.steps
        .filter((s) => s.title.trim().length > 0)
        .map((s) => ({ title: s.title.trim(), description: s.description?.trim() || '' }));

      const payload: CreateActivityInput = {
        title: values.title.trim(),
        shortDescription: values.shortDescription.trim(),
        learningObjective: values.learningObjective?.trim() || undefined,
        developmentCategory:
          values.category === 'Other' ? values.customCategory.trim() : values.category,
        minAgeMonths: Number(values.minAgeMonths),
        maxAgeMonths: Number(values.maxAgeMonths),
        featuredImageUrl,
        developmentGoal: values.developmentGoal.trim(),
        materialsSummary: values.materialsSummary?.trim() || undefined,
        isOtDesigned: Boolean(values.otDesigned?.trim()),
        otDesigned: values.otDesigned?.trim() || undefined,
        estimatedDuration: values.estimatedDuration?.trim() || undefined,
        difficultyLevel: values.difficultyLevel,
        materialsNeeded: cleanMaterials,
        instructions: cleanSteps,
        makeItEasier: values.makeEasier?.trim() || undefined,
        makeItHarder: values.makeHarder?.trim() || undefined,
        parentTips: values.parentTips?.trim() || undefined,
        safetyNotes: values.safetyNotes?.trim() || undefined,
        accessLevel: mapAccessLevel(values.accessLevel),
        status: targetStatus,
      };

      if (isEditMode && activity) {
        await updateActivityMutation.mutateAsync({
          id: activity.id,
          input: payload,
        });

        toast.success(
          targetStatus === 'PUBLISHED'
            ? `Activity “${values.title}” updated and published!`
            : `Activity “${values.title}” updated as draft!`
        );
      } else {
        await createActivityMutation.mutateAsync(payload);

        toast.success(
          targetStatus === 'PUBLISHED'
            ? `Activity “${values.title}” has been published!`
            : `Activity “${values.title}” saved as draft!`
        );
      }

      router.push('/dashboard/admin/activities-library');
    } catch (error) {
      const err = error as Error;
      toast.error(err.message || 'Failed to save activity. Please try again.');
    }
  };

  const submitWithStatus = (targetStatus: 'DRAFT' | 'PUBLISHED') => {
    setSubmitStatus(targetStatus);
    void handleSubmit((values) => handleFormSubmit(values, targetStatus))();
  };

  return (
    <form
      onSubmit={handleSubmit((values) => handleFormSubmit(values, submitStatus))}
      className="min-w-0 space-y-4"
    >
      <ActivityFormSection title="Basic Information" icon={FileText}>
        <div className="space-y-5">
          <FormField label="Activity Title" required error={errors.title?.message}>
            <input
              {...register('title')}
              className={inputClassName}
              placeholder="e.g. Shape Puzzle Matching"
            />
          </FormField>

          <FormField label="Short Description" required error={errors.shortDescription?.message}>
            <textarea
              {...register('shortDescription')}
              className={`${textareaClassName} h-20`}
              placeholder="Brief description visible in the activity library..."
            />
          </FormField>

          <FormField label="Learning Objective">
            <textarea
              {...register('learningObjective')}
              className={`${textareaClassName} h-20`}
              placeholder="Brief learning objective visible in the activity library..."
            />
          </FormField>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <FormField label="Development Category" required error={errors.category?.message}>
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <div className="mt-1.5">
                    <ActivityFormSelect
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Select category"
                      options={categoryOptions}
                    />
                  </div>
                )}
              />
            </FormField>

            {watchedCategory === 'Other' ? (
              <FormField
                label="Custom Development Category"
                required
                error={errors.customCategory?.message}
              >
                <input
                  {...register('customCategory')}
                  placeholder="e.g. Cognitive Skills"
                  className={inputClassName}
                />
              </FormField>
            ) : null}
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormField label="Starting Age (Months)" required error={errors.minAgeMonths?.message}>
              <input
                {...register('minAgeMonths')}
                inputMode="numeric"
                placeholder="e.g. 0"
                className={inputClassName}
              />
            </FormField>
            <FormField label="Ending Age (Months)" required error={errors.maxAgeMonths?.message}>
              <input
                {...register('maxAgeMonths')}
                inputMode="numeric"
                placeholder="e.g. 36"
                className={inputClassName}
              />
            </FormField>
          </div>

          <FormField label="Featured Image">
            <div className="relative mt-1.5">
              <label className="flex min-h-24 cursor-pointer items-center gap-4 rounded-xl border border-dashed border-[#d9e4e2] p-4 text-[#607d8b] transition-colors hover:bg-[#f8fbfa]">
                {imagePreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={imagePreview}
                    alt="Activity preview"
                    className="size-16 shrink-0 rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-[#edf6f5] text-[#278488]">
                    <ImageUp aria-hidden="true" size={22} strokeWidth={1.8} />
                  </div>
                )}
                <span className="flex min-w-0 flex-col">
                  <span className="truncate font-nunito text-sm font-medium leading-5 text-[#263238]">
                    {selectedImage?.name ||
                      (existingImageUrl
                        ? 'Current activity image (click to replace)'
                        : 'Click to upload activity image')}
                  </span>
                  <span className="font-nunito text-xs leading-4 text-[#607d8b]">
                    PNG, JPG, WebP up to 5MB
                  </span>
                </span>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="sr-only"
                  onChange={handleImageChange}
                />
              </label>
              {imagePreview && (
                <button
                  type="button"
                  onClick={clearImage}
                  aria-label="Remove image"
                  className="absolute right-3 top-3 flex size-7 items-center justify-center rounded-full bg-white text-[#607d8b] shadow-sm transition-colors hover:text-[#ed7770]"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </FormField>
        </div>
      </ActivityFormSection>

      <ActivityFormSection title="Development Information" icon={Target}>
        <div className="space-y-5">
          <FormField label="Development Goal" required error={errors.developmentGoal?.message}>
            <textarea
              {...register('developmentGoal')}
              className={`${textareaClassName} h-18.25`}
              placeholder="Describe the developmental purpose of this activity..."
            />
          </FormField>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <FormField label="Materials Summary">
              <input
                {...register('materialsSummary')}
                className={inputClassName}
                placeholder="e.g. Yoga cards & open space"
              />
            </FormField>
            <FormField label="OT Designed">
              <input
                {...register('otDesigned')}
                className={inputClassName}
                placeholder="e.g. Therapist-approved"
              />
              <span className="mt-1 block font-nunito text-xs leading-4 text-[#607d8b]">
                Specialist validation or design status
              </span>
            </FormField>
            <FormField
              label="Estimated Duration"
              required
              error={errors.estimatedDuration?.message}
            >
              <input
                {...register('estimatedDuration')}
                className={inputClassName}
                placeholder="e.g. 15 minutes, 20-30 min"
              />
            </FormField>
            <FormField label="Difficulty Level" required error={errors.difficultyLevel?.message}>
              <Controller
                control={control}
                name="difficultyLevel"
                render={({ field }) => (
                  <div className="mt-1.5">
                    <ActivityFormSelect
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Select difficulty"
                      options={difficultyOptions}
                    />
                  </div>
                )}
              />
            </FormField>
          </div>
        </div>
      </ActivityFormSection>

      <ActivityFormSection title="Materials Needed" icon={Layers}>
        <div className="space-y-2">
          {materialsArray.fields.map((item, index) => (
            <div key={item.id} className="flex min-w-0 items-center gap-2">
              <GripVertical aria-hidden="true" size={16} className="shrink-0 text-[#b1c2c7]" />
              <input
                {...register(`materials.${index}.name`)}
                placeholder="e.g. Wooden shape puzzle"
                className={`${inputClassName} mt-0`}
              />
              <button
                type="button"
                aria-label={`Remove material ${index + 1}`}
                disabled={materialsArray.fields.length === 1}
                onClick={() => materialsArray.remove(index)}
                className="flex size-8 shrink-0 items-center justify-center text-[#ed7770] transition-colors hover:text-[#c95752] disabled:opacity-30"
              >
                <Minus aria-hidden="true" size={15} strokeWidth={1.8} />
              </button>
            </div>
          ))}
          {errors.materials?.message && (
            <span className="block font-nunito text-xs text-[#c55750]">
              {errors.materials.message}
            </span>
          )}
          <button
            type="button"
            onClick={() => materialsArray.append({ name: '' })}
            className="mt-1 inline-flex h-9 items-center gap-2 rounded-xl border border-dashed border-[#8bb9bb] px-3.5 font-nunito text-sm font-medium text-[#278488] hover:bg-[#f4fafa]"
          >
            <Plus aria-hidden="true" size={15} strokeWidth={1.8} /> Add Material
          </button>
        </div>
      </ActivityFormSection>

      <ActivityFormSection title="Step-by-Step Instructions" icon={ClipboardList}>
        <div className="space-y-4">
          {stepsArray.fields.map((step, index) => (
            <div key={step.id} className="flex min-w-0 gap-2 sm:gap-3">
              <span className="mt-2 flex size-7 shrink-0 items-center justify-center rounded-full bg-[#edf6f5] font-nunito text-sm font-bold text-[#278488]">
                {index + 1}
              </span>
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    {...register(`steps.${index}.title`)}
                    placeholder="Step title (e.g. Present the puzzle)"
                    className={`${inputClassName} mt-0`}
                  />
                  <button
                    type="button"
                    aria-label={`Remove step ${index + 1}`}
                    disabled={stepsArray.fields.length === 1}
                    onClick={() => stepsArray.remove(index)}
                    className="flex size-8 shrink-0 items-center justify-center text-[#ed7770] transition-colors hover:text-[#c95752] disabled:opacity-30"
                  >
                    <Minus aria-hidden="true" size={15} strokeWidth={1.8} />
                  </button>
                </div>
                <textarea
                  {...register(`steps.${index}.description`)}
                  className={`${textareaClassName} mt-0 h-16`}
                  placeholder="Describe what happens in this step..."
                />
              </div>
            </div>
          ))}
          {errors.steps?.message && (
            <span className="block font-nunito text-xs text-[#c55750]">{errors.steps.message}</span>
          )}
          <button
            type="button"
            onClick={() => stepsArray.append({ title: '', description: '' })}
            className="inline-flex h-9 items-center gap-2 rounded-xl border border-dashed border-[#8bb9bb] px-3.5 font-nunito text-sm font-medium text-[#278488] hover:bg-[#f4fafa]"
          >
            <Plus aria-hidden="true" size={15} strokeWidth={1.8} /> Add Step
          </button>
        </div>
      </ActivityFormSection>

      <ActivityFormSection title="Activity Modifications" icon={CircleDot}>
        <div className="space-y-5">
          <FormField label="Make it Easier">
            <textarea
              {...register('makeEasier')}
              className={`${textareaClassName} h-20`}
              placeholder="How to simplify this activity for beginners..."
            />
          </FormField>
          <FormField label="Make it Harder">
            <textarea
              {...register('makeHarder')}
              className={`${textareaClassName} h-20`}
              placeholder="How to add difficulty or variation..."
            />
          </FormField>
        </div>
      </ActivityFormSection>

      <ActivityFormSection title="Parent Tips" icon={BookOpen}>
        <div className="space-y-5">
          <FormField label="Activity Tips & Modifications">
            <textarea
              {...register('parentTips')}
              className={`${textareaClassName} h-20`}
              placeholder="Tips for parents, therapist recommendations..."
            />
          </FormField>
          <FormField label="Safety Notes">
            <textarea
              {...register('safetyNotes')}
              className={`${textareaClassName} h-16`}
              placeholder="Any safety considerations for this activity..."
            />
          </FormField>
        </div>
      </ActivityFormSection>

      <ActivityFormSection title="Membership Settings" icon={ShieldCheck}>
        <fieldset>
          <legend className={labelClassName}>
            Access Level <span className="text-[#df6b63]">*</span>
          </legend>
          <Controller
            control={control}
            name="accessLevel"
            render={({ field }) => (
              <div
                role="radiogroup"
                aria-label="Membership access level"
                className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3"
              >
                {[
                  { value: 'little-steps', label: 'Little Steps', tone: 'teal' },
                  { value: 'grow-together', label: 'Grow Together', tone: 'teal' },
                  {
                    value: 'personalized-pathways',
                    label: 'Personalized Pathways',
                    tone: 'orange',
                  },
                ].map((level) => {
                  const selected = field.value === level.value;
                  const isOrange = level.tone === 'orange';

                  return (
                    <button
                      key={level.value}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => field.onChange(level.value)}
                      className={`flex min-h-12 items-center gap-3 rounded-xl border px-4 py-2 text-left font-nunito text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f8b8f] ${selected ? 'border-[#2f8b8f] bg-[#eff9f7] text-[#278488]' : `border-[#e1e8e6] bg-white ${isOrange ? 'text-[#b45b32]' : 'text-[#278488]'} hover:border-[#8bb9bb]`}`}
                    >
                      <span
                        aria-hidden="true"
                        className={`flex size-4 shrink-0 items-center justify-center rounded-full border-2 ${selected ? 'border-[#2f8b8f]' : isOrange ? 'border-[#b45b32]' : 'border-[#278488]'}`}
                      >
                        {selected && <span className="size-2 rounded-full bg-[#2f8b8f]" />}
                      </span>
                      {level.label}
                    </button>
                  );
                })}
              </div>
            )}
          />
          <p className="mt-2 font-nunito text-xs leading-4 text-[#607d8b]">
            Locks this activity for families on lower tiers.
          </p>
        </fieldset>
      </ActivityFormSection>

      <footer className="flex flex-col gap-3 rounded-[18px] border border-[#e3e9e8] bg-white px-4 py-4 shadow-[0_5px_10px_rgba(38,50,56,0.055)] sm:flex-row sm:items-center sm:justify-end sm:px-5">
        <button
          type="button"
          disabled={isSubmitting}
          onClick={() => submitWithStatus('DRAFT')}
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-[#2f8b8f] px-4 font-nunito text-sm font-bold text-[#278488] hover:bg-[#f4fafa] disabled:opacity-50 sm:w-auto"
        >
          {isSubmitting && submitStatus === 'DRAFT' && <Loader2 className="size-4 animate-spin" />}
          Save as Draft
        </button>
        <button
          type="button"
          disabled={isSubmitting}
          onClick={() => submitWithStatus('PUBLISHED')}
          className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#2f7d7e] px-5 font-nunito text-sm font-bold text-white shadow-[inset_0_-2px_0_rgba(0,0,0,0.08)] hover:bg-[#276d6e] disabled:opacity-50 sm:w-auto"
        >
          {isSubmitting && submitStatus === 'PUBLISHED' && (
            <Loader2 className="size-4 animate-spin" />
          )}
          {isEditMode ? 'Save Changes' : 'Publish'}
        </button>
      </footer>
    </form>
  );
}

function FormField({
  label,
  required = false,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className={labelClassName}>
        {label} {required && <span className="text-[#df6b63]">*</span>}
      </span>
      {children}
      {error && <span className="mt-1 block font-nunito text-xs text-[#c55750]">{error}</span>}
    </label>
  );
}
