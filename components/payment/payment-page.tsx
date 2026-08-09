'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const PAYMENT_ASSET_ROOT = '/Payment/';

const inputClassName =
  'h-11 w-full rounded-full border border-[#D8DDD9] bg-white px-4 py-2.5 font-manrope text-base leading-6 tracking-[-0.176px] text-[#263238] shadow-[0_1px_2px_rgba(16,24,40,0.05)] outline-none transition-colors placeholder:text-[#7D8488] focus:border-[#2F7D7E]';

function RequiredLabel({
  children,
  optional = false,
}: {
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <span className="font-manrope text-base leading-6 tracking-[-0.176px] text-[#263238]">
      {children}
      {optional ? (
        <span className="text-[#7D8488]"> (optional)</span>
      ) : (
        <span className="text-[#B24B4B]"> *</span>
      )}
    </span>
  );
}

function InputField({
  id,
  label,
  defaultValue,
  optional,
  className = '',
  type = 'text',
  inputMode,
}: {
  id: string;
  label: string;
  defaultValue: string;
  optional?: boolean;
  className?: string;
  type?: React.HTMLInputTypeAttribute;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
}) {
  return (
    <label htmlFor={id} className={`flex min-w-0 flex-col gap-1.5 ${className}`}>
      <RequiredLabel optional={optional}>{label}</RequiredLabel>
      <input
        id={id}
        type={type}
        defaultValue={defaultValue}
        required={!optional}
        inputMode={inputMode}
        className={inputClassName}
      />
    </label>
  );
}

