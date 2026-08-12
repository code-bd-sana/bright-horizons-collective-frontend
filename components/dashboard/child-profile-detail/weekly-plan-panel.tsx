import Image from 'next/image';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function WeeklyPlanPanel() {
  return (
    <section className="flex flex-col gap-6 rounded-2xl border border-[#e8ebe8] bg-[#fffdf8] p-8 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <p className="font-nunito text-xs font-medium leading-4 text-[#2f7d7e]">
              Week 3 · July 20–26
            </p>
            <h2 className="font-nunito text-2xl font-medium leading-8 text-[#263238]">
              This Week&apos;s Plan
            </h2>
          </div>
          <div className="rounded-xl bg-[#fce9e3] px-3 py-2">
            <p className="font-nunito text-xs font-medium leading-4 text-[#515b60]">Weekly Focus</p>
            <p className="mt-1 font-nunito text-lg font-medium leading-6 tracking-[-0.27px] text-[#493630]">
              Bilateral Coordination &amp; Motor Planning
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-nunito text-xs font-medium leading-4 text-[#2f7d7e]">
            Daily activities
          </p>
          <div className="flex items-center justify-between">
            {days.map((day, index) => {
              const complete = index < 2;
              const current = index === 2;
              return (
                <div key={day} className="flex w-7.5 flex-col items-center gap-1">
                  <span
                    className={`flex size-7.5 items-center justify-center rounded-full border-2 ${complete || current ? 'border-[#2f7d7e] bg-[#2f7d7e]' : 'border-[#d4d6d7] bg-[#d4d6d7]'}`}
                  >
                    {complete ? (
                      <Image
                        src="/Home/figma-child-plan-check.svg"
                        alt="Complete"
                        width={20}
                        height={20}
                      />
                    ) : (
                      <span
                        className={`size-2.5 rounded-full ${current ? 'bg-white' : 'bg-white'}`}
                      />
                    )}
                  </span>
                  <span
                    className={`font-manrope text-xs font-medium leading-4.5 tracking-[0.48px] ${complete || current ? 'text-[#2f7d7e]' : 'text-[#7d8488]'}`}
                  >
                    {day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between font-nunito text-xs font-medium leading-4">
          <span className="text-[#263238]">2 of 7 complete</span>
          <span className="text-[#2f7d7e]">28%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-[#eaecee]">
          <div className="h-full w-[28%] bg-[#2f7d7e]" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 font-nunito text-center">
        <div className="rounded-2xl bg-[#fafafa] px-4 py-3">
          <p className="text-2xl font-medium leading-8 text-[#263238]">5</p>
          <p className="mt-1 text-xs font-medium leading-4 text-[#7d8488]">Remaining</p>
        </div>
        <div className="rounded-2xl bg-[#fafafa] px-4 py-3">
          <p className="text-2xl font-medium leading-8 text-[#2f7d7e]">2</p>
          <p className="mt-1 text-xs font-medium leading-4 text-[#7d8488]">Completed</p>
        </div>
      </div>
      <button
        type="button"
        className="relative flex h-10 w-full items-center justify-center gap-1 overflow-hidden rounded-full border border-[#d8ddd9] bg-[#2f7d7e] px-3 py-2 font-nunito text-sm font-medium leading-6 tracking-[-0.176px] text-white"
      >
        <span className="relative">Continue Weekly Plan</span>
        <Image
          className="relative"
          src="/Home/figma-child-plan-arrow.svg"
          alt=""
          width={16}
          height={16}
        />
        <span className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_-6px_2px_rgba(255,255,255,0.07)]" />
      </button>
    </section>
  );
}
