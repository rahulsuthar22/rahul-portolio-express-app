import { z } from "zod";

export const paginationSchema = z.object({
  page: z.coerce
    .number()
    .int()
    .min(1)
    .default(1),

  limit: z.coerce
    .number()
    .int()
    .min(1)
    .max(100)
    .default(20),

  sortBy: z
    .enum([
      "displayOrder",
      "startDate",
      "endDate",
      "name",
      "createdAt",
      "updatedAt",
    ])
    .default("displayOrder"),

  sortOrder: z
    .enum(["asc", "desc"])
    .default("asc"),

  search: z
    .string()
    .trim()
    .min(1)
    .max(100)
    .optional(),

  organizationId: z
    .uuid()
    .optional(),

});

export type PaginationQuery = z.infer<
  typeof paginationSchema
>;