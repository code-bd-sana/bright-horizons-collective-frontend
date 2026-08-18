import { Check } from 'lucide-react';

export function WeeklyGoalStats() {
  return (
    <div className="grid gap-6 min-[1200px]:grid-cols-[1.5fr_1fr_1fr_1fr]">
      {/* Goal Card */}
      <section className="flex flex-col justify-between rounded-2xl bg-[#fce9e3] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
        <div>
          <p className="font-nunito text-xs font-medium leading-4 text-[#2f7d7e]">Weekly Goal</p>
          <h2 className="mt-1 font-nunito text-lg font-medium leading-6 tracking-[-0.27px] text-[#263238]">
            Improve bilateral coordination and motor planning
          </h2>
        </div>
        <div className="mt-6">
          <div className="flex items-center justify-between font-nunito text-xs font-medium leading-4">
            <span className="text-[#263238]">2 of 7 complete</span>
            <span className="text-[#2f7d7e]">28%</span>
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/60">
            <span className="block h-full w-[28%] bg-[#2f7d7e]" />
          </div>
        </div>
      </section>

      {/* Days Completed Card */}
      <section className="flex items-center gap-4 rounded-2xl border border-[#e8ebe8] bg-[#fffdf8] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#e0f0e9]">
          <Check aria-hidden="true" className="size-5 text-[#2f7d7e] stroke-[2.5]" />
        </span>
        <div>
          <p className="font-nunito text-2xl font-medium leading-8 text-[#263238]">2</p>
          <p className="font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#515b60]">
            Days Completed
          </p>
        </div>
      </section>

      {/* Remaining Card */}
      <section className="flex items-center gap-4 rounded-2xl border border-[#e8ebe8] bg-[#fffdf8] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#fff4e5]">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 4.16667V10L14.1667 12.5M18.3333 10C18.3333 14.6024 14.6024 18.3333 10 18.3333C5.39763 18.3333 1.66667 14.6024 1.66667 10C1.66667 5.39763 5.39763 1.66667 10 1.66667C14.6024 1.66667 18.3333 5.39763 18.3333 10Z"
              stroke="#D97706"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <div>
          <p className="font-nunito text-2xl font-medium leading-8 text-[#263238]">5</p>
          <p className="font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#515b60]">
            Remaining
          </p>
        </div>
      </section>

      {/* Progress Ring Card */}
      <section className="flex items-center gap-4 rounded-2xl border border-[#e8ebe8] bg-[#fffdf8] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
        <div className="relative size-12 shrink-0">
          <svg
            className="size-full -rotate-90"
            viewBox="0 0 36 36"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              className="stroke-[#eaecee]"
              strokeWidth="3"
            ></circle>
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              className="stroke-[#2f7d7e]"
              strokeWidth="3"
              strokeDasharray="100"
              strokeDashoffset="72"
              strokeLinecap="round"
            ></circle>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-nunito text-[10px] font-bold text-[#2f7d7e]">28%</span>
          </div>
        </div>
        <div>
          <p className="font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#515b60]">
            Progress
          </p>
        </div>
      </section>
    </div>
  );
}
