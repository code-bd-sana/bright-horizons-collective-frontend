'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

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
  const router = useRouter();
  const tabs = getTabs(child.id);
  const activeTab = tabs.find((tab) => tab.path === pathname) ?? tabs[0];

  return (
    <div className="flex w-full flex-col gap-4 sm:gap-5">
      <div className="flex min-h-5.5 flex-wrap items-center gap-1.5 font-manrope text-sm leading-5.5 tracking-[-0.084px]">
        <Link href="/dashboard/child-profiles" className="text-[#2f7d7e]">
          Child Profiles
        </Link>
        <span className="text-lg leading-5.5 tracking-[-0.27px] text-[#d8ddd9]">/</span>
        <span className="text-[#263238]">{child.name}</span>
      </div>

      <nav className="w-full rounded-2xl border-b border-[#d8ddd9] bg-white p-2 shadow-[-46px_61px_10.5px_rgba(171,171,171,0),-29px_39px_10px_rgba(171,171,171,0.01),-17px_22px_8.5px_rgba(171,171,171,0.03),-7px_10px_6px_rgba(171,171,171,0.04),-2px_2px_3.5px_rgba(171,171,171,0.05)] sm:p-4">
        <label className="relative block sm:hidden">
          <span className="sr-only">Profile section</span>
          <Image
            src={activeTab.icon}
            alt=""
            width={20}
            height={20}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
          />
          <select
            aria-label="Profile section"
            className="h-11 w-full appearance-none rounded-xl border border-[#d8ddd9] bg-white py-2 pl-10 pr-10 font-manrope text-sm text-[#263238] outline-none focus:border-[#2f7d7e]"
            onChange={(event) => router.push(event.target.value)}
            value={activeTab.path}
          >
            {tabs.map((tab) => (
              <option key={tab.path} value={tab.path}>
                {tab.label}
              </option>
            ))}
          </select>
          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-[#515b60]"
            strokeWidth={1.5}
          />
        </label>
        <div className="hidden items-center gap-2 overflow-x-auto sm:flex 2xl:gap-3">
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
                <Image
                  src={tab.icon}
                  alt=""
                  width={20}
                  height={20}
                  className={isActive ? 'brightness-0 invert' : ''}
                />
                {tab.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {pathname === `/dashboard/child-profiles/${child.id}` && (
        <section className="relative flex min-h-43.5 w-full flex-col gap-6 overflow-hidden rounded-2xl border border-[#fce9e3] bg-[#fffdf8] p-4 sm:p-6 2xl:flex-row 2xl:items-start 2xl:justify-between 2xl:gap-8 2xl:p-8">
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

          <div className="relative z-10 flex min-w-0 flex-col items-start gap-3 min-[420px]:flex-row min-[420px]:items-center sm:gap-4">
            <span className="flex size-20 shrink-0 items-center justify-center rounded-2xl border border-[#d5e5e5] bg-white p-2 shadow-[0_1px_1.5px_rgba(0,0,0,0.1),0_1px_1px_rgba(0,0,0,0.1)] sm:size-25 sm:p-2.5">
              <span className="relative size-16 overflow-hidden rounded-2xl bg-[#b16262] shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:size-20">
                <Image
                  src={
                    child.id === 'emma' ? '/Home/figma-child-detail-banner-emma.png' : child.image
                  }
                  alt={child.name}
                  fill
                  sizes="(max-width: 639px) 64px, 80px"
                  className="object-cover"
                  style={{ objectPosition: child.imagePosition }}
                />
              </span>
            </span>
            <div className="flex min-w-0 flex-col gap-2 sm:w-94.75">
              <span className="w-fit rounded-full border border-[#accbcb] px-2.25 py-1.25 font-nunito text-xs font-medium leading-4 text-[#2f7d7e]">
                Fine Motor
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-nunito text-2xl font-medium leading-8 tracking-[-0.16px] text-[#263238] sm:text-[32px] sm:leading-10">
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

          <div className="relative z-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
            <Link
              href={`/dashboard/child-profiles/${child.id}/personal-information`}
              className="flex w-full items-center justify-center gap-1 rounded-full border border-[#d8ddd9] bg-white px-3 py-2 font-nunito text-sm font-medium leading-6 tracking-[-0.176px] text-[#2f7d7e] shadow-[inset_0_-6px_2px_rgba(255,255,255,0.07)] sm:w-auto"
            >
              <Image src="/Home/figma-child-detail-edit.svg" alt="" width={16} height={16} />
              Edit Profile
            </Link>
            <Link
              href="/dashboard/child-profiles"
              className="flex w-full items-center justify-center gap-1 rounded-full border border-[#d8ddd9] bg-white px-3 py-2 font-nunito text-sm font-medium leading-6 tracking-[-0.176px] text-[#2f7d7e] shadow-[inset_0_-6px_2px_rgba(255,255,255,0.07)] sm:w-auto"
            >
              <Image src="/Home/figma-child-detail-switch.svg" alt="" width={16} height={16} />
              Switch Child
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
