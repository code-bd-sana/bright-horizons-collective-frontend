'use client';

import { Logo } from '@/components/logo';
import { loginSchema, type LoginFormValues } from '@/services/api/auth/auth.schemas';
import { useLoginMutation } from '@/services/api/auth/auth.mutations';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending } = useLoginMutation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', rememberMe: true },
  });
  const rememberMe = watch('rememberMe');

  const handleLogin = (values: LoginFormValues) => login(values);

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
        <div className="mb-8 text-center xl:mb-12">
          <h1 className="font-nunito text-[32px] font-medium leading-10 tracking-[-0.64px] text-[#263238]">
            Welcome Back
          </h1>
          <p className="mx-auto mt-1 max-w-85 font-manrope text-sm leading-5 text-[#7d8488]">
            Enter your details below to access your personalized parenting toolkit.
          </p>
        </div>

        <form className="w-full" noValidate onSubmit={handleSubmit(handleLogin)}>
          <div className="space-y-4 xl:space-y-5">
            <label
              className="block font-manrope text-sm font-medium leading-5 text-[#515b60]"
              htmlFor="email"
            >
              Email Address <span className="text-[#ff6f61]">*</span>
              <input
                id="email"
                type="email"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
                {...register('email')}
                className="mt-2 h-12 w-full rounded-xl border border-[#d5e5e5] bg-[#fafafa] px-3 font-manrope text-base font-normal text-[#263238] outline-none transition focus:border-[#5e9999] aria-invalid:border-[#ff6f61]"
              />
              {errors.email && (
                <span
                  id="email-error"
                  role="alert"
                  className="mt-1 block font-manrope text-xs text-[#c94f45]"
                >
                  {errors.email.message}
                </span>
              )}
            </label>

            <label
              className="block font-manrope text-sm font-medium leading-5 text-[#515b60]"
              htmlFor="password"
            >
              Password <span className="text-[#ff6f61]">*</span>
              <span className="relative mt-2 block">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  {...register('password')}
                  className="h-12 w-full rounded-xl border border-[#d5e5e5] bg-[#fafafa] px-3 pr-12 font-manrope text-base font-normal text-[#263238] outline-none transition focus:border-[#5e9999] aria-invalid:border-[#ff6f61]"
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((visible) => !visible)}
                  className="absolute inset-y-0 right-0 flex w-12 items-center justify-center"
                >
                  <Image src="/Home/figma-login-eye.svg" alt="" width={20} height={20} />
                </button>
              </span>
              {errors.password && (
                <span
                  id="password-error"
                  role="alert"
                  className="mt-1 block font-manrope text-xs text-[#c94f45]"
                >
                  {errors.password.message}
                </span>
              )}
            </label>
          </div>

          <div className="mt-5 flex items-center justify-between px-1 font-manrope text-sm leading-5 max-sm:flex-col max-sm:items-start max-sm:gap-3 xl:mt-6">
            <label className="flex cursor-pointer items-center gap-2 text-[#515b60]">
              <input type="checkbox" {...register('rememberMe')} className="sr-only" />
              <span className="relative size-5 overflow-hidden rounded-[5px]">
                {rememberMe ? (
                  <Image src="/Home/figma-login-checkmark.svg" alt="" fill sizes="20px" />
                ) : (
                  <span className="block size-full border border-[#accbcb] bg-white" />
                )}
              </span>
              Remember Me
            </label>
            <Link href="/forgot-password" className="font-medium text-[#167e87] hover:underline">
              Forget Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isPending}
            aria-busy={isPending}
            className="mt-5 h-12 w-full rounded-xl border border-[#accbcb] bg-[#2c7b7d] px-3 font-manrope text-sm font-semibold leading-5 text-white shadow-[0_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#236a6c] xl:mt-8"
          >
            {isPending ? 'Logging In…' : 'Log In'}
          </button>
        </form>

        <p className="mt-5 font-manrope text-sm leading-5 text-[#515b60] xl:mt-6">
          Do not have an account?{' '}
          <Link href="/register" className="font-semibold text-[#167e87] hover:underline">
            Sign Up
          </Link>
        </p>
      </section>

      <aside className="absolute right-8 top-8 hidden h-[calc(100dvh-4rem)] w-[calc(50%-5rem)] max-w-223 overflow-hidden rounded-2xl bg-[#e9f1ee] shadow-[0_4px_4px_rgba(0,0,0,0.25)] xl:fixed xl:block 2xl:absolute 2xl:w-[calc(50%-68px)]">
        <div
          className="absolute -left-1.75 top-40 h-305 w-228.75"
          style={{
            WebkitMaskImage: 'url(/Home/figma-login-panel-mask.svg)',
            maskImage: 'url(/Home/figma-login-panel-mask.svg)',
            WebkitMaskPosition: '-270.851px 1.207px',
            maskPosition: '-270.851px 1.207px',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskSize: '1486.703px 1435.602px',
            maskSize: '1486.703px 1435.602px',
          }}
        >
          <Image
            src="/Home/figma-login-panel-art.png"
            alt=""
            fill
            sizes="915px"
            className="object-cover"
            priority
          />
        </div>

        <div className="relative z-10 mx-auto mt-40 w-141 text-center">
          <Image
            src="/Home/figma-login-stars.svg"
            alt="Five star rating"
            width={116}
            height={22}
            className="mx-auto"
          />
          <blockquote className="mx-auto mt-6 max-w-127.5 font-manrope text-base leading-6 text-[#263238]">
            “I used to spend my evenings googling activities, never sure if I was even doing the
            right thing. Now I just open my plan for the week and know exactly what to try.
            It&apos;s the first thing that&apos;s actually made me feel like I&apos;m helping, not
            guessing.”
          </blockquote>

          <div className="mt-6 flex items-center justify-center">
            <Image
              src="/Home/figma-login-avatar.png"
              alt="Sarah T."
              width={56}
              height={56}
              className="rounded-full"
            />
            <div className="ml-3 text-left font-manrope text-sm leading-5">
              <p className="font-semibold text-[#263238]">Sarah T.</p>
              <p className="text-[#515b60]">Parent of a toddler</p>
            </div>
            <Image
              src="/Home/figma-login-divider.svg"
              alt=""
              width={1}
              height={61}
              className="mx-4 h-15.25 w-px"
            />
            <div className="text-left font-manrope text-sm leading-5 text-[#515b60]">
              <p>Child age 2</p>
              <p>Member since 2024</p>
              <p>Portland, OR</p>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-5">
            <Image src="/Home/figma-login-arrow-left.svg" alt="" width={48} height={48} />
            <Image src="/Home/figma-login-slider-dots.svg" alt="" width={62} height={28} />
            <Image src="/Home/figma-login-arrow-right.svg" alt="" width={48} height={48} />
          </div>
        </div>
      </aside>
    </main>
  );
}
