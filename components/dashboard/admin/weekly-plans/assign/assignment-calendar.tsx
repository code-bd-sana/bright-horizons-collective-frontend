'use client';

import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';
import { useMemo, useState } from 'react';
import { getMondayOfDate, getSundayOfMonday } from './store/use-assign-plan-store';

const weekdays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

function isSameDay(d1: Date, d2: Date): boolean {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

function parseYMD(str?: string): Date | null {
  if (!str) return null;
  const parts = str.split('-').map(Number);
  if (parts.length < 3 || isNaN(parts[0]) || isNaN(parts[1]) || isNaN(parts[2])) {
    return null;
  }
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

interface AssignmentCalendarProps {
  startDate?: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
  onSelectWeek: (monday: Date, sunday: Date) => void;
}

export function AssignmentCalendar({ startDate, endDate, onSelectWeek }: AssignmentCalendarProps) {
  const selectedMon = useMemo(() => parseYMD(startDate), [startDate]);
  const selectedSun = useMemo(() => parseYMD(endDate), [endDate]);

  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    if (selectedMon) return new Date(selectedMon.getFullYear(), selectedMon.getMonth(), 1);
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const today = useMemo(() => new Date(), []);

  const weeks = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0).getDate();
    // Monday = 0, Sunday = 6
    const mondayOffset = (firstDay.getDay() + 6) % 7;

    const cells: (Date | null)[] = [];
    for (let i = 0; i < mondayOffset; i++) {
      cells.push(null);
    }
    for (let day = 1; day <= lastDay; day++) {
      cells.push(new Date(year, month, day));
    }
    while (cells.length % 7 !== 0) {
      cells.push(null);
    }

    const rows: (Date | null)[][] = [];
    for (let i = 0; i < cells.length; i += 7) {
      rows.push(cells.slice(i, i + 7));
    }
    return rows;
  }, [currentMonth]);

  function handleDayClick(date: Date) {
    const mon = getMondayOfDate(date);
    const sun = getSundayOfMonday(mon);
    onSelectWeek(mon, sun);
  }

  function handleQuickSelect(offsetWeeks: number) {
    const baseMon = getMondayOfDate(new Date());
    baseMon.setDate(baseMon.getDate() + offsetWeeks * 7);
    const baseSun = getSundayOfMonday(baseMon);
    setCurrentMonth(new Date(baseMon.getFullYear(), baseMon.getMonth(), 1));
    onSelectWeek(baseMon, baseSun);
  }

  return (
    <div className="w-full rounded-2xl border border-[#e7eceb] bg-[#fafcfb] p-4 shadow-sm sm:p-5">
      {/* Month Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarDays className="size-5 text-[#2f7d7e]" />
          <p className="font-nunito text-base font-bold text-[#263238]">
            {currentMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Previous month"
            onClick={() =>
              setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
            }
            className="flex size-8 items-center justify-center rounded-lg border border-[#e7eceb] bg-white text-[#263238] transition hover:bg-[#f0f4f3]"
          >
            <ChevronLeft size={18} strokeWidth={2} />
          </button>
          <button
            type="button"
            aria-label="Next month"
            onClick={() =>
              setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
            }
            className="flex size-8 items-center justify-center rounded-lg border border-[#e7eceb] bg-white text-[#263238] transition hover:bg-[#f0f4f3]"
          >
            <ChevronRight size={18} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Weekday Labels (Mon - Sun) */}
      <div className="mt-4 grid grid-cols-7 text-center">
        {weekdays.map((wd) => (
          <span
            key={wd}
            className="font-nunito text-xs font-bold uppercase tracking-wider text-[#607d8b]"
          >
            {wd}
          </span>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="mt-2 space-y-1">
        {weeks.map((week, wIndex) => {
          // Check if this week contains any part of the selected range
          const hasSelectedDay = week.some(
            (d) =>
              d &&
              selectedMon &&
              selectedSun &&
              d.getTime() >= selectedMon.getTime() &&
              d.getTime() <= selectedSun.getTime()
          );

          return (
            <div
              key={wIndex}
              className={`grid grid-cols-7 rounded-xl transition-colors ${
                hasSelectedDay ? 'bg-[#e5f2ef]/70' : 'hover:bg-black/2'
              }`}
            >
              {week.map((date, dIndex) => {
                if (!date) {
                  return <div key={`empty-${dIndex}`} className="h-10" />;
                }

                const isMon = selectedMon && isSameDay(date, selectedMon);
                const isSun = selectedSun && isSameDay(date, selectedSun);
                const isInRange =
                  selectedMon &&
                  selectedSun &&
                  date.getTime() >= selectedMon.getTime() &&
                  date.getTime() <= selectedSun.getTime();
                const isCurrentToday = isSameDay(date, today);

                let cellStyle =
                  'text-[#263238] hover:bg-[#2f7d7e]/15 hover:text-[#2f7d7e] font-medium';

                if (isMon && isSun) {
                  cellStyle = 'bg-[#2f7d7e] text-white font-bold rounded-xl shadow-sm';
                } else if (isMon) {
                  cellStyle = 'bg-[#2f7d7e] text-white font-bold rounded-l-xl shadow-sm';
                } else if (isSun) {
                  cellStyle = 'bg-[#2f7d7e] text-white font-bold rounded-r-xl shadow-sm';
                } else if (isInRange) {
                  cellStyle = 'bg-[#d2ebe5] text-[#1c5d5e] font-semibold rounded-none';
                }

                return (
                  <button
                    key={date.toISOString()}
                    type="button"
                    onClick={() => handleDayClick(date)}
                    title={`Select week of Monday, ${getMondayOfDate(date).toLocaleDateString()}`}
                    className={`relative flex h-10 w-full items-center justify-center font-nunito text-sm transition-all ${cellStyle}`}
                  >
                    <span>{date.getDate()}</span>
                    {isCurrentToday && !isMon && !isSun ? (
                      <span
                        aria-hidden="true"
                        className="absolute bottom-1.5 size-1 rounded-full bg-[#2f7d7e]"
                      />
                    ) : null}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Quick Select Presets */}
      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-[#e7eceb] pt-3">
        <span className="font-manrope text-xs font-semibold text-[#607d8b]">Quick Select:</span>
        <button
          type="button"
          onClick={() => handleQuickSelect(0)}
          className="rounded-lg border border-[#d6e3e1] bg-white px-2.5 py-1 font-manrope text-xs font-medium text-[#2f7d7e] hover:bg-[#f0f6f5]"
        >
          This Week
        </button>
        <button
          type="button"
          onClick={() => handleQuickSelect(1)}
          className="rounded-lg border border-[#d6e3e1] bg-white px-2.5 py-1 font-manrope text-xs font-medium text-[#2f7d7e] hover:bg-[#f0f6f5]"
        >
          Next Week
        </button>
        <button
          type="button"
          onClick={() => handleQuickSelect(2)}
          className="rounded-lg border border-[#d6e3e1] bg-white px-2.5 py-1 font-manrope text-xs font-medium text-[#2f7d7e] hover:bg-[#f0f6f5]"
        >
          +2 Weeks
        </button>
      </div>
    </div>
  );
}
