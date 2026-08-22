import type { SettingsSection } from './settings-types';
import { Bell, CreditCard, FileText, ShieldCheck, UserRound } from 'lucide-react';

const settingsNavigation = [
  { id: 'account', label: 'Account', icon: UserRound },
  { id: 'billing', label: 'Membership & Billing', icon: CreditCard },
  { id: 'security', label: 'Security', icon: ShieldCheck },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'legal', label: 'Legal', icon: FileText },
] satisfies Array<{ id: SettingsSection; label: string; icon: typeof UserRound }>;

type SettingsSidebarProps = {
  activeSection: SettingsSection;
  onSectionChange: (section: SettingsSection) => void;
};

export function SettingsSidebar({ activeSection, onSectionChange }: SettingsSidebarProps) {
  return (
    <nav
      className="overflow-x-auto rounded-xl border border-[#d8ddd9] bg-white p-2 sm:p-4"
      aria-label="Settings navigation"
    >
      <div className="flex min-w-max gap-2 xl:min-w-0 xl:flex-col">
        {settingsNavigation.map(({ id, label, icon: Icon }) => {
          const isActive = activeSection === id;

          return (
            <button
              key={id}
              type="button"
              onClick={() => onSectionChange(id)}
              className={`flex h-9 shrink-0 items-center gap-3 rounded-xl px-3 text-left font-nunito text-sm font-medium leading-5 tracking-[-0.084px] transition-colors ${isActive ? 'bg-[#2f7d7e] text-white' : 'text-[#515b60] hover:bg-[#fce9e3]/50'}`}
            >
              <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
              {label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
