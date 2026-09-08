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
    <div className="flex w-full flex-col rounded-2xl border border-[#fafafa] bg-white p-4 shadow-[0_1px_1px_rgba(0,0,0,0.05)] sm:p-6 2xl:p-8">
      <div className="flex w-full flex-col gap-6">
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <h2 className="font-nunito text-2xl font-medium leading-8 text-[#263238]">
            Step-by-Step Instructions
          </h2>
          <p className="font-nunito text-xs font-medium leading-4 whitespace-nowrap text-[#2f7d7e] sm:w-31">
            7 steps · tap to expand
          </p>
        </div>

        <div className="flex w-full flex-col gap-5">
          {stepsState.map((step, idx) => (
            <button
              type="button"
              key={idx}
              onClick={() => toggleStep(idx)}
              className={`border bg-(--bg\/-white,white) ${step.isOpen ? 'border-[#dceeee] shadow-[0_1px_1.5px_rgba(0,0,0,0.1),0_1px_1px_rgba(0,0,0,0.1)]' : 'border-(--border\/300,#e8ebe8)'} flex w-full flex-col gap-2.5 rounded-2xl p-4 text-left transition-all duration-200 sm:p-5`}
            >
              <div className="flex w-full items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-6 shrink-0 items-center justify-center rounded-[15px] bg-[#dceeee]">
                    <p className="font-nunito text-sm font-medium leading-5 tracking-[-0.084px] text-[#174a4d]">
                      {step.num}
                    </p>
                  </div>
                  <p className="min-w-0 font-nunito text-base font-medium leading-6 tracking-[-0.27px] text-[#263238] sm:text-lg">
                    {step.title}
                  </p>
                </div>
                <div
                  className={`flex items-center justify-center shrink-0 transition-transform duration-200 ${step.isOpen ? 'rotate-180' : ''}`}
                >
                  <div className="flex size-6 items-center justify-center rounded-md p-0.5">
                    <Image src={imgVector} alt="Chevron" width={16} height={16} />
                  </div>
                </div>
              </div>
              {step.isOpen && step.description && (
                <p className="w-full font-manrope text-sm leading-5.5 tracking-[-0.084px] text-(--text-primary\/400,#515b60)">
                  {step.description}
                </p>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
