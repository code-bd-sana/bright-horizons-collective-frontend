'use client';

import { ExternalLink, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Heart } from 'reicon';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { ReiconIcon } from '@/components/ui/reicon-icon';

interface TherapyToyModalProps {
  isOpen: boolean;
  onClose: (isOpen: boolean) => void;
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-[#DCEEEE] px-2.5 py-0.5 font-nunito text-xs font-medium leading-4 text-[#174A4D]">
      {children}
    </span>
  );
}

export function TherapyToyModal({ isOpen, onClose }: TherapyToyModalProps) {
  const [saved, setSaved] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="w-174.25 max-w-[calc(100%-2rem)] gap-0 rounded-xl bg-white p-6 text-[#263238] ring-0 sm:max-w-174.25 max-md:max-h-[calc(100dvh-2rem)] max-md:overflow-y-auto"
      >
        <DialogTitle className="sr-only">Kinetic Sand Sandbox Kit</DialogTitle>
        <div className="flex gap-5.75 max-md:flex-col">
          <div className="relative h-96.5 w-64.25 shrink-0 overflow-hidden rounded-lg max-md:h-64 max-md:w-full">
            <Image
              src="/Home/therapy-toy-kinetic-sand.png"
              alt="Pink wooden play kitchen"
              fill
              className="object-cover"
              sizes="257px"
            />
          </div>

          <div className="flex h-96.5 min-w-0 flex-1 flex-col justify-between max-md:h-auto max-md:gap-8">
            <div className="flex flex-col gap-6">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 flex-col gap-3">
                  <span className="w-fit rounded-full bg-[#F2B59F] px-2.5 py-0.5 font-nunito text-xs font-medium leading-4">
                    New
                  </span>
                  <h2 className="font-nunito text-xl font-bold leading-6">
                    Kinetic Sand Sandbox Kit
                  </h2>
                  <div className="flex flex-wrap gap-1.5">
                    <Chip>3 yr+</Chip>
                    <Chip>Sensory</Chip>
                    <Chip>Creativity</Chip>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onClose(false)}
                  aria-label="Close toy details"
                  className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#263238]/8 text-[#263238]"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                <p className="font-nunito text-sm font-medium leading-5 tracking-[-0.084px] text-[#607077]">
                  Why we love it
                </p>
                <p className="font-manrope text-sm leading-6 tracking-[-0.154px]">
                  Kinetic sand provides dense proprioceptive input to the hands without the mess of
                  real sand. It stays moist without water, molds easily, and satisfies
                  sensory-seeking children for far longer than most toys. Our OT team reaches for it
                  constantly in clinic.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSaved((value) => !value)}
                aria-label={saved ? 'Remove toy from saved' : 'Save toy'}
                className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-[#D8DDD9] bg-white text-[#607077]"
              >
                <ReiconIcon
                  icon={Heart}
                  size={20}
                  weight={saved ? 'Filled' : 'Outline'}
                  color={saved ? '#2F7D7E' : '#607077'}
                />
              </button>
              <a
                href="/explore"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 flex-1 items-center justify-center gap-2 rounded-full bg-[#2F7D7E] px-5 font-manrope text-sm font-semibold leading-5 text-white"
              >
                Shop Now <ExternalLink className="size-3.25" />
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default TherapyToyModal;
