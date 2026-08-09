'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const ASSET_ROOT = '/ReviewSubmit/';

type ReviewRow = {
  label: string;
  value: string;
};

const childRows: ReviewRow[] = [
  { label: 'Name/ Nickname', value: 'Lily' },
  { label: 'Age', value: '5 yrs 2 mo' },
  { label: 'Gender', value: 'Girl' },
  { label: 'Relationship', value: 'Parent' },
  { label: 'Caregiver Name', value: 'Billings' },
  { label: 'Zip code', value: '52014' },
];

const developmentRows: ReviewRow[] = [
  { label: 'Areas of Support', value: 'Gross Motor, Gross Motor' },
  { label: 'Specific Goals or Notes', value: 'N/A' },
];

const interestRows: ReviewRow[] = [
  { label: 'What they love', value: 'Vehicle, Sports' },
  { label: 'Preferred Activity Types', value: 'Active, Outdoor Play' },
];

function ReviewCard({ title, rows }: { title: string; rows: ReviewRow[] }) {
  return (
    <section className="w-full rounded-2xl border border-[#E8EBE8] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)] min-[900px]:p-9">
      <h2 className="font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-[#263238]">
        {title}
      </h2>
      <Image
        src={`${ASSET_ROOT}section-line.svg`}
        alt=""
        width={522}
        height={2}
        aria-hidden="true"
        className="mt-5 h-px w-full"
      />
      <dl className="flex flex-col">
        {rows.map((row, index) => (
          <div
            key={row.label}
            className="flex flex-col gap-2 py-4 min-[600px]:grid min-[600px]:grid-cols-[154px_minmax(0,1fr)] min-[600px]:items-center min-[600px]:gap-[140px]"
          >
            <dt className="font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-[#7D8488]">
              {row.label}
            </dt>
            <dd className="font-manrope text-base leading-6 tracking-[-0.176px] text-[#263238]">
              {row.value}
            </dd>
            {index < rows.length - 1 && (
              <Image
                src={`${ASSET_ROOT}row-line.svg`}
                alt=""
                width={522}
                height={2}
                aria-hidden="true"
                className="col-span-2 mt-2 h-px w-full"
              />
            )}
          </div>
        ))}
      </dl>
    </section>
  );
}

function MembershipSummary() {
  return (
    <section className="flex w-full flex-col gap-2.5 rounded-2xl border border-[#E9F1EE] bg-[#F9FAFA] p-5 shadow-[0_1px_1px_rgba(0,0,0,0.05)] min-[900px]:p-8">
      <h2 className="font-nunito text-xl font-medium leading-7 text-[#174A4D]">Membership</h2>
      <div className="flex items-center gap-3">
        <span className="relative size-14 shrink-0">
          <Image
            src={`${ASSET_ROOT}plan-star.svg`}
            alt=""
            fill
            sizes="56px"
            aria-hidden="true"
            className="object-contain"
          />
          <span className="absolute left-[15.56px] top-[15.56px] size-[25.76px] overflow-hidden rounded-sm shadow-[0_1.415px_2.83px_rgba(0,0,0,0.05)]">
            <Image
              src={`${ASSET_ROOT}plan-icon.png`}
              alt=""
              fill
              sizes="26px"
              aria-hidden="true"
              className="h-[152.27%]! w-[155.81%]! max-w-none object-cover"
              style={{ left: '-25.58%', top: '-28.41%' }}
            />
          </span>
        </span>
        <div className="flex flex-col gap-1">
          <p className="font-nunito text-xl font-medium leading-7 text-[#174A4D]">Grow Together</p>
          <p className="flex items-center gap-2 font-manrope text-xs leading-[18px] text-[#7D8488]">
            <span className="font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-[#263238]">
              $150
            </span>
            /Billed annually
          </p>
        </div>
      </div>
    </section>
  );
}

