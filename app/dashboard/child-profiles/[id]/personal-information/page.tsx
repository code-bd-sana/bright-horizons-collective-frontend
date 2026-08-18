import Image from 'next/image';
import { PenLine, AlertTriangle } from 'lucide-react';
import { notFound } from 'next/navigation';
import Link from 'next/link';

import { childDetails } from '@/components/dashboard/child-profile-detail/types';
import { FieldLabel, SelectField, TextField, ToggleChips } from '@/components/ui/form-fields';

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
    <div className="mx-auto mt-14 flex w-full max-w-179.5 flex-col gap-14 pb-12">
      <div className="flex flex-col gap-8">
        <Card title="Basic Information">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 overflow-hidden rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
              <div className="relative h-full w-full bg-[#B16262]">
                <Image
                  src={
                    child.id === 'emma' ? '/Home/figma-child-detail-banner-emma.png' : child.image
                  }
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

          <div className="flex flex-col gap-1.5">
            <FieldLabel>Age</FieldLabel>
            <div className="grid grid-cols-2 gap-6">
              <SelectField
                id="age-years"
                label=""
                placeholder="Select Year"
                options={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
                hideLabel={true}
              />
              <SelectField
                id="age-months"
                label=""
                placeholder="Select Month"
                options={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']}
                hideLabel={true}
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
            <TextField
              id="phone"
              label="Phone"
              placeholder="+1 (555) 000-0000"
              type="tel"
              defaultValue="+1 (555) 000-0000"
            />
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

      <div className="flex h-14 flex-row items-center justify-start gap-4">
        <button
          type="button"
          className="flex h-14 w-46.75 items-center justify-center rounded-full bg-[#2F7D7E] px-4 py-2 font-nunito text-base font-medium text-white shadow-[0px_0.6px_0px_0px_#401392,inset_0px_0.7px_2px_0px_#FFFFFF]"
        >
          Save Changes
        </button>
        <Link
          href={`/dashboard/child-profiles/${child.id}`}
          className="flex h-14 w-30.75 items-center justify-center rounded-full border border-[#D4D6D7] bg-white px-4 py-2 font-nunito text-base font-medium text-[#14094B] shadow-[0px_0.4px_0px_0px_#2B223C,inset_0px_0.4px_0.5px_0px_rgba(255,255,255,0.75)] transition-colors hover:bg-gray-50"
        >
          Cancel
        </Link>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-[#F5C6CB] bg-[#FEF6F6] p-5">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#B24B4B]" />
          <div className="flex min-w-0 flex-col gap-1">
            <h3 className="font-nunito text-sm font-semibold leading-5 text-[#263238]">
              Remove this child profile
            </h3>
            <p className="pb-1 font-manrope text-xs font-normal leading-[19.2px] text-[#515B60]">
              This will permanently delete {child.name}&apos;s weekly plan history, activity
              history, progress data, and achievements. This cannot be undone.
            </p>
            <button
              type="button"
              className="w-fit font-manrope text-sm font-semibold leading-5 text-[#B24B4B] underline decoration-[#B24B4B] underline-offset-2 hover:text-[#913b3b]"
            >
              Remove this child
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
