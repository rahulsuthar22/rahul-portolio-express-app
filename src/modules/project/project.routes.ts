import { Router } from "express";

import {
  requireAuth,
  requireRole
} from "../../middleware/auth.middleware.js";

import {
  validate
} from "../../middleware/validate.middleware.js";

import {
  getProjectsController,
  getProjectByIdController,
  createProjectController,
  updateProjectController,
  deleteProjectController,
  addSkillToProjectController,
  getProjectSkillsController,
  removeSkillFromProjectController
} from "./project.controller.js";

import {
  createProjectSchema,
  updateProjectSchema
} from "./project.schema.js";
import { idParamSchema, projectSkillParamsSchema } from "../../schema/common.schema.js";
import { paginationSchema } from "../../schema/pagination.schema.js";

const router = Router();

router.get(
  "/",
  validate(paginationSchema, "query"),
  getProjectsController
);

router.get(
  "/:id",
  validate(idParamSchema, "params"),
  getProjectByIdController
);

router.post(
  "/",
  requireAuth,
  requireRole("ADMIN"),
  validate(createProjectSchema),
  createProjectController
);

router.patch(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  validate(idParamSchema, "params"),
  validate(updateProjectSchema),
  updateProjectController
);

router.delete(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  validate(idParamSchema, "params"),
  deleteProjectController
);


router.get(
  "/:id/skills",
  validate(idParamSchema, "params"),
  getProjectSkillsController
);

router.post(
  "/:id/skills/:skillId",
  requireAuth,
  requireRole("ADMIN"),
  validate(projectSkillParamsSchema, "params"),
  addSkillToProjectController
);

router.delete(
  "/:id/skills/:skillId",
  requireAuth,
  requireRole("ADMIN"),
  validate(projectSkillParamsSchema, "params"),
  removeSkillFromProjectController
);


export default router;