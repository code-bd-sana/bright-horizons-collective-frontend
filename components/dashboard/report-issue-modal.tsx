'use client';

import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

type ReportIssueModalProps = { isOpen: boolean; onClose: (open: boolean) => void };

export function ReportIssueModal({ isOpen, onClose }: ReportIssueModalProps) {
  const [issueArea, setIssueArea] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onClose(false);
    toast.success('Your issue report has been submitted.');
    setIssueArea('');
    setDescription('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="w-171 max-w-[calc(100%-2rem)] gap-0 rounded-2xl border border-[#eff1ef] bg-white p-8 text-[#263238] shadow-none sm:max-w-225"
      >
        <div className="flex items-center justify-between">
          <DialogTitle className="font-nunito text-2xl font-semibold leading-8 text-[#263238]">
            Report a Technical Issue
          </DialogTitle>
          <DialogClose
            aria-label="Close issue report"
            className="rounded-sm p-1 text-[#667085] outline-none focus-visible:ring-2 focus-visible:ring-[#2f7d7e]"
          >
            <X size={20} strokeWidth={1.3} />
          </DialogClose>
        </div>
        <form className="mt-8" onSubmit={handleSubmit}>
          <label className="block font-manrope text-lg font-medium leading-6.75 tracking-[-0.27px]">
            Issue Area
            <input
              value={issueArea}
              onChange={(event) => setIssueArea(event.target.value)}
              placeholder="Write issue area..."
              required
              className="mt-1.5 h-11 w-full rounded-full border border-[#d8ddd9] px-4 font-manrope text-base leading-6 tracking-[-0.176px] text-[#515b60] shadow-[0_1px_2px_rgba(16,24,40,0.05)] outline-none placeholder:text-[#515b60] focus:border-[#2f7d7e]"
            />
          </label>
          <label className="mt-8 block font-manrope text-base leading-6 tracking-[-0.176px]">
            Description of Issue
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Please provide as much detail as possible..."
              required
              className="mt-1.5 h-37.5 w-full resize-none rounded-md border border-[#dce4ed] p-4 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#515b60] shadow-[0_1px_2px_rgba(16,24,40,0.05)] outline-none placeholder:text-[#a8adaf] focus:border-[#2f7d7e]"
            />
          </label>
          <div className="mt-8 flex gap-4">
            <button
              type="button"
              onClick={() => onClose(false)}
              className="h-14 w-30.75 rounded-full border border-[#d4d6d7] font-nunito text-base font-medium tracking-[-0.176px] text-[#14094b]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-14 w-46.75 rounded-full border border-[#d5e5e5] bg-[#2f7d7e] font-nunito text-base font-medium tracking-[-0.176px] text-white"
            >
              Report Issue
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
