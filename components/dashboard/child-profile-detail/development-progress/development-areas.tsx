import { Star } from 'lucide-react';

const areas = [
  {
    title: 'Fine Motor',
    focus: 'Tong transfer + playdough',
    progressText: '18/20',
    progressPercent: 90,
    milestone: 'Mastered 3-finger tripod grip on crayons',
    tip: 'Encourage vertical surface drawing (taping paper to wall) to extend wrist position.',
  },
  {
    title: 'Gross Motor',
    focus: 'Single-leg balance & rhythmic jumping',
    progressText: '12/15',
    progressPercent: 80,
    milestone: 'Bounced on two feet 8 times continuously',
    tip: 'Encourage vertical surface drawing (taping paper to wall) to extend wrist position.', // Figma placeholder
  },
  {
    title: 'Sensory',
    focus: 'Tactile tolerance & deep pressure calming',
    progressText: '9/16',
    progressPercent: 56,
    milestone: 'Comfortable with dry rice sensory bin play',
    tip: 'Offer heavy work activities like pushing laundry baskets when feeling energetic.',
  },
  {
    title: 'Communication',
    focus: 'Multi-word needs expression & gesture pairing',
    progressText: '7/15',
    progressPercent: 46,
    milestone: 'Named 4 core emotion expressions in mirror',
    tip: 'Pause 5 seconds after asking a question to allow processing time.',
  },
  {
    title: 'Self-Care',
    focus: 'Large button fastening & cup pouring',
    progressText: '5/14',
    progressPercent: 35,
    milestone: 'Unzipped jacket zipper, hand-over-hand help',
    tip: 'Practice unbuttoning before buttoning—it requires less hand force.',
  },
];

export function DevelopmentAreas() {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-[#E8EBE8] bg-transparent p-6 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="font-nunito text-2xl font-medium leading-8 text-[#263238]">
            Development areas
          </h2>
          <p className="font-nunito text-sm font-medium leading-5 tracking-[-0.006em] text-[#7D8488]">
            Progress based on completed therapeutic activities & weekly plans
          </p>
        </div>
        <button
          type="button"
          className="flex w-fit items-center gap-1 rounded-full bg-[#D5E5E5] px-3 py-2 font-manrope text-xs font-medium tracking-[0.04em] text-[#174A4D] transition-colors hover:bg-[#c2d6d6]"
        >
          5 Core Growth Areas
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {areas.map((area, idx) => (
          <div
            key={idx}
            className="flex flex-col gap-4 rounded-xl border border-[#DCEEEE] bg-white p-4"
          >
            <div className="flex flex-col gap-3">
              <h3 className="font-manrope text-base font-semibold leading-6 tracking-[-0.011em] text-[#263238]">
                {area.title}
              </h3>
              <div className="flex items-center gap-1">
                <span className="font-nunito text-xs font-medium leading-4 text-[#263238]">
                  Current focus:
                </span>
                <span className="font-nunito text-xs font-medium leading-4 text-[#515B60]">
                  {area.focus}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-nunito text-xs font-medium leading-4 text-[#515B60]">
                  Completed Engagement
                </span>
                <span className="font-nunito text-xs font-bold leading-4 text-[#2F7D7E]">
                  {area.progressText}
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
              <div className="flex items-start gap-2 rounded-lg border border-[#D5E5E5] bg-[#FAFAFA] p-2">
                <Star className="mt-0.5 h-4 w-4 shrink-0 text-[#7D8488]" />
                <p className="font-nunito text-xs font-medium leading-4 text-[#263238]">
                  Recent Milestone:{' '}
                  <span className="font-manrope font-normal text-[#515B60]">{area.milestone}</span>
                </p>
              </div>
              <div className="flex items-start gap-2 rounded-lg border border-[#ECFCCB] bg-[#F7FEE7] p-2">
                <Star className="mt-0.5 h-4 w-4 shrink-0 text-[#7D8488]" />
                <p className="font-nunito text-xs font-medium leading-4 text-[#263238]">
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
