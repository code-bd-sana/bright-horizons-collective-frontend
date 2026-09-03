import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ActivityDetailHero } from './activity-detail-hero';
import { ActivityInstructions } from './activity-instructions';
import { ActivityMaterials } from './activity-materials';
import { ActivityModifications } from './activity-modifications';
import { ActivitySidePanels } from './activity-side-panels';

export function ActivityDetailPage() {
  return (
    <section className="mx-auto w-full max-w-265.75 pb-10">
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex items-center gap-2 font-manrope text-sm leading-5.5 tracking-[-0.084px]"
      >
        <Link
          href="/dashboard/admin/activities-library"
          className="inline-flex items-center gap-1 text-[#2f7d7e]"
        >
          <ArrowLeft aria-hidden="true" size={15} strokeWidth={1.5} />
          Activities Library
        </Link>
        <span className="text-lg leading-5 text-[#d8ddd9]">/</span>
        <span className="text-[#263238]">View Activities</span>
      </nav>
      <ActivityDetailHero />
      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_286px]">
        <div className="space-y-6">
          <ActivityMaterials />
          <ActivityInstructions />
          <ActivityModifications />
        </div>
        <ActivitySidePanels />
      </div>
    </section>
  );
}
