import { recentActivity } from './admin-dashboard-data';

const tones = {
  teal: 'bg-[#e9f3f2] text-[#27898a]',
  green: 'bg-[#edf7ef] text-[#45ad56]',
  mint: 'bg-[#f0f7f3] text-[#8fb9a8]',
  coral: 'bg-[#fff3f0] text-[#f09078]',
};

export function RecentActivity() {
  return (
    <section
      className="min-h-97.5 rounded-2xl border border-[#e3e9e8] bg-white p-6 shadow-[0_4px_8px_rgba(38,50,56,0.05)] 2xl:min-h-120.5"
      aria-labelledby="recent-activity-heading"
    >
      <h2
        id="recent-activity-heading"
        className="font-nunito text-2xl font-medium leading-8 text-[#263238]"
      >
        Recent Activity
      </h2>
      <div className="mt-6">
        {recentActivity.map(({ icon: Icon, tone, title, actor, time }, index) => (
          <article key={title} className="relative flex gap-3 pb-4 last:pb-0">
            {index !== recentActivity.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute left-4 top-8 h-6.25 border-l border-[#e5eeee]"
              />
            )}
            <span
              className={`flex size-8 shrink-0 items-center justify-center rounded-full ${tones[tone]}`}
            >
              <Icon aria-hidden="true" size={15} strokeWidth={1.7} />
            </span>
            <div className="min-w-0 pt-0.5">
              <p className="font-manrope text-sm leading-5.5 text-[#263238]">{title}</p>
              <p className="mt-0.5 font-manrope text-xs leading-4.5 text-[#7893a5]">
                {actor}
                <span className="mx-2 text-[#c4d0d4]">·</span>
                {time}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
