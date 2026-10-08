import { z } from "../../docs/zod-openapi";

export const createExperienceSchema = z
  .object({
    profileId: z.string(),

    organisationId: z.string(),

    position: z
      .string()
      .trim()
      .min(1)
      .max(150),

    startDate: z.coerce.date(),

    endDate: z
      .union([
        z.null(),
        z.coerce.date(),
      ])
      .optional(),

    modeOfWork: z.enum([
      "REMOTE",
      "HYBRID",
      "ONSITE",
    ]),

    description: z
      .string()
      .trim()
      .max(5000)
      .optional(),

    displayOrder: z
      .number()
      .int()
      .min(0)
      .max(10000)
      .default(0),

    isCurrent: z
      .boolean()
      .default(false),
  })
  .superRefine((data, ctx) => {
    if (
      data.endDate &&
      data.endDate < data.startDate
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["endDate"],
        message:
          "End date must be greater than or equal to start date",
      });
    }

    if (
      data.isCurrent &&
      data.endDate !== null &&
      data.endDate !== undefined
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["endDate"],
        message:
          "Current experience must not have an end date",
      });
    }
  });

export const updateExperienceSchema = z
  .object({
    organisationId: z
      .string()
      
      .optional(),

    position: z
      .string()
      .trim()
      .min(1)
      .max(150)
      .optional(),

    startDate: z.coerce.date().optional(),

    endDate: z
      .union([
        z.null(),
        z.coerce.date(),
      ])
      .optional(),

    modeOfWork: z
      .enum([
        "REMOTE",
        "HYBRID",
        "ONSITE",
      ])
      .optional(),

    description: z
      .string()
      .trim()
      .max(5000)
      .optional(),

    displayOrder: z
      .number()
      .int()
      .min(0)
      .max(10000)
      .optional(),

    isCurrent: z
      .boolean()
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.startDate &&
      data.endDate &&
      data.endDate < data.startDate
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["endDate"],
        message:
          "End date must be greater than or equal to start date",
      });
    }

    if (
      data.isCurrent === true &&
      data.endDate !== null &&
      data.endDate !== undefined
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["endDate"],
        message:
          "Current experience must not have an end date",
      });
    }
  });