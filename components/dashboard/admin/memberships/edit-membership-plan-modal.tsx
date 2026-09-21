'use client';

import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog';
import {
  Plus,
  X,
  Loader2,
  Info,
  Sparkles,
  Tag,
  Calendar,
  CheckCircle2,
  Trash2,
} from 'lucide-react';
import { useState, useMemo } from 'react';
import { toast } from 'sonner';

export type AdminMembershipPlan = {
  id: string;
  tier: 'LITTLE_STEPS' | 'GROW_TOGETHER' | 'PERSONALIZED_PATHWAYS';
  name: string;
  description: string | null;
  price: number;
  monthlyPrice: number;
  monthlyDiscount: number;
  annualPrice: number;
  annualDiscount: number;
  effectiveMonthlyPrice: number;
  effectiveAnnualPrice: number;
  activeMembersCount?: number;
  features: string[];
  isActive: boolean;
  isPopular: boolean;
  createdAt?: string;
  updatedAt?: string;
};

type EditMembershipPlanModalProps = {
  plan: AdminMembershipPlan | null;
  isOpen: boolean;
  onClose: (open: boolean) => void;
  onPlanUpdated: (updatedPlan: AdminMembershipPlan) => void;
};

function FeatureRow({
  feature,
  onChange,
  onRemove,
}: {
  feature: string;
  onChange: (value: string) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center gap-2 overflow-hidden rounded-xl border border-[#d8ddd9] bg-white p-2 shadow-xs transition-colors focus-within:border-[#2f7d7e] focus-within:ring-2 focus-within:ring-[#2f7d7e]/15">
      <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#edf6f2] text-[#2f7d7e]">
        <CheckCircle2 size={13} />
      </div>
      <input
        type="text"
        aria-label="Included feature"
        value={feature}
        onChange={(event) => onChange(event.target.value)}
        className="min-w-0 flex-1 bg-transparent font-manrope text-xs leading-4.5 text-[#263238] outline-none"
      />
      <button
        type="button"
        onClick={onRemove}
        title="Remove benefit"
        className="flex size-7 shrink-0 items-center justify-center rounded-lg text-[#90a4ae] transition-colors hover:bg-[#fff5f4] hover:text-[#d32f2f]"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}

export function EditMembershipPlanModal({
  plan,
  isOpen,
  onClose,
  onPlanUpdated,
}: EditMembershipPlanModalProps) {
  const isFreePlan = plan?.tier === 'LITTLE_STEPS';

  const [name, setName] = useState(plan?.name ?? '');
  const [description, setDescription] = useState(plan?.description ?? '');
  const [monthlyPrice, setMonthlyPrice] = useState<number>(plan?.monthlyPrice ?? 0);
  const [monthlyDiscount, setMonthlyDiscount] = useState<number>(plan?.monthlyDiscount ?? 0);
  const [annualPrice, setAnnualPrice] = useState<number>(plan?.annualPrice ?? 0);
  const [annualDiscount, setAnnualDiscount] = useState<number>(plan?.annualDiscount ?? 0);
  const [isPopular, setIsPopular] = useState<boolean>(plan?.isPopular ?? false);
  const [features, setFeatures] = useState<string[]>(plan?.features ? [...plan.features] : []);
  const [newFeature, setNewFeature] = useState('');
  const [saving, setSaving] = useState(false);

  // Live Effective Calculation
  const computedEffectiveMonthly = useMemo(() => {
    if (isFreePlan || monthlyPrice <= 0) return 0;
    const discount = Math.min(100, Math.max(0, monthlyDiscount));
    return Math.max(0, Math.round(monthlyPrice * (1 - discount / 100) * 100) / 100);
  }, [isFreePlan, monthlyPrice, monthlyDiscount]);

  const computedEffectiveAnnual = useMemo(() => {
    if (isFreePlan) return 0;
    const base = annualPrice > 0 ? annualPrice : monthlyPrice * 12;
    const discount = Math.min(100, Math.max(0, annualDiscount));
    return Math.max(0, Math.round(base * (1 - discount / 100) * 100) / 100);
  }, [isFreePlan, annualPrice, monthlyPrice, annualDiscount]);

  const updateFeature = (index: number, value: string) => {
    setFeatures((currentFeatures) => currentFeatures.map((f, i) => (i === index ? value : f)));
  };

  const removeFeature = (index: number) => {
    setFeatures((currentFeatures) => currentFeatures.filter((_, i) => i !== index));
  };

  const addFeature = () => {
    const feature = newFeature.trim();
    if (!feature) return;
    setFeatures((currentFeatures) => [...currentFeatures, feature]);
    setNewFeature('');
  };

  const handleSave = async () => {
    if (!plan) return;
    setSaving(true);

    try {
      type UpdatePayload = {
        name: string;
        description: string;
        features: string[];
        isPopular: boolean;
        monthlyPrice?: number;
        monthlyDiscount?: number;
        annualPrice?: number;
        annualDiscount?: number;
      };

      const payload: UpdatePayload = {
        name: name.trim(),
        description: description.trim(),
        features: features.map((f) => f.trim()).filter(Boolean),
        isPopular,
      };

      if (!isFreePlan) {
        payload.monthlyPrice = Number(monthlyPrice);
        payload.monthlyDiscount = Number(monthlyDiscount);
        payload.annualPrice = Number(annualPrice);
        payload.annualDiscount = Number(annualDiscount);
      } else {
        payload.monthlyPrice = 0;
        payload.monthlyDiscount = 0;
        payload.annualPrice = 0;
        payload.annualDiscount = 0;
      }

      const response = await fetch(`/api/memberships/plans/${plan.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to update plan.');
      }

      const raw = await response.json();
      const updated =
        raw && typeof raw === 'object' && 'data' in raw
          ? ((raw as Record<string, unknown>).data as AdminMembershipPlan)
          : (raw as AdminMembershipPlan);
      toast.success(`${updated.name} plan updated successfully.`);
      onPlanUpdated({
        ...plan,
        ...updated,
        activeMembersCount: plan.activeMembersCount,
      });
      onClose(false);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unable to save plan changes.';
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="flex flex-col h-auto max-h-[70vh] w-[calc(100%-2rem)] sm:max-w-3xl lg:max-w-4xl overflow-hidden rounded-3xl bg-white p-0 text-[#263238] shadow-[0_24px_50px_rgba(0,0,0,0.18)] ring-0"
      >
        {/* Pinned Modal Header */}
        <header className="shrink-0 flex items-start justify-between border-b border-[#e7eceb] px-6 py-4.5 sm:px-8 bg-white rounded-t-3xl">
          <div className="flex items-center gap-3">
            <div className="flex size-10 sm:size-11 items-center justify-center rounded-2xl bg-[#edf6f2] text-[#2f7d7e]">
              <Tag size={20} />
            </div>
            <div>
              <span className="font-manrope text-[11px] font-semibold uppercase tracking-wider text-[#2f7d7e]">
                Membership Plan Configuration
              </span>
              <DialogTitle className="font-nunito text-lg font-bold text-[#263238] sm:text-xl">
                Edit {plan?.name ?? 'Membership Plan'}
              </DialogTitle>
            </div>
          </div>
          <DialogClose
            aria-label="Close plan editor"
            className="flex size-8.5 sm:size-9 shrink-0 items-center justify-center rounded-xl bg-[#f2f1f1] text-[#263238] transition-colors hover:bg-[#e7e6e6]"
          >
            <X aria-hidden="true" size={17} strokeWidth={2} />
          </DialogClose>
        </header>

        {/* Scrollable Content Body */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-6 py-5 sm:px-8 space-y-5">
          {/* Top Section: Plan Name, Popularity & Description in a clean 2-column grid */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-3.5">
              <label className="flex flex-col gap-1.5 font-manrope text-xs font-semibold text-[#515b60]">
                Plan Name
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-11 rounded-xl border border-[#d8ddd9] bg-white px-4 font-manrope text-sm text-[#263238] shadow-xs outline-none transition-shadow focus:border-[#2f7d7e] focus:ring-2 focus:ring-[#2f7d7e]/15"
                  placeholder="e.g. Grow Together"
                />
              </label>

              <label className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-[#e7eceb] bg-[#fbfdfc] p-3 text-xs font-semibold text-[#263238] transition-colors hover:bg-[#f3f8f6]">
                <input
                  type="checkbox"
                  checked={isPopular}
                  onChange={(e) => setIsPopular(e.target.checked)}
                  className="size-4 rounded text-[#2f7d7e] focus:ring-[#2f7d7e]"
                />
                <span className="flex items-center gap-1.5">
                  <Sparkles size={14} className="text-[#f97316]" />
                  Highlight as &quot;Most Popular&quot; tier
                </span>
              </label>
            </div>

            <label className="flex flex-col gap-1.5 font-manrope text-xs font-semibold text-[#515b60]">
              Plan Description
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="resize-none rounded-xl border border-[#d8ddd9] bg-white p-3 font-manrope text-sm leading-relaxed text-[#263238] shadow-xs outline-none transition-shadow focus:border-[#2f7d7e] focus:ring-2 focus:ring-[#2f7d7e]/15"
                placeholder="Short description highlighting the target audience and value proposition"
              />
            </label>
          </div>

          {/* Pricing & Discounts Section */}
          {isFreePlan ? (
            <div className="flex items-center gap-3 rounded-2xl border border-[rgba(47,125,126,0.2)] bg-[#edf6f2] p-4 text-xs text-[#2f7d7e]">
              <Info size={20} className="shrink-0" />
              <span>
                <strong>Little Steps</strong> is the permanently free tier auto-assigned to all
                registered parents. Pricing and discount options are locked at $0.
              </span>
            </div>
          ) : (
            <div className="rounded-2xl border border-[#e7eceb] bg-[#f8fbfa] p-5">
              <div className="flex items-center justify-between border-b border-[#e7eceb] pb-3">
                <div className="flex items-center gap-2 font-nunito text-base font-bold text-[#263238]">
                  <Tag size={18} className="text-[#2f7d7e]" />
                  <span>Subscription Pricing &amp; Discounts</span>
                </div>
                <span className="font-manrope text-xs text-[#607d8b]">
                  Calculated automatically on checkout
                </span>
              </div>

              {/* 2-Column Grid: Monthly on Left, Annual on Right */}
              <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Monthly Card */}
                <div className="flex flex-col rounded-xl border border-[#e0e8e5] bg-white p-4 shadow-xs">
                  <div className="flex items-center gap-1.5 pb-3 font-nunito text-sm font-bold text-[#263238]">
                    <Calendar size={16} className="text-[#2f7d7e]" />
                    <span>Monthly Billing</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex flex-col gap-1 font-manrope text-xs font-semibold text-[#515b60]">
                      Base Price ($)
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={monthlyPrice}
                        onChange={(e) => setMonthlyPrice(Number(e.target.value))}
                        className="h-10 rounded-xl border border-[#d8ddd9] bg-white px-3 font-manrope text-sm font-medium text-[#263238] shadow-xs outline-none focus:border-[#2f7d7e]"
                      />
                    </label>
                    <label className="flex flex-col gap-1 font-manrope text-xs font-semibold text-[#515b60]">
                      Discount (%)
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="1"
                        value={monthlyDiscount}
                        onChange={(e) => setMonthlyDiscount(Number(e.target.value))}
                        className="h-10 rounded-xl border border-[#d8ddd9] bg-white px-3 font-manrope text-sm font-medium text-[#263238] shadow-xs outline-none focus:border-[#2f7d7e]"
                      />
                    </label>
                  </div>

                  {/* Monthly Effective Price Box */}
                  <div className="mt-3 rounded-lg bg-[#edf6f2] p-2.5 text-center">
                    <span className="block font-manrope text-[11px] text-[#607d8b]">
                      Effective Monthly Charge
                    </span>
                    <span className="font-nunito text-lg font-bold text-[#2f7d7e]">
                      ${computedEffectiveMonthly.toFixed(2)}{' '}
                      <span className="text-xs font-normal text-[#607d8b]">/ month</span>
                    </span>
                    {monthlyDiscount > 0 && (
                      <span className="ml-1.5 rounded-full bg-[#f97316]/10 px-1.5 py-0.5 text-[10px] font-bold text-[#f97316]">
                        {monthlyDiscount}% off
                      </span>
                    )}
                  </div>
                </div>

                {/* Annual Card */}
                <div className="flex flex-col rounded-xl border border-[#e0e8e5] bg-white p-4 shadow-xs">
                  <div className="flex items-center gap-1.5 pb-3 font-nunito text-sm font-bold text-[#263238]">
                    <Sparkles size={16} className="text-[#a05a3a]" />
                    <span>Annual Billing</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex flex-col gap-1 font-manrope text-xs font-semibold text-[#515b60]">
                      Base Price ($)
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={annualPrice}
                        onChange={(e) => setAnnualPrice(Number(e.target.value))}
                        className="h-10 rounded-xl border border-[#d8ddd9] bg-white px-3 font-manrope text-sm font-medium text-[#263238] shadow-xs outline-none focus:border-[#2f7d7e]"
                      />
                    </label>
                    <label className="flex flex-col gap-1 font-manrope text-xs font-semibold text-[#515b60]">
                      Discount (%)
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="1"
                        value={annualDiscount}
                        onChange={(e) => setAnnualDiscount(Number(e.target.value))}
                        className="h-10 rounded-xl border border-[#d8ddd9] bg-white px-3 font-manrope text-sm font-medium text-[#263238] shadow-xs outline-none focus:border-[#2f7d7e]"
                      />
                    </label>
                  </div>

                  {/* Annual Effective Price Box */}
                  <div className="mt-3 rounded-lg bg-[#fce9e2] p-2.5 text-center">
                    <span className="block font-manrope text-[11px] text-[#8e4d30]">
                      Effective Annual Charge
                    </span>
                    <span className="font-nunito text-lg font-bold text-[#a05a3a]">
                      ${computedEffectiveAnnual.toFixed(2)}{' '}
                      <span className="text-xs font-normal text-[#8e4d30]">/ year</span>
                    </span>
                    {annualDiscount > 0 && (
                      <span className="ml-1.5 rounded-full bg-[#2f7d7e]/10 px-1.5 py-0.5 text-[10px] font-bold text-[#2f7d7e]">
                        Save {annualDiscount}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Features List Section (2-Column Responsive Grid) */}
          <section className="rounded-2xl border border-[#d8ddd9] bg-[#fbfdfc] p-5">
            <div className="flex items-center justify-between border-b border-[#e7eceb] pb-3">
              <div>
                <h3 className="font-nunito text-base font-bold text-[#263238]">
                  Included Plan Benefits
                </h3>
                <p className="font-manrope text-xs text-[#7d8488]">
                  Features displayed to parents on the membership selection cards.
                </p>
              </div>
              <span className="rounded-full bg-[#edf6f2] px-2.5 py-0.5 font-manrope text-xs font-semibold text-[#2f7d7e]">
                {features.length} Benefit{features.length === 1 ? '' : 's'}
              </span>
            </div>

            {/* 2-column grid on md+ screens */}
            <div className="mt-4 max-h-56 space-y-2.5 overflow-y-auto pr-1 md:grid md:grid-cols-2 md:gap-3 md:space-y-0">
              {features.map((feature, index) => (
                <FeatureRow
                  key={`${feature}-${index}`}
                  feature={feature}
                  onChange={(val) => updateFeature(index, val)}
                  onRemove={() => removeFeature(index)}
                />
              ))}
            </div>

            {/* Add Benefit Input */}
            <div className="mt-4 flex gap-2.5">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addFeature();
                  }
                }}
                placeholder="Add another benefit bullet point..."
                className="h-10.5 min-w-0 flex-1 rounded-xl border border-[#d8ddd9] bg-white px-3.5 font-manrope text-xs text-[#263238] shadow-xs outline-none focus:border-[#2f7d7e] focus:ring-2 focus:ring-[#2f7d7e]/15"
              />
              <button
                type="button"
                onClick={addFeature}
                className="flex h-10.5 shrink-0 items-center gap-1.5 rounded-xl bg-[#2f7d7e] px-4 font-manrope text-xs font-semibold text-white shadow-xs transition-colors hover:bg-[#266b6c]"
              >
                <Plus size={15} />
                <span>Add Benefit</span>
              </button>
            </div>
          </section>
        </div>

        {/* Pinned Modal Footer */}
        <footer className="shrink-0 flex items-center justify-end gap-3 border-t border-[#e7eceb] px-6 py-4 sm:px-8 bg-white rounded-b-3xl">
          <button
            type="button"
            disabled={saving}
            onClick={() => onClose(false)}
            className="flex h-10.5 items-center justify-center rounded-xl border border-[#e7eceb] bg-white px-5 font-manrope text-sm font-semibold text-[#607d8b] shadow-xs transition-colors hover:bg-[#f8fbfa] disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={saving}
            onClick={handleSave}
            className="flex h-10.5 items-center justify-center gap-2 rounded-xl bg-[#2f7d7e] px-6 font-manrope text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#266b6c] disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Saving Changes...</span>
              </>
            ) : (
              <span>Save Changes</span>
            )}
          </button>
        </footer>
      </DialogContent>
    </Dialog>
  );
}
