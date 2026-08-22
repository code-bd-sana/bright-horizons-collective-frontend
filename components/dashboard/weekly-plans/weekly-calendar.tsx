import Image from 'next/image';
import { Clock3 } from 'lucide-react';

const activityMask = '/Home/figma-parent-dashboard-activity-mask.svg';

const weeklyActivities = [
  {
    day: 'MON',
    date: 'Jul 21',
    title: 'Sensory Bin Treasure Hunt',
    duration: '20 min',
    category: 'Motor Planning & Balance',
    status: 'completed',
    image: '/Home/figma-parent-dashboard-rice-bin.png',
  },
  {
    day: 'TUE',
    date: 'Jul 21',
    title: 'Kitchen Helper Cooking',
    duration: '20 min',
    category: 'Motor Planning & Balance',
    status: 'completed',
    image: '/Home/figma-parent-dashboard-finger-painting.png',
  },
  {
    day: 'WED',
    date: 'Jul 21',
    title: 'Animal Yoga Adventure',
    duration: '20 min',
    category: 'Motor Planning & Balance',
    status: 'current',
    image: '/Home/figma-parent-dashboard-yoga.png',
  },
  {
    day: 'THU',
    date: 'Jul 21',
    title: 'Block Tower Challenge',
    duration: '20 min',
    category: 'Motor Planning & Balance',
    status: 'upcoming',
    image: '/Home/figma-parent-dashboard-water-pouring.png',
  },
  {
    day: 'FRI',
    date: 'Jul 21',
    title: 'Star Tracing & Drawing',
    duration: '20 min',
    category: 'Motor Planning & Balance',
    status: 'upcoming',
    image: '/Home/figma-parent-dashboard-rice-bin.png',
  },
  {
    day: 'SAT',
    date: 'Jul 21',
    title: 'Nature Scavenger Hunt',
    duration: '20 min',
    category: 'Motor Planning & Balance',
    status: 'upcoming',
    image: '/Home/figma-parent-dashboard-finger-painting.png',
  },
  {
    day: 'SUN',
    date: 'Jul 21',
    title: 'Calm-Down Bubble Art',
    duration: '20 min',
    category: 'Motor Planning & Balance',
    status: 'upcoming',
    image: '/Home/figma-parent-dashboard-water-pouring.png',
  },
];

interface WeeklyCalendarProps {
  title?: string;
}

