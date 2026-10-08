import { z } from "zod";

const optionalNullableUrl = z
  .string()
  .trim()
  .url()
  .max(500)
  .nullable()
  .optional();

export const createEducationSchema = z.object({
  institute: z
    .string()
    .trim()
    .min(2)
    .max(200),

  degree: z
    .string()
    .trim()
    .min(2)
    .max(150),

  cgpa: z
    .number()
    .min(0)
    .max(10)
    .multipleOf(0.01)
    .nullable()
    .optional(),

  percentage: z
    .number()
    .min(0)
    .max(99.99)
    .multipleOf(0.01)
    .nullable()
    .optional(),

  startDate: z.coerce.date(),

  endDate: z
    .coerce
    .date()
    .nullable()
    .optional(),

  link: optionalNullableUrl,

  displayOrder: z
    .number()
    .int()
    .min(0)
    .max(10000)
    .optional(),

  profileId: z
    .string()
    
});

export const updateEducationSchema = z
  .object({
    institute: z
      .string()
      .trim()
      .min(2)
      .max(200)
      .optional(),

    degree: z
      .string()
      .trim()
      .min(2)
      .max(150)
      .optional(),

    cgpa: z
      .number()
      .min(0)
      .max(10)
      .multipleOf(0.01)
      .nullable()
      .optional(),

    percentage: z
      .number()
      .min(0)
      .max(99.99)
      .multipleOf(0.01)
      .nullable()
      .optional(),

    startDate: z.coerce.date().optional(),

    endDate: z
      .coerce
      .date()
      .nullable()
      .optional(),

    link: optionalNullableUrl,

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

export type CreateEducationSchemaInput = z.infer<
  typeof createEducationSchema
>;

export type UpdateEducationSchemaInput = z.infer<
  typeof updateEducationSchema
>;