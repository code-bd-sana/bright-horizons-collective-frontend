export type ChildProfile = {
  id: string;
  parentId: string;
  name: string;
  photoUrl?: string | null;
  gender?: string | null;
  ageYears: number;
  ageMonths: number;
  age: number;
  caregiverName?: string | null;
  caregiverRelationship?: string | null;
  caregiverEmail?: string | null;
  caregiverPhone?: string | null;
  areasOfSupport: string[];
  notes?: string | null;
  favorites: string[];
  activityTypes: string[];
  developmentalStage?: string | null;
  interests?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateChildProfileInput = {
  name: string;
  photoUrl?: string;
  gender?: string;
  ageYears: number;
  ageMonths: number;
  caregiverName?: string;
  caregiverRelationship?: string;
  caregiverEmail?: string;
  caregiverPhone?: string;
  areasOfSupport?: string[];
  notes?: string;
  favorites?: string[];
  activityTypes?: string[];
  developmentalStage?: string;
  interests?: string;
};

export type UpdateChildProfileInput = Partial<CreateChildProfileInput>;

export type AddChildWizardState = {
  // Step 1: Basic Info
  photoFile?: File | null;
  photoPreview?: string | null;
  photoUrl?: string | null;
  nickname: string;
  gender: string;
  ageYears: string;
  ageMonths: string;

  // Step 2: Caregiver Info
  caregiverName: string;
  relationship: string;
  email: string;
  country: string;
  phone: string;

  // Step 3: Development & Focus
  areasOfSupport: string[];
  notes: string;

  // Step 4: Interests & Preferences
  favorites: string[];
  activityTypes: string[];
};
