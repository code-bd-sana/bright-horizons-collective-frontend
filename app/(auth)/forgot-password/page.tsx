'use client';

import { Logo } from '@/components/logo';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { toast } from 'sonner';

const stepContent = {
  1: {
    title: 'Forget Password',
    description:
      "Enter the email address associated with your account and we'll send you a verification code to reset your password.",
  },
  2: {
    title: 'Verify Code',
    description: 'Enter the 6-digit code sent to your email.',
  },
  3: {
    title: 'New Password',
    description: 'Create a new secure password for your account.',
  },
};

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('');

  const handleEmailSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success('Verification code sent to your email');
    setStep(2);
  };

  const handleOtpSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success('Code verified successfully');
    setStep(3);
  };

  const handlePasswordSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success('Password reset successfully! Please login.');
    router.push('/login');
  };

  const current = stepContent[step];

  return (
    <main className="relative h-dvh overflow-hidden bg-[#fffdf8] text-[#263238]">
      <Logo
        href="/"
        width={123}
        height={123}
        showBackdrop
        className="absolute left-[calc(8.333333%+34px)] top-4 z-20 max-lg:left-8 max-lg:top-5 max-lg:size-22"
      />

      <section className="mx-auto flex w-full max-w-123 flex-col items-center px-6 pt-40 xl:absolute xl:left-[calc(8.333333%+69px)] xl:top-64 xl:mx-0 xl:px-0 xl:pt-0">
        <div className="mb-10 flex w-full flex-col items-center gap-3 text-center xl:mb-12">
          <h1 className="font-nunito text-[32px] font-medium leading-10 tracking-[-0.16px] text-[#263238]">
            {current.title}
          </h1>
          <p className="w-93 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#7d8488]">
            {current.description}
          </p>
        </div>

        {step === 1 && (
          <form className="w-full space-y-4" onSubmit={handleEmailSubmit}>
            <label
              className="block font-manrope text-base leading-6 tracking-[-0.176px] text-[#263238]"
              htmlFor="email"
            >
              Email address
              <input
                id="email"
                type="email"
                required
                placeholder="johndoe@mail.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 h-12 w-full rounded-xl border border-[#d5e5e5] bg-[#fafafa] px-3 font-manrope text-base leading-6 tracking-[-0.176px] text-[#263238] outline-none placeholder:text-[#7d8488] focus:border-[#5e9999]"
              />
            </label>
            <button
              type="submit"
              className="h-12 w-full rounded-xl border border-[#accbcb] bg-[#2f7d7e] px-3 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-[#f8fafc] shadow-[inset_0_-6px_2px_rgba(255,255,255,0.07)] transition hover:bg-[#266b6c]"
            >
              Send OTP
            </button>
            <Link
              href="/login"
              className="flex h-12 w-full items-center justify-center rounded-xl border border-[#d8ddd9] bg-white px-3 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-[#0f172a] shadow-[inset_0_-6px_2px_rgba(255,255,255,0.07)] transition hover:bg-[#fafafa]"
            >
              Back to Login
            </Link>
          </form>
        )}

        {step === 2 && (
          <form className="w-full space-y-4" onSubmit={handleOtpSubmit}>
            <label
              className="block font-manrope text-base leading-6 tracking-[-0.176px] text-[#263238]"
              htmlFor="otp"
            >
              Verification Code
              <input
                id="otp"
                required
                inputMode="numeric"
                placeholder="123456"
                maxLength={6}
                className="mt-2 h-12 w-full rounded-xl border border-[#d5e5e5] bg-[#fafafa] px-3 text-center font-manrope text-base tracking-[0.4em] text-[#263238] outline-none placeholder:tracking-normal placeholder:text-[#7d8488] focus:border-[#5e9999]"
              />
            </label>
            <button
              type="submit"
              className="h-12 w-full rounded-xl border border-[#accbcb] bg-[#2f7d7e] px-3 font-nunito text-base font-medium leading-6 text-white transition hover:bg-[#266b6c]"
            >
              Verify Code
            </button>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="h-12 w-full rounded-xl border border-[#d8ddd9] bg-white px-3 font-nunito text-base font-medium leading-6 text-[#0f172a] transition hover:bg-[#fafafa]"
            >
              Back to Email
            </button>
          </form>
        )}

        {step === 3 && (
          <form className="w-full space-y-4" onSubmit={handlePasswordSubmit}>
            <label
              className="block font-manrope text-base leading-6 tracking-[-0.176px] text-[#263238]"
              htmlFor="new-password"
            >
              New Password
              <input
                id="new-password"
                type="password"
                required
                className="mt-2 h-12 w-full rounded-xl border border-[#d5e5e5] bg-[#fafafa] px-3 outline-none focus:border-[#5e9999]"
              />
            </label>
            <label
              className="block font-manrope text-base leading-6 tracking-[-0.176px] text-[#263238]"
              htmlFor="confirm-password"
            >
              Confirm Password
              <input
                id="confirm-password"
                type="password"
                required
                className="mt-2 h-12 w-full rounded-xl border border-[#d5e5e5] bg-[#fafafa] px-3 outline-none focus:border-[#5e9999]"
              />
            </label>
            <button
              type="submit"
              className="h-12 w-full rounded-xl border border-[#accbcb] bg-[#2f7d7e] px-3 font-nunito text-base font-medium leading-6 text-white transition hover:bg-[#266b6c]"
            >
              Update Password
            </button>
          </form>
        )}
      </section>

      <aside className="absolute right-8 top-8 hidden h-[calc(100dvh-4rem)] w-[calc(50%-68px)] max-w-223 overflow-hidden rounded-2xl bg-[#e9f1ee] shadow-[0_1px_2px_rgba(0,0,0,0.05)] xl:block">
        <div
          className="absolute left-px top-0 h-337 w-224.75"
          style={{
            WebkitMaskImage: 'url(/Home/figma-forgot-panel-mask.svg)',
            maskImage: 'url(/Home/figma-forgot-panel-mask.svg)',
            WebkitMaskPosition: '-278.851px 161.207px',
            maskPosition: '-278.851px 161.207px',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskSize: '1486.703px 1435.602px',
            maskSize: '1486.703px 1435.602px',
          }}
        >
          <Image
            src="/Home/figma-forgot-panel-art.png"
            alt=""
            fill
            sizes="899px"
            className="object-cover"
            priority
          />
        </div>

        <div className="relative z-10 mx-auto mt-40 flex w-141 flex-col items-center gap-8 text-center">
          <div className="flex flex-col items-center gap-5">
            <Image
              src="/Home/figma-forgot-stars.svg"
              alt="Five star rating"
              width={116}
              height={22}
            />
            <blockquote className="w-127.5 font-manrope text-base leading-6 tracking-[-0.176px] text-[#263238]">
              “I used to spend my evenings googling activities, never sure if I was even doing the
              right thing. Now I just open my plan for the week and know exactly what to try.
              It&apos;s the first thing that&apos;s actually made me feel like I&apos;m helping, not
              guessing.”
            </blockquote>
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-4">
                <Image
                  src="/Home/figma-forgot-avatar.png"
                  alt="Sarah T."
                  width={56}
                  height={56}
                  className="rounded-full"
                />
                <p className="font-manrope text-base font-semibold leading-6 text-[#0f1416]">
                  Sarah T.
                </p>
              </div>
              <Image
                src="/Home/figma-forgot-divider.svg"
                alt=""
                width={1}
                height={61}
                className="h-15.25 w-px"
              />
              <div className="text-left font-nunito text-base font-medium leading-6 tracking-[-0.176px]">
                <p className="text-[#0f1416]">Child age 2</p>
                <p className="text-[#515b60]">Member since 2024</p>
                <p className="text-[#515b60]">Portland, OR</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-12">
            <Image src="/Home/figma-forgot-arrow-left.svg" alt="" width={48} height={48} />
            <Image src="/Home/figma-forgot-slider-dots.svg" alt="" width={62} height={28} />
            <Image src="/Home/figma-forgot-arrow-right.svg" alt="" width={48} height={48} />
          </div>
        </div>
      </aside>
    </main>
  );
}
