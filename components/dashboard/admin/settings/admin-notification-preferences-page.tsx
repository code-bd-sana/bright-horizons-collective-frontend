'use client';

import { Bell, Monitor } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { AdminSettingsShell } from './admin-settings-shell';

type NotificationId =
  | 'registrationEmail'
  | 'parentMessageEmail'
  | 'weeklyPlanEmail'
  | 'membershipEmail'
  | 'parentMessageApp'
  | 'membershipApp'
  | 'weeklyPlanApp'
  | 'activityApp';

type NotificationOption = {
  id: NotificationId;
  title: string;
  description: string;
  enabled: boolean;
};

const emailNotifications: NotificationOption[] = [
  {
    id: 'registrationEmail',
    title: 'New Parent Registration',
    description: 'Receive an email when a new family registers on the platform.',
    enabled: true,
  },
  {
    id: 'parentMessageEmail',
    title: 'New Parent Message',
    description: 'Get notified when a parent sends a new message.',
    enabled: true,
  },
  {
    id: 'weeklyPlanEmail',
    title: 'Weekly Plan Assignment Reminder',
    description: 'Reminder emails when weekly plans are due for assignment.',
    enabled: false,
  },
  {
    id: 'membershipEmail',
    title: 'Membership Changes',
    description: 'Alerts for upgrades, downgrades, and cancellations.',
    enabled: true,
  },
];

const appNotifications: NotificationOption[] = [
  {
    id: 'parentMessageApp',
    title: 'Parent Messages',
    description: 'In-app badge and notification for new parent messages.',
    enabled: true,
  },
  {
    id: 'membershipApp',
    title: 'Membership Updates',
    description: 'In-app alerts for membership changes.',
    enabled: true,
  },
  {
    id: 'weeklyPlanApp',
    title: 'Weekly Plan Notifications',
    description: 'Notify when plans are assigned, completed, or overdue.',
    enabled: false,
  },
  {
    id: 'activityApp',
    title: 'Activity Updates',
    description: 'Alerts when activities are published or modified.',
    enabled: false,
  },
];

function NotificationToggle({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={`${checked ? 'Disable' : 'Enable'} ${label}`}
      onClick={onChange}
      className={`relative h-6 w-11 shrink-0 rounded-xl transition-colors ${checked ? 'bg-[#2f7d7e]' : 'bg-[#d0d9d8]'}`}
    >
      <span
        className={`absolute top-1 size-4 rounded-lg bg-white shadow-[0_1px_3px_rgba(0,0,0,0.2)] transition-[left] ${checked ? 'left-5.5' : 'left-1'}`}
      />
    </button>
  );
}

function NotificationCard({
  icon: Icon,
  title,
  description,
  items,
  settings,
  onToggle,
}: {
  icon: typeof Bell;
  title: string;
  description: string;
  items: NotificationOption[];
  settings: Record<NotificationId, boolean>;
  onToggle: (id: NotificationId) => void;
}) {
  return (
    <section className="rounded-2xl border border-[#e7eceb] bg-white p-6 shadow-[0_4px_6px_rgba(0,0,0,0.06)]">
      <header className="flex items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-[14px] bg-[rgba(47,125,126,0.07)] text-[#2f7d7e]">
          <Icon aria-hidden="true" size={16} strokeWidth={1.55} />
        </span>
        <div>
          <h2 className="font-nunito text-[17px] font-bold leading-[25.5px] text-[#263238]">
            {title}
          </h2>
          <p className="font-manrope text-xs leading-4.5 text-[#607d8b]">{description}</p>
        </div>
      </header>
      <div className="mt-5">
        {items.map(({ id, title: itemTitle, description: itemDescription }, index) => (
          <div
            key={id}
            className={`flex items-center gap-4 py-4 ${index < items.length - 1 ? 'border-b border-[#e7eceb]' : ''}`}
          >
            <div className="min-w-0 flex-1">
              <h3 className="font-manrope text-sm font-semibold leading-5.25 text-[#263238]">
                {itemTitle}
              </h3>
              <p className="pt-0.5 font-manrope text-xs leading-4.5 text-[#607d8b]">
                {itemDescription}
              </p>
            </div>
            <NotificationToggle
              checked={settings[id]}
              label={itemTitle}
              onChange={() => onToggle(id)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export function AdminNotificationPreferencesPage() {
  const [notificationSettings, setNotificationSettings] = useState<Record<NotificationId, boolean>>(
    () =>
      [...emailNotifications, ...appNotifications].reduce<Record<NotificationId, boolean>>(
        (settings, { id, enabled }) => ({ ...settings, [id]: enabled }),
        {} as Record<NotificationId, boolean>
      )
  );

  const toggleNotification = (id: NotificationId) => {
    setNotificationSettings((settings) => ({ ...settings, [id]: !settings[id] }));
  };

  return (
    <AdminSettingsShell activeSection="notifications">
      <main className="w-full max-w-3xl space-y-6">
        <header>
          <h1 className="font-nunito text-[22px] font-bold leading-8.25 text-[#263238]">
            Notification Preferences
          </h1>
          <p className="pt-0.5 font-manrope text-[13px] leading-[19.5px] text-[#607d8b]">
            Choose which notifications you receive, and through which channels.
          </p>
        </header>

        <NotificationCard
          icon={Bell}
          title="Email Notifications"
          description="Delivered to sarah@brighthorizons.co"
          items={emailNotifications}
          settings={notificationSettings}
          onToggle={toggleNotification}
        />
        <NotificationCard
          icon={Monitor}
          title="In-App Notifications"
          description="Shown as badges and alerts within the admin dashboard"
          items={appNotifications}
          settings={notificationSettings}
          onToggle={toggleNotification}
        />

        <button
          type="button"
          onClick={() => toast.success('Notification preferences saved.')}
          className="rounded-[14px] bg-[#2f7d7e] px-6 py-2.5 font-manrope text-sm font-semibold leading-5 text-white transition-colors hover:bg-[#266b6c]"
        >
          Save Preferences
        </button>
      </main>
    </AdminSettingsShell>
  );
}
