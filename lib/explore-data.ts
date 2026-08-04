export type ExploreContentType = 'Activities' | 'Parent Resources' | 'Therapy Toys';

export type FilterKey = 'age' | 'skill' | 'category' | 'collection' | 'difficulty';

export interface ExploreItem {
  id: string;
  type: ExploreContentType;
  title: string;
  age: string;
  skill: string;
  category: string;
  collection: string;
  difficulty: string;
  duration: string;
  image: string;
  featured?: boolean;
  cardHeight: number;
}

export const contentTypes: ExploreContentType[] = [
  'Activities',
  'Parent Resources',
  'Therapy Toys',
];

export const filterGroups: Array<{
  key: FilterKey;
  label: string;
  options: string[];
}> = [
  { key: 'age', label: 'Age', options: ['0–12 mo', '12–24 mo', '2–3 yr', '3–5 yr', '5–7 yr'] },
  {
    key: 'skill',
    label: 'Developmental Skill',
    options: ['Fine Motor', 'Gross Motor', 'Sensory', 'Coordination', 'Visual-Motor'],
  },
  {
    key: 'category',
    label: 'Category',
    options: ['Indoor', 'Outdoor', 'Messy Play', 'Quiet Time'],
  },
  {
    key: 'collection',
    label: 'Collection',
    options: ['Starter Series', 'Sensory Saturdays', 'OT Picks'],
  },
  { key: 'difficulty', label: 'Difficulty', options: ['Easy', 'Moderate', 'Advanced'] },
];

const images = [
  '/Home/explore-card-1.png',
  '/Home/explore-card-2.png',
  '/Home/explore-card-3.png',
  '/Home/explore-card-4.png',
  '/Home/explore-card-5.png',
  '/Home/explore-card-6.png',
];

const activitySeeds = [
  [
    'Sensory Rice Bin Exploration',
    '12–24 mo',
    'Sensory',
    'Messy Play',
    'Sensory Saturdays',
    'Easy',
    '20 min',
  ],
  [
    'Nature Texture Treasure Hunt',
    '3–5 yr',
    'Sensory',
    'Outdoor',
    'OT Picks',
    'Moderate',
    '25 min',
  ],
  [
    'Playdough Shape Builders',
    '2–3 yr',
    'Fine Motor',
    'Indoor',
    'Starter Series',
    'Easy',
    '15 min',
  ],
  [
    'Bubble Catch and Reach',
    '0–12 mo',
    'Gross Motor',
    'Outdoor',
    'Starter Series',
    'Easy',
    '10 min',
  ],
  [
    'Tape Road Rescue Mission',
    '3–5 yr',
    'Visual-Motor',
    'Indoor',
    'OT Picks',
    'Moderate',
    '20 min',
  ],
  [
    'Garden Water Pouring Play',
    '5–7 yr',
    'Coordination',
    'Outdoor',
    'Sensory Saturdays',
    'Advanced',
    '30 min',
  ],
  ['Sock Ball Target Toss', '2–3 yr', 'Gross Motor', 'Indoor', 'Starter Series', 'Easy', '15 min'],
  [
    'Rainbow Sorting Station',
    '12–24 mo',
    'Fine Motor',
    'Quiet Time',
    'OT Picks',
    'Moderate',
    '20 min',
  ],
  [
    'Animal Walk Adventure',
    '3–5 yr',
    'Gross Motor',
    'Outdoor',
    'Starter Series',
    'Moderate',
    '25 min',
  ],
  [
    'Button and Bead Collage',
    '5–7 yr',
    'Fine Motor',
    'Messy Play',
    'OT Picks',
    'Advanced',
    '30 min',
  ],
  [
    'Cozy Story Stretch Break',
    '0–12 mo',
    'Coordination',
    'Quiet Time',
    'Sensory Saturdays',
    'Easy',
    '10 min',
  ],
  [
    'Sidewalk Chalk Pathways',
    '2–3 yr',
    'Visual-Motor',
    'Outdoor',
    'Starter Series',
    'Moderate',
    '20 min',
  ],
] as const;

