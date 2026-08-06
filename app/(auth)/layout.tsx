'use client';

import { Logo } from '@/components/logo';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === '/login' || pathname === '/register') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex w-full">
      {/* Left Branding Side (Hidden on Mobile) */}
      <div
        className="hidden lg:flex flex-col justify-between w-1/2 p-10 text-white relative bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        {/* Dark overlay to ensure text is readable over the image */}
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 flex items-center gap-3">
          <Logo width={72} height={72} />
        </div>

        <div className="relative z-10 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg font-medium leading-relaxed">
              &ldquo;This template has saved me countless hours of work and helped me deliver
              stunning projects faster than ever before.&rdquo;
            </p>
            <footer className="text-sm text-neutral-300">Sofia Davis, Product Designer</footer>
          </blockquote>
        </div>
      </div>

      {/* Right Form Side */}
      <div className="flex flex-col flex-1 items-center justify-center p-8 bg-background relative overflow-hidden">
        {/* Mobile Logo (Visible only on smaller screens) */}
        <div className="lg:hidden absolute top-8 left-8 z-20 flex items-center gap-2">
          <Logo width={72} height={72} />
        </div>

        {/* Background decorations for a premium feel on the form side */}
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/5 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-secondary/5 blur-[120px] pointer-events-none"></div>

        <div className="w-full max-w-md relative z-10">{children}</div>
      </div>
    </div>
  );
}
