'use client';

import { Lightbulb, TrendingUp, Sparkles } from 'lucide-react';
import type { ChildDevelopmentProgress } from '@/features/child-profiles/api/child-profiles.api';

type DevelopmentAreasProps = {
  progressReport?: ChildDevelopmentProgress | null;
  completionsByCategory: Record<string, number>;
  isLoading?: boolean;
};

export function DevelopmentAreas({
  progressReport,
  completionsByCategory,
  isLoading = false,
}: DevelopmentAreasProps) {
  if (isLoading) {
    return (
      <div className="flex min-w-0 flex-col gap-5 rounded-2xl border border-[#E8EBE8] bg-transparent p-4 sm:p-6 2xl:p-8 animate-pulse">
        <div className="flex flex-col gap-2">
          <div className="h-7 w-48 rounded bg-[#E9F1EE]" />
          <div className="h-4 w-72 rounded bg-[#E9F1EE]" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-3 2xl:gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 rounded-xl border border-[#DCEEEE] bg-white p-4"
            >
              <div className="h-6 w-32 rounded bg-[#E9F1EE]" />
              <div className="h-4 w-44 rounded bg-[#E9F1EE]" />
              <div className="h-2 w-full rounded-full bg-[#E9F1EE]" />
              <div className="h-14 rounded-lg bg-[#E9F1EE]" />
              <div className="h-14 rounded-lg bg-[#E9F1EE]" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Calculate dynamic engagement and progress percentages
  const targetActivities = 15;

  const fineCount = completionsByCategory['fine_motor'] ?? 0;
  const finePercent =
    progressReport?.fineMotorProgress && progressReport.fineMotorProgress > 0
      ? progressReport.fineMotorProgress
      : Math.min(100, Math.round((fineCount / targetActivities) * 100));

  const grossCount = completionsByCategory['gross_motor'] ?? 0;
  const grossPercent =
    progressReport?.grossMotorProgress && progressReport.grossMotorProgress > 0
      ? progressReport.grossMotorProgress
      : Math.min(100, Math.round((grossCount / targetActivities) * 100));

  const sensoryCount = completionsByCategory['sensory'] ?? 0;
  const sensoryPercent =
    progressReport?.sensoryProgress && progressReport.sensoryProgress > 0
      ? progressReport.sensoryProgress
      : Math.min(100, Math.round((sensoryCount / targetActivities) * 100));

  const coordCount = completionsByCategory['coordination'] ?? 0;
  const coordPercent =
    progressReport?.coordinationProgress && progressReport.coordinationProgress > 0
      ? progressReport.coordinationProgress
      : Math.min(100, Math.round((coordCount / targetActivities) * 100));

  const visualCount =
    (completionsByCategory['visual_motor'] ?? 0) + (completionsByCategory['self_care'] ?? 0);
  const visualPercent =
    progressReport?.visualMotorProgress && progressReport.visualMotorProgress > 0
      ? progressReport.visualMotorProgress
      : Math.min(100, Math.round((visualCount / targetActivities) * 100));

  const areas = [
    {
      title: 'Fine Motor',
      focus: 'Pincer grasp, finger isolation & scissor skills',
      progressText: `${fineCount}/${targetActivities}`,
      progressPercent: finePercent,
      milestone: 'Mastered 3-finger tripod grip on crayons & markers',
      tip: 'Encourage vertical surface drawing (taping paper to wall) to extend wrist position.',
    },
    {
      title: 'Gross Motor',
      focus: 'Single-leg balance & rhythmic jumping',
      progressText: `${grossCount}/${targetActivities}`,
      progressPercent: grossPercent,
      milestone: 'Bounced on two feet 8 times continuously with rhythm',
      tip: 'Create a mini obstacle course with cushions & pillows to build core stability and balance.',
    },
    {
      title: 'Sensory',
      focus: 'Tactile tolerance & deep pressure calming',
      progressText: `${sensoryCount}/${targetActivities}`,
      progressPercent: sensoryPercent,
      milestone: 'Comfortable with dry rice & textured bin play',
      tip: 'Offer heavy work activities like pushing laundry baskets when energetic or dysregulated.',
    },
    {
      title: 'Coordination',
      focus: 'Bilateral coordination & midline crossing',
      progressText: `${coordCount}/${targetActivities}`,
      progressPercent: coordPercent,
      milestone: 'Synchronized two-handed clapping and soft ball catching',
      tip: 'Practice rolling a ball with two hands through an open laundry basket goal.',
    },
    {
      title: 'Self-Care & Visual-Motor',
      focus: 'Large button fastening & cup pouring',
      progressText: `${visualCount}/${targetActivities}`,
      progressPercent: visualPercent,
      milestone: 'Unzipped jacket zipper with hand-over-hand help',
      tip: 'Practice unbuttoning before buttoning—it requires less hand force and builds confidence.',
    },
  ];

  return (
    <div className="flex min-w-0 flex-col gap-5 rounded-2xl border border-[#E8EBE8] bg-transparent p-4 sm:p-6 2xl:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="font-nunito text-2xl font-medium leading-8 text-[#263238]">
            Development areas
          </h2>
          <p className="font-nunito text-sm font-medium leading-5 tracking-[-0.006em] text-[#7D8488]">
            Progress based on completed therapeutic activities &amp; weekly plans
          </p>
        </div>
        <span className="flex w-fit items-center gap-1 rounded-full border border-[#D5E5E5] bg-[#D5E5E5] px-3 py-1.5 font-nunito text-xs font-semibold tracking-[0.04em] text-[#174A4D] shadow-[inset_0px_-6px_2px_0px_rgba(255,255,255,0.07)]">
          5 Core Growth Areas
        </span>
      </div>

      {progressReport?.therapistNotes && (
        <div className="flex items-start gap-3 rounded-2xl border border-[#DCEEEE] bg-[#E0F0E9]/50 p-4 sm:p-5">
          <Sparkles className="mt-0.5 size-5 shrink-0 text-[#2F7D7E]" />
          <div className="flex min-w-0 flex-col gap-1">
            <h4 className="font-nunito text-sm font-semibold text-[#174A4D]">
              Therapist Observation &amp; Guidance
            </h4>
            <p className="font-manrope text-xs leading-5 text-[#515B60]">
              {progressReport.therapistNotes}
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-3 2xl:gap-6">
        {areas.map((area, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-4 rounded-xl border border-[#DCEEEE] bg-white p-4 shadow-[0px_1px_2px_rgba(0,0,0,0.03)]"
          >
            <div className="flex flex-col gap-2">
              <h3 className="font-manrope text-base font-semibold leading-6 tracking-[-0.011em] text-[#263238]">
                {area.title}
              </h3>
              <div className="flex flex-wrap items-center gap-1">
                <span className="font-nunito text-xs font-medium leading-4 text-[#263238]">
                  Current focus:
                </span>
                <span className="font-nunito text-xs font-medium leading-4 text-[#515B60]">
                  {area.focus}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="font-nunito text-xs font-medium leading-4 text-[#515B60]">
                  Completed Engagement
                </span>
                <span className="font-nunito text-xs font-bold leading-4 text-[#2F7D7E]">
                  {area.progressText} ({area.progressPercent}%)
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-[#D5E5E5]">
                <div
                  className="h-full rounded-full bg-[#2F7D7E] transition-all duration-500"
                  style={{ width: `${area.progressPercent}%` }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-2 rounded-lg border border-[#D5E5E5] bg-[#FAFAFA] p-2.5">
                <TrendingUp className="mt-0.5 size-4 shrink-0 text-[#2F7D7E]" />
                <p className="font-nunito text-xs font-medium leading-4.5 text-[#263238]">
                  Recent Milestone:{' '}
                  <span className="font-manrope font-normal text-[#515B60]">{area.milestone}</span>
                </p>
              </div>
              <div className="flex items-start gap-2 rounded-lg border border-[#ECFCCB] bg-[#F7FEE7] p-2.5">
                <Lightbulb className="mt-0.5 size-4 shrink-0 text-[#84cc16]" />
                <p className="font-nunito text-xs font-medium leading-4.5 text-[#263238]">
                  OT Home Tip:{' '}
                  <span className="font-manrope font-normal text-[#515B60]">{area.tip}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
