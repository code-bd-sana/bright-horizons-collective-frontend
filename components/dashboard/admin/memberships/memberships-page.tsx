import {
  ArrowUpDown,
  BadgeDollarSign,
  ChartNoAxesCombined,
  CircleDollarSign,
  Clock3,
  Pause,
  Plus,
  Sparkles,
  UserPlus,
  UsersRound,
} from 'lucide-react';
import Link from 'next/link';

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

type MembershipActivity = {
  description: string;
  date: string;
  icon: typeof UserPlus;
  iconTone: string;
};

const metrics: Metric[] = [
  {
    value: '94',
    label: 'Total Members',
    icon: UsersRound,
    iconTone: 'border-[#dcfce7] bg-[#f0fdf4] text-[#4caf50]',
  },
  {
    value: '18',
    label: 'Little Steps Members',
    icon: Sparkles,
    iconTone: 'border-[#fef9c3] bg-[#fefce8] text-[#ca8a04]',
  },
  {
    value: '84%',
    label: 'Paid Members',
    icon: CircleDollarSign,
    iconTone: 'border-[#ffedd5] bg-[#fff7ed] text-[#f97316]',
  },
  {
    value: '312',
    label: 'Pending Upgrades',
    icon: ChartNoAxesCombined,
    iconTone: 'border-[#dbeafe] bg-[#ecfeff] text-[#0891b2]',
  },
];

const membershipPlans: MembershipPlan[] = [
  {
    name: 'Little Steps',
    members: '3',
    share: '38% of total members',
    progress: '24%',
    cardTone: 'border-[rgba(47,125,126,0.19)] bg-[#edf6f2]',
    badgeTone: 'bg-[#edf6f2] text-[#2f7d7e]',
    valueTone: 'text-[#2f7d7e]',
  },
  {
    name: 'Grow Together',
    members: '3',
    share: '38% of total members',
    progress: '24%',
    cardTone: 'border-[rgba(47,125,126,0.25)] bg-[#dcefe7]',
    badgeTone: 'bg-[#dcefe7] text-[#2f7d7e]',
    valueTone: 'text-[#2f7d7e]',
  },
  {
    name: 'Personalized Pathways',
    members: '2',
    share: '25% of total members',
    progress: '15.8%',
    cardTone: 'border-[rgba(160,90,58,0.25)] bg-[#fce9e3]',
    badgeTone: 'bg-[#fce9e2] text-[#916d5f]',
    valueTone: 'text-[#a05a3a]',
  },
];

const recentActivity: MembershipActivity[] = [
  {
    description: 'Amara Okonkwo upgraded to Grow Together',
    date: 'Jan 12, 2025',
    icon: BadgeDollarSign,
    iconTone: 'bg-[rgba(76,175,80,0.08)] text-[#4caf50]',
  },
  {
    description: 'Priya Patel registered — Little Steps',
    date: 'Mar 7, 2025',
    icon: UserPlus,
    iconTone: 'bg-[rgba(47,125,126,0.07)] text-[#2f7d7e]',
  },
  {
    description: 'Priya Patel upgraded to Grow Together',
    date: 'Mar 7, 2025',
    icon: BadgeDollarSign,
    iconTone: 'bg-[rgba(76,175,80,0.08)] text-[#4caf50]',
  },
  {
    description: 'Elena Martinez registered — Little Steps',
    date: 'Feb 3, 2025',
    icon: UserPlus,
    iconTone: 'bg-[rgba(47,125,126,0.07)] text-[#2f7d7e]',
  },
  {
    description: 'Yuki Tanaka registered — Little Steps',
    date: 'Jan 28, 2025',
    icon: UserPlus,
    iconTone: 'bg-[rgba(47,125,126,0.07)] text-[#2f7d7e]',
  },
  {
    description: 'Wei Chen upgraded to Personalized Pathways',
    date: 'Dec 15, 2024',
    icon: BadgeDollarSign,
    iconTone: 'bg-[rgba(76,175,80,0.08)] text-[#4caf50]',
  },
  {
    description: 'Lan Nguyen subscription paused',
    date: 'Mar 1, 2025',
    icon: Pause,
    iconTone: 'bg-[#fff8e1] text-[#ca8a04]',
  },
];

const quickActions = [
  {
    label: 'View Member Directory',
    href: '/dashboard/admin/memberships/member-directory',
    icon: UsersRound,
  },
  {
    label: 'Upgrade / Downgrade',
    href: '/dashboard/admin/memberships/upgrade-downgrade',
    icon: ArrowUpDown,
  },
  {
    label: 'Manage Plans',
    href: '/dashboard/admin/memberships/manage-plans',
    icon: BadgeDollarSign,
  },
  {
    label: 'Subscription History',
    href: '/dashboard/admin/memberships/subscription-history',
    icon: Clock3,
  },
] as const;

