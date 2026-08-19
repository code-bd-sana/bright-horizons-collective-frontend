import React from 'react';

interface PlanSectionProps {
  title: string;
  children: React.ReactNode;
}

export function PlanSection({ title, children }: PlanSectionProps) {
  return (
    <section className="flex flex-col gap-[24px] w-full">
      <h2 className="font-['Nunito'] font-medium text-[32px] leading-[40px] tracking-[-0.16px] text-[#263238]">
        {title}
      </h2>
      <div className="flex flex-wrap gap-[24px] w-full">{children}</div>
    </section>
  );
}
