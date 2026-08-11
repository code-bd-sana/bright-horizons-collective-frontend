'use client';

import Image from 'next/image';

export function Header() {
  return (
    <header
      className="sticky top-0 z-30 flex h-18 items-center justify-between bg-[#fdfdfc] px-10"
      aria-label="Dashboard header"
    >
      <label className="flex h-10 w-110.5 items-center overflow-hidden rounded-lg border border-[#fce9e3] bg-[#fbf6f4] px-5.25 py-4.25 max-md:w-70 max-sm:w-48">
        <Image
          src="/Home/figma-dashboard-header-search.svg"
          alt=""
          width={16}
          height={16}
          className="mr-1.75 shrink-0"
        />
        <input
          type="search"
          aria-label="Search activities, resources, and articles"
          placeholder="Search activities, resources, articles..."
          className="min-w-0 flex-1 bg-transparent font-nunito text-xs font-medium leading-4 text-[#263238] outline-none placeholder:text-[#7d8488]"
        />
      </label>

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Messages"
          className="flex size-10 items-center justify-center overflow-hidden rounded-lg bg-[#e9f1ee] p-1"
        >
          <Image src="/Home/figma-dashboard-header-chat.svg" alt="" width={25} height={24} />
        </button>
        <button
          type="button"
          aria-label="Notifications"
          className="flex size-10 items-center justify-center overflow-hidden rounded-lg bg-[#e9f1ee] p-1"
        >
          <Image
            src="/Home/figma-dashboard-header-notification.svg"
            alt=""
            width={24}
            height={24}
          />
        </button>
        <button
          type="button"
          aria-label="Selected child: Emma, 4 years old"
          className="flex h-10 items-center gap-2.5 overflow-hidden rounded-lg bg-[#d2e3dc] px-2 py-1 max-md:hidden"
        >
          <span className="relative size-7 shrink-0 overflow-hidden rounded-full bg-[#accbcb]">
            <Image
              src="/Home/figma-dashboard-header-child.png"
              alt="Emma"
              fill
              sizes="28px"
              className="object-cover object-[50%_20%]"
            />
          </span>
          <span className="whitespace-nowrap font-nunito text-sm font-medium leading-5 tracking-[-0.084px] text-[#1e282d]">
            Emma · 4y
          </span>
          <Image
            src="/Home/figma-dashboard-header-chevron.svg"
            alt=""
            width={20}
            height={20}
            className="shrink-0"
          />
        </button>
        <button
          type="button"
          aria-label="Account"
          className="relative size-10 shrink-0 overflow-hidden rounded-full bg-[#2f7d7e]"
        >
          <Image
            src="/Home/figma-dashboard-header-avatar.png"
            alt="Sarah Johnson"
            fill
            sizes="40px"
            className="object-cover object-[50%_10%]"
          />
        </button>
      </div>
    </header>
  );
}
