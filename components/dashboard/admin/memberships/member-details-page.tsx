import { ArrowLeft, TrendingUp, UserPlus } from 'lucide-react';
import Link from 'next/link';

import type { Member } from './member-directory-data';

const benefitsByTier = {
  'Little Steps': [
    'Access to Little Steps activity library',
    'Basic weekly plan templates',
    'Progress tracking (limited)',
    'Community resource articles',
  ],
  'Grow Together': [
    'Access to the full activity library',
    'Personalized weekly plan templates',
    'Progress tracking and family insights',
    'Community resource articles',
  ],
  'Personalized Pathways': [
    'Access to the full activity library',
    'Personalized pathways and weekly plans',
    'Advanced progress tracking and insights',
    'Priority family support resources',
  ],
} as const;

function MemberCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-2xl border border-[#e7eceb] bg-white p-6.25 shadow-[0_4px_6px_rgba(0,0,0,0.06)] ${className}`}
    >
      {children}
    </section>
  );
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="font-nunito text-lg font-bold leading-6.75 text-[#263238]">{children}</h2>;
}

function DetailTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[14px] bg-[#f4f8f6] p-3">
      <p className="font-manrope text-[11px] font-semibold leading-[16.5px] tracking-wider text-[#607d8b] uppercase">
        {label}
      </p>
      <p className="pt-1 font-manrope text-sm font-semibold leading-5.25 text-[#263238]">{value}</p>
    </div>
  );
}

