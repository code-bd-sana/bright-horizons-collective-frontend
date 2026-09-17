import type { Activity } from '@/features/activities/model/activity.types';

const TONES = [
  'bg-[#fae2dc] text-[#493630]',
  'bg-[#e5efec] text-[#394a43]',
  'bg-[#fae2dc] text-[#493630]',
  'bg-[#e5efec] text-[#394a43]',
];

export function ActivityMaterials({ activity }: { activity: Activity }) {
  const materialsList: string[] = Array.isArray(activity.materialsNeeded)
    ? activity.materialsNeeded
        .map((item) => (typeof item === 'string' ? item : item?.name))
        .filter((name): name is string => Boolean(name && name.trim()))
    : [];

  return (
    <section className="min-w-0 rounded-2xl border border-[#fafafa] bg-white p-4 shadow-[0_1px_1px_rgba(0,0,0,0.05)] sm:p-6 2xl:p-8">
      <h2 className="font-nunito text-xl font-medium leading-7 text-[#263238] sm:text-2xl sm:leading-8">
        Materials Needed
      </h2>

      {materialsList.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4">
          {materialsList.map((label, index) => {
            const tone = TONES[index % TONES.length];
            return (
              <div
                key={`${label}-${index}`}
                className={`mx-auto flex size-34 items-center justify-center p-5 text-center sm:size-37.5 sm:p-6 [clip-path:polygon(50%_0,100%_38%,81%_100%,19%_100%,0_38%)] ${tone}`}
              >
                <p className="font-manrope text-sm leading-5.5 tracking-[-0.084px]">{label}</p>
              </div>
            );
          })}
        </div>
      ) : activity.materialsSummary ? (
        <div className="mt-4 rounded-xl bg-[#f7faf8] p-4 text-[#394a43]">
          <p className="font-manrope text-sm leading-5.5 tracking-[-0.084px]">
            {activity.materialsSummary}
          </p>
        </div>
      ) : (
        <p className="mt-4 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#7d8488]">
          No specific materials required for this activity.
        </p>
      )}
    </section>
  );
}
