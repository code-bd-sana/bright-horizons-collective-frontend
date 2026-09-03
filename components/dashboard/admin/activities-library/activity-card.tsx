import { Archive, Clock3, Copy, Eye, FileText, Layers3, PencilLine, Trash2 } from 'lucide-react';
import Image from 'next/image';
import type { ActivityItem } from './activities-library-data';

export function ActivityCard({ activity }: { activity: ActivityItem }) {
  return (
    <article className="flex min-h-119.5 flex-col overflow-hidden rounded-2xl border border-[#d8dfdf] bg-white p-4 shadow-[0_1px_2px_rgba(38,50,56,0.03)]">
      <div className="relative h-52 shrink-0 overflow-hidden rounded-[18px] bg-[#e8e8e8]">
        <Image
          src={activity.image}
          alt=""
          fill
          sizes="(min-width: 1280px) 32vw, (min-width: 768px) 48vw, 100vw"
          className="object-cover"
        />
        <span className="absolute left-4 top-3 rounded-full bg-[#516568]/80 px-2.5 py-1 font-manrope text-xs font-medium leading-4 text-white">
          {activity.area}
        </span>
        <span className="absolute right-4 top-3 rounded-full bg-white px-3 py-1 font-manrope text-xs font-semibold leading-4 text-[#007b75]">
          {activity.status}
        </span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col pt-6">
        <h2 className="font-nunito text-base font-medium leading-6 text-[#1e282d]">
          {activity.title}
        </h2>
        <p className="mt-1.5 line-clamp-2 font-manrope text-sm leading-5.5 text-[#5f8096]">
          {activity.description}
        </p>
        <div className="mt-2.5 flex flex-wrap gap-2">
          <span className="rounded-full bg-[#edfaff] px-2.5 py-0.5 font-manrope text-xs leading-4 text-[#36b7f2]">
            Cognitive
          </span>
          <span className="rounded-full bg-[#eef5f6] px-2.5 py-0.5 font-manrope text-xs leading-4 text-[#668a9e]">
            {activity.age}
          </span>
          <span className="rounded-full bg-[#eaf7f5] px-2.5 py-0.5 font-manrope text-xs leading-4 text-[#27898a]">
            {activity.plan}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between font-manrope text-xs leading-4.5 text-[#668a9e]">
          <span className="flex items-center gap-1.5">
            <Clock3 aria-hidden="true" size={14} strokeWidth={1.5} />
            15 min
          </span>
          <span className="mr-auto ml-4 flex items-center gap-1.5">
            <Layers3 aria-hidden="true" size={14} strokeWidth={1.5} />
            Easy
          </span>
          <span className="flex items-center gap-1.5 text-[#27898a]">
            <FileText aria-hidden="true" size={14} strokeWidth={1.5} />
            Used in 31 plans
          </span>
        </div>
        <div className="mt-auto -mx-4 -mb-4 flex h-15 items-center border-t border-[#e4e9e9] px-4">
          <div className="flex min-w-0 items-center gap-5 text-[#5f8096]">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 font-manrope text-sm leading-5.5"
            >
              <Eye aria-hidden="true" size={15} strokeWidth={1.5} />
              View
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 font-manrope text-sm leading-5.5"
            >
              <PencilLine aria-hidden="true" size={15} strokeWidth={1.5} />
              Edit
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 font-manrope text-sm leading-5.5"
            >
              <Copy aria-hidden="true" size={15} strokeWidth={1.5} />
              Duplicate
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 font-manrope text-sm leading-5.5"
            >
              <Archive aria-hidden="true" size={15} strokeWidth={1.5} />
              Archive
            </button>
          </div>
          <button
            type="button"
            aria-label={`Delete ${activity.title}`}
            className="ml-auto shrink-0 text-[#fb6464]"
          >
            <Trash2 aria-hidden="true" size={15} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </article>
  );
}
