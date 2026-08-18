'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { ChildDetail } from './types';

const getTabs = (id: string) => [
  {
    label: 'Overview',
    icon: '/Home/figma-child-detail-tab-overview.svg',
    path: `/dashboard/child-profiles/${id}`,
  },
  {
    label: 'Personal Information',
    icon: '/Home/figma-child-detail-tab-personal.svg',
    path: `/dashboard/child-profiles/${id}/personal-information`,
  },
  {
    label: 'Development Progress',
    icon: '/Home/figma-child-detail-tab-progress.svg',
    path: `/dashboard/child-profiles/${id}/development-progress`,
  },
  {
    label: 'Activity History',
    icon: '/Home/figma-child-detail-tab-history.svg',
    path: `/dashboard/child-profiles/${id}/activity-history`,
  },
  {
    label: 'Reports',
    icon: '/Home/figma-child-detail-tab-reports.svg',
    path: `/dashboard/child-profiles/${id}/reports`,
  },
];

export function ProfileHeader({ child }: { child: ChildDetail }) {
  const pathname = usePathname();
  const tabs = getTabs(child.id);

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex h-5.5 items-center gap-1.5 font-manrope text-sm leading-5.5 tracking-[-0.084px]">
        <Link href="/dashboard/child-profiles" className="text-[#2f7d7e]">
          Child Profiles
        </Link>
        <span className="text-lg leading-5.5 tracking-[-0.27px] text-[#d8ddd9]">/</span>
        <span className="text-[#263238]">{child.name}</span>
      </div>

      <nav className="w-full rounded-2xl border-b border-[#d8ddd9] bg-white p-4 shadow-[-46px_61px_10.5px_rgba(171,171,171,0),-29px_39px_10px_rgba(171,171,171,0.01),-17px_22px_8.5px_rgba(171,171,171,0.03),-7px_10px_6px_rgba(171,171,171,0.04),-2px_2px_3.5px_rgba(171,171,171,0.05)]">
        <div className="flex items-center gap-3 overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = pathname === tab.path;
            return (
              <Link
                key={tab.label}
                href={tab.path}
                className={`flex h-9 shrink-0 items-center gap-2 rounded-xl px-3 py-2 font-manrope text-sm leading-5.5 tracking-[-0.084px] ${
                  isActive ? 'bg-[#515b60] text-white' : 'text-[#515b60] hover:bg-gray-50'
                }`}
              >
                <Image src={tab.icon} alt="" width={20} height={20} />
                {tab.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <section className="relative flex min-h-43.5 w-full items-start justify-between gap-8 overflow-hidden rounded-2xl border border-[#fce9e3] bg-[#fffdf8] p-8">
        <Image
          src="/Home/figma-child-detail-banner-background.svg"
          alt=""
          width={1893}
          height={1454}
          className="pointer-events-none absolute -left-8 -top-136 z-0 max-w-none"
        />
        <Image
          src="/Home/figma-child-detail-banner-wave.svg"
          alt=""
          width={358}
          height={344}
          className="pointer-events-none absolute left-[40%] -top-77 z-0 rotate-[-131.21deg] opacity-70"
        />
        <Image
          src="/Home/figma-child-detail-banner-squiggle-right.svg"
          alt=""
          width={358}
          height={344}
          className="pointer-events-none absolute -right-12 top-6 z-0 rotate-[-34.13deg] opacity-70"
        />
        <Image
          src="/Home/figma-child-detail-banner-squiggle-left.svg"
          alt=""
          width={358}
          height={344}
          className="pointer-events-none absolute -bottom-36 -left-16 z-0 rotate-[-33.09deg] opacity-70"
        />

        <div className="relative z-10 flex items-center gap-4">
          <span className="flex size-25 shrink-0 items-center justify-center rounded-2xl border border-[#d5e5e5] bg-white p-2.5 shadow-[0_1px_1.5px_rgba(0,0,0,0.1),0_1px_1px_rgba(0,0,0,0.1)]">
            <span className="relative size-20 overflow-hidden rounded-2xl bg-[#b16262] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
              <Image
                src={child.id === 'emma' ? '/Home/figma-child-detail-banner-emma.png' : child.image}
                alt={child.name}
                fill
                sizes="80px"
                className="object-cover"
                style={{ objectPosition: child.imagePosition }}
              />
            </span>
          </span>
          <div className="flex w-94.75 flex-col gap-2">
            <span className="w-fit rounded-full border border-[#accbcb] px-2.25 py-1.25 font-nunito text-xs font-medium leading-4 text-[#2f7d7e]">
              Fine Motor
            </span>
            <div className="flex items-center gap-2">
              <h1 className="font-nunito text-[32px] font-medium leading-10 tracking-[-0.16px] text-[#263238]">
                {child.name}
              </h1>
              <span className="rounded-full border border-[#accbcb] bg-[#d5e5e5] px-2.25 py-1.25 font-nunito text-xs font-medium leading-4 text-[#2f7d7e]">
                {child.age}
              </span>
            </div>
            <p className="font-manrope text-xs leading-4.5 text-[#7d8488]">
              <span className="text-[#1e282d]">Current focus:</span>{' '}
              {child.focus.replace('Current focus: ', '')}
            </p>
          </div>
        </div>

        <div className="relative z-10 flex shrink-0 items-center gap-4">
          <button
            type="button"
            className="flex items-center gap-1 rounded-full border border-[#d8ddd9] bg-white px-3 py-2 font-nunito text-sm font-medium leading-6 tracking-[-0.176px] text-[#2f7d7e] shadow-[inset_0_-6px_2px_rgba(255,255,255,0.07)]"
          >
            <Image src="/Home/figma-child-detail-edit.svg" alt="" width={16} height={16} />
            Edit Profile
          </button>
          <Link
            href="/dashboard/child-profiles"
            className="flex items-center gap-1 rounded-full border border-[#d8ddd9] bg-white px-3 py-2 font-nunito text-sm font-medium leading-6 tracking-[-0.176px] text-[#2f7d7e] shadow-[inset_0_-6px_2px_rgba(255,255,255,0.07)]"
          >
            <Image src="/Home/figma-child-detail-switch.svg" alt="" width={16} height={16} />
            Switch Child
          </Link>
        </div>
      </section>
    </div>
  );
}
