'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Bell, Menu, MessageCircle } from 'lucide-react';
import type { DemoRole } from '@/lib/demo-session';
import { getRoleConfig } from '@/lib/role-config';
import { useAppStore } from '@/store/use-app-store';

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

type MessageThread = {
  initial: string;
  tone: string;
  name: string;
  time: string;
  message: string;
};

type ChildProfile = {
  name: string;
  age: string;
  image: string;
  imagePosition: string;
};

const childProfiles: ChildProfile[] = [
  {
    name: 'Emma',
    age: '4 yr 3 mo',
    image: '/Home/figma-dashboard-switch-emma-4.png',
    imagePosition: '50% 26%',
  },
  {
    name: 'Emma',
    age: '3 yr 3 mo',
    image: '/Home/figma-dashboard-switch-emma-3.png',
    imagePosition: '50% 25%',
  },
];

const unreadThreads: MessageThread[] = [
  {
    initial: 'J',
    tone: 'bg-[#2f7d7e]',
    name: 'Jaicy, OT',
    time: '4:14 pm',
    message: 'Great progress on fine motor this week! I’ve updated her plan for next week...',
  },
  {
    initial: 'S',
    tone: 'bg-[#8fb9a8]',
    name: 'Support Team',
    time: '2:14 pm',
    message: 'Your membership renews on August 3rd. Here’s what’s changing...',
  },
];

