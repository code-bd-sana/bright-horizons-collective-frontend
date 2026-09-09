export function ActivityModifications() {
  return (
    <div className="flex w-full flex-col gap-6 rounded-2xl border border-[#fafafa] bg-white p-4 shadow-[0_1px_1px_rgba(0,0,0,0.05)] sm:p-6 2xl:p-8">
      <div className="flex w-full flex-col gap-3">
        <h2 className="font-nunito text-2xl font-medium leading-8 text-[#263238]">
          Activity Modifications
        </h2>
        <p className="font-manrope text-sm leading-5.5 tracking-[-0.084px] text-(--text-primary\/400,#515b60)">
          Choose the version that best matches Emma&apos;s energy, environment, and developmental
          readiness today.
        </p>
      </div>

      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-stretch sm:gap-6">
        {/* Make it Easier */}
        <div className="flex min-w-0 flex-1 flex-col gap-6 rounded-2xl border border-[#fafafa] bg-white p-4 shadow-[0_1px_1px_rgba(0,0,0,0.05)] sm:p-6">
          <h3 className="font-nunito text-xl font-medium leading-7 text-[#263238]">
            Make it Easier
          </h3>
          <div className="flex w-full flex-col rounded-2xl bg-[#dceeee] p-5">
            <p className="w-full font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#263238]">
              Reduce to 3 familiar poses (cat, dog, butterfly). Allow Emma to hold a chair or your
              hand for balance support.
            </p>
          </div>
        </div>

        {/* Make it Harder */}
        <div className="flex min-w-0 flex-1 flex-col gap-6 rounded-2xl border border-[#fafafa] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:p-6">
          <h3 className="font-nunito text-xl font-medium leading-7 text-[#263238]">
            Make it Harder
          </h3>
          <div className="flex w-full flex-col rounded-2xl bg-[#efe1e1] p-5">
            <p className="w-full font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#263238]">
              Hold each pose for 8–10 seconds. Add a transition move between cards — hop like a
              bunny from card to card.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
