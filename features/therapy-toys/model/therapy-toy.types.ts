export const THERAPY_TOY_STATUSES = ['DRAFT', 'PUBLISHED', 'ARCHIVED'] as const;
export const MEMBERSHIP_TIERS = ['LITTLE_STEPS', 'GROW_TOGETHER', 'PERSONALIZED_PATHWAYS'] as const;
export const THERAPY_TOY_SORT_FIELDS = [
  'createdAt',
  'updatedAt',
  'name',
  'developmentArea',
  'price',
  'minAgeMonths',
  'maxAgeMonths',
  'status',
] as const;
export const SORT_DIRECTIONS = ['asc', 'desc'] as const;

export type TherapyToyStatus = (typeof THERAPY_TOY_STATUSES)[number];
export type MembershipTier = (typeof MEMBERSHIP_TIERS)[number];
export type TherapyToySortField = (typeof THERAPY_TOY_SORT_FIELDS)[number];
export type SortDirection = (typeof SORT_DIRECTIONS)[number];

export interface TherapyToy {
  id: string;
  name: string;
  description: string;
  developmentArea: string;
  price: number | null;
  currency: 'USD';
  minAgeMonths: number;
  maxAgeMonths: number;
  imageUrl: string | null;
  affiliateLink: string | null;
  accessLevel: MembershipTier[];
  status: TherapyToyStatus;
  createdAt: string;
  updatedAt: string;
}

export interface TherapyToyPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface TherapyToyPage {
  items: TherapyToy[];
  pagination: TherapyToyPagination;
}

export interface TherapyToyFilters {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  minAgeMonths?: number;
  maxAgeMonths?: number;
  membership?: MembershipTier;
  sortBy?: TherapyToySortField;
  sortOrder?: SortDirection;
}

export interface AdminTherapyToyFilters extends TherapyToyFilters {
  status?: TherapyToyStatus;
}

export interface CreateTherapyToyInput {
  name: string;
  description: string;
  developmentArea: string;
  price: number;
  minAgeMonths: number;
  maxAgeMonths: number;
  imageUrl?: string;
  affiliateLink?: string;
  accessLevel?: MembershipTier[];
  status?: TherapyToyStatus;
}

export type UpdateTherapyToyInput = Partial<CreateTherapyToyInput> & {
  imageUrl?: string | null;
};

export interface UpdateTherapyToyVariables {
  id: string;
  input: UpdateTherapyToyInput;
}

export interface TherapyToyAdminSummary {
  total: number;
  published: number;
  draft: number;
  archived: number;
  categories: number;
}

export interface TherapyToyUploadResult {
  url: string;
}

export interface DeleteTherapyToyImageInput {
  url: string;
}

export interface DeleteTherapyToyImageResult {
  deleted: boolean;
}

export interface TherapyToyFavoriteResult {
  status: 'favorited' | 'unfavorited';
  type: 'toy';
}
