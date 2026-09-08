import type { SettingsSection } from './settings-types';
import { Bell, ChevronDown, CreditCard, FileText, ShieldCheck, UserRound } from 'lucide-react';

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
      className="rounded-xl border border-[#d8ddd9] bg-white p-2 sm:overflow-x-auto sm:overscroll-x-contain sm:p-3 sm:scrollbar-none sm:[&::-webkit-scrollbar]:hidden min-[1500px]:overflow-visible min-[1500px]:p-4"
      aria-label="Settings navigation"
    >
      <label className="relative flex h-11 items-center sm:hidden">
        <span className="sr-only">Settings section</span>
        <select
          value={activeSection}
          onChange={(event) => onSectionChange(event.target.value as SettingsSection)}
          className="size-full appearance-none rounded-lg border border-[#d5e5e5] bg-[#f4f8f6] px-3 pr-10 font-nunito text-sm font-medium text-[#263238] outline-none focus:border-[#2f7d7e]"
        >
          {settingsNavigation.map(({ id, label }) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-3 size-5 text-[#2f7d7e]"
          strokeWidth={1.5}
        />
      </label>

      <div className="hidden min-w-max gap-2 sm:flex min-[1500px]:min-w-0 min-[1500px]:flex-col">
        {settingsNavigation.map(({ id, label, icon: Icon }) => {
          const isActive = activeSection === id;

          return (
            <button
              key={id}
              type="button"
              onClick={() => onSectionChange(id)}
              className={`flex min-h-10 shrink-0 items-center gap-2.5 rounded-xl px-3 text-left font-nunito text-sm font-medium leading-5 tracking-[-0.084px] transition-colors min-[1500px]:w-full min-[1500px]:gap-3 ${isActive ? 'bg-[#2f7d7e] text-white' : 'text-[#515b60] hover:bg-[#fce9e3]/50'}`}
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
