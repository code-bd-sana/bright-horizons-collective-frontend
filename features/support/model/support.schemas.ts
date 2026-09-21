import { z } from 'zod';

export const ticketTypeSchema = z.enum(['CONTACT', 'FEEDBACK', 'ISSUE']);

export const ticketStatusSchema = z.enum(['OPEN', 'IN_PROGRESS', 'RESOLVED']);

export const supportTicketUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string().nullable().optional(),
  profileImage: z.string().nullable().optional(),
  role: z.string(),
});

export const supportTicketSchema = z.object({
  id: z.string(),
  userId: z.string(),
  type: ticketTypeSchema,
  subject: z.string(),
  message: z.string(),
  rating: z.number().nullable().optional(),
  status: ticketStatusSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
  user: supportTicketUserSchema.nullable().optional(),
});

export const createTicketSchema = z.object({
  type: ticketTypeSchema,
  subject: z.string().trim().min(1, 'Subject is required').max(200, 'Subject is too long'),
  message: z.string().trim().min(1, 'Message is required').max(2000, 'Message is too long'),
  rating: z.number().int().min(1).max(5).optional(),
});

export const updateTicketStatusSchema = z.object({
  status: ticketStatusSchema,
});

export const adminTicketsFilterQuerySchema = z.object({
  type: ticketTypeSchema.optional(),
  status: ticketStatusSchema.optional(),
});

export const backendTicketEnvelopeSchema = z.object({
  statusCode: z.number().optional(),
  message: z.string().optional(),
  data: supportTicketSchema,
});

export const backendTicketsListEnvelopeSchema = z.object({
  statusCode: z.number().optional(),
  message: z.string().optional(),
  data: z.array(supportTicketSchema),
});
