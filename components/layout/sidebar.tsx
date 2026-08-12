'use client';

import { Logo } from '@/components/logo';
import type { DemoRole } from '@/lib/demo-session';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store/use-app-store';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

type NavigationItem = {
  name: string;
  href: string;
  icon: string;
  active?: (pathname: string) => boolean;
};

const parentMenuItems: NavigationItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: '/Home/figma-dashboard-nav-dashboard.svg',
    active: (pathname) => pathname === '/dashboard',
  },
  {
    name: 'Weekly Plans',
    href: '/dashboard/weekly-plans',
    icon: '/Home/figma-dashboard-nav-weekly.svg',
  },
  { name: 'Explore', href: '/explore', icon: '/Home/figma-dashboard-nav-explore.svg' },
  { name: 'Messages', href: '/dashboard/messages', icon: '/Home/figma-dashboard-nav-messages.svg' },
  {
    name: 'Child Profiles',
    href: '/dashboard/child-profiles',
    icon: '/Home/figma-dashboard-nav-child-profiles.svg',
    active: (pathname) => pathname.startsWith('/dashboard/child-profiles'),
  },
];

const parentOtherItems: NavigationItem[] = [
  { name: 'Settings', href: '/dashboard/settings', icon: '/Home/figma-dashboard-nav-settings.svg' },
  { name: 'Support', href: '/contact', icon: '/Home/figma-dashboard-nav-support.svg' },
];

const adminMenuItems: NavigationItem[] = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: '/Home/figma-admin-sidebar-dashboard.svg',
    active: (pathname) => pathname === '/dashboard',
  },
  {
    name: 'Activities Library',
    href: '/dashboard/activities-library',
    icon: '/Home/figma-admin-sidebar-activities.svg',
  },
  {
    name: 'Weekly Plans',
    href: '/dashboard/weekly-plans',
    icon: '/Home/figma-admin-sidebar-weekly.svg',
  },
  { name: 'Families', href: '/dashboard/families', icon: '/Home/figma-admin-sidebar-families.svg' },
  {
    name: 'Parent Resources',
    href: '/dashboard/parent-resources',
    icon: '/Home/figma-admin-sidebar-resources.svg',
  },
  {
    name: 'Therapy Toys',
    href: '/dashboard/therapy-toys',
    icon: '/Home/figma-admin-sidebar-toys.svg',
  },
  {
    name: 'Messages',
    href: '/dashboard/messages',
    icon: '/Home/figma-admin-sidebar-messages.svg',
  },
  {
    name: 'Memberships',
    href: '/dashboard/memberships',
    icon: '/Home/figma-admin-sidebar-memberships.svg',
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: '/Home/figma-admin-sidebar-settings.svg',
  },
];

function NavigationList({ items, pathname }: { items: NavigationItem[]; pathname: string }) {
  return (
    <div className="flex w-50 flex-col gap-2">
      {items.map((item) => {
        const isActive = item.active?.(pathname) ?? pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'flex h-9 items-center rounded-full px-3 py-2 font-nunito text-sm font-medium leading-5 tracking-[-0.084px] transition-colors',
              isActive
                ? 'rounded-xl bg-[#fce9e3] text-[#1e282d] shadow-[0_1px_1px_rgba(0,0,0,0.05)]'
                : 'text-[#515b60] hover:bg-[#fce9e3]/50'
            )}
          >
            <Image src={item.icon} alt="" width={20} height={20} className="mr-2 shrink-0" />
            {item.name}
          </Link>
        );
      })}
    </div>
  );
}

