'use client';

import {
  Archive,
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Loader2,
  Mail,
  PlayCircle,
  UserRound,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { DeactivateFamilyModal } from './deactivate-family-modal';
import { useAdminFamilyDetails } from './hooks/use-admin-families';

const tierBadgeStyles: Record<string, string> = {
  'Little Steps': 'bg-[#edf6f2] text-[#2f7d7e]',
  'Grow Together': 'bg-[#dcefe7] text-[#2f7d7e]',
  'Personalized Pathways': 'bg-[#fce9e3] text-[#916d5f]',
  LITTLE_STEPS: 'bg-[#edf6f2] text-[#2f7d7e]',
  GROW_TOGETHER: 'bg-[#dcefe7] text-[#2f7d7e]',
  PERSONALIZED_PATHWAYS: 'bg-[#fce9e3] text-[#916d5f]',
};

function formatDate(dateStr?: string | Date | null): string {
  if (!dateStr) return 'N/A';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return String(dateStr);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return String(dateStr);
  }
}

function getInitials(name?: string, email?: string): string {
  if (name && name.trim()) {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }
  if (email && email.trim()) {
    return email.slice(0, 2).toUpperCase();
  }
  return 'FA';
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section
      className={`min-w-0 rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:p-5 2xl:p-6 ${className}`}
    >
      {children}
    </section>
  );
}

