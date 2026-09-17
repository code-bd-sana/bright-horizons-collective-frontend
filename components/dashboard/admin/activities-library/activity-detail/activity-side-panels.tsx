'use client';

import { ArrowRight, Bookmark, Check, Loader2, ShieldCheck, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import {
  useToggleActivityComplete,
  useToggleActivityFavorite,
} from '@/features/activities/hooks/activities.mutations';
import type { Activity } from '@/features/activities/model/activity.types';

export function ActivitySidePanels({ activity }: { activity: Activity }) {
  const isCompleted = Boolean(activity.isCompleted);
  const isFavorited = Boolean(activity.isFavorited);

  const toggleFavoriteMutation = useToggleActivityFavorite();
  const toggleCompleteMutation = useToggleActivityComplete();

  const handleToggleFavorite = () => {
    toggleFavoriteMutation.mutate(activity.id, {
      onSuccess: (data) => {
        if (data?.status === 'favorited') {
          toast.success('Activity saved for later');
        } else {
          toast.success('Removed from saved activities');
        }
      },
      onError: () => {
        toast.error('Failed to update favorite status');
      },
    });
  };

  const handleComplete = () => {
    if (isCompleted) return;
    toggleCompleteMutation.mutate(activity.id, {
      onSuccess: () => {
        toast.success('Activity marked as completed');
      },
      onError: () => {
        toast.error('Failed to complete activity');
      },
    });
  };

  const parentTipsList = activity.parentTips
    ? activity.parentTips
        .split(/\r?\n+/)
        .map((t) => t.trim().replace(/^[-*•\d.]+\s*/, ''))
        .filter(Boolean)
    : [];

  const safetyNotesList = activity.safetyNotes
    ? activity.safetyNotes
        .split(/\r?\n+/)
        .map((n) => n.trim().replace(/^[-*•\d.]+\s*/, ''))
        .filter(Boolean)
    : [];

  return (
    <aside className="grid min-w-0 grid-cols-1 gap-6 sm:grid-cols-2 2xl:block 2xl:space-y-6">
      <section className="rounded-2xl border border-[#e8ebe8] bg-white p-4 shadow-[0_1px_1px_rgba(0,0,0,0.05)] sm:p-6 2xl:p-8">
        <p className="font-nunito text-xs font-medium uppercase leading-4 text-[#7d8488]">
          Ready to begin?
        </p>

        {/* Complete Activity Button - Once completed, it cannot be undone */}
        <button
          type="button"
          disabled={isCompleted || toggleCompleteMutation.isPending}
          onClick={handleComplete}
          className={`mt-5 flex h-10 w-full items-center justify-center gap-2 rounded-full font-manrope text-sm leading-5.5 font-medium transition-colors ${
            isCompleted
              ? 'bg-[#27898a] text-white cursor-default'
              : 'bg-[#2f7d7e] text-white hover:bg-[#276a6b] disabled:opacity-60'
          }`}
        >
          {toggleCompleteMutation.isPending ? (
            <Loader2 aria-hidden="true" size={16} className="animate-spin text-white" />
          ) : isCompleted ? (
            <Check aria-hidden="true" size={16} strokeWidth={2.5} />
          ) : null}
          <span>{isCompleted ? 'Activity Completed' : 'Complete Activity'}</span>
          {!isCompleted && !toggleCompleteMutation.isPending && (
            <ArrowRight aria-hidden="true" size={15} />
          )}
        </button>

        {/* Save for Later Button */}
        <button
          type="button"
          disabled={toggleFavoriteMutation.isPending}
          onClick={handleToggleFavorite}
          className={`mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-full border font-manrope text-sm leading-5.5 font-medium transition-colors disabled:opacity-60 ${
            isFavorited
              ? 'border-[#2f7d7e] bg-[#f0f8f7] text-[#2f7d7e]'
              : 'border-[#d8ddd9] bg-white text-[#515b60] hover:border-[#2f7d7e] hover:text-[#2f7d7e]'
          }`}
        >
          {toggleFavoriteMutation.isPending ? (
            <Loader2 aria-hidden="true" size={16} className="animate-spin text-[#2f7d7e]" />
          ) : (
            <Bookmark
              aria-hidden="true"
              size={15}
              strokeWidth={1.5}
              fill={isFavorited ? 'currentColor' : 'none'}
            />
          )}
          <span>{isFavorited ? 'Saved for Later' : 'Save for Later'}</span>
        </button>
      </section>

      {parentTipsList.length > 0 && (
        <section className="rounded-2xl border border-[#e8ebe8] bg-white p-4 shadow-[0_1px_1px_rgba(0,0,0,0.05)] sm:p-6 2xl:p-8">
          <h2 className="font-nunito text-2xl font-medium leading-8 text-[#263238]">Parent Tips</h2>
          <div className="mt-6 space-y-5">
            {parentTipsList.map((tip, index) => (
              <div key={`${tip}-${index}`} className="flex gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[#dceeee] font-nunito text-xs font-medium text-[#2f7d7e]">
                  {index + 1}
                </span>
                <p className="font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#263238]">
                  {tip}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {safetyNotesList.length > 0 && (
        <section className="rounded-2xl border border-[#fff0a8] bg-[#fffde8] p-4 sm:p-6 2xl:p-8">
          <h2 className="font-nunito text-2xl font-medium leading-8 text-[#263238]">
            Safety Notes
          </h2>
          <div className="mt-6 space-y-6">
            {safetyNotesList.map((note, index) => (
              <div key={`${note}-${index}`} className="flex gap-3">
                <ShieldCheck
                  aria-hidden="true"
                  size={21}
                  strokeWidth={1.5}
                  className="shrink-0 text-[#e9a900]"
                />
                <p className="font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#263238]">
                  {note}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {activity.developmentGoal && (
        <section className="rounded-2xl bg-[#cfe1dc] p-4 sm:col-span-2 sm:p-6 2xl:col-span-1 2xl:p-8">
          <h2 className="flex items-center gap-2 font-nunito text-xl font-medium leading-7 text-[#263238]">
            <TrendingUp aria-hidden="true" size={20} strokeWidth={1.5} className="text-[#2f7d7e]" />
            Development Goal
          </h2>
          <p className="mt-4 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#394a43]">
            {activity.developmentGoal}
          </p>
        </section>
      )}
    </aside>
  );
}
