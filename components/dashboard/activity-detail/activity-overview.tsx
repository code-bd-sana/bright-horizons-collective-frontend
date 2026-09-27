interface ActivityOverviewProps {
  scheduledDay?: string | null;
  title: string;
  description?: string | null;
  duration?: string | null;
  materials?: string | null;
  developmentGoal?: string | null;
  isOtDesigned?: boolean;
  learningObjective?: string | null;
  childName?: string | null;
}

export function ActivityOverview({
  scheduledDay,
  title,
  description,
  duration = '20 min',
  materials = 'Household materials',
  developmentGoal = 'Motor planning & balance',
  isOtDesigned = true,
  learningObjective,
  childName,
}: ActivityOverviewProps) {
  // Format learning objective, substituting child name if helpful
  const effectiveObjective =
    learningObjective ||
    `${childName || 'Your child'} will engage in purposeful movement to build motor coordination, posture, and spatial body awareness.`;

  return (
    <div className="flex w-full flex-col gap-8 lg:gap-12">
      <div className="flex w-full max-w-180 flex-col gap-6 lg:gap-8">
        {/* Title and Description */}
        <div className="flex w-full flex-col gap-3">
          <div className="flex flex-col gap-1">
            {scheduledDay && (
              <p className="font-nunito text-xs font-medium leading-4 text-[#2f7d7e]">
                {scheduledDay}
              </p>
            )}
            <h1 className="font-nunito text-2xl font-medium leading-8 tracking-[-0.16px] text-[#263238] sm:text-[32px] sm:leading-10">
              {title}
            </h1>
          </div>
          {description && (
            <p className="max-w-146 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-(--text-primary\/400,#515b60)">
              {description}
            </p>
          )}
        </div>

        {/* Info Grid */}
        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 2xl:flex 2xl:flex-wrap 2xl:items-center 2xl:gap-8">
          <div className="flex min-w-18 flex-col">
            <p className="font-nunito text-xs font-medium leading-4 text-(--text-primary\/300,#7d8488) uppercase">
              Duration
            </p>
            <p className="font-manrope text-base leading-6 tracking-[-0.176px] text-(--text-primary\/500,#263238)">
              {duration}
            </p>
          </div>

          <div className="flex flex-col gap-0">
            <p className="font-nunito text-xs font-medium leading-4 text-(--text-primary\/300,#7d8488) uppercase">
              Materials
            </p>
            <p className="font-manrope text-base leading-6 tracking-[-0.176px] text-(--text-primary\/500,#263238)">
              {materials}
            </p>
          </div>

          <div className="flex flex-col gap-0">
            <p className="font-nunito text-xs font-medium leading-4 text-(--text-primary\/300,#7d8488) uppercase">
              Development Goal
            </p>
            <p className="font-manrope text-base leading-6 tracking-[-0.176px] text-(--text-primary\/500,#263238)">
              {developmentGoal}
            </p>
          </div>

          <div className="flex flex-col gap-0">
            <p className="font-nunito text-xs font-medium leading-4 text-(--text-primary\/300,#7d8488) uppercase">
              OT Designed
            </p>
            <p className="font-manrope text-base leading-6 tracking-[-0.176px] text-(--text-primary\/500,#263238)">
              {isOtDesigned ? 'Therapist-approved' : 'OT Designed'}
            </p>
          </div>
        </div>
      </div>

      {/* Learning Objective */}
      <div className="flex w-full max-w-123.75 flex-col gap-3">
        <h2 className="font-nunito text-xl font-medium leading-7 text-[#263238]">
          Learning Objective
        </h2>
        <p className="font-manrope text-sm leading-5.5 tracking-[-0.084px] text-(--text-primary\/400,#515b60)">
          {effectiveObjective}
        </p>
      </div>
    </div>
  );
}
