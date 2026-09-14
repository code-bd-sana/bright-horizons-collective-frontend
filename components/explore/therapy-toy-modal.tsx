'use client';

import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { ReiconIcon } from '@/components/ui/reicon-icon';
import type { TherapyToyModalToy } from '@/features/therapy-toys/model/therapy-toy.types';
import { ExternalLink, X } from 'lucide-react';
import Image from 'next/image';
import { Heart } from 'reicon';

export type { TherapyToyModalToy } from '@/features/therapy-toys/model/therapy-toy.types';

type TherapyToyModalProps = {
  toy: TherapyToyModalToy | null;
  saved: boolean;
  saving: boolean;
  canSave: boolean;
  onSavedChange: (saved: boolean) => void;
  onLoginRequired?: () => void;
  onClose: (open: boolean) => void;
};

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-[#DCEEEE] px-2.5 py-0.5 font-nunito text-xs font-medium leading-4 text-[#174A4D]">
      {children}
    </span>
  );
}

export function TherapyToyModal({
  toy,
  saved,
  saving,
  canSave,
  onSavedChange,
  onLoginRequired,
  onClose,
}: TherapyToyModalProps) {
  const gallery = toy
    ? [toy.imageUrl, ...(toy.galleryImages ?? [])].filter((image): image is string =>
        Boolean(image)
      )
    : [];

  return (
    <Dialog open={Boolean(toy)} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="w-174.25 max-w-[calc(100%-2rem)] gap-0 rounded-xl bg-white p-6 text-[#263238] ring-0 max-md:max-h-[calc(100dvh-2rem)] max-md:overflow-y-auto max-sm:p-4 sm:max-w-174.25"
      >
        {toy ? (
          <>
            <DialogTitle className="sr-only">{toy.name}</DialogTitle>
            <div className="flex gap-5.75 max-md:flex-col max-md:gap-4">
              <div className="flex w-64.25 shrink-0 flex-col gap-3 max-md:w-full">
                <div className="relative h-64 overflow-hidden rounded-lg bg-[#f4f8f6] max-md:h-64 max-sm:h-48">
                  {gallery[0] ? (
                    <Image
                      src={gallery[0]}
                      alt={toy.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 767px) 100vw, 257px"
                    />
                  ) : (
                    <span className="flex h-full items-center justify-center font-manrope text-sm text-[#607077]">
                      No image available
                    </span>
                  )}
                </div>
                {gallery.length > 1 ? (
                  <div className="grid grid-cols-3 gap-2">
                    {gallery.slice(0, 3).map((image, index) => (
                      <div
                        key={`${image}-${index}`}
                        className="relative h-20 overflow-hidden rounded-xl bg-[#f4f8f6]"
                      >
                        <Image
                          src={image}
                          alt={`${toy.name} view ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="flex min-w-0 flex-1 flex-col justify-between gap-6 max-md:gap-5">
                <div className="flex flex-col gap-6 max-sm:gap-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 flex-col gap-3 max-sm:gap-2">
                      {toy.badge ? (
                        <span className="w-fit rounded-full bg-[#F2B59F] px-2.5 py-0.5 font-nunito text-xs font-medium leading-4">
                          {toy.badge}
                        </span>
                      ) : null}
                      <h2 className="font-nunito text-xl font-bold leading-6 max-sm:text-lg">
                        {toy.name}
                      </h2>
                      <div className="flex flex-wrap gap-1.5">
                        <Chip>
                          {toy.minAgeMonths}–{toy.maxAgeMonths} months
                        </Chip>
                        {toy.developmentAreas.map((area) => (
                          <Chip key={area}>{area}</Chip>
                        ))}
                      </div>
                      <p className="font-nunito text-xl font-bold leading-6">
                        {toy.price === null ? 'Price unavailable' : `$${toy.price.toFixed(2)}`}
                      </p>
                    </div>
                    <DialogClose
                      aria-label="Close toy details"
                      className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#263238]/8 text-[#263238]"
                    >
                      <X className="size-4" />
                    </DialogClose>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="font-nunito text-sm font-medium leading-5 text-[#607077]">
                      Why we love it
                    </p>
                    <p className="whitespace-pre-wrap font-manrope text-sm leading-6">
                      {toy.description}
                    </p>
                  </div>
                  <p className="font-manrope text-xs leading-4.5 text-[#607077]">
                    Affiliate disclosure: We may earn a commission when you purchase through this
                    link, at no additional cost to you.
                  </p>
                </div>

                <div className="flex items-center gap-3 max-sm:flex-col max-sm:items-stretch">
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => (canSave ? onSavedChange(!saved) : onLoginRequired?.())}
                    aria-label={saved ? 'Remove toy from saved' : 'Save toy'}
                    className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-[#D8DDD9] bg-white text-[#607077] disabled:cursor-not-allowed disabled:opacity-50 max-sm:self-center"
                  >
                    <ReiconIcon
                      icon={Heart}
                      size={20}
                      weight={saved ? 'Filled' : 'Outline'}
                      color={saved ? '#2F7D7E' : '#607077'}
                    />
                  </button>
                  {toy.affiliateLink ? (
                    <a
                      href={toy.affiliateLink}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
                      className="flex h-10 flex-1 items-center justify-center gap-2 rounded-full bg-[#2F7D7E] px-5 font-manrope text-sm font-semibold leading-5 text-white"
                    >
                      Shop Now <ExternalLink className="size-3.25" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="flex h-10 flex-1 cursor-not-allowed items-center justify-center rounded-full bg-[#2F7D7E]/50 px-5 font-manrope text-sm font-semibold leading-5 text-white"
                    >
                      Shop link unavailable
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

export default TherapyToyModal;