function CheckoutSteps() {
  const steps: { label: string; complete: boolean; number?: number }[] = [
    { label: 'Choose a plan', complete: true },
    { label: 'Create Account', complete: true },
    { label: 'Payment', complete: false, number: 3 },
    { label: 'Complete Profile', complete: false, number: 4 },
  ];

  return (
    <section
      aria-label="Checkout progress"
      className="border-b border-[#D5E5E5] py-7 min-[900px]:py-10"
    >
      <ol className="hidden items-center justify-center gap-2 min-[900px]:flex">
        {steps.map((step, index) => (
          <li key={step.label} className="flex items-center gap-2">
            <div className="flex items-center gap-4">
              <span
                className={`relative flex size-9 shrink-0 items-center justify-center rounded-full ${
                  step.number === 4 ? 'bg-[#A8ADAF]' : 'bg-[#2F7D7E]'
                }`}
                aria-current={step.number === 3 ? 'step' : undefined}
              >
                {step.complete ? (
                  <Image
                    src={`${PAYMENT_ASSET_ROOT}step-complete.svg`}
                    alt=""
                    width={24}
                    height={24}
                    aria-hidden="true"
                  />
                ) : (
                  <span className="font-sans text-xl font-semibold leading-8 text-white">
                    {step.number}
                  </span>
                )}
              </span>
              <span
                className={`font-nunito text-xl font-medium leading-7 whitespace-nowrap ${
                  step.complete
                    ? 'text-[#2F7D7E]'
                    : step.number === 3
                      ? 'text-[#263238]'
                      : 'text-[#7D8488]'
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <Image
                src={`${PAYMENT_ASSET_ROOT}step-connector.svg`}
                alt=""
                width={124}
                height={2}
                aria-hidden="true"
                className="mx-0.5 h-px w-[124px]"
              />
            )}
          </li>
        ))}
      </ol>

      <ol className="grid grid-cols-4 gap-2 min-[900px]:hidden">
        {steps.map((step) => (
          <li key={step.label} className="flex flex-col items-center gap-2 text-center">
            <span
              className={`flex size-8 items-center justify-center rounded-full font-sans text-sm font-semibold text-white ${
                step.number === 4 ? 'bg-[#A8ADAF]' : 'bg-[#2F7D7E]'
              }`}
              aria-current={step.number === 3 ? 'step' : undefined}
            >
              {step.complete ? '✓' : step.number}
            </span>
            <span className="font-nunito text-xs font-medium leading-4 text-[#263238]">
              {step.label}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function SelectedPlan() {
  return (
    <section className="flex min-h-[120px] items-center justify-between rounded-2xl border border-[#E9F1EE] bg-[#F9FAFA] p-5 shadow-[0_1px_1px_rgba(0,0,0,0.05)] min-[900px]:p-8">
      <div className="flex min-w-0 items-center gap-3">
        <span className="relative size-14 shrink-0">
          <Image
            src={`${PAYMENT_ASSET_ROOT}plan-star.svg`}
            alt=""
            fill
            sizes="56px"
            aria-hidden="true"
            className="object-contain"
          />
          <span className="absolute left-4 top-4 size-6 overflow-hidden rounded-sm shadow-[0_1.415px_2.83px_rgba(0,0,0,0.05)]">
            <Image
              src={`${PAYMENT_ASSET_ROOT}plan-icon.png`}
              alt=""
              fill
              sizes="24px"
              aria-hidden="true"
              className="h-[152.27%]! w-[155.81%]! max-w-none object-cover"
              style={{ left: '-25.58%', top: '-28.41%' }}
            />
          </span>
        </span>
        <div className="flex min-w-0 flex-col gap-1">
          <h1 className="font-nunito text-xl font-medium leading-7 text-[#174A4D]">
            Grow Together
          </h1>
          <p className="flex items-center gap-2 font-manrope text-xs leading-[18px] text-[#7D8488]">
            <span className="font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-[#263238]">
              $150
            </span>
            /Billed annually
          </p>
        </div>
      </div>
      <Link
        href="/membership"
        className="shrink-0 font-manrope text-base leading-6 text-[#2F7D7E] transition-colors hover:text-[#174A4D]"
      >
        Change Plan
      </Link>
    </section>
  );
}

function PaymentMethods() {
  const [method, setMethod] = useState<'card' | 'paypal'>('card');
  const [saveCard, setSaveCard] = useState(false);

  return (
    <section className="flex flex-col gap-9" aria-labelledby="payment-method-heading">
      <h2
        id="payment-method-heading"
        className="font-nunito text-[32px] font-medium leading-10 tracking-[-0.16px] text-[#174A4D]"
      >
        Payment method
      </h2>

      <div role="radiogroup" aria-label="Payment method" className="flex items-center gap-4">
        <button
          type="button"
          role="radio"
          aria-checked={method === 'card'}
          onClick={() => setMethod('card')}
          className="flex items-center gap-3 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#2F7D7E]"
        >
          <Image
            src={`${PAYMENT_ASSET_ROOT}card-selected.svg`}
            alt=""
            width={28}
            height={28}
            aria-hidden="true"
            className={method === 'card' ? '' : 'opacity-45'}
          />
          <span className="flex items-center gap-2" aria-label="Credit or debit card">
            {[
              ['mastercard.svg', 'Mastercard'],
              ['visa.svg', 'Visa'],
              ['american-express.svg', 'American Express'],
              ['discover.svg', 'Discover'],
            ].map(([src, alt]) => (
              <span
                key={src}
                className="flex h-10 w-[60px] items-center justify-center rounded-lg border border-[#E8EBE8] bg-white p-2 shadow-[0_1px_1px_rgba(0,0,0,0.05)]"
              >
                <Image
                  src={`${PAYMENT_ASSET_ROOT}${src}`}
                  alt={alt}
                  width={44}
                  height={24}
                  className="max-h-6"
                />
              </span>
            ))}
          </span>
        </button>

        <button
          type="button"
          role="radio"
          aria-checked={method === 'paypal'}
          onClick={() => setMethod('paypal')}
          className="flex items-center gap-3 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#2F7D7E]"
        >
          <Image
            src={`${PAYMENT_ASSET_ROOT}payment-unselected.svg`}
            alt=""
            width={28}
            height={28}
            aria-hidden="true"
            className={method === 'paypal' ? 'opacity-100' : 'opacity-80'}
          />
          <span className="flex h-10 w-[60px] items-center justify-center rounded-lg border border-[#E8EBE8] bg-white p-2 shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
            <Image
              src={`${PAYMENT_ASSET_ROOT}paypal.png`}
              alt="PayPal"
              width={44}
              height={24}
              className="max-h-6 object-contain"
            />
          </span>
        </button>
      </div>

      {method === 'card' && (
        <div className="flex max-w-[486px] flex-col gap-6">
          <InputField id="cardholder-name" label="Name on card" defaultValue="Sample name" />
          <InputField
            id="card-number"
            label="Card number"
            defaultValue="1234 1234 1234 1234"
            inputMode="numeric"
          />
          <div className="grid grid-cols-2 gap-6">
            <InputField
              id="expiration-date"
              label="Expiration Date"
              defaultValue="MM/YY"
              inputMode="numeric"
            />
            <InputField id="cvv" label="CVV" defaultValue="123" inputMode="numeric" />
          </div>
          <label className="flex cursor-pointer items-center gap-2 self-end font-sans text-sm leading-5 text-[#0A011B]">
            <input
              type="checkbox"
              checked={saveCard}
              onChange={(event) => setSaveCard(event.target.checked)}
              className="sr-only"
            />
            <Image
              src={`${PAYMENT_ASSET_ROOT}save-card.svg`}
              alt=""
              width={18}
              height={18}
              aria-hidden="true"
              className={saveCard ? 'rounded bg-[#2F7D7E]' : ''}
            />
            Save card details
          </label>
        </div>
      )}
    </section>
  );
}

function BillingAddress() {
  const [sameAsContact, setSameAsContact] = useState(true);

  return (
    <section className="flex flex-col gap-9" aria-labelledby="billing-address-heading">
      <h2
        id="billing-address-heading"
        className="font-nunito text-[32px] font-medium leading-10 tracking-[-0.16px] text-[#174A4D]"
      >
        Billing address
      </h2>
      <div className="flex max-w-[486px] flex-col gap-6">
        <InputField id="billing-address" label="Address" defaultValue="Sample Address" />
        <label className="flex cursor-pointer items-center gap-2 self-end font-nunito text-lg font-medium leading-6 tracking-[-0.27px] text-[#263238]">
          <input
            type="checkbox"
            checked={sameAsContact}
            onChange={(event) => setSameAsContact(event.target.checked)}
            className="sr-only"
          />
          <Image
            src={`${PAYMENT_ASSET_ROOT}same-address.svg`}
            alt=""
            width={24}
            height={24}
            aria-hidden="true"
            className={sameAsContact ? '' : 'opacity-40'}
          />
          Same as contact address
        </label>
      </div>
    </section>
  );
}

function ContactAddress() {
  return (
    <section className="flex flex-col gap-9" aria-labelledby="contact-address-heading">
      <h2
        id="contact-address-heading"
        className="font-nunito text-[32px] font-medium leading-10 tracking-[-0.16px] text-[#174A4D]"
      >
        Contact address
      </h2>
      <div className="flex flex-col gap-6">
        <InputField id="full-name" label="Full Name" defaultValue="Sample Name" />
        <div className="grid gap-6 min-[600px]:grid-cols-2">
          <InputField id="email" label="Email" defaultValue="samplemail@mail.com" type="email" />
          <label htmlFor="phone-number" className="flex min-w-0 flex-col gap-1.5">
            <RequiredLabel>Phone number</RequiredLabel>
            <span className={`${inputClassName} flex items-center gap-2 px-3.5`}>
              <span className="flex shrink-0 items-center gap-1 border-r border-[#E8EBE8] pr-2 font-sans text-base">
                US
                <Image
                  src={`${PAYMENT_ASSET_ROOT}chevron-down.svg`}
                  alt=""
                  width={20}
                  height={20}
                  aria-hidden="true"
                />
              </span>
              <input
                id="phone-number"
                type="tel"
                defaultValue="+1 (555) 000-0000"
                className="min-w-0 flex-1 bg-transparent font-manrope text-base leading-6 tracking-[-0.176px] outline-none"
              />
            </span>
          </label>
        </div>
        <InputField id="address" label="Address" defaultValue="Sample Address" />
        <div className="grid gap-6 min-[600px]:grid-cols-2">
          <InputField id="unit" label="Flat, unite, suite" optional defaultValue="24/ SF" />
          <InputField id="city" label="City" defaultValue="NY" />
        </div>
        <div className="grid gap-6 min-[600px]:grid-cols-[1.2fr_1.2fr_1.2fr]">
          <label htmlFor="country" className="flex min-w-0 flex-col gap-1.5">
            <RequiredLabel>Country</RequiredLabel>
            <span className={`${inputClassName} flex items-center justify-between px-3.5`}>
              <select
                id="country"
                defaultValue="USA"
                className="min-w-0 flex-1 appearance-none bg-transparent font-manrope text-base leading-6 tracking-[-0.176px] outline-none"
              >
                <option>USA</option>
              </select>
              <Image
                src={`${PAYMENT_ASSET_ROOT}chevron-down-payment.svg`}
                alt=""
                width={20}
                height={20}
                aria-hidden="true"
              />
            </span>
          </label>
          <InputField id="state" label="State" defaultValue="NY" />
          <InputField
            id="postal-code"
            label="Postal code"
            defaultValue="125058"
            inputMode="numeric"
          />
        </div>
      </div>
    </section>
  );
}

function PaymentSummary() {
  return (
    <aside
      className="h-[1020px] rounded-2xl border border-[#E8EBE8] bg-[#E9F1EE] p-6 shadow-[0_12px_36px_rgba(0,0,0,0.08)] min-[900px]:p-9"
      aria-labelledby="payment-summary-heading"
    >
      <div className="flex h-full flex-col items-center gap-14">
        <h2
          id="payment-summary-heading"
          className="font-nunito text-2xl font-medium leading-8 text-[#263238]"
        >
          Payment summary
        </h2>
        <div className="flex w-full flex-col gap-14">
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between gap-4">
              <p className="font-nunito text-xl font-medium leading-7 text-[#263238]">
                Grow Together Plan
              </p>
              <button
                type="button"
                className="flex h-10 w-[76px] items-center justify-center gap-2 rounded-3xl border border-[#CBC6E0] bg-[#F3EFF9] px-2 py-0.5 font-nunito text-xs font-medium leading-4 text-[#263238]"
              >
                USD
                <Image
                  src={`${PAYMENT_ASSET_ROOT}currency-chevron.svg`}
                  alt=""
                  width={16}
                  height={16}
                  aria-hidden="true"
                />
              </button>
            </div>
            <div className="rounded-xl border border-[#CBC6E0] bg-white p-4 font-manrope text-base leading-6 tracking-[-0.176px]">
              <p className="text-[#263238]">
                Annual <span className="text-[#2F7D7E]">save 20%</span>
              </p>
              <p className="text-[#7D8488]">Commit annually, pay monthly</p>
            </div>
            <Image
              src={`${PAYMENT_ASSET_ROOT}summary-line.svg`}
              alt=""
              width={414}
              height={2}
              aria-hidden="true"
              className="h-px w-full"
            />
            <div className="flex items-center justify-between font-nunito text-xl font-medium leading-7 text-[#263238]">
              <span>Price</span>
              <span>$19.99/mo</span>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between font-nunito text-xl font-medium leading-7">
                <span className="text-[#263238]">Discounts</span>
                <span className="font-sans text-[#2F7D7E]">-$7.00/mo</span>
              </div>
              <p className="font-manrope text-base leading-6 tracking-[-0.176px] text-[#7D8488]">
                20% off for 12 months
              </p>
            </div>
            <Image
              src={`${PAYMENT_ASSET_ROOT}summary-line.svg`}
              alt=""
              width={414}
              height={2}
              aria-hidden="true"
              className="h-px w-full"
            />
            <div className="flex items-center justify-between font-nunito text-xl font-medium leading-7 text-[#0A011B]">
              <span>Total</span>
              <span>$13.99/mo</span>
            </div>
          </div>
          <button
            type="button"
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-[#D5E5E5] bg-[#2F7D7E] px-[26px] py-3.5 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-white"
          >
            Complete Payment
            <Image
              src={`${PAYMENT_ASSET_ROOT}arrow-up-right.svg`}
              alt=""
              width={16}
              height={16}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </aside>
  );
}

export function PaymentPage() {
  return (
    <main className="bg-[#FFFDF8] pt-40 text-[#263238] min-[1600px]:pt-[293px] min-[1600px]:pb-[238px]">
      <div className="mx-auto flex w-full max-w-[1462px] flex-col gap-12 px-5 sm:px-8 min-[900px]:gap-20 min-[1600px]:px-0">
        <div className="rounded-3xl border border-[#E8EBE8] bg-white p-5 shadow-[0_1px_1.5px_rgba(0,0,0,0.10),0_1px_1px_rgba(0,0,0,0.10)] min-[900px]:p-10 min-[1600px]:p-20">
          <CheckoutSteps />
          <div className="mt-12 grid gap-12 min-[900px]:mt-20 min-[1200px]:grid-cols-[719px_minmax(0,1fr)] min-[1200px]:gap-20">
            <div className="flex min-w-0 flex-col gap-18 min-[900px]:gap-20">
              <SelectedPlan />
              <div className="flex flex-col gap-[72px]">
                <ContactAddress />
                <PaymentMethods />
                <BillingAddress />
              </div>
            </div>
            <PaymentSummary />
          </div>
        </div>
        <div className="flex flex-col gap-4 min-[900px]:flex-row min-[900px]:gap-4">
          <Link
            href="/membership"
            className="flex h-14 w-full items-center justify-center gap-2 rounded-[32px] border border-[#D4D6D7] bg-white px-4 py-2 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-[#14094B] min-[900px]:w-[422px]"
          >
            <Image
              src={`${PAYMENT_ASSET_ROOT}arrow-left.svg`}
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
            Complete Payment
            <Image
              src={`${PAYMENT_ASSET_ROOT}arrow-up-right.svg`}
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

export default PaymentPage;
