import Image from 'next/image';

type Recommendation = {
  category: string;
  title: string;
  description: string;
  action: string;
  tone: string;
  label: string;
};

const recommendations: Recommendation[] = [
  {
    category: 'Parent Resources',
    title: 'Daily Routine Chart',
    description: 'Customizable morning and evening checklist for preschool ages.',
    action: 'Download (1.2 MB)',
    tone: 'bg-[#f5f3ff]',
    label: 'Therapist Verified',
  },
  {
    category: 'Parent Resources',
    title: 'Daily Routine Chart',
    description: 'Customizable morning and evening checklist for preschool ages.',
    action: 'View resources',
    tone: 'bg-[#f5f3ff]',
    label: 'OT Favorite',
  },
  {
    category: 'Therapy Toys & Equipment',
    title: 'Sensory Rice Bin Exploration',
    description: 'Customizable morning and evening checklist for preschool ages.',
    action: 'See Why We Recommend It',
    tone: 'bg-[#f0fdfa]',
    label: 'Therapist Verified',
  },
  {
    category: 'Therapy Toys & Equipment',
    title: 'Sensory Rice Bin Exploration',
    description: 'Customizable morning and evening checklist for preschool ages.',
    action: 'See Why We Recommend It',
    tone: 'bg-[#f0fdfa]',
    label: 'OT Favorite',
  },
];

function RecommendationCard({ item }: { item: Recommendation }) {
  return (
    <article className="flex overflow-hidden rounded-2xl border border-[#e9f1ee] bg-white">
      <div className={`relative h-32 w-30 shrink-0 ${item.tone}`}>
        <Image
          src="/Home/figma-child-detail-resource.png"
          alt=""
          fill
          sizes="120px"
          className="object-cover object-center"
        />
        <span className="absolute left-2 top-2 rounded-full bg-white/90 px-1.5 py-0.5 font-nunito text-[7px] text-[#174a4d]">
          {item.label}
        </span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 p-4">
        <h4 className="font-nunito text-sm font-medium leading-5 text-[#263238]">{item.title}</h4>
        <p className="font-manrope text-[9px] leading-4 text-[#7d8488]">{item.description}</p>
        <button className="w-fit font-manrope text-[8px] font-semibold tracking-[0.32px] text-[#2f7d7e]">
          {item.action} →
        </button>
      </div>
    </article>
  );
}

export function RecommendationsPanel() {
  return (
    <section className="rounded-xl border border-[#e8ebe8] bg-white p-6 shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
      <h2 className="font-nunito text-xl font-medium text-[#263238]">
        Recommended Resources &amp; Therapy Toys
      </h2>
      <p className="mt-1 font-manrope text-[10px] text-[#7d8488]">
        Handpicked parent guides and pediatric OT/SLP sensory tools
      </p>
      <div className="mt-5 grid gap-6 lg:grid-cols-2">
        {['Parent Resources', 'Therapy Toys & Equipment'].map((category) => (
          <div key={category}>
            <h3 className="font-nunito text-base font-medium text-[#263238]">{category}</h3>
            <div className="mt-3 space-y-3">
              {recommendations
                .filter((item) => item.category === category)
                .map((item, index) => (
                  <RecommendationCard key={`${item.title}-${index}`} item={item} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
