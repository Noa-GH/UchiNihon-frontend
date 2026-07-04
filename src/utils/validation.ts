import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(30, "Name must be less than 30 characters"),
  email: z.string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
  password: z.string()
    .min(6, "Password must be at least 6 characters")
});

export const loginSchema = z.object({
  email: z.string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
  password: z.string()
    .min(1, "Password is required")
});
