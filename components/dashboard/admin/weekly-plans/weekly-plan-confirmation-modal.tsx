'use client';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Archive, Trash2, TriangleAlert } from 'lucide-react';
import type { AdminWeeklyPlan } from './weekly-plans-data';

type WeeklyPlanConfirmationModalProps = {
  action: 'archive' | 'delete' | null;
  plan: AdminWeeklyPlan | null;
  onClose: (open: boolean) => void;
  onConfirm: () => void;
};

export function WeeklyPlanConfirmationModal({
  action,
  plan,
  onClose,
  onConfirm,
}: WeeklyPlanConfirmationModalProps) {
  const isArchive = action === 'archive';
  const title = isArchive ? 'Archive Weekly Plan?' : 'Delete Weekly Plan?';

  return (
    <Dialog open={Boolean(action && plan)} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="max-h-[calc(100dvh-2rem)] w-md max-w-[calc(100%-2rem)] gap-5 overflow-y-auto rounded-2xl border-0 bg-white p-4 shadow-[0_20px_30px_rgba(0,0,0,0.12)] sm:max-w-md sm:p-6 2xl:p-6"
      >
        {plan && action ? (
          <>
            <div className="flex items-start gap-3 sm:gap-4 2xl:gap-4">
              <span
                className={`flex size-12 shrink-0 items-center justify-center rounded-[14px] ${isArchive ? 'bg-[#fff8e1] text-[#b8860b]' : 'bg-[#fce9e2] text-[#e57373]'}`}
              >
                {isArchive ? (
                  <Archive aria-hidden="true" size={22} strokeWidth={1.7} />
                ) : (
                  <Trash2 aria-hidden="true" size={22} strokeWidth={1.7} />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <DialogTitle className="font-nunito text-xl font-bold leading-7.5 text-[#263238]">
                  {title}
                </DialogTitle>
                <p className="pt-1.5 font-manrope text-sm leading-5.5 text-[#607d8b]">
                  {isArchive
                    ? `“${plan.title}” will be removed from the active library. Archived plans remain available for historical records but cannot be assigned.`
                    : `Deleting “${plan.title}” permanently removes it and may affect assignment history.`}
                </p>
                {!isArchive ? (
                  <div className="mt-3 flex w-full items-start gap-2 rounded-[14px] bg-[#fce9e2] px-3 py-2 sm:items-center 2xl:items-center">
                    <TriangleAlert
                      aria-hidden="true"
                      className="size-3.5 shrink-0 text-[#e57373]"
                      strokeWidth={1.7}
                    />
                    <p className="font-manrope text-[13px] leading-4.75 text-[#e57373]">
                      This plan is currently assigned to {plan.assigned}.
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col-reverse gap-3 border-t border-[#e7eceb] pt-2.25 sm:flex-row sm:justify-end 2xl:flex-row 2xl:justify-end">
              <button
                type="button"
                onClick={() => onClose(false)}
                className="w-full rounded-[14px] border border-[#e7eceb] px-5.25 py-2.75 font-manrope text-sm font-semibold leading-5 text-[#607d8b] sm:w-auto 2xl:w-auto"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className={`w-full rounded-[14px] px-5 py-2.5 font-manrope text-sm font-semibold leading-5 text-white sm:w-auto 2xl:w-auto ${isArchive ? 'bg-[#b8860b]' : 'bg-[#e57373]'}`}
              >
                {isArchive ? 'Archive' : 'Delete'}
              </button>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
