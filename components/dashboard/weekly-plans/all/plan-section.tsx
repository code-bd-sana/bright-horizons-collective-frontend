import type { ReactNode } from 'react';

interface PlanSectionProps {
  title: string;
  children: ReactNode;
}

export function PlanSection({ title, children }: PlanSectionProps) {
  return (
    <section className="flex w-full flex-col gap-4 lg:gap-[24px]">
      <h2 className="font-['Nunito'] font-medium text-[32px] leading-[40px] tracking-[-0.16px] text-[#263238]">
        {title}
      </h2>
      <div className="flex w-full flex-wrap gap-4 sm:gap-6">{children}</div>
    </section>
  );
}
