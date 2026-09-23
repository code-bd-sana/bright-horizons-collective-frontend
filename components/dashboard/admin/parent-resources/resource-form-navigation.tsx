'use client';

import Link from 'next/link';

import { resourceFormSteps, type ResourceFormStep } from './resource-form-stepper';

type ResourceFormNavigationProps = {
  currentStep: ResourceFormStep;
  showNext?: boolean;
  nextButtonType?: 'button' | 'submit';
  isSubmitting?: boolean;
  isSavingDraft?: boolean;
  showPrimaryAction?: boolean;
  primaryActionText?: string;
  primaryActionButtonType?: 'button' | 'submit';
  onNext?: () => void;
  onPrevious?: () => void;
  onSaveDraft?: () => void;
  onPrimaryAction?: () => void;
};

export function ResourceFormNavigation({
  currentStep,
  showNext = currentStep < 7,
  nextButtonType = 'button',
  isSubmitting = false,
  isSavingDraft = false,
  showPrimaryAction = currentStep === 7,
  primaryActionText = 'Add Resource',
  primaryActionButtonType = 'button',
  onNext,
  onPrevious,
  onSaveDraft,
  onPrimaryAction,
}: ResourceFormNavigationProps) {
  const previousStep = resourceFormSteps.find(({ number }) => number === currentStep - 1);
  const isBusy = isSubmitting || isSavingDraft;

  return (
    <footer className="mt-5 flex flex-col gap-4 rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:flex-row sm:items-center sm:justify-between sm:p-5.25 2xl:flex-row 2xl:items-center 2xl:justify-between 2xl:p-5.25">
      <div className="grid grid-cols-2 gap-2 sm:flex 2xl:flex">
        {onPrevious ? (
          <button
            type="button"
            disabled={isBusy}
            onClick={onPrevious}
            className="flex h-10.5 items-center justify-center rounded-[14px] border border-[#e7eceb] px-4.25 font-manrope text-sm font-semibold leading-5 text-[#607d8b] hover:bg-[#f4f8f6] disabled:opacity-50"
          >
            ← Previous
          </button>
        ) : previousStep ? (
          <Link
            href={previousStep.href}
            className="flex h-10.5 items-center justify-center rounded-[14px] border border-[#e7eceb] px-4.25 font-manrope text-sm font-semibold leading-5 text-[#607d8b] hover:bg-[#f4f8f6]"
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
        {showNext && (
          <button
            type={nextButtonType}
            disabled={isBusy}
            onClick={nextButtonType === 'button' ? onNext : undefined}
            className="h-10.5 rounded-[14px] border border-[#2f7d7e] px-4.25 font-manrope text-sm font-semibold leading-5 text-[#2f7d7e] hover:bg-[rgba(47,125,126,0.07)] disabled:opacity-50"
          >
            Next →
          </button>
        )}
      </div>
      <div className="grid gap-2 sm:flex sm:flex-wrap sm:justify-end 2xl:flex 2xl:flex-wrap 2xl:justify-end">
        <button
          type="button"
          disabled={isBusy}
          onClick={onSaveDraft}
          className="h-10.5 rounded-[14px] border border-[#e7eceb] px-4.25 font-manrope text-sm font-semibold leading-5 text-[#607d8b] hover:bg-[#f4f8f6] disabled:opacity-50"
        >
          {isSavingDraft ? 'Saving Draft...' : 'Save as Draft'}
        </button>

        {showPrimaryAction && (
          <button
            type={primaryActionButtonType}
            disabled={isBusy}
            onClick={primaryActionButtonType === 'button' ? onPrimaryAction : undefined}
            className="flex h-10.5 items-center justify-center gap-2 rounded-[14px] bg-[#2f7d7e] px-5 font-manrope text-sm font-semibold leading-5 text-white hover:bg-[#266869] disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : primaryActionText}
          </button>
        )}
      </div>
    </footer>
  );
}
