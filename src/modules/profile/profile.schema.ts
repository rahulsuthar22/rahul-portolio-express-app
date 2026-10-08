import { z } from "../../docs/zod-openapi";

export const createProfileSchema = z.object({
  photo: z
    .string()
    .url()
    .optional(),

  name: z
    .string()
    .trim()
    .min(2)
    .max(100)
    .openapi({
      example: "Rahul Suthar",
      description: "Full name of the profile owner",
    }),

  role: z
    .string()
    .trim()
    .min(2)
    .max(100)
    .openapi({
      example: "Full Stack Developer",
    })
  ,

  email: z
    .string()
    .email()
    .transform((value) => value.toLowerCase().trim())
    .openapi({
      example: "rahul@example.com",
      description: "Profile email address",
    }),

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
    .nullable()
    .optional(),

  currentOrgId: z
    .string()
    
    .nullable()
    .optional()
    .openapi({
      example: "0e7dd0d1-0809-4c4b-afc3-c9f315239986",
      description: "Organisation UUID for current company",
    }),

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
})
.openapi("CreateProfileRequest");

export const updateProfileSchema =
  createProfileSchema.partial().openapi("UpdateProfileRequest");

export type CreateProfileSchema = z.infer<
  typeof createProfileSchema
>;

export type UpdateProfileSchema = z.infer<
  typeof updateProfileSchema
>;