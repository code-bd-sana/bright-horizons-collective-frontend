'use client';

import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { ExternalLink, Pencil, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import type { TherapyToy } from '@/features/therapy-toys/model/therapy-toy.types';

type TherapyToyPreviewModalProps = {
  toy: TherapyToy | null;
  onClose: (open: boolean) => void;
};

function ToyDetailChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-[#dceeee] px-2.5 py-0.5 font-nunito text-xs font-medium leading-4 text-[#174a4d]">
      {children}
    </span>
  );
}

const formatTier = (tier: string) =>
  tier
    .split('_')
    .map((part) => part[0] + part.slice(1).toLowerCase())
    .join(' ');

export function TherapyToyPreviewModal({ toy, onClose }: TherapyToyPreviewModalProps) {
  return (
    <Dialog open={Boolean(toy)} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="block max-h-[calc(100dvh-2rem)] w-174.75 max-w-[calc(100%-2rem)] gap-0 overflow-y-auto rounded-xl border border-[#e8ebe8] bg-white p-4 text-[#263238] shadow-[0_1px_1.5px_rgba(0,0,0,0.1),0_1px_1px_rgba(0,0,0,0.1)] ring-0 sm:max-w-174.75 sm:p-6 2xl:p-6"
      >
        <DialogTitle className="sr-only">{toy?.name ?? 'Therapy toy preview'}</DialogTitle>

        {toy ? (
          <div className="flex gap-5.75 max-md:flex-col max-md:gap-5">
            <div className="flex w-64.25 shrink-0 flex-col gap-4 max-md:w-full">
              <div className="relative flex h-52 items-center justify-center overflow-hidden rounded-2xl bg-[#f4f8f6] sm:h-64 md:h-55.75 2xl:h-55.75">
                {toy.imageUrl ? (
                  <Image
                    src={toy.imageUrl}
                    alt={toy.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 767px) calc(100vw - 5rem), 257px"
                  />
                ) : (
                  <span className="font-manrope text-sm text-[#607d8b]">No image</span>
                )}
              </div>
            </div>

            <div className="flex h-96.5 min-w-0 flex-1 flex-col justify-between max-md:h-auto max-md:gap-6">
              <div className="flex flex-col gap-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 flex-col gap-3">
                    <span className="w-fit rounded-full bg-[#dceeee] px-2.5 py-0.5 font-nunito text-xs font-medium leading-4 text-[#174a4d]">
                      {toy.status}
                    </span>
                    <h2 className="font-nunito text-xl font-bold leading-6 text-[#263238]">
                      {toy.name}
                    </h2>
                    <div className="flex flex-wrap gap-1.5">
                      <ToyDetailChip>
                        {toy.minAgeMonths}–{toy.maxAgeMonths} months
                      </ToyDetailChip>
                      <ToyDetailChip>{toy.developmentArea}</ToyDetailChip>
                      {toy.accessLevel.map((tier) => (
                        <ToyDetailChip key={tier}>{formatTier(tier)}</ToyDetailChip>
                      ))}
                    </div>
                    <p className="font-nunito text-xl font-bold leading-6 text-[#263238]">
                      {toy.price === null ? 'Price unavailable' : `$${toy.price.toFixed(2)}`}
                    </p>
                  </div>

                  <DialogClose
                    aria-label="Close therapy toy preview"
                    className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[rgba(38,50,56,0.08)] text-[#263238] outline-none transition-colors hover:bg-[rgba(38,50,56,0.14)] focus-visible:ring-2 focus-visible:ring-[#2f7d7e]"
                  >
                    <X aria-hidden="true" size={16} strokeWidth={1.75} />
                  </DialogClose>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="font-nunito text-sm font-medium leading-5 tracking-[-0.084px] text-[#607077]">
                    Why we love it
                  </p>
                  <p className="font-manrope text-sm leading-6 tracking-[-0.154px] text-[#263238]">
                    {toy.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href={`/dashboard/admin/therapy-toys/${toy.id}/edit`}
                  onClick={() => onClose(false)}
                  className="flex h-10 min-w-0 flex-1 items-center justify-center gap-2 rounded-full bg-[#2f7d7e] py-2.5 font-manrope text-sm font-semibold leading-5 text-white transition-colors hover:bg-[#266b6c]"
                >
                  Edit <Pencil aria-hidden="true" size={13} strokeWidth={1.8} />
                </Link>
                {toy.affiliateLink ? (
                  <a
                    href={toy.affiliateLink}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Open affiliate link"
                    className="flex size-10.5 shrink-0 items-center justify-center rounded-2xl border border-[#ece8e2] bg-white text-[#8b9598]"
                  >
                    <ExternalLink aria-hidden="true" size={13} strokeWidth={1.7} />
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
