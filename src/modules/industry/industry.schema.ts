import { z } from "zod";

export const createIndustrySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1)
    .max(100),

  slug: z
    .string()
    .trim()
    .min(1)
    .max(100)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must contain lowercase letters, numbers and hyphens only"
    ),

  displayOrder: z
    .number()
    .int()
    .min(0)
    .max(10000)
    .optional()
});

export const updateIndustrySchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1)
      .max(100)
      .optional(),

    slug: z
      .string()
      .trim()
      .min(1)
      .max(100)
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Slug must contain lowercase letters, numbers and hyphens only"
      )
      .optional(),

    displayOrder: z
      .number()
      .int()
      .min(0)
      .max(10000)
      .optional()
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message: "At least one field must be provided"
    }
  );