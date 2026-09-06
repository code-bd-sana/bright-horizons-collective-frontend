export type ResourceStatus = 'Published' | 'Draft';

export type ParentResource = {
  id: string;
  title: string;
  author: string;
  readTime: string;
  category: string;
  type: string;
  membership: string;
  downloads: number;
  status: ResourceStatus;
  updatedAt: string;
};