export function FamilyDetailsPage({ familyId }: { familyId: string }) {
  const router = useRouter();
  const [showDeactivate, setShowDeactivate] = useState(false);

  const { data, isLoading, isError, error, refetch } = useAdminFamilyDetails(familyId);

  if (isLoading) {
    return (
      <section className="mx-auto w-full min-w-0 max-w-232.75 pb-8 text-[#263238]">
        <button
          type="button"
          onClick={() => router.push('/dashboard/admin/families')}
          className="mb-6 flex items-center gap-1.5 font-manrope text-sm font-medium text-[#607d8b] transition-colors hover:text-[#2f7d7e]"
        >
          <ArrowLeft aria-hidden="true" size={16} />
          Back to Families
        </button>
        <div className="flex flex-col items-center justify-center rounded-2xl border border-[#e7eceb] bg-white py-24 shadow-sm">
          <Loader2 className="size-10 animate-spin text-[#2f7d7e]" />
          <p className="mt-3 font-manrope text-sm font-medium text-[#607d8b]">
            Loading family details...
          </p>
        </div>
      </section>
    );
  }

  if (isError || !data?.user) {
    return (
      <section className="mx-auto w-full min-w-0 max-w-232.75 pb-8 text-[#263238]">
        <button
          type="button"
          onClick={() => router.push('/dashboard/admin/families')}
          className="mb-6 flex items-center gap-1.5 font-manrope text-sm font-medium text-[#607d8b] transition-colors hover:text-[#2f7d7e]"
        >
          <ArrowLeft aria-hidden="true" size={16} />
          Back to Families
        </button>
        <div className="rounded-2xl border border-dashed border-[#e57373] bg-[#fff5f5] p-8 text-center font-manrope">
          <p className="text-base font-semibold text-[#c62828]">Family Not Found</p>
          <p className="mt-1 text-sm text-[#78909c]">
            {error instanceof Error ? error.message : 'Unable to load details for this family.'}
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => refetch()}
              className="rounded-xl border border-[#e7eceb] bg-white px-4 py-2 font-manrope text-xs font-semibold text-[#607d8b] shadow-sm hover:bg-[#f8fbfa]"
            >
              Try Again
            </button>
            <button
              type="button"
              onClick={() => router.push('/dashboard/admin/families')}
              className="rounded-xl bg-[#2f7d7e] px-4 py-2 font-manrope text-xs font-semibold text-white shadow-sm hover:bg-[#266b6c]"
            >
              Return to Families
            </button>
          </div>
        </div>
      </section>
    );
  }

  const {
    user,
    children = [],
    activeSubscription,
    membership = 'Little Steps',
    activityLog = [],
  } = data;
  const initials = getInitials(user.name, user.email);
  const membershipBadgeStyle = tierBadgeStyles[membership] || 'bg-[#edf6f2] text-[#2f7d7e]';
  const isActive = user.status?.toLowerCase() === 'active';

  const parentInfo = [
    ['Name', user.name],
    ['Email', user.email],
    ['Phone', user.phone || 'N/A'],
    ['Relationship', user.relationship || 'Parent'],
    ['Status', isActive ? 'Active' : 'Inactive'],
    ['Registered', formatDate(user.createdAt)],
  ];

  const currentPlanName = activeSubscription?.plan?.name || membership || 'Little Steps';
  const subscriptionStatus = activeSubscription?.status || (isActive ? 'Active' : 'Inactive');
  const subscriptionStart = activeSubscription?.currentPeriodStart || user.createdAt;
  const subscriptionEnd = activeSubscription?.currentPeriodEnd;

  return (
    <section className="mx-auto w-full min-w-0 max-w-232.75 pb-8 text-[#263238]">
      <button
        type="button"
        onClick={() => router.push('/dashboard/admin/families')}
        className="mb-6 flex items-center gap-1.5 font-manrope text-sm font-medium text-[#607d8b] transition-colors hover:text-[#2f7d7e]"
      >
        <ArrowLeft aria-hidden="true" size={16} />
        Back to Families
      </button>

      <div className="space-y-6">
        {/* Header Overview Card */}
        <Card>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            {user.profileImage ? (
              <span className="relative size-16 shrink-0 overflow-hidden rounded-full bg-[#2f7d7e]">
                <Image
                  src={user.profileImage}
                  alt={user.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </span>
            ) : (
              <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-[#edf6f2] font-nunito text-xl font-bold text-[#2f7d7e]">
                {initials}
              </span>
            )}

            <div className="min-w-0 flex-1">
              <h1 className="truncate font-nunito text-[22px] font-bold leading-8.25 text-[#263238]">
                {user.name}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-0.5 font-manrope text-xs font-semibold ${membershipBadgeStyle}`}
                >
                  {membership}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 font-manrope text-xs font-semibold ${
                    isActive ? 'bg-[#edf6f2] text-[#4caf50]' : 'bg-[#fef2f2] text-[#dc2626]'
                  }`}
                >
                  {isActive ? 'Active' : 'Inactive'}
                </span>
                <span className="font-manrope text-xs font-medium text-[#607d8b]">
                  Joined {formatDate(user.createdAt)}
                </span>
              </div>
            </div>

            <div className="flex w-full shrink-0 gap-2 sm:w-auto">
              <a
                href={`mailto:${user.email}`}
                className="flex h-10 flex-1 items-center justify-center gap-2 rounded-[14px] border border-[rgba(47,125,126,0.19)] bg-[rgba(47,125,126,0.07)] px-4 font-manrope text-sm font-semibold text-[#2f7d7e] transition-colors hover:bg-[#edf6f2] sm:flex-initial"
              >
                <Mail aria-hidden="true" size={14} />
                Email Parent
              </a>
            </div>
          </div>
        </Card>

        {/* Parent Information Card */}
        <Card>
          <h2 className="font-nunito text-lg font-bold leading-7 text-[#263238]">
            Parent Information
          </h2>
          <dl className="mt-4 grid gap-x-4 gap-y-4 sm:grid-cols-2 2xl:grid-cols-2">
            {parentInfo.map(([label, value]) => (
              <div key={label} className="rounded-[14px] bg-[#f4f8f6] p-3">
                <dt className="font-manrope text-[11px] font-semibold uppercase tracking-[0.55px] text-[#607d8b]">
                  {label}
                </dt>
                <dd className="mt-1 font-manrope text-sm font-semibold text-[#263238]">{value}</dd>
              </div>
            ))}
          </dl>
        </Card>

        {/* Membership Card */}
        <Card>
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-nunito text-lg font-bold leading-7 text-[#263238]">Membership</h2>
            <Link
              href="/dashboard/admin/memberships"
              className="flex items-center gap-1.5 font-manrope text-sm font-semibold text-[#2f7d7e] transition-colors hover:underline"
            >
              Manage Memberships <ArrowUpRight aria-hidden="true" size={13} />
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4">
            {[
              ['Current Plan', currentPlanName],
              ['Status', subscriptionStatus],
              ['Join / Start Date', formatDate(subscriptionStart)],
              ['Renewal Date', subscriptionEnd ? formatDate(subscriptionEnd) : 'N/A'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[14px] bg-[#f4f8f6] p-3">
                <p className="font-manrope text-[11px] font-semibold uppercase tracking-[0.55px] text-[#607d8b]">
                  {label}
                </p>
                <p className="mt-1 font-manrope text-sm font-semibold text-[#263238]">{value}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Children Card */}
        <Card>
          <h2 className="font-nunito text-lg font-bold leading-7 text-[#263238]">
            Children <span className="text-xs font-medium text-[#607d8b]">({children.length})</span>
          </h2>

          {children.length === 0 ? (
            <p className="mt-4 font-manrope text-sm text-[#90a4ae]">
              No children registered for this family yet.
            </p>
          ) : (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {children.map((child) => {
                const childAge = child.ageYears || child.age || 0;
                const childInitial = child.name ? child.name.slice(0, 1).toUpperCase() : 'C';

                return (
                  <div
                    key={child.id}
                    className="min-w-0 rounded-[14px] border border-[#e7eceb] bg-[#f4f8f6] p-4"
                  >
                    <div className="flex items-center gap-3">
                      {child.photoUrl ? (
                        <span className="relative size-10 shrink-0 overflow-hidden rounded-full border border-[#d5e5e5]">
                          <Image
                            src={child.photoUrl}
                            alt={child.name}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        </span>
                      ) : (
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[rgba(143,185,168,0.25)] font-nunito text-sm font-bold text-[#2f7d7e]">
                          {childInitial}
                        </span>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-manrope text-sm font-semibold text-[#263238]">
                          {child.name}
                        </p>
                        <p className="font-manrope text-xs text-[#607d8b]">
                          {childAge > 0 ? `${childAge} yrs` : 'Age not set'}
                          {child.gender ? ` · ${child.gender}` : ''}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 space-y-2 border-t border-[#e7eceb] pt-3 text-xs">
                      <div>
                        <span className="font-manrope font-semibold text-[#607d8b]">
                          Areas of Support:{' '}
                        </span>
                        <span className="font-manrope text-[#263238]">
                          {child.areasOfSupport && child.areasOfSupport.length > 0
                            ? child.areasOfSupport.join(', ')
                            : 'General development'}
                        </span>
                      </div>
                      <div>
                        <span className="font-manrope font-semibold text-[#607d8b]">
                          Interests & Favorites:{' '}
                        </span>
                        <span className="font-manrope text-[#263238]">
                          {child.interests ||
                            (child.favorites && child.favorites.length > 0
                              ? child.favorites.join(', ')
                              : 'None listed')}
                        </span>
                      </div>
                      {child.caregiverName && (
                        <div>
                          <span className="font-manrope font-semibold text-[#607d8b]">
                            Caregiver:{' '}
                          </span>
                          <span className="font-manrope text-[#263238]">
                            {child.caregiverName}
                            {child.caregiverRelationship ? ` (${child.caregiverRelationship})` : ''}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        {/* Recent Activity Card */}
        <Card>
          <h2 className="font-nunito text-lg font-bold leading-7 text-[#263238]">
            Recent Activity
          </h2>
          <div className="mt-4 space-y-4">
            {activityLog.length === 0 ? (
              <p className="font-manrope text-sm text-[#90a4ae]">No recent activity recorded.</p>
            ) : (
              activityLog.map((activity, idx) => {
                const IconComponent =
                  activity.iconType === 'PlayCircle'
                    ? PlayCircle
                    : activity.iconType === 'CalendarDays'
                      ? CalendarDays
                      : UserRound;

                return (
                  <div key={`${activity.message}-${idx}`} className="flex items-start gap-3">
                    <span
                      className={`flex size-8 shrink-0 items-center justify-center rounded-[14px] ${activity.colorClass}`}
                    >
                      <IconComponent aria-hidden="true" size={14} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-manrope text-[13px] font-medium text-[#263238]">
                        {activity.message}
                      </p>
                      <p className="mt-0.5 font-manrope text-[11px] text-[#607d8b]">
                        {formatDate(activity.date)}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Card>

        {/* Footer Actions */}
        <div className="flex sm:justify-end 2xl:justify-end">
          <button
            type="button"
            onClick={() => setShowDeactivate(true)}
            className="flex h-10 w-full items-center justify-center gap-2 rounded-[14px] border border-[rgba(184,134,11,0.25)] bg-[#fff8e1] px-4 font-manrope text-sm font-semibold text-[#b8860b] transition-colors hover:bg-[#fef3c7] sm:w-auto 2xl:w-auto"
          >
            <Archive aria-hidden="true" size={14} />
            Deactivate Family
          </button>
        </div>
      </div>

      <DeactivateFamilyModal
        familyName={showDeactivate ? user.name : null}
        onClose={(open) => !open && setShowDeactivate(false)}
        onConfirm={() => {
          toast.success(`${user.name}'s account has been deactivated.`);
          setShowDeactivate(false);
        }}
      />
    </section>
  );
}
