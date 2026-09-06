'use client';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { TriangleAlert } from 'lucide-react';

type DeactivateFamilyModalProps = {
  familyName: string | null;
  onClose: (open: boolean) => void;
  onConfirm: () => void;
};

export function DeactivateFamilyModal({
  familyName,
  onClose,
  onConfirm,
}: DeactivateFamilyModalProps) {
  return (
    <Dialog open={Boolean(familyName)} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="w-md max-w-[calc(100%-2rem)] gap-5 rounded-2xl border-0 bg-white p-6 shadow-[0_20px_30px_rgba(0,0,0,0.12)] sm:max-w-md"
      >
        {familyName && (
          <>
            <div className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-[14px] bg-[#fce9e2] text-[#e57373]">
                <TriangleAlert aria-hidden="true" size={22} strokeWidth={1.5} />
              </span>
              <div className="w-84">
                <DialogTitle className="font-nunito text-xl font-bold leading-7.5 text-[#263238]">
                  Deactivate Account?
                </DialogTitle>
                <p className="pt-1.5 font-manrope text-sm leading-[22.4px] text-[#607d8b]">
                  Deactivating {familyName}&apos;s account will revoke login access. Their data,
                  children, and history will be preserved and the account can be reactivated at any
                  time.
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3 border-t border-[#e7eceb] pt-2.25">
              <button
                type="button"
                onClick={() => onClose(false)}
                className="rounded-[14px] border border-[#e7eceb] px-5.25 py-2.75 font-manrope text-sm font-semibold leading-5 text-[#607d8b]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className="rounded-[14px] bg-[#e57373] px-5 py-2.5 font-manrope text-sm font-semibold leading-5 text-white"
              >
                Deactivate
              </button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
