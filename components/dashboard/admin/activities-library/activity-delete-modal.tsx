'use client';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { AlertTriangle, Trash2 } from 'lucide-react';
import type { ActivityItem } from './activities-library-data';

type ActivityDeleteModalProps = {
  activity: ActivityItem | null;
  onClose: (open: boolean) => void;
  onConfirm: (activity: ActivityItem) => void;
};

export function ActivityDeleteModal({ activity, onClose, onConfirm }: ActivityDeleteModalProps) {
  return (
    <Dialog open={Boolean(activity)} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="w-md max-w-[calc(100%-2rem)] gap-5 rounded-2xl border-0 bg-white p-6 shadow-[0_20px_30px_rgba(0,0,0,0.12)] sm:max-w-md"
      >
        {activity && (
          <>
            <div className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-[14px] bg-[#fce9e2] text-[#e57373]">
                <Trash2 aria-hidden="true" size={22} strokeWidth={1.8} />
              </span>
              <div className="w-84">
                <DialogTitle className="font-nunito text-xl font-bold leading-7.5 text-[#263238]">
                  Delete Activities?
                </DialogTitle>
                <p className="pt-1.5 font-manrope text-sm leading-5.6 text-[#607d8b]">
                  Deleting “{activity.title}” permanently removes it and may affect assignment
                  history.
                </p>
                <p className="mt-3 flex items-center gap-2 rounded-[14px] bg-[#fce9e2] px-3 py-2 font-manrope text-[13px] leading-[19.5px] text-[#e57373]">
                  <AlertTriangle aria-hidden="true" size={14} strokeWidth={1.8} />
                  This activity is currently assigned to 41 families.
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-3 border-t border-[#e7eceb] pt-2.25">
              <button
                type="button"
                onClick={() => onClose(false)}
                className="rounded-[14px] border border-[#e7eceb] px-5.25 py-2.75 font-manrope text-sm font-semibold leading-5 text-[#607d8b] transition-colors hover:bg-[#f8fbfa]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => onConfirm(activity)}
                className="rounded-[14px] bg-[#e57373] px-5 py-2.5 font-manrope text-sm font-semibold leading-5 text-white transition-colors hover:bg-[#cf6262]"
              >
                Delete Permanently
              </button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
