import { z } from 'zod';

export const childIdSchema = z.string().uuid('Invalid child ID.');

export const createChildProfileSchema = z.object({
  name: z.string().trim().min(1, 'Please enter a name or nickname.'),
  photoUrl: z.string().optional(),
  gender: z.string().optional(),
  ageYears: z.coerce.number().min(0).max(17).default(0),
  ageMonths: z.coerce.number().min(0).max(11).default(0),
  caregiverName: z.string().optional(),
  caregiverRelationship: z.string().optional(),
  caregiverEmail: z.string().email().optional().or(z.literal('')),
  caregiverPhone: z.string().optional(),
  areasOfSupport: z.array(z.string()).default([]),
  notes: z.string().optional(),
  favorites: z.array(z.string()).default([]),
  activityTypes: z.array(z.string()).default([]),
  developmentalStage: z.string().optional(),
  interests: z.string().optional(),
});

export const updateChildProfileSchema = createChildProfileSchema.partial();

export const backendChildEnvelopeSchema = z.object({
  statusCode: z.number().optional(),
  message: z.string().optional(),
  data: z.object({
    id: z.string(),
    parentId: z.string(),
    name: z.string(),
    photoUrl: z.string().nullable().optional(),
    gender: z.string().nullable().optional(),
    ageYears: z.number().default(0),
    ageMonths: z.number().default(0),
    age: z.number().default(0),
    caregiverName: z.string().nullable().optional(),
    caregiverRelationship: z.string().nullable().optional(),
    caregiverEmail: z.string().nullable().optional(),
    caregiverPhone: z.string().nullable().optional(),
    areasOfSupport: z.array(z.string()).default([]),
    notes: z.string().nullable().optional(),
    favorites: z.array(z.string()).default([]),
    activityTypes: z.array(z.string()).default([]),
    developmentalStage: z.string().nullable().optional(),
    interests: z.string().nullable().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});

export const backendChildrenListEnvelopeSchema = z.object({
  statusCode: z.number().optional(),
  message: z.string().optional(),
  data: z.array(backendChildEnvelopeSchema.shape.data),
});

export const childUploadMetadataSchema = z.object({
  name: z.string().min(1, 'File name is required.'),
  size: z.number().max(5 * 1024 * 1024, 'Avatar image must not exceed 5 MB.'),
  type: z.enum(['image/jpeg', 'image/png', 'image/webp'], {
    message: 'Avatar image must be JPEG, PNG, or WebP.',
  }),
});

export const childUploadEnvelopeSchema = z.object({
  statusCode: z.number().optional(),
  message: z.string().optional(),
  data: z.object({
    url: z.string().min(1),
  }),
});
