import { z } from 'zod';

export const resourceTypeSchema = z.enum(['ARTICLE', 'PDF', 'PRINTABLE', 'CHECKLIST', 'GUIDE']);
export const contentStatusSchema = z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']);
export const membershipTierSchema = z.enum([
  'LITTLE_STEPS',
  'GROW_TOGETHER',
  'PERSONALIZED_PATHWAYS',
]);

export const resourceAttachmentSchema = z.object({
  name: z.string(),
  url: z.string(),
  size: z.number().default(0),
  type: z.string().optional(),
});

export const backendParentResourceSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  category: z.string(),
  resourceType: resourceTypeSchema,
  author: z.string().nullable().optional(),
  estimatedReadTime: z.string().nullable().optional(),
  coverImageUrl: z.string().nullable().optional(),
  content: z.string().nullable().optional(),
  attachments: z.array(resourceAttachmentSchema).or(z.any()).nullable().optional(),
  relatedActivitiesIds: z.array(z.string()).default([]),
  relatedResourcesIds: z.array(z.string()).default([]),
  accessLevel: z.array(membershipTierSchema).default([]),
  seoTitle: z.string().nullable().optional(),
  seoDescription: z.string().nullable().optional(),
  status: contentStatusSchema,
  isFavorited: z.boolean().optional(),
  createdAt: z.string().or(z.date().transform((d) => d.toISOString())),
  updatedAt: z.string().or(z.date().transform((d) => d.toISOString())),
});

export const backendParentResourceEnvelopeSchema = z.object({
  statusCode: z.number().optional(),
  message: z.string().optional(),
  data: backendParentResourceSchema,
});

export const backendParentResourcesListEnvelopeSchema = z.object({
  statusCode: z.number().optional(),
  message: z.string().optional(),
  data: z.union([
    z.object({
      data: z.array(backendParentResourceSchema),
      meta: z.object({
        total: z.number(),
        page: z.number(),
        limit: z.number(),
        totalPages: z.number(),
      }),
    }),
    z.array(backendParentResourceSchema),
  ]),
});

export const parentResourceAdminSummaryEnvelopeSchema = z.object({
  statusCode: z.number().optional(),
  message: z.string().optional(),
  data: z.object({
    total: z.number().default(0),
    articles: z.number().default(0),
    guides: z.number().default(0),
    printables: z.number().default(0),
    pdfs: z.number().default(0),
    published: z.number().default(0),
    draft: z.number().default(0),
    archived: z.number().default(0),
  }),
});

export const parentResourceUploadEnvelopeSchema = z.object({
  statusCode: z.number().optional(),
  message: z.string().optional(),
  data: z.object({
    url: z.string().min(1, 'Upload response must include a URL.'),
  }),
});

export const parentResourceIdSchema = z.string().trim().min(1, 'Resource ID is required.');
