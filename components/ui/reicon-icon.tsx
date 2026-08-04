'use client';

import { useEffect, useRef } from 'react';
import type { IconFunction, IconWeight } from 'reicon/createIcon';

interface ReiconIconProps {
  icon: IconFunction;
  size?: number | string;
  color?: string;
  weight?: IconWeight;
  className?: string;
  label?: string;
}

export function ReiconIcon({
  icon,
  size = 24,
  color,
  weight = 'Outline',
  className,
  label,
}: ReiconIconProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const svg = icon({ size, color, weight });
    containerRef.current?.replaceChildren(svg);
  }, [color, icon, size, weight]);

  return (
    <span
      ref={containerRef}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      className={`inline-flex shrink-0 items-center justify-center ${className ?? ''}`}
    />
  );
}
