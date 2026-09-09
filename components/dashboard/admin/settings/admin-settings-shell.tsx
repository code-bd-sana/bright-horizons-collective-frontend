'use client';

import { Bell, ShieldCheck, UserRound } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

type AdminSettingsSection = 'profile' | 'security' | 'notifications';

const settingsSections = [
  {
    id: 'profile',
    label: 'My Profile',
    description: 'Personal account information',
    icon: UserRound,
    href: '/dashboard/admin/settings',
  },
  {
    id: 'security',
    label: 'Account Security',
    description: 'Password & login activity',
    icon: ShieldCheck,
    href: '/dashboard/admin/settings/security',
  },
  {
    id: 'notifications',
    label: 'Notification Preferences',
    description: 'Email & in-app alerts',
    icon: Bell,
    href: '/dashboard/admin/settings/notifications',
  },
] as const;

type AdminSettingsShellProps = {
  activeSection: AdminSettingsSection;
  children: React.ReactNode;
};

export function AdminSettingsShell({ activeSection, children }: AdminSettingsShellProps) {
  return (
    <section className="w-full min-w-0 max-w-383.5 pb-8 text-[#263238]">
      <div className="grid min-w-0 items-start gap-6 2xl:grid-cols-[256px_minmax(0,768px)]">
        <aside className="w-full min-w-0 pr-0 2xl:pr-6">
          <nav
            aria-label="Admin settings navigation"
            className="grid grid-cols-1 gap-2 sm:grid-cols-3 2xl:flex 2xl:flex-col 2xl:gap-1"
          >
            {settingsSections.map((section) => {
              const { id, label, description, icon: Icon } = section;
              const href = 'href' in section ? section.href : undefined;
              const isActive = activeSection === id;
              const className = `flex min-w-0 items-center gap-3 rounded-[14px] border px-3 py-3 text-left transition-colors sm:items-start 2xl:shrink-0 2xl:items-center 2xl:px-4 2xl:py-3.5 ${isActive ? 'border-[rgba(47,125,126,0.19)] bg-[rgba(47,125,126,0.06)] text-[#2f7d7e]' : 'border-transparent text-[#263238] hover:bg-[#f4f8f6]'}`;
              const content = (
                <>
                  <span
                    className={`flex size-8 shrink-0 items-center justify-center rounded-[10px] ${isActive ? 'bg-[rgba(47,125,126,0.08)]' : 'bg-[#f4f8f6]'}`}
                  >
                    <Icon aria-hidden="true" size={16} strokeWidth={1.55} />
                  </span>
                  <span className="min-w-0">
                    <span
                      className={`block font-manrope text-sm leading-4.55 ${isActive ? 'font-semibold text-[#2f7d7e]' : 'font-normal text-[#263238]'}`}
                    >
                      {label}
                    </span>
                    <span className="mt-px block font-manrope text-[11px] font-medium leading-4.125 text-[#607d8b] 2xl:truncate">
                      {description}
                    </span>
                  </span>
                </>
              );

              return href ? (
                <Link
                  key={id}
                  href={href}
                  aria-current={isActive ? 'page' : undefined}
                  className={className}
                >
                  {content}
                </Link>
              ) : (
                <button
                  key={id}
                  type="button"
                  onClick={() => toast.message('Notification Preferences will be available next.')}
                  className={className}
                >
                  {content}
                </button>
              );
            })}
          </nav>
        </aside>

        <div className="min-w-0 border-[#e7eceb] 2xl:border-l 2xl:pl-6">{children}</div>
      </div>
    </section>
  );
}
