'use client';

import {
  BookOpen,
  CalendarDays,
  CreditCard,
  MessageSquare,
  Minus,
  Puzzle,
  TrendingDown,
  TrendingUp,
  UsersRound,
  Zap,
} from 'lucide-react';
import { useAdminDashboardMetrics } from './hooks/use-admin-dashboard';

const iconTones = {
  teal: 'bg-[#e9f3f2] text-[#27898a]',
  coral: 'bg-[#fff6f4] text-[#f5af9a]',
  amber: 'bg-[#fff9ed] text-[#efb622]',
};

export function DashboardMetricCards() {
  const { data, isLoading } = useAdminDashboardMetrics();

  const metrics = [
    {
      label: 'Total Families',
      value: data?.totalFamilies !== undefined ? data.totalFamilies.value.toLocaleString() : '—',
      change: data?.totalFamilies?.change ?? '0%',
      trend: data?.totalFamilies?.trend ?? 'neutral',
      icon: UsersRound,
      tone: 'teal' as const,
    },
    {
      label: 'Active Children',
      value: data?.activeChildren !== undefined ? data.activeChildren.value.toLocaleString() : '—',
      change: data?.activeChildren?.change ?? '0%',
      trend: data?.activeChildren?.trend ?? 'neutral',
      icon: UsersRound,
      tone: 'teal' as const,
    },
    {
      label: 'Active Weekly Plans',
      value:
        data?.activeWeeklyPlans !== undefined ? data.activeWeeklyPlans.value.toLocaleString() : '—',
      change: data?.activeWeeklyPlans?.change ?? '0%',
      trend: data?.activeWeeklyPlans?.trend ?? 'neutral',
      icon: CalendarDays,
      tone: 'teal' as const,
    },
    {
      label: 'Activities Library',
      value:
        data?.activitiesLibrary !== undefined ? data.activitiesLibrary.value.toLocaleString() : '—',
      change: data?.activitiesLibrary?.change ?? '0%',
      trend: data?.activitiesLibrary?.trend ?? 'neutral',
      icon: Zap,
      tone: 'teal' as const,
    },
    {
      label: 'Parent Resources',
      value:
        data?.parentResources !== undefined ? data.parentResources.value.toLocaleString() : '—',
      change: data?.parentResources?.change ?? '0%',
      trend: data?.parentResources?.trend ?? 'neutral',
      icon: BookOpen,
      tone: 'teal' as const,
    },
    {
      label: 'Therapy Toys',
      value: data?.therapyToys !== undefined ? data.therapyToys.value.toLocaleString() : '—',
      change: data?.therapyToys?.change ?? '0%',
      trend: data?.therapyToys?.trend ?? 'neutral',
      icon: Puzzle,
      tone: 'coral' as const,
    },
    {
      label: 'Active Memberships',
      value:
        data?.activeMemberships !== undefined ? data.activeMemberships.value.toLocaleString() : '—',
      change: data?.activeMemberships?.change ?? '0%',
      trend: data?.activeMemberships?.trend ?? 'neutral',
      icon: CreditCard,
      tone: 'teal' as const,
    },
    {
      label: 'Unread Messages',
      value: data?.unreadMessages !== undefined ? data.unreadMessages.value.toLocaleString() : '—',
      change: data?.unreadMessages?.change ?? '0',
      trend: data?.unreadMessages?.trend ?? 'neutral',
      icon: MessageSquare,
      tone: 'amber' as const,
    },
  ];

  return (
    <section
      className="grid grid-cols-1 gap-3 min-[400px]:grid-cols-2 sm:gap-5 min-[1200px]:grid-cols-4"
      aria-label="Platform overview"
    >
      {metrics.map(({ value, label, change, trend, icon: Icon, tone }) => {
        const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
        const trendStyle =
          trend === 'up'
            ? 'bg-[#edf7ef] text-[#45ad56]'
            : trend === 'down'
              ? 'bg-[#fff0ee] text-[#e57067]'
              : 'bg-[#f4f6f5] text-[#607d8b]';

        return (
          <article
            key={label}
            className="relative h-36.75 min-w-0 rounded-2xl border border-[#e3e9e8] bg-white p-4 shadow-[0_4px_8px_rgba(38,50,56,0.06)] 2xl:p-5"
          >
            <span
              className={`flex size-10 items-center justify-center rounded-xl ${iconTones[tone]}`}
            >
              <Icon aria-hidden="true" size={21} strokeWidth={1.75} />
            </span>
            <span
              className={`absolute right-4 top-5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-manrope text-xs font-medium leading-4 2xl:right-5 2xl:top-7 ${trendStyle}`}
            >
              <TrendIcon aria-hidden="true" size={11} strokeWidth={2} />
              {change}
            </span>
            <p
              className={`mt-3 font-nunito text-2xl font-medium leading-8 text-[#263238] ${
                isLoading ? 'animate-pulse' : ''
              }`}
            >
              {value}
            </p>
            <p className="mt-1 font-manrope text-xs leading-4.5 text-[#5f8096]">{label}</p>
          </article>
        );
      })}
    </section>
  );
}
