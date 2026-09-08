import { Check, Clock3 } from 'lucide-react';

export function WeeklyGoalStats() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-[minmax(280px,2fr)_repeat(3,minmax(0,1fr))] xl:gap-6 min-[1920px]:grid-cols-[597px_287px_286px_287px]">
      {/* Goal Card */}
      <section className="col-span-2 flex min-h-37 flex-col justify-between rounded-2xl bg-[#fce9e3] p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:p-6 md:col-span-3 xl:col-span-1 xl:min-h-38.5">
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
      <section className="flex min-h-28 flex-col items-start justify-center gap-3 rounded-2xl border border-[#e8ebe8] bg-[#fffdf8] p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:min-h-31 sm:flex-row sm:items-center sm:justify-start xl:min-h-38.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-full border border-[#dcfce7] bg-[#f0fdf4]">
          <Check aria-hidden="true" className="size-4 text-[#2f7d7e] stroke-[2.5]" />
        </span>
        <div>
          <p className="font-nunito text-xl font-medium leading-7 text-[#263238] sm:text-2xl sm:leading-8">
            2
          </p>
          <p className="font-manrope text-xs leading-4.5 text-[#515b60] sm:text-sm sm:leading-5.5 sm:tracking-[-0.084px]">
            Days Completed
          </p>
        </div>
      </section>

      {/* Remaining Card */}
      <section className="flex min-h-28 flex-col items-start justify-center gap-3 rounded-2xl border border-[#e8ebe8] bg-[#fffdf8] p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:min-h-31 sm:flex-row sm:items-center sm:justify-start xl:min-h-38.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-full border border-[#fef9c3] bg-[#fefce8]">
          <Clock3 aria-hidden="true" className="size-4 text-[#d97706] stroke-[1.75]" />
        </span>
        <div>
          <p className="font-nunito text-xl font-medium leading-7 text-[#263238] sm:text-2xl sm:leading-8">
            5
          </p>
          <p className="font-manrope text-xs leading-4.5 text-[#515b60] sm:text-sm sm:leading-5.5 sm:tracking-[-0.084px]">
            Remaining
          </p>
        </div>
      </section>

      {/* Progress Ring Card */}
      <section className="col-span-2 flex min-h-22 items-center justify-center gap-3 rounded-2xl border border-[#e8ebe8] bg-[#fffdf8] p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] md:col-span-1 md:min-h-31 md:justify-start xl:min-h-38.5">
        <div className="grid size-10 shrink-0 place-items-center rounded-full bg-[conic-gradient(#2f7d7e_0deg_101deg,#e8ebe8_101deg_360deg)]">
          <div className="grid size-7 place-items-center rounded-full bg-[#fffdf8]">
            <span className="font-nunito text-[10px] font-bold text-[#2f7d7e]">28%</span>
          </div>
        </div>
        <div>
          <p className="font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#515b60]">
            Progress
          </p>
        </div>
      </section>
    </div>
  );
}
