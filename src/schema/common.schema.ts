import { z } from "zod";

export const idParamSchema = z.object({
  id: z.uuid("Invalid resource ID"),
});

export const projectSkillParamsSchema = z.object({
  id: z.uuid("Invalid project ID"),
  skillId: z.uuid("Invalid skill ID"),
});