const resourceSeeds = [
  [
    'Building a Sensory-Friendly Bedtime',
    '0–12 mo',
    'Sensory',
    'Quiet Time',
    'Starter Series',
    'Easy',
    '8 min read',
  ],
  [
    'Your Toddler’s Fine Motor Milestones',
    '12–24 mo',
    'Fine Motor',
    'Indoor',
    'OT Picks',
    'Easy',
    '6 min read',
  ],
  [
    'The Power of Purposeful Mess',
    '2–3 yr',
    'Sensory',
    'Messy Play',
    'Sensory Saturdays',
    'Moderate',
    '7 min read',
  ],
  [
    'Easy Ways to Grow Big-Body Confidence',
    '3–5 yr',
    'Gross Motor',
    'Outdoor',
    'Starter Series',
    'Easy',
    '5 min read',
  ],
  [
    'A Parent Guide to Visual-Motor Skills',
    '5–7 yr',
    'Visual-Motor',
    'Indoor',
    'OT Picks',
    'Moderate',
    '9 min read',
  ],
  [
    'Making Transitions Feel More Manageable',
    '2–3 yr',
    'Coordination',
    'Quiet Time',
    'Starter Series',
    'Easy',
    '6 min read',
  ],
  [
    'Why Repetition Builds Confidence',
    '12–24 mo',
    'Fine Motor',
    'Indoor',
    'OT Picks',
    'Moderate',
    '5 min read',
  ],
  [
    'Outdoor Play Ideas for Every Season',
    '3–5 yr',
    'Gross Motor',
    'Outdoor',
    'Sensory Saturdays',
    'Easy',
    '7 min read',
  ],
  [
    'Choosing Toys That Invite Connection',
    '0–12 mo',
    'Sensory',
    'Quiet Time',
    'Starter Series',
    'Easy',
    '4 min read',
  ],
  [
    'Supporting Your Child’s Body Awareness',
    '5–7 yr',
    'Coordination',
    'Outdoor',
    'OT Picks',
    'Advanced',
    '10 min read',
  ],
  [
    'Small-Space Movement Breaks',
    '2–3 yr',
    'Gross Motor',
    'Indoor',
    'Starter Series',
    'Moderate',
    '5 min read',
  ],
  [
    'A Calm-Down Corner That Grows With Them',
    '3–5 yr',
    'Sensory',
    'Quiet Time',
    'Sensory Saturdays',
    'Moderate',
    '8 min read',
  ],
] as const;

const toySeeds = [
  ['Chunky Lacing Beads', '12–24 mo', 'Fine Motor', 'Indoor', 'OT Picks', 'Easy', 'Toy guide'],
  [
    'Balance Stepping Stones',
    '3–5 yr',
    'Gross Motor',
    'Outdoor',
    'Starter Series',
    'Moderate',
    'Toy guide',
  ],
  [
    'Textured Sensory Balls',
    '0–12 mo',
    'Sensory',
    'Quiet Time',
    'Sensory Saturdays',
    'Easy',
    'Toy guide',
  ],
  [
    'Magnetic Building Tiles',
    '5–7 yr',
    'Visual-Motor',
    'Indoor',
    'OT Picks',
    'Moderate',
    'Toy guide',
  ],
  [
    'Water Doodle Mat',
    '2–3 yr',
    'Coordination',
    'Messy Play',
    'Starter Series',
    'Easy',
    'Toy guide',
  ],
  ['Climbing Triangle Set', '3–5 yr', 'Gross Motor', 'Indoor', 'OT Picks', 'Advanced', 'Toy guide'],
  [
    'Shape Sorter Basket',
    '12–24 mo',
    'Fine Motor',
    'Quiet Time',
    'Starter Series',
    'Easy',
    'Toy guide',
  ],
  [
    'Scooter Board Adventure Kit',
    '5–7 yr',
    'Coordination',
    'Outdoor',
    'OT Picks',
    'Advanced',
    'Toy guide',
  ],
  [
    'Sensory Play Scarves',
    '0–12 mo',
    'Sensory',
    'Quiet Time',
    'Sensory Saturdays',
    'Easy',
    'Toy guide',
  ],
  [
    'Pop Tube Discovery Set',
    '2–3 yr',
    'Fine Motor',
    'Indoor',
    'Starter Series',
    'Moderate',
    'Toy guide',
  ],
  [
    'Sidewalk Balance Line',
    '3–5 yr',
    'Visual-Motor',
    'Outdoor',
    'OT Picks',
    'Moderate',
    'Toy guide',
  ],
  [
    'Modelling Dough Tool Kit',
    '5–7 yr',
    'Fine Motor',
    'Messy Play',
    'Sensory Saturdays',
    'Advanced',
    'Toy guide',
  ],
] as const;

function createItems(
  type: ExploreContentType,
  seeds: readonly (readonly [string, string, string, string, string, string, string])[],
  imageOffset: number
): ExploreItem[] {
  return seeds.map(([title, age, skill, category, collection, difficulty, duration], index) => ({
    id: `${type.toLowerCase().replaceAll(' ', '-')}-${index + 1}`,
    type,
    title,
    age,
    skill,
    category,
    collection,
    difficulty,
    duration,
    image: images[(index + imageOffset) % images.length],
    featured: index % 3 !== 1,
    cardHeight: [540, 460, 500, 540][index % 4],
  }));
}

export const exploreItems: ExploreItem[] = [
  ...createItems('Activities', activitySeeds, 0),
  ...createItems('Parent Resources', resourceSeeds, 2),
  ...createItems('Therapy Toys', toySeeds, 4),
];
