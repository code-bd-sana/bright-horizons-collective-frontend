import Image from 'next/image';
import Link from 'next/link';
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
    <section className="flex w-full min-w-0 flex-col items-start rounded-2xl border border-[#e8ebe8] bg-[#fffdf8] p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:p-6 min-[1800px]:p-8">
      <div className="flex w-full shrink-0 flex-col items-center">
        <div className="flex w-full shrink-0 flex-col items-start">
          <div className="flex w-full shrink-0 flex-col items-start">
            <div className="flex w-full shrink-0 flex-col items-start gap-5 sm:gap-6">
              <div className="flex w-full shrink-0 items-start justify-between gap-4">
                <div className="flex min-w-0 flex-col items-start gap-1">
                  <p className="min-w-full shrink-0 font-nunito text-[12px] font-medium leading-4 text-[#2f7d7e]">
                    Week 3 · July 20 – July 26
                  </p>
                  <h2 className="font-nunito text-xl font-medium leading-7 text-[#263238] sm:text-2xl sm:leading-8">
                    {title}
                  </h2>
                </div>
                <div className="hidden w-34.25 shrink-0 flex-col items-start md:flex">
                  <p className="w-full shrink-0 font-nunito text-[12px] font-medium leading-4 text-[#7d8488]">
                    Tap a day to view activity
                  </p>
                </div>
              </div>

              <div className="flex w-full shrink-0 flex-col items-start gap-3 sm:gap-4 min-[1800px]:gap-5">
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

                  const actionClassName =
                    'relative col-start-2 flex min-h-10 w-full min-w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#d2e3dc] px-3 py-2 sm:col-start-4 sm:row-start-1 sm:min-h-0 sm:w-auto';

                  const actionContent = (
                    <>
                      {activity.status === 'completed' && (
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 rounded-full bg-[#bcd5cb]"
                        />
                      )}
                      {activity.status === 'current' && (
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 rounded-full bg-[#2f7d7e]"
                        />
                      )}

                      <span
                        className={`relative shrink-0 whitespace-nowrap px-1 font-nunito text-[14px] font-medium leading-5 tracking-[-0.084px] ${
                          activity.status === 'current' ? 'text-white' : 'text-[#263238]'
                        }`}
                      >
                        {activity.status === 'completed'
                          ? 'Completed'
                          : activity.status === 'current'
                            ? 'Continue'
                            : 'Start Activity'}
                      </span>

                      {activity.status === 'completed' && (
                        <span className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0px_-6px_2px_0px_rgba(255,255,255,0.07)]" />
                      )}
                    </>
                  );

                  return (
                    <article
                      key={index}
                      className={`grid min-h-28 w-full grid-cols-[42px_minmax(0,1fr)] items-center gap-x-3 gap-y-3 rounded-2xl p-3 sm:min-h-24 sm:grid-cols-[44px_60px_minmax(0,1fr)_auto] sm:gap-x-4 sm:p-4 min-[1800px]:h-25 min-[1800px]:p-5 ${rowClasses}`}
                    >
                      <div className="flex shrink-0 flex-col items-center self-center">
                        <p className="shrink-0 whitespace-nowrap font-nunito text-[12px] font-bold leading-4 tracking-[-0.18px] text-[#174a4d]">
                          {activity.day}
                        </p>
                        <div className="flex h-4 shrink-0 flex-col items-start">
                          <p className="shrink-0 whitespace-nowrap text-center font-nunito text-[10px] font-medium uppercase leading-4 text-[#a8adaf]">
                            {activity.date}
                          </p>
                        </div>
                      </div>

                      <div className="relative hidden size-15 shrink-0 sm:block">
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
                      <div className="flex min-w-0 flex-col items-start gap-2">
                        <div className="flex min-w-0 flex-wrap items-center gap-2">
                          <p className="min-w-0 font-nunito text-[15px] font-bold leading-5 tracking-[-0.2px] text-[#174a4d] sm:truncate sm:text-base sm:leading-5 sm:tracking-[-0.24px]">
                            {activity.title}
                          </p>
                          {activity.status === 'current' && (
                            <div className="flex shrink-0 items-center justify-center rounded-[16px] bg-[#2f7d7e] px-1 py-0.5">
                              <p className="shrink-0 whitespace-nowrap font-manrope text-[11px] font-medium leading-3.75 tracking-[0.22px] text-white">
                                TODAY
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="flex h-5 shrink-0 items-center gap-2 pt-0.75">
                          <div className="shrink-0">
                            <div className="flex size-full items-center gap-1 bg-clip-padding">
                              <div className="flex size-2.5 shrink-0 items-center justify-center">
                                <Clock3
                                  aria-hidden="true"
                                  className="size-2.5 stroke-[1.25] text-[#607077]"
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
                          <div className="size-0.75 shrink-0 rounded-[1.5px] bg-[#d8ddd9]" />
                          <div className="hidden h-[16.5px] min-w-0 md:block">
                            <div className="flex size-full flex-col items-start overflow-clip rounded-[inherit] bg-clip-padding">
                              <p className="shrink-0 whitespace-nowrap font-manrope text-[11px] font-normal leading-[16.5px] text-[#607077]">
                                {activity.category}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Action Button */}
                      {activity.status === 'completed' ? (
                        <div className={actionClassName}>{actionContent}</div>
                      ) : (
                        <Link
                          href="/dashboard/weekly-plans/activity-detail"
                          className={actionClassName}
                        >
                          {actionContent}
                        </Link>
                      )}
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
