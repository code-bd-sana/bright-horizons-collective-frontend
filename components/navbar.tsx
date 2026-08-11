'use client';

import { Logo } from '@/components/logo';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

const defaultNavItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Membership', href: '/membership' },
  { label: 'Explore', href: '/explore' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
  { label: 'Log in', href: '/login' },
];

export interface NavbarProps {
  navItems?: NavItem[];
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}

export function Navbar({
  navItems = defaultNavItems,
  ctaLabel = 'Start Free',
  ctaHref = '/register',
  className = '',
}: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const visibleNavItems = isAuthenticated
    ? navItems.filter((item) => item.href !== '/login')
    : navItems;
  const visibleCtaLabel = isAuthenticated ? 'Dashboard' : ctaLabel;
  const visibleCtaHref = isAuthenticated ? '/dashboard' : ctaHref;

  useEffect(() => {
    let isMounted = true;

    const getSession = async () => {
      try {
        const response = await fetch('/api/auth/session', {
          credentials: 'same-origin',
          cache: 'no-store',
        });

        if (isMounted) {
          setIsAuthenticated(response.ok);
        }
      } catch {
        if (isMounted) {
          setIsAuthenticated(false);
        }
      }
    };

    void getSession();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <nav className={`relative z-50 inline-flex w-fit items-center max-lg:w-full ${className}`}>
      {/* Outer Floating Pill Card (Figma Node 1120:55252) */}
      <div className="w-fit rounded-[20px] border border-[#E8EBE8] bg-white p-4 max-lg:w-full max-sm:px-3 max-sm:py-2.5 font-nunito shadow-[0px_7px_8px_rgba(174,171,163,0.10),0px_30px_15px_rgba(174,171,163,0.09),0px_67px_20px_rgba(174,171,163,0.05),0px_119px_24px_rgba(174,171,163,0.01),0px_186px_26px_rgba(174,171,163,0)]">
        <div className="flex items-center gap-1">
          {/* Desktop Nav Items */}
          <div className="hidden lg:flex w-fit items-center gap-1">
            <div className="flex items-center gap-1">
              {visibleNavItems.map((item) => {
                const isActive = pathname === item.href || (item.href === '/' && pathname === '/');
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`px-3 py-1.5 text-[16px] font-medium leading-6 tracking-[-0.176px] transition-colors ${
                      isActive ? 'text-[#2F7D7E]' : 'text-[#263238] hover:text-[#2F7D7E]'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* CTA Button: Start Free */}
            <Link
              href={visibleCtaHref}
              className="relative ml-auto inline-flex items-center justify-center rounded-[999px] border border-[#ACCBCB] bg-linear-to-b from-[#2F7D7E]/80 to-[#2F7D7E] px-3 py-1.5 text-[16px] font-medium leading-6 tracking-[-0.176px] text-[#FFFDF8] shadow-[inset_0px_-6px_3px_0px_rgba(255,255,255,0.09)] transition-all hover:opacity-95"
            >
              {visibleCtaLabel}
            </Link>
          </div>

          {/* Mobile Header View */}
          <div className="flex lg:hidden items-center justify-between w-full pl-1">
            <Logo width={36} height={36} showBackdrop={false} />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 max-sm:p-1.5 text-[#263238] hover:text-[#2F7D7E] rounded-lg transition-colors focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden pt-4 mt-3 max-sm:pt-3 max-sm:mt-2 max-sm:space-y-1 border-t border-[#e8ebe8] flex flex-col space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
            {visibleNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2 text-[16px] font-medium rounded-md transition-colors ${
                    isActive
                      ? 'text-[#2F7D7E] bg-[#2F7D7E]/10 font-semibold'
                      : 'text-[#263238] hover:bg-neutral-100 hover:text-[#2F7D7E]'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href={visibleCtaHref}
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 text-center py-2.5 text-[16px] font-medium text-[#FFFDF8] rounded-[999px] border border-[#ACCBCB] bg-linear-to-b from-[#2F7D7E]/80 to-[#2F7D7E] shadow-sm"
            >
              {visibleCtaLabel}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
