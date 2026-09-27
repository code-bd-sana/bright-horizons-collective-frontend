import type { AssignedWeeklyPlan } from '../model/weekly-plan.types';

export function getMondayOfDate(d: Date): Date {
  const date = new Date(d);
  const day = date.getDay(); // 0 is Sun, 1 is Mon...
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  date.setDate(diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function getSundayOfMonday(monday: Date): Date {
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);
  return sunday;
}

/**
 * Finds the assigned weekly plan for the active child that strictly falls in the current week range (Monday to Sunday).
 * 1. An assignment currently active (now >= startDate && now <= endDate)
 * 2. An assignment overlapping the current Monday-to-Sunday calendar week
 */
export function findCurrentWeeklyPlan(
  assignments: AssignedWeeklyPlan[],
  referenceDate = new Date()
): AssignedWeeklyPlan | null {
  if (!assignments || assignments.length === 0) return null;

  const now = new Date(referenceDate);

  // 1. Direct active plan: today falls within [startDate, endDate]
  const activeNow = assignments.find((a) => {
    if (!a.startDate) return false;
    const start = new Date(a.startDate);
    const end = a.endDate ? new Date(a.endDate) : new Date(start.getTime() + 7 * 86400000 - 1);
    return now >= start && now <= end;
  });
  if (activeNow) return activeNow;

  // 2. Overlap with current calendar week (Monday to Sunday)
  const currentMonday = getMondayOfDate(now);
  const currentSunday = getSundayOfMonday(currentMonday);

  const currentWeekOverlap = assignments.find((a) => {
    if (!a.startDate) return false;
    const start = new Date(a.startDate);
    const end = a.endDate ? new Date(a.endDate) : new Date(start.getTime() + 7 * 86400000 - 1);
    return start <= currentSunday && end >= currentMonday;
  });
  if (currentWeekOverlap) return currentWeekOverlap;

  return null;
}
