import { Router } from "express";

import {
  requireAuth,
  requireRole
} from "../../middleware/auth.middleware.js";

import {
  validate as validateBody
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

const router = Router();

router.get(
  "/",
  getProjectsController
);

router.get(
  "/:id",
  getProjectByIdController
);

router.post(
  "/",
  requireAuth,
  requireRole("ADMIN"),
  validateBody(createProjectSchema),
  createProjectController
);

router.patch(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  validateBody(updateProjectSchema),
  updateProjectController
);

router.delete(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  deleteProjectController
);


router.get(
  "/:id/skills",
  getProjectSkillsController
);

router.post(
  "/:id/skills/:skillId",
  requireAuth,
  requireRole("ADMIN"),
  addSkillToProjectController
);

router.delete(
  "/:id/skills/:skillId",
  requireAuth,
  requireRole("ADMIN"),
  removeSkillFromProjectController
);


export default router;