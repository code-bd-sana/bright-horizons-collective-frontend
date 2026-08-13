'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import Image from 'next/image';
import * as React from 'react';

import { cn } from '@/lib/utils';

const universalCardVariants = cva(
  'group/universal-card relative overflow-hidden rounded-[24px] border bg-[var(--explore-surface)] text-[var(--explore-text-primary)]',
  {
    variants: {
      recipe: {
        activity: 'h-[434px] w-full',
        resource: 'h-[428px] w-full',
        printable:
          'flex min-h-[274px] w-full items-center gap-6 max-[700px]:flex-col max-[700px]:items-stretch max-[700px]:gap-0',
        custom: 'w-full',
      },
      state: {
        default: 'border-[var(--explore-border)]',
        highlighted:
          'border-[var(--explore-border-highlight)] shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)]',
        saved: 'border-[var(--explore-border)]',
        disabled: 'pointer-events-none border-[var(--explore-border)] opacity-50',
      },
    },
    defaultVariants: {
      recipe: 'custom',
      state: 'default',
    },
  }
);

const universalCardMediaVariants = cva('relative shrink-0 overflow-hidden rounded-[24px]', {
  variants: {
    recipe: {
      activity: 'absolute -left-px -right-px -top-px h-[286px] bg-[var(--explore-activity-media)]',
      resource: 'absolute -left-px -right-px -top-px h-[274px] bg-[var(--explore-resource-media)]',
      printable: 'h-[274px] w-[259px] bg-[var(--explore-printable-media)] max-[700px]:w-full',
      custom: 'w-full',
    },
  },
  defaultVariants: {
    recipe: 'custom',
  },
});

const universalCardBodyVariants = cva('flex flex-col', {
  variants: {
    recipe: {
      activity: 'absolute inset-x-[15px] top-[301px] gap-4 pb-4',
      resource: 'absolute inset-x-[15px] top-[289px] gap-3',
      printable: 'w-[332px] shrink-0 gap-3 max-[700px]:w-full max-[700px]:p-4',
      custom: 'w-full',
    },
  },
  defaultVariants: {
    recipe: 'custom',
  },
});

type CardRecipe = NonNullable<VariantProps<typeof universalCardVariants>['recipe']>;
type CardState = NonNullable<VariantProps<typeof universalCardVariants>['state']>;
type CardElement = 'article' | 'div' | 'li';

type UniversalCardProps = React.HTMLAttributes<HTMLElement> & {
  as?: CardElement;
  recipe?: CardRecipe;
  state?: CardState;
};

function UniversalCard({
  as: Component = 'article',
  recipe = 'custom',
  state = 'default',
  className,
  children,
  ...props
}: UniversalCardProps) {
  return (
    <Component
      data-slot="universal-card"
      data-recipe={recipe}
      data-state={state}
      aria-disabled={state === 'disabled' || undefined}
      className={cn(universalCardVariants({ recipe, state }), className)}
      {...props}
    >
      {children}
    </Component>
  );
}

type UniversalCardMediaProps = React.ComponentProps<'div'> & {
  recipe?: CardRecipe;
};

function UniversalCardMedia({ recipe = 'custom', className, ...props }: UniversalCardMediaProps) {
  return (
    <div
      data-slot="universal-card-media"
      className={cn(universalCardMediaVariants({ recipe }), className)}
      {...props}
    />
  );
}

type UniversalCardBodyProps = React.ComponentProps<'div'> & {
  recipe?: CardRecipe;
};

function UniversalCardBody({ recipe = 'custom', className, ...props }: UniversalCardBodyProps) {
  return (
    <div
      data-slot="universal-card-body"
      className={cn(universalCardBodyVariants({ recipe }), className)}
      {...props}
    />
  );
}

function UniversalCardOverlay({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="universal-card-overlay"
      className={cn(
        'absolute inset-x-1.5 top-1.5 z-10 flex h-11 items-center justify-between p-2.5',
        className
      )}
      {...props}
    />
  );
}

type UniversalCardArtworkProps = Omit<React.ComponentProps<typeof Image>, 'fill'> & {
  maskSrc: string;
  maskPosition: string;
  maskSize: string;
  frameClassName: string;
};

function UniversalCardArtwork({
  alt,
  maskSrc,
  maskPosition,
  maskSize,
  frameClassName,
  className,
  sizes = '364px',
  ...props
}: UniversalCardArtworkProps) {
  const maskStyles: React.CSSProperties = {
    maskImage: `url('${maskSrc}')`,
    maskPosition,
    maskRepeat: 'no-repeat',
    maskSize,
    WebkitMaskImage: `url('${maskSrc}')`,
    WebkitMaskPosition: maskPosition,
    WebkitMaskRepeat: 'no-repeat',
    WebkitMaskSize: maskSize,
  };

  return (
    <div
      data-slot="universal-card-artwork"
      className={cn('absolute', frameClassName)}
      style={maskStyles}
    >
      <Image
        alt={alt}
        fill
        sizes={sizes}
        className={cn('pointer-events-none object-cover', className)}
        draggable={false}
        {...props}
      />
    </div>
  );
}

type UniversalCardBadgeProps = React.ComponentProps<'span'> & {
  tone?: 'activity' | 'surface';
};

function UniversalCardBadge({ tone = 'surface', className, ...props }: UniversalCardBadgeProps) {
  return (
    <span
      data-slot="universal-card-badge"
      className={cn(
        'inline-flex min-h-[22px] items-center rounded-full px-2.5 py-[3px] font-nunito text-xs font-medium leading-4 whitespace-nowrap text-[#174a4d]',
        tone === 'activity' ? 'bg-[var(--explore-accent-soft)]' : 'bg-white',
        className
      )}
      {...props}
    />
  );
}

type UniversalCardSaveButtonProps = Omit<React.ComponentProps<'button'>, 'onChange'> & {
  label: string;
  saved: boolean;
  iconSrc: string;
  savedIconSrc?: string;
  onSavedChange?: (saved: boolean) => void;
};

function UniversalCardSaveButton({
  label,
  saved,
  iconSrc,
  savedIconSrc,
  onSavedChange,
  className,
  onClick,
  ...props
}: UniversalCardSaveButtonProps) {
  return (
    <button
      type="button"
      aria-label={`${saved ? 'Remove' : 'Save'} ${label}`}
      aria-pressed={saved}
      data-slot="universal-card-save"
      className={cn(
        'flex size-6 shrink-0 items-center justify-center rounded-full bg-white/90 shadow-[0_1px_4px_rgba(0,0,0,0.12)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--explore-primary)] focus-visible:ring-offset-2',
        className
      )}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) onSavedChange?.(!saved);
      }}
      {...props}
    >
      <Image
        src={saved && savedIconSrc ? savedIconSrc : iconSrc}
        alt=""
        width={16}
        height={16}
        className="size-4"
      />
    </button>
  );
}

export {
  UniversalCard,
  UniversalCardArtwork,
  UniversalCardBadge,
  UniversalCardBody,
  UniversalCardMedia,
  UniversalCardOverlay,
  UniversalCardSaveButton,
  universalCardVariants,
};
export type { CardRecipe, CardState, UniversalCardProps };