export function MemberDetailsPage({ member }: { member: Member }) {
  const benefits = benefitsByTier[member.membershipTier];

  return (
    <section className="mx-auto w-full max-w-3xl pb-8">
      <Link
        href="/dashboard/admin/memberships/member-directory"
        className="inline-flex items-center gap-1.5 font-manrope text-sm font-medium leading-5 text-[#607d8b] transition-colors hover:text-[#2f7d7e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f7d7e]"
      >
        <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.8} />
        Back
      </Link>

      <MemberCard className="mt-6 flex min-h-32.75 flex-col gap-5 sm:flex-row sm:items-center">
        <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[rgba(47,125,126,0.09)] font-nunito text-xl font-bold leading-7 text-[#2f7d7e]">
          {member.initials}
        </span>
        <div className="min-w-0 flex-1">
          <h1 className="truncate font-nunito text-[22px] font-bold leading-8.25 text-[#263238]">
            {member.name}
          </h1>
          <p className="truncate font-manrope text-[13px] leading-[19.5px] text-[#607d8b]">
            {member.email}
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="rounded-full bg-[#edf6f2] px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 text-[#2f7d7e]">
              {member.membershipTier}
            </span>
            <span
              className={`rounded-full px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 ${member.status === 'Active' ? 'bg-[rgba(76,175,80,0.09)] text-[#4caf50]' : 'bg-[#fff8e1] text-[#ca8a04]'}`}
            >
              {member.status}
            </span>
          </div>
        </div>
        <Link
          href="/dashboard/admin/memberships/upgrade-downgrade"
          className="inline-flex h-10.5 shrink-0 items-center justify-center gap-2 self-start rounded-[14px] border border-[rgba(47,125,126,0.19)] bg-[rgba(47,125,126,0.07)] px-4.25 py-2.75 font-manrope text-sm font-semibold leading-5 text-[#2f7d7e] transition-colors hover:bg-[#edf6f2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f7d7e] sm:self-center"
        >
          <TrendingUp aria-hidden="true" size={14} strokeWidth={1.8} />
          Upgrade / Downgrade
        </Link>
      </MemberCard>

      <MemberCard className="mt-6 lg:h-86">
        <CardTitle>Current Membership</CardTitle>
        <div className="mt-4 flex h-22 items-center justify-between gap-4 rounded-[14px] border border-[rgba(47,125,126,0.19)] bg-[#edf6f2] p-4.25">
          <div>
            <p className="font-nunito text-xl font-bold leading-7.5 text-[#2f7d7e]">
              {member.membershipTier}
            </p>
            <p className="pt-1 font-manrope text-[13px] leading-[19.5px] text-[#607d8b]">Free</p>
          </div>
          <div className="text-right">
            <p className="font-manrope text-[11px] font-semibold leading-[16.5px] tracking-wider text-[#607d8b] uppercase">
              Renews
            </p>
            <p className="font-manrope text-sm font-semibold leading-5.25 text-[#263238]">
              {member.renewalDate}
            </p>
          </div>
        </div>
        <div className="mt-4 grid auto-rows-[65.5px] gap-4 sm:grid-cols-2">
          <DetailTile label="Start Date" value={member.joinDate} />
          <DetailTile label="Renewal Date" value={member.renewalDate} />
          <DetailTile label="Status" value={member.status} />
          <DetailTile label="Billing" value="Annual" />
        </div>
      </MemberCard>

      <MemberCard className="mt-6 lg:h-48.5">
        <CardTitle>Subscription Timeline</CardTitle>
        <p className="pt-1 font-manrope text-xs leading-4.5 text-[#607d8b]">
          This family&apos;s filtered slice of the global Subscription History.
        </p>
        <div className="relative mt-4 h-19.75">
          <div className="absolute inset-x-0 top-0 pl-10">
            <span className="absolute top-0 left-0 flex size-8 items-center justify-center rounded-full bg-[rgba(47,125,126,0.08)] text-[#2f7d7e]">
              <UserPlus aria-hidden="true" size={13} strokeWidth={1.8} />
            </span>
            <div className="pb-4">
              <span className="inline-flex rounded-full bg-[#edf6f2] px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 text-[#2f7d7e]">
                {member.membershipTier}
              </span>
              <p className="pt-1 font-manrope text-xs leading-4.5 text-[#607d8b]">
                {member.joinDate} · System
              </p>
              <p className="pt-0.75 font-manrope text-xs leading-4.5 text-[#607d8b]">
                New registration.
              </p>
            </div>
          </div>
        </div>
      </MemberCard>

      <MemberCard className="mt-6 lg:h-53.25">
        <CardTitle>Benefits Available</CardTitle>
        <ul className="mt-4 space-y-3" aria-label="Membership benefits">
          {benefits.map((benefit) => (
            <li
              key={benefit}
              className="flex items-center gap-3 font-manrope text-sm leading-5.25 text-[#263238]"
            >
              <span
                className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[rgba(47,125,126,0.13)]"
                aria-hidden="true"
              >
                <span className="size-2 rounded-full bg-[#2f7d7e]" />
              </span>
              {benefit}
            </li>
          ))}
        </ul>
      </MemberCard>

      <MemberCard className="mt-6 lg:h-77">
        <CardTitle>Activity Log</CardTitle>
        <div className="mt-4">
          {[
            ['Membership status checked by admin', 'By Sarah K.', 'Apr 4, 2025'],
            [`Upgraded to ${member.membershipTier}`, 'By James R.', member.joinDate],
            ['Account created', 'By System', member.joinDate],
          ].map(([description, author, date], index) => (
            <div
              key={description}
              className={`flex items-start justify-between gap-4 py-3 ${index < 2 ? 'border-b border-[#e7eceb]' : ''}`}
            >
              <div>
                <p className="font-manrope text-[13px] leading-[19.5px] text-[#263238]">
                  {description}
                </p>
                <p className="pt-0.5 font-manrope text-[11px] leading-[16.5px] text-[#607d8b]">
                  {author}
                </p>
              </div>
              <p className="shrink-0 font-manrope text-xs leading-4.5 text-[#607d8b]">{date}</p>
            </div>
          ))}
        </div>
      </MemberCard>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          className="inline-flex h-10.5 items-center justify-center rounded-[14px] border border-[rgba(229,115,115,0.25)] bg-[#fce9e2] px-4.25 py-2.75 font-manrope text-sm font-semibold leading-5 text-[#e57373] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e57373]"
        >
          Cancel Membership
        </button>
      </div>
    </section>
  );
}
