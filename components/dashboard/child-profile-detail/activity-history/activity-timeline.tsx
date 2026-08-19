import { ExternalLink } from 'lucide-react';

export function ActivityTimeline() {
  const activities = [
    {
      id: 1,
      title: 'Rainbow Rice Play',
      status: 'Completed',
      metadata: 'Sensory · Tuesday, Jul 16 · 15 min',
      reflection:
        '"Emma was very engaged and stayed focused for the full 15 minutes. She enjoyed the texture of the rice and even named all the colors correctly today."',
    },
    {
      id: 2,
      title: 'Emotion Cards Identification',
      status: 'Completed',
      metadata: 'Communication · Tuesday, Jul 16 · 15 min',
      reflection:
        '"Improved pincer grasp today. He found the smaller wooden beads challenging but didn\'t get frustrated."',
    },
    {
      id: 3,
      title: 'Bead Stringing Exercise',
      status: 'Completed',
      metadata: 'Fine Motor · Tuesday, Jul 16 · 15 min',
      reflection:
        "\"Recognized 'happy' and 'sad' instantly. 'Frustrated' was harder but we practiced the breathing exercise together.\"",
    },
    {
      id: 4,
      title: 'Rainbow Rice Play',
      status: 'Completed',
      metadata: 'Sensory · Tuesday, Jul 16 · 15 min',
      reflection:
        '"Emma was very engaged and stayed focused for the full 15 minutes. She enjoyed the texture of the rice and even named all the colors correctly today."',
    },
  ];

  return (
    <div className="flex flex-col gap-6 rounded-[16px] border border-[#E8EBE8] bg-white p-8 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
      <h2 className="font-nunito text-[24px] font-medium leading-8 text-[#263238]">This Week</h2>

      <div className="flex flex-col">
        {activities.map((activity, idx) => (
          <div key={activity.id} className="flex flex-row gap-5">
            {/* Timeline Line & Dot */}
            <div className="flex w-2.5 flex-col items-center">
              <div className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#8FB9A8]" />
              {idx !== activities.length - 1 && <div className="mt-1 h-full w-px bg-[#E2E8E8]" />}
            </div>

            {/* Timeline Content */}
            <div className="mb-5 flex flex-1 flex-col gap-5 rounded-[16px] border border-[#E9F1EE] bg-white p-5 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-nunito text-[20px] font-medium leading-7 text-[#263238]">
                      {activity.title}
                    </h3>
                    <div className="flex items-center rounded-[8px] bg-[#E9F1EE] px-2 py-1">
                      <span className="font-nunito text-[12px] font-medium leading-4 text-[#729486]">
                        {activity.status}
                      </span>
                    </div>
                  </div>
                  <p className="font-manrope text-[12px] font-normal leading-4 text-[#7D8488]">
                    {activity.metadata}
                  </p>
                </div>

                <button
                  type="button"
                  className="group flex w-fit shrink-0 items-center gap-1 rounded-full border border-transparent px-1 py-0 transition-colors hover:bg-gray-50"
                >
                  <span className="font-nunito text-[16px] font-medium leading-6 tracking-[-0.011em] text-[#2F7D7E]">
                    View Activity Details
                  </span>
                  <ExternalLink className="h-4 w-4 text-[#2F7D7E] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </button>
              </div>

              <div className="flex flex-col gap-2 rounded-[8px] border border-[#FCE9E3] bg-[#F9F5F4] p-[16px_8px]">
                <span className="font-nunito text-[12px] font-medium leading-4 text-[#263238]">
                  Parent Reflection:
                </span>
                <p className="font-lora text-[12px] italic leading-4.5 text-[#515B60]">
                  {activity.reflection}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
