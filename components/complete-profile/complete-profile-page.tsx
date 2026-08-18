'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import { useState } from 'react';

import { FieldLabel, SelectField, TextField, ToggleChips } from '@/components/ui/form-fields';

const ASSET_ROOT = '/CompleteProfile/';

const illustrationMasks = {
  main: {
    WebkitMaskImage: `url(${ASSET_ROOT}child-mask-main.svg)`,
    maskImage: `url(${ASSET_ROOT}child-mask-main.svg)`,
  },
  left: {
    WebkitMaskImage: `url(${ASSET_ROOT}child-mask-left.svg)`,
    maskImage: `url(${ASSET_ROOT}child-mask-left.svg)`,
  },
  right: {
    WebkitMaskImage: `url(${ASSET_ROOT}child-mask-right.svg)`,
    maskImage: `url(${ASSET_ROOT}child-mask-right.svg)`,
  },
} satisfies Record<string, CSSProperties>;

function CheckoutProgress() {
  const steps = ['Choose a plan', 'Create Account', 'Payment', 'Complete Profile'];

  return (
    <section
      aria-label="Checkout progress"
      className="border-b border-[#D5E5E5] py-7 min-[900px]:py-10"
    >
      <ol className="hidden items-center justify-center gap-2 min-[900px]:flex">
        {steps.map((label, index) => {
          const complete = index < 3;
          const active = index === 3;

          return (
            <li key={label} className="flex items-center gap-2">
              <div className="flex items-center gap-4">
                <span
                  className="relative flex size-9 shrink-0 items-center justify-center rounded-full bg-[#2F7D7E]"
                  aria-current={active ? 'step' : undefined}
                >
                  {complete ? (
                    <Image
                      src={`${ASSET_ROOT}step-complete.svg`}
                      alt=""
                      width={24}
                      height={24}
                      aria-hidden="true"
                    />
                  ) : (
                    <span className="font-sans text-xl font-semibold leading-8 text-white">4</span>
                  )}
                </span>
                <span
                  className={`font-nunito text-xl font-medium leading-7 whitespace-nowrap ${
                    complete ? 'text-[#2F7D7E]' : 'text-[#263238]'
                  }`}
                >
                  {label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <Image
                  src={`${ASSET_ROOT}step-connector.svg`}
                  alt=""
                  width={124}
                  height={2}
                  aria-hidden="true"
                  className="mx-0.5 h-px w-31"
                />
              )}
            </li>
          );
        })}
      </ol>

      <ol className="grid grid-cols-4 gap-2 min-[900px]:hidden">
        {steps.map((label, index) => (
          <li key={label} className="flex flex-col items-center gap-2 text-center">
            <span
              className="flex size-8 items-center justify-center rounded-full bg-[#2F7D7E] font-sans text-sm font-semibold text-white"
              aria-current={index === 3 ? 'step' : undefined}
            >
              {index < 3 ? '✓' : 4}
            </span>
            <span className="font-nunito text-xs font-medium leading-4 text-[#263238]">
              {label}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function ChildIllustration() {
  return (
    <div
      aria-hidden="true"
      className="relative aspect-1314/688 w-full overflow-hidden rounded-2xl shadow-[0_1px_1.5px_rgba(0,0,0,0.10),0_1px_1px_rgba(0,0,0,0.10)]"
    >
      <div
        className="absolute left-[27.02%] top-[-0.58%] h-[86.66%] w-[45.21%] overflow-hidden"
        style={illustrationMasks.main}
      >
        <Image
          src={`${ASSET_ROOT}child-illustration.png`}
          alt=""
          fill
          sizes="(min-width: 1600px) 594px, 45vw"
          className="object-cover object-[52%_45%]"
        />
      </div>
      <div
        className="absolute left-[4.87%] top-[-0.58%] h-[48.87%] w-[25.49%] overflow-hidden"
        style={illustrationMasks.left}
      >
        <Image
          src={`${ASSET_ROOT}child-illustration.png`}
          alt=""
          fill
          sizes="(min-width: 1600px) 335px, 26vw"
          className="object-cover object-[12%_38%]"
        />
      </div>
      <div
        className="absolute left-[67.73%] top-[45.06%] h-[27.86%] w-[14.54%] overflow-hidden"
        style={illustrationMasks.right}
      >
        <Image
          src={`${ASSET_ROOT}child-illustration.png`}
          alt=""
          fill
          sizes="(min-width: 1600px) 191px, 15vw"
          className="object-cover object-[95%_74%]"
        />
      </div>
    </div>
  );
}

function SectionTitle({ number, children }: { number: number; children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-8 items-center justify-center rounded-full bg-[#8FB9A8] font-sans text-xl font-semibold leading-8 text-white">
        {number}
      </span>
      <h2 className="font-nunito text-2xl font-semibold leading-8 text-[#263238]">{children}</h2>
    </div>
  );
}

function ChildInformation() {
  const relationships = ['Father', 'Mother', 'Caregiver', 'Grandparent', 'Foster parent', 'Other'];
  const [relationship, setRelationship] = useState('Mother');

  return (
    <section className="flex flex-col gap-8" aria-labelledby="child-information-heading">
      <SectionTitle number={1}>
        <span id="child-information-heading">Child Information</span>
      </SectionTitle>
      <div className="flex flex-col gap-6">
        <TextField id="nickname" label="Nickname" placeholder="What do you call them?" />
        <SelectField
          id="gender"
          label="Gender"
          optional
          placeholder="e.g. Girl, Boy, Non-binary, Prefer not to say..."
          options={['Girl', 'Boy', 'Non-binary', 'Prefer not to say']}
        />
        <div className="flex flex-col gap-1.5">
          <FieldLabel>Age</FieldLabel>
          <div className="grid grid-cols-2 gap-6">
            <SelectField
              id="age-years"
              label=""
              placeholder="Years"
              options={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
              hideLabel
            />
            <SelectField
              id="age-months"
              label=""
              placeholder="Months"
              options={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']}
              hideLabel
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p className="font-manrope text-lg leading-6.75 tracking-[-0.27px] text-[#263238]">
            About You
          </p>
          <TextField id="parent-name" label="Your name" placeholder="First name or nickname" />
          <fieldset className="flex flex-col gap-2">
            <legend className="font-manrope text-lg leading-6.75 tracking-[-0.27px] text-[#263238]">
              Your relationship to the child
            </legend>
            <div className="flex flex-wrap gap-2">
              {relationships.map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={relationship === option}
                  onClick={() => setRelationship(option)}
                  className={`rounded-full border px-2.5 py-1.5 font-nunito text-sm font-medium leading-5 tracking-[-0.084px] ${
                    relationship === option
                      ? 'border-[#FCE9E3] bg-[#F2B59F] text-[#493630]'
                      : 'border-[#D4D6D7] bg-white text-[#7D8488]'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </fieldset>
          <div className="grid grid-cols-2 gap-6">
            <TextField id="email" label="Email" placeholder="sarah@example.com" type="email" />
            <TextField id="phone" label="Phone" placeholder="+1 (555) 000-0000" type="tel" />
          </div>
        </div>
      </div>
    </section>
  );
}

function DevelopmentFocus() {
  return (
    <section className="flex flex-col gap-8" aria-labelledby="development-focus-heading">
      <SectionTitle number={2}>
        <span id="development-focus-heading">Development &amp; Focus</span>
      </SectionTitle>
      <div className="flex flex-col gap-8">
        <ToggleChips
          label="Areas of Support"
          helper="Select the developmental areas you'd like to focus on right now."
          options={[
            'Fine Motor',
            'Gross Motor',
            'Language',
            'Social-Emotional',
            'Sensory',
            'Cognitive',
            'Sleep Routines',
            'Focus & Attention',
          ]}
          initiallySelected={['Gross Motor', 'Focus & Attention']}
        />
        <label htmlFor="goals" className="flex flex-col gap-1.5">
          <FieldLabel optional>Specific Goals or Notes</FieldLabel>
          <textarea
            id="goals"
            placeholder="e.g. Working on pincer grasp, needs help with transitioning between activities..."
            className="min-h-28 w-full resize-y rounded-[20px] border border-[#D8DDD9] bg-white px-4 py-2.5 font-manrope text-base leading-6 tracking-[-0.176px] text-[#263238] shadow-[0_1px_2px_rgba(16,24,40,0.05)] outline-none placeholder:text-[#A8ADAF] focus:border-[#2F7D7E]"
          />
        </label>
      </div>
    </section>
  );
}

function InterestsPreferences() {
  return (
    <section className="flex flex-col gap-8" aria-labelledby="interests-heading">
      <SectionTitle number={3}>
        <span id="interests-heading">Interests &amp; Preferences</span>
      </SectionTitle>
      <div className="flex flex-col gap-8">
        <ToggleChips
          label="What they love"
          helper="Pick a few favorites they enjoy"
          options={[
            'Animals',
            'Music',
            'Dinosaurs',
            'Art',
            'Vehicles',
            'Space',
            'Books',
            'Sports',
            'Cooking',
            'Puzzles',
            'Cats',
            'Dogs',
          ]}
          initiallySelected={['Vehicles', 'Sports']}
        />
        <ToggleChips
          label="Preferred Activity Types"
          helper="Choose the styles of play they enjoy most"
          options={[
            'Active',
            'Calming',
            'Creative',
            'Quick',
            'Outdoor Play',
            'Building',
            'Pretend Play',
            'Science Experiments',
          ]}
          initiallySelected={['Active', 'Outdoor Play']}
        />
        <div className="flex flex-wrap items-center gap-6">
          <button
            type="button"
            className="flex h-11 items-center gap-2 rounded-full border border-dashed border-[#F2B59F] bg-[#FBF9F9] px-3.5 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-[#F2B59F]"
          >
            <Image src={`${ASSET_ROOT}plus.svg`} alt="" width={16} height={16} aria-hidden="true" />
            Add another child
          </button>
          <button
            type="button"
            className="font-manrope text-base leading-6 tracking-[-0.176px] text-[#263238]"
          >
            Skip for now
          </button>
        </div>
      </div>
    </section>
  );
}

export function CompleteProfilePage() {
  return (
    <main className="bg-[#FFFDF8] pt-40 text-[#263238] min-[1600px]:pt-73 min-[1600px]:pb-60">
      <div className="mx-auto flex w-full max-w-365.5 flex-col gap-12 px-5 sm:px-8 min-[900px]:gap-20 min-[1600px]:min-h-[3192px] min-[1600px]:px-0">
        <div className="flex flex-col items-center gap-12 rounded-3xl border border-[#E8EBE8] bg-white p-5 shadow-[0_1px_1.5px_rgba(0,0,0,0.10),0_1px_1px_rgba(0,0,0,0.10)] min-[900px]:gap-20 min-[900px]:p-10 min-[1600px]:p-20">
          <div className="w-full">
            <CheckoutProgress />
          </div>
          <div className="flex w-full flex-col items-center gap-8">
            <ChildIllustration />
            <div className="flex flex-col items-center gap-3 text-center">
              <h1 className="font-nunito text-[32px] font-medium leading-10 tracking-[-0.16px] text-[#174A4D] min-[900px]:text-[40px] min-[900px]:leading-12 min-[900px]:tracking-[-0.4px]">
                Let&apos;s Get to Know Your Child
              </h1>
              <p className="font-manrope text-base leading-6 tracking-[-0.176px] text-[#515B60]">
                This information helps us personalize activities, weekly plans, and recommendations
              </p>
            </div>
          </div>
          <div className="flex w-full max-w-179.5 flex-col gap-16">
            <ChildInformation />
            <DevelopmentFocus />
            <InterestsPreferences />
          </div>
        </div>
        <div className="flex flex-col gap-4 min-[900px]:flex-row min-[900px]:gap-4">
          <Link
            href="/payment"
            className="flex h-14 w-full items-center justify-center gap-2 rounded-[32px] border border-[#D4D6D7] bg-white px-4 py-2 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-[#14094B] min-[900px]:w-80"
          >
            <Image
              src={`${ASSET_ROOT}arrow-left.svg`}
              alt=""
              width={20}
              height={20}
              aria-hidden="true"
            />
            Go back
          </Link>
          <Link
            href="/review-submit"
            className="flex h-14 flex-1 items-center justify-center gap-1 rounded-[32px] border border-[#D5E5E5] bg-[#2F7D7E] px-4 py-2 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-white"
          >
            Review &amp; Complete Setup
            <Image
              src={`${ASSET_ROOT}arrow-up-right.svg`}
              alt=""
              width={16}
              height={16}
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </main>
  );
}

export default CompleteProfilePage;
