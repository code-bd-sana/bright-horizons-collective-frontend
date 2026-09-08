import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CalendarDays, Check, Download } from 'lucide-react';

const maskImage = '/Home/figma-weekly-plans-history-mask.svg';

const pastPlans = [
  {
    week: 'Week 1',
    status: 'Completed',
    title: 'Sensory Exploration',
    dateRange: 'Jun 29 – Jul 5',
    image: '/Home/figma-weekly-plans-history.png',
    categories: ['Sensory Processing', 'Body Awareness', 'Self-Regulation'],
    days: [true, true, true, true, true, true, true],
    progress: 100,
    daysCompleteText: '7/7 days',
    feedback: 'Emma completed every activity! She especially loved the sensory bin.',
  },
  {
    week: 'Week 2',
    status: 'Completed',
    title: 'Sensory Exploration',
    dateRange: 'Jun 29 – Jul 5',
    image: '/Home/figma-weekly-plans-history.png',
    categories: ['Sensory Processing', 'Body Awareness', 'Self-Regulation'],
    days: [true, true, false, true, false, true, true],
    progress: 80,
    daysCompleteText: '7/7 days', // Figma mockup says 7/7 days for both even if 80%, keeping it literal
    feedback: 'Emma completed every activity! She especially loved the sensory bin.',
  },
];

