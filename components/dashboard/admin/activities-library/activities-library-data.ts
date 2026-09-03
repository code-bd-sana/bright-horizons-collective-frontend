export type ActivityItem = {
  id: string;
  image: string;
  title: string;
  description: string;
  area: string;
  age: string;
  plan: string;
  status: 'Published' | 'Draft';
};

export const activityFilters = [
  'All',
  'Fine Motor',
  'Gross Motor',
  'Speech',
  'Sensory',
  'Social',
  'Self Regulation',
] as const;

export const activityItems: ActivityItem[] = [
  '/images/admin/activities/finger-painting-fun-01.jpeg',
  '/images/admin/activities/finger-painting-fun-02.jpeg',
  '/images/admin/activities/finger-painting-fun-03.jpeg',
  '/images/admin/activities/finger-painting-fun-04.jpeg',
  '/images/admin/activities/finger-painting-fun-05.jpeg',
  '/images/admin/activities/finger-painting-fun-06.jpeg',
].map((image, index) => ({
  id: `finger-painting-fun-${index + 1}`,
  image,
  title: 'Finger Painting Fun',
  description:
    'Engage children in color recognition and sorting with sensory bins filled with colorful objects.',
  area: 'Fine Motor',
  age: '1–2 years',
  plan: 'Little Steps',
  status: 'Published',
}));
