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
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {reports.map((report) => (
        <div
          key={report.id}
          className="flex flex-col gap-5 rounded-[16px] border border-[#E9F1EE] bg-white p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]"
        >
          {/* Header */}
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex flex-col gap-2">
              <h3 className="font-nunito text-[20px] font-medium leading-7 text-[#263238]">
                {report.month}
              </h3>
              <span className="font-manrope text-[12px] font-normal leading-4 text-[#7D8488]">
                {childName} • {report.ageStr}
              </span>
            </div>
            <div className="flex items-center">
              <span className="font-manrope text-[14px] font-normal leading-5.5 tracking-[-0.006em] text-[#7D8488]">
                {report.dateRange}
              </span>
            </div>
          </div>

          {/* Stats Box */}
          <div className="flex flex-col gap-2 rounded-[8px] bg-[#D5E5E5] p-[16px_8px]">
            <div className="flex flex-row items-center gap-4">
              <div className="flex flex-col gap-1 rounded-[8px] bg-[#E9F1EE] px-4 py-2">
                <span className="font-nunito text-[24px] font-medium leading-8 text-[#2F7D7E]">
                  {report.activitiesCount}
                </span>
                <span className="font-manrope text-[12px] font-normal leading-4.5 text-[#3C4947]">
                  ACTIVITIES
                </span>
              </div>
              <div className="flex flex-col gap-1 rounded-[8px] bg-[#E9F1EE] px-4 py-2">
                <span className="font-nunito text-[24px] font-medium leading-8 text-[#2F7D7E]">
                  {report.weeklyPlansCount}
                </span>
                <span className="font-manrope text-[12px] font-normal leading-4.5 text-[#3C4947]">
                  WEEKLY PLANS
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="font-manrope text-[12px] font-normal leading-4 text-[#7D8488]">
            {report.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col items-center justify-start gap-4 sm:flex-row">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-[32px] border border-[#D5E5E5] bg-[#2F7D7E] px-4 py-2 transition-opacity hover:opacity-90 sm:w-auto"
            >
              <Download className="h-5 w-5 text-white" />
              <span className="font-nunito text-[16px] font-medium leading-6 tracking-[-0.011em] text-white">
                Download PDF
              </span>
            </button>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2.5 rounded-[32px] border border-[#D4D6D7] bg-white px-4 py-2 transition-colors hover:bg-gray-50 sm:w-auto"
            >
              <span className="font-nunito text-[16px] font-medium leading-6 tracking-[-0.011em] text-[#14094B]">
                View Full Report
              </span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
