'use client';

import { Logo } from '@/components/logo';
import type { AuthRole } from '@/services/api/auth/auth.types';
import { getRoleConfig, type RoleNavigationItem } from '@/lib/role-config';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store/use-app-store';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { X } from 'lucide-react';

import { useUnreadMessagesCount } from '@/features/messages/hooks/messages.queries';
import { SidebarPlanWidget } from '@/components/layout/sidebar-plan-widget';

function NavigationList({
  items,
  pathname,
  unreadMessagesCount = 0,
  onNavigate,
}: {
  items: RoleNavigationItem[];
  pathname: string;
  unreadMessagesCount?: number;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex w-full flex-col gap-2 lg:w-50">
      {items.map((item) => {
        const isActive =
          item.match === 'prefix' ? pathname.startsWith(item.href) : pathname === item.href;
        const isMessages =
          item.href === '/dashboard/messages' ||
          item.href === '/dashboard/admin/messages' ||
          item.name.toLowerCase() === 'messages';

        return (
          <Link
            key={item.name}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              'flex h-9 items-center rounded-full px-3 py-2 font-nunito text-sm font-medium leading-5 tracking-[-0.084px] transition-colors',
              isActive
                ? 'rounded-xl bg-[#fce9e3] text-[#1e282d] shadow-[0_1px_1px_rgba(0,0,0,0.05)]'
                : 'text-[#515b60] hover:bg-[#fce9e3]/50'
            )}
          >
            <Image src={item.icon} alt="" width={20} height={20} className="mr-2 shrink-0" />
            <span className="truncate">{item.name}</span>
            {isMessages && unreadMessagesCount > 0 && (
              <span
                className="ml-auto flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-[#2f7d7e] px-1.5 font-nunito text-[11px] font-bold text-white shadow-xs"
                aria-label={`${unreadMessagesCount} unread messages`}
              >
                {unreadMessagesCount > 99 ? '99+' : unreadMessagesCount}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}

export function Sidebar({ role = 'parent' }: { role?: AuthRole }) {
  const pathname = usePathname();
  const router = useRouter();
  const { sidebarOpen, setSidebarOpen } = useAppStore();
  const isAdmin = role === 'admin';
  const roleConfig = getRoleConfig(role);
  const { menuItems, otherItems, profile } = roleConfig;
  const unreadMessagesCount = useUnreadMessagesCount();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' });
    router.replace('/login');
    router.refresh();
  };

  return (
    <>
      <aside
        className="hidden h-dvh min-h-0 w-77.75 shrink-0 bg-[#fdfdfc] lg:flex"
        aria-label="Dashboard navigation"
      >
        <div className="ml-10 flex h-full w-67.75 flex-col border-r border-[#f6f4f4]">
          <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto overscroll-contain border-r border-[#f6f4f4]">
            <div className="relative flex h-33 w-full shrink-0 items-center px-4 pt-4">
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
              className={`flex shrink-0 flex-col ${isAdmin ? 'gap-0' : 'gap-5'}`}
              aria-label="Main navigation"
            >
              <section className="flex flex-col gap-2">
                <p className="w-48 px-1 font-nunito text-xs font-medium leading-4 text-[#7d8488]">
                  MENU
                </p>
                <NavigationList
                  items={menuItems}
                  pathname={pathname}
                  unreadMessagesCount={unreadMessagesCount}
                />
              </section>

              {!isAdmin && (
                <section className="flex flex-col gap-2">
                  <p className="w-48 px-1 font-nunito text-xs font-medium leading-4 text-[#7d8488]">
                    OTHERS
                  </p>
                  <NavigationList
                    items={otherItems}
                    pathname={pathname}
                    unreadMessagesCount={unreadMessagesCount}
                  />
                </section>
              )}
            </nav>

            {!isAdmin && <SidebarPlanWidget variant="sidebar-desktop" />}
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
                  {profile.roleLabel}
                </span>
              </span>
              <Image
                src={profile.chevron}
                alt=""
                width={20}
                height={20}
                className="ml-3 shrink-0"
              />
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

      <div
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-[#263238]/30 transition-opacity lg:hidden ${sidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={() => setSidebarOpen(false)}
      />
      <aside
        aria-label="Dashboard navigation"
        className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[calc(100vw-2rem)] flex-col border-r border-[#f6f4f4] bg-[#fdfdfc] shadow-xl transition-transform duration-200 lg:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-[#f6f4f4] px-4">
          <Logo href="/" width={110} height={88} />
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setSidebarOpen(false)}
            className="flex size-10 items-center justify-center rounded-lg text-[#515b60] transition-colors hover:bg-[#fce9e3]"
          >
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4">
          <nav
            className={`flex flex-col ${isAdmin ? 'gap-5' : 'gap-6'}`}
            aria-label="Main navigation"
          >
            <section className="flex flex-col gap-2">
              <p className="px-1 font-nunito text-xs font-medium leading-4 text-[#7d8488]">MENU</p>
              <NavigationList
                items={menuItems}
                pathname={pathname}
                unreadMessagesCount={unreadMessagesCount}
                onNavigate={() => setSidebarOpen(false)}
              />
            </section>
            {!isAdmin && (
              <section className="flex flex-col gap-2">
                <p className="px-1 font-nunito text-xs font-medium leading-4 text-[#7d8488]">
                  OTHERS
                </p>
                <NavigationList
                  items={otherItems}
                  pathname={pathname}
                  unreadMessagesCount={unreadMessagesCount}
                  onNavigate={() => setSidebarOpen(false)}
                />
              </section>
            )}
          </nav>

          {!isAdmin && (
            <SidebarPlanWidget variant="sidebar-mobile" onNavigate={() => setSidebarOpen(false)} />
          )}
        </div>

        <div className="border-t border-[#f6f4f4] p-3">
          <div className="flex items-center px-3 py-2">
            <span className="relative mr-3 size-10 shrink-0 overflow-hidden rounded-full bg-[#2f7d7e]">
              <Image
                src={profile.image}
                alt={profile.name}
                fill
                sizes="40px"
                className={profile.imageClassName}
              />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-nunito text-sm font-medium text-[#515b60]">
                {profile.name}
              </span>
              <span className="block font-manrope text-xs text-[#7d8488]">{profile.roleLabel}</span>
            </span>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="flex h-10 w-full items-center rounded-full px-3 font-nunito text-sm font-medium text-[#515b60] hover:bg-[#fce9e3]/50"
          >
            <Image src={profile.logout} alt="" width={20} height={20} className="mr-2 shrink-0" />
            Log out
          </button>
        </div>
      </aside>
    </>
  );
}
