'use client';

import {
  BadgeDollarSign,
  ChartNoAxesCombined,
  CircleDollarSign,
  Pause,
  Plus,
  Sparkles,
  UserPlus,
  UsersRound,
} from 'lucide-react';
import Link from 'next/link';

import {
  useMembershipDashboardStats,
  useRecentMembershipActivity,
  type MembershipActivityItem,
  type MembershipDashboardStats,
} from './hooks/use-admin-memberships';

type Metric = {
  value: string;
  label: string;
  icon: typeof UsersRound;
  iconTone: string;
};

type MembershipPlan = {
  name: string;
  members: string;
  share: string;
  progress: string;
  cardTone: string;
  badgeTone: string;
  valueTone: string;
};

function formatActivityDate(dateString: string) {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function getActivityIcon(item: MembershipActivityItem) {
  const type = item.type?.toUpperCase() || '';
  const actionLower = item.action.toLowerCase();

  if (type === 'REGISTER' || actionLower.includes('registered')) {
    return {
      icon: UserPlus,
      tone: 'bg-[rgba(47,125,126,0.07)] text-[#2f7d7e]',
    };
  }
  if (
    type === 'CANCEL' ||
    type === 'EXPIRE' ||
    actionLower.includes('cancel') ||
    actionLower.includes('ended') ||
    actionLower.includes('paused') ||
    actionLower.includes('expired')
  ) {
    return {
      icon: Pause,
      tone: 'bg-[#fff8e1] text-[#ca8a04]',
    };
  }
  return {
    icon: BadgeDollarSign,
    tone: 'bg-[rgba(76,175,80,0.08)] text-[#4caf50]',
  };
}

function MembershipMetrics({
  stats,
  isLoading,
}: {
  stats?: MembershipDashboardStats;
  isLoading: boolean;
}) {
  const total = stats?.totalMembers ?? 0;
  const paid = stats?.paidMembers ?? 0;
  const paidPercent = total > 0 ? Math.round((paid / total) * 100) : 0;

  const metrics: Metric[] = [
    {
      value: String(total),
      label: 'Total Members',
      icon: UsersRound,
      iconTone: 'border-[#dcfce7] bg-[#f0fdf4] text-[#4caf50]',
    },
    {
      value: String(stats?.littleStepsMembers ?? 0),
      label: 'Little Steps Members',
      icon: Sparkles,
      iconTone: 'border-[#fef9c3] bg-[#fefce8] text-[#ca8a04]',
    },
    {
      value: `${paidPercent}%`,
      label: 'Paid Members',
      icon: CircleDollarSign,
      iconTone: 'border-[#ffedd5] bg-[#fff7ed] text-[#f97316]',
    },
    {
      value: String(stats?.pendingUpgrades ?? 0),
      label: 'Pending Upgrades',
      icon: ChartNoAxesCombined,
      iconTone: 'border-[#dbeafe] bg-[#ecfeff] text-[#0891b2]',
    },
  ];

  return (
    <section
      className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4 2xl:gap-6"
      aria-label="Membership overview"
    >
      {metrics.map(({ value, label, icon: Icon, iconTone }) => (
        <article
          key={label}
          className="flex min-h-28 items-center rounded-2xl border border-[#e8ebe8] bg-white p-4 shadow-[0_1px_1px_rgba(0,0,0,0.05)] 2xl:h-38.5"
        >
          <div className="flex items-start gap-3">
            <span
              className={`flex size-8 items-center justify-center rounded-lg border ${iconTone}`}
            >
              <Icon aria-hidden="true" size={18} strokeWidth={1.6} />
            </span>
            <div>
              {isLoading ? (
                <div className="h-8 w-16 animate-pulse rounded bg-[#e8ebe8]" />
              ) : (
                <p className="font-nunito text-2xl font-medium leading-8 text-[#272f3a]">{value}</p>
              )}
              <p className="font-manrope text-sm font-medium leading-5.5 tracking-[0.06em] text-[#6c7787]">
                {label}
              </p>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}

function MembershipDistribution({
  stats,
  isLoading,
}: {
  stats?: MembershipDashboardStats;
  isLoading: boolean;
}) {
  const total = stats?.totalMembers ?? 0;
  const littleStepsCount = stats?.littleStepsMembers ?? 0;
  const growTogetherCount = stats?.growTogetherMembers ?? 0;
  const personalizedCount = stats?.personalizedPathwaysMembers ?? 0;

  const littleStepsShare = total > 0 ? Math.round((littleStepsCount / total) * 100) : 0;
  const growTogetherShare = total > 0 ? Math.round((growTogetherCount / total) * 100) : 0;
  const personalizedShare = total > 0 ? Math.round((personalizedCount / total) * 100) : 0;

  const plans: MembershipPlan[] = [
    {
      name: 'Little Steps',
      members: String(littleStepsCount),
      share: `${littleStepsShare}% of total members`,
      progress: `${littleStepsShare}%`,
      cardTone: 'border-[rgba(47,125,126,0.19)] bg-[#edf6f2]',
      badgeTone: 'bg-[#edf6f2] text-[#2f7d7e]',
      valueTone: 'text-[#2f7d7e]',
    },
    {
      name: 'Grow Together',
      members: String(growTogetherCount),
      share: `${growTogetherShare}% of total members`,
      progress: `${growTogetherShare}%`,
      cardTone: 'border-[rgba(47,125,126,0.25)] bg-[#dcefe7]',
      badgeTone: 'bg-[#dcefe7] text-[#2f7d7e]',
      valueTone: 'text-[#2f7d7e]',
    },
    {
      name: 'Personalized Pathways',
      members: String(personalizedCount),
      share: `${personalizedShare}% of total members`,
      progress: `${personalizedShare}%`,
      cardTone: 'border-[rgba(160,90,58,0.25)] bg-[#fce9e3]',
      badgeTone: 'bg-[#fce9e2] text-[#916d5f]',
      valueTone: 'text-[#a05a3a]',
    },
  ];

  return (
    <section aria-labelledby="membership-distribution-heading">
      <h2
        id="membership-distribution-heading"
        className="font-nunito text-xl font-bold leading-7.5 text-[#263238]"
      >
        Membership Distribution
      </h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
        {plans.map(({ name, members, share, progress, cardTone, badgeTone, valueTone }) => (
          <article
            key={name}
            className={`min-h-38 rounded-2xl border p-5.25 shadow-[0_4px_6px_rgba(0,0,0,0.06)] 2xl:h-38 ${cardTone}`}
          >
            <span
              className={`inline-flex rounded-full px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 ${badgeTone}`}
            >
              {name}
            </span>
            {isLoading ? (
              <div className="mt-3 h-8 w-12 animate-pulse rounded bg-[rgba(47,125,126,0.15)]" />
            ) : (
              <p className={`mt-3 font-nunito text-[32px] font-bold leading-8 ${valueTone}`}>
                {members}
              </p>
            )}
            <p className="mt-1 font-manrope text-[13px] leading-4.875 text-[#607d8b]">{share}</p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[rgba(47,125,126,0.13)]">
              <span
                aria-hidden="true"
                className="block h-full rounded-full bg-[#2f7d7e] transition-all duration-500"
                style={{ width: progress }}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function RecentMembershipActivity({
  activities,
  isLoading,
}: {
  activities?: MembershipActivityItem[];
  isLoading: boolean;
}) {
  const displayActivities = activities?.slice(0, 10) ?? [];

  return (
    <section
      className="rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:p-5 2xl:min-h-72 2xl:p-6"
      aria-labelledby="recent-membership-activity-heading"
    >
      <div className="flex items-center justify-between">
        <h2
          id="recent-membership-activity-heading"
          className="font-nunito text-lg font-bold leading-6.75 text-[#263238]"
        >
          Recent Membership Activity
        </h2>
        {displayActivities.length > 0 && (
          <span className="font-manrope text-xs text-[#607d8b]">
            Showing latest {displayActivities.length}
          </span>
        )}
      </div>

      {isLoading ? (
        <div className="mt-6 flex flex-col gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-start gap-3 animate-pulse">
              <div className="size-8 rounded-[14px] bg-[#f0f4f3]" />
              <div className="flex-1 space-y-1.5">
                <div className="h-4 w-3/4 rounded bg-[#f0f4f3]" />
                <div className="h-3 w-1/4 rounded bg-[#f0f4f3]" />
              </div>
            </div>
          ))}
        </div>
      ) : displayActivities.length === 0 ? (
        <div className="mt-8 flex flex-col items-center justify-center py-8 text-center text-[#78909c]">
          <p className="font-manrope text-sm font-medium">No recent membership activity.</p>
          <p className="mt-1 font-manrope text-xs">
            Member registrations and plan upgrades will appear here.
          </p>
        </div>
      ) : (
        <div className="mt-4 flex max-w-243.5 flex-col gap-4">
          {displayActivities.map((item) => {
            const { icon: Icon, tone: iconTone } = getActivityIcon(item);
            const dateStr = formatActivityDate(item.timestamp);

            return (
              <article key={item.id} className="flex items-start gap-3">
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-[14px] ${iconTone}`}
                >
                  <Icon aria-hidden="true" size={14} strokeWidth={1.6} />
                </span>
                <div className="min-w-0">
                  <p className="font-manrope text-[13px] leading-4.875 text-[#263238]">
                    {item.action}
                  </p>
                  <p className="pt-px font-manrope text-[11px] leading-4.125 text-[#607d8b]">
                    {dateStr}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export function MembershipsPage() {
  const { data: stats, isLoading: isStatsLoading } = useMembershipDashboardStats();
  const { data: activities, isLoading: isActivitiesLoading } = useRecentMembershipActivity();

  return (
    <section className="mx-auto w-full min-w-0 max-w-383.5 pb-8 text-[#263238]">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-nunito text-[28px] font-medium leading-9 tracking-[-0.4px] sm:text-[32px] sm:leading-10 2xl:text-[40px] 2xl:leading-12">
            Memberships
          </h1>
          <p className="mt-0.5 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#6b6b6b]">
            Manage subscription plans and monitor member access.
          </p>
        </div>
        <Link
          href="/dashboard/admin/memberships/manage-plans"
          className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-[#2f7d7e] px-4 py-2.5 font-nunito text-sm font-medium leading-5 tracking-[-0.084px] text-white transition-colors hover:bg-[#266b6c] sm:w-36 2xl:w-36"
        >
          <Plus aria-hidden="true" size={15} strokeWidth={1.7} />
          Manage Plans
        </Link>
      </header>

      <div className="mt-8 space-y-8">
        <MembershipMetrics stats={stats} isLoading={isStatsLoading} />
        <div className="space-y-6">
          <MembershipDistribution stats={stats} isLoading={isStatsLoading} />
          <RecentMembershipActivity activities={activities} isLoading={isActivitiesLoading} />
        </div>
      </div>
    </section>
  );
}

export default MembershipsPage;
