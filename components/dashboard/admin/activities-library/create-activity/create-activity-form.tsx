'use client';

import { DynamicForm } from '@/components/ui/dynamic-form';
import { Controller, type UseFormReturn, useFieldArray } from 'react-hook-form';
import {
  BookOpen,
  CircleDot,
  ClipboardList,
  FileText,
  GripVertical,
  ImageUp,
  Layers,
  Minus,
  Plus,
  ShieldCheck,
  Target,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { z } from 'zod';
import { ActivityFormSection } from './activity-form-section';
import { ActivityFormSelect } from './activity-form-select';

const categories = [
  { label: 'All', value: 'All' },
  { label: 'Fine Motor', value: 'Fine Motor' },
  { label: 'Gross Motor', value: 'Gross Motor' },
  { label: 'Sensory', value: 'Sensory' },
  { label: 'Coordination', value: 'Coordination' },
  { label: 'Visual-Motor', value: 'Visual-Motor' },
] as const;

const ageGroups = [
  { label: '0–12 mo', value: '0–12 mo' },
  { label: '12–24 mo', value: '12–24 mo' },
  { label: '2–3 yr', value: '2–3 yr' },
  { label: '3–5 yr', value: '3–5 yr' },
  { label: '5–7 yr', value: '5–7 yr' },
] as const;

const durations = [
  { label: '5 minutes', value: '5 minutes' },
  { label: '10 minutes', value: '10 minutes' },
  { label: '15 minutes', value: '15 minutes' },
  { label: '20 minutes', value: '20 minutes' },
  { label: '30 minutes', value: '30 minutes' },
] as const;

const difficulties = [
  { label: 'Easy', value: 'Easy' },
  { label: 'Moderate', value: 'Moderate' },
  { label: 'Challenging', value: 'Challenging' },
] as const;

const activitySchema = z.object({
  title: z.string().trim().min(1, 'Please enter an activity title.'),
  shortDescription: z.string().trim().min(1, 'Please enter a short description.'),
  learningObjective: z.string(),
  category: z.string().min(1, 'Please select a development category.'),
  ageGroup: z.string().min(1, 'Please select an age group.'),
  featuredImage: z.unknown().optional(),
  developmentGoal: z.string().trim().min(1, 'Please describe the development goal.'),
  materialsSummary: z.string(),
  otDesigned: z.string(),
  estimatedDuration: z.string().min(1, 'Please select an estimated duration.'),
  difficultyLevel: z.string().min(1, 'Please select a difficulty level.'),
  materials: z.array(z.object({ name: z.string().trim().min(1, 'Enter a material.') })).min(1),
  steps: z
    .array(
      z.object({
        title: z.string().trim().min(1, 'Enter a step title.'),
        description: z.string(),
      })
    )
    .min(1),
  makeEasier: z.string(),
  makeHarder: z.string(),
  parentTips: z.string(),
  safetyNotes: z.string(),
  accessLevel: z.enum(['little-steps', 'grow-together', 'personalized-pathways']),
});

type ActivityFormValues = z.infer<typeof activitySchema>;

const labelClassName = 'font-nunito text-sm font-medium leading-5 text-[#263238]';
const inputClassName =
  'mt-1.5 h-11 w-full rounded-xl border border-[#e1e8e6] bg-[#f4f8f7] px-3.5 font-nunito text-sm font-medium leading-5 text-[#263238] outline-none transition-colors placeholder:text-[#9ba6ab] focus:border-[#2f7d7e]';
const textareaClassName =
  'mt-1.5 w-full resize-none rounded-xl border border-[#e1e8e6] bg-[#f4f8f7] px-3.5 py-3 font-nunito text-sm font-medium leading-5 text-[#263238] outline-none transition-colors placeholder:text-[#9ba6ab] focus:border-[#2f7d7e]';

export function CreateActivityForm() {
  const router = useRouter();

  function publishActivity(data: ActivityFormValues) {
    toast.success(`“${data.title}” is ready to publish.`);
    router.push('/dashboard/admin/activities-library');
  }

  function saveDraft() {
    toast.success('Activity saved as a draft.');
  }

  return (
    <DynamicForm
      schema={activitySchema}
      fields={[]}
      onSubmit={publishActivity}
      defaultValues={{
        title: 'Shape Puzzle Matching',
        shortDescription: '',
        learningObjective: '',
        category: '',
        ageGroup: '',
        featuredImage: undefined,
        developmentGoal: '',
        materialsSummary: 'Yoga cards & open space',
        otDesigned: 'Therapist-approved',
        estimatedDuration: '',
        difficultyLevel: '',
        materials: [
          { name: 'Wooden shape puzzle' },
          { name: 'Flat surface' },
          { name: 'Flat surface' },
          { name: 'Flat surface' },
        ],
        steps: [
          { title: 'Present the puzzle', description: '' },
          { title: 'Name each shape', description: '' },
          { title: 'Guide matching', description: '' },
        ],
        makeEasier: '',
        makeHarder: '',
        parentTips: '',
        safetyNotes: '',
        accessLevel: 'little-steps',
      }}
    >
      {(form) => <ActivityFormFields form={form} onSaveDraft={saveDraft} />}
    </DynamicForm>
  );
}

function ActivityFormFields({
  form,
  onSaveDraft,
}: {
  form: UseFormReturn<ActivityFormValues>;
  onSaveDraft: () => void;
}) {
  const materials = useFieldArray({ control: form.control, name: 'materials' });
  const steps = useFieldArray({ control: form.control, name: 'steps' });
  const featuredImage = form.watch('featuredImage') as File | undefined;

  return (
    <div className="space-y-4">
      <ActivityFormSection title="Basic Information" icon={FileText}>
        <div className="space-y-5">
          <FormField label="Activity Title" required error={form.formState.errors.title?.message}>
            <input {...form.register('title')} className={inputClassName} />
          </FormField>
          <FormField
            label="Short Description"
            required
            error={form.formState.errors.shortDescription?.message}
          >
            <textarea
              {...form.register('shortDescription')}
              className={`${textareaClassName} h-20`}
              placeholder="Brief description visible in the activity library..."
            />
          </FormField>
          <FormField label="Learning Objective">
            <textarea
              {...form.register('learningObjective')}
              className={`${textareaClassName} h-20`}
              placeholder="Brief learning objective visible in the activity library..."
            />
          </FormField>
          <div className="grid gap-5 md:grid-cols-2">
            <FormField
              label="Development Category"
              required
              error={form.formState.errors.category?.message}
            >
              <Controller
                control={form.control}
                name="category"
                render={({ field }) => (
                  <div className="mt-1.5">
                    <ActivityFormSelect
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Select category"
                      options={categories}
                    />
                  </div>
                )}
              />
            </FormField>
            <FormField label="Age Group" required error={form.formState.errors.ageGroup?.message}>
              <Controller
                control={form.control}
                name="ageGroup"
                render={({ field }) => (
                  <div className="mt-1.5">
                    <ActivityFormSelect
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Select age group"
                      options={ageGroups}
                    />
                  </div>
                )}
              />
            </FormField>
          </div>
          <FormField label="Featured Image">
            <label className="mt-1.5 flex h-18.5 cursor-pointer items-center gap-3 rounded-xl border border-dashed border-[#d9e4e2] px-4 text-[#607d8b] transition-colors hover:bg-[#f8fbfa]">
              <ImageUp
                aria-hidden="true"
                size={20}
                strokeWidth={1.6}
                className="shrink-0 text-[#a7bbc3]"
              />
              <span className="flex min-w-0 flex-col">
                <span className="truncate font-nunito text-sm font-medium leading-5 text-[#263238]">
                  {featuredImage?.name || 'Click to upload image'}
                </span>
                <span className="font-nunito text-xs leading-4 text-[#607d8b]">
                  PNG, JPG up to 5MB
                </span>
              </span>
              <input
                type="file"
                accept="image/png,image/jpeg"
                className="sr-only"
                onChange={(event) => form.setValue('featuredImage', event.target.files?.[0])}
              />
            </label>
          </FormField>
        </div>
      </ActivityFormSection>

      <ActivityFormSection title="Development Information" icon={Target}>
        <div className="space-y-5">
          <FormField
            label="Development Goal"
            required
            error={form.formState.errors.developmentGoal?.message}
          >
            <textarea
              {...form.register('developmentGoal')}
              className={`${textareaClassName} h-18.25`}
              placeholder="Describe the developmental purpose of this activity..."
            />
          </FormField>
          <div className="grid gap-5 md:grid-cols-2">
            <FormField label="Materials">
              <input {...form.register('materialsSummary')} className={inputClassName} />
            </FormField>
            <FormField label="OT Designed">
              <input {...form.register('otDesigned')} className={inputClassName} />
              <span className="mt-1 block font-nunito text-xs leading-4 text-[#607d8b]">
                Comma-separated
              </span>
            </FormField>
            <FormField
              label="Estimated Duration"
              error={form.formState.errors.estimatedDuration?.message}
            >
              <Controller
                control={form.control}
                name="estimatedDuration"
                render={({ field }) => (
                  <div className="mt-1.5">
                    <ActivityFormSelect
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Select duration"
                      options={durations}
                    />
                  </div>
                )}
              />
            </FormField>
            <FormField
              label="Difficulty Level"
              required
              error={form.formState.errors.difficultyLevel?.message}
            >
              <Controller
                control={form.control}
                name="difficultyLevel"
                render={({ field }) => (
                  <div className="mt-1.5">
                    <ActivityFormSelect
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Select difficulty"
                      options={difficulties}
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
          {materials.fields.map((item, index) => (
            <div key={item.id} className="flex items-center gap-2">
              <GripVertical aria-hidden="true" size={16} className="shrink-0 text-[#b1c2c7]" />
              <input
                {...form.register(`materials.${index}.name`)}
                className={`${inputClassName} mt-0`}
              />
              <button
                type="button"
                aria-label={`Remove material ${index + 1}`}
                disabled={materials.fields.length === 1}
                onClick={() => materials.remove(index)}
                className="flex size-8 shrink-0 items-center justify-center text-[#ed7770] transition-colors hover:text-[#c95752] disabled:opacity-30"
              >
                <Minus aria-hidden="true" size={15} strokeWidth={1.8} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => materials.append({ name: '' })}
            className="mt-1 inline-flex h-9 items-center gap-2 rounded-xl border border-dashed border-[#8bb9bb] px-3.5 font-nunito text-sm font-medium text-[#278488] hover:bg-[#f4fafa]"
          >
            <Plus aria-hidden="true" size={15} strokeWidth={1.8} /> Add Material
          </button>
        </div>
      </ActivityFormSection>

      <ActivityFormSection title="Step-by-Step Instructions" icon={ClipboardList}>
        <div className="space-y-4">
          {steps.fields.map((step, index) => (
            <div key={step.id} className="flex gap-3">
              <span className="mt-2 flex size-7 shrink-0 items-center justify-center rounded-full bg-[#edf6f5] font-nunito text-sm font-bold text-[#278488]">
                {index + 1}
              </span>
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    {...form.register(`steps.${index}.title`)}
                    className={`${inputClassName} mt-0`}
                  />
                  <button
                    type="button"
                    aria-label={`Remove step ${index + 1}`}
                    disabled={steps.fields.length === 1}
                    onClick={() => steps.remove(index)}
                    className="flex size-8 shrink-0 items-center justify-center text-[#ed7770] transition-colors hover:text-[#c95752] disabled:opacity-30"
                  >
                    <Minus aria-hidden="true" size={15} strokeWidth={1.8} />
                  </button>
                </div>
                <textarea
                  {...form.register(`steps.${index}.description`)}
                  className={`${textareaClassName} mt-0 h-16`}
                  placeholder="Describe what happens in this step..."
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => steps.append({ title: '', description: '' })}
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
              {...form.register('makeEasier')}
              className={`${textareaClassName} h-20`}
              placeholder="What should the child be able to do after completing this activity?"
            />
          </FormField>
          <FormField label="Make it Harder">
            <textarea
              {...form.register('makeHarder')}
              className={`${textareaClassName} h-20`}
              placeholder="What should the child be able to do after completing this activity?"
            />
          </FormField>
        </div>
      </ActivityFormSection>

      <ActivityFormSection title="Parent Tips" icon={BookOpen}>
        <div className="space-y-5">
          <FormField label="Activity Tips & Modifications">
            <textarea
              {...form.register('parentTips')}
              className={`${textareaClassName} h-20`}
              placeholder="Tips for parents, modifications for different ability levels, therapist recommendations..."
            />
          </FormField>
          <FormField label="Safety Notes">
            <textarea
              {...form.register('safetyNotes')}
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
            control={form.control}
            name="accessLevel"
            render={({ field }) => (
              <div
                role="radiogroup"
                aria-label="Membership access level"
                className="mt-3 grid gap-3 md:grid-cols-3"
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
                      className={`flex h-12 items-center gap-3 rounded-xl border px-4 text-left font-nunito text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f8b8f] ${selected ? 'border-[#2f8b8f] bg-[#eff9f7] text-[#278488]' : `border-[#e1e8e6] bg-white ${isOrange ? 'text-[#b45b32]' : 'text-[#278488]'} hover:border-[#8bb9bb]`}`}
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

      <footer className="flex flex-wrap items-center justify-end gap-3 rounded-[18px] border border-[#e3e9e8] bg-white px-5 py-4 shadow-[0_5px_10px_rgba(38,50,56,0.055)]">
        <button
          type="button"
          onClick={onSaveDraft}
          className="h-10 rounded-xl border border-[#2f8b8f] px-4 font-nunito text-sm font-bold text-[#278488] hover:bg-[#f4fafa]"
        >
          Save as Draft
        </button>
        <button
          type="button"
          onClick={() => toast.info('Preview is coming soon.')}
          className="h-10 rounded-xl border border-[#e1e8e6] px-4 font-nunito text-sm font-bold text-[#607d8b] hover:bg-[#f8fbfa]"
        >
          Preview
        </button>
        <button
          type="submit"
          className="h-10 rounded-xl bg-[#2f7d7e] px-5 font-nunito text-sm font-bold text-white shadow-[inset_0_-2px_0_rgba(0,0,0,0.08)] hover:bg-[#276d6e]"
        >
          Publish
        </button>
      </footer>
    </div>
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
