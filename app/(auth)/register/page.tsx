'use client';

import { Logo } from '@/components/logo';
import {
  getPasswordRuleErrors,
  registerSchema,
  type RegisterFormValues,
} from '@/services/api/auth/auth.schemas';
import { useRegisterMutation } from '@/services/api/auth/auth.mutations';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');
  const { mutate: createAccount, isPending } = useRegisterMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  });
  const passwordErrors = passwordValue
    ? getPasswordRuleErrors(passwordValue)
    : errors.password?.message
      ? [errors.password.message]
      : [];

  const handleRegister = (values: RegisterFormValues) => createAccount(values);

  return (
    <main className="relative flex min-h-dvh flex-col overflow-y-auto overflow-x-hidden bg-[#fffdf8] text-[#263238] scrollbar-none [&::-webkit-scrollbar]:hidden xl:h-dvh xl:flex-row xl:items-center xl:overflow-hidden 2xl:overflow-hidden">
      <Logo
        href="/"
        width={123}
        height={123}
        // showBackdrop
        className="z-20 mt-6 ml-6 shrink-0 xl:absolute xl:left-[calc(8.333333%+34px)] xl:top-4 xl:z-0 xl:m-0 2xl:z-20 max-md:ml-4 max-md:mt-4 max-xl:w-22! max-xl:h-22! max-md:w-16! max-md:h-16! [&_span[aria-hidden]]:max-xl:hidden"
      />

      <section className="relative z-10 mx-auto flex w-full max-w-123 flex-1 flex-col items-center justify-center px-6 py-12 max-sm:px-5 max-sm:py-8 xl:ml-[calc(8.333333%+69px)] xl:mx-0 xl:h-dvh xl:flex-none xl:justify-center-safe xl:overflow-y-auto xl:px-0 xl:py-12 scrollbar-none [&::-webkit-scrollbar]:hidden 2xl:h-auto 2xl:overflow-visible 2xl:py-0">
        <div className="mb-8 flex w-full flex-col items-center gap-3 text-center xl:mb-12">
          <h1 className="font-nunito text-[32px] font-medium leading-10 tracking-[-0.16px] text-[#263238]">
            Create Your Account
          </h1>
          <p className="w-full max-w-85 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#7d8488]">
            Your account will be used to manage memberships, child profiles, and personalized plans.
          </p>
        </div>

        <form className="w-full" noValidate onSubmit={handleSubmit(handleRegister)}>
          {/* Google signup and the OR separator will be restored when OAuth is implemented. */}

          <div className="mt-4 space-y-4">
            <label
              className="block font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#263238]"
              htmlFor="name"
            >
              Full Name <span className="text-[#b24b4b]">*</span>
              <input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="John Doe"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'name-error' : undefined}
                {...register('name')}
                className="mt-2 h-12 w-full rounded-xl border border-[#d5e5e5] bg-[#fafafa] px-3 font-manrope text-base leading-6 tracking-[-0.176px] text-[#263238] outline-none placeholder:text-[#7d8488] focus:border-[#5e9999] aria-invalid:border-[#b24b4b]"
              />
              {errors.name && (
                <span id="name-error" role="alert" className="mt-1 block text-xs text-[#b24b4b]">
                  {errors.name.message}
                </span>
              )}
            </label>

            <label
              className="block font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#515b60]"
              htmlFor="email"
            >
              Email <span className="text-[#b24b4b]">*</span>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="johndoe@mail.com"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'register-email-error' : undefined}
                {...register('email')}
                className="mt-2 h-12 w-full rounded-xl border border-[#d5e5e5] bg-[#fafafa] px-3 font-manrope text-base leading-6 tracking-[-0.176px] text-[#263238] outline-none placeholder:text-[#7d8488] focus:border-[#5e9999] aria-invalid:border-[#b24b4b]"
              />
              {errors.email && (
                <span
                  id="register-email-error"
                  role="alert"
                  className="mt-1 block text-xs text-[#b24b4b]"
                >
                  {errors.email.message}
                </span>
              )}
            </label>

            <label
              className="block font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#515b60]"
              htmlFor="password"
            >
              Password <span className="text-[#b24b4b]">*</span>
              <span className="relative mt-2 block">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="minimum 7 characters"
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={passwordErrors.length ? 'password-rules' : undefined}
                  {...register('password', {
                    onChange: (event) => setPasswordValue(event.target.value),
                  })}
                  className="h-12 w-full rounded-xl border border-[#d5e5e5] bg-[#fafafa] px-3 pr-12 font-manrope text-base leading-6 tracking-[-0.176px] text-[#263238] outline-none placeholder:text-[#7d8488] focus:border-[#5e9999] aria-invalid:border-[#b24b4b]"
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((visible) => !visible)}
                  className="absolute inset-y-0 right-0 flex w-12 items-center justify-center"
                >
                  <Image src="/Home/figma-register-eye.svg" alt="" width={20} height={20} />
                </button>
              </span>
            </label>

            <label
              className="block font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#515b60]"
              htmlFor="confirmPassword"
            >
              Confirm Password <span className="text-[#b24b4b]">*</span>
              <span className="relative mt-2 block">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Re-enter your password"
                  aria-invalid={Boolean(errors.confirmPassword)}
                  aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
                  {...register('confirmPassword')}
                  className="h-12 w-full rounded-xl border border-[#d5e5e5] bg-[#fafafa] px-3 pr-12 font-manrope text-base leading-6 tracking-[-0.176px] text-[#263238] outline-none placeholder:text-[#7d8488] focus:border-[#5e9999] aria-invalid:border-[#b24b4b]"
                />
                <button
                  type="button"
                  aria-label={
                    showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'
                  }
                  onClick={() => setShowConfirmPassword((visible) => !visible)}
                  className="absolute inset-y-0 right-0 flex w-12 items-center justify-center"
                >
                  <Image src="/Home/figma-register-eye.svg" alt="" width={20} height={20} />
                </button>
              </span>
              {errors.confirmPassword && (
                <span
                  id="confirm-password-error"
                  role="alert"
                  className="mt-1 block text-xs text-[#b24b4b]"
                >
                  {errors.confirmPassword.message}
                </span>
              )}
            </label>
          </div>

          {passwordErrors.length > 0 && (
            <ul
              id="password-rules"
              role="alert"
              className="mt-2 list-inside list-disc space-y-0.5 font-manrope text-xs text-[#b24b4b]"
            >
              {passwordErrors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}

          <button
            type="submit"
            disabled={isPending}
            aria-busy={isPending}
            className="mt-4 h-12 w-full rounded-xl border border-[#accbcb] bg-[#2f7d7e] px-3 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-[#f8fafc] shadow-[inset_0_-6px_2px_rgba(255,255,255,0.07)] transition hover:bg-[#266b6c]"
          >
            {isPending ? 'Creating Account…' : 'Sign Up'}
          </button>

          <p className="mt-4 font-manrope text-xs leading-4.5 text-[#7d8488]">
            By signup your are creating a Bright Horizons Collective account and you agree to Bright
            Horizons Collective{' '}
            <Link href="/terms-and-membership-agreement" className="text-[#263238] underline">
              Terms of use
            </Link>{' '}
            and{' '}
            <Link href="/privacy-policy" className="text-[#263238] underline">
              Privacy Policy
            </Link>
          </p>
        </form>

        <p className="mt-5 font-manrope text-sm leading-5 text-[#515b60] xl:mt-6">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-[#167e87] hover:underline">
            Login
          </Link>
        </p>
      </section>

      <aside className="absolute right-8 top-8 hidden h-[calc(100dvh-4rem)] w-[calc(50%-5rem)] max-w-223 overflow-hidden rounded-2xl bg-[#e9f1ee] shadow-[0_1px_2px_rgba(0,0,0,0.05)] xl:fixed xl:block 2xl:absolute 2xl:w-[calc(50%-68px)]">
        <div
          className="absolute -left-10.75 top-26.75 h-362.25 w-241.5"
          style={{
            WebkitMaskImage: 'url(/Home/figma-register-panel-mask.svg)',
            maskImage: 'url(/Home/figma-register-panel-mask.svg)',
            WebkitMaskPosition: '-234.852px 54.207px',
            maskPosition: '-234.852px 54.207px',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskSize: '1486.703px 1435.602px',
            maskSize: '1486.703px 1435.602px',
          }}
        >
          <Image
            src="/Home/figma-register-panel-art.png"
            alt=""
            fill
            sizes="966px"
            className="object-cover"
            priority
          />
        </div>

        <div className="relative z-10 mx-auto mt-40 flex w-141 flex-col items-center gap-8 text-center">
          <div className="flex flex-col items-center gap-5">
            <Image
              src="/Home/figma-register-stars.svg"
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
                  src="/Home/figma-register-avatar.png"
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
                src="/Home/figma-register-divider.svg"
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
            <Image src="/Home/figma-register-arrow-left.svg" alt="" width={48} height={48} />
            <Image src="/Home/figma-register-slider-dots.svg" alt="" width={62} height={28} />
            <Image src="/Home/figma-register-arrow-right.svg" alt="" width={48} height={48} />
          </div>
        </div>
      </aside>
    </main>
  );
}
