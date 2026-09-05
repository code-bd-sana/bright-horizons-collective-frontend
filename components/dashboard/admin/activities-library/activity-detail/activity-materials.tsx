const materials = [
  { label: 'Animal yoga card deck (or printed cards)', tone: 'bg-[#fae2dc] text-[#493630]' },
  { label: 'Yoga mat or soft carpet area', tone: 'bg-[#e5efec] text-[#394a43]' },
  { label: 'Calm background music (optional)', tone: 'bg-[#fae2dc] text-[#493630]' },
  { label: 'Water bottle nearby', tone: 'bg-[#e5efec] text-[#394a43]' },
];

export function ActivityMaterials() {
  return (
    <section className="rounded-2xl border border-[#fafafa] bg-white p-6 shadow-[0_1px_1px_rgba(0,0,0,0.05)] sm:p-8">
      <h2 className="font-nunito text-2xl font-medium leading-8 text-[#263238]">
        Materials Needed
      </h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {materials.map(({ label, tone }) => (
          <div
            key={label}
            className={`mx-auto flex size-37.5 items-center justify-center p-6 text-center [clip-path:polygon(50%_0,100%_38%,81%_100%,19%_100%,0_38%)] ${tone}`}
          >
            <p className="font-manrope text-sm leading-5.5 tracking-[-0.084px]">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
