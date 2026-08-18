import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';

const maskImage = '/Home/figma-parent-dashboard-star-mask.svg';

const pastPlans = [
  {
    week: 'Week 1',
    status: 'Completed',
    title: 'Sensory Exploration',
    dateRange: 'Jun 29 – Jul 5',
    image: '/Home/figma-parent-dashboard-yoga.png',
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
    image: '/Home/figma-parent-dashboard-yoga.png',
    categories: ['Sensory Processing', 'Body Awareness', 'Self-Regulation'],
    days: [true, true, false, true, false, true, true],
    progress: 80,
    daysCompleteText: '7/7 days', // Figma mockup says 7/7 days for both even if 80%, keeping it literal
    feedback: 'Emma completed every activity! She especially loved the sensory bin.',
  },
];

export function PastWeeklyPlans() {
  return (
    <section className="mt-[24px] flex w-full flex-col items-start gap-[24px] rounded-[16px] border border-[#e8ebe8] p-[32px] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <div className="flex w-full items-start justify-between">
        <h2 className="font-nunito text-[24px] font-medium leading-[32px] text-[#263238]">
          Weekly Plans
        </h2>
        <Link
          href="/dashboard/weekly-plans/history"
          className="flex min-w-[64px] items-center justify-center overflow-hidden rounded-full border border-[#d8ddd9] px-[8px] py-[6px] transition-colors hover:bg-[#f6fbfa]"
        >
          <span className="px-[4px] font-nunito text-[16px] font-medium leading-[24px] tracking-[-0.176px] text-[#2f7d7e]">
            View all
          </span>
        </Link>
      </div>

      <div className="flex w-full flex-col items-start gap-[16px]">
        {pastPlans.map((plan, index) => (
          <article
            key={index}
            className="flex w-full items-start justify-between rounded-[16px] border border-[#e9f1ee] bg-transparent p-[16px]"
          >
            <div className="flex shrink-0 items-center gap-[20px]">
              {/* Left Image */}
              <div className="relative h-[164px] w-[171px] shrink-0">
                <div className="absolute -left-[6px] -top-[3px] h-full w-full">
                  <div
                    className="absolute -left-[9px] -top-[79.5px] h-[319px] w-[187px]"
                    style={{
                      WebkitMaskImage: `url(${maskImage})`,
                      maskImage: `url(${maskImage})`,
                      WebkitMaskPosition: 'center',
                      maskPosition: 'center',
                      WebkitMaskRepeat: 'no-repeat',
                      maskRepeat: 'no-repeat',
                      WebkitMaskSize: '166px 163px',
                      maskSize: '166px 163px',
                    }}
                  >
                    <Image src={plan.image} alt="" fill sizes="187px" className="object-cover" />
                  </div>
                </div>
              </div>

              {/* Center Content */}
              <div className="flex shrink-0 flex-col items-start gap-[24px]">
                <div className="flex w-[162px] shrink-0 flex-col items-start gap-[8px]">
                  <div className="flex w-full shrink-0 items-center gap-[10px]">
                    <div
                      className="flex shrink-0 flex-col items-start rounded-[8px] px-[10px] py-[3px]"
                      style={{
                        backgroundImage:
                          'linear-gradient(160.46deg, rgb(26, 74, 76) 0%, rgb(47, 125, 126) 100%)',
                      }}
                    >
                      <span className="font-nunito text-[12px] font-medium leading-[16px] text-white">
                        {plan.week}
                      </span>
                    </div>
                    <div className="flex shrink-0 items-center gap-[5px] rounded-full bg-[#e0f0e9] px-[10px] py-[3px]">
                      <div className="h-[5px] w-[5px] shrink-0 rounded-[2.5px] bg-[#8fb9a8]" />
                      <span className="font-nunito text-[12px] font-medium leading-[16px] text-[#8fb9a8]">
                        Completed
                      </span>
                    </div>
                  </div>
                  <div className="flex w-full shrink-0 flex-col items-start gap-[4px]">
                    <h3 className="w-min min-w-full font-nunito text-[18px] font-medium leading-[24px] tracking-[-0.27px] text-[#263238]">
                      {plan.title}
                    </h3>
                    <div className="flex shrink-0 items-center gap-[4px]">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.6667 2.33333H2.33333C1.689 2.33333 1.16667 2.85567 1.16667 3.5V11.6667C1.16667 12.311 1.689 12.8333 2.33333 12.8333H11.6667C12.311 12.8333 12.8333 12.311 12.8333 11.6667V3.5C12.8333 2.85567 12.311 2.33333 11.6667 2.33333Z"
                          stroke="#607077"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.33333 1.16667V3.5"
                          stroke="#607077"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4.66667 1.16667V3.5"
                          stroke="#607077"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M1.16667 5.83333H12.8333"
                          stroke="#607077"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="font-manrope text-[12px] font-normal leading-[18px] text-[#607077]">
                        {plan.dateRange}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex w-full shrink-0 flex-col items-start gap-[8px]">
                  <div className="flex w-full shrink-0 items-center gap-[8px]">
                    {plan.categories.map((category) => (
                      <div
                        key={category}
                        className="flex shrink-0 flex-col items-start justify-center rounded-full bg-[#f0f2f3] px-[8px] py-[4px]"
                      >
                        <span className="font-manrope text-[12px] font-normal leading-[18px] text-[#263238]">
                          {category}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex shrink-0 items-center gap-[4px]">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => {
                      const isComplete = plan.days[i];
                      return (
                        <div key={i} className="flex shrink-0 flex-col items-center gap-[3px]">
                          <div
                            className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[11px] ${
                              isComplete ? 'bg-[#8fb9a8]' : 'bg-[#d4d6d7]'
                            }`}
                          >
                            {isComplete && (
                              <svg
                                width="11"
                                height="11"
                                viewBox="0 0 11 11"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9.16667 2.75L4.125 7.79167L1.83333 5.5"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </div>
                          <span className="font-manrope text-[8px] font-semibold leading-[12px] text-[#8fb9a8]">
                            {day}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex shrink-0 flex-col items-start justify-center rounded-full">
                    <p className="font-manrope text-[12px] font-normal leading-[18px] text-[#515b60]">
                      &quot;{plan.feedback}&quot;
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Actions & Progress */}
            <div className="flex w-[122px] shrink-0 flex-col items-center gap-[24px]">
              <div className="flex shrink-0 flex-col items-center gap-[4px]">
                <div className="relative h-[52px] w-[52px] shrink-0">
                  <svg
                    className="h-full w-full -rotate-90"
                    viewBox="0 0 52 52"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="26"
                      cy="26"
                      r="24"
                      fill="none"
                      className="stroke-[#eaecee]"
                      strokeWidth="4"
                    ></circle>
                    <circle
                      cx="26"
                      cy="26"
                      r="24"
                      fill="none"
                      className="stroke-[#8fb9a8]"
                      strokeWidth="4"
                      strokeDasharray="150"
                      strokeDashoffset={150 - (150 * plan.progress) / 100}
                      strokeLinecap="round"
                    ></circle>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-nunito text-[12px] font-medium leading-[16px] text-[#8fb9a8]">
                      {plan.progress}%
                    </span>
                  </div>
                </div>
                <p className="font-manrope text-[12px] font-normal leading-[18px] text-[#515b60]">
                  {plan.daysCompleteText}
                </p>
              </div>

              <div className="flex w-full shrink-0 flex-col items-start gap-[8px]">
                <button
                  type="button"
                  className="flex w-full items-center gap-[6px] rounded-[10px] bg-[#2f7d7e] px-[14px] py-[8px] transition-colors hover:bg-[#235d5d]"
                >
                  <ArrowRight className="h-[12px] w-[12px] text-white" />
                  <span className="w-full text-center font-nunito text-[14px] font-medium leading-[20px] tracking-[-0.084px] text-white">
                    View Plan
                  </span>
                </button>
                <button
                  type="button"
                  className="flex w-full items-center gap-[6px] rounded-[10px] border border-[#d8ddd9] px-[15px] py-[8px] transition-colors hover:bg-[#f6fbfa]"
                >
                  <Download className="h-[12px] w-[12px] text-[#515b60]" />
                  <span className="w-full text-center font-nunito text-[14px] font-medium leading-[20px] tracking-[-0.084px] text-[#515b60]">
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
