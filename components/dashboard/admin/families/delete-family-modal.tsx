'use client';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Loader2, Trash2 } from 'lucide-react';
import type { FamilyItem } from './hooks/use-admin-families';

type DeleteFamilyModalProps = {
  family: FamilyItem | null;
  isOpen: boolean;
  onClose: (open: boolean) => void;
  onConfirm: () => void;
  isPending?: boolean;
};

export function DeleteFamilyModal({
  family,
  isOpen,
  onClose,
  onConfirm,
  isPending = false,
}: DeleteFamilyModalProps) {
  if (!family) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="max-h-[calc(100dvh-2rem)] w-md max-w-[calc(100%-2rem)] gap-5 overflow-y-auto rounded-2xl border-0 bg-white p-4 text-[#263238] shadow-[0_20px_30px_rgba(0,0,0,0.12)] sm:max-w-md sm:p-6 2xl:p-6"
      >
        <div className="flex items-start gap-3 sm:gap-4 2xl:gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-[14px] bg-[#fef2f2] text-[#dc2626]">
            <Trash2 aria-hidden="true" size={22} strokeWidth={1.5} />
          </span>
          <div className="min-w-0 flex-1">
            <DialogTitle className="font-nunito text-xl font-bold leading-7.5 text-[#263238]">
              Delete Family Account?
            </DialogTitle>
            <p className="pt-1.5 font-manrope text-sm leading-5.5 text-[#607d8b]">
              Are you sure you want to permanently delete{' '}
              <strong className="font-semibold text-[#263238]">{family.name}</strong>&apos;s family
              account? This will permanently remove their parent profile, registered children, and
              associated records. This action cannot be undone.
            </p>
          </div>
        </div>
        <div className="flex flex-col-reverse gap-3 border-t border-[#e7eceb] pt-3 sm:flex-row sm:justify-end 2xl:flex-row 2xl:justify-end">
          <button
            type="button"
            disabled={isPending}
            onClick={() => onClose(false)}
            className="w-full rounded-[14px] border border-[#e7eceb] px-5.25 py-2.75 font-manrope text-sm font-semibold leading-5 text-[#607d8b] transition-colors hover:bg-[#f8fbfa] disabled:opacity-50 sm:w-auto 2xl:w-auto"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isPending}
            onClick={onConfirm}
            className="flex items-center justify-center gap-2 rounded-[14px] bg-[#dc2626] px-5 py-2.5 font-manrope text-sm font-semibold leading-5 text-white transition-colors hover:bg-[#b91c1c] disabled:opacity-60 sm:w-auto 2xl:w-auto"
          >
            {isPending && <Loader2 size={15} className="animate-spin" />}
            <span>Delete Family</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
