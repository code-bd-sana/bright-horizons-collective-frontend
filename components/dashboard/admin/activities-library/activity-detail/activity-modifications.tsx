export function ActivityModifications() {
  return (
    <section className="rounded-2xl border border-[#fafafa] bg-white p-6 shadow-[0_1px_1px_rgba(0,0,0,0.05)] sm:p-8">
      <h2 className="font-nunito text-2xl font-medium leading-8 text-[#263238]">
        Activity Modifications
      </h2>
      <p className="mt-3 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#515b60]">
        Choose the version that best matches Emma’s energy, environment, and developmental readiness
        today.
      </p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <article className="rounded-2xl border border-[#fafafa] p-8">
          <h3 className="font-nunito text-xl font-medium leading-7 text-[#263238]">
            Make it Easier
          </h3>
          <p className="mt-6 rounded-2xl bg-[#dceeee] p-5 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#394a43]">
            Reduce to 3 familiar poses (cat, dog, butterfly). Allow Emma to hold a chair or your
            hand for balance support.
          </p>
        </article>
        <article className="rounded-2xl border border-[#fafafa] p-8">
          <h3 className="font-nunito text-xl font-medium leading-7 text-[#263238]">
            Make it Harder
          </h3>
          <p className="mt-6 rounded-2xl bg-[#eddddd] p-5 font-manrope text-sm leading-5.5 tracking-[-0.084px] text-[#493630]">
            Hold each pose for 8–10 seconds. Add a transition move between cards — hop like a bunny
            from card to card.
          </p>
        </article>
      </div>
    </section>
  );
}
