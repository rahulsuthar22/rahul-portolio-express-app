import { z } from "zod";

export const createProfileSchema = z.object({
  photo: z
    .string()
    .url()
    .optional(),

  name: z
    .string()
    .trim()
    .min(2)
    .max(100),

  role: z
    .string()
    .trim()
    .min(2)
    .max(100),

  email: z
    .string()
    .email()
    .transform((value) => value.toLowerCase().trim()),

  description: z
    .string()
    .trim()
    .max(2000)
    .optional(),

  yearsOfExperience: z
    .number()
    .min(0)
    .max(100)
    .optional(),

  currentPosition: z
    .string()
    .trim()
    .max(150)
    .optional(),

  currentCompany: z
    .string()
    .trim()
    .max(150)
    .optional(),

  aboutHeading: z
    .string()
    .trim()
    .max(200)
    .optional(),

  aboutDescription: z
    .string()
    .trim()
    .max(5000)
    .optional()
});

export const updateProfileSchema =
  createProfileSchema.partial();

export type CreateProfileSchema = z.infer<
  typeof createProfileSchema
>;

export type UpdateProfileSchema = z.infer<
  typeof updateProfileSchema
>;