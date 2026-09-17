export type ActivityDifficulty = 'EASY' | 'MODERATE' | 'CHALLENGING';
export type ActivityStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export type ActivityMaterial = {
  name: string;
};

export type ActivityInstruction = {
  title: string;
  description?: string;
};

export type Activity = {
  id: string;
  title: string;
  shortDescription: string;
  learningObjective?: string | null;
  developmentCategory: string;
  minAgeMonths: number;
  maxAgeMonths: number;
  ageGroup?: string | null;
  featuredImageUrl?: string | null;
  developmentGoal: string;
  materialsSummary?: string | null;
  isOtDesigned: boolean;
  otDesigned?: string | null;
  estimatedDuration?: string | null;
  difficultyLevel: ActivityDifficulty;
  materialsNeeded: ActivityMaterial[];
  instructions: ActivityInstruction[];
  makeItEasier?: string | null;
  makeItHarder?: string | null;
  parentTips?: string | null;
  safetyNotes?: string | null;
  accessLevel: string[];
  status: ActivityStatus;
  createdAt: string;
  updatedAt: string;
};

export type CreateActivityInput = {
  title: string;
  shortDescription: string;
  learningObjective?: string;
  developmentCategory: string;
  minAgeMonths: number;
  maxAgeMonths: number;
  featuredImageUrl?: string;
  developmentGoal: string;
  materialsSummary?: string;
  isOtDesigned?: boolean;
  otDesigned?: string;
  estimatedDuration?: string;
  difficultyLevel: ActivityDifficulty;
  materialsNeeded: ActivityMaterial[];
  instructions: ActivityInstruction[];
  makeItEasier?: string;
  makeItHarder?: string;
  parentTips?: string;
  safetyNotes?: string;
  accessLevel?: string[];
  status?: ActivityStatus;
};

export type UpdateActivityInput = Partial<CreateActivityInput>;

export type ActivitySummary = {
  total: number;
  published: number;
  draft: number;
  archived: number;
};