function MembershipMetrics() {
  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4" aria-label="Membership overview">
      {metrics.map(({ value, label, icon: Icon, iconTone }) => (
        <article
          key={label}
          className="flex h-38.5 items-center rounded-2xl border border-[#e8ebe8] bg-white p-4 shadow-[0_1px_1px_rgba(0,0,0,0.05)]"
        >
          <div className="flex items-start gap-3">
            <span
              className={`flex size-8 items-center justify-center rounded-lg border ${iconTone}`}
            >
              <Icon aria-hidden="true" size={18} strokeWidth={1.6} />
            </span>
            <div>
              <p className="font-nunito text-2xl font-medium leading-8 text-[#272f3a]">{value}</p>
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

function MembershipDistribution() {
  return (
    <section aria-labelledby="membership-distribution-heading">
      <h2
        id="membership-distribution-heading"
        className="font-nunito text-xl font-bold leading-7.5 text-[#263238]"
      >
        Membership Distribution
      </h2>
      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        {membershipPlans.map(
          ({ name, members, share, progress, cardTone, badgeTone, valueTone }) => (
            <article
              key={name}
              className={`h-38 rounded-2xl border p-5.25 shadow-[0_4px_6px_rgba(0,0,0,0.06)] ${cardTone}`}
            >
              <span
                className={`inline-flex rounded-full px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 ${badgeTone}`}
              >
                {name}
              </span>
              <p className={`mt-3 font-nunito text-[32px] font-bold leading-8 ${valueTone}`}>
                {members}
              </p>
              <p className="mt-1 font-manrope text-[13px] leading-[19.5px] text-[#607d8b]">
                {share}
              </p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[rgba(47,125,126,0.13)]">
                <span
                  aria-hidden="true"
                  className="block h-full rounded-full bg-[#2f7d7e]"
                  style={{ width: progress }}
                />
              </div>
            </article>
          )
        )}
      </div>
    </section>
  );
}

function RecentMembershipActivity() {
  return (
    <section
      className="rounded-2xl border border-[#e7eceb] bg-white p-6 shadow-[0_4px_6px_rgba(0,0,0,0.06)] lg:h-113.75"
      aria-labelledby="recent-membership-activity-heading"
    >
      <h2
        id="recent-membership-activity-heading"
        className="font-nunito text-lg font-bold leading-6.75 text-[#263238]"
      >
        Recent Membership Activity
      </h2>
      <div className="mt-4 flex max-w-243.5 flex-col gap-4">
        {recentActivity.map(({ description, date, icon: Icon, iconTone }) => (
          <article key={`${description}-${date}`} className="flex items-start gap-3">
            <span
              className={`flex size-8 shrink-0 items-center justify-center rounded-[14px] ${iconTone}`}
            >
              <Icon aria-hidden="true" size={14} strokeWidth={1.6} />
            </span>
            <div className="min-w-0">
              <p className="font-manrope text-[13px] leading-[19.5px] text-[#263238]">
                {description}
              </p>
              <p className="pt-px font-manrope text-[11px] leading-[16.5px] text-[#607d8b]">
                {date}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function MembershipQuickActions() {
  return (
    <section aria-labelledby="membership-quick-actions-heading">
      <h2
        id="membership-quick-actions-heading"
        className="font-nunito text-xl font-bold leading-7.5 text-[#263238]"
      >
        Quick Actions
      </h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {quickActions.map(({ label, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="flex h-28.25 flex-col items-center gap-3 rounded-2xl border border-[#e7eceb] bg-white p-5.25 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-colors hover:bg-[#f8fbfa]"
          >
            <span className="flex size-10 items-center justify-center rounded-[14px] bg-[rgba(47,125,126,0.07)] text-[#2f7d7e]">
              <Icon aria-hidden="true" size={18} strokeWidth={1.6} />
            </span>
            <span className="font-manrope text-[13px] font-semibold leading-[19.5px] text-[#263238]">
              {label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function MembershipsPage() {
  return (
    <section className="mx-auto w-full max-w-383.5 pb-8 text-[#263238]">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-nunito text-[32px] font-medium leading-10 tracking-[-0.4px] sm:text-[40px] sm:leading-12">
            Memberships
          </h1>
          <p className="mt-0.5 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#6b6b6b]">
            Manage subscription plans and monitor member access.
          </p>
        </div>
        <Link
          href="/dashboard/admin/memberships/manage-plans"
          className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-[#2f7d7e] px-4 py-2.5 font-nunito text-sm font-medium leading-5 tracking-[-0.084px] text-white transition-colors hover:bg-[#266b6c] sm:w-36"
        >
          <Plus aria-hidden="true" size={15} strokeWidth={1.7} />
          Manage Plans
        </Link>
      </header>

      <div className="mt-8 space-y-8">
        <MembershipMetrics />
        <div className="space-y-6">
          <MembershipDistribution />
          <RecentMembershipActivity />
          <MembershipQuickActions />
        </div>
      </div>
    </section>
  );
}
