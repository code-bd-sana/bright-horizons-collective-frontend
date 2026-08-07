import Image from 'next/image';
import Link from 'next/link';
import type { CSSProperties } from 'react';

const artworkMask: CSSProperties = {
  WebkitMaskImage: 'url(/Home/figma-home-1183-12060-img-image30.svg)',
  maskImage: 'url(/Home/figma-home-1183-12060-img-image30.svg)',
  WebkitMaskPosition: '-108.181px 194.919px',
  maskPosition: '-108.181px 194.919px',
  WebkitMaskRepeat: 'no-repeat',
  maskRepeat: 'no-repeat',
  WebkitMaskSize: '1330.151px 724.27px',
  maskSize: '1330.151px 724.27px',
};

function CtaCard({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={
        compact
          ? 'relative mx-auto flex min-h-106.75 max-w-7xl items-center justify-center overflow-hidden rounded-3xl border-2 border-[#FAF0ED] bg-[#FFFDF8] px-6 py-20 text-center shadow-[0_2px_28px_rgba(39,69,67,0.06)]'
          : 'relative h-106.75 w-7xl overflow-hidden rounded-3xl border-2 border-[#FAF0ED] bg-[#FFFDF8] shadow-[0_2px_28px_rgba(39,69,67,0.06)]'
      }
    >
      <div
        aria-hidden="true"
        style={artworkMask}
        className={
          compact
            ? 'pointer-events-none absolute inset-0 opacity-30'
            : 'pointer-events-none absolute left-[100.71px] top-[1.61px] h-[652.83px] w-[1019.22px] opacity-30'
        }
      >
        <Image
          src="/Home/figma-home-1183-12060-img-image31.png"
          alt=""
          fill
          sizes={compact ? '100vw' : '1019px'}
          className="object-cover"
        />
      </div>
      <div
        className={
          compact
            ? 'relative z-10 flex max-w-170.75 flex-col items-center gap-7'
            : 'absolute left-1/2 top-1/2 z-10 flex w-170.75 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-7'
        }
      >
        <div className="flex flex-col items-center gap-4">
          <h2 className="font-nunito text-[40px] font-semibold leading-12 tracking-[-0.4px] text-[#414D60]">
            Ready to make play more meaningful?
          </h2>
          <p className="font-manrope text-base leading-6 text-[#7D8488]">
            Spend less time searching and more time connecting with personalized weekly plans,
            engaging activities, and trusted developmental guidance.
          </p>
        </div>
        <Link
          href="/register"
          className="inline-flex h-9 items-center gap-2 rounded-full bg-[#F2B59F] px-5 font-nunito text-sm font-medium leading-5 text-[#263238]"
        >
          Start Free
          <Image
            src="/Home/figma-home-1183-12060-img-vector.svg"
            alt=""
            width={16}
            height={16}
            aria-hidden="true"
          />
        </Link>
      </div>
    </div>
  );
}

export function FinalCtaSection() {
  return (
    <>
      <section className="hidden h-166.75 w-full bg-[#FDFDFC] py-30 min-[1600px]:flex min-[1600px]:justify-center">
        <CtaCard />
      </section>
      <section className="bg-[#FDFDFC] px-5 py-20 min-[1600px]:hidden sm:px-8 sm:py-28">
        <CtaCard compact />
      </section>
    </>
  );
}
