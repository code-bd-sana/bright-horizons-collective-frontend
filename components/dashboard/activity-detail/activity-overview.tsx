export function ActivityOverview() {
  return (
    <div className="flex w-full flex-col gap-8 lg:gap-12">
      <div className="flex w-full max-w-[720px] flex-col gap-6 lg:gap-8">
        {/* Title and Description */}
        <div className="flex flex-col gap-[12px] w-full">
          <div className="flex flex-col gap-[4px]">
            <p className="font-['Nunito'] font-medium text-[12px] leading-[16px] text-[#2f7d7e]">
              Mon, Jul 20
            </p>
            <h1 className="font-['Nunito'] font-medium text-[32px] leading-[40px] text-[#263238] tracking-[-0.16px]">
              Animal Yoga Adventure
            </h1>
          </div>
          <p className="font-['Manrope'] font-normal text-[14px] leading-[22px] text-[color:var(--text-primary\/400,#515b60)] tracking-[-0.084px] max-w-[584px]">
            Move through fun animal poses to build balance and whole-body motor planning. Perfect
            for an energetic start to the week.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:flex lg:flex-wrap lg:items-center lg:gap-8">
          <div className="flex flex-col gap-0 min-w-[72px]">
            <p className="font-['Nunito'] font-medium text-[12px] leading-[16px] text-[color:var(--text-primary\/300,#7d8488)] uppercase">
              Duration
            </p>
            <p className="font-['Manrope'] font-normal text-[16px] leading-[24px] text-[color:var(--text-primary\/500,#263238)] tracking-[-0.176px]">
              20 min
            </p>
          </div>

          <div className="flex flex-col gap-0">
            <p className="font-['Nunito'] font-medium text-[12px] leading-[16px] text-[color:var(--text-primary\/300,#7d8488)] uppercase">
              Materials
            </p>
            <p className="font-['Manrope'] font-normal text-[16px] leading-[24px] text-[color:var(--text-primary\/500,#263238)] tracking-[-0.176px]">
              Yoga cards & open space
            </p>
          </div>

          <div className="flex flex-col gap-0">
            <p className="font-['Nunito'] font-medium text-[12px] leading-[16px] text-[color:var(--text-primary\/300,#7d8488)] uppercase">
              Development Goal
            </p>
            <p className="font-['Manrope'] font-normal text-[16px] leading-[24px] text-[color:var(--text-primary\/500,#263238)] tracking-[-0.176px]">
              Motor planning & balance
            </p>
          </div>

          <div className="flex flex-col gap-0">
            <p className="font-['Nunito'] font-medium text-[12px] leading-[16px] text-[color:var(--text-primary\/300,#7d8488)] uppercase">
              OT Designed
            </p>
            <p className="font-['Manrope'] font-normal text-[16px] leading-[24px] text-[color:var(--text-primary\/500,#263238)] tracking-[-0.176px]">
              Therapist-approved
            </p>
          </div>
        </div>
      </div>

      {/* Learning Objective */}
      <div className="flex w-full max-w-[495px] flex-col gap-3">
        <h2 className="font-['Nunito'] font-medium text-[20px] leading-[28px] text-[#263238]">
          Learning Objective
        </h2>
        <p className="font-['Manrope'] font-normal text-[14px] leading-[22px] text-[color:var(--text-primary\/400,#515b60)] tracking-[-0.084px]">
          Emma will move through at least 5 animal-themed yoga poses, holding each for 3–5 seconds,
          building postural control and spatial body awareness.
        </p>
      </div>
    </div>
  );
}
