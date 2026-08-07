'use client';

import { Logo } from '@/components/logo';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState, type FormEvent } from 'react';
import { toast } from 'sonner';

const stepContent = {
  1: {
    title: 'Forget Password',
    description:
      "Enter the email address associated with your account and we'll send you a verification code to reset your password.",
  },
  3: {
    title: 'Create a New Password',
    description: 'Choose a strong password to secure your account.',
  },
};

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpInputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const otpVisual = step === 2;
  const passwordVisual = step === 3;
  const current = step === 2 ? null : stepContent[step];

  const setOtpDigit = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    setOtp((currentOtp) =>
      currentOtp.map((item, itemIndex) => (itemIndex === index ? digit : item))
    );

    if (digit && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <main className="relative flex min-h-dvh flex-col overflow-y-auto overflow-x-hidden bg-[#fffdf8] text-[#263238] xl:h-dvh xl:flex-row xl:items-center xl:overflow-hidden">
      <Logo
        href="/"
        width={123}
        height={123}
        showBackdrop
        className="z-20 mt-6 ml-6 shrink-0 xl:absolute xl:left-[calc(8.333333%+34px)] xl:top-4 xl:m-0 max-md:ml-4 max-md:mt-4 max-xl:w-22! max-xl:h-22! max-md:w-16! max-md:h-16! [&_span[aria-hidden]]:max-xl:hidden"
      />

      <section
        className={
          otpVisual
            ? 'mx-auto my-8 flex w-[calc(100%-3rem)] max-w-122.5 flex-1 flex-col items-center justify-center gap-8 rounded-2xl border border-[#e8ebe8] bg-white p-6 shadow-[0_1px_1px_rgba(0,0,0,0.05)] xl:mx-0 xl:my-0 xl:ml-[calc(8.333333%+69px)] xl:flex-none xl:justify-start'
            : 'mx-auto flex w-full max-w-123 flex-1 flex-col items-center justify-center px-6 py-12 xl:mx-0 xl:ml-[calc(8.333333%+69px)] xl:flex-none xl:justify-start xl:px-0 xl:py-0'
        }
      >
        {current && (
          <div className="mb-10 flex w-full flex-col items-center gap-3 text-center xl:mb-12">
            <h1 className="font-nunito text-[32px] font-medium leading-10 tracking-[-0.16px] text-[#263238]">
              {current.title}
            </h1>
            <p className="w-93 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#7d8488]">
              {current.description}
            </p>
          </div>
        )}

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
          <form className="flex w-full flex-col items-center gap-8" onSubmit={handleOtpSubmit}>
            <div className="flex w-full flex-col items-center gap-3 text-center">
              <div className="relative h-14 w-14.5">
                <Image src="/Home/figma-otp-mail-base.svg" alt="" fill sizes="58px" />
                <Image
                  src="/Home/figma-otp-mail.png"
                  alt=""
                  width={32}
                  height={32}
                  className="absolute left-3.25 top-3 object-contain"
                />
                <span className="absolute left-3.25 top-3 size-8 bg-[#f2b59f] mask-[url('/Home/figma-otp-mail-mask.png')] mask-no-repeat mask-size-[32px_32px]" />
                <Image
                  src="/Home/figma-otp-mail-element.png"
                  alt=""
                  width={25}
                  height={25}
                  className="absolute left-[16.59px] top-[14.48px] object-contain"
                />
              </div>
              <h1 className="font-nunito text-[32px] font-medium leading-10 tracking-[-0.16px] text-[#263238] max-md:text-[28px] max-sm:text-2xl">
                Enter 6-Digit code sent to your gmail
              </h1>
              <p className="w-full font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#7d8488]">
                Enter the 6-digit verification code sent to you email. This code will expired in{' '}
                <span className="font-semibold text-[#f2b59f]">05:00</span>
              </p>
            </div>
            <div className="flex w-full flex-col items-center gap-4">
              <div className="flex w-full items-center justify-between gap-1.5 sm:justify-center sm:gap-3.5">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(element) => {
                      otpInputRefs.current[index] = element;
                    }}
                    aria-label={`Verification digit ${index + 1}`}
                    value={digit}
                    onChange={(event) => setOtpDigit(index, event.target.value)}
                    onKeyDown={(event) => handleOtpKeyDown(index, event)}
                    inputMode="numeric"
                    maxLength={1}
                    autoFocus={index === 0}
                    className={`h-14 w-full max-w-15.5 sm:h-16.25 rounded-xl bg-white text-center font-manrope text-xl sm:text-2xl text-[#263238] outline-none ${index === 0 ? 'border-2 border-[#f2b59f]' : 'border border-[#99a6b8]'}`}
                  />
                ))}
              </div>
              <button
                type="submit"
                className="h-10 w-full rounded-xl border border-[#accbcb] bg-[#2f7d7e] px-3 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-white shadow-[inset_0_-6px_2px_rgba(255,255,255,0.07)] transition hover:bg-[#266b6c]"
              >
                Reset OTP
              </button>
            </div>
            <p className="w-full text-center font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#515b60]">
              Need help?{' '}
              <Link href="/contact" className="text-[#2f7d7e]">
                Contact Support
              </Link>
            </p>
          </form>
        )}

        {step === 3 && (
          <form className="w-full space-y-4" onSubmit={handlePasswordSubmit}>
            <label
              className="block font-manrope text-base leading-6 tracking-[-0.176px] text-[#263238]"
              htmlFor="new-password"
            >
              New Password
              <span className="relative mt-2 block">
                <input
                  id="new-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  className="h-12 w-full rounded-xl border border-[#d5e5e5] bg-[#fafafa] px-3 pr-12 font-manrope text-base leading-6 tracking-[-0.176px] outline-none placeholder:text-[#7d8488] focus:border-[#5e9999]"
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((visible) => !visible)}
                  className="absolute inset-y-0 right-0 flex w-12 items-center justify-center"
                >
                  <Image src="/Home/figma-password-eye.svg" alt="" width={20} height={20} />
                </button>
              </span>
            </label>
            <label
              className="block font-manrope text-base leading-6 tracking-[-0.176px] text-[#263238]"
              htmlFor="confirm-password"
            >
              Confirm Password
              <span className="relative mt-2 block">
                <input
                  id="confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  className="h-12 w-full rounded-xl border border-[#d5e5e5] bg-[#fafafa] px-3 pr-12 font-manrope text-base leading-6 tracking-[-0.176px] outline-none placeholder:text-[#7d8488] focus:border-[#5e9999]"
                />
                <button
                  type="button"
                  aria-label={
                    showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'
                  }
                  onClick={() => setShowConfirmPassword((visible) => !visible)}
                  className="absolute inset-y-0 right-0 flex w-12 items-center justify-center"
                >
                  <Image src="/Home/figma-password-eye.svg" alt="" width={20} height={20} />
                </button>
              </span>
            </label>
            <button
              type="submit"
              className="h-10 w-full rounded-xl border border-[#accbcb] bg-[#2f7d7e] px-3 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-white shadow-[inset_0_-6px_2px_rgba(255,255,255,0.07)] transition hover:bg-[#266b6c]"
            >
              Update Password
            </button>
          </form>
        )}
      </section>

      <aside className="absolute right-8 top-8 hidden h-[calc(100dvh-4rem)] w-[calc(50%-68px)] max-w-223 overflow-hidden rounded-2xl bg-[#e9f1ee] shadow-[0_1px_2px_rgba(0,0,0,0.05)] xl:block">
        <div
          className={
            otpVisual
              ? 'absolute -left-1.75 -top-92.75 h-[1585px] w-226.75'
              : passwordVisual
                ? 'absolute -left-4.75 top-36.25 h-309.25 w-232'
                : 'absolute left-px top-0 h-337 w-224.75'
          }
          style={{
            WebkitMaskImage: `url(${otpVisual ? '/Home/figma-otp-panel-mask.svg' : passwordVisual ? '/Home/figma-password-panel-mask.svg' : '/Home/figma-forgot-panel-mask.svg'})`,
            maskImage: `url(${otpVisual ? '/Home/figma-otp-panel-mask.svg' : passwordVisual ? '/Home/figma-password-panel-mask.svg' : '/Home/figma-forgot-panel-mask.svg'})`,
            WebkitMaskPosition: otpVisual
              ? '-270.851px 532.207px'
              : passwordVisual
                ? '-258.852px 16.207px'
                : '-278.851px 161.207px',
            maskPosition: otpVisual
              ? '-270.851px 532.207px'
              : passwordVisual
                ? '-258.852px 16.207px'
                : '-278.851px 161.207px',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskSize: '1486.703px 1435.602px',
            maskSize: '1486.703px 1435.602px',
          }}
        >
          <Image
            src={
              otpVisual
                ? '/Home/figma-otp-panel-art.png'
                : passwordVisual
                  ? '/Home/figma-password-panel-art.png'
                  : '/Home/figma-forgot-panel-art.png'
            }
            alt=""
            fill
            sizes={otpVisual ? '907px' : passwordVisual ? '928px' : '899px'}
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 mx-auto mt-40 flex w-141 flex-col items-center gap-8 text-center">
          <div className="flex flex-col items-center gap-5">
            <Image
              src={
                otpVisual
                  ? '/Home/figma-otp-stars.svg'
                  : passwordVisual
                    ? '/Home/figma-password-stars.svg'
                    : '/Home/figma-forgot-stars.svg'
              }
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
                  src={
                    otpVisual
                      ? '/Home/figma-otp-avatar.png'
                      : passwordVisual
                        ? '/Home/figma-password-avatar.png'
                        : '/Home/figma-forgot-avatar.png'
                  }
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
                src={
                  otpVisual
                    ? '/Home/figma-otp-divider.svg'
                    : passwordVisual
                      ? '/Home/figma-password-divider.svg'
                      : '/Home/figma-forgot-divider.svg'
                }
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
            <Image
              src={
                otpVisual
                  ? '/Home/figma-otp-arrow-left.svg'
                  : passwordVisual
                    ? '/Home/figma-password-arrow-left.svg'
                    : '/Home/figma-forgot-arrow-left.svg'
              }
              alt=""
              width={48}
              height={48}
            />
            <Image
              src={
                otpVisual
                  ? '/Home/figma-otp-slider-dots.svg'
                  : passwordVisual
                    ? '/Home/figma-password-slider-dots.svg'
                    : '/Home/figma-forgot-slider-dots.svg'
              }
              alt=""
              width={62}
              height={28}
            />
            <Image
              src={
                otpVisual
                  ? '/Home/figma-otp-arrow-right.svg'
                  : passwordVisual
                    ? '/Home/figma-password-arrow-right.svg'
                    : '/Home/figma-forgot-arrow-right.svg'
              }
              alt=""
              width={48}
              height={48}
            />
          </div>
        </div>
      </aside>
    </main>
  );
}
