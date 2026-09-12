import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email address is required.')
    .email('Enter a valid email address.'),
  password: z.string().min(1, 'Password is required.').max(128, 'Password is too long.'),
  rememberMe: z.boolean(),
});

export const backendAuthUserSchema = z.object({
  id: z.string().min(1),
  email: z.string().email(),
  role: z.enum(['PARENTS', 'ADMIN']),
  membershipTier: z.string().nullish(),
});

export const backendLoginResponseSchema = z.object({
  statusCode: z.number(),
  message: z.string(),
  data: z.object({
    access_token: z.string().min(1),
    user: backendAuthUserSchema,
  }),
});

export const backendSessionResponseSchema = z.object({
  statusCode: z.number(),
  message: z.string(),
  data: backendAuthUserSchema,
});

export type LoginFormValues = z.infer<typeof loginSchema>;
