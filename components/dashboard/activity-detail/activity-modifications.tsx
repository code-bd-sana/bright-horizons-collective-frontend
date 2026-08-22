export function ActivityModifications() {
  return (
    <div className="flex w-full flex-col gap-6 rounded-[16px] border border-[#fafafa] bg-white p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] sm:p-6 lg:p-8">
      <div className="flex flex-col gap-[12px] w-full">
        <h2 className="font-['Nunito'] font-medium text-[24px] leading-[32px] text-[#263238]">
          Activity Modifications
        </h2>
        <p className="font-['Manrope'] font-normal text-[14px] leading-[22px] text-[color:var(--text-primary\/400,#515b60)] tracking-[-0.084px]">
          Choose the version that best matches Emma&apos;s energy, environment, and developmental
          readiness today.
        </p>
      </div>

      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-stretch sm:gap-6">
        {/* Make it Easier */}
        <div className="flex min-w-0 flex-1 flex-col gap-6 rounded-[16px] border border-[#fafafa] bg-white p-4 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] sm:p-6 lg:p-8">
          <h3 className="font-['Nunito'] font-medium text-[20px] leading-[28px] text-[#263238]">
            Make it Easier
          </h3>
          <div className="bg-[#dceeee] rounded-[16px] p-[20px] flex flex-col w-full">
            <p className="font-['Manrope'] font-normal text-[14px] leading-[22px] text-[#263238] tracking-[-0.084px] w-full">
              Reduce to 3 familiar poses (cat, dog, butterfly). Allow Emma to hold a chair or your
              hand for balance support.
            </p>
          </div>
        </div>

        {/* Make it Harder */}
        <div className="flex min-w-0 flex-1 flex-col gap-6 rounded-[16px] border border-[#fafafa] bg-white p-4 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] sm:p-6 lg:p-8">
          <h3 className="font-['Nunito'] font-medium text-[20px] leading-[28px] text-[#263238]">
            Make it Harder
          </h3>
          <div className="bg-[#efe1e1] rounded-[16px] p-[20px] flex flex-col w-full">
            <p className="font-['Manrope'] font-normal text-[14px] leading-[22px] text-[#263238] tracking-[-0.084px] w-full">
              Hold each pose for 8–10 seconds. Add a transition move between cards — hop like a
              bunny from card to card.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
