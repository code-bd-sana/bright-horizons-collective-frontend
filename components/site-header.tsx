import { Logo } from '@/components/logo';
import { Navbar } from '@/components/navbar';

export function SiteHeader() {
  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-40">
      <Logo
        width={88}
        height={88}
        showBackdrop
        className="pointer-events-auto absolute left-[calc(50%-826px)] top-4 z-20 max-[1700px]:-left-5 max-lg:left-6 max-lg:top-4"
      />

      <div className="pointer-events-auto absolute left-1/2 top-11 z-30 w-185.5 -translate-x-1/2 max-lg:top-4 max-lg:w-[min(92vw,662px)]">
        <Navbar />
      </div>
    </header>
  );
}

export default SiteHeader;
