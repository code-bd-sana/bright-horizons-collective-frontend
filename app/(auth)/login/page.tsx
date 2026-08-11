'use client';

import { Logo } from '@/components/logo';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

const socialProviders = [
  { label: 'Continue with Google', icon: '/Home/figma-login-google.svg', tone: 'bg-[#fce9e3]' },
];

const demoAccounts = [
  { role: 'Parent', email: 'parent@gmail.com', password: 'parent@123' },
  { role: 'Admin', email: 'admin@gmail.com', password: 'admin@123' },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ email, password, rememberMe }),
      });
      const result = (await response.json()) as { error?: string; role?: string };

      if (!response.ok || !result.role) {
        toast.error(result.error ?? 'Unable to sign in. Please try again.');
        return;
      }

      toast.success(`Successfully logged in as ${result.role}`);
      router.replace('/dashboard');
      router.refresh();
    } catch {
      toast.error('Unable to sign in. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
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

      <section className="mx-auto flex w-full max-w-123 flex-1 flex-col items-center justify-center px-6 py-12 xl:ml-[calc(8.333333%+69px)] xl:mx-0 xl:flex-none xl:justify-start xl:px-0 xl:py-0">
        <div className="mb-8 text-center xl:mb-12">
          <h1 className="font-nunito text-[32px] font-medium leading-10 tracking-[-0.64px] text-[#263238]">
            Welcome Back
          </h1>
          <p className="mx-auto mt-1 max-w-85 font-manrope text-sm leading-5 text-[#7d8488]">
            Enter your details below to access your personalized parenting toolkit.
          </p>
        </div>

        <form className="w-full" onSubmit={handleLogin}>
          <div className="space-y-3">
            {socialProviders.map((provider) => (
              <button
                key={provider.label}
                type="button"
                onClick={() =>
                  toast.info(
                    `${provider.label.replace('Continue with ', '')} sign-in is coming soon.`
                  )
                }
                className={`flex h-12 w-full items-center justify-center gap-3 rounded-3xl border border-[#ece9fd] px-6 py-3 font-manrope text-sm font-medium leading-5 text-[#263238] transition-opacity hover:opacity-85 ${provider.tone}`}
              >
                <Image src={provider.icon} alt="" width={24} height={24} />
                {provider.label}
              </button>
            ))}
          </div>

          <div className="my-5 flex items-center gap-4 font-manrope text-sm leading-5 text-[#7d8488] xl:my-8">
            <span className="h-px flex-1 bg-[#d5e5e5]" />
            OR
            <span className="h-px flex-1 bg-[#d5e5e5]" />
          </div>

          <div className="space-y-4 xl:space-y-5">
            <label
              className="block font-manrope text-sm font-medium leading-5 text-[#515b60]"
              htmlFor="email"
            >
              Email Address <span className="text-[#ff6f61]">*</span>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 h-12 w-full rounded-xl border border-[#d5e5e5] bg-[#fafafa] px-3 font-manrope text-base font-normal text-[#263238] outline-none transition focus:border-[#5e9999]"
              />
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
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="h-12 w-full rounded-xl border border-[#d5e5e5] bg-[#fafafa] px-3 pr-12 font-manrope text-base font-normal text-[#263238] outline-none transition focus:border-[#5e9999]"
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
            </label>
          </div>

          <div className="mt-5 flex items-center justify-between px-1 font-manrope text-sm leading-5 xl:mt-6">
            <label className="flex cursor-pointer items-center gap-2 text-[#515b60]">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
                className="sr-only"
              />
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
            disabled={isSubmitting}
            className="mt-5 h-12 w-full rounded-xl border border-[#accbcb] bg-[#2c7b7d] px-3 font-manrope text-sm font-semibold leading-5 text-white shadow-[0_1px_2px_rgba(16,24,40,0.05)] transition hover:bg-[#236a6c] xl:mt-8"
          >
            {isSubmitting ? 'Logging In…' : 'Log In'}
          </button>
        </form>

        <section
          aria-label="Demo login credentials"
          className="mt-5 w-full rounded-xl border border-[#d5e5e5] bg-white/70 p-3 xl:mt-6"
        >
          <p className="font-manrope text-xs font-semibold uppercase tracking-[0.08em] text-[#515b60]">
            Demo login
          </p>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {demoAccounts.map((account) => (
              <button
                key={account.role}
                type="button"
                onClick={() => {
                  setEmail(account.email);
                  setPassword(account.password);
                }}
                className="rounded-lg border border-[#e7eeee] bg-[#fafafa] px-3 py-2 text-left font-manrope text-xs leading-5 text-[#515b60] transition hover:border-[#accbcb]"
              >
                <span className="block font-semibold text-[#263238]">{account.role}</span>
                <span className="block break-all">{account.email}</span>
                <span className="block">{account.password}</span>
              </button>
            ))}
          </div>
        </section>

        <p className="mt-5 font-manrope text-sm leading-5 text-[#515b60] xl:mt-6">
          Do not have an account?{' '}
          <Link href="/register" className="font-semibold text-[#167e87] hover:underline">
            Sign Up
          </Link>
        </p>
      </section>

      <aside className="absolute right-8 top-8 hidden h-[calc(100dvh-4rem)] w-[calc(50%-68px)] max-w-223 overflow-hidden rounded-2xl bg-[#e9f1ee] shadow-[0_4px_4px_rgba(0,0,0,0.25)] xl:block">
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
