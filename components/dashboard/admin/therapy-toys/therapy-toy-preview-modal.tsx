'use client';

import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { ExternalLink, Pencil, X } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';

type TherapyToyPreviewModalProps = {
  isOpen: boolean;
  onClose: (open: boolean) => void;
};

function ToyDetailChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-[#dceeee] px-2.5 py-0.5 font-nunito text-xs font-medium leading-4 text-[#174a4d]">
      {children}
    </span>
  );
}

export function TherapyToyPreviewModal({ isOpen, onClose }: TherapyToyPreviewModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="block w-174.75 max-w-[calc(100%-2rem)] gap-0 overflow-y-auto rounded-xl border border-[#e8ebe8] bg-white p-6 text-[#263238] shadow-[0_1px_1.5px_rgba(0,0,0,0.1),0_1px_1px_rgba(0,0,0,0.1)] ring-0 sm:max-w-174.75 md:max-h-[calc(100dvh-2rem)]"
      >
        <DialogTitle className="sr-only">Kinetic Sand Sandbox Kit</DialogTitle>

        <div className="flex gap-5.75 max-md:flex-col max-md:gap-5">
          <div className="flex w-64.25 shrink-0 flex-col gap-4 max-md:w-full">
            <div className="relative h-55.75 overflow-hidden rounded-2xl max-md:h-64">
              <Image
                src="/Home/therapy-toy-kinetic-sand.png"
                alt="Kinetic Sand Sandbox Kit main product view"
                fill
                className="object-cover object-[center_top]"
                sizes="(max-width: 767px) calc(100vw - 5rem), 257px"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative h-36.75 overflow-hidden rounded-2xl">
                <Image
                  src="/Home/therapy-toy-kinetic-sand.png"
                  alt="Kinetic Sand Sandbox Kit product view one"
                  fill
                  className="object-cover object-[center_18%]"
                  sizes="120px"
                />
              </div>
              <div className="relative h-36.75 overflow-hidden rounded-2xl">
                <Image
                  src="/Home/therapy-toy-kinetic-sand.png"
                  alt="Kinetic Sand Sandbox Kit product view two"
                  fill
                  className="object-cover object-[right_18%]"
                  sizes="120px"
                />
              </div>
            </div>
          </div>

          <div className="flex h-96.5 min-w-0 flex-1 flex-col justify-between max-md:h-auto max-md:gap-6">
            <div className="flex flex-col gap-6">
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 flex-col gap-3">
                  <span className="w-fit rounded-full bg-[#f2b59f] px-2.5 py-0.5 font-nunito text-xs font-medium leading-4 text-[#263238]">
                    New
                  </span>
                  <h2 className="font-nunito text-xl font-bold leading-6 text-[#263238]">
                    Kinetic Sand Sandbox Kit
                  </h2>
                  <div className="flex flex-wrap gap-1.5">
                    <ToyDetailChip>3 yr+</ToyDetailChip>
                    <ToyDetailChip>Sensory</ToyDetailChip>
                    <ToyDetailChip>Creativity</ToyDetailChip>
                  </div>
                  <p className="font-nunito text-xl font-bold leading-6 text-[#263238]">$24.99</p>
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
                  Kinetic sand provides dense proprioceptive input to the hands without the mess of
                  real sand. It stays moist without water, molds easily, and satisfies
                  sensory-seeking children for far longer than most toys. Our OT team reaches for it
                  constantly in clinic.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://www.fatbraintoys.com/"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 min-w-0 flex-1 items-center justify-center gap-2 rounded-full bg-[#2f7d7e] py-2.5 font-manrope text-sm font-semibold leading-5 text-white transition-colors hover:bg-[#266b6c]"
              >
                Shop Now
                <ExternalLink aria-hidden="true" size={13} strokeWidth={1.8} />
              </a>
              <button
                type="button"
                aria-label="Edit Kinetic Sand Sandbox Kit"
                onClick={() => toast.message('Therapy toy editing is ready to continue.')}
                className="flex size-10.5 shrink-0 items-center justify-center rounded-2xl border border-[#ece8e2] bg-white text-[#8b9598] transition-colors hover:bg-[#fcfaf7] hover:text-[#2f7d7e]"
              >
                <Pencil aria-hidden="true" size={12} strokeWidth={1.7} />
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
