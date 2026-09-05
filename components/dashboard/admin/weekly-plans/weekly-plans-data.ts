export type PlanStatus = 'Published' | 'Draft' | 'Archived';
export type PlanMembership = 'Little Steps' | 'Grow Together' | 'Personalized Pathways';
export type AdminWeeklyPlan = {
  id: number;
  title: string;
  week: string;
  age: string;
  activities: number;
  membership: PlanMembership;
  assigned: string;
  status: PlanStatus;
  updated: string;
};

export const adminWeeklyPlans: AdminWeeklyPlan[] = [
  {
    id: 1,
    title: 'Sensory Foundations — Week 1',
    week: 'Week 1',
    age: '1–2 years',
    activities: 5,
    membership: 'Little Steps',
    assigned: '34 families',
    status: 'Published',
    updated: 'Mar 25, 2025',
  },
  {
    id: 2,
    title: 'Language Launch — Week 1',
    week: 'Week 1',
    age: '1–2 years',
    activities: 5,
    membership: 'Personalized Pathways',
    assigned: '34 families',
    status: 'Published',
    updated: 'Mar 25, 2025',
  },
  {
    id: 3,
    title: 'Movement & Play — Week 2',
    week: 'Week 2',
    age: '2–3 years',
    activities: 6,
    membership: 'Grow Together',
    assigned: '28 families',
    status: 'Published',
    updated: 'Mar 24, 2025',
  },
  {
    id: 4,
    title: 'Everyday Routines — Week 3',
    week: 'Week 3',
    age: '2–3 years',
    activities: 5,
    membership: 'Little Steps',
    assigned: '21 families',
    status: 'Draft',
    updated: 'Mar 22, 2025',
  },
  {
    id: 5,
    title: 'Confident Communicators — Week 1',
    week: 'Week 1',
    age: '3–4 years',
    activities: 5,
    membership: 'Grow Together',
    assigned: '34 families',
    status: 'Draft',
    updated: 'Mar 20, 2025',
  },
  {
    id: 6,
    title: 'Big Feelings, Small Steps — Week 2',
    week: 'Week 2',
    age: '3–4 years',
    activities: 6,
    membership: 'Personalized Pathways',
    assigned: '17 families',
    status: 'Archived',
    updated: 'Mar 18, 2025',
  },
  {
    id: 7,
    title: 'Sensory Foundations — Week 2',
    week: 'Week 2',
    age: '1–2 years',
    activities: 5,
    membership: 'Little Steps',
    assigned: '34 families',
    status: 'Published',
    updated: 'Mar 17, 2025',
  },
  {
    id: 8,
    title: 'Language Launch — Week 2',
    week: 'Week 2',
    age: '1–2 years',
    activities: 5,
    membership: 'Personalized Pathways',
    assigned: '34 families',
    status: 'Archived',
    updated: 'Mar 15, 2025',
  },
];
