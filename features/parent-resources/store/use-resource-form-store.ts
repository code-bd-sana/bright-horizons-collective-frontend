import { create } from 'zustand';
import {
  type ContentStatus,
  type CreateParentResourceInput,
  type ParentResource,
  type ResourceAttachment,
  type UiMembershipTier,
  type UiResourceType,
  UI_TO_BACKEND_RESOURCE_TYPE,
  UI_TO_BACKEND_TIER,
  BACKEND_TO_UI_RESOURCE_TYPE,
  getUiTierFromAccessLevel,
} from '../model/parent-resource.types';

export interface ResourceFormState {
  // Step 1: Basic Info
  title: string;
  summary: string;
  category: string;
  resourceType: UiResourceType;
  author: string;
  readingTime: string;
  coverImageUrl: string;
  coverImageFile: File | null;
  coverImageName: string;

  // Step 2: Content
  content: string;

  // Step 3: Attachments
  attachments: ResourceAttachment[];

  // Step 4: Related Items
  relatedActivitiesIds: string[];
  relatedResourcesIds: string[];

  // Step 5: Membership Access
  membershipTier: UiMembershipTier;

  // Step 6: SEO
  seoTitle: string;
  seoDescription: string;
  keywords: string;

  // Step 7 / General: Status
  status: ContentStatus;

  // Edit Mode
  editingResourceId: string | null;

  // Actions
  setEditingResourceId: (id: string | null) => void;
  setBasicInfo: (
    info: Partial<{
      title: string;
      summary: string;
      category: string;
      resourceType: UiResourceType;
      author: string;
      readingTime: string;
      coverImageUrl: string;
      coverImageFile: File | null;
      coverImageName: string;
    }>
  ) => void;
  setContent: (content: string) => void;
  setAttachments: (attachments: ResourceAttachment[]) => void;
  addAttachment: (attachment: ResourceAttachment) => void;
  removeAttachment: (index: number) => void;
  setRelated: (related: {
    relatedActivitiesIds?: string[];
    relatedResourcesIds?: string[];
  }) => void;
  setMembershipTier: (tier: UiMembershipTier) => void;
  setSeo: (seo: Partial<{ seoTitle: string; seoDescription: string; keywords: string }>) => void;
  setStatus: (status: ContentStatus) => void;
  resetForm: () => void;
  populateFromResource: (resource: ParentResource) => void;
  getCreatePayload: () => CreateParentResourceInput;
}

const initialState = {
  editingResourceId: null as string | null,
  title: '',
  summary: '',
  category: '',
  resourceType: 'Article' as UiResourceType,
  author: 'Sarah K.',
  readingTime: '',
  coverImageUrl: '',
  coverImageFile: null,
  coverImageName: '',
  content: '',
  attachments: [],
  relatedActivitiesIds: [],
  relatedResourcesIds: [],
  membershipTier: 'little-steps' as UiMembershipTier,
  seoTitle: '',
  seoDescription: '',
  keywords: '',
  status: 'DRAFT' as ContentStatus,
};

export const useResourceFormStore = create<ResourceFormState>((set, get) => ({
  ...initialState,

  setEditingResourceId: (editingResourceId) => set({ editingResourceId }),

  setBasicInfo: (info) => set((state) => ({ ...state, ...info })),

  setContent: (content) => set({ content }),

  setAttachments: (attachments) => set({ attachments }),

  addAttachment: (attachment) =>
    set((state) => ({
      attachments: [...state.attachments, attachment],
    })),

  removeAttachment: (index) =>
    set((state) => ({
      attachments: state.attachments.filter((_, i) => i !== index),
    })),

  setRelated: (related) =>
    set((state) => ({
      ...state,
      relatedActivitiesIds: related.relatedActivitiesIds ?? state.relatedActivitiesIds,
      relatedResourcesIds: related.relatedResourcesIds ?? state.relatedResourcesIds,
    })),

  setMembershipTier: (membershipTier) => set({ membershipTier }),

  setSeo: (seo) => set((state) => ({ ...state, ...seo })),

  setStatus: (status) => set({ status }),

  resetForm: () => set({ ...initialState }),

  populateFromResource: (resource: ParentResource) => {
    set({
      editingResourceId: resource.id,
      title: resource.title || '',
      summary: resource.summary || '',
      category: resource.category || '',
      resourceType: BACKEND_TO_UI_RESOURCE_TYPE[resource.resourceType] || 'Article',
      author: resource.author || 'Sarah K.',
      readingTime: resource.estimatedReadTime || '',
      coverImageUrl: resource.coverImageUrl || '',
      coverImageFile: null,
      coverImageName: resource.coverImageUrl ? resource.coverImageUrl.split('/').pop() || '' : '',
      content: resource.content || '',
      attachments: (resource.attachments as ResourceAttachment[]) || [],
      relatedActivitiesIds: resource.relatedActivitiesIds || [],
      relatedResourcesIds: resource.relatedResourcesIds || [],
      membershipTier: getUiTierFromAccessLevel(resource.accessLevel),
      seoTitle: resource.seoTitle || '',
      seoDescription: resource.seoDescription || '',
      keywords: '',
      status: resource.status || 'DRAFT',
    });
  },

  getCreatePayload: (): CreateParentResourceInput => {
    const state = get();
    return {
      title: state.title.trim(),
      summary: state.summary.trim(),
      category: state.category.trim(),
      resourceType: UI_TO_BACKEND_RESOURCE_TYPE[state.resourceType] || 'ARTICLE',
      author: state.author.trim() || undefined,
      estimatedReadTime: state.readingTime.trim() || undefined,
      coverImageUrl: state.coverImageUrl.trim() || undefined,
      content: state.content.trim() || undefined,
      attachments: state.attachments.map(({ name, url, size, type }) => ({
        name,
        url,
        size,
        type,
      })),
      relatedActivitiesIds: state.relatedActivitiesIds,
      relatedResourcesIds: state.relatedResourcesIds,
      accessLevel: UI_TO_BACKEND_TIER[state.membershipTier] || ['LITTLE_STEPS'],
      seoTitle: state.seoTitle.trim() || undefined,
      seoDescription: state.seoDescription.trim() || undefined,
      status: state.status,
    };
  },
}));
