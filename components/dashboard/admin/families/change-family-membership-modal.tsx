'use client';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Check, Crown, Loader2, Sparkles, WalletCards } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { useAssignFamilyMembership, type FamilyItem } from './hooks/use-admin-families';

type PlanOption = {
  id: string;
  name: string;
  tier: 'LITTLE_STEPS' | 'GROW_TOGETHER' | 'PERSONALIZED_PATHWAYS' | string;
  monthlyPrice: number;
  annualPrice: number;
  description?: string;
};

type BackendPlanItem = {
  id?: string;
  name: string;
  tier: string;
  monthlyPrice?: number;
  annualPrice?: number;
  effectiveMonthlyPrice?: number;
  effectiveAnnualPrice?: number;
  price?: number;
  description?: string;
};

const DEFAULT_PLANS: PlanOption[] = [
  {
    id: 'LITTLE_STEPS',
    name: 'Little Steps',
    tier: 'LITTLE_STEPS',
    monthlyPrice: 0,
    annualPrice: 0,
    description: 'Essential developmental milestones & starter activities',
  },
  {
    id: 'GROW_TOGETHER',
    name: 'Grow Together',
    tier: 'GROW_TOGETHER',
    monthlyPrice: 19,
    annualPrice: 190,
    description: 'Full activity library, tailored milestone tracking & parent guides',
  },
  {
    id: 'PERSONALIZED_PATHWAYS',
    name: 'Personalized Pathways',
    tier: 'PERSONALIZED_PATHWAYS',
    monthlyPrice: 49,
    annualPrice: 490,
    description: '1-on-1 therapist consultation, priority custom weekly plans & direct Q&A',
  },
];

type ChangeFamilyMembershipModalProps = {
  family: FamilyItem | null;
  isOpen: boolean;
  onClose: (open: boolean) => void;
  onSuccess?: () => void;
};