export function Sidebar({ role = 'parent' }: { role?: DemoRole }) {
  const pathname = usePathname();
  const router = useRouter();
  const { sidebarOpen } = useAppStore();
  const isAdmin = role === 'admin';
  const menuItems = isAdmin ? adminMenuItems : parentMenuItems;
  const otherItems = isAdmin ? [] : parentOtherItems;
  const profile = isAdmin
    ? {
        name: 'Jaicy',
        role: 'Admin',
        image: '/Home/figma-admin-sidebar-avatar.png',
        imageClassName: 'object-cover',
        chevron: '/Home/figma-admin-sidebar-chevron.svg',
        logout: '/Home/figma-admin-sidebar-logout.svg',
      }
    : {
        name: 'Sarah Johnson',
        role: 'Parent',
        image: '/Home/figma-dashboard-avatar.png',
        imageClassName: 'object-cover object-[50%_10%]',
        chevron: '/Home/figma-dashboard-chevron.svg',
        logout: '/Home/figma-dashboard-logout.svg',
      };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' });
    router.replace('/login');
    router.refresh();
  };

  if (!sidebarOpen) return null;

  return (
    <aside
      className="sticky top-0 hidden h-dvh min-h-239.75 w-77.75 shrink-0 bg-[#fdfdfc] md:flex"
      aria-label="Dashboard navigation"
    >
      <div className="ml-10 flex h-full w-67.75 flex-col border-r border-[#f6f4f4]">
        <div className="flex min-h-0 flex-1 flex-col gap-5 border-r border-[#f6f4f4]">
          <div className="relative flex h-33 w-full items-center px-4 pt-4">
            <Logo href="/" width={125} height={100} className="shrink-0" />
            <Image
              src="/Home/figma-dashboard-sidebar-line-top.svg"
              alt=""
              width={230}
              height={1}
              className="absolute bottom-0 left-1/2 h-px w-57.5 -translate-x-1/2"
            />
          </div>

          <nav
            className={`flex flex-col ${isAdmin ? 'gap-0' : 'gap-5'}`}
            aria-label="Main navigation"
          >
            <section className="flex flex-col gap-2">
              <p className="w-48 px-1 font-nunito text-xs font-medium leading-4 text-[#7d8488]">
                MENU
              </p>
              <NavigationList items={menuItems} pathname={pathname} />
            </section>

            {!isAdmin && (
              <section className="flex flex-col gap-2">
                <p className="w-48 px-1 font-nunito text-xs font-medium leading-4 text-[#7d8488]">
                  OTHERS
                </p>
                <NavigationList items={otherItems} pathname={pathname} />
              </section>
            )}
          </nav>

          {!isAdmin && (
            <section
              className="relative mt-auto mb-4 flex h-41.5 w-60.75 flex-col justify-end gap-4 overflow-hidden rounded-xl border-2 border-transparent p-4"
              aria-label="Current membership plan"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-[10px]"
                style={{
                  backgroundImage:
                    'linear-gradient(164.974553deg, rgb(255, 255, 255) 12.806%, rgb(251, 222, 213) 45.344%, rgb(250, 214, 203) 68.311%, rgb(249, 208, 195) 96.064%, rgb(246, 189, 171) 112.33%)',
                }}
              />
              <div className="relative z-10 flex w-44 flex-col gap-1">
                <p className="font-manrope text-[10px] font-medium uppercase leading-3.75 tracking-[0.2px] text-[#515b60]">
                  Current Plan
                </p>
                <p className="font-nunito text-lg font-semibold leading-6 tracking-[-0.27px] text-[#263238]">
                  Grow Together
                </p>
                <p className="font-manrope text-xs leading-4.5 text-[#515b60]">
                  Renews Aug 1, 2026
                </p>
              </div>
              <button
                type="button"
                className="relative z-10 flex min-h-12 w-51.5 items-center justify-center rounded-full border border-[#e8ebe8] bg-white px-3.25 py-1.75 font-nunito text-center text-sm font-medium leading-5 tracking-[-0.084px] text-[#2f7d7e]"
              >
                <span className="w-38">Upgrade Personalized Pathways</span>
              </button>
            </section>
          )}
        </div>

        <div className="relative flex w-full flex-col gap-2 border-r border-[#f6f4f4] p-3">
          <Image
            src="/Home/figma-dashboard-sidebar-line-bottom.svg"
            alt=""
            width={230}
            height={1}
            className="absolute left-1/2 top-0 h-px w-57.5 -translate-x-1/2"
          />
          <button type="button" className="flex w-full items-center px-3 py-3 text-left">
            <span className="relative mr-3 size-10 shrink-0 overflow-hidden rounded-full bg-[#2f7d7e]">
              <Image
                src={profile.image}
                alt={profile.name}
                fill
                sizes="40px"
                className={profile.imageClassName}
              />
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-1">
              <span className="font-nunito text-sm font-medium leading-5 tracking-[-0.084px] text-[#515b60]">
                {profile.name}
              </span>
              <span className="font-manrope text-xs leading-4.5 text-[#7d8488]">
                {profile.role}
              </span>
            </span>
            <Image src={profile.chevron} alt="" width={20} height={20} className="ml-3 shrink-0" />
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="flex h-9 items-center rounded-full px-3 py-2 font-nunito text-sm font-medium leading-5 tracking-[-0.084px] text-[#515b60] transition-colors hover:bg-[#fce9e3]/50"
          >
            <Image src={profile.logout} alt="" width={20} height={20} className="mr-2 shrink-0" />
            Log out
          </button>
        </div>
      </div>
    </aside>
  );
}
