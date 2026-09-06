'use client';

import { Logo } from '@/components/logo';
import type { DemoRole } from '@/lib/demo-session';
import { getRoleConfig, type RoleNavigationItem } from '@/lib/role-config';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store/use-app-store';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { X } from 'lucide-react';

function NavigationList({
  items,
  pathname,
  onNavigate,
}: {
  items: RoleNavigationItem[];
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex w-full flex-col gap-2 lg:w-50">
      {items.map((item) => {
        const isActive =
          item.match === 'prefix' ? pathname.startsWith(item.href) : pathname === item.href;
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
  const { sidebarOpen, setSidebarOpen } = useAppStore();
  const isAdmin = role === 'admin';
  const roleConfig = getRoleConfig(role);
  const { menuItems, otherItems, profile } = roleConfig;

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
                className="relative mt-auto mb-4 flex h-41.5 w-60.75 shrink-0 flex-col justify-end gap-4 overflow-hidden rounded-xl border-2 border-transparent p-4"
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
                  onNavigate={() => setSidebarOpen(false)}
                />
              </section>
            )}
          </nav>

          {!isAdmin && (
            <section
              className="relative mt-6 flex min-h-38 flex-col justify-end gap-3 overflow-hidden rounded-xl p-4"
              aria-label="Current membership plan"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-xl bg-[linear-gradient(165deg,#fff_13%,#fbded5_45%,#fad6cb_68%,#f9d0c3_96%)]"
              />
              <div className="relative z-10">
                <p className="font-manrope text-[10px] font-medium uppercase leading-3.75 tracking-[0.2px] text-[#515b60]">
                  Current Plan
                </p>
                <p className="mt-1 font-nunito text-lg font-semibold leading-6 text-[#263238]">
                  Grow Together
                </p>
                <p className="mt-1 font-manrope text-xs leading-4.5 text-[#515b60]">
                  Renews Aug 1, 2026
                </p>
              </div>
              <button
                type="button"
                className="relative z-10 min-h-11 rounded-full border border-[#e8ebe8] bg-white px-3 font-nunito text-sm font-medium text-[#2f7d7e]"
              >
                Upgrade Personalized Pathways
              </button>
            </section>
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
