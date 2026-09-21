'use client';

// Feedback dialog.
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useCreateTicket } from '@/features/support/hooks/support.mutations';
import { Loader2, Star, X } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

type SendFeedbackModalProps = { isOpen: boolean; onClose: (open: boolean) => void };

export function SendFeedbackModal({ isOpen, onClose }: SendFeedbackModalProps) {
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState('');
  const createTicketMutation = useCreateTicket();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!comments.trim()) return;

    try {
      await createTicketMutation.mutateAsync({
        type: 'FEEDBACK',
        subject: 'Product Feedback',
        message: comments.trim(),
        rating,
      });
      toast.success('Thank you for your feedback!');
      setRating(5);
      setComments('');
      onClose(false);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unable to submit feedback.';
      toast.error(errorMessage);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="w-171 max-h-[calc(100dvh-2rem)] max-w-[calc(100%-2rem)] gap-0 overflow-y-auto rounded-2xl border border-[#eff1ef] bg-white p-4 text-[#263238] shadow-none sm:p-8 sm:max-w-225"
      >
        <div className="flex items-center justify-between">
          <DialogTitle className="font-nunito text-2xl font-semibold leading-8 text-[#263238]">
            Send Product Feedback
          </DialogTitle>
          <DialogClose
            aria-label="Close feedback"
            className="rounded-sm p-1 text-[#667085] outline-none focus-visible:ring-2 focus-visible:ring-[#2f7d7e]"
          >
            <X size={20} strokeWidth={1.3} />
          </DialogClose>
        </div>
        <form className="mt-8" onSubmit={handleSubmit}>
          <fieldset>
            <legend className="font-manrope text-lg font-medium leading-6.75 tracking-[-0.27px]">
              Overall Satisfaction
            </legend>
            <div className="mt-2 flex gap-3" aria-label="Overall Satisfaction">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-label={`${value} star${value === 1 ? '' : 's'}`}
                  aria-pressed={rating === value}
                  disabled={createTicketMutation.isPending}
                  onClick={() => setRating(value)}
                  className="text-[#f59e0b] outline-none focus-visible:ring-2 focus-visible:ring-[#2f7d7e] disabled:opacity-60"
                >
                  <Star
                    size={26}
                    strokeWidth={1.8}
                    fill={value <= rating ? 'currentColor' : 'none'}
                  />
                </button>
              ))}
            </div>
          </fieldset>
          <label className="mt-9 block font-manrope text-base leading-6 tracking-[-0.176px]">
            Your Comments
            <textarea
              value={comments}
              onChange={(event) => setComments(event.target.value)}
              placeholder="Tell us what you love or what we can improve..."
              required
              disabled={createTicketMutation.isPending}
              className="mt-1.5 h-37.5 w-full resize-none rounded-md border border-[#dce4ed] p-4 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#515b60] shadow-[0_1px_2px_rgba(16,24,40,0.05)] outline-none placeholder:text-[#a8adaf] focus:border-[#2f7d7e] disabled:opacity-60"
            />
          </label>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <button
              type="button"
              onClick={() => onClose(false)}
              disabled={createTicketMutation.isPending}
              className="h-14 w-full rounded-full border border-[#d4d6d7] font-nunito text-base font-medium tracking-[-0.176px] text-[#14094b] sm:w-30.75 disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createTicketMutation.isPending}
              className="flex h-14 w-full items-center justify-center gap-2 rounded-full border border-[#d5e5e5] bg-[#2f7d7e] font-nunito text-base font-medium tracking-[-0.176px] text-white sm:w-46.75 disabled:opacity-60"
            >
              {createTicketMutation.isPending ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <span>Submit Feedback</span>
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
