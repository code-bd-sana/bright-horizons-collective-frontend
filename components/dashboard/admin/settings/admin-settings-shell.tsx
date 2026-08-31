'use client';

import { Bell, LogOut, ShieldCheck, UserRound } from 'lucide-react';
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
  },
] as const;

type AdminSettingsShellProps = {
  activeSection: AdminSettingsSection;
  children: React.ReactNode;
};

export function AdminSettingsShell({ activeSection, children }: AdminSettingsShellProps) {
  return (
    <section className="w-full max-w-383.5 pb-8 text-[#263238]">
      <div className="grid items-start gap-6 xl:grid-cols-[256px_minmax(0,768px)]">
        <aside className="w-full pr-0 xl:pr-6">
          <nav
            aria-label="Admin settings navigation"
            className="flex gap-1 overflow-x-auto xl:flex-col"
          >
            {settingsSections.map((section) => {
              const { id, label, description, icon: Icon } = section;
              const href = 'href' in section ? section.href : undefined;
              const isActive = activeSection === id;
              const className = `flex min-w-58 shrink-0 items-center gap-3 rounded-[14px] border px-4 py-3.5 text-left transition-colors xl:min-w-0 ${isActive ? 'border-[rgba(47,125,126,0.19)] bg-[rgba(47,125,126,0.06)] text-[#2f7d7e]' : 'border-transparent text-[#263238] hover:bg-[#f4f8f6]'}`;
              const content = (
                <>
                  <span
                    className={`flex size-8 shrink-0 items-center justify-center rounded-[10px] ${isActive ? 'bg-[rgba(47,125,126,0.08)]' : 'bg-[#f4f8f6]'}`}
                  >
                    <Icon aria-hidden="true" size={16} strokeWidth={1.55} />
                  </span>
                  <span className="min-w-0">
                    <span
                      className={`block font-manrope text-sm leading-[18.2px] ${isActive ? 'font-semibold text-[#2f7d7e]' : 'font-normal text-[#263238]'}`}
                    >
                      {label}
                    </span>
                    <span className="mt-px block truncate font-manrope text-[11px] font-medium leading-[16.5px] text-[#607d8b]">
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

          <div className="mt-4 border-t border-[#e7eceb] pt-4">
            <button
              type="button"
              onClick={() => toast.message('Sign out is available from the account menu.')}
              className="flex min-w-58 items-center gap-3 rounded-[14px] px-4 py-3.5 font-manrope text-sm font-medium leading-5.25 text-[#e57373] transition-colors hover:bg-[#fff5f4] xl:min-w-0"
            >
              <span className="flex size-8 items-center justify-center rounded-[10px] bg-[#fce9e2]">
                <LogOut aria-hidden="true" size={16} strokeWidth={1.7} />
              </span>
              Sign Out
            </button>
          </div>
        </aside>

        <div className="min-w-0 border-[#e7eceb] xl:border-l xl:pl-6">{children}</div>
      </div>
    </section>
  );
}
