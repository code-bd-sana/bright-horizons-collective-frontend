'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Check, Bookmark, Loader2 } from 'lucide-react';
import {
  useToggleActivityComplete,
  useToggleActivityFavorite,
} from '@/features/activities/hooks/activities.mutations';

interface ActivitySidebarProps {
  activityId: string;
  isCompleted?: boolean;
  isFavorited?: boolean;
  childId?: string | null;
  childName?: string | null;
  parentTips?: string | null;
  safetyNotes?: string | null;
  developmentGoal?: string | null;
}

const DEFAULT_TIPS = [
  "Follow your child's lead — if they turn a pose into their own version, go with it. Spontaneous movement is just as valuable.",
  'Narrate what you see: "Wow, you\'re holding so steady!" Specific praise builds body awareness.',
  'If your child gets silly, lean into it — laughter while moving is excellent for self-regulation and social bonding.',
  'Try it alongside your child rather than instructing. Side-by-side play reduces performance pressure.',
];

const DEFAULT_SAFETY_NOTES = [
  'Ensure the floor surface is non-slip. Place a mat or carpet under their feet for poses that require standing balance.',
  'Avoid inverting the head or sudden jerky movements until balance and neck strength are assessed by your care team.',
  'Watch for signs of overexertion: flushed cheeks, rapid breathing, or irritability. Offer a water break.',
];

