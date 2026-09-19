'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Loader2, User } from 'lucide-react';
import { useChildProfiles } from '@/features/child-profiles/hooks/child-profiles.queries';
import type { ChildProfile } from '@/features/child-profiles/model/child-profile.types';

function formatChildAge(child: ChildProfile): string {
  if (child.ageYears > 0 && child.ageMonths > 0) {
    return `${child.ageYears} yr ${child.ageMonths} mo`;
  }
  if (child.ageYears > 0) {
    return `${child.ageYears} yr`;
  }
  if (child.ageMonths > 0) {
    return `${child.ageMonths} mo`;
  }
  if (child.age > 0) {
    return `${child.age} yr`;
  }
  return 'Age not specified';
}

function ChildCard({ child, selected = false }: { child: ChildProfile; selected?: boolean }) {
  const focusLabel = child.areasOfSupport?.[0] || child.developmentalStage || 'Development';
  const focusDetail =
    child.notes?.trim() ||
    (child.areasOfSupport?.length > 1
      ? `Focusing on ${child.areasOfSupport.join(', ')}`
      : `Supporting ${focusLabel.toLowerCase()} through daily activities`);

  const avatarSrc = child.photoUrl;

  return (
    <article
      className={`flex min-w-0 flex-1 flex-col gap-4 rounded-2xl border bg-white p-4 2xl:min-h-90 2xl:p-6 transition-shadow hover:shadow-md ${
        selected ? 'border-[#8fb9a8]' : 'border-[#e8ebe8]'
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="flex size-13 shrink-0 items-center justify-center rounded-2xl border border-[#d5e5e5] bg-white shadow-[0_1px_1.5px_rgba(0,0,0,0.1),0_1px_1px_rgba(0,0,0,0.1)]">
          <span className="relative flex size-12 items-center justify-center overflow-hidden rounded-2xl bg-[#E5ECE9] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            {avatarSrc ? (
              <Image
                src={avatarSrc}
                alt={child.name}
                fill
                sizes="48px"
                className="object-cover"
                unoptimized={avatarSrc.startsWith('http') || avatarSrc.startsWith('/uploads')}
              />
            ) : (
              <User className="size-6 text-[#7D8488]" />
            )}
          </span>
        </span>
        <div className="flex flex-col">
          <h2 className="font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-[#263238]">
            {child.name}
          </h2>
          <p className="font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#7d8488]">
            {formatChildAge(child)}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <span className="w-fit rounded-full border border-[#accbcb] bg-[#d5e5e5] px-2.25 py-1.25 font-nunito text-xs font-medium leading-4 text-[#2f7d7e]">
          {focusLabel}
        </span>
        <p className="font-manrope text-xs leading-4.5 text-[#7d8488] line-clamp-2">
          <span className="text-[#1e282d] font-medium">Current focus:</span> {focusDetail}
        </p>
      </div>

      <div>
        <div className="flex items-center justify-between font-manrope text-xs leading-4 text-[#7d8488]">
          <span>This week</span>
          <span className="font-medium text-[#263238]">Active</span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#f2f5f5]">
          <div className="h-full rounded-full bg-[#2f7d7e]" style={{ width: '40%' }} />
        </div>
      </div>

      <Link
        href={`/dashboard/child-profiles/${child.id}`}
        className="mt-auto flex h-10 w-full items-center justify-center gap-1 rounded-full border border-[#d8ddd9] bg-white px-3 py-2 font-nunito text-sm font-medium leading-6 tracking-[-0.176px] text-[#2f7d7e] transition-colors hover:bg-[#f8fbfa]"
      >
        View Profile
        <Image src="/Home/figma-child-profiles-arrow.svg" alt="" width={16} height={16} />
      </Link>
    </article>
  );
}

export function ChildProfilesPage() {
  const { data: children = [], isLoading } = useChildProfiles();

  const summaryCards = [
    {
      value: String(children.length),
      label: children.length === 1 ? 'Child' : 'Children',
      icon: '/Home/figma-child-profiles-children.svg',
    },
    {
      value: String(children.length),
      label: 'Active weekly plans',
      icon: '/Home/figma-child-profiles-plans.svg',
    },
    {
      value: '5',
      label: 'Activities this week',
      icon: '/Home/figma-child-profiles-activities.svg',
    },
  ];

  return (
    <section className="mx-auto flex w-full min-w-0 max-w-382.25 flex-col gap-4 sm:gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div>
          <h1 className="font-nunito text-2xl font-medium leading-8 text-[#272f3a]">
            Child Profiles
          </h1>
          <p className="mt-1 font-manrope text-xs leading-4.5 text-[#7d8488]">
            Select a profile to view their developmental journey.
          </p>
        </div>
        <Link
          href="/dashboard/child-profiles/add-child"
          className="flex h-10 w-full items-center justify-center gap-1 rounded-full border border-[#accbcb] bg-linear-to-b from-[#2f7d7e]/60 to-[#2f7d7e] px-4 py-2 font-nunito text-sm font-medium leading-5 tracking-[-0.084px] text-[#f8fafc] shadow-[inset_0_-6px_2px_rgba(255,255,255,0.07)] transition-opacity hover:opacity-95 sm:w-auto"
        >
          <span className="text-base leading-4">+</span>
          Add Child
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 2xl:gap-6">
        {summaryCards.map((card) => (
          <article
            key={card.label}
            className="rounded-2xl border border-[#f7ebe8] bg-[#faf6f4] p-4"
          >
            <Image
              src={card.icon}
              alt=""
              width={16}
              height={16}
              className="mb-3 flex size-8 rounded-lg border border-[#fafafa] bg-white p-2"
            />
            <p className="font-nunito text-2xl font-medium leading-8 text-[#272f3a]">
              {card.value}
            </p>
            <p className="font-manrope text-xs font-medium leading-4.5 tracking-[0.48px] text-[#515b60]">
              {card.label}
            </p>
          </article>
        ))}
      </div>

      {isLoading ? (
        <div className="flex min-h-60 items-center justify-center rounded-2xl border border-[#e8ebe8] bg-white p-8">
          <Loader2 className="size-8 animate-spin text-[#2f7d7e]" />
        </div>
      ) : children.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 2xl:gap-6">
          {children.map((child, index) => (
            <ChildCard key={child.id} child={child} selected={index === 0} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-70 flex-col items-center justify-center rounded-2xl border border-dashed border-[#accbcb] bg-white p-8 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-[#f0f7f5] text-[#2f7d7e]">
            <User className="size-7" />
          </div>
          <h2 className="mt-4 font-nunito text-xl font-semibold text-[#263238]">
            No child profiles yet
          </h2>
          <p className="mt-1 max-w-md font-manrope text-sm text-[#7d8488]">
            Add a child profile to get personalized activity recommendations and track developmental
            milestones.
          </p>
          <Link
            href="/dashboard/child-profiles/add-child"
            className="mt-6 flex h-10 items-center justify-center gap-1 rounded-full bg-[#2f7d7e] px-5 py-2 font-nunito text-sm font-medium text-white transition-colors hover:bg-[#276a6b]"
          >
            + Add First Child
          </Link>
        </div>
      )}
    </section>
  );
}

export default ChildProfilesPage;
