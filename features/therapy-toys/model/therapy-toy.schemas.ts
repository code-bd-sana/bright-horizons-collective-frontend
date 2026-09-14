import { z } from 'zod';

import {
  MEMBERSHIP_TIERS,
  SORT_DIRECTIONS,
  THERAPY_TOY_SORT_FIELDS,
  THERAPY_TOY_STATUSES,
} from './therapy-toy.types';

const httpUrlSchema = z
  .string()
  .url()
  .refine((value) => /^https?:\/\//i.test(value), {
    message: 'Enter a valid HTTP or HTTPS URL.',
  });

const optionalHttpUrlSchema = z.preprocess(
  (value) => (typeof value === 'string' && value.trim() === '' ? undefined : value),
  httpUrlSchema.max(2048).optional()
);

const optionalTrimmedQueryString = (maximum: number) =>
  z.preprocess(
    (value) => (typeof value === 'string' && value.trim() === '' ? undefined : value),
    z.string().trim().min(1).max(maximum).optional()
  );

const ageMonthsSchema = z.number().int().min(0).max(2160);
const membershipTierSchema = z.enum(MEMBERSHIP_TIERS);
const therapyToyStatusSchema = z.enum(THERAPY_TOY_STATUSES);

const therapyToyInputShape = {
  name: z.string().trim().min(1, 'Toy name is required.').max(200),
  description: z.string().trim().min(1, 'Description is required.').max(5000),
  developmentArea: z.string().trim().min(1, 'Development area is required.').max(100),
  price: z.number().min(0).max(99_999_999.99).multipleOf(0.01),
  minAgeMonths: ageMonthsSchema,
  maxAgeMonths: ageMonthsSchema,
  imageUrl: optionalHttpUrlSchema,
  affiliateLink: optionalHttpUrlSchema,
  accessLevel: z
    .array(membershipTierSchema)
    .min(1)
    .max(MEMBERSHIP_TIERS.length)
    .refine((values) => new Set(values).size === values.length, {
      message: 'Membership tiers must be unique.',
    })
    .optional(),
  status: therapyToyStatusSchema.optional(),
};

export const createTherapyToySchema = z
  .object(therapyToyInputShape)
  .strict()
  .refine((value) => value.maxAgeMonths >= value.minAgeMonths, {
    message: 'Maximum age must be greater than or equal to minimum age.',
    path: ['maxAgeMonths'],
  });

export const updateTherapyToySchema = z
  .object(therapyToyInputShape)
  .partial()
  .strict()
  .refine((value) => Object.keys(value).length > 0, {
    message: 'At least one field is required.',
  })
  .refine(
    (value) =>
      value.minAgeMonths === undefined ||
      value.maxAgeMonths === undefined ||
      value.maxAgeMonths >= value.minAgeMonths,
    {
      message: 'Maximum age must be greater than or equal to minimum age.',
      path: ['maxAgeMonths'],
    }
  );

const queryInteger = (minimum: number, maximum: number) =>
  z.preprocess(
    (value) => (typeof value === 'string' && value.trim() === '' ? undefined : value),
    z.coerce.number().int().min(minimum).max(maximum).optional()
  );

export const publicTherapyToyFiltersSchema = z
  .object({
    page: queryInteger(1, 1_000_000),
    limit: queryInteger(1, 100),
    search: optionalTrimmedQueryString(100),
    category: optionalTrimmedQueryString(100),
    minAgeMonths: queryInteger(0, 2160),
    maxAgeMonths: queryInteger(0, 2160),
    membership: membershipTierSchema.optional(),
    sortBy: z.enum(THERAPY_TOY_SORT_FIELDS).optional(),
    sortOrder: z.enum(SORT_DIRECTIONS).optional(),
  })
  .strict()
  .refine(
    (value) =>
      value.minAgeMonths === undefined ||
      value.maxAgeMonths === undefined ||
      value.maxAgeMonths >= value.minAgeMonths,
    {
      message: 'Maximum age must be greater than or equal to minimum age.',
      path: ['maxAgeMonths'],
    }
  );

export const adminTherapyToyFiltersSchema = publicTherapyToyFiltersSchema.safeExtend({
  status: therapyToyStatusSchema.optional(),
});

export const therapyToyIdSchema = z.string().uuid('Invalid therapy toy ID.');

export const therapyToySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  developmentArea: z.string(),
  price: z.number().nullable(),
  currency: z.literal('USD'),
  minAgeMonths: z.number().int().nonnegative(),
  maxAgeMonths: z.number().int().nonnegative(),
  imageUrl: httpUrlSchema.nullable(),
  affiliateLink: httpUrlSchema.nullable(),
  accessLevel: z.array(membershipTierSchema),
  status: therapyToyStatusSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const therapyToyPaginationSchema = z.object({
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  total: z.number().int().nonnegative(),
  totalPages: z.number().int().nonnegative(),
});

export const therapyToyPageSchema = z.object({
  items: z.array(therapyToySchema),
  pagination: therapyToyPaginationSchema,
});

export const therapyToyAdminSummarySchema = z.object({
  total: z.number().int().nonnegative(),
  published: z.number().int().nonnegative(),
  draft: z.number().int().nonnegative(),
  archived: z.number().int().nonnegative(),
  categories: z.number().int().nonnegative(),
});

export const therapyToyUploadResultSchema = z.object({
  url: httpUrlSchema,
});

export const deleteTherapyToyImageSchema = z.object({
  url: httpUrlSchema.max(2048),
});

export const deleteTherapyToyImageResultSchema = z.object({
  deleted: z.boolean(),
});

export const therapyToyUploadMetadataSchema = z.object({
  name: z.string().min(1).max(255),
  size: z
    .number()
    .int()
    .positive()
    .max(5 * 1024 * 1024),
  type: z.enum(['image/jpeg', 'image/png', 'image/webp']),
});

export const therapyToyFavoriteResultSchema = z.object({
  status: z.enum(['favorited', 'unfavorited']),
  type: z.literal('toy'),
  data: z.unknown().optional(),
});

export const apiEnvelopeSchema = <T extends z.ZodType>(dataSchema: T) =>
  z.object({
    statusCode: z.number().int(),
    message: z.string(),
    data: dataSchema,
  });

export const therapyToyEnvelopeSchema = apiEnvelopeSchema(therapyToySchema);
export const therapyToyPageEnvelopeSchema = apiEnvelopeSchema(therapyToyPageSchema);
export const therapyToyAdminSummaryEnvelopeSchema = apiEnvelopeSchema(therapyToyAdminSummarySchema);
export const therapyToyUploadEnvelopeSchema = apiEnvelopeSchema(therapyToyUploadResultSchema);
export const deleteTherapyToyImageEnvelopeSchema = apiEnvelopeSchema(
  deleteTherapyToyImageResultSchema
);
export const therapyToyFavoriteEnvelopeSchema = apiEnvelopeSchema(therapyToyFavoriteResultSchema);

export type BackendTherapyToy = z.infer<typeof therapyToySchema>;
export type BackendTherapyToyPage = z.infer<typeof therapyToyPageSchema>;
