import Image from 'next/image';
import { PenLine, ChevronDown } from 'lucide-react';
import { notFound } from 'next/navigation';

import { childDetails } from '@/components/dashboard/child-profile-detail/types';
import {
  FieldLabel,
  SelectField,
  TextField,
  ToggleChips,
  inputClassName,
} from '@/components/ui/form-fields';

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-8 rounded-2xl border border-[#EFF1EF] bg-white p-8">
      <div className="flex items-center gap-3">
        <h2 className="font-nunito text-2xl font-semibold leading-8 text-[#263238]">{title}</h2>
      </div>
      <div className="flex flex-col gap-8">{children}</div>
    </section>
  );
}

export default async function PersonalInformationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const child = childDetails[id];

  if (!child) notFound();

  return (
    <div className="mt-6 flex flex-col gap-6 pb-12">
      <Card title="Basic Information">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 overflow-hidden rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <div className="relative h-full w-full bg-[#B16262]">
              <Image
                src={child.id === 'emma' ? '/Home/figma-child-detail-banner-emma.png' : child.image}
                alt=""
                fill
                className="object-cover"
                style={{ objectPosition: child.imagePosition }}
              />
            </div>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 rounded-full border border-[#E2E8E8] px-4 py-2 transition-colors hover:bg-gray-50"
          >
            <PenLine className="h-3.5 w-3.5 text-[#7D8488]" />
            <span className="font-manrope text-sm font-semibold leading-5 text-[#7D8488]">
              Change photo
            </span>
          </button>
        </div>

        <TextField
          id="nickname"
          label="Nickname"
          placeholder="What do you call them?"
          defaultValue={child.name}
        />

        <SelectField
          id="gender"
          label={
            <span className="font-manrope text-lg font-medium leading-6.75 tracking-[-0.015em] text-[#263238]">
              Gender <span className="font-medium text-[#7D8488]">(Optional)</span>
            </span>
          }
          placeholder="e.g. Girl, Boy, Non-binary, Prefer not to say..."
          options={['Girl', 'Boy', 'Non-binary', 'Prefer not to say']}
          defaultValue="Girl"
        />

        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <span className="w-25 shrink-0 font-manrope text-lg font-medium leading-6.75 tracking-[-0.015em] text-[#263238] hidden md:block">
            Age
          </span>
          <div className="grid flex-1 grid-cols-2 gap-6">
            <SelectField
              id="age-years"
              label={
                <span className="font-manrope text-lg font-medium leading-6.75 tracking-[-0.015em] text-[#263238] md:hidden">
                  Age
                </span>
              }
              placeholder="Years"
              options={['1', '2', '3', '4', '5', '6']}
              hideLabel={false}
              defaultValue="4"
            />
            <SelectField
              id="age-months"
              label={<span className="opacity-0 hidden md:block">Months</span>}
              placeholder="Months"
              options={['0', '3', '6', '9']}
              hideLabel={false}
              defaultValue="3"
            />
          </div>
        </div>
      </Card>

      <Card title="Caregiver Information">
        <TextField
          id="caregiver-name"
          label="Name"
          placeholder="First name or nickname"
          defaultValue="Sarah"
        />

        <ToggleChips
          label="Relationship to the child"
          helper=""
          options={['Father', 'Mother', 'Caregiver', 'Grandparent', 'Foster parent', 'Other']}
          initiallySelected={['Mother']}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2.5">
          <TextField
            id="email"
            label="Email"
            placeholder="sarah@example.com"
            type="email"
            defaultValue="sarah@example.com"
          />
          <label htmlFor="phone" className="flex min-w-0 flex-col gap-1.5">
            <FieldLabel>Phone</FieldLabel>
            <span className={`${inputClassName} flex items-center gap-1 px-3.5`}>
              <span className="flex shrink-0 items-center gap-1 pr-2 font-sans text-base text-[#263238]">
                US
                <ChevronDown className="h-4 w-4 text-[#263238]" />
              </span>
              <input
                id="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                defaultValue="+1 (555) 000-0000"
                className="min-w-0 flex-1 bg-transparent font-manrope text-base leading-6 tracking-[-0.176px] text-[#515B60] outline-none placeholder:text-[#A8ADAF]"
              />
            </span>
          </label>
        </div>
      </Card>

      <Card title="Development & Focus">
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
          initiallySelected={['Fine Motor', 'Focus & Attention']}
        />

        <label htmlFor="goals" className="flex flex-col gap-1.5">
          <FieldLabel optional>Specific Goals or Notes</FieldLabel>
          <textarea
            id="goals"
            placeholder="e.g. Working on pincer grasp, needs help with transitioning between activities..."
            defaultValue="Maya responds wonderfully to music during play routines. Enjoys bright colors and tactile textures."
            className="min-h-37.5 w-full resize-y rounded-3xl border border-[#D8DDD9] bg-white px-4 py-3 font-manrope text-base leading-6 tracking-[-0.176px] text-[#515B60] shadow-[0_1px_2px_rgba(16,24,40,0.05)] outline-none transition-colors placeholder:text-[#A8ADAF] focus:border-[#2F7D7E]"
          />
        </label>
      </Card>

      <Card title="Interests & Preferences">
        <ToggleChips
          label="What they love"
          helper="Pick a few favorites to spark weekly ideas"
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
      </Card>
    </div>
  );
}
