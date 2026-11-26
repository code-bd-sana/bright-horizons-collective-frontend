'use client';

import { Check, Gift, Loader2, Sparkles, X } from 'lucide-react';
import type { MembershipPlan } from './membership-plans';

type BillingCycle = 'monthly' | 'annual';

export function FreePlanConfirmationModal({
  isOpen,
  onClose,
  plan,
  billingCycle,
  onConfirm,
  isActivating,
}: {
  isOpen: boolean;
  onClose: () => void;
  plan: MembershipPlan | null;
  billingCycle: BillingCycle;
  onConfirm: () => Promise<void>;
  isActivating: boolean;
}) {
  if (!isOpen || !plan) return null;

  const cycleLabel = billingCycle === 'annual' ? 'Annual (1 Year)' : 'Monthly (30 Days)';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="free-plan-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-[#d8dfdf] bg-white p-6 shadow-2xl sm:p-7">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          disabled={isActivating}
          aria-label="Close dialog"
          className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full text-[#607d8b] transition-colors hover:bg-[#f0f4f3] hover:text-[#263238] disabled:opacity-50"
        >
          <X size={18} />
        </button>

        {/* Header Icon */}
        <div className="flex items-center gap-3.5">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#edf6f5] text-[#2f7d7e] shadow-xs">
            <Gift size={24} strokeWidth={2} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2
                id="free-plan-modal-title"
                className="font-nunito text-xl font-bold leading-7 text-[#263238]"
              >
                Claim Free Membership
              </h2>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#fef3c7] px-2.5 py-0.5 font-manrope text-[11px] font-bold text-[#b45309]">
                <Sparkles size={11} />
                Special Offer
              </span>
            </div>
            <p className="mt-0.5 font-manrope text-xs leading-4.5 text-[#607d8b]">
              Activate this plan for free with no purchase required.
            </p>
          </div>
        </div>

        {/* Plan Summary Card */}
        <div className="mt-5 rounded-xl border border-[#e1ecea] bg-[#f7faf9] p-4.5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="font-nunito text-xs font-semibold uppercase tracking-wider text-[#2f7d7e]">
                Selected Plan
              </span>
              <h3 className="mt-0.5 font-nunito text-lg font-bold text-[#263238]">{plan.name}</h3>
              <p className="mt-1 font-manrope text-xs leading-5 text-[#515b60]">
                {plan.description}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <span className="font-nunito text-2xl font-extrabold text-[#2f7d7e]">$0.00</span>
              <span className="block font-manrope text-[11px] font-medium text-[#7d8488]">
                {billingCycle === 'annual' ? '/ year' : '/ month'}
              </span>
            </div>
          </div>

          <div className="mt-3.5 flex flex-wrap items-center gap-2 border-t border-[#e5eeec] pt-3 text-xs text-[#515b60]">
            <span className="inline-flex items-center gap-1 rounded-md bg-white px-2 py-1 font-medium text-[#263238] shadow-xs">
              <span className="size-1.5 rounded-full bg-[#2f7d7e]" />
              Cycle: {cycleLabel}
            </span>
            <span className="inline-flex items-center gap-1 rounded-md bg-white px-2 py-1 font-medium text-[#2f7d7e] shadow-xs">
              <Check size={12} strokeWidth={2.5} />
              100% Free
            </span>
            <span className="inline-flex items-center gap-1 rounded-md bg-white px-2 py-1 font-medium text-[#2f7d7e] shadow-xs">
              <Check size={12} strokeWidth={2.5} />
              Instant Access
            </span>
          </div>
        </div>

        {/* Highlights List */}
        <div className="mt-4 space-y-2">
          <div className="flex items-start gap-2.5 text-xs text-[#515b60]">
            <Check size={14} className="mt-0.5 shrink-0 text-[#2f7d7e]" strokeWidth={2.5} />
            <span>
              <strong>Zero payment required:</strong> No credit card or billing details needed.
            </span>
          </div>
          <div className="flex items-start gap-2.5 text-xs text-[#515b60]">
            <Check size={14} className="mt-0.5 shrink-0 text-[#2f7d7e]" strokeWidth={2.5} />
            <span>
              <strong>Full tier benefits:</strong> Instant access to all developmental activities,
              resources, and features included in {plan.name}.
            </span>
          </div>
          <div className="flex items-start gap-2.5 text-xs text-[#515b60]">
            <Check size={14} className="mt-0.5 shrink-0 text-[#2f7d7e]" strokeWidth={2.5} />
            <span>
              <strong>No commitment:</strong> You can switch or upgrade plans whenever you choose.
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={isActivating}
            className="flex h-11 items-center justify-center rounded-xl border border-[#d5e5e5] bg-white px-5 font-manrope text-sm font-semibold text-[#515b60] transition-colors hover:bg-[#f5f8f7] disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => void onConfirm()}
            disabled={isActivating}
            className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#2f7d7e] px-6 font-manrope text-sm font-bold text-white shadow-sm transition-all hover:bg-[#266b6c] disabled:opacity-60"
          >
            {isActivating ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Activating Plan...</span>
              </>
            ) : (
              <span>Confirm &amp; Activate Plan</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
