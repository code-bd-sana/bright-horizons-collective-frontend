'use client';

import { AlarmClock, CalendarDays, FileCog, MessageSquareText, RefreshCw } from 'lucide-react';
import { useState } from 'react';

type NotificationId =
  'weeklyPlan' | 'activityReminders' | 'messages' | 'platformUpdates' | 'parentResources';

const notificationOptions = [
  {
    id: 'weeklyPlan',
    title: 'Weekly Plan Available',
    description: 'Get notified every Sunday when your new tailored curriculum is ready.',
    icon: CalendarDays,
  },
  {
    id: 'activityReminders',
    title: 'Activity Reminders',
    description: "Daily prompts for scheduled activities to keep your child's routine on track.",
    icon: AlarmClock,
  },
  {
    id: 'messages',
    title: 'Messages',
    description: 'Instant alerts for new messages from educators or fellow collective parents.',
    icon: MessageSquareText,
  },
  {
    id: 'platformUpdates',
    title: 'Platform Updates',
    description: 'Stay informed about new features and technical improvements to your portal.',
    icon: RefreshCw,
  },
  {
    id: 'parentResources',
    title: 'New Parent Resources',
    description: 'Access to expert articles, webinars, and educational whitepapers.',
    icon: FileCog,
  },
] as const satisfies ReadonlyArray<{
  id: NotificationId;
  title: string;
  description: string;
  icon: typeof CalendarDays;
}>;

type NotificationToggleProps = {
  checked: boolean;
  label: string;
  onChange: () => void;
};

function NotificationToggle({ checked, label, onChange }: NotificationToggleProps) {
  return (
    <button
      aria-checked={checked}
      aria-label={label}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? 'bg-[#2f7d7e]' : 'bg-[#dadada]'}`}
      onClick={onChange}
      role="switch"
      type="button"
    >
      <span
        className={`absolute top-0.5 size-5 rounded-full bg-white transition-[left] ${checked ? 'left-5.5 border border-white' : 'left-0.5 border border-[#d1d5db]'}`}
      />
    </button>
  );
}

export function NotificationsPanel() {
  const [notificationSettings, setNotificationSettings] = useState<Record<NotificationId, boolean>>(
    {
      weeklyPlan: true,
      activityReminders: true,
      messages: true,
      platformUpdates: false,
      parentResources: true,
    }
  );

  return (
    <section className="w-full max-w-227 rounded-[20px] border-2 border-[#e8ebe8] bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:p-8.5">
      <h2 className="font-nunito text-2xl font-semibold leading-8 text-[#263238]">
        Email &amp; Push Alert Controls
      </h2>

      <div className="mt-6 space-y-4">
        {notificationOptions.map(({ id, title, description, icon: Icon }) => {
          const checked = notificationSettings[id];

          return (
            <article
              className="flex items-start justify-between gap-4 rounded-2xl border border-[#e8ebe8] bg-white p-4"
              key={id}
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#f1f3f3] text-[#515b60]">
                  <Icon aria-hidden="true" size={20} strokeWidth={1.5} />
                </span>
                <div className="min-w-0">
                  <h3 className="font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-[#263238]">
                    {title}
                  </h3>
                  <p className="mt-1 max-w-140 font-manrope text-xs leading-4.5 text-[#515b60]">
                    {description}
                  </p>
                </div>
              </div>
              <NotificationToggle
                checked={checked}
                label={`${checked ? 'Disable' : 'Enable'} ${title} notifications`}
                onChange={() =>
                  setNotificationSettings((settings) => ({ ...settings, [id]: !settings[id] }))
                }
              />
            </article>
          );
        })}
      </div>
    </section>
  );
}
