import type {
  ActivityExploreItem,
  ParentResourceExploreItem,
  PrintableExploreItem,
  TherapyToyExploreItem,
} from '@/features/explore/model/explore-types';
import { figmaExploreImages } from '@/features/explore/data/figma-explore-assets';

const activityBase = {
  imageAlt: 'A therapist-designed developmental activity',
  href: '/dashboard/weekly-plans/activity-detail',
  saved: false,
};

const sortingActivity = (
  id: string,
  highlighted = false,
  imageSrc: string = figmaExploreImages.activities.stacking.src
): ActivityExploreItem => ({
  ...activityBase,
  id,
  kind: 'activity',
  title: 'Stacking & Sorting Challenge',
  imageSrc,
  badge: 'Easy',
  material: 'Blocks',
  duration: '20 min',
  tags: ['🏠 Indoor', '18–36 mo', 'Fine Motor'],
  highlighted,
  filters: {
    age: ['12–24 mo', '2–3 yr'],
    developmentalSkill: ['Fine Motor'],
    category: ['Indoor'],
    collection: ['Starter Series'],
    difficulty: ['Easy'],
  },
});

const outdoorActivity = (id: string): ActivityExploreItem => ({
  ...activityBase,
  id,
  kind: 'activity',
  title: 'Outdoor Balance Walk',
  imageSrc: figmaExploreImages.activities.outdoor.src,
  badge: 'Moderate',
  material: 'Low beam',
  duration: '15 min',
  tags: ['🌿 Outdoor', '2–4 yr', 'Sensory'],
  filters: {
    age: ['2–3 yr', '3–5 yr'],
    developmentalSkill: ['Gross Motor', 'Sensory'],
    category: ['Outdoor'],
    collection: ['Sensory Saturdays'],
    difficulty: ['Moderate'],
  },
});

export const demoActivities: ActivityExploreItem[] = [
  sortingActivity('activity-01', true),
  sortingActivity('activity-02', false, figmaExploreImages.activities.blocks.src),
  outdoorActivity('activity-03'),
  outdoorActivity('activity-04'),
  sortingActivity('activity-05'),
  sortingActivity('activity-06', false, figmaExploreImages.activities.blocks.src),
  outdoorActivity('activity-07'),
  outdoorActivity('activity-08'),
  sortingActivity('activity-09'),
  sortingActivity('activity-10', false, figmaExploreImages.activities.blocks.src),
];

export const demoSavedActivities: ActivityExploreItem[] = [1, 2, 3, 4].map((number) => ({
  ...sortingActivity(`saved-activity-${number}`),
  saved: true,
}));

const resourceDetails = {
  parent: {
    title: 'Parent Education',
    imageSrc: figmaExploreImages.resources.parentEducation.src,
    description: 'OT-written articles on development, play, and everyday strategies',
  },
  milestones: {
    title: 'Milestones',
    imageSrc: figmaExploreImages.resources.milestones.src,
    description: 'Age-by-age developmental milestones with guidance on what to watch for',
  },
  printable: {
    title: 'Printable',
    imageSrc: figmaExploreImages.resources.printable.src,
    description: 'Downloadable activity cards, visual schedules, and tracking sheets',
  },
  guides: {
    title: 'Guides',
    imageSrc: figmaExploreImages.resources.guides.src,
    description: 'In-depth guides covering sleep, feeding, sensory, and transitions',
  },
} as const;

type ResourceType = keyof typeof resourceDetails;

