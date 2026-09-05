export type TherapyToyStatus = 'Published' | 'Draft';

export type TherapyToy = {
  id: string;
  title: string;
  brand: string;
  category: string;
  ageRange: string;
  primarySkill: string;
  membership: string;
  status: TherapyToyStatus;
  updatedAt: string;
};
