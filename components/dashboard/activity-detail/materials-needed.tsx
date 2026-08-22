import Image from 'next/image';

export function MaterialsNeeded() {
  const imgStar3 = '/Home/figma-activity-detail-star3.svg';
  const imgStar8 = '/Home/figma-activity-detail-star8.svg';

  return (
    <div className="flex w-full flex-col gap-6 rounded-[16px] border border-[#fafafa] bg-white p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] sm:p-6 lg:p-8">
      <div className="flex flex-col w-full">
        <h2 className="font-['Nunito'] font-medium text-[24px] leading-[32px] text-[#263238]">
          Materials Needed
        </h2>
      </div>

      <div className="grid w-full grid-cols-2 place-items-center gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-0">
        <div className="relative h-[130px] w-[130px] shrink-0 sm:h-[160px] sm:w-[160px] lg:h-[177px] lg:w-[177px] lg:-mr-[6.667px]">
          <div className="absolute inset-0">
            <div className="absolute inset-[2.14%_4.04%_9.5%_4.04%]">
              <Image alt="" className="block max-w-none w-full h-full" fill src={imgStar3} />
            </div>
          </div>
          <p className="absolute left-1/2 -translate-x-1/2 top-[calc(50%-32.5px)] w-[110px] text-center font-['Manrope'] font-normal text-[14px] leading-[22px] text-[color:var(--accent\/900,#493630)] tracking-[-0.084px] break-words">
            Animal yoga card deck (or printed cards)
          </p>
        </div>

        <div className="relative h-[130px] w-[130px] shrink-0 sm:h-[160px] sm:w-[160px] lg:h-[177px] lg:w-[177px] lg:-mr-[6.667px]">
          <div className="absolute inset-0">
            <div className="absolute inset-[2.14%_4.04%_9.5%_4.04%]">
              <Image alt="" className="block max-w-none w-full h-full" fill src={imgStar8} />
            </div>
          </div>
          <p className="absolute left-1/2 -translate-x-1/2 top-[calc(50%-21.5px)] w-[104px] text-center font-['Manrope'] font-normal text-[14px] leading-[22px] text-[color:var(--secondary\/800,#394a43)] tracking-[-0.084px] break-words">
            Yoga mat or soft carpet area
          </p>
        </div>

        <div className="relative h-[130px] w-[130px] shrink-0 sm:h-[160px] sm:w-[160px] lg:h-[177px] lg:w-[177px] lg:-mr-[6.667px]">
          <div className="absolute inset-0">
            <div className="absolute inset-[2.14%_4.04%_9.5%_4.04%]">
              <Image alt="" className="block max-w-none w-full h-full" fill src={imgStar3} />
            </div>
          </div>
          <p className="absolute left-1/2 -translate-x-1/2 top-[calc(50%-21.5px)] w-[113px] text-center font-['Manrope'] font-normal text-[14px] leading-[22px] text-[color:var(--accent\/900,#493630)] tracking-[-0.084px] break-words">
            Calm background music (optional)
          </p>
        </div>

        <div className="relative h-[130px] w-[130px] shrink-0 sm:h-[160px] sm:w-[160px] lg:h-[177px] lg:w-[177px]">
          <div className="absolute inset-0">
            <div className="absolute inset-[2.14%_4.04%_9.5%_4.04%]">
              <Image alt="" className="block max-w-none w-full h-full" fill src={imgStar8} />
            </div>
          </div>
          <p className="absolute left-1/2 -translate-x-1/2 top-[calc(50%-21.5px)] w-[83px] text-center font-['Manrope'] font-normal text-[14px] leading-[22px] text-[color:var(--secondary\/800,#394a43)] tracking-[-0.084px] break-words">
            Water bottle nearby
          </p>
        </div>
      </div>
    </div>
  );
}
