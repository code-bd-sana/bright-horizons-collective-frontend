import { z } from 'zod';

export const PASSWORD_MIN_LENGTH = 7;
export const PASSWORD_MAX_LENGTH = 128;

const passwordRules = [
  {
    valid: (value: string) => value.length >= PASSWORD_MIN_LENGTH,
    message: `Must be at least ${PASSWORD_MIN_LENGTH} characters`,
  },
  {
    valid: (value: string) => /[A-Z]/.test(value),
    message: 'Must contain at least one uppercase letter',
  },
  {
    valid: (value: string) => /[a-z]/.test(value),
    message: 'Must contain at least one lowercase letter',
  },
  {
    valid: (value: string) => /\d/.test(value),
    message: 'Must contain at least one number',
  },
  {
    valid: (value: string) => /[!@#$%^&*(),.?":{}|<>]/.test(value),
    message: 'Must contain at least one special character',
  },
  {
    valid: (value: string) => value.length <= PASSWORD_MAX_LENGTH,
    message: `Must be no more than ${PASSWORD_MAX_LENGTH} characters`,
  },
] as const;

export function getPasswordRuleErrors(value: string) {
  return passwordRules.filter((rule) => !rule.valid(value)).map((rule) => rule.message);
}

export const passwordSchema = z
  .string()
  .min(PASSWORD_MIN_LENGTH, passwordRules[0].message)
  .max(PASSWORD_MAX_LENGTH, passwordRules[5].message)
  .regex(/[A-Z]/, passwordRules[1].message)
  .regex(/[a-z]/, passwordRules[2].message)
  .regex(/\d/, passwordRules[3].message)
  .regex(/[!@#$%^&*(),.?":{}|<>]/, passwordRules[4].message);

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email address is required.')
    .email('Enter a valid email address.'),
  password: z.string().min(1, 'Password is required.').max(128, 'Password is too long.'),
  rememberMe: z.boolean(),
});

export const registerRequestSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Full name must be at least 2 characters.')
    .max(100, 'Full name must be no more than 100 characters.'),
  email: z
    .string()
    .trim()
    .min(1, 'Email address is required.')
    .email('Enter a valid email address.'),
  password: passwordSchema,
});

export const registerSchema = registerRequestSchema
  .extend({
    confirmPassword: z.string().min(1, 'Please confirm your password.'),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email address is required.')
    .email('Enter a valid email address.')
    .transform((email) => email.toLowerCase()),
});

export const verifyOtpSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  otp: z.string().regex(/^\d{6}$/, 'Enter the complete 6-digit verification code.'),
});

export const resetPasswordRequestSchema = z.object({
  token: z.string().uuid('Invalid password reset token.'),
  newPassword: passwordSchema,
});

export const resetPasswordFormSchema = z
  .object({
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your new password.'),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export const backendMessageResponseSchema = z.object({
  statusCode: z.number(),
  message: z.string(),
  data: z.unknown().optional(),
});

export const backendVerifyOtpResponseSchema = z.object({
  statusCode: z.number(),
  message: z.string(),
  data: z.object({
    reset_token: z.string().uuid(),
  }),
});

export const backendAuthUserSchema = z.object({
  id: z.string().min(1),
  email: z.string().email(),
  role: z.enum(['PARENTS', 'ADMIN']),
  membershipTier: z.string().nullish(),
});

export const backendAuthResponseSchema = z.object({
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
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordFormSchema>;