export function WeeklyCalendar({ title = 'Weekly Calendar' }: WeeklyCalendarProps) {
  return (
    <div className="flex w-full flex-col items-start rounded-[16px] border border-solid border-[#e8ebe8] p-4 sm:p-6 lg:p-[32px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
      <div className="flex w-full shrink-0 flex-col items-center">
        <div className="flex w-full shrink-0 flex-col items-start">
          <div className="flex w-full shrink-0 flex-col items-start">
            <div className="flex w-full shrink-0 flex-col items-start gap-[24px]">
              <div className="flex w-full shrink-0 items-start justify-between">
                <div className="flex shrink-0 flex-col items-start gap-[4px]">
                  <p className="min-w-full shrink-0 font-nunito text-[12px] font-medium leading-[16px] text-[#2f7d7e]">
                    Week 3 · July 20 – July 26
                  </p>
                  <p className="shrink-0 whitespace-nowrap font-nunito text-[24px] font-medium leading-[32px] text-[#263238]">
                    {title}
                  </p>
                </div>
                <div className="flex w-[137px] shrink-0 flex-col items-start max-lg:hidden">
                  <p className="w-full shrink-0 font-nunito text-[12px] font-medium leading-[16px] text-[#7d8488]">
                    Tap a day to view activity
                  </p>
                </div>
              </div>

              <div className="flex w-full shrink-0 flex-col items-start gap-[20px]">
                {weeklyActivities.map((activity, index) => {
                  let rowClasses = '';
                  if (activity.status === 'completed') {
                    rowClasses =
                      'bg-[#e9f1ee] border-t border-r border-b border-l-[3px] border-[#e9f1ee] border-solid';
                  } else if (activity.status === 'current') {
                    rowClasses =
                      'border-t border-r border-b border-l-[3px] border-[#2f7d7e] border-solid';
                  } else {
                    rowClasses =
                      'border-t border-r border-b border-l-[3px] border-[#e9f1ee] border-solid';
                  }

                  return (
                    <div
                      key={index}
                      className={`flex h-[100px] w-full shrink-0 items-center justify-between rounded-[16px] p-[20px] max-lg:min-h-[92px] max-lg:h-auto max-lg:p-3 sm:max-lg:p-4 max-sm:flex-col max-sm:items-stretch max-sm:gap-3 ${rowClasses}`}
                    >
                      <div className="flex min-w-0 items-center gap-[24px] max-lg:gap-3">
                        <div className="flex shrink-0 flex-col items-center">
                          <p className="shrink-0 whitespace-nowrap font-nunito text-[12px] font-bold leading-[16px] tracking-[-0.18px] text-[#174a4d]">
                            {activity.day}
                          </p>
                          <div className="flex h-[16px] shrink-0 flex-col items-start">
                            <p className="shrink-0 whitespace-nowrap text-center font-nunito text-[10px] font-medium uppercase leading-[16px] text-[#a8adaf]">
                              {activity.date}
                            </p>
                          </div>
                        </div>

                        <div className="flex min-w-0 items-center gap-[16px] max-lg:gap-3">
                          <div className="relative size-[60px] shrink-0 max-md:hidden">
                            <div className="absolute inset-[2.14%_4.04%_9.5%_4.04%]">
                              <span
                                className="absolute inset-0 max-w-none"
                                style={{
                                  WebkitMaskImage: `url(${activityMask})`,
                                  maskImage: `url(${activityMask})`,
                                  WebkitMaskPosition: 'center',
                                  maskPosition: 'center',
                                  WebkitMaskRepeat: 'no-repeat',
                                  maskRepeat: 'no-repeat',
                                  WebkitMaskSize: '100% 100%',
                                  maskSize: '100% 100%',
                                  backgroundColor: '#d8e2df',
                                }}
                              >
                                <Image
                                  src={activity.image}
                                  alt=""
                                  fill
                                  sizes="60px"
                                  className="object-cover opacity-50"
                                />
                              </span>
                            </div>
                          </div>
                          <div className="flex min-w-0 flex-col items-start gap-[8px]">
                            <div className="flex items-center gap-[10px]">
                              <p className="min-w-0 truncate font-nunito text-[16px] font-bold leading-[16px] tracking-[-0.24px] text-[#174a4d] max-lg:max-w-[180px]">
                                {activity.title}
                              </p>
                              {activity.status === 'current' && (
                                <div className="flex shrink-0 items-center justify-center rounded-[16px] bg-[#2f7d7e] px-[4px] py-[2px]">
                                  <p className="shrink-0 whitespace-nowrap font-manrope text-[11px] font-medium leading-[15px] tracking-[0.22px] text-white">
                                    TODAY
                                  </p>
                                </div>
                              )}
                            </div>
                            <div className="flex h-[20px] shrink-0 items-center gap-[8px] pt-[3px]">
                              <div className="shrink-0">
                                <div className="flex size-full items-center gap-[4px] bg-clip-padding">
                                  <div className="flex size-[10px] shrink-0 items-center justify-center">
                                    <Clock3
                                      aria-hidden="true"
                                      className="size-[10px] stroke-[1.25] text-[#607077]"
                                    />
                                  </div>
                                  <div className="shrink-0">
                                    <div className="flex size-full flex-col items-start bg-clip-padding">
                                      <p className="shrink-0 whitespace-nowrap font-manrope text-[11px] font-normal leading-[16.5px] text-[#607077]">
                                        {activity.duration}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="size-[3px] shrink-0 rounded-[1.5px] bg-[#d8ddd9]" />
                              <div className="h-[16.5px] w-[128.578px] shrink-0 max-lg:hidden">
                                <div className="flex size-full flex-col items-start overflow-clip rounded-[inherit] bg-clip-padding">
                                  <p className="shrink-0 whitespace-nowrap font-manrope text-[11px] font-normal leading-[16.5px] text-[#607077]">
                                    {activity.category}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="relative flex min-w-[80px] shrink-0 items-center justify-center overflow-clip rounded-[9999px] border border-solid border-[#d2e3dc] px-[12px] py-[8px] max-sm:self-end">
                        {activity.status === 'completed' && (
                          <div
                            aria-hidden
                            className="absolute inset-0 pointer-events-none rounded-[9999px] bg-[#bcd5cb]"
                          />
                        )}
                        {activity.status === 'current' && (
                          <div
                            aria-hidden
                            className="absolute inset-0 pointer-events-none rounded-[9999px] bg-[#2f7d7e]"
                          />
                        )}

                        <div className="flex shrink-0 items-start px-[4px] py-0 relative">
                          <p
                            className={`shrink-0 whitespace-nowrap font-nunito text-[14px] font-medium leading-[20px] tracking-[-0.084px] ${
                              activity.status === 'current' ? 'text-white' : 'text-[#263238]'
                            }`}
                          >
                            {activity.status === 'completed'
                              ? 'Completed'
                              : activity.status === 'current'
                                ? 'Continue'
                                : 'Start Activity'}
                          </p>
                        </div>

                        {activity.status === 'completed' && (
                          <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_-6px_2px_0px_rgba(255,255,255,0.07)]" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
