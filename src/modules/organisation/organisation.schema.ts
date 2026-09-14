import { z } from "zod";

export const createOrganisationSchema =
  z.object({
    name: z
      .string()
      .trim()
      .min(1)
      .max(150),

    description: z
      .string()
      .trim()
      .max(3000)
      .optional(),

    website: z
      .string()
      .trim()
      .url()
      .max(500)
      .optional()
  });

export const updateOrganisationSchema =
  createOrganisationSchema.partial();

export type CreateOrganisationSchema =
  z.infer<
    typeof createOrganisationSchema
  >;

export type UpdateOrganisationSchema =
  z.infer<
    typeof updateOrganisationSchema
  >;