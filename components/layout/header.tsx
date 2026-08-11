'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const notificationDescription =
  'Weekly developmental goal plan for motor skills is now ready for review.';

const todayNotifications = [
  { title: 'New weekly plan available', time: '4 min ago' },
  { title: 'New weekly plan available', time: '4 min ago' },
];

const earlierNotifications = [
  { title: 'Weekly plan Completed', time: 'Yesterday' },
  { title: 'Weekly plan Completed', time: 'Yesterday' },
  { title: 'Weekly plan Completed', time: 'Yesterday' },
  { title: 'Weekly plan Completed', time: 'Yesterday' },
  { title: 'New weekly plan available', time: '4 min ago' },
];

function NotificationItem({
  title,
  time,
  isNew = false,
  allRead,
}: {
  title: string;
  time: string;
  isNew?: boolean;
  allRead: boolean;
}) {
  const highlighted = isNew && !allRead;

  return (
    <article
      className={`flex w-full items-start gap-3 rounded-xl p-3 ${
        highlighted ? 'border border-[#d5e5e5] bg-[#f2f3f3]' : ''
      }`}
    >
      <span
        className={`flex size-8 shrink-0 items-center justify-center rounded-full ${
          highlighted ? 'bg-[#d5e5e5]' : 'bg-[#e8ebe8]'
        }`}
      >
        <Image
          src={
            highlighted
              ? '/Home/figma-dashboard-notification-new.svg'
              : '/Home/figma-dashboard-notification-earlier.svg'
          }
          alt=""
          width={16}
          height={16}
        />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="font-nunito text-sm font-medium leading-5 tracking-[-0.084px] text-[#263238]">
          {title}
        </p>
        <p className="font-manrope text-xs leading-4.5 tracking-[-0.05px] text-[#515b60]">
          {notificationDescription}
        </p>
        <p className="font-manrope text-right text-xs leading-4.5 tracking-[-0.05px] text-[#a8adaf]">
          {time}
        </p>
      </div>
    </article>
  );
}

export function Header() {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [allRead, setAllRead] = useState(false);
  const notificationButtonRef = useRef<HTMLButtonElement>(null);
  const notificationPanelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const closeOnOutsideInteraction = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        !notificationButtonRef.current?.contains(target) &&
        !notificationPanelRef.current?.contains(target)
      ) {
        setNotificationsOpen(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setNotificationsOpen(false);
    };

    if (notificationsOpen) {
      document.addEventListener('mousedown', closeOnOutsideInteraction);
      document.addEventListener('keydown', closeOnEscape);
    }

    return () => {
      document.removeEventListener('mousedown', closeOnOutsideInteraction);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [notificationsOpen]);

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

      <div className="relative flex items-center gap-3">
        <button
          type="button"
          aria-label="Messages"
          className="flex size-10 items-center justify-center overflow-hidden rounded-lg bg-[#e9f1ee] p-1"
        >
          <Image src="/Home/figma-dashboard-header-chat.svg" alt="" width={25} height={24} />
        </button>
        <button
          ref={notificationButtonRef}
          type="button"
          aria-label="Notifications"
          aria-expanded={notificationsOpen}
          onClick={() => setNotificationsOpen((open) => !open)}
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

        {notificationsOpen && (
          <section
            ref={notificationPanelRef}
            className="absolute right-0 top-13 z-50 flex h-160 max-h-[calc(100dvh-100px)] w-115 max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-[#ebebeb] bg-white p-4 shadow-[0_20px_40px_rgba(16,45,97,0.12)]"
            aria-label="Notifications"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-nunito text-base font-medium leading-6 text-[#171717]">
                Notification
              </h2>
              <button
                type="button"
                onClick={() => setAllRead(true)}
                className="font-nunito text-xs font-medium leading-4.5 text-[#2062fc]"
              >
                Mark all as read
              </button>
            </div>

            <div className="mt-2 min-h-0 flex-1 overflow-y-auto pb-4 pr-0.5 scrollbar-none [&::-webkit-scrollbar]:hidden">
              <section>
                <p className="font-nunito text-xs font-medium leading-4 text-[#7d8488]">Today</p>
                <div className="mt-2 flex flex-col gap-2">
                  {todayNotifications.map((notification, index) => (
                    <NotificationItem
                      key={`today-${index}`}
                      {...notification}
                      isNew
                      allRead={allRead}
                    />
                  ))}
                </div>
              </section>
              <section className="mt-3">
                <p className="font-nunito text-xs font-medium leading-4 text-[#515b60]">Earlier</p>
                <div className="mt-2 flex flex-col gap-2">
                  {earlierNotifications.map((notification, index) => (
                    <NotificationItem
                      key={`earlier-${index}`}
                      {...notification}
                      allRead={allRead}
                    />
                  ))}
                </div>
              </section>
            </div>

            <div className="-mx-4 -mb-4 border-t border-[#ebebeb] bg-white p-4">
              <button
                type="button"
                className="flex h-8 w-full items-center justify-center rounded-lg bg-[#d5e5e5] px-3 py-2 font-nunito text-xs font-medium leading-4.5 text-[#2f7d7e]"
              >
                Load More Notifications
              </button>
            </div>
          </section>
        )}
      </div>
    </header>
  );
}
