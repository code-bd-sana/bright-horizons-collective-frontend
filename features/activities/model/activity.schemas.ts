import { z } from 'zod';

export const activityDifficultySchema = z.enum(['EASY', 'MODERATE', 'CHALLENGING']);
export const activityStatusSchema = z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']);

export const materialItemSchema = z.object({
  name: z.string().trim().min(1, 'Material name cannot be empty.'),
});

export const instructionStepSchema = z.object({
  title: z.string().trim().min(1, 'Step title cannot be empty.'),
  description: z.string().default(''),
});

export const backendActivitySchema = z.object({
  id: z.string(),
  title: z.string(),
  shortDescription: z.string(),
  learningObjective: z.string().nullable().optional(),
  developmentCategory: z.string(),
  minAgeMonths: z.number(),
  maxAgeMonths: z.number(),
  ageGroup: z.string().nullable().optional(),
  featuredImageUrl: z.string().nullable().optional(),
  developmentGoal: z.string(),
  materialsSummary: z.string().nullable().optional(),
  isOtDesigned: z.boolean().default(true),
  otDesigned: z.string().nullable().optional(),
  estimatedDuration: z.string().nullable().optional(),
  difficultyLevel: activityDifficultySchema,
  materialsNeeded: z.array(materialItemSchema).or(z.any()),
  instructions: z.array(instructionStepSchema).or(z.any()),
  makeItEasier: z.string().nullable().optional(),
  makeItHarder: z.string().nullable().optional(),
  parentTips: z.string().nullable().optional(),
  safetyNotes: z.string().nullable().optional(),
  accessLevel: z.array(z.string()).default([]),
  status: activityStatusSchema,
  isFavorited: z.boolean().optional(),
  isCompleted: z.boolean().optional(),
  createdAt: z.string().or(z.date().transform((d) => d.toISOString())),
  updatedAt: z.string().or(z.date().transform((d) => d.toISOString())),
});

export const backendActivityEnvelopeSchema = z.object({
  statusCode: z.number().optional(),
  message: z.string().optional(),
  data: backendActivitySchema,
});

export const backendActivitiesListEnvelopeSchema = z.object({
  statusCode: z.number().optional(),
  message: z.string().optional(),
  data: z.union([
    z.object({
      data: z.array(backendActivitySchema),
      meta: z.object({
        total: z.number(),
        page: z.number(),
        limit: z.number(),
        totalPages: z.number(),
      }),
    }),
    z.array(backendActivitySchema).transform((items) => ({
      data: items,
      meta: {
        total: items.length,
        page: 1,
        limit: items.length || 1,
        totalPages: 1,
      },
    })),
  ]),
});

export const activityAdminSummarySchema = z.object({
  total: z.number(),
  published: z.number(),
  draft: z.number(),
  archived: z.number(),
  categories: z.number(),
});

export const activityAdminSummaryEnvelopeSchema = z.object({
  statusCode: z.number().optional(),
  message: z.string().optional(),
  data: activityAdminSummarySchema,
});

export const activityUploadMetadataSchema = z.object({
  name: z.string().min(1).max(255),
  size: z
    .number()
    .int()
    .positive()
    .max(5 * 1024 * 1024, 'Image size must be less than 5MB.'),
  type: z.enum(['image/jpeg', 'image/png', 'image/webp']),
});

export const activityUploadEnvelopeSchema = z.object({
  statusCode: z.number().optional(),
  message: z.string().optional(),
  data: z.object({
    url: z.string().min(1),
  }),
});

export const activityIdSchema = z.string().trim().min(1, 'Activity ID is required.');

export const updateActivitySchema = z
  .object({
    title: z.string().trim().min(1).optional(),
    shortDescription: z.string().trim().min(1).optional(),
    learningObjective: z.string().nullable().optional(),
    developmentCategory: z.string().trim().min(1).optional(),
    minAgeMonths: z.number().int().min(0).optional(),
    maxAgeMonths: z.number().int().min(0).optional(),
    ageGroup: z.string().nullable().optional(),
    featuredImageUrl: z.string().nullable().optional(),
    developmentGoal: z.string().trim().min(1).optional(),
    materialsSummary: z.string().nullable().optional(),
    isOtDesigned: z.boolean().optional(),
    otDesigned: z.string().nullable().optional(),
    estimatedDuration: z.string().nullable().optional(),
    difficultyLevel: activityDifficultySchema.optional(),
    materialsNeeded: z.array(materialItemSchema).or(z.any()).optional(),
    instructions: z.array(instructionStepSchema).or(z.any()).optional(),
    makeItEasier: z.string().nullable().optional(),
    makeItHarder: z.string().nullable().optional(),
    parentTips: z.string().nullable().optional(),
    safetyNotes: z.string().nullable().optional(),
    accessLevel: z.array(z.string()).optional(),
    status: activityStatusSchema.optional(),
  })
  .strict();
