import React from 'react';

export function ActivitySidebar() {
  const imgVector1 = 'http://localhost:3845/assets/73a40c4013f779e469037e2043ee94f906fc43f0.svg'; // Play icon
  const imgVector2 = 'http://localhost:3845/assets/69af177b32e53b3c84abe55ceb63d26b365764b3.svg'; // Arrow right
  const imgVector3 = 'http://localhost:3845/assets/c064f260ef9c9828537cced471b3e4a9bf4b2adf.svg'; // Bookmark
  const imgFrame19 = 'http://localhost:3845/assets/118411b0431e06c3c71628ed8e6374c6b3689517.svg'; // Warning icon
  const imgIcon = 'http://localhost:3845/assets/aff4701733190ab2f21977d537cf5b121114c127.svg'; // Development goal icon

  return (
    <div className="flex flex-col gap-[24px] w-full max-w-[287px]">
      {/* Session Timer */}
      <div className="bg-white border border-[var(--border\/300,#e8ebe8)] rounded-[16px] p-[32px] flex flex-col gap-[16px] w-full">
        <p className="font-['Nunito'] font-medium text-[12px] leading-[16px] text-[color:var(--text-primary\/300,#7d8488)] uppercase">
          Session Timer
        </p>
        <div className="flex flex-col gap-[24px] items-center w-full">
          <p className="font-['Mitr'] text-[40px] leading-[48px] text-[#2f7d7e] tracking-[-0.4px]">
            20:00
          </p>
          <button className="border border-[#2f7d7e] rounded-full px-3 py-2 flex items-center justify-center gap-1 w-full overflow-hidden">
            <img src={imgVector1} alt="Play" className="w-4 h-4" />
            <span className="font-['Nunito'] font-medium text-sm leading-5 text-[#2f7d7e] tracking-[-0.084px]">
              Start session timer
            </span>
          </button>
        </div>
      </div>

      {/* Ready to begin? */}
      <div className="bg-white border border-[var(--border\/300,#e8ebe8)] rounded-[16px] p-[32px] flex flex-col gap-[16px] w-full">
        <p className="font-['Nunito'] font-medium text-[12px] leading-[16px] text-[color:var(--text-primary\/300,#7d8488)] uppercase">
          Ready to begin?
        </p>
        <div className="flex flex-col gap-[24px] w-full">
          <button className="bg-[#2f7d7e] rounded-full px-3 py-2 flex items-center justify-center gap-1 w-full overflow-hidden relative shadow-[inset_0px_-6px_2px_0px_rgba(255,255,255,0.07)]">
            <span className="font-['Nunito'] font-medium text-sm leading-5 text-white tracking-[-0.084px]">
              Complete Activity
            </span>
            <img src={imgVector2} alt="Arrow Right" className="w-4 h-4" />
          </button>

          <button className="border border-[var(--border\/500,#d8ddd9)] rounded-full px-3 py-2 flex items-center justify-center gap-1 w-full overflow-hidden">
            <img src={imgVector3} alt="Bookmark" className="w-4 h-4" />
            <span className="font-['Nunito'] font-medium text-sm leading-5 text-[color:var(--text-primary\/400,#515b60)] tracking-[-0.084px]">
              Save for Later
            </span>
          </button>
        </div>
      </div>

      {/* Parent Tips */}
      <div className="bg-white border border-[var(--border\/300,#e8ebe8)] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-[32px] flex flex-col gap-[24px] w-full">
        <h2 className="font-['Nunito'] font-medium text-[24px] leading-[32px] text-[#263238]">
          Parent Tips
        </h2>

        <div className="flex flex-col gap-[20px] w-full">
          {[
            "Follow Emma's lead — if she turns a pose into her own version, go with it. Spontaneous movement is just as valuable.",
            'Narrate what you see: "Wow, you\'re holding the tree pose so steady!" Specific praise builds body awareness.',
            'If Emma gets silly, lean into it — laughter while moving is excellent for self-regulation and social bonding.',
            'Try it alongside Emma rather than instructing. Side-by-side play reduces performance pressure.',
          ].map((tip, idx) => (
            <div key={idx} className="flex items-start gap-[12px] w-full">
              <div className="bg-[var(--primary\/100,#d5e5e5)] rounded-[15px] w-[24px] h-[24px] shrink-0 flex items-center justify-center">
                <span className="font-['Nunito'] font-medium text-[14px] leading-[20px] text-[#2f7d7e] tracking-[-0.084px]">
                  {idx + 1}
                </span>
              </div>
              <p className="flex-1 font-['Manrope'] font-normal text-[14px] leading-[22px] text-[#263238] tracking-[-0.084px]">
                {tip}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Notes */}
      <div className="bg-[var(--yellow\/50,#fefce8)] border border-[var(--yellow\/100,#fef9c3)] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-[32px] flex flex-col gap-[24px] w-full">
        <h2 className="font-['Nunito'] font-medium text-[24px] leading-[32px] text-[#263238]">
          Safety Notes
        </h2>
        <div className="flex flex-col gap-[20px] w-full">
          {[
            "Ensure the floor surface is non-slip. Place a yoga mat under Emma's feet for poses that require standing balance.",
            'Avoid inverting the head (no headstands) until balance and neck strength are assessed by your OT.',
            'Watch for signs of overexertion: flushed cheeks, rapid breathing, or irritability. Offer a water break.',
          ].map((note, idx) => (
            <div key={idx} className="flex items-start gap-[12px] w-full">
              <img src={imgFrame19} alt="Warning" className="w-[24px] h-[24px] shrink-0" />
              <p className="flex-1 font-['Manrope'] font-normal text-[14px] leading-[22px] text-[#263238] tracking-[-0.084px]">
                {note}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Development Goal */}
      <div className="bg-[var(--secondary\/200,#d2e3dc)] rounded-[16px] p-[32px] flex flex-col gap-[16px] w-full">
        <div className="flex items-center gap-[8px]">
          <img src={imgIcon} alt="Development Goal" className="w-[20px] h-[20px]" />
          <h2 className="font-['Nunito'] font-medium text-[20px] leading-[28px] text-[#263238]">
            Development Goal
          </h2>
        </div>
        <p className="font-['Manrope'] font-normal text-[14px] leading-[22px] text-[#263238] tracking-[-0.084px]">
          Improve whole-body motor planning, balance, and body awareness
        </p>
      </div>
    </div>
  );
}
