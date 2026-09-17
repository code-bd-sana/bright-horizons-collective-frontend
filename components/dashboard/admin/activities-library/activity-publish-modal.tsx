'use client';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Globe, Loader2 } from 'lucide-react';
import type { Activity } from '@/features/activities/model/activity.types';

type ActivityPublishModalProps = {
  activity: Activity | null;
  isPublishing?: boolean;
  onClose: (open: boolean) => void;
  onConfirm: (activity: Activity) => void;
};

export function ActivityPublishModal({
  activity,
  isPublishing = false,
  onClose,
  onConfirm,
}: ActivityPublishModalProps) {
  return (
    <Dialog open={Boolean(activity)} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="max-h-[calc(100dvh-2rem)] w-md max-w-[calc(100%-2rem)] gap-5 overflow-y-auto rounded-2xl border-0 bg-white p-4 shadow-[0_20px_30px_rgba(0,0,0,0.12)] sm:max-w-md sm:p-6"
      >
        {activity && (
          <>
            <div className="flex items-start gap-3 sm:gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-[14px] bg-[#eaf7f5] text-[#2f7d7e]">
                <Globe aria-hidden="true" size={22} strokeWidth={1.8} />
              </span>
              <div className="min-w-0 flex-1">
                <DialogTitle className="font-nunito text-xl font-bold leading-7.5 text-[#263238]">
                  Publish Activity?
                </DialogTitle>
                <p className="pt-1.5 font-manrope text-sm leading-5.6 text-[#607d8b]">
                  “{activity.title}” will be restored to the active library and made available to
                  parents and weekly plans.
                </p>
              </div>
            </div>
            <div className="flex flex-col-reverse gap-3 border-t border-[#e7eceb] pt-2.25 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={isPublishing}
                onClick={() => onClose(false)}
                className="w-full rounded-[14px] border border-[#e7eceb] px-5.25 py-2.75 font-manrope text-sm font-semibold leading-5 text-[#607d8b] transition-colors hover:bg-[#f8fbfa] disabled:opacity-50 sm:w-auto"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isPublishing}
                onClick={() => onConfirm(activity)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-[14px] bg-[#2f7d7e] px-5 py-2.5 font-manrope text-sm font-semibold leading-5 text-white transition-colors hover:bg-[#276d6e] disabled:opacity-50 sm:w-auto"
              >
                {isPublishing && <Loader2 className="size-4 animate-spin" />}
                Publish
              </button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