const resource = (
  id: string,
  type: ResourceType,
  highlighted = false
): ParentResourceExploreItem => {
  const detail = resourceDetails[type];

  return {
    id,
    kind: 'parent-resource',
    title: detail.title,
    imageSrc: detail.imageSrc,
    imageAlt: `Parent resource about ${detail.title.toLowerCase()}`,
    badge: type === 'printable' ? 'Printable' : type === 'milestones' ? 'Stages' : 'Sensory',
    href: `/dashboard/explore?tab=parent-resources#${type}`,
    saved: false,
    description: detail.description,
    readTime: '5 min Read',
    actionLabel: 'Explore',
    highlighted,
    filters: {
      age: ['2–3 yr', '3–5 yr'],
      developmentalSkill: type === 'milestones' ? ['Gross Motor'] : ['Sensory'],
      category: ['Parent Education'],
      collection: type === 'printable' ? ['OT Picks'] : ['Starter Series'],
      difficulty: ['Easy'],
    },
  };
};

export const demoParentResources: ParentResourceExploreItem[] = [
  resource('resource-01', 'parent', true),
  resource('resource-02', 'milestones'),
  resource('resource-03', 'printable'),
  resource('resource-04', 'guides'),
  resource('resource-05', 'parent'),
  resource('resource-06', 'milestones'),
  resource('resource-07', 'printable'),
  resource('resource-08', 'guides'),
];

export const demoSavedResources: ParentResourceExploreItem[] = [
  { ...resource('saved-resource-01', 'parent'), saved: true },
  { ...resource('saved-resource-02', 'milestones'), saved: true },
  { ...resource('saved-resource-03', 'printable'), saved: true },
];

export const demoPrintables: PrintableExploreItem[] = [1, 2].map((number) => ({
  id: `printable-${number}`,
  kind: 'printable',
  title: 'Daily Routine Chart',
  imageSrc: figmaExploreImages.resources.parentEducation.src,
  imageAlt: 'Parent and child using a daily routine chart',
  badge: 'Sensory',
  href: `/downloads/daily-routine-chart-${number}.pdf`,
  saved: false,
  description: 'Customizable morning and evening checklist for preschool ages.',
  downloadLabel: 'Download (1.2 MB)',
  filters: {
    age: ['2–3 yr', '3–5 yr'],
    developmentalSkill: ['Sensory'],
    category: ['Parent Education'],
    collection: ['OT Picks'],
    difficulty: ['Easy'],
  },
}));

const toyImages = [
  {
    src: figmaExploreImages.therapyToys.camera.src,
    alt: 'A child exploring a colorful toy camera',
  },
  {
    src: figmaExploreImages.therapyToys.superhero.src,
    alt: 'Children wearing superhero costumes during imaginative play',
  },
  {
    src: figmaExploreImages.therapyToys.crafts.src,
    alt: 'A child creating a colorful paper craft',
  },
  {
    src: figmaExploreImages.therapyToys.bubbles.src,
    alt: 'Children practicing breath control by blowing bubbles',
  },
  {
    src: figmaExploreImages.therapyToys.friends.src,
    alt: 'Three children laughing together during social play',
  },
  {
    src: figmaExploreImages.therapyToys.blocks.src,
    alt: 'A young child stacking colorful soft blocks',
  },
] as const;

export const demoTherapyToys: TherapyToyExploreItem[] = toyImages.map((image, index) => ({
  id: `therapy-toy-${index + 1}`,
  kind: 'therapy-toy',
  title: 'Sensory Rice Bin Exploration',
  imageSrc: image.src,
  imageAlt: image.alt,
  badge: 'OT Favorite',
  href: `/dashboard/explore?tab=therapy-toys#therapy-toy-${index + 1}`,
  saved: false,
  age: '12 mo+',
  skills: ['Fine Motor', 'Coordination'],
  compact: index === 2,
  filters: {
    age: ['12–24 mo', '2–3 yr'],
    developmentalSkill: ['Fine Motor', 'Coordination'],
    category: ['Messy Play'],
    collection: ['Sensory Saturdays', 'OT Picks'],
    difficulty: ['Easy'],
  },
}));

export const demoSavedTherapyToys: TherapyToyExploreItem[] = [1, 2, 3].map((number) => ({
  ...demoTherapyToys[0],
  id: `saved-therapy-toy-${number}`,
  saved: true,
  compact: false,
}));
