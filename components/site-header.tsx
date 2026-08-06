import { Logo } from '@/components/logo';
import { Navbar } from '@/components/navbar';

export function SiteHeader({ aboutLayout = false }: { aboutLayout?: boolean }) {
  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-40">
      <div className="relative mx-auto hidden h-0 w-full max-w-[1920px] lg:block">
        <div
          className="relative h-[150px] w-[1920px] origin-top-left"
          style={{ transform: 'scale(min(1, calc(100vw / 1920px)))' }}
        >
          <Logo
            width={123}
            height={123}
            showBackdrop
            className="pointer-events-auto absolute left-[194px] top-4 z-20"
          />

          <div
            className={`pointer-events-auto absolute left-1/2 z-30 w-[720px] -translate-x-1/2 ${aboutLayout ? 'top-11' : 'top-6'}`}
          >
            <Navbar />
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <Logo
          width={123}
          height={123}
          showBackdrop
          className="pointer-events-auto absolute left-6 top-4 z-20"
        />

        <div className="pointer-events-auto absolute left-1/2 top-4 z-30 w-[min(92vw,662px)] -translate-x-1/2">
          <Navbar />
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
