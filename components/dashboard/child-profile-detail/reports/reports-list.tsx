import { Download } from 'lucide-react';

interface ReportsListProps {
  childName: string;
}

export function ReportsList({ childName }: ReportsListProps) {
  const reports = [
    {
      id: 1,
      month: 'June 2026',
      ageStr: '4 yrs old',
      dateRange: 'June 01 - June 30 • 18 Activities',
      activitiesCount: '24',
      weeklyPlansCount: '4',
      description: `This month, ${childName.split(' ')[0]} has shown exceptional growth in social-emotional areas and fine motor coordination. She successfully completed 24 varied activities, including the "Sensory Garden Exploration" and "Building Bridges" modules. Engagement remains consistently high across all STEM-focused weekly plans.`,
    },
    {
      id: 2,
      month: 'July 2026',
      ageStr: '4 yrs old',
      dateRange: 'July 01 - July 31 • 18 Activities',
      activitiesCount: '24',
      weeklyPlansCount: '4',
      description: `This month, ${childName.split(' ')[0]} has shown exceptional growth in social-emotional areas and fine motor coordination. She successfully completed 24 varied activities, including the "Sensory Garden Exploration" and "Building Bridges" modules. Engagement remains consistently high across all STEM-focused weekly plans.`,
    },
  ];

  return (
    <div className="grid min-w-0 grid-cols-1 gap-6 2xl:grid-cols-2">
      {reports.map((report) => (
        <div
          key={report.id}
          className="flex min-w-0 flex-col gap-5 rounded-2xl border border-[#E9F1EE] bg-white p-4 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] sm:p-5"
        >
          {/* Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex flex-col gap-2">
              <h3 className="font-nunito text-xl font-medium leading-7 text-[#263238]">
                {report.month}
              </h3>
              <span className="font-manrope text-xs font-normal leading-4 text-[#7D8488]">
                {childName} • {report.ageStr}
              </span>
            </div>
            <div className="flex items-center">
              <span className="font-manrope text-sm font-normal leading-5.5 tracking-[-0.006em] text-[#7D8488]">
                {report.dateRange}
              </span>
            </div>
          </div>

          {/* Stats Box */}
          <div className="flex flex-col gap-2 rounded-lg bg-[#D5E5E5] px-2 py-4">
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <div className="flex min-w-0 flex-col gap-1 rounded-lg bg-[#E9F1EE] px-3 py-2 sm:px-4">
                <span className="font-nunito text-2xl font-medium leading-8 text-[#2F7D7E]">
                  {report.activitiesCount}
                </span>
                <span className="font-manrope text-xs font-normal leading-4.5 text-[#3C4947]">
                  ACTIVITIES
                </span>
              </div>
              <div className="flex min-w-0 flex-col gap-1 rounded-lg bg-[#E9F1EE] px-3 py-2 sm:px-4">
                <span className="font-nunito text-2xl font-medium leading-8 text-[#2F7D7E]">
                  {report.weeklyPlansCount}
                </span>
                <span className="font-manrope text-xs font-normal leading-4.5 text-[#3C4947]">
                  WEEKLY PLANS
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="font-manrope text-xs font-normal leading-4 text-[#7D8488]">
            {report.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col items-center justify-start gap-4 sm:flex-row">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-[#D5E5E5] bg-[#2F7D7E] px-4 py-2 transition-opacity hover:opacity-90 sm:w-auto"
            >
              <Download className="size-5 text-white" />
              <span className="font-nunito text-base font-medium leading-6 tracking-[-0.011em] text-white">
                Download PDF
              </span>
            </button>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2.5 rounded-full border border-[#D4D6D7] bg-white px-4 py-2 transition-colors hover:bg-gray-50 sm:w-auto"
            >
              <span className="font-nunito text-base font-medium leading-6 tracking-[-0.011em] text-[#14094B]">
                View Full Report
              </span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
