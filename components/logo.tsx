'use client';

import Image from 'next/image';
import Link from 'next/link';

export interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  href?: string;
  priority?: boolean;
  alt?: string;
  showBackdrop?: boolean;
}

export function Logo({
  className = '',
  width = 88,
  height = 88,
  href = '/',
  priority = true,
  alt = 'Bright Horizons Collective Logo',
  showBackdrop = false,
}: LogoProps) {
  const scale = width / 123;
  const backdropWidth = 618.125 * scale;
  const backdropHeight = 533.33 * scale;
  const backdropLeft = -255 * scale;
  const backdropTop = -257 * scale;
  const unionWidth = 520.995 * scale;
  const unionHeight = 383 * scale;

  const content = (
    <span className="relative flex size-full shrink-0 items-center justify-center">
      {showBackdrop && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute flex items-center justify-center"
          style={{
            left: backdropLeft,
            top: backdropTop,
            width: backdropWidth,
            height: backdropHeight,
          }}
        >
          <Image
            src="/Home/figma-hero-union.svg"
            alt=""
            width={521}
            height={383}
            className="rotate-[160.75deg]"
            style={{
              width: unionWidth,
              height: unionHeight,
            }}
            priority={priority}
          />
        </span>
      )}
      <Image
        src="/Home/figma-hero-logo.png"
        alt={alt}
        fill
        sizes={`${width}px`}
        priority={priority}
        className="relative z-10 object-contain"
      />
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        aria-label={alt}
        className={`inline-flex shrink-0 items-center justify-center rounded-lg transition-opacity hover:opacity-90 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary ${className}`}
        style={{ width, height }}
      >
        {content}
      </Link>
    );
  }

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center ${className}`}
      style={{ width, height }}
    >
      {content}
    </span>
  );
}

export default Logo;
