import Image from 'next/image';

export function MaterialsNeeded() {
  const imgStar3 = '/Home/figma-activity-detail-star3.svg';
  const imgStar8 = '/Home/figma-activity-detail-star8.svg';

  return (
    <div className="flex w-full flex-col gap-6 rounded-2xl border border-[#fafafa] bg-white p-4 shadow-[0_1px_1px_rgba(0,0,0,0.05)] sm:p-6 2xl:p-8">
      <div className="flex w-full flex-col">
        <h2 className="font-nunito text-2xl font-medium leading-8 text-[#263238]">
          Materials Needed
        </h2>
      </div>

      <div className="grid w-full grid-cols-2 place-items-center gap-3 sm:gap-5 min-[1600px]:grid-cols-4 min-[1600px]:gap-0">
        <div className="relative size-28 shrink-0 sm:size-40 min-[1600px]:mr-[-6.667px] min-[1600px]:size-44.25">
          <div className="absolute inset-0">
            <div className="absolute inset-[2.14%_4.04%_9.5%_4.04%]">
              <Image alt="" className="block size-full max-w-none" fill src={imgStar3} />
            </div>
          </div>
          <p className="absolute top-[calc(50%-32.5px)] left-1/2 w-24 -translate-x-1/2 text-center font-manrope text-xs leading-5 tracking-[-0.084px] wrap-break-word text-(--accent\/900,#493630) sm:w-27.5 sm:text-sm sm:leading-5.5">
            Animal yoga card deck (or printed cards)
          </p>
        </div>

        <div className="relative size-28 shrink-0 sm:size-40 min-[1600px]:mr-[-6.667px] min-[1600px]:size-44.25">
          <div className="absolute inset-0">
            <div className="absolute inset-[2.14%_4.04%_9.5%_4.04%]">
              <Image alt="" className="block size-full max-w-none" fill src={imgStar8} />
            </div>
          </div>
          <p className="absolute top-[calc(50%-21.5px)] left-1/2 w-24 -translate-x-1/2 text-center font-manrope text-xs leading-5 tracking-[-0.084px] wrap-break-word text-(--secondary\/800,#394a43) sm:w-26 sm:text-sm sm:leading-5.5">
            Yoga mat or soft carpet area
          </p>
        </div>

        <div className="relative size-28 shrink-0 sm:size-40 min-[1600px]:mr-[-6.667px] min-[1600px]:size-44.25">
          <div className="absolute inset-0">
            <div className="absolute inset-[2.14%_4.04%_9.5%_4.04%]">
              <Image alt="" className="block size-full max-w-none" fill src={imgStar3} />
            </div>
          </div>
          <p className="absolute top-[calc(50%-21.5px)] left-1/2 w-24 -translate-x-1/2 text-center font-manrope text-xs leading-5 tracking-[-0.084px] wrap-break-word text-(--accent\/900,#493630) sm:w-28.25 sm:text-sm sm:leading-5.5">
            Calm background music (optional)
          </p>
        </div>

        <div className="relative size-28 shrink-0 sm:size-40 min-[1600px]:size-44.25">
          <div className="absolute inset-0">
            <div className="absolute inset-[2.14%_4.04%_9.5%_4.04%]">
              <Image alt="" className="block size-full max-w-none" fill src={imgStar8} />
            </div>
          </div>
          <p className="absolute top-[calc(50%-21.5px)] left-1/2 w-20 -translate-x-1/2 text-center font-manrope text-xs leading-5 tracking-[-0.084px] wrap-break-word text-(--secondary\/800,#394a43) sm:w-20.75 sm:text-sm sm:leading-5.5">
            Water bottle nearby
          </p>
        </div>
      </div>
    </div>
  );
}
