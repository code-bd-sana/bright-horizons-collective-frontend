'use client';

import Link from 'next/link';
import { toast } from 'sonner';

import { resourceFormSteps, type ResourceFormStep } from './resource-form-stepper';

type ResourceFormNavigationProps = {
  currentStep: ResourceFormStep;
  nextButtonType?: 'button' | 'submit';
  saveChangesButtonType?: 'button' | 'submit';
  onNext?: () => void;
  onSaveChanges?: () => void;
  onSaveDraft?: () => void;
  onPreview?: () => void;
};

export function ResourceFormNavigation({
  currentStep,
  nextButtonType = 'button',
  saveChangesButtonType = 'button',
  onNext,
  onSaveChanges,
  onSaveDraft,
  onPreview,
}: ResourceFormNavigationProps) {
  const previousStep = resourceFormSteps.find(({ number }) => number === currentStep - 1);

  return (
    <footer className="mt-5 flex flex-col gap-4 rounded-2xl border border-[#e7eceb] bg-white p-5 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:flex-row sm:items-center sm:justify-between sm:p-5.25">
      <div className="flex gap-2">
        {previousStep ? (
          <Link
            href={previousStep.href}
            className="flex h-10.5 items-center rounded-[14px] border border-[#e7eceb] px-4.25 font-manrope text-sm font-semibold leading-5 text-[#607d8b]"
          >
            ← Previous
          </Link>
        ) : (
          <button
            type="button"
            disabled
            className="h-10.5 rounded-[14px] border border-[#e7eceb] px-4.25 font-manrope text-sm font-semibold leading-5 text-[#9aa8ae] disabled:cursor-not-allowed"
          >
            ← Previous
          </button>
        )}
        <button
          type={nextButtonType}
          onClick={nextButtonType === 'button' ? onNext : undefined}
          className="h-10.5 rounded-[14px] border border-[#2f7d7e] px-4.25 font-manrope text-sm font-semibold leading-5 text-[#2f7d7e]"
        >
          Next →
        </button>
      </div>
      <div className="flex flex-wrap gap-2 sm:justify-end">
        <button
          type="button"
          onClick={onSaveDraft ?? (() => toast.success('Resource saved as a draft.'))}
          className="h-10.5 rounded-[14px] border border-[#e7eceb] px-4.25 font-manrope text-sm font-semibold leading-5 text-[#607d8b]"
        >
          Save as Draft
        </button>
        <button
          type="button"
          onClick={onPreview ?? (() => toast.message('Resource preview is ready.'))}
          className="h-10.5 rounded-[14px] border border-[#e7eceb] px-4.25 font-manrope text-sm font-semibold leading-5 text-[#607d8b]"
        >
          Preview
        </button>
        <button
          type={saveChangesButtonType}
          onClick={saveChangesButtonType === 'button' ? onSaveChanges : undefined}
          className="h-10.5 rounded-[14px] bg-[#2f7d7e] px-5 font-manrope text-sm font-semibold leading-5 text-white"
        >
          Save Changes
        </button>
      </div>
    </footer>
  );
}
