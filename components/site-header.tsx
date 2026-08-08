import { Logo } from '@/components/logo';
import { Navbar } from '@/components/navbar';

export function SiteHeader({ aboutLayout = false }: { aboutLayout?: boolean }) {
  const backdropSrc = aboutLayout ? '/About/figma-about-739-33851-union.svg' : undefined;

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-40">
      <Logo
        width={123}
        height={123}
        showBackdrop
        backdropSrc={backdropSrc}
        className="pointer-events-auto absolute left-[calc(50%-766px)] top-4 z-20 max-[1600px]:left-8 max-xl:left-4 max-lg:hidden"
      />

      <div
        className={`pointer-events-auto absolute left-1/2 z-30 w-180 -translate-x-1/2 max-lg:top-4 max-lg:w-[min(92vw,662px)] max-sm:top-2 max-sm:w-[min(96vw,662px)] ${aboutLayout ? 'top-11' : 'top-6'}`}
      >
        <Navbar />
      </div>
    </header>
  );
}

export default SiteHeader;
