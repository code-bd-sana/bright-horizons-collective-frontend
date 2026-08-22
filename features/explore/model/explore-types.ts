export const exploreTabs = ['activities', 'parent-resources', 'therapy-toys'] as const;

export type ExploreTab = (typeof exploreTabs)[number];

export const exploreFilterKeys = [
  'age',
  'developmentalSkill',
  'category',
  'collection',
  'difficulty',
] as const;

export type ExploreFilterKey = (typeof exploreFilterKeys)[number];
export type ExploreFilters = Record<ExploreFilterKey, string[]>;

export const emptyExploreFilters: ExploreFilters = {
  age: [],
  developmentalSkill: [],
  category: [],
  collection: [],
  difficulty: [],
};

type ExploreItemBase = {
  id: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  badge: string;
  href: string;
  saved: boolean;
  filters: Partial<Record<ExploreFilterKey, string[]>>;
};

export type ActivityExploreItem = ExploreItemBase & {
  kind: 'activity';
  material: string;
  duration: string;
  tags: string[];
  highlighted?: boolean;
};

export type ParentResourceExploreItem = ExploreItemBase & {
  kind: 'parent-resource';
  description: string;
  readTime: string;
  actionLabel: string;
  highlighted?: boolean;
};

export type PrintableExploreItem = ExploreItemBase & {
  kind: 'printable';
  description: string;
  downloadLabel: string;
};

export type TherapyToyExploreItem = ExploreItemBase & {
  kind: 'therapy-toy';
  age: string;
  skills: string[];
  compact?: boolean;
};

export type ExploreItem = ActivityExploreItem | ParentResourceExploreItem | TherapyToyExploreItem;

export type ExploreCardItem = ExploreItem | PrintableExploreItem;

export type ExplorePagePayload = {
  tab: ExploreTab;
  items: ExploreItem[];
  printableItems: PrintableExploreItem[];
  savedItems: ExploreItem[];
};

export type ExplorePageRequest = {
  tab: ExploreTab;
  filters: ExploreFilters;
};

export type SaveExploreItemRequest = {
  itemId: string;
  saved: boolean;
};

export function isExploreTab(value: string | undefined): value is ExploreTab {
  return exploreTabs.includes(value as ExploreTab);
}
