const activities = [
  'Sensory Rice Bin Exploration',
  'Finger Painting with Pudding',
  'Water Pouring Station',
  'Sensory Rice Bin Exploration',
  'Sensory Rice Bin Exploration',
  'Sensory Rice Bin Exploration',
];

const progressItems = [
  ['Fine Motor', '68%', '#2f7d7e'],
  ['Bilateral Coordination', '52%', '#70a5a4'],
  ['Sensory Processing', '72%', '#8fb9a8'],
  ['Self-Regulation', '43%', '#f2b59f'],
];

export function DevelopmentProgressPanel() {
  return (
    <section className="rounded-xl border border-[#e8ebe8] bg-white p-5 shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
      <p className="font-manrope text-[10px] text-[#7d8488]">Development Tracking</p>
      <h2 className="mt-1 font-nunito text-xl font-medium text-[#263238]">Emma&apos;s Progress</h2>
      <div
        className="mx-auto mt-5 grid size-24 place-items-center rounded-full"
        style={{
          background:
            'conic-gradient(#2f7d7e 0deg 117deg, #8fb9a8 117deg 211deg, #f2b59f 211deg 286deg, #e8ebe8 286deg 360deg)',
        }}
      >
        <div className="grid size-14 place-items-center rounded-full bg-white font-nunito text-sm text-[#263238]">
          —
        </div>
      </div>
      <div className="mt-5 space-y-2">
        {progressItems.map(([label, value, color]) => (
          <div
            key={label}
            className="flex items-center justify-between font-manrope text-[9px] text-[#7d8488]"
          >
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full" style={{ backgroundColor: color }} />
              {label}
            </span>
            <span>{value}</span>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="mt-5 h-8 w-full rounded-full border border-[#d8ddd9] font-nunito text-[10px] text-[#2f7d7e]"
      >
        View Progress Report <span>→</span>
      </button>
    </section>
  );
}

export function RecentActivityPanel() {
  return (
    <section className="rounded-xl border border-[#e8ebe8] bg-white p-5 shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between">
        <h2 className="font-nunito text-xl font-medium text-[#263238]">Recent activity</h2>
        <button type="button" className="font-manrope text-[9px] text-[#2f7d7e]">
          View all ›
        </button>
      </div>
      <div className="mt-4 space-y-3">
        {activities.map((activity, index) => (
          <div key={`${activity}-${index}`} className="flex items-center gap-2">
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#e9f1ee] text-xs">
              {index === 1 ? '🎨' : index === 2 ? '💧' : '🌾'}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-manrope text-[10px] text-[#263238]">{activity}</p>
              <p className="font-manrope text-[8px] text-[#7d8488]">Sensory Processing · 20 min</p>
            </div>
            <span className="font-manrope text-[8px] text-[#d4d6d7]">○ Completed</span>
          </div>
        ))}
      </div>
    </section>
  );
}
