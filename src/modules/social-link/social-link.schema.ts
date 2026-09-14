import { z } from "zod";

export const createSocialLinkSchema =
  z.object({
    platform: z.enum([
      "LINKEDIN",
      "GITHUB",
      "TWITTER",
      "NAUKARI",
      "OTHER"
    ]),

    url: z
      .string()
      .trim()
      .url()
      .max(500),

    displayOrder: z
      .number()
      .int()
      .min(0)
      .max(10000)
      .optional(),

    profileId: z
      .string()
      .uuid()
  });

export const updateSocialLinkSchema =
  z.object({
    url: z
      .string()
      .trim()
      .url()
      .max(500)
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