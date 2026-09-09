'use client';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Trash2 } from 'lucide-react';
import type { ParentResource } from './parent-resources-types';

type DeleteResourceModalProps = {
  resource: ParentResource | null;
  onClose: (open: boolean) => void;
  onConfirm: (resource: ParentResource) => void;
};

export function DeleteResourceModal({ resource, onClose, onConfirm }: DeleteResourceModalProps) {
  return (
    <Dialog open={Boolean(resource)} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="max-h-[calc(100dvh-2rem)] w-108 max-w-[calc(100%-2rem)] gap-5 overflow-y-auto rounded-2xl border-0 bg-white p-4 shadow-[0_20px_30px_rgba(0,0,0,0.12)] sm:max-w-108 sm:p-6 2xl:p-6"
      >
        {resource && (
          <>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <DialogTitle className="font-nunito text-xl font-bold leading-7.5 text-[#263238]">
                  Delete Resource?
                </DialogTitle>
                <p className="pt-1.5 font-manrope text-sm leading-5.6 text-[#607d8b]">
                  Deleting “{resource.title}” permanently removes it from the platform and cannot be
                  undone.
                </p>
              </div>
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#fce9e2] text-[#e57373]">
                <Trash2 aria-hidden="true" size={20} strokeWidth={1.7} />
              </div>
            </div>
            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end 2xl:flex-row 2xl:justify-end">
              <button
                type="button"
                onClick={() => onClose(false)}
                className="w-full rounded-[14px] border border-[#e7eceb] px-5.25 py-2.75 font-manrope text-sm font-semibold leading-5 text-[#607d8b] sm:w-auto 2xl:w-auto"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => onConfirm(resource)}
                className="w-full rounded-[14px] bg-[#e57373] px-5 py-2.5 font-manrope text-sm font-semibold leading-5 text-white sm:w-auto 2xl:w-auto"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