function ChangeFamilyMembershipForm({
  family,
  onClose,
  onSuccess,
}: {
  family: FamilyItem;
  onClose: (open: boolean) => void;
  onSuccess?: () => void;
}) {
  const [plans, setPlans] = useState<PlanOption[]>(DEFAULT_PLANS);
  const [loadingPlans, setLoadingPlans] = useState(false);

  // Initialize billing cycle directly from family props
  const [billingCycle, setBillingCycle] = useState<'MONTHLY' | 'ANNUAL'>(() => {
    return family.billingCycle === 'ANNUAL' ? 'ANNUAL' : 'MONTHLY';
  });

  // Initialize selected plan ID directly from family props
  const [selectedPlanId, setSelectedPlanId] = useState<string>(() => {
    const matched =
      DEFAULT_PLANS.find((p) => family.planId && p.id === family.planId) ||
      DEFAULT_PLANS.find(
        (p) => family.tierKey && p.tier.toLowerCase() === family.tierKey.toLowerCase()
      ) ||
      DEFAULT_PLANS.find(
        (p) => family.membership && p.name.toLowerCase() === family.membership.toLowerCase()
      ) ||
      DEFAULT_PLANS[0];
    return matched.id;
  });

  const { mutate: assignMembership, isPending } = useAssignFamilyMembership();

  // Load latest plans from API
  useEffect(() => {
    let isMounted = true;
    async function fetchPlans() {
      setLoadingPlans(true);
      try {
        const res = await fetch('/api/memberships/plans');
        if (res.ok) {
          const raw = await res.json();
          const items: BackendPlanItem[] = Array.isArray(raw)
            ? raw
            : Array.isArray(raw?.data)
              ? raw.data
              : [];
          if (items.length > 0 && isMounted) {
            const mapped = items.map((p) => ({
              id: p.id || p.tier,
              name: p.name,
              tier: p.tier,
              monthlyPrice: Number(p.effectiveMonthlyPrice ?? p.monthlyPrice ?? p.price ?? 0),
              annualPrice: Number(p.effectiveAnnualPrice ?? p.annualPrice ?? 0),
              description: p.description,
            }));
            setPlans(mapped);

            // Re-match plan ID if an exact backend DB ID is found
            const backendMatched =
              mapped.find((p) => family.planId && p.id === family.planId) ||
              mapped.find(
                (p) => family.tierKey && p.tier.toLowerCase() === family.tierKey.toLowerCase()
              ) ||
              mapped.find(
                (p) => family.membership && p.name.toLowerCase() === family.membership.toLowerCase()
              );
            if (backendMatched) {
              setSelectedPlanId(backendMatched.id);
            }
          }
        }
      } catch (err) {
        console.error('Failed to load plans:', err);
      } finally {
        if (isMounted) setLoadingPlans(false);
      }
    }

    fetchPlans();
    return () => {
      isMounted = false;
    };
  }, [family]);

  const selectedPlan = useMemo(
    () => plans.find((p) => p.id === selectedPlanId) || plans[0],
    [plans, selectedPlanId]
  );

  const isFreePlan = selectedPlan?.tier === 'LITTLE_STEPS' || selectedPlan?.monthlyPrice === 0;

  const handleSubmit = () => {
    if (!selectedPlan) {
      toast.error('Please select a membership plan.');
      return;
    }

    const effectiveCycle = isFreePlan ? 'MONTHLY' : billingCycle;

    assignMembership(
      {
        id: family.id,
        planId: selectedPlan.id,
        billingCycle: effectiveCycle,
      },
      {
        onSuccess: (data: { message?: string }) => {
          const planName = selectedPlan.name;
          const cycleLabel = isFreePlan
            ? 'Free'
            : effectiveCycle === 'ANNUAL'
              ? 'Yearly'
              : 'Monthly';
          toast.success(
            data?.message || `Updated membership for ${family.name} to ${planName} (${cycleLabel})`
          );
          onSuccess?.();
          onClose(false);
        },
        onError: (err: Error) => {
          toast.error(err?.message || 'Failed to update membership plan.');
        },
      }
    );
  };

  return (
    <>
      {/* Header */}
      <div className="flex items-start gap-3 sm:gap-4">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#edf6f2] text-[#2f7d7e]">
          <WalletCards aria-hidden="true" size={22} strokeWidth={1.8} />
        </span>
        <div className="min-w-0 flex-1">
          <DialogTitle className="font-nunito text-xl font-bold leading-7 text-[#263238]">
            Change Membership Plan
          </DialogTitle>
          <p className="pt-1 font-manrope text-xs leading-5 text-[#607d8b]">
            Assign or update the membership tier and billing cycle for{' '}
            <strong className="font-semibold text-[#263238]">{family.name}</strong>.
          </p>
        </div>
      </div>

      {/* Current Membership Context */}
      <div className="rounded-xl border border-[#e7eceb] bg-[#f4f8f6] p-3 text-xs font-manrope text-[#607d8b]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span>
            Current Active Plan:{' '}
            <strong className="font-semibold text-[#263238]">
              {family.membership || 'Little Steps'}
            </strong>{' '}
            {family.billingCycle
              ? `(${family.billingCycle === 'ANNUAL' ? 'Yearly' : 'Monthly'})`
              : ''}
          </span>
          <span className="truncate text-[11px] text-[#78909c]">{family.email}</span>
        </div>
      </div>

      {/* Plan Selection */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="font-manrope text-xs font-bold uppercase tracking-wider text-[#607d8b]">
            Select Target Plan
          </label>
          {loadingPlans && (
            <span className="flex items-center gap-1 font-manrope text-[11px] text-[#607d8b]">
              <Loader2 size={11} className="animate-spin" /> Loading plans...
            </span>
          )}
        </div>

        <div className="space-y-2.5">
          {plans.map((plan) => {
            const isSelected = plan.id === selectedPlanId;
            const isFree =
              plan.tier === 'LITTLE_STEPS' || (plan.monthlyPrice === 0 && plan.annualPrice === 0);
            const displayPrice = isFree
              ? 'Free'
              : billingCycle === 'ANNUAL'
                ? `$${plan.annualPrice > 0 ? plan.annualPrice : plan.monthlyPrice * 12}/yr`
                : `$${plan.monthlyPrice}/mo`;

            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlanId(plan.id)}
                className={`relative flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-all ${
                  isSelected
                    ? 'border-[#2f7d7e] bg-[#edf6f2]/60 shadow-[0_2px_8px_rgba(47,125,126,0.12)] ring-1 ring-[#2f7d7e]'
                    : 'border-[#e7eceb] bg-white hover:border-[#accbcb] hover:bg-[#fbfdfc]'
                }`}
              >
                <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-[#2f7d7e] bg-white">
                  {isSelected && <span className="size-2.5 rounded-full bg-[#2f7d7e]" />}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="font-nunito text-sm font-bold text-[#263238]">
                        {plan.name}
                      </span>
                      {plan.tier === 'PERSONALIZED_PATHWAYS' && (
                        <span className="flex items-center gap-0.5 rounded-full bg-[#fce9e2] px-1.5 py-0.5 font-manrope text-[10px] font-bold text-[#a05a3a]">
                          <Crown size={10} /> VIP
                        </span>
                      )}
                      {plan.tier === 'GROW_TOGETHER' && (
                        <span className="flex items-center gap-0.5 rounded-full bg-[#dcefe7] px-1.5 py-0.5 font-manrope text-[10px] font-bold text-[#2f7d7e]">
                          <Sparkles size={10} /> Popular
                        </span>
                      )}
                    </div>
                    <span
                      className={`font-nunito text-sm font-bold ${
                        isFree ? 'text-[#4caf50]' : 'text-[#2f7d7e]'
                      }`}
                    >
                      {displayPrice}
                    </span>
                  </div>

                  {plan.description && (
                    <p className="mt-1 line-clamp-2 font-manrope text-xs text-[#607d8b]">
                      {plan.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Billing Cycle Selection */}
      <div className="space-y-2">
        <label className="font-manrope text-xs font-bold uppercase tracking-wider text-[#607d8b]">
          Billing Cycle
        </label>

        {isFreePlan ? (
          <div className="rounded-xl border border-dashed border-[#d5e5e5] bg-[#f8fbfa] p-3 font-manrope text-xs text-[#607d8b]">
            <span className="font-semibold text-[#2f7d7e]">Standard Free Tier:</span> Little Steps
            does not require recurring billing. The family will have lifetime free access.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setBillingCycle('MONTHLY')}
              className={`flex flex-col items-center justify-center rounded-xl border p-3 transition-colors ${
                billingCycle === 'MONTHLY'
                  ? 'border-[#2f7d7e] bg-[#edf6f2] text-[#2f7d7e] ring-1 ring-[#2f7d7e]'
                  : 'border-[#e7eceb] bg-white text-[#607d8b] hover:bg-[#f8fbfa]'
              }`}
            >
              <span className="font-nunito text-sm font-bold">Monthly</span>
              <span className="mt-0.5 font-manrope text-xs opacity-80">
                ${selectedPlan?.monthlyPrice ?? 0} / month
              </span>
            </button>

            <button
              type="button"
              onClick={() => setBillingCycle('ANNUAL')}
              className={`relative flex flex-col items-center justify-center rounded-xl border p-3 transition-colors ${
                billingCycle === 'ANNUAL'
                  ? 'border-[#2f7d7e] bg-[#edf6f2] text-[#2f7d7e] ring-1 ring-[#2f7d7e]'
                  : 'border-[#e7eceb] bg-white text-[#607d8b] hover:bg-[#f8fbfa]'
              }`}
            >
              <span className="font-nunito text-sm font-bold">Yearly (Annual)</span>
              <span className="mt-0.5 font-manrope text-xs opacity-80">
                $
                {selectedPlan?.annualPrice > 0
                  ? selectedPlan.annualPrice
                  : (selectedPlan?.monthlyPrice ?? 0) * 12}{' '}
                / year
              </span>
              <span className="absolute -top-2 right-2 rounded-full bg-[#f97316] px-1.5 py-0.2 font-manrope text-[9px] font-extrabold uppercase tracking-wide text-white shadow-xs">
                Save
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Change Summary Card */}
      <div className="rounded-xl bg-[#f4f8f6] p-3">
        <p className="font-manrope text-xs leading-5 text-[#263238]">
          Assigning{' '}
          <strong className="font-bold text-[#2f7d7e]">
            {selectedPlan?.name || 'Selected Plan'}
          </strong>{' '}
          {!isFreePlan && (
            <>
              on a{' '}
              <strong className="font-bold text-[#2f7d7e]">
                {billingCycle === 'ANNUAL' ? 'Yearly' : 'Monthly'}
              </strong>{' '}
              billing cycle
            </>
          )}{' '}
          to <strong className="font-semibold text-[#263238]">{family.name}</strong>. This plan will
          activate immediately.
        </p>
      </div>

      {/* Modal Actions */}
      <div className="flex flex-col-reverse gap-2.5 border-t border-[#e7eceb] pt-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          disabled={isPending}
          onClick={() => onClose(false)}
          className="w-full rounded-[14px] border border-[#e7eceb] px-5 py-2.5 font-manrope text-sm font-semibold text-[#607d8b] transition-colors hover:bg-[#f8fbfa] disabled:opacity-50 sm:w-auto"
        >
          Cancel
        </button>
        <button
          type="button"
          disabled={isPending || !selectedPlan}
          onClick={handleSubmit}
          className="flex w-full items-center justify-center gap-2 rounded-[14px] bg-[#2f7d7e] px-5 py-2.5 font-manrope text-sm font-semibold text-white transition-colors hover:bg-[#266b6c] disabled:opacity-50 sm:w-auto"
        >
          {isPending ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Assigning Plan...</span>
            </>
          ) : (
            <>
              <Check size={16} strokeWidth={2.2} />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>
    </>
  );
}

export function ChangeFamilyMembershipModal({
  family,
  isOpen,
  onClose,
  onSuccess,
}: ChangeFamilyMembershipModalProps) {
  if (!family) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="max-h-[calc(100dvh-2rem)] w-full max-w-lg gap-5 overflow-y-auto rounded-2xl border-0 bg-white p-4 text-[#263238] shadow-[0_20px_30px_rgba(0,0,0,0.12)] sm:p-6"
      >
        <ChangeFamilyMembershipForm
          key={family.id}
          family={family}
          onClose={onClose}
          onSuccess={onSuccess}
        />
      </DialogContent>
    </Dialog>
  );
}
