'use client';

import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

import { ResourceFormNavigation } from './resource-form-navigation';
import { ResourceFormStepper } from './resource-form-stepper';

const fieldClassName =
  'mt-1.5 w-full rounded-xl border border-[#e7eceb] bg-[#f4f8f6] px-3.75 font-manrope text-sm leading-5.25 text-[#263238] outline-none placeholder:text-[rgba(38,50,56,0.5)] focus:border-[#2f7d7e]';

export function AddResourceSeo() {
  const [metaTitle, setMetaTitle] = useState('');
  const [keywords, setKeywords] = useState('sensory, toddler, development');
  const [shortDescription, setShortDescription] = useState('');

  function saveSeo() {
    const seoFields = [metaTitle, keywords, shortDescription].filter(Boolean).length;
    toast.success(seoFields ? 'SEO details saved.' : 'SEO details skipped.');
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
        <ResourceFormStepper currentStep={6} />
      </div>

      <section className="mt-5 rounded-2xl border border-[#e7eceb] bg-white p-5 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:p-6.25">
        <h2 className="font-nunito text-lg font-bold leading-6.75">6. SEO</h2>

        <div className="mt-5 max-w-214.75 space-y-5">
          <p className="font-manrope text-[13px] leading-5 text-[#607d8b]">
            Optional SEO fields. These improve discoverability within the platform&apos;s internal
            search.
          </p>

          <label className="block">
            <span className="font-manrope text-[13px] font-semibold leading-5 text-[#263238]">
              Meta Title
            </span>
            <input
              value={metaTitle}
              onChange={(event) => setMetaTitle(event.target.value)}
              placeholder="e.g. Understanding Sensory Processing | Bright Horizons"
              className={`${fieldClassName} h-10.75`}
            />
            <span className="mt-1 block font-manrope text-xs leading-4.5 text-[#607d8b]">
              Defaults to the resource title if left blank
            </span>
          </label>

          <label className="block">
            <span className="font-manrope text-[13px] font-semibold leading-5 text-[#263238]">
              Keywords
            </span>
            <input
              value={keywords}
              onChange={(event) => setKeywords(event.target.value)}
              className={`${fieldClassName} h-10.75`}
            />
            <span className="mt-1 block font-manrope text-xs leading-4.5 text-[#607d8b]">
              Comma-separated, used for internal search ranking
            </span>
          </label>

          <label className="block">
            <span className="font-manrope text-[13px] font-semibold leading-5 text-[#263238]">
              Short Description
            </span>
            <textarea
              value={shortDescription}
              onChange={(event) => setShortDescription(event.target.value)}
              maxLength={155}
              placeholder="Brief summary for search result previews..."
              className={`${fieldClassName} h-18 min-h-18 resize-y py-2.75`}
            />
            <span className="mt-1 block font-manrope text-xs leading-4.5 text-[#607d8b]">
              Shown in search previews — max 155 characters
            </span>
          </label>
        </div>
      </section>

      <ResourceFormNavigation currentStep={6} onNext={saveSeo} onSaveChanges={saveSeo} />
    </section>
  );
}
