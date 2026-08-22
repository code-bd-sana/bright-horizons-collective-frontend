import Image from 'next/image';
import { ArrowRight, Download, ShieldCheck, Star, Bookmark } from 'lucide-react';

type Recommendation = {
  category: string;
  title: string;
  description: string;
  action: string;
  actionIcon: 'download' | 'arrow-right';
  tone: string;
  label: string;
  labelIcon: 'shield' | 'star';
  image: string;
};

const recommendations: Recommendation[] = [
  {
    category: 'Parent Resources',
    title: 'Daily Routine Chart',
    description: 'Customizable morning and evening checklist\nfor preschool ages.',
    action: 'Download (1.2 MB)',
    actionIcon: 'download',
    tone: 'bg-[#F5F3FF]',
    label: 'Therapist Verified',
    labelIcon: 'shield',
    image: '/resources/resource-parent.png',
  },
  {
    category: 'Parent Resources',
    title: 'Daily Routine Chart',
    description: 'Customizable morning and evening checklist\nfor preschool ages.',
    action: 'View resources',
    actionIcon: 'arrow-right',
    tone: 'bg-[#F5F3FF]',
    label: 'OT Favorite',
    labelIcon: 'star',
    image: '/resources/resource-parent.png',
  },
  {
    category: 'Therapy Toys & Equipment',
    title: 'Sensory Rice Bin Exploration',
    description: 'Customizable morning and evening checklist\nfor preschool ages.',
    action: 'See Why We Recommend It',
    actionIcon: 'arrow-right',
    tone: 'bg-[#F0FDFA]',
    label: 'Therapist Verified',
    labelIcon: 'shield',
    image: '/resources/resource-toy.png',
  },
  {
    category: 'Therapy Toys & Equipment',
    title: 'Sensory Rice Bin Exploration',
    description: 'Customizable morning and evening checklist\nfor preschool ages.',
    action: 'See Why We Recommend It',
    actionIcon: 'arrow-right',
    tone: 'bg-[#F0FDFA]',
    label: 'OT Favorite',
    labelIcon: 'star',
    image: '/resources/resource-toy.png',
  },
];

function RecommendationCard({ item }: { item: Recommendation }) {
  return (
    <article className="flex flex-col items-center gap-6 rounded-3xl border border-[#E9F1EE] bg-white pb-6 md:flex-row md:pb-0 md:pr-6">
      <div
        className={`relative flex h-68.5 w-full shrink-0 items-center justify-center rounded-t-3xl md:w-64.75 md:rounded-l-3xl md:rounded-tr-none ${item.tone}`}
      >
        <div className="absolute left-1.5 top-1.5 flex w-[calc(100%-12px)] items-center justify-between">
          <div className="flex items-center gap-1 rounded-full bg-[#E9F1EE] px-2.5 py-1">
            {item.labelIcon === 'shield' ? (
              <ShieldCheck className="h-3 w-3 text-[#006A62]" />
            ) : (
              <Star className="h-3 w-3 text-[#006A62]" />
            )}
            <span className="font-nunito text-xs font-medium text-[#174A4D]">{item.label}</span>
          </div>
          <button className="flex h-6 w-6 items-center justify-center rounded-full bg-white/90 shadow-[0_1px_4px_0_rgba(0,0,0,0.12)] hover:bg-white transition-colors">
            <Bookmark className="h-3.5 w-3.5 text-[#263238]" />
          </button>
        </div>
        <div className="relative h-55 w-55">
          <Image src={item.image} alt={item.title} fill className="object-contain" />
        </div>
      </div>
      <div className="flex w-full flex-col gap-3 px-6 md:max-w-83 md:px-0">
        <h4 className="font-nunito text-xl font-medium leading-7 text-[#263238]">{item.title}</h4>
        <p className="whitespace-pre-line font-manrope text-sm font-normal leading-5.5 tracking-[-0.006em] text-[#7D8488]">
          {item.description}
        </p>
        <button className="mt-1 flex w-fit items-center gap-1.25 rounded-full font-manrope text-xs font-semibold leading-4.5 tracking-[0.04em] text-[#2F7D7E] hover:underline">
          {item.actionIcon === 'download' && <Download className="h-3.5 w-3.5" />}
          {item.action}
          {item.actionIcon === 'arrow-right' && <ArrowRight className="h-3.5 w-3.5" />}
        </button>
      </div>
    </article>
  );
}

export function RecommendationsPanel() {
  return (
    <section className="flex flex-col gap-8 rounded-2xl border border-[#E8EBE8] bg-white p-4 sm:p-8 shadow-sm">
      <div className="flex flex-col gap-2">
        <h2 className="font-nunito text-2xl font-medium text-[#263238]">
          Recommended Resources & Therapy Toys
        </h2>
        <p className="font-nunito text-sm font-medium leading-5 tracking-[-0.006em] text-[#7D8488]">
          Handpicked parent guides and pediatric OT/SLP sensory tools
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
        {['Parent Resources', 'Therapy Toys & Equipment'].map((category) => (
          <div key={category} className="flex flex-col gap-6 min-w-0">
            <h3 className="font-nunito text-2xl font-medium text-[#263238]">{category}</h3>
            <div className="flex flex-col justify-center gap-8">
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
