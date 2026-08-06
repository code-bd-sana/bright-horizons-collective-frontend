import Image from 'next/image';
import type { ExploreContentType } from '@/lib/explore-data';

const transitionArtwork = {
  Activities: 'kite',
  'Parent Resources': 'light',
  'Therapy Toys': 'sun',
} as const;

export function ExploreWaveTransition({ activeType }: { activeType: ExploreContentType }) {
  const artwork = transitionArtwork[activeType];

  return (
    <section aria-hidden="true" className="relative h-100 overflow-hidden bg-white max-lg:h-64">
      <Image
        src="/Home/figma-home-1183-10956-img-union.svg"
        alt=""
        width={2140}
        height={502}
        className="z-100 pointer-events-none absolute left-1/2 top-[-219.33px] max-w-none -translate-x-1/2 max-lg:-top-30 max-lg:h-82.5 max-lg:w-350"
        priority
      />

      {artwork === 'kite' ? (
        <div className="pointer-events-none absolute left-[calc(50%+372px)] top-31.75 flex h-[281.082px] w-[274.716px] items-center justify-center max-lg:left-auto max-lg:right-[2%] max-lg:scale-75 max-lg:origin-top-right">
          <div className="rotate-[43.43deg]">
            <div className="relative h-[278.712px] w-[114.444px] overflow-hidden">
              <Image
                src="/Home/figma-explore-kite.png"
                alt=""
                width={398}
                height={627}
                className="absolute left-[-29.02%] top-[-5.43%] h-[109.24%] w-[168.87%] max-w-none"
                priority
              />
            </div>
          </div>
        </div>
      ) : (
        <Image
          src={`/Home/figma-explore-${artwork}.png`}
          alt=""
          width={artwork === 'light' ? 313 : 413}
          height={artwork === 'light' ? 313 : 413}
          className="pointer-events-none absolute left-[calc(50%+372px)] top-16 h-auto w-78 max-lg:left-auto max-lg:right-[2%] max-lg:top-10 max-lg:w-56"
          priority
        />
      )}
    </section>
  );
}

export default ExploreWaveTransition;
