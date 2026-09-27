import Image from 'next/image';

interface MaterialsNeededProps {
  materials?: Array<string | { name: string }> | null;
  materialsSummary?: string | null;
}

export function MaterialsNeeded({ materials, materialsSummary }: MaterialsNeededProps) {
  const imgStar3 = '/Home/figma-activity-detail-star3.svg';
  const imgStar8 = '/Home/figma-activity-detail-star8.svg';

  const items: string[] = Array.isArray(materials)
    ? materials
        .map((m) => (typeof m === 'string' ? m : m?.name))
        .filter((name): name is string => Boolean(name && name.trim()))
    : [];

  return (
    <div className="flex w-full flex-col gap-6 rounded-2xl border border-[#fafafa] bg-white p-4 shadow-[0_1px_1px_rgba(0,0,0,0.05)] sm:p-6 2xl:p-8">
      <div className="flex w-full flex-col">
        <h2 className="font-nunito text-2xl font-medium leading-8 text-[#263238]">
          Materials Needed
        </h2>
      </div>

      {items.length > 0 ? (
        <div className="grid w-full grid-cols-2 place-items-center gap-3 sm:gap-5 min-[1600px]:grid-cols-4 min-[1600px]:gap-0">
          {items.map((item, index) => {
            const isStar3 = index % 2 === 0;
            return (
              <div
                key={`${item}-${index}`}
                className="relative size-28 shrink-0 sm:size-40 min-[1600px]:mr-[-6.667px] min-[1600px]:size-44.25"
              >
                <div className="absolute inset-0">
                  <div className="absolute inset-[2.14%_4.04%_9.5%_4.04%]">
                    <Image
                      alt=""
                      className="block size-full max-w-none"
                      fill
                      src={isStar3 ? imgStar3 : imgStar8}
                    />
                  </div>
                </div>
                <p
                  className={`absolute top-[calc(50%-21.5px)] left-1/2 w-24 -translate-x-1/2 text-center font-manrope text-xs leading-5 tracking-[-0.084px] wrap-break-word sm:w-27.5 sm:text-sm sm:leading-5.5 ${
                    isStar3 ? 'text-(--accent\/900,#493630)' : 'text-(--secondary\/800,#394a43)'
                  }`}
                >
                  {item}
                </p>
              </div>
            );
          })}
        </div>
      ) : materialsSummary ? (
        <div className="rounded-xl bg-[#f7faf8] p-4 text-[#394a43]">
          <p className="font-manrope text-sm leading-5.5 tracking-[-0.084px]">{materialsSummary}</p>
        </div>
      ) : (
        <p className="font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#7d8488]">
          No special materials needed for this activity.
        </p>
      )}
    </div>
  );
}
