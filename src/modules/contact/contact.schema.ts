import { z } from "zod";

export const createContactMessageSchema =
  z.object({
    name: z
      .string()
      .trim()
      .min(2)
      .max(100),

    email: z
      .string()
      .trim()
      .email()
      .max(320)
      .transform(
        (value) => value.toLowerCase()
      ),

    subject: z
      .string()
      .trim()
      .max(200)
      .nullable()
      .optional(),

    message: z
      .string()
      .trim()
      .min(10)
      .max(5000)
  });

export const updateContactMessageSchema =
  z.object({
    name: z
      .string()
      .trim()
      .min(2)
      .max(100)
      .optional(),

    email: z
      .string()
      .trim()
      .email()
      .max(320)
      .transform(
        (value) => value.toLowerCase()
      )
      .optional(),

    subject: z
      .string()
      .trim()
      .max(200)
      .nullable()
      .optional(),

    message: z
      .string()
      .trim()
      .min(10)
      .max(5000)
      .optional(),

    status: z.enum([
      "NEW",
      "READ",
      "REPLIED",
      "ARCHIVED"
    ]).optional()
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message: "At least one field must be provided"
    }
  );