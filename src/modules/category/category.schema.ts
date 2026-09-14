import { z } from "zod";

const optionalNullableUrl = z
  .string()
  .trim()
  .url()
  .max(500)
  .nullable()
  .optional();

export const createCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1)
    .max(100),

  link: optionalNullableUrl,

  icon: z
    .string()
    .trim()
    .max(200)
    .nullable()
    .optional(),

  displayOrder: z
    .number()
    .int()
    .min(0)
    .max(10000)
    .optional()
});

export const updateCategorySchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1)
      .max(100)
      .optional(),

    link: optionalNullableUrl,

    icon: z
      .string()
      .trim()
      .max(200)
      .nullable()
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

export type CreateCategorySchemaInput =
  z.infer<typeof createCategorySchema>;

export type UpdateCategorySchemaInput =
  z.infer<typeof updateCategorySchema>;