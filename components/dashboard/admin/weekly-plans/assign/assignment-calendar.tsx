'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo, useState } from 'react';

const weekdays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

function formatDate(date: Date) {
  return `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}`;
}

export function AssignmentCalendar({ onSelect }: { onSelect: (value: string) => void }) {
  const [month, setMonth] = useState(new Date(2026, 6, 1));
  const isReferenceMonth = month.getFullYear() === 2026 && month.getMonth() === 6;
  const weeks = useMemo(() => {
    if (month.getFullYear() === 2026 && month.getMonth() === 6) {
      return [
        [null, null, null, null, null, 1, 2],
        [3, 4, 5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14, 15, 16],
        [17, 18, 19, 20, 21, 22, 23],
        [24, 25, 26, 27, 28, 29, 30],
        [31, null, null, null, null, null, null],
      ];
    }

    const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
    const lastDay = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    const mondayOffset = (firstDay.getDay() + 6) % 7;
    const dates = Array.from({ length: mondayOffset + lastDay }, (_, index) =>
      index < mondayOffset ? null : index - mondayOffset + 1
    );

    while (dates.length % 7 !== 0) dates.push(null);
    return Array.from({ length: dates.length / 7 }, (_, index) =>
      dates.slice(index * 7, index * 7 + 7)
    );
  }, [month]);

  return (
    <section className="w-88.5 rounded-3xl bg-[#f7f0ed] p-4 shadow-[0_10px_24px_rgba(38,50,56,0.12)]">
      <div className="flex justify-center">
        <div className="flex items-center gap-2 rounded-full bg-[rgba(0,0,0,0.05)] px-4 py-2.5">
          <button
            type="button"
            aria-label="Previous month"
            onClick={() =>
              setMonth((current) => new Date(current.getFullYear(), current.getMonth() - 1, 1))
            }
            className="flex size-5 items-center justify-center text-black"
          >
            <ChevronLeft aria-hidden="true" size={20} strokeWidth={1.8} />
          </button>
          <p className="min-w-16 text-center font-nunito text-base font-medium leading-6 tracking-[-0.176px] text-black">
            {month.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
          </p>
          <button
            type="button"
            aria-label="Next month"
            onClick={() =>
              setMonth((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1))
            }
            className="flex size-5 items-center justify-center text-black"
          >
            <ChevronRight aria-hidden="true" size={20} strokeWidth={1.8} />
          </button>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between">
          {weekdays.map((weekday) => (
            <span
              key={weekday}
              className="flex h-6 w-10 items-center justify-center font-nunito text-xs font-bold leading-4 text-black"
            >
              {weekday}
            </span>
          ))}
        </div>
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="relative flex items-center justify-between">
            {isReferenceMonth && week.includes(17) ? (
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-4.75 right-4.75 bg-[#fae1d9]"
              />
            ) : null}
            {week.map((day, dayIndex) => {
              const rangeEnd = isReferenceMonth && (day === 17 || day === 23);

              return day === null ? (
                <span key={dayIndex} className="size-10" />
              ) : (
                <button
                  key={day}
                  type="button"
                  onClick={() =>
                    onSelect(formatDate(new Date(month.getFullYear(), month.getMonth(), day)))
                  }
                  className={`relative z-10 flex size-10 items-center justify-center rounded-full p-2 font-nunito text-lg font-medium leading-6 tracking-[-0.27px] text-[#263238] ${rangeEnd ? 'bg-[#f2b59f]' : ''}`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}
