export type ResourceType = 'ARTICLE' | 'PDF' | 'PRINTABLE' | 'CHECKLIST' | 'GUIDE';
export type ContentStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
export type MembershipTier = 'LITTLE_STEPS' | 'GROW_TOGETHER' | 'PERSONALIZED_PATHWAYS';

export type UiResourceType = 'Article' | 'PDF' | 'Printable' | 'Checklist' | 'Guide';
export type UiMembershipTier = 'little-steps' | 'grow-together' | 'personalized-pathways';

export const UI_TO_BACKEND_RESOURCE_TYPE: Record<UiResourceType, ResourceType> = {
  Article: 'ARTICLE',
  PDF: 'PDF',
  Printable: 'PRINTABLE',
  Checklist: 'CHECKLIST',
  Guide: 'GUIDE',
};

export const BACKEND_TO_UI_RESOURCE_TYPE: Record<ResourceType, UiResourceType> = {
  ARTICLE: 'Article',
  PDF: 'PDF',
  PRINTABLE: 'Printable',
  CHECKLIST: 'Checklist',
  GUIDE: 'Guide',
};

export const UI_TO_BACKEND_TIER: Record<UiMembershipTier, MembershipTier[]> = {
  'little-steps': ['LITTLE_STEPS', 'GROW_TOGETHER', 'PERSONALIZED_PATHWAYS'],
  'grow-together': ['GROW_TOGETHER', 'PERSONALIZED_PATHWAYS'],
  'personalized-pathways': ['PERSONALIZED_PATHWAYS'],
};

export function getUiTierFromAccessLevel(accessLevel: MembershipTier[] = []): UiMembershipTier {
  if (accessLevel.includes('LITTLE_STEPS')) return 'little-steps';
  if (accessLevel.includes('GROW_TOGETHER')) return 'grow-together';
  if (accessLevel.includes('PERSONALIZED_PATHWAYS')) return 'personalized-pathways';
  return 'little-steps';
}

export type ResourceAttachment = {
  name: string;
  url: string;
  size: number;
  type?: string;
  file?: File;
};

export type ParentResource = {
  id: string;
  title: string;
  summary: string;
  category: string;
  resourceType: ResourceType;
  author?: string | null;
  estimatedReadTime?: string | null;
  coverImageUrl?: string | null;
  content?: string | null;
  attachments?: ResourceAttachment[] | null;
  relatedActivitiesIds?: string[];
  relatedResourcesIds?: string[];
  accessLevel: MembershipTier[];
  seoTitle?: string | null;
  seoDescription?: string | null;
  status: ContentStatus;
  isFavorited?: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateParentResourceInput = {
  title: string;
  summary: string;
  category: string;
  resourceType: ResourceType;
  author?: string;
  estimatedReadTime?: string;
  coverImageUrl?: string;
  content?: string;
  attachments?: ResourceAttachment[];
  relatedActivitiesIds?: string[];
  relatedResourcesIds?: string[];
  accessLevel: MembershipTier[];
  seoTitle?: string;
  seoDescription?: string;
  status?: ContentStatus;
};

export type UpdateParentResourceInput = Partial<CreateParentResourceInput>;

export type UpdateParentResourceVariables = {
  id: string;
  input: UpdateParentResourceInput;
};

export type ParentResourceSummary = {
  total: number;
  articles: number;
  guides: number;
  printables: number;
  pdfs: number;
  published: number;
  draft: number;
  archived: number;
};
