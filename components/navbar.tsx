'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

const defaultNavItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '#about' },
  { label: 'Membership', href: '#membership' },
  { label: 'Explore', href: '#explore' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
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

  return (
    <nav
      className={`relative z-50 inline-flex items-center w-full max-w-(--breakpoint-xl) mx-auto ${className}`}
    >
      {/* Outer Floating Pill Card (Figma Node 1120:55252) */}
      <div className="w-full bg-white border border-[#e8ebe8] rounded-[20px] p-4 drop-shadow-[0px_7px_15px_rgba(174,171,163,0.12)] shadow-sm">
        <div className="flex items-center justify-between gap-1 md:gap-2">
          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 w-full justify-between">
            <div className="flex items-center gap-1 xl:gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href === '/' && pathname === '/');
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`px-3 py-1.5 text-[16px] font-medium leading-6 tracking-[-0.176px] transition-colors rounded-lg ${
                      isActive
                        ? 'text-[#2F7D7E] font-semibold'
                        : 'text-[#263238] hover:text-[#2F7D7E]'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* CTA Button: Start Free */}
            <Link
              href={ctaHref}
              className="relative inline-flex items-center justify-center px-5 py-1.5 text-[16px] font-medium leading-6 tracking-[-0.176px] text-[#FFFDF8] rounded-[999px] border border-[#ACCBCB] bg-linear-to-b from-[#2F7D7E]/80 to-[#2F7D7E] hover:opacity-95 shadow-[inset_0px_-6px_3px_0px_rgba(255,255,255,0.09)] transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {ctaLabel}
            </Link>
          </div>

          {/* Mobile Header View */}
          <div className="flex lg:hidden items-center justify-between w-full">
            <span className="text-[#263238] font-semibold text-lg">Menu</span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#263238] hover:text-[#2F7D7E] rounded-lg transition-colors focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden pt-4 mt-3 border-t border-[#e8ebe8] flex flex-col space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
            {navItems.map((item) => {
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
              href={ctaHref}
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 text-center py-2.5 text-[16px] font-medium text-[#FFFDF8] rounded-[999px] border border-[#ACCBCB] bg-linear-to-b from-[#2F7D7E]/80 to-[#2F7D7E] shadow-sm"
            >
              {ctaLabel}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
