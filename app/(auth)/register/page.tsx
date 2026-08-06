'use client';

import { Logo } from '@/components/logo';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { toast } from 'sonner';

const socialProviders = [{ label: 'Sign up with Google', icon: '/Home/figma-register-google.svg' }];

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const validatePassword = (value: string) => {
    const errors: string[] = [];
    if (value.length <= 6) errors.push('Must be greater than 6 characters');
    if (!/[A-Z]/.test(value)) errors.push('Must contain at least one uppercase letter');
    if (!/[a-z]/.test(value)) errors.push('Must contain at least one lowercase letter');
    if (!/\d/.test(value)) errors.push('Must contain at least one digit');
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
      errors.push('Must contain at least one special character');
    return errors;
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPasswordErrors(value ? validatePassword(value) : []);
  };

  const handleRegister = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = validatePassword(password);

    if (errors.length) {
      setPasswordErrors(errors);
      return;
    }

    toast.success('Registration successful! Please login.');
    router.push('/login');
  };

  return (
    <main className="relative h-dvh overflow-hidden bg-[#fffdf8] text-[#263238]">
      <Logo
        href="/"
        width={123}
        height={123}
        showBackdrop
        className="absolute left-[calc(8.333333%+34px)] top-4 z-20 max-lg:left-8 max-lg:top-5 max-lg:size-22"
      />

      <section className="mx-auto flex w-full max-w-123 flex-col items-center px-6 pt-20 xl:absolute xl:left-[calc(8.333333%+69px)] xl:top-54 xl:mx-0 xl:px-0 xl:pt-0">
        <div className="mb-8 flex w-full flex-col items-center gap-3 text-center xl:mb-12">
          <h1 className="font-nunito text-[32px] font-medium leading-10 tracking-[-0.16px] text-[#263238]">
            Create Your Account
          </h1>
          <p className="w-85 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#7d8488]">
            Your account will be used to manage memberships, child profiles, and personalized plans.
          </p>
          <p className="font-manrope text-base leading-6 tracking-[-0.176px] text-[#515b60]">
            Already have an account?{' '}
            <Link href="/login" className="text-[#f2b59f] hover:underline">
              Login
            </Link>
          </p>
        </div>

        <form className="w-full" onSubmit={handleRegister}>
          <div className="space-y-4">
            {socialProviders.map((provider) => (
              <button
                key={provider.label}
                type="button"
                onClick={() =>
                  toast.info(
                    `${provider.label.replace('Sign up with ', '')} sign-up is coming soon.`
                  )
                }
                className="flex h-12 w-full items-center justify-center gap-3 rounded-3xl border border-[#ece9fd] bg-[#fce9e3] px-6 py-3 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-[#263238] transition-opacity hover:opacity-85"
              >
                <Image src={provider.icon} alt="" width={24} height={24} />
                {provider.label}
              </button>
            ))}

            <div className="flex items-center gap-2 py-1 font-manrope text-base leading-6 text-[#7d8488]">
              <span className="h-px flex-1 bg-[#d5e5e5]" />
              OR
              <span className="h-px flex-1 bg-[#d5e5e5]" />
            </div>
          </div>

          <div className="mt-4 space-y-4">
            <label
              className="block font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#263238]"
              htmlFor="name"
            >
              Full Name <span className="text-[#b24b4b]">*</span>
              <input
                id="name"
                required
                placeholder="John Doe"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-2 h-12 w-full rounded-xl border border-[#d5e5e5] bg-[#fafafa] px-3 font-manrope text-base leading-6 tracking-[-0.176px] text-[#263238] outline-none placeholder:text-[#7d8488] focus:border-[#5e9999]"
              />
            </label>

            <label
              className="block font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#515b60]"
              htmlFor="email"
            >
              Email <span className="text-[#b24b4b]">*</span>
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

            <label
              className="block font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#515b60]"
              htmlFor="password"
            >
              Password <span className="text-[#b24b4b]">*</span>
              <span className="relative mt-2 block">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="minimum 8 character"
                  value={password}
                  onChange={(event) => handlePasswordChange(event.target.value)}
                  className="h-12 w-full rounded-xl border border-[#d5e5e5] bg-[#fafafa] px-3 pr-12 font-manrope text-base leading-6 tracking-[-0.176px] text-[#263238] outline-none placeholder:text-[#7d8488] focus:border-[#5e9999]"
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
          </div>

          {passwordErrors.length > 0 && (
            <ul className="mt-2 list-inside list-disc space-y-0.5 font-manrope text-xs text-[#b24b4b]">
              {passwordErrors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}

          <button
            type="submit"
            className="mt-4 h-12 w-full rounded-xl border border-[#accbcb] bg-[#2f7d7e] px-3 font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-[#f8fafc] shadow-[inset_0_-6px_2px_rgba(255,255,255,0.07)] transition hover:bg-[#266b6c]"
          >
            Sign Up
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
      </section>

      <aside className="absolute right-8 top-8 hidden h-[calc(100dvh-4rem)] w-[calc(50%-68px)] max-w-223 overflow-hidden rounded-2xl bg-[#e9f1ee] shadow-[0_1px_2px_rgba(0,0,0,0.05)] xl:block">
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
