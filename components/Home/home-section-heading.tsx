interface HomeSectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function HomeSectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
}: HomeSectionHeadingProps) {
  const isCentered = align === 'center';

  return (
    <div
      className={`${isCentered ? 'items-center text-center' : 'items-start text-left'} flex flex-col gap-3 ${className}`}
    >
      {eyebrow && (
        <span className="rounded-lg border border-[#FCE9E3] bg-[#FFF8F5] px-2 py-1 font-manrope text-xs leading-4 text-[#614840]">
          {eyebrow}
        </span>
      )}
      <h2 className="font-nunito text-[clamp(34px,4vw,48px)] font-semibold leading-[1.15] tracking-[-0.48px] text-[#263238]">
        {title}
      </h2>
      {description && (
        <p
          className={`${isCentered ? 'max-w-213' : 'max-w-142.75'} font-manrope text-base leading-6 tracking-[-0.176px] text-[#607077]`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
