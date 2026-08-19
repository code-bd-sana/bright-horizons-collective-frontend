'use client';

import React, { useState } from 'react';
import Image from 'next/image';

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
  const imgVector = '/Home/figma-activity-detail-chevron-down.svg';
  const [stepsState, setStepsState] = useState(steps);

  const toggleStep = (index: number) => {
    setStepsState((prevSteps) => {
      const newSteps = [...prevSteps];
      newSteps[index] = { ...newSteps[index], isOpen: !newSteps[index].isOpen };
      return newSteps;
    });
  };

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
          {stepsState.map((step, idx) => (
            <div
              key={idx}
              onClick={() => toggleStep(idx)}
              className={`bg-[var(--bg\/-white,white)] border ${step.isOpen ? 'border-[#dceeee] drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)]' : 'border-[var(--border\/300,#e8ebe8)]'} rounded-[16px] p-[20px] flex flex-col gap-[10px] w-full cursor-pointer transition-all duration-200`}
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
                <div
                  className={`flex items-center justify-center shrink-0 transition-transform duration-200 ${step.isOpen ? 'rotate-180' : ''}`}
                >
                  <div className="w-[24px] h-[24px] rounded-[6px] flex items-center justify-center p-[2px]">
                    <Image src={imgVector} alt="Chevron" width={16} height={16} />
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
