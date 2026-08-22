import { Search } from 'lucide-react';

export function ActivityHistoryFilters() {
  return (
    <div className="flex flex-col gap-6 rounded-[16px] border border-[#E8EBE8] bg-white p-4 shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.1)] sm:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex w-full max-w-110.5 items-center gap-1.75 rounded-[12px] border border-[#D8DDD9] bg-white px-5 py-4 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
          <Search className="h-5 w-5 text-[#D8DDD9]" />
          <input
            type="text"
            placeholder="Search activities"
            className="w-full bg-transparent font-nunito text-[14px] font-medium leading-5 tracking-[-0.006em] text-[#7D8488] outline-none placeholder:text-[#7D8488]"
          />
        </div>

        <div className="flex w-full items-center gap-3 overflow-x-auto rounded-[12px] border border-[#E8EBE8] bg-[#EFEFEF] px-3 py-2 md:w-auto md:gap-9.5 md:overflow-visible">
          <button
            type="button"
            className="flex items-center justify-center rounded-full bg-[#2F7D7E] px-3 py-2 font-nunito text-[14px] font-medium leading-5 tracking-[-0.006em] text-white"
          >
            Current Week
          </button>
          <button
            type="button"
            className="flex items-center justify-center rounded-full px-3 py-2 font-nunito text-[14px] font-medium leading-5 tracking-[-0.006em] text-[#515B60] transition-colors hover:bg-white"
          >
            Last Month
          </button>
          <button
            type="button"
            className="flex items-center justify-center rounded-full px-3 py-2 font-nunito text-[14px] font-medium leading-5 tracking-[-0.006em] text-[#515B60] transition-colors hover:bg-white"
          >
            All time
          </button>
        </div>
      </div>

      <div className="h-px w-full bg-[#E8EBE8]" />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <span className="shrink-0 font-nunito text-[12px] font-medium leading-4 text-[#7D8488]">
          Category:
        </span>
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            className="flex items-center gap-1 rounded-[12px] bg-[#2F7D7E] px-2 py-1.5 font-nunito text-[12px] font-medium leading-4 text-white"
          >
            All
          </button>
          {['Fine Motor', 'Gross Motor', 'Sensory', 'Communication', 'Self-Care'].map((cat) => (
            <button
              key={cat}
              type="button"
              className="flex items-center gap-1 rounded-[12px] border border-[#D4D6D7] bg-[#EFEFEF] px-2 py-1.5 font-nunito text-[12px] font-medium leading-4 text-[#515B60] transition-colors hover:bg-[#e0e0e0]"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
