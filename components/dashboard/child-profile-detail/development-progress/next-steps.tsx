import Image from 'next/image';
import { Bookmark, Clock, ArrowUpRight } from 'lucide-react';

export function NextSteps() {
  return (
    <div className="flex flex-col gap-8 rounded-2xl border border-[#D2E3DC] bg-[#E9F1EE] p-6 shadow-sm md:p-8">
      <div className="flex flex-col gap-2">
        <h2 className="font-nunito text-2xl font-medium leading-8 text-[#263238]">
          Recommended Next Steps
        </h2>
        <p className="font-nunito text-sm font-medium leading-5 tracking-[-0.006em] text-[#7D8488]">
          Suggested therapeutic exercises &amp; home resources for Emma
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Card 1 */}
        <div className="flex flex-col overflow-hidden rounded-3xl border border-[#E9F1EE] bg-white transition-shadow hover:shadow-md">
          <div className="relative h-71.5 w-full bg-[#A5C7B9]">
            <Image
              src="/Home/figma-child-detail-banner-emma.png"
              alt="Stacking & Sorting Challenge"
              fill
              className="object-cover opacity-80 mix-blend-multiply"
            />
            <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1">
              <span className="font-nunito text-xs font-medium text-[#174A4D]">Easy</span>
            </div>
            <button
              type="button"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm transition-colors hover:bg-white"
            >
              <Bookmark className="h-4 w-4 text-[#263238]" />
            </button>
          </div>
          <div className="flex flex-col gap-4 p-6">
            <h3 className="font-nunito text-2xl font-medium text-[#263238]">
              Stacking &amp; Sorting Challenge
            </h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1.5">
                <span className="rounded-full border border-[#DCEEEE] bg-[#F1F3F3] px-2 py-0.5 font-manrope text-xs font-medium text-[#174A4D]">
                  <span className="text-[#263238]">Material:</span>{' '}
                  <span className="text-[#7D8488]">Blocks</span>
                </span>
                <div className="flex items-center gap-1 px-2">
                  <Clock className="h-3 w-3 text-[#607077]" />
                  <span className="font-manrope text-xs text-[#607077]">20 min</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-[#ACCBCB] bg-white px-2 py-0.5 font-nunito text-xs font-medium text-[#2F7D7E]">
                  🏠 Indoor
                </span>
                <span className="rounded-full border border-[#ACCBCB] bg-white px-2 py-0.5 font-nunito text-xs font-medium text-[#2F7D7E]">
                  18–36 mo
                </span>
                <span className="rounded-full border border-[#ACCBCB] bg-white px-2 py-0.5 font-nunito text-xs font-medium text-[#2F7D7E]">
                  Fine Motor
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col overflow-hidden rounded-3xl border border-[#E9F1EE] bg-white transition-shadow hover:shadow-md">
          <div className="relative h-71.5 w-full bg-[#E0E7FF]">
            <Image
              src="/Home/figma-child-detail-banner-emma.png"
              alt="Parent Education"
              fill
              className="object-cover opacity-80 mix-blend-multiply"
            />
            <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1">
              <span className="font-nunito text-xs font-medium text-[#174A4D]">OT Favorite</span>
            </div>
            <button
              type="button"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-sm transition-colors hover:bg-white"
            >
              <Bookmark className="h-4 w-4 text-[#263238]" />
            </button>
          </div>
          <div className="flex flex-col gap-3 p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-nunito text-xl font-medium text-[#263238]">Parent Education</h3>
              <span className="font-manrope text-sm text-[#7D8488]">5 min Read</span>
            </div>
            <p className="font-manrope text-sm text-[#7D8488]">
              OT-written articles on development, play, and everyday strategies
            </p>
            <button
              type="button"
              className="mt-2 flex w-fit items-center gap-1 font-manrope text-sm font-semibold tracking-[0.04em] text-[#2F7D7E] hover:underline"
            >
              Explore
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
