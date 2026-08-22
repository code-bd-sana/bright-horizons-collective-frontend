import { Check, Clock3 } from 'lucide-react';

export function WeeklyGoalStats() {
  return (
    <div className="grid gap-4 sm:max-lg:grid-cols-2 sm:gap-6 min-[1200px]:grid-cols-[597px_287px_286px_287px] min-[1200px]:gap-6">
      {/* Goal Card */}
      <section className="flex min-h-[154px] flex-col justify-between rounded-2xl bg-[#fce9e3] p-4 sm:p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
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
      <section className="flex min-h-[154px] items-center gap-4 rounded-2xl border border-[#e8ebe8] bg-[#fffdf8] p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
        <span className="grid size-8 shrink-0 place-items-center rounded-full border border-[#dcfce7] bg-[#f0fdf4]">
          <Check aria-hidden="true" className="size-4 text-[#2f7d7e] stroke-[2.5]" />
        </span>
        <div>
          <p className="font-nunito text-2xl font-medium leading-8 text-[#263238]">2</p>
          <p className="font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#515b60]">
            Days Completed
          </p>
        </div>
      </section>

      {/* Remaining Card */}
      <section className="flex min-h-[154px] items-center gap-4 rounded-2xl border border-[#e8ebe8] bg-[#fffdf8] p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
        <span className="grid size-8 shrink-0 place-items-center rounded-full border border-[#fef9c3] bg-[#fefce8]">
          <Clock3 aria-hidden="true" className="size-4 text-[#d97706] stroke-[1.75]" />
        </span>
        <div>
          <p className="font-nunito text-2xl font-medium leading-8 text-[#263238]">5</p>
          <p className="font-manrope text-sm leading-[22px] tracking-[-0.084px] text-[#515b60]">
            Remaining
          </p>
        </div>
      </section>

      {/* Progress Ring Card */}
      <section className="flex min-h-[154px] items-center gap-4 rounded-2xl border border-[#e8ebe8] bg-[#fffdf8] p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
        <div className="grid size-8 shrink-0 place-items-center rounded-full bg-[conic-gradient(#2f7d7e_0deg_101deg,#e8ebe8_101deg_360deg)]">
          <div className="grid size-6 place-items-center rounded-full bg-[#fffdf8]">
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
