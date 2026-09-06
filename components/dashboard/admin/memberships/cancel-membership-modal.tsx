'use client';

import { TriangleAlert } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';

type CancelMembershipModalProps = {
  memberName: string;
};

export function CancelMembershipModal({ memberName }: CancelMembershipModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const confirmCancellation = () => {
    setIsOpen(false);
    toast.success(`${memberName}'s membership has been cancelled.`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex h-10.5 items-center justify-center rounded-[14px] border border-[rgba(229,115,115,0.25)] bg-[#fce9e2] px-4.25 py-2.75 font-manrope text-sm font-semibold leading-5 text-[#e57373] transition-colors hover:bg-[#f9dbd3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e57373]"
      >
        Cancel Membership
      </button>

      <DialogContent
        showCloseButton={false}
        className="block w-md max-w-[calc(100%-2rem)] rounded-2xl border-0 bg-white p-6 text-[#263238] shadow-[0_20px_30px_rgba(0,0,0,0.12)] ring-0 sm:max-w-md"
      >
        <div className="flex h-26 items-start gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-[14px] bg-[#fce9e2] text-[#e57373]">
            <TriangleAlert aria-hidden="true" size={22} strokeWidth={1.8} />
          </span>
          <div className="w-84">
            <DialogTitle className="font-nunito text-xl font-bold leading-7.5 text-[#263238]">
              Cancel Membership?
            </DialogTitle>
            <DialogDescription className="pt-1.5 font-manrope text-sm leading-[22.4px] text-[#607d8b]">
              This family will lose access to premium content and return to the{' '}
              <strong className="font-manrope font-bold text-[#607d8b]">Little Steps</strong> plan.
              This action can be reversed by upgrading again.
            </DialogDescription>
          </div>
        </div>

        <footer className="mt-5 flex h-12.75 items-start justify-end gap-3 border-t border-[#e7eceb] pt-2.25">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex h-10.5 items-center justify-center rounded-[14px] border border-[#e7eceb] px-5.25 py-2.75 font-manrope text-sm font-semibold leading-5 text-[#607d8b] transition-colors hover:bg-[#f8fbfa] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f7d7e]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={confirmCancellation}
            className="flex h-10.5 items-center justify-center rounded-[14px] bg-[#e57373] px-5 py-2.5 font-manrope text-sm font-semibold leading-5 text-white transition-colors hover:bg-[#cf5f5f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e57373]"
          >
            Confirm
          </button>
        </footer>
      </DialogContent>
    </Dialog>
  );
}
