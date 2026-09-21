'use client';

import { ArrowLeft, Crown, Sparkles, RefreshCw, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { EditMembershipPlanModal, type AdminMembershipPlan } from './edit-membership-plan-modal';

const planThemes = {
  LITTLE_STEPS: {
    card: 'border-[#e7eceb] p-px',
    header: 'min-h-36 bg-[#edf6f2]',
    badge: 'bg-[#edf6f2] text-[#2f7d7e]',
    price: 'text-[#2f7d7e]',
    dot: 'bg-[rgba(47,125,126,0.13)] [&>span]:bg-[#2f7d7e]',
    primary: 'bg-[#2f7d7e] hover:bg-[#266b6c]',
  },
  GROW_TOGETHER: {
    card: 'border-[#e7eceb] p-px',
    header: 'min-h-36 bg-[#dcefe7]',
    badge: 'bg-[#dcefe7] text-[#2f7d7e]',
    price: 'text-[#2f7d7e]',
    dot: 'bg-[rgba(47,125,126,0.13)] [&>span]:bg-[#2f7d7e]',
    primary: 'bg-[#2f7d7e] hover:bg-[#266b6c]',
  },
  PERSONALIZED_PATHWAYS: {
    card: 'border-2 border-[rgba(160,90,58,0.25)] p-0.5',
    header: 'min-h-36 bg-[#fce9e2]',
    badge: 'bg-[#fce9e2] text-[#a05a3a]',
    price: 'text-[#a05a3a]',
    dot: 'bg-[rgba(160,90,58,0.13)] [&>span]:bg-[#a05a3a]',
    primary: 'bg-[#a05a3a] hover:bg-[#8e4d30]',
  },
} as const;

function extractPlans(result: unknown): AdminMembershipPlan[] {
  if (Array.isArray(result)) return result as AdminMembershipPlan[];
  if (result && typeof result === 'object') {
    const obj = result as Record<string, unknown>;
    if (Array.isArray(obj.data)) return obj.data as AdminMembershipPlan[];
  }
  return [];
}

function PlanFeatureList({
  features,
  theme,
}: {
  features: string[];
  theme: (typeof planThemes)[keyof typeof planThemes];
}) {
  const safeFeatures = Array.isArray(features) ? features : [];

  return (
    <div>
      <h2 className="font-manrope text-[11px] font-semibold leading-4 tracking-[0.55px] text-[#607d8b] uppercase">
        Included Benefits
      </h2>
      <ul className="mt-2.5 space-y-2.5">
        {safeFeatures.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <span
              className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full ${theme.dot}`}
            >
              <span className="size-1.5 rounded-full" />
            </span>
            <span className="font-manrope text-[13px] leading-4.875 text-[#263238]">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MembershipPlanCard({
  plan,
  onEdit,
}: {
  plan: AdminMembershipPlan;
  onEdit: (plan: AdminMembershipPlan) => void;
}) {
  const theme = planThemes[plan.tier] ?? planThemes.GROW_TOGETHER;
  const isFree = plan.tier === 'LITTLE_STEPS';
  const planSlug = plan.name.toLowerCase().replaceAll(' ', '-');

  const effectiveMonthly = Number(plan.effectiveMonthlyPrice ?? plan.price ?? 0);
  const effectiveAnnual = Number(
    plan.effectiveAnnualPrice ?? (plan.monthlyPrice ? plan.monthlyPrice * 12 : 0)
  );

  return (
    <article
      className={`flex min-h-140 flex-col overflow-hidden rounded-2xl border bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)] ${theme.card}`}
    >
      <header className={`shrink-0 px-5 pt-5 pb-4 sm:px-6 sm:pt-6 sm:pb-5 ${theme.header}`}>
        <div className="flex items-center justify-between gap-2 pb-2">
          {plan.tier === 'PERSONALIZED_PATHWAYS' ? (
            <span className="flex items-center gap-1 font-manrope text-[11px] font-bold tracking-[0.55px] text-[#a05a3a] uppercase">
              <Crown aria-hidden="true" size={12} strokeWidth={2} />
              Premium Tier
            </span>
          ) : (
            <span />
          )}

          {plan.isPopular && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#f97316]/10 px-2 py-0.5 font-manrope text-[10px] font-extrabold uppercase tracking-wider text-[#f97316]">
              <Sparkles size={11} />
              Most Popular
            </span>
          )}
        </div>

        <span
          className={`inline-flex rounded-full px-2.5 py-0.5 font-manrope text-xs font-semibold leading-4 ${theme.badge}`}
        >
          {plan.name}
        </span>

        {/* Pricing Display */}
        <div className="mt-2.5">
          {isFree ? (
            <p className={`font-nunito text-[28px] font-bold leading-8 ${theme.price}`}>Free</p>
          ) : (
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className={`font-nunito text-[28px] font-bold leading-8 ${theme.price}`}>
                  ${effectiveMonthly.toFixed(0)}
                </span>
                <span className="font-manrope text-xs text-[#607d8b]">/ month</span>

                {plan.monthlyDiscount > 0 && (
                  <div className="flex items-center gap-1">
                    <span className="font-manrope text-xs text-[#90a4ae] line-through">
                      ${plan.monthlyPrice}
                    </span>
                    <span className="rounded-full bg-[#f97316]/10 px-1.5 py-0.5 text-[10px] font-bold text-[#f97316]">
                      {plan.monthlyDiscount}% off
                    </span>
                  </div>
                )}
              </div>

              {/* Annual Pricing Note */}
              <div className="mt-1 flex items-center gap-1.5 font-manrope text-xs text-[#607d8b]">
                <span>Annual: ${effectiveAnnual.toFixed(0)}/yr</span>
                {plan.annualDiscount > 0 && (
                  <span className="rounded-full bg-[#2f7d7e]/10 px-1.5 py-0.2 text-[10px] font-semibold text-[#2f7d7e]">
                    Save {plan.annualDiscount}%
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Active Members Count */}
        <p className="mt-2 font-manrope text-[13px] font-medium leading-4.875 text-[#607d8b]">
          {plan.activeMembersCount ?? 0} active member
          {plan.activeMembersCount === 1 ? '' : 's'}
        </p>
      </header>

      <div className="flex min-h-0 flex-1 flex-col px-5 pt-5 pb-5 sm:px-6 sm:pb-6">
        <PlanFeatureList features={plan.features} theme={theme} />
        <div className="mt-auto border-t border-[#e7eceb] pt-4.5">
          <Link
            href={`/dashboard/admin/memberships/member-directory?tier=${planSlug}`}
            className={`flex h-10 items-center justify-center rounded-[14px] font-manrope text-sm font-semibold text-white transition-colors ${theme.primary}`}
          >
            View Members
          </Link>
          <button
            type="button"
            onClick={() => onEdit(plan)}
            className="mt-2 flex h-10.5 w-full items-center justify-center rounded-[14px] border border-[#e7eceb] bg-white font-manrope text-sm font-semibold text-[#607d8b] transition-colors hover:bg-[#f8fbfa]"
          >
            Edit Plan
          </button>
        </div>
      </div>
    </article>
  );
}

export function ManageMembershipPlansPage() {
  const [plans, setPlans] = useState<AdminMembershipPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [editingPlan, setEditingPlan] = useState<AdminMembershipPlan | null>(null);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const response = await fetch('/api/memberships/plans');
      if (!response.ok) throw new Error('Failed to load membership plans');
      const raw = await response.json();
      const plansList = extractPlans(raw);
      setPlans(plansList);
      toast.success('Membership plans refreshed.');
    } catch (err) {
      console.error(err);
      toast.error('Unable to load membership plans.');
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    async function loadInitialPlans() {
      try {
        const response = await fetch('/api/memberships/plans');
        if (!response.ok) throw new Error('Failed to load membership plans');
        const raw = await response.json();
        const plansList = extractPlans(raw);
        if (isMounted) {
          setPlans(plansList);
        }
      } catch (err) {
        console.error(err);
        toast.error('Unable to load membership plans.');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadInitialPlans();

    return () => {
      isMounted = false;
    };
  }, []);

  const handlePlanUpdated = (updatedPlan: AdminMembershipPlan) => {
    setPlans((currentPlans) =>
      currentPlans.map((p) => (p.id === updatedPlan.id ? updatedPlan : p))
    );
  };

  return (
    <section className="mx-auto w-full min-w-0 max-w-383.5 pb-8 text-[#263238]">
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/dashboard/admin/memberships"
          className="inline-flex items-center gap-1.5 font-manrope text-sm font-medium leading-5 text-[#607d8b] transition-colors hover:text-[#2f7d7e]"
        >
          <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.6} />
          Back to Memberships
        </Link>
        <button
          type="button"
          onClick={handleRefresh}
          disabled={refreshing || loading}
          className="inline-flex items-center gap-1.5 rounded-xl border border-[#e7eceb] bg-white px-3 py-1.5 font-manrope text-xs font-semibold text-[#607d8b] shadow-sm transition-colors hover:bg-[#f8fbfa] disabled:opacity-50"
        >
          <RefreshCw size={13} className={refreshing ? 'animate-spin' : ''} />
          <span>Refresh</span>
        </button>
      </div>

      <header className="mt-6">
        <h1 className="font-nunito text-2xl font-bold leading-9 text-[#263238]">
          Membership Plans
        </h1>
        <p className="pt-0.5 font-manrope text-sm leading-5.25 text-[#607d8b]">
          Configure pricing, discounts, and included benefits for each membership tier. Changes
          apply immediately across the platform.
        </p>
      </header>

      {loading ? (
        <div className="mt-12 flex flex-col items-center justify-center py-20">
          <Loader2 className="size-10 animate-spin text-[#2f7d7e]" />
          <p className="mt-3 font-manrope text-sm text-[#607d8b]">Loading membership plans...</p>
        </div>
      ) : Array.isArray(plans) && plans.length > 0 ? (
        <div className="mt-6 grid max-w-378 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <MembershipPlanCard key={plan.id} plan={plan} onEdit={setEditingPlan} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-[#d8ddd9] bg-white p-12 text-center text-sm text-[#7d8488]">
          No membership plans found.
        </div>
      )}

      {editingPlan && (
        <EditMembershipPlanModal
          key={editingPlan.id}
          plan={editingPlan}
          isOpen={editingPlan !== null}
          onClose={(open) => {
            if (!open) setEditingPlan(null);
          }}
          onPlanUpdated={handlePlanUpdated}
        />
      )}
    </section>
  );
}
