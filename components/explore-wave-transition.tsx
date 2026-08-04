import Image from 'next/image';

export function ExploreWaveTransition() {
  return (
    <section aria-hidden="true" className="relative h-77.5 overflow-hidden bg-white max-lg:h-64">
      <Image
        src="/Home/figma-explore-wave.svg"
        alt=""
        width={2302}
        height={462}
        className="pointer-events-none absolute inset-x-0 -top-38 h-auto w-full"
        priority
      />

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
    </section>
  );
}

export default ExploreWaveTransition;
