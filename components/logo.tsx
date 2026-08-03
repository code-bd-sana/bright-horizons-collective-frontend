'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  href?: string;
  priority?: boolean;
  alt?: string;
}

export function Logo({
  className = '',
  width = 123,
  height = 123,
  href = '/',
  priority = true,
  alt = 'Bright Horizons Collective Logo',
}: LogoProps) {
  const content = (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <Image
        src="/logo/logo1.svg"
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className="w-auto h-auto max-w-full object-contain"
      />
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-label={alt}
        className="inline-flex items-center justify-center transition-opacity hover:opacity-90 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
      >
        {content}
      </Link>
    );
  }

  return content;
}

export default Logo;
