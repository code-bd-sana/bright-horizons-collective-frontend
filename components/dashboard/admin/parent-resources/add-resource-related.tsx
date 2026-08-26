'use client';

import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import { ResourceFormNavigation } from './resource-form-navigation';
import { ResourceFormStepper } from './resource-form-stepper';

type RelatedFieldProps = {
  id: string;
  label: string;
  options: readonly string[];
  value: string;
  example: string;
  onChange: (value: string) => void;
};

function RelatedField({ id, label, options, value, example, onChange }: RelatedFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const close = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative max-w-214.75">
      <span
        id={`${id}-label`}
        className="font-manrope text-[13px] font-semibold leading-5 text-[#263238]"
      >
        {label}
      </span>
      <div className="relative mt-1.5">
        <button
          type="button"
          aria-labelledby={`${id}-label`}
          aria-describedby={example ? `${id}-example ${id}-hint` : `${id}-hint`}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          onClick={() => setIsOpen((open) => !open)}
          className={`flex h-9.5 w-full items-center justify-between rounded-[14px] border px-2 font-manrope text-[13px] leading-5 transition-colors ${isOpen ? 'border-[#d5e5e5] bg-[#d5e5e5] text-[#0f1416]' : 'border-[#e7eceb] bg-[#f4f8f6] text-[#607d8b] hover:border-[#accbcb]'}`}
        >
          <span className="truncate">{value || 'Select related content'}</span>
          <ChevronDown
            aria-hidden="true"
            className={`size-3.5 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            strokeWidth={1.6}
          />
        </button>
        {isOpen && (
          <div
            className="absolute left-0 top-[calc(100%+8px)] z-30 w-full min-w-40 rounded-2xl border border-[#e8ebe8] bg-white p-3 shadow-[0_8px_12px_rgba(38,50,56,0.12)]"
            role="listbox"
            aria-label={`${label} options`}
          >
            <div className="flex flex-col gap-2.5">
              <button
                type="button"
                role="option"
                aria-selected={!value}
                onClick={() => {
                  onChange('');
                  setIsOpen(false);
                }}
                className={`flex min-h-9 w-full items-center rounded-lg px-3 py-2 text-left font-nunito text-sm font-medium leading-5 tracking-[-0.084px] transition-colors ${!value ? 'bg-[#e9f1ee] text-[#174a4d]' : 'text-[#263238] hover:bg-[#f4f8f6]'}`}
              >
                No related content
              </button>
              {options.map((option) => {
                const selected = value === option;
                return (
                  <button
                    key={option}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => {
                      onChange(option);
                      setIsOpen(false);
                    }}
                    className={`flex min-h-9 w-full items-center rounded-lg px-3 py-2 text-left font-nunito text-sm font-medium leading-5 tracking-[-0.084px] transition-colors ${selected ? 'bg-[#e9f1ee] text-[#174a4d]' : 'text-[#263238] hover:bg-[#f4f8f6]'}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
      {example && (
        <span
          id={`${id}-example`}
          className="mt-1 block font-manrope text-xs leading-4.5 text-[#607d8b]"
        >
          {value || example}
        </span>
      )}
      <span
        id={`${id}-hint`}
        className="mt-1 block font-manrope text-xs leading-4.5 text-[#607d8b]"
      >
        Optional — adds cross-links between modules
      </span>
    </div>
  );
}

export function AddResourceRelated() {
  const router = useRouter();
  const [relatedActivities, setRelatedActivities] = useState('');
  const [relatedPlans, setRelatedPlans] = useState('');
  const [relatedToys, setRelatedToys] = useState('');

  function saveRelated() {
    const selectedCount = [relatedActivities, relatedPlans, relatedToys].filter(Boolean).length;
    toast.success(
      selectedCount
        ? `${selectedCount} related item${selectedCount === 1 ? '' : 's'} saved.`
        : 'Related content saved.'
    );
  }

  function saveAndContinue() {
    saveRelated();
    router.push('/dashboard/admin/parent-resources/add-resource/membership');
  }

  return (
    <section className="mx-auto w-full max-w-231.5 pb-8 pt-6 text-[#263238] lg:pt-0">
      <Link
        href="/dashboard/admin/parent-resources"
        className="inline-flex items-center gap-1.5 font-manrope text-sm font-medium leading-5 text-[#607d8b]"
      >
        <span aria-hidden="true">←</span>
        Back to Parent Resources
      </Link>

      <h1 className="mt-5 font-nunito text-2xl font-bold leading-9">Create Resource</h1>

      <div className="mt-5 overflow-x-auto rounded-2xl border border-[#e7eceb] bg-white p-4 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
        <ResourceFormStepper currentStep={4} />
      </div>

      <section className="mt-5 rounded-2xl border border-[#e7eceb] bg-white p-5 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:p-6.25">
        <h2 className="font-nunito text-lg font-bold leading-6.75">4. Related</h2>

        <div className="mt-5 space-y-5">
          <p className="max-w-179.5 font-manrope text-sm leading-5.25 text-[#607d8b]">
            Link related content from other modules. These populate the &quot;Related Content&quot;
            section on Admin Resource Details and cross-link in the parent-facing view.
          </p>

          <RelatedField
            id="related-activities"
            label="Related Activities"
            value={relatedActivities}
            onChange={setRelatedActivities}
            example="Color Sorting Sensory Play, Sensory Bin: Kinetic Sand"
            options={[
              'Color Sorting Sensory Play',
              'Sensory Bin: Kinetic Sand',
              'Bubble Wrap Stomp Counting',
            ]}
          />
          <RelatedField
            id="related-weekly-plans"
            label="Related Weekly Plans"
            value={relatedPlans}
            onChange={setRelatedPlans}
            example="Sensory Foundations — Week 1"
            options={[
              'Sensory Foundations — Week 1',
              'Fine Motor Foundations — Week 2',
              'Everyday Routines — Week 3',
            ]}
          />
          <RelatedField
            id="related-therapy-toys"
            label="Related Therapy Toys"
            value={relatedToys}
            onChange={setRelatedToys}
            example=""
            options={[
              'Textured Sensory Balls',
              'Balance Stepping Stones',
              'Pop Tube Discovery Set',
            ]}
          />
        </div>
      </section>

      <ResourceFormNavigation
        currentStep={4}
        onNext={saveAndContinue}
        onSaveChanges={saveRelated}
      />
    </section>
  );
}
