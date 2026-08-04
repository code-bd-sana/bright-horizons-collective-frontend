'use client';

import { usePathname } from 'next/navigation';

import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';

interface MarketingShellProps {
  children: React.ReactNode;
}

const privateRoutePrefixes = ['/dashboard', '/login', '/register', '/forgot-password'];

export function MarketingShell({ children }: MarketingShellProps) {
  const pathname = usePathname();
  const usesPrivateLayout = privateRoutePrefixes.some((prefix) => pathname.startsWith(prefix));

  if (usesPrivateLayout) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
