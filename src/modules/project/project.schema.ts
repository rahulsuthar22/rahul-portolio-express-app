import { z } from "zod";

const nullableOptionalUrl = z
  .string()
  .trim()
  .url()
  .max(500)
  .nullable()
  .optional();

export const createProjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1)
    .max(200),

  description: z
    .string()
    .trim()
    .max(5000)
    .nullable()
    .optional(),

  startDate: z
    .coerce
    .date()
    .nullable()
    .optional(),

  endDate: z
    .coerce
    .date()
    .nullable()
    .optional(),

  link: nullableOptionalUrl,

  impact: z
    .string()
    .trim()
    .max(3000)
    .nullable()
    .optional(),

  playStoreLink: nullableOptionalUrl,

  iosLink: nullableOptionalUrl,

  displayOrder: z
    .number()
    .int()
    .min(0)
    .max(10000)
    .optional(),

  organizationId: z
    .string()
    
    .nullable()
    .optional()
});

export const updateProjectSchema =
  createProjectSchema
    .partial()
    .refine(
      (data) => Object.keys(data).length > 0,
      {
        message: "At least one field must be provided"
      }
    );