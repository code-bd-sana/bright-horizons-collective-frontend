'use client';

import { BookOpen, Clock3 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { ResourceFormNavigation } from './resource-form-navigation';
import { ResourceFormStepper } from './resource-form-stepper';

const milestones = [
  [
    '0–12 months: The sensory and motor foundation',
    'The first year is dominated by sensorimotor development — learning to use the body and interpret the world through sensory experience. Key milestones include head control (by 4 months), reaching and grasping (4–6 months), sitting without support (6–8 months), and pulling to stand (9–12 months).',
  ],
  [
    '12–24 months: Toddler motor and language explosion',
    'Walking typically emerges between 9 and 15 months, with running and stair-climbing following close behind. Fine motor skills advance from whole-hand grasping to a more refined pincer grasp. Language and social milestones accelerate: first words, pointing to share interest, simple back-and-forth communication.',
  ],
  [
    '2–3 years: Skill building and independence',
    'This is the age of rapidly expanding independence. Children typically develop the ability to use utensils, undress themselves, kick and throw a ball with some direction, and engage in simple pretend play. Fine motor skills advance toward early scribbling and mark-making.',
  ],
  [
    '4–6 years: School readiness and refinement',
    'Fine motor precision accelerates dramatically in this window — cutting with scissors, drawing recognizable shapes, dressing and undressing independently, and beginning to write letters. Gross motor skills include skipping, pumping a swing, and navigating playground equipment with increasing confidence.',
  ],
] as const;

const relatedActivities = [
  ['Obstacle Course Adventure', '3–5 yr', 'Gross Motor', '/Home/activity-obstacle-course.png'],
  ['Tong Transfer Challenge', '3–6 yr', 'Fine Motor', '/Home/activity-tong-transfer.png'],
  ['Bilateral Drawing Rainbows', '3–5 yr', 'Visual-Motor', '/Home/activity-bilateral-drawing.png'],
] as const;

function ActivityChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-[#dceeee] px-2 py-0.5 font-manrope text-xs font-semibold leading-4 text-[#174a4d]">
      {children}
    </span>
  );
}

export function AddResourceReview() {
  const router = useRouter();

  function saveResource() {
    toast.success('Resource saved successfully.');
    router.push('/dashboard/admin/parent-resources');
  }

  return (
    <section className="mx-auto w-full max-w-231.5 pb-8 pt-6 text-[#263238] lg:pt-0">
      <Link
        href="/dashboard/admin/parent-resources"
        className="inline-flex items-center gap-1.5 font-manrope text-sm font-medium leading-5 text-[#607d8b]"
      >
        <span aria-hidden="true">←</span>
        Back to Parent Resources
      </Link>

      <h1 className="mt-5 font-nunito text-2xl font-bold leading-9">Create Resource</h1>

      <div className="mt-5 overflow-x-auto rounded-2xl border border-[#e7eceb] bg-white p-4.25 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
        <ResourceFormStepper currentStep={7} />
      </div>

      <section className="mt-5 rounded-2xl border border-[#e7eceb] bg-white p-5 shadow-[0_4px_6px_rgba(0,0,0,0.06)] sm:p-6.25">
        <h2 className="font-nunito text-lg font-bold leading-6.75">7. Review</h2>
        <p className="mt-5 font-manrope text-sm leading-5.25 text-[#607d8b]">
          Preview how this resource will appear in the Parent Dashboard. This is exactly what
          parents see.
        </p>

        <article className="mt-4 w-full max-w-215.25 overflow-hidden rounded-2xl border border-[#e7eceb] bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
          <div className="flex h-32 items-center justify-center bg-[rgba(47,125,126,0.09)]">
            <BookOpen aria-hidden="true" className="size-10 text-[#2f7d7e]" strokeWidth={1.5} />
          </div>

          <div className="p-6">
            <div className="flex flex-wrap items-center gap-1.25">
              <span className="rounded-full border border-[#dceeee] bg-[#e0f0e9] px-2.25 py-1.75 font-nunito text-xs font-medium leading-4 text-[#263238]">
                Sensory
              </span>
              <span className="rounded-full border border-[#dceeee] px-2.25 py-1.75 font-nunito text-xs font-medium leading-4 text-[#263238]">
                Article
              </span>
              <span className="flex items-center gap-1 px-2 py-1.5 font-manrope text-xs leading-4.5 text-[#607077]">
                <Clock3 aria-hidden="true" className="size-3" />
                12 minute read
              </span>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <span className="flex size-6 items-center justify-center rounded-full bg-[#2f7d7e] font-nunito text-sm font-bold leading-5 text-white">
                J
              </span>
              <span className="font-manrope text-sm font-medium leading-5 text-[#263238]">
                Jaicy, Licensed Pediatric Occupational Therapist
              </span>
            </div>

            <h3 className="h-10.5 pt-3 font-nunito text-xl font-bold leading-7.5 text-[#263238]">
              Developmental Milestones: What to Expect at Every Stage
            </h3>

            <div className="border-t border-[#e7eceb] pt-5">
              <div className="pt-5.25">
                <p className="font-nunito text-lg font-medium leading-6 tracking-[-0.27px] text-[#263238]">
                  Developmental milestones exist to give parents and clinicians a shared reference
                  point — a way to notice when a child may benefit from additional support. They are
                  not checklists for perfection, and they are not meant to cause alarm at every
                  missed window. Children develop at their own pace, within ranges, and across
                  multiple domains simultaneously.
                </p>

                <blockquote className="mt-6 border-l-4 border-[#2f7d7e] py-2 pl-6">
                  <p className="font-lora text-lg italic leading-[31.5px] text-[#263238]">
                    “A milestone is a signpost, not a deadline. Most children reach them — the
                    timing just varies within a range that&apos;s often wider than parents expect.”
                  </p>
                </blockquote>
              </div>
            </div>

            <div className="mt-6 space-y-8">
              {milestones.map(([title, body]) => (
                <section key={title}>
                  <h4 className="font-nunito text-xl font-bold leading-7 text-[#174a4d]">
                    {title}
                  </h4>
                  <p className="mt-4 font-manrope text-base leading-6 tracking-[-0.176px] text-[#263238]">
                    {body}
                  </p>
                </section>
              ))}
            </div>

            <section className="mt-8">
              <h4 className="font-nunito text-xl font-bold leading-7 text-[#263238]">
                Related Activities
              </h4>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {relatedActivities.map(([title, age, skill, image]) => (
                  <article
                    key={title}
                    className="h-61 overflow-hidden rounded-2xl border border-[#d8ddd9] bg-white p-px shadow-[0_2px_8px_rgba(38,50,56,0.06)]"
                  >
                    <div className="relative h-[127.859px] overflow-hidden">
                      <Image
                        src={image}
                        alt=""
                        fill
                        sizes="(min-width: 640px) 33vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h5 className="truncate font-nunito text-sm font-bold leading-[19.25px] text-[#263238]">
                        {title}
                      </h5>
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        <ActivityChip>{age}</ActivityChip>
                        <ActivityChip>{skill}</ActivityChip>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </article>
      </section>

      <ResourceFormNavigation currentStep={7} showNext={false} onSaveChanges={saveResource} />
    </section>
  );
}
