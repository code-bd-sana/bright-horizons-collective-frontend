'use client';

import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

type EditMembershipPlanModalProps = {
  planName: string;
  isOpen: boolean;
  onClose: (open: boolean) => void;
};

const defaultFeatures = [
  'Everything in Little Steps plan',
  'Custom weekly activity plans tailored by age & goals',
  'Monthly physical therapy toy kit shipped to your door',
  'Direct 2-way messaging with assigned child development specialist',
  'Discounts on specialized sensory equipment catalog',
];

const defaultDescription =
  'Comprehensive weekly customized schedules, physical toy kits, and direct specialist feedback.';

function FeatureRow({
  feature,
  onChange,
  onRemove,
}: {
  feature: string;
  onChange: (value: string) => void;
  onRemove: () => void;
}) {
  const isLongFeature = feature.length > 55;

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_77px] gap-4 overflow-hidden rounded-xl border border-[#d8ddd9] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.05)]">
      <textarea
        aria-label="Included feature"
        value={feature}
        rows={isLongFeature ? 2 : 1}
        onChange={(event) => onChange(event.target.value)}
        className={`w-full resize-none bg-transparent px-4 py-2.5 font-manrope text-xs leading-4.5 text-[#515b60] outline-none ${isLongFeature ? 'h-14' : 'h-9.5'}`}
      />
      <button
        type="button"
        onClick={onRemove}
        className="flex items-center justify-center px-4 font-manrope text-xs leading-4.5 text-[#b24b4b] transition-colors hover:bg-[#fff5f4]"
      >
        Remove
      </button>
    </div>
  );
}

export function EditMembershipPlanModal({
  planName,
  isOpen,
  onClose,
}: EditMembershipPlanModalProps) {
  const [price, setPrice] = useState('$49');
  const [description, setDescription] = useState(defaultDescription);
  const [features, setFeatures] = useState(() => [...defaultFeatures]);
  const [newFeature, setNewFeature] = useState('');

  const updateFeature = (index: number, value: string) => {
    setFeatures((currentFeatures) =>
      currentFeatures.map((feature, featureIndex) => (featureIndex === index ? value : feature))
    );
  };

  const removeFeature = (index: number) => {
    setFeatures((currentFeatures) =>
      currentFeatures.filter((_, featureIndex) => featureIndex !== index)
    );
  };

  const addFeature = () => {
    const feature = newFeature.trim();
    if (!feature) return;

    setFeatures((currentFeatures) => [...currentFeatures, feature]);
    setNewFeature('');
  };

  const saveChanges = () => {
    onClose(false);
    toast.success(`${planName} plan changes saved.`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="block h-180 w-134.5 max-w-[calc(100%-2rem)] overflow-y-auto rounded-2xl bg-white p-6 text-[#263238] shadow-[0_20px_30px_rgba(0,0,0,0.12)] ring-0 scrollbar-none [&::-webkit-scrollbar]:hidden sm:max-w-134.5 md:max-h-[calc(100dvh-2rem)]"
      >
        <div className="flex flex-col gap-5">
          <header className="flex items-start justify-between">
            <DialogTitle className="font-nunito text-xl font-semibold leading-7.5 text-[#263238]">
              Edit Plan Features- {planName}
            </DialogTitle>
            <DialogClose
              aria-label="Close plan editor"
              className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#f2f1f1] text-[#263238] transition-colors hover:bg-[#e7e6e6]"
            >
              <X aria-hidden="true" size={20} strokeWidth={1.6} />
            </DialogClose>
          </header>

          <label className="flex flex-col gap-1.5 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#263238]">
            Price Display Label
            <input
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              className="h-10.5 rounded-full border border-[#d8ddd9] bg-white px-4 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#515b60] shadow-[0_1px_2px_rgba(16,24,40,0.05)] outline-none transition-shadow focus:border-[#2f7d7e] focus:ring-2 focus:ring-[#2f7d7e]/15"
            />
          </label>

          <label className="flex flex-col gap-1.5 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#263238]">
            Plan Description
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="h-22 resize-none rounded-2xl border border-[#d8ddd9] bg-white p-4 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#515b60] shadow-[0_1px_2px_rgba(16,24,40,0.05)] outline-none transition-shadow focus:border-[#2f7d7e] focus:ring-2 focus:ring-[#2f7d7e]/15"
            />
          </label>

          <section
            className="h-87.5 rounded-xl border border-[#d8ddd9] p-4 pb-3.5"
            aria-labelledby="feature-list-heading"
          >
            <h2
              id="feature-list-heading"
              className="font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#263238]"
            >
              Included Features List
            </h2>
            <div className="mt-1.5 space-y-1.5">
              {features.slice(0, 5).map((feature, index) => (
                <FeatureRow
                  key={`${feature}-${index}`}
                  feature={feature}
                  onChange={(value) => updateFeature(index, value)}
                  onRemove={() => removeFeature(index)}
                />
              ))}
            </div>
            <div className="mt-4 flex gap-3">
              <input
                value={newFeature}
                onChange={(event) => setNewFeature(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    addFeature();
                  }
                }}
                placeholder="Add a new feature point..."
                className="h-10.5 min-w-0 flex-1 rounded-xl border border-[#d8ddd9] bg-white px-4 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#515b60] shadow-[0_1px_2px_rgba(16,24,40,0.05)] outline-none placeholder:text-[#a8adaf] focus:border-[#2f7d7e] focus:ring-2 focus:ring-[#2f7d7e]/15"
              />
              <button
                type="button"
                onClick={addFeature}
                className="flex h-10.5 shrink-0 items-center gap-1 rounded-xl bg-[#515b60] px-4 py-2.5 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-white transition-colors hover:bg-[#3f474b]"
              >
                <Plus aria-hidden="true" size={15} strokeWidth={2} />
                Add
              </button>
            </div>
          </section>

          <footer className="flex items-start justify-end gap-3">
            <button
              type="button"
              onClick={() => onClose(false)}
              className="flex h-9 items-center justify-center rounded-2xl border border-[#e7eceb] px-5.25 py-2.75 font-manrope text-sm font-semibold leading-5 text-[#607d8b] transition-colors hover:bg-[#f8fbfa]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={saveChanges}
              className="flex h-9 items-center justify-center rounded-2xl bg-[#2f7d7e] px-5 py-2.5 font-manrope text-sm font-semibold leading-5 text-white transition-colors hover:bg-[#266b6c]"
            >
              Save changes
            </button>
          </footer>
        </div>
      </DialogContent>
    </Dialog>
  );
}
