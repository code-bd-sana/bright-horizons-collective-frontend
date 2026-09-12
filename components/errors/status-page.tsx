'use client';

import type { MouseEvent, ReactNode } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/logo';

type StatusPageAction =
  | { href: string; label: string; onClick?: never }
  | { href?: never; label: string; onClick: () => void };

type StatusPageProps = {
  code: string;
  title: string;
  description: string;
  primaryAction: StatusPageAction;
  secondaryAction?: StatusPageAction;
};

function DocumentNavigationLink({
  href,
  className,
  children,
  ariaLabel,
}: {
  href: string;
  className: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    event.preventDefault();
    window.location.assign(href);
  };

  return (
    <Link href={href} className={className} aria-label={ariaLabel} onClick={handleClick}>
      {children}
    </Link>
  );
}

function StatusAction({
  action,
  primary = false,
}: {
  action: StatusPageAction;
  primary?: boolean;
}) {
  const className = `inline-flex min-h-11 items-center justify-center rounded-full border px-6 py-2.5 font-manrope text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f7d7e] ${
    primary
      ? 'border-[#2f7d7e] bg-[#2f7d7e] text-white hover:bg-[#276b6c]'
      : 'border-[#accbcb] bg-white text-[#2f7d7e] hover:bg-[#eef6f4]'
  }`;

  if (action.href) {
    return (
      <DocumentNavigationLink href={action.href} className={className}>
        {action.label}
      </DocumentNavigationLink>
    );
  }

  return (
    <button type="button" onClick={action.onClick} className={className}>
      {action.label}
    </button>
  );
}

export function StatusPage({
  code,
  title,
  description,
  primaryAction,
  secondaryAction,
}: StatusPageProps) {
  const headingId = `status-${code}-heading`;

  return (
    <main
      aria-labelledby={headingId}
      className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden bg-[#fffdf8] px-4 py-10 sm:px-6"
    >
      <div
        aria-hidden="true"
        className="absolute -top-24 -left-24 size-72 rounded-full bg-[#fbded5]/70 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-24 -bottom-24 size-72 rounded-full bg-[#dceeee]/80 blur-3xl"
      />

      <section className="relative z-10 flex w-full max-w-xl flex-col items-center rounded-3xl border border-[#e8ebe8] bg-white/95 px-5 py-8 text-center shadow-xl shadow-[#d8ddd9]/30 sm:px-10 sm:py-12">
        <DocumentNavigationLink
          href="/"
          ariaLabel="Return to Bright Horizons Collective home"
          className="rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f7d7e]"
        >
          <Logo width={92} height={72} href="" showBackdrop={false} />
        </DocumentNavigationLink>
        <p className="mt-5 font-manrope text-sm font-semibold tracking-widest text-[#2f7d7e]">
          ERROR {code}
        </p>
        <h1
          id={headingId}
          className="mt-3 font-nunito text-3xl font-semibold tracking-tight text-[#263238] sm:text-4xl"
        >
          {title}
        </h1>
        <p className="mt-4 max-w-md font-manrope text-sm leading-6 text-[#667176] sm:text-base">
          {description}
        </p>
        <div className="mt-7 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <StatusAction action={primaryAction} primary />
          {secondaryAction ? <StatusAction action={secondaryAction} /> : null}
        </div>
      </section>
    </main>
  );
}
