import React from 'react';

const steps = [
  {
    num: 1,
    title: 'Set up the space',
    description:
      'Clear a 2m × 2m area. Lay out the mat or find a soft carpet spot. Arrange 5–7 animal yoga cards face-down in a line.',
    isOpen: true,
  },
  {
    num: 2,
    title: 'Warm-up wiggles',
    description:
      'Stand together and do 10 big arm circles forward and backward, then shake out each leg. Tell your child: "We\'re going to become animals today!"',
    isOpen: true,
  },
  {
    num: 3,
    title: 'Flip a card & name the animal',
    description:
      'Let Emma flip the first card and name the animal together. Talk about how that animal moves — does it slither, hop, prowl?',
    isOpen: true,
  },
  {
    num: 4,
    title: 'Model the pose first',
    description:
      'Demonstrate the yoga pose yourself before asking Emma to try. Exaggerate the movement and make the animal sound — this reduces hesitation and makes it playful.',
    isOpen: true,
  },
  {
    num: 5,
    title: 'Hold & count together',
    description:
      'Hold each pose for a count of 1–5 out loud together. If Emma loses balance, encourage her to try again. Falling is part of learning!',
    isOpen: true,
  },
  {
    num: 6,
    title: 'Move through all cards',
    description:
      'Flip and complete each card in sequence. Encourage Emma to pick a favourite pose to repeat at the end.',
    isOpen: true,
  },
  {
    num: 7,
    title: "Cool-down: Child's pose",
    description: '',
    isOpen: false,
  },
];

export function StepByStepInstructions() {
  const imgVector = 'http://localhost:3845/assets/c605dc12ccfa7a730271082c3174e39c418bf671.svg';

  return (
    <div className="bg-white border border-[#fafafa] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] rounded-[16px] p-[32px] flex flex-col w-full">
      <div className="flex flex-col gap-[24px] w-full">
        <div className="flex items-start justify-between w-full">
          <h2 className="font-['Nunito'] font-medium text-[24px] leading-[32px] text-[#263238]">
            Step-by-Step Instructions
          </h2>
          <p className="font-['Nunito'] font-medium text-[12px] leading-[16px] text-[color:var(--secondary\/100,#e9f1ee)] w-[124px]">
            7 steps · tap to expand
          </p>
        </div>

        <div className="flex flex-col gap-[20px] w-full">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`bg-[var(--bg\/-white,white)] border ${step.isOpen ? 'border-[#dceeee] drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)]' : 'border-[var(--border\/300,#e8ebe8)]'} rounded-[16px] p-[20px] flex flex-col gap-[10px] w-full`}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-[12px]">
                  <div className="bg-[#dceeee] rounded-[15px] w-[24px] h-[24px] flex items-center justify-center shrink-0">
                    <p className="font-['Nunito'] font-medium text-[14px] leading-[20px] text-[#174a4d] tracking-[-0.084px]">
                      {step.num}
                    </p>
                  </div>
                  <p className="font-['Nunito'] font-medium text-[18px] leading-[24px] text-[#263238] tracking-[-0.27px]">
                    {step.title}
                  </p>
                </div>
                <div className="flex items-center justify-center rotate-180 shrink-0">
                  <div className="w-[24px] h-[24px] rounded-[6px] flex items-center justify-center p-[2px]">
                    <div className="w-[16px] h-[16px] relative overflow-hidden">
                      <div className="absolute top-[37.5%] bottom-[37.5%] left-[25%] right-[25%]">
                        <img
                          src={imgVector}
                          alt="Chevron"
                          className="absolute inset-[-12.5%_-6.25%] block max-w-none w-full h-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {step.isOpen && step.description && (
                <p className="font-['Manrope'] font-normal text-[14px] leading-[22px] text-[color:var(--text-primary\/400,#515b60)] tracking-[-0.084px] w-full">
                  {step.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
