'use client';

import Image from 'next/image';
import { PenLine, AlertTriangle, User } from 'lucide-react';
import Link from 'next/link';

import { useActiveChild } from '@/features/child-profiles/context/child-profile-detail-context';
import { FieldLabel, SelectField, TextField, ToggleChips } from '@/components/ui/form-fields';

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex min-w-0 flex-col gap-6 rounded-2xl border border-[#EFF1EF] bg-white p-4 sm:p-6 2xl:gap-8 2xl:p-8">
      <div className="flex items-center gap-3">
        <h2 className="font-nunito text-2xl font-semibold leading-8 text-[#263238]">{title}</h2>
      </div>
      <div className="flex flex-col gap-6 sm:gap-8">{children}</div>
    </section>
  );
}

export default function PersonalInformationPage() {
  const { child } = useActiveChild();

  if (!child) return null;

  return (
    <div className="mx-auto mt-8 flex w-full min-w-0 max-w-179.5 flex-col gap-8 pb-12 sm:mt-10 sm:gap-10 2xl:mt-14 2xl:gap-14">
      <div className="flex flex-col gap-6 sm:gap-8">
        <Card title="Basic Information">
          <div className="flex flex-col items-start gap-4 min-[400px]:flex-row min-[400px]:items-center">
            <div className="flex h-16 w-16 shrink-0 overflow-hidden rounded-full bg-[#E5ECE9] shadow-[0_1px_2px_rgba(0,0,0,0.05)] items-center justify-center">
              {child.photoUrl ? (
                <div className="relative h-full w-full">
                  <Image
                    src={child.photoUrl}
                    alt={child.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                    unoptimized={
                      child.photoUrl.startsWith('http') ||
                      child.photoUrl.startsWith('/uploads') ||
                      child.photoUrl.startsWith('data:')
                    }
                  />
                </div>
              ) : (
                <User className="size-8 text-[#7D8488]" />
              )}
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
            defaultValue={child.gender || 'Girl'}
          />

          <div className="flex flex-col gap-1.5">
            <FieldLabel>Age</FieldLabel>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <SelectField
                id="age-years"
                label=""
                placeholder="Select Year"
                options={[
                  '0',
                  '1',
                  '2',
                  '3',
                  '4',
                  '5',
                  '6',
                  '7',
                  '8',
                  '9',
                  '10',
                  '11',
                  '12',
                  '13',
                  '14',
                  '15',
                  '16',
                  '17',
                ]}
                defaultValue={String(child.ageYears ?? child.age ?? 0)}
                hideLabel={true}
              />
              <SelectField
                id="age-months"
                label=""
                placeholder="Select Month"
                options={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']}
                defaultValue={String(child.ageMonths ?? 0)}
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
            defaultValue={child.caregiverName || ''}
          />

          <ToggleChips
            label="Relationship to the child"
            helper=""
            options={['Father', 'Mother', 'Caregiver', 'Grandparent', 'Foster parent', 'Other']}
            initiallySelected={child.caregiverRelationship ? [child.caregiverRelationship] : []}
          />

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-2.5">
            <TextField
              id="email"
              label="Email"
              placeholder="caregiver@example.com"
              type="email"
              defaultValue={child.caregiverEmail || ''}
            />
            <TextField
              id="phone"
              label="Phone"
              placeholder="+1 (555) 000-0000"
              type="tel"
              defaultValue={child.caregiverPhone || ''}
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
            initiallySelected={child.areasOfSupport || []}
          />

          <label htmlFor="goals" className="flex flex-col gap-1.5">
            <FieldLabel optional>Specific Goals or Notes</FieldLabel>
            <textarea
              id="goals"
              placeholder="e.g. Working on pincer grasp, needs help with transitioning between activities..."
              defaultValue={child.notes || ''}
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
            initiallySelected={child.favorites || []}
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
            initiallySelected={child.activityTypes || []}
          />
        </Card>
      </div>

      <div className="flex flex-col gap-3 sm:h-14 sm:flex-row sm:items-center sm:justify-start sm:gap-4">
        <button
          type="button"
          className="flex h-14 w-full items-center justify-center rounded-full bg-[#2F7D7E] px-4 py-2 font-nunito text-base font-medium text-white shadow-[0px_0.6px_0px_0px_#401392,inset_0px_0.7px_2px_0px_#FFFFFF] transition-colors hover:bg-[#276a6b] sm:w-46.75"
        >
          Save Changes
        </button>
        <Link
          href={`/dashboard/child-profiles/${child.id}`}
          className="flex h-14 w-full items-center justify-center rounded-full border border-[#D4D6D7] bg-white px-4 py-2 font-nunito text-base font-medium text-[#14094B] shadow-[0px_0.4px_0px_0px_#2B223C,inset_0px_0.4px_0.5px_0px_rgba(255,255,255,0.75)] transition-colors hover:bg-gray-50 sm:w-30.75"
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
            <p className="pb-1 font-manrope text-xs font-normal leading-4.75 text-[#515B60]">
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
