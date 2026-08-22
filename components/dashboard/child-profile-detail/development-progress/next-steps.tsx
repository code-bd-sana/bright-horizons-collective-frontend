import Image from 'next/image';
import { Bookmark, Clock, ArrowUpRight } from 'lucide-react';

export function NextSteps() {
  const cards = [
    {
      id: 1,
      type: 'activity',
      title: 'Stacking & Sorting Challenge',
      badge: 'Easy',
      badgeColor: 'text-[#174A4D]',
      image: '/images/figma/next-steps-card1-shape.png',
      imageBg: 'bg-[#A5C7B9]',
      imageHeight: 'h-[286px]',
      material: 'Blocks',
      time: '20 min',
      tags: ['🏠 Indoor', '18–36 mo', 'Fine Motor'],
    },
    {
      id: 2,
      type: 'article',
      title: 'Parent Education',
      badge: 'OT Favorite',
      badgeColor: 'text-[#174A4D]',
      image: '/images/figma/next-steps-card2-shape.png',
      imageBg: 'bg-[#E0E7FF]',
      imageHeight: 'h-[274px]',
      readTime: '5 min Read',
      description: 'OT-written articles on development, play, and everyday strategies',
    },
    {
      id: 3,
      type: 'activity',
      title: 'Stacking & Sorting Challenge',
      badge: 'Easy',
      badgeColor: 'text-[#174A4D]',
      image: '/images/figma/next-steps-card1-shape.png',
      imageBg: 'bg-[#A5C7B9]',
      imageHeight: 'h-[286px]',
      material: 'Blocks',
      time: '20 min',
      tags: ['🏠 Indoor', '18–36 mo', 'Fine Motor'],
    },
  ];

  return (
    <div className="flex flex-col gap-6 rounded-[16px] border border-[#D2E3DC] bg-[#E9F1EE] p-6 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] md:p-8">
      <div className="flex flex-col gap-2">
        <h2 className="font-nunito text-[24px] font-medium leading-8 text-[#263238]">
          Recommended Next Steps
        </h2>
        <p className="font-nunito text-[14px] font-medium leading-5 tracking-[-0.006em] text-[#7D8488]">
          Suggested therapeutic exercises &amp; home resources for Emma
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.id}
            className="flex flex-col overflow-hidden rounded-[24px] border border-[#E9F1EE] bg-white transition-shadow hover:shadow-md"
          >
            <div
              className={`relative flex w-full items-center justify-center ${card.imageBg} ${card.imageHeight}`}
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-contain object-center p-5"
              />
              <div className="absolute left-8 top-4 rounded-full bg-white px-2.5 py-0.75">
                <span
                  className={`font-nunito text-[12px] font-medium leading-4 ${card.badgeColor}`}
                >
                  {card.badge}
                </span>
              </div>
              <button
                type="button"
                className="absolute right-8 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 shadow-[0px_1px_4px_rgba(0,0,0,0.12)] transition-colors hover:bg-white"
              >
                <Bookmark className="h-3 w-3 text-[#263238]" />
              </button>
            </div>

            {card.type === 'activity' ? (
              <div className="flex flex-col gap-4 p-4 pb-8">
                <h3 className="font-nunito text-[24px] font-medium leading-8 text-[#263238]">
                  {card.title}
                </h3>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1.25">
                    <span className="rounded-full border border-[#DCEEEE] bg-transparent px-2 py-1.5 font-nunito text-[12px] font-medium leading-4">
                      <span className="text-[#263238]">Material:</span>{' '}
                      <span className="text-[#7D8488]">{card.material}</span>
                    </span>
                    <div className="flex items-center gap-1 px-2 py-1.5">
                      <Clock className="h-3 w-3 text-[#607077]" />
                      <span className="font-manrope text-[12px] font-normal leading-4.5 text-[#607077]">
                        {card.time}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.25">
                    {card.tags?.map((tag, idx) => (
                      <span
                        key={idx}
                        className="rounded-full border border-[#ACCBCB] bg-white px-2 py-1.5 font-nunito text-[12px] font-medium leading-4-[#2F7D7E]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3 p-4 pb-8">
                <div className="flex items-center justify-between">
                  <h3 className="font-nunito text-[20px] font-medium leading-7 text-[#263238]">
                    {card.title}
                  </h3>
                  <span className="font-manrope text-[14px] font-normal leading-5.5 text-[#7D8488]">
                    {card.readTime}
                  </span>
                </div>
                <p className="font-manrope text-[14px] font-normal leading-5.5 text-[#7D8488]">
                  {card.description}
                </p>
                <button
                  type="button"
                  className="mt-1 flex w-fit items-center gap-1.25 font-manrope text-[12px] font-semibold leading-4.5 tracking-[0.04em] text-[#2F7D7E] transition-opacity hover:opacity-80"
                >
                  Explore
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#2F7D7E]" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
