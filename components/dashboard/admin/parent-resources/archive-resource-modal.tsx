'use client';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Archive } from 'lucide-react';
import type { ParentResource } from './parent-resources-types';

type ArchiveResourceModalProps = {
  resource: ParentResource | null;
  onClose: (open: boolean) => void;
  onConfirm: (resource: ParentResource) => void;
};

export function ArchiveResourceModal({ resource, onClose, onConfirm }: ArchiveResourceModalProps) {
  return (
    <Dialog open={Boolean(resource)} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="w-108 max-w-[calc(100%-2rem)] gap-5 rounded-2xl border-0 bg-white p-6 shadow-[0_20px_30px_rgba(0,0,0,0.12)] sm:max-w-108"
      >
        {resource && (
          <>
            <div className="flex items-start justify-between gap-4">
              <div className="w-84">
                <DialogTitle className="font-nunito text-xl font-bold leading-7.5 text-[#263238]">
                  Archive Resource?
                </DialogTitle>
                <p className="pt-1.5 font-manrope text-sm leading-5.6 text-[#607d8b]">
                  “{resource.title}” will no longer appear in the Parent Dashboard but can be
                  restored later.
                </p>
              </div>
              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#fff8e1] text-[#b8860b]">
                <Archive aria-hidden="true" size={20} strokeWidth={1.7} />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => onClose(false)}
                className="rounded-[14px] border border-[#e7eceb] px-5.25 py-2.75 font-manrope text-sm font-semibold leading-5 text-[#607d8b]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => onConfirm(resource)}
                className="rounded-[14px] bg-[#b8860b] px-5 py-2.5 font-manrope text-sm font-semibold leading-5 text-white"
              >
                Archive
              </button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