function Agreements() {
  const [agreements, setAgreements] = useState({ terms: true, privacy: true, marketing: true });
  const requirementsMet = agreements.terms && agreements.privacy;

  const toggle = (name: keyof typeof agreements) => {
    setAgreements((current) => ({ ...current, [name]: !current[name] }));
  };

  const rows = [
    { name: 'terms' as const, text: 'I agree to the Terms of Service', required: true },
    {
      name: 'privacy' as const,
      text: 'I acknowledge the Privacy Policy and understand how my data is used',
      required: true,
    },
    {
      name: 'marketing' as const,
      text: 'I consent to receive helpful emails and updates from Bright Horizons Collective',
      required: false,
    },
  ];

  return (
    <section className="flex w-full flex-col gap-5" aria-labelledby="agreements-heading">
      <h2
        id="agreements-heading"
        className="font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-[#263238]"
      >
        Agreements
      </h2>
      <div className="flex flex-col gap-3">
        {rows.map((row) => (
          <label
            key={row.name}
            className="flex cursor-pointer items-center gap-2 font-manrope text-base leading-6 tracking-[-0.176px] text-[#263238]"
          >
            <input
              type="checkbox"
              checked={agreements[row.name]}
              onChange={() => toggle(row.name)}
              className="sr-only"
            />
            {agreements[row.name] ? (
              <Image
                src={`${ASSET_ROOT}checkbox-checked.svg`}
                alt=""
                width={24}
                height={24}
                aria-hidden="true"
              />
            ) : (
              <span
                aria-hidden="true"
                className="size-6 rounded border border-[#A8ADAF] bg-white"
              />
            )}
            <span>
              {row.text}
              {row.required && <span className="text-[#B24B4B]"> *</span>}
            </span>
          </label>
        ))}
      </div>
      <p
        className={`font-manrope text-sm leading-[22px] tracking-[-0.084px] ${requirementsMet ? 'text-[#515B60]' : 'text-[#B24B4B]'}`}
      >
        Please agree to the Terms of Service and Privacy Policy to continue.
      </p>
    </section>
  );
}

export function ReviewSubmitPage() {
  return (
    <main className="bg-[#FFFDF8] pt-40 text-[#263238] min-[1600px]:pt-[292px] min-[1600px]:pb-60">
      <div className="mx-auto flex w-full max-w-[1166px] flex-col gap-12 px-5 sm:px-8 min-[900px]:min-h-[1915px] min-[900px]:gap-20 min-[1600px]:px-0">
        <div className="flex flex-col items-center gap-12 rounded-3xl border border-[#E8EBE8] bg-white p-5 shadow-[0_1px_1.5px_rgba(0,0,0,0.10),0_1px_1px_rgba(0,0,0,0.10)] min-[900px]:gap-20 min-[900px]:p-10 min-[1600px]:p-20">
          <header className="flex w-full flex-col items-center gap-3 text-center">
            <h1 className="font-nunito text-[32px] font-medium leading-10 tracking-[-0.16px] text-[#174A4D] min-[900px]:text-[40px] min-[900px]:leading-12 min-[900px]:tracking-[-0.4px]">
              Review &amp; Submit
            </h1>
            <p className="max-w-[434px] font-manrope text-base leading-6 tracking-[-0.176px] text-[#515B60]">
              Take a moment to review your information. Once submitted your intake goes straight to
              our team.
            </p>
          </header>
          <div className="flex w-full max-w-[594px] flex-col gap-10">
            <ReviewCard title="CHILD" rows={childRows} />
            <ReviewCard title="Development & Focus" rows={developmentRows} />
            <ReviewCard title="Interests & Preferences" rows={interestRows} />
            <MembershipSummary />
            <Agreements />
          </div>
        </div>
        <div className="flex flex-col gap-4 min-[900px]:flex-row min-[900px]:gap-4">
          <Link
            href="/complete-profile"
            className="flex h-14 w-full items-center justify-center gap-2 rounded-[32px] border border-[#D4D6D7] bg-white px-4 py-2 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-[#14094B] min-[900px]:w-80"
          >
            <Image
              src={`${ASSET_ROOT}arrow-left.svg`}
              alt=""
              width={20}
              height={20}
              aria-hidden="true"
            />
            Go back
          </Link>
          <button
            type="button"
            className="flex h-14 flex-1 items-center justify-center gap-1 rounded-[32px] border border-[#D5E5E5] bg-[#2F7D7E] px-4 py-2 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-white"
          >
            Save &amp; Submit Intake
            <Image
              src={`${ASSET_ROOT}arrow-up-right.svg`}
              alt=""
              width={16}
              height={16}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </main>
  );
}

export default ReviewSubmitPage;