const recentThreads: MessageThread[] = [
  {
    initial: 'J',
    tone: 'bg-[#2f7d7e]',
    name: 'Jaicy, OT',
    time: 'Jul 10',
    message: 'Quick note on Leo’s gross motor goals before our next check-in...',
  },
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
      className={`flex w-full items-start gap-3 rounded-xl p-3 ${highlighted ? 'border border-[#d5e5e5] bg-[#f2f3f3]' : ''}`}
    >
      <span
        className={`flex size-8 shrink-0 items-center justify-center rounded-full ${highlighted ? 'bg-[#d5e5e5]' : 'bg-[#e8ebe8]'}`}
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

function MessageItem({ thread, unread = false }: { thread: MessageThread; unread?: boolean }) {
  return (
    <article
      className={`flex w-full items-start gap-4 rounded-2xl p-4 ${unread ? 'border border-[#d5e5e5] bg-[#f2f3f3]' : ''}`}
    >
      <span
        className={`flex size-10 shrink-0 items-center justify-center rounded-full font-nunito text-sm font-bold leading-5 text-white ${thread.tone}`}
      >
        {thread.initial}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-center justify-between gap-3">
          <p className="truncate font-manrope text-base leading-6 tracking-[-0.176px] text-[#272f3a]">
            {thread.name}
          </p>
          <p className="shrink-0 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#848d9b]">
            {thread.time}
          </p>
        </div>
        <p className="font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#6c7787]">
          {thread.message}
        </p>
      </div>
    </article>
  );
}

function ChildProfileOption({
  profile,
  selected,
  onSelect,
}: {
  profile: ChildProfile;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={`flex h-23 w-full items-center justify-between rounded-2xl p-3 text-left ${
        selected ? 'border border-[#8fb9a8] bg-[#f2f3f3]' : 'bg-white'
      }`}
    >
      <span className="flex items-start gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-[#d5e5e5] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.1)]">
          <span className="relative size-9 overflow-hidden rounded-[10px] bg-[#b16262] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
            <Image
              src={profile.image}
              alt=""
              fill
              sizes="36px"
              className="object-cover"
              style={{ objectPosition: profile.imagePosition }}
            />
          </span>
        </span>
        <span className="flex flex-col">
          <span className="font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-[#263238]">
            {profile.name}
          </span>
          <span className="font-manrope text-xs leading-4.5 text-[#7d8488]">({profile.age})</span>
        </span>
      </span>
      {selected ? (
        <span className="flex size-7.5 items-center justify-center rounded-full border-2 border-[#2f7d7e] bg-[#2f7d7e] p-0.5">
          <Image
            src="/Home/figma-dashboard-switch-check.svg"
            alt="Selected"
            width={20}
            height={20}
          />
        </span>
      ) : (
        <span className="size-7.5 rounded-full border-2 border-[#d4d6d7] bg-white" />
      )}
    </button>
  );
}

export function Header({ role = 'parent' }: { role?: DemoRole }) {
  const { setSidebarOpen } = useAppStore();
  const pathname = usePathname();
  const router = useRouter();
  const roleConfig = getRoleConfig(role);
  const isAdmin = role === 'admin';
  const isAdminDashboard = pathname === '/dashboard/admin';
  const isMessagesPage =
    pathname === '/dashboard/messages' || pathname === '/dashboard/admin/messages';
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [messagesOpen, setMessagesOpen] = useState(false);
  const [profilesOpen, setProfilesOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(0);
  const [allRead, setAllRead] = useState(false);
  const notificationButtonRef = useRef<HTMLButtonElement>(null);
  const notificationPanelRef = useRef<HTMLElement>(null);
  const messagesButtonRef = useRef<HTMLButtonElement>(null);
  const messagesPanelRef = useRef<HTMLElement>(null);
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  const profilesPanelRef = useRef<HTMLElement>(null);
  const accountButtonRef = useRef<HTMLButtonElement>(null);
  const accountPanelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const closeOnOutsideInteraction = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        !notificationButtonRef.current?.contains(target) &&
        !notificationPanelRef.current?.contains(target) &&
        !messagesButtonRef.current?.contains(target) &&
        !messagesPanelRef.current?.contains(target) &&
        !profileButtonRef.current?.contains(target) &&
        !profilesPanelRef.current?.contains(target) &&
        !accountButtonRef.current?.contains(target) &&
        !accountPanelRef.current?.contains(target)
      ) {
        setNotificationsOpen(false);
        setMessagesOpen(false);
        setProfilesOpen(false);
        setAccountOpen(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setNotificationsOpen(false);
        setMessagesOpen(false);
        setProfilesOpen(false);
        setAccountOpen(false);
      }
    };

    if (notificationsOpen || messagesOpen || profilesOpen || accountOpen) {
      document.addEventListener('mousedown', closeOnOutsideInteraction);
      document.addEventListener('keydown', closeOnEscape);
    }

    return () => {
      document.removeEventListener('mousedown', closeOnOutsideInteraction);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [accountOpen, messagesOpen, notificationsOpen, profilesOpen]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' });
    router.push('/login');
  };

  return (
    <header
      className={`z-30 grid h-16 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 px-4 sm:gap-3 sm:px-6 lg:px-6 xl:px-10 ${
        isAdminDashboard
          ? 'absolute inset-x-0 top-0 h-22 bg-transparent'
          : `sticky top-0 bg-[#fdfdfc] ${isAdmin ? 'h-22' : 'sm:h-18'}`
      }`}
      aria-label="Dashboard header"
    >
      <button
        type="button"
        aria-label="Open navigation"
        onClick={() => setSidebarOpen(true)}
        className="col-start-1 flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#e9f1ee] text-[#2f7d7e] lg:hidden"
      >
        <Menu size={22} strokeWidth={1.7} />
      </button>
      {isMessagesPage || isAdminDashboard ? (
        <span className="col-start-2 min-w-0" aria-hidden="true" />
      ) : (
        <label className="col-start-2 flex h-10 min-w-0 items-center overflow-hidden rounded-lg border border-[#fce9e3] bg-[#fbf6f4] px-3 py-3 sm:px-5.25 sm:py-4.25 lg:max-w-110.5">
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
      )}

      <div className="relative col-start-3 flex shrink-0 items-center gap-2 sm:gap-3">
        <button
          ref={messagesButtonRef}
          type="button"
          aria-label="Messages"
          aria-expanded={messagesOpen}
          onClick={() => {
            setMessagesOpen((open) => !open);
            setNotificationsOpen(false);
            setProfilesOpen(false);
            setAccountOpen(false);
          }}
          className="hidden size-10 items-center justify-center overflow-hidden rounded-lg bg-[#e9f1ee] p-1 sm:flex"
        >
          <span className="relative flex size-6 items-center justify-center text-[#27494e]">
            <MessageCircle aria-hidden="true" size={22} strokeWidth={1.7} />
            <span className="absolute right-0.5 top-0.5 size-1.5 rounded-full bg-[#d4484a]" />
          </span>
        </button>
        <button
          ref={notificationButtonRef}
          type="button"
          aria-label="Notifications"
          aria-expanded={notificationsOpen}
          onClick={() => {
            setNotificationsOpen((open) => !open);
            setMessagesOpen(false);
            setProfilesOpen(false);
            setAccountOpen(false);
          }}
          className="flex size-10 items-center justify-center overflow-hidden rounded-lg bg-[#e9f1ee] p-1"
        >
          <span className="relative flex size-6 items-center justify-center text-[#27494e]">
            <Bell aria-hidden="true" size={22} strokeWidth={1.7} />
            <span className="absolute right-0.5 top-0.5 size-1.5 rounded-full bg-[#d4484a]" />
          </span>
        </button>
        {roleConfig.header.showChildProfile && (
          <button
            ref={profileButtonRef}
            type="button"
            aria-label="Selected child: Emma, 4 years old"
            aria-expanded={profilesOpen}
            onClick={() => {
              setProfilesOpen((open) => !open);
              setMessagesOpen(false);
              setNotificationsOpen(false);
              setAccountOpen(false);
            }}
            className="hidden h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-[#d2e3dc] p-1 lg:flex xl:w-auto xl:justify-start xl:gap-2.5 xl:px-2"
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
            <span className="hidden whitespace-nowrap font-nunito text-sm font-medium leading-5 tracking-[-0.084px] text-[#1e282d] xl:inline">
              {childProfiles[selectedProfile].name} · {selectedProfile === 0 ? '4y' : '3y'}
            </span>
            <Image
              src="/Home/figma-dashboard-header-chevron.svg"
              alt=""
              width={20}
              height={20}
              className="hidden shrink-0 xl:block"
            />
          </button>
        )}
        <button
          ref={accountButtonRef}
          type="button"
          aria-label="Account"
          aria-expanded={accountOpen}
          onClick={() => {
            setAccountOpen((open) => !open);
            setMessagesOpen(false);
            setNotificationsOpen(false);
            setProfilesOpen(false);
          }}
          className="relative size-10 shrink-0 overflow-hidden rounded-full bg-[#2f7d7e]"
        >
          <Image
            alt={roleConfig.profile.name}
            fill
            sizes="40px"
            className={roleConfig.profile.imageClassName}
            src={roleConfig.profile.image}
          />
        </button>

        {accountOpen && (
          <section
            ref={accountPanelRef}
            className="absolute right-0 top-13 z-50 w-85.5 max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl bg-white p-4 shadow-[0_2px_19px_1px_rgba(39,69,67,0.04),0_2px_6px_rgba(30,36,44,0.11)]"
            aria-label="Account menu"
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-2.5">
                <span className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-[#d8ddd9] bg-[#2f7d7e] p-0.5">
                  <span className="relative size-full overflow-hidden rounded-full">
                    <Image
                      alt={roleConfig.profile.name}
                      fill
                      sizes="52px"
                      className={roleConfig.profile.imageClassName}
                      src={roleConfig.profile.image}
                    />
                  </span>
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <p className="font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-[#263238]">
                    {roleConfig.profile.name}
                  </p>
                  <p className="truncate font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#7d8488]">
                    {roleConfig.header.accountEmail}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {!isAdmin && (
                  <div className="rounded-xl border-2 border-transparent bg-[linear-gradient(175.51deg,#fff_24.82%,#fbded5_128.91%,#fad6cb_202.39%,#f9d0c3_291.18%,#f6bdab_343.23%)] p-4">
                    <p className="font-manrope text-[10px] font-medium uppercase leading-3.75 tracking-[0.2px] text-[#515b60]">
                      Current Plan
                    </p>
                    <p className="mt-1 font-nunito text-lg font-semibold leading-6 tracking-[-0.27px] text-[#263238]">
                      Grow Together
                    </p>
                    <p className="mt-1 font-manrope text-xs leading-4.5 text-[#515b60]">
                      Renews Aug 1, 2026
                    </p>
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  {roleConfig.header.accountMenuItems.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      className="flex h-10 items-center gap-2 px-2 py-2.5 text-left font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#515b60]"
                    >
                      <Image src={item.icon} alt="" width={20} height={20} className="shrink-0" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>

                <Image
                  src="/Home/figma-dashboard-profile-divider.svg"
                  alt=""
                  width={310}
                  height={1}
                  className="h-px w-full"
                />

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex h-10 items-center justify-between px-2 py-2.5 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#515b60]"
                >
                  <span>Sign Out</span>
                  <Image
                    src="/Home/figma-dashboard-profile-logout.svg"
                    alt=""
                    width={18}
                    height={18}
                  />
                </button>
              </div>
            </div>
          </section>
        )}

        {profilesOpen && (
          <section
            ref={profilesPanelRef}
            className="absolute right-0 top-13 z-50 w-100 max-w-[calc(100vw-2rem)] rounded-2xl border border-[#ebebeb] bg-white p-4 shadow-[0_20px_40px_rgba(16,45,97,0.12)]"
            aria-label="Switch child profile"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between font-manrope">
                <h2 className="text-lg leading-6.75 tracking-[-0.27px] text-[#263238]">
                  Switch Child Profile
                </h2>
                <p className="text-sm leading-5.5 tracking-[-0.084px] text-[#7d8488]">2 children</p>
              </div>
              <div className="flex flex-col gap-2">
                {childProfiles.map((profile, index) => (
                  <ChildProfileOption
                    key={profile.age}
                    profile={profile}
                    selected={selectedProfile === index}
                    onSelect={() => {
                      setSelectedProfile(index);
                      setProfilesOpen(false);
                    }}
                  />
                ))}
              </div>
              <button
                type="button"
                className="relative flex h-10 w-full items-center justify-center gap-1 overflow-hidden rounded-full border border-[#accbcb] px-3 py-2 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-[#f8fafc]"
              >
                <span className="absolute inset-0 bg-linear-to-b from-[rgba(47,125,126,0.6)] to-[#2f7d7e]" />
                <span className="relative">+ Add Another Child Profile</span>
                <span className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_-6px_2px_rgba(255,255,255,0.07)]" />
              </button>
            </div>
          </section>
        )}

        {messagesOpen && (
          <section
            ref={messagesPanelRef}
            className="absolute right-0 top-13 z-50 h-136.25 w-107 max-w-[calc(100vw-2rem)] overflow-y-auto rounded-2xl border border-[#ebebeb] bg-white p-5 shadow-[0_20px_40px_rgba(16,45,97,0.12)] scrollbar-none [&::-webkit-scrollbar]:hidden"
            aria-label="Recent messages"
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-5">
                <h2 className="font-manrope text-lg leading-6.75 tracking-[-0.27px] text-[#263238]">
                  Recent Messages
                </h2>
                <label className="flex h-9 w-full items-center rounded-[10px] border border-[#ebebeb] px-4 py-2">
                  <Image
                    src="/Home/figma-dashboard-messages-search.svg"
                    alt=""
                    width={18}
                    height={18}
                    className="mr-2 shrink-0"
                  />
                  <input
                    type="search"
                    aria-label="Search messages"
                    placeholder="Search Messages"
                    className="min-w-0 flex-1 bg-transparent font-manrope text-xs leading-4.5 text-[#263238] outline-none placeholder:text-[#a3a3a3]"
                  />
                </label>
              </div>
              <div className="flex flex-col gap-4">
                <section>
                  <p className="font-nunito text-sm font-medium leading-5 tracking-[-0.084px] text-[#7d8488]">
                    Unread Conversations
                  </p>
                  <div className="mt-3 flex flex-col gap-2">
                    {unreadThreads.map((thread) => (
                      <MessageItem key={`${thread.name}-${thread.time}`} thread={thread} unread />
                    ))}
                  </div>
                </section>
                <section>
                  <p className="font-nunito text-sm font-medium leading-5 tracking-[-0.084px] text-[#515b60]">
                    Recent Conversations
                  </p>
                  <div className="mt-3">
                    {recentThreads.map((thread) => (
                      <MessageItem key={`${thread.name}-${thread.time}`} thread={thread} />
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </section>
        )}

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