export function PastWeeklyPlans() {
  return (
    <section className="flex w-full min-w-0 flex-col items-start gap-5 rounded-2xl border border-[#e8ebe8] bg-[#fffdf8] p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:gap-6 sm:p-6 min-[1800px]:p-8">
      <div className="flex w-full items-start justify-between">
        <h2 className="font-nunito text-xl font-medium leading-7 text-[#263238] sm:text-2xl sm:leading-8">
          Weekly Plans
        </h2>
        <Link
          href="/dashboard/weekly-plans/history"
          className="flex min-w-16 items-center justify-center overflow-hidden rounded-full border border-[#d8ddd9] px-2 py-1.5 transition-colors hover:bg-[#f6fbfa]"
        >
          <span className="px-1 font-nunito text-[16px] font-medium leading-6 tracking-[-0.176px] text-[#2f7d7e]">
            View all
          </span>
        </Link>
      </div>

      <div className="flex w-full flex-col items-start gap-4">
        {pastPlans.map((plan, index) => (
          <article
            key={index}
            className="grid w-full min-w-0 gap-4 rounded-2xl border border-[#e9f1ee] bg-transparent p-4 md:grid-cols-[150px_minmax(0,1fr)] md:gap-5 min-[1800px]:grid-cols-[171px_minmax(0,1fr)_122px]"
          >
            <div className="contents">
              {/* Left Image */}
              <div className="relative mx-auto h-41 w-42.75 max-w-full shrink-0 md:mx-0 md:w-37.5 min-[1800px]:w-42.75">
                <div
                  className="absolute -left-2.25 top-[-79.5px] h-[319.06px] w-[187.887px]"
                  style={{
                    WebkitMaskImage: `url(${maskImage})`,
                    maskImage: `url(${maskImage})`,
                    WebkitMaskPosition: '11.313px 83.244px',
                    maskPosition: '11.313px 83.244px',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskSize: '166.132px 163.068px',
                    maskSize: '166.132px 163.068px',
                  }}
                >
                  <Image src={plan.image} alt="" fill sizes="187.887px" className="object-cover" />
                </div>
              </div>

              {/* Center Content */}
              <div className="flex min-w-0 flex-col items-start gap-5 min-[1800px]:gap-6">
                <div className="flex min-w-0 flex-col items-start gap-2">
                  <div className="flex w-full shrink-0 items-center gap-2.5">
                    <div
                      className="flex shrink-0 flex-col items-start rounded-[8px] px-2.5 py-0.75"
                      style={{
                        backgroundImage:
                          'linear-gradient(160.46deg, rgb(26, 74, 76) 0%, rgb(47, 125, 126) 100%)',
                      }}
                    >
                      <span className="font-nunito text-[12px] font-medium leading-4 text-white">
                        {plan.week}
                      </span>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.25 rounded-full bg-[#e0f0e9] px-2.5 py-0.75">
                      <div className="h-1.25 w-1.25 shrink-0 rounded-[2.5px] bg-[#8fb9a8]" />
                      <span className="font-nunito text-[12px] font-medium leading-4 text-[#8fb9a8]">
                        Completed
                      </span>
                    </div>
                  </div>
                  <div className="flex w-full shrink-0 flex-col items-start gap-1">
                    <h3 className="w-min min-w-full font-nunito text-[18px] font-medium leading-6 tracking-[-0.27px] text-[#263238]">
                      {plan.title}
                    </h3>
                    <div className="flex shrink-0 items-center gap-1">
                      <CalendarDays
                        aria-hidden="true"
                        className="size-3.5 stroke-[1.25] text-[#607077]"
                      />
                      <p className="font-manrope text-[12px] font-normal leading-4.5 text-[#607077]">
                        {plan.dateRange}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex w-full shrink-0 flex-col items-start gap-2">
                  <div className="flex w-full shrink-0 flex-wrap items-center gap-2">
                    {plan.categories.map((category) => (
                      <div
                        key={category}
                        className="flex shrink-0 flex-col items-start justify-center rounded-full bg-[#f0f2f3] px-2 py-1"
                      >
                        <span className="font-manrope text-[12px] font-normal leading-4.5 text-[#263238]">
                          {category}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex shrink-0 items-center gap-1">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => {
                      const isComplete = plan.days[i];
                      return (
                        <div key={i} className="flex shrink-0 flex-col items-center gap-0.75">
                          <div
                            className={`flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-[11px] ${
                              isComplete ? 'bg-[#8fb9a8]' : 'bg-[#d4d6d7]'
                            }`}
                          >
                            {isComplete && (
                              <Check
                                aria-hidden="true"
                                className="size-2.75 stroke-[1.5] text-white"
                              />
                            )}
                          </div>
                          <span className="font-manrope text-[8px] font-semibold leading-3 text-[#8fb9a8]">
                            {day}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex shrink-0 flex-col items-start justify-center rounded-full">
                    <p className="font-manrope text-[12px] font-normal leading-4.5 text-[#515b60]">
                      &quot;{plan.feedback}&quot;
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Actions & Progress */}
            <div className="col-span-full flex w-full min-w-0 items-center justify-between gap-4 md:grid md:grid-cols-[150px_minmax(0,1fr)] md:gap-5 min-[1800px]:col-span-1 min-[1800px]:flex min-[1800px]:w-30.5 min-[1800px]:flex-col min-[1800px]:gap-6">
              <div className="flex shrink-0 flex-col items-center gap-1">
                <div
                  className="grid h-13 w-13 shrink-0 place-items-center rounded-full"
                  style={{ background: `conic-gradient(#8fb9a8 ${plan.progress}%, #eaecee 0)` }}
                >
                  <div className="grid size-11 place-items-center rounded-full bg-[#fffdf8]">
                    <span className="font-nunito text-[12px] font-medium leading-4 text-[#8fb9a8]">
                      {plan.progress}%
                    </span>
                  </div>
                </div>
                <p className="font-manrope text-[12px] font-normal leading-4.5 text-[#515b60]">
                  {plan.daysCompleteText}
                </p>
              </div>

              <div className="flex w-30.5 shrink-0 flex-col items-start gap-2">
                <button
                  type="button"
                  className="flex min-h-10 w-full items-center justify-center gap-1.5 rounded-[10px] bg-[#2f7d7e] px-3.5 py-2 transition-colors hover:bg-[#235d5d]"
                >
                  <ArrowRight className="h-3 w-3 text-white" />
                  <span className="whitespace-nowrap text-center font-nunito text-[14px] font-medium leading-5 tracking-[-0.084px] text-white">
                    View Plan
                  </span>
                </button>
                <button
                  type="button"
                  className="flex min-h-10 w-full items-center justify-center gap-1.5 rounded-[10px] border border-[#d8ddd9] px-3.75 py-2 transition-colors hover:bg-[#f6fbfa]"
                >
                  <Download className="h-3 w-3 text-[#515b60]" />
                  <span className="whitespace-nowrap text-center font-nunito text-[14px] font-medium leading-5 tracking-[-0.084px] text-[#515b60]">
                    PDF Report
                  </span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
