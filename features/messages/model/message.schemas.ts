import { z } from 'zod';

export const messageSenderSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  profileImage: z.string().nullable().optional(),
});

export const messageSchema = z.object({
  id: z.string(),
  threadId: z.string(),
  senderId: z.string(),
  content: z.string().nullable().optional(),
  attachment: z.string().nullable().optional(),
  isRead: z.boolean(),
  createdAt: z.string(),
  sender: messageSenderSchema,
});

export const childSummarySchema = z.object({
  id: z.string(),
  name: z.string(),
  photoUrl: z.string().nullable().optional(),
  ageYears: z.number().optional(),
  ageMonths: z.number().optional(),
  age: z.number().optional(),
});

export const parentSummarySchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  profileImage: z.string().nullable().optional(),
  children: z.array(childSummarySchema).optional(),
});

export const adminSummarySchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().optional(),
  profileImage: z.string().nullable().optional(),
});

export const messageThreadSchema = z.object({
  id: z.string(),
  parentId: z.string(),
  parent: parentSummarySchema.optional(),
  admin: adminSummarySchema.optional(),
  messages: z.array(messageSchema),
  unreadCount: z.number().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const backendMessageEnvelopeSchema = z.object({
  statusCode: z.number().optional(),
  message: z.string().optional(),
  data: messageSchema,
});

export const backendParentThreadEnvelopeSchema = z.object({
  statusCode: z.number().optional(),
  message: z.string().optional(),
  data: messageThreadSchema,
});

export const backendThreadsListEnvelopeSchema = z.object({
  statusCode: z.number().optional(),
  message: z.string().optional(),
  data: z.array(messageThreadSchema),
});

export const backendMessagesListEnvelopeSchema = z.object({
  statusCode: z.number().optional(),
  message: z.string().optional(),
  data: z.array(messageSchema),
});

export const sendMessageJsonSchema = z.object({
  threadId: z.string().uuid().optional(),
  content: z.string().trim().optional(),
});
