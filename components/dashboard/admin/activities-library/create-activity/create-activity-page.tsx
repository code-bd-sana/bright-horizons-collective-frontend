import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { CreateActivityForm } from './create-activity-form';

export function CreateActivityPage() {
  return (
    <section className="mx-auto w-full max-w-265.75 pb-10 pt-2 text-[#263238]">
      <Link
        href="/dashboard/admin/activities-library"
        className="inline-flex items-center gap-1 font-nunito text-sm font-medium leading-5 text-[#607d8b] transition-colors hover:text-[#278488]"
      >
        <ChevronLeft aria-hidden="true" size={16} strokeWidth={1.8} />
        Back to Activity Library
      </Link>
      <h1 className="mt-4 font-nunito text-2xl font-bold leading-9 text-[#263238]">
        Create Activities
      </h1>
      <div className="mt-5">
        <CreateActivityForm />
      </div>
    </section>
  );
}