export function ActivitySidebar({
  activityId,
  isCompleted = false,
  isFavorited = false,
  childId,
  childName,
  parentTips,
  safetyNotes,
  developmentGoal,
}: ActivitySidebarProps) {
  const router = useRouter();
  const [isCompleting, setIsCompleting] = useState(false);

  const toggleCompleteMutation = useToggleActivityComplete();
  const toggleFavoriteMutation = useToggleActivityFavorite();

  const imgVector2 = '/Home/figma-activity-detail-arrow-right.svg';
  const imgFrame19 = '/Home/figma-activity-detail-warning.svg';
  const imgIcon = '/Home/figma-activity-detail-goal.svg';

  const name = childName || 'your child';

  // Format parent tips
  const tipsList: string[] = parentTips
    ? parentTips
        .split('\n')
        .map((t) => t.trim().replace(/^[-*•\d.]\s*/, ''))
        .filter(Boolean)
    : DEFAULT_TIPS.map((t) => t.replace(/\b(your child|Emma)\b/gi, name));

  // Format safety notes
  const safetyList: string[] = safetyNotes
    ? safetyNotes
        .split('\n')
        .map((s) => s.trim().replace(/^[-*•\d.]\s*/, ''))
        .filter(Boolean)
    : DEFAULT_SAFETY_NOTES.map((s) => s.replace(/\b(your child|Emma)\b/gi, name));

  const handleComplete = async () => {
    try {
      setIsCompleting(true);
      if (!isCompleted) {
        await toggleCompleteMutation.mutateAsync({
          id: activityId,
          childId: childId ?? undefined,
        });
      }
      const queryParams = new URLSearchParams();
      queryParams.set('activityId', activityId);
      if (childId) queryParams.set('childId', childId);
      router.push(`/dashboard/weekly-plans/completed-activity?${queryParams.toString()}`);
    } catch {
      const queryParams = new URLSearchParams();
      queryParams.set('activityId', activityId);
      if (childId) queryParams.set('childId', childId);
      router.push(`/dashboard/weekly-plans/completed-activity?${queryParams.toString()}`);
    } finally {
      setIsCompleting(false);
    }
  };

  const handleToggleFavorite = () => {
    toggleFavoriteMutation.mutate(activityId);
  };

  return (
    <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 min-[1600px]:flex min-[1600px]:max-w-71.75 min-[1600px]:flex-col">
      {/* Ready to begin? */}
      <div className="flex w-full flex-col gap-4 rounded-2xl border border-(--border\/300,#e8ebe8) bg-white p-4 sm:p-6 2xl:p-8">
        <p className="font-['Nunito'] font-medium text-[12px] leading-4 text-(--text-primary\/300,#7d8488) uppercase">
          Ready to begin?
        </p>
        <div className="flex flex-col gap-4 w-full">
          <button
            type="button"
            onClick={handleComplete}
            disabled={isCompleting}
            className="bg-[#2f7d7e] rounded-full px-3 py-2 flex items-center justify-center gap-1.5 w-full overflow-hidden relative shadow-[inset_0px_-6px_2px_0px_rgba(255,255,255,0.07)] transition-opacity hover:opacity-90 disabled:opacity-70 cursor-pointer"
          >
            {isCompleting ? (
              <Loader2 className="size-4 animate-spin text-white" />
            ) : isCompleted ? (
              <Check className="size-4 text-white" strokeWidth={2.5} />
            ) : null}
            <span className="font-['Nunito'] font-medium text-sm leading-5 text-white tracking-[-0.084px]">
              {isCompleting
                ? 'Completing...'
                : isCompleted
                  ? 'Completed · View Success'
                  : 'Complete Activity'}
            </span>
            {!isCompleting && !isCompleted && (
              <Image src={imgVector2} alt="Arrow Right" width={16} height={16} />
            )}
          </button>

          <button
            type="button"
            onClick={handleToggleFavorite}
            disabled={toggleFavoriteMutation.isPending}
            className={`border rounded-full px-3 py-2 flex items-center justify-center gap-1.5 w-full overflow-hidden relative transition-colors cursor-pointer ${
              isFavorited
                ? 'border-[#2f7d7e] bg-[#eef7f6] text-[#2f7d7e]'
                : 'border-(--border\/500,#d8ddd9) bg-white text-(--text-primary\/400,#515b60) hover:bg-[#f7faf8]'
            }`}
          >
            <Bookmark
              className={`size-4 ${isFavorited ? 'fill-[#2f7d7e] text-[#2f7d7e]' : 'text-[#515b60]'}`}
            />
            <span className="font-['Nunito'] font-medium text-sm leading-5 tracking-[-0.084px]">
              {isFavorited ? 'Saved to Favorites' : 'Save for Later'}
            </span>
          </button>
        </div>
      </div>

      {/* Parent Tips */}
      <div className="flex w-full flex-col gap-6 rounded-2xl border border-(--border\/300,#e8ebe8) bg-white p-4 shadow-[0_1px_1px_rgba(0,0,0,0.05)] sm:p-6 2xl:p-8">
        <h2 className="font-['Nunito'] font-medium text-[24px] leading-8 text-[#263238]">
          Parent Tips
        </h2>

        <div className="flex flex-col gap-5 w-full">
          {tipsList.map((tip, idx) => (
            <div key={idx} className="flex items-start gap-3 w-full">
              <div className="bg-(--primary\/100,#d5e5e5) rounded-[15px] w-6 h-6 shrink-0 flex items-center justify-center">
                <span className="font-['Nunito'] font-medium text-[14px] leading-5 text-[#2f7d7e] tracking-[-0.084px]">
                  {idx + 1}
                </span>
              </div>
              <p className="flex-1 font-['Manrope'] font-normal text-[14px] leading-5.5 text-[#263238] tracking-[-0.084px]">
                {tip}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Notes */}
      <div className="flex w-full flex-col gap-6 rounded-2xl border border-(--yellow\/100,#fef9c3) bg-(--yellow\/50,#fefce8) p-4 shadow-[0_1px_1px_rgba(0,0,0,0.05)] sm:p-6 2xl:p-8">
        <h2 className="font-['Nunito'] font-medium text-[24px] leading-8 text-[#263238]">
          Safety Notes
        </h2>
        <div className="flex flex-col gap-5 w-full">
          {safetyList.map((note, idx) => (
            <div key={idx} className="flex items-start gap-3 w-full">
              <Image src={imgFrame19} alt="Warning" width={24} height={24} className="shrink-0" />
              <p className="flex-1 font-['Manrope'] font-normal text-[14px] leading-5.5 text-[#263238] tracking-[-0.084px]">
                {note}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Development Goal */}
      <div className="flex w-full flex-col gap-4 rounded-2xl bg-(--secondary\/200,#d2e3dc) p-4 sm:p-6 2xl:p-8">
        <div className="flex items-center gap-2">
          <Image src={imgIcon} alt="Development Goal" width={20} height={20} />
          <h2 className="font-['Nunito'] font-medium text-[20px] leading-7 text-[#263238]">
            Development Goal
          </h2>
        </div>
        <p className="font-['Manrope'] font-normal text-[14px] leading-5.5 text-[#263238] tracking-[-0.084px]">
          {developmentGoal || 'Improve whole-body motor planning, balance, and body awareness'}
        </p>
      </div>
    </div>
  );
}
