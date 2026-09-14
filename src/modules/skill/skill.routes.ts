import { Router } from "express";

import {
  requireAuth,
  requireRole
} from "../../middleware/auth.middleware.js";

import {
  validate as validateBody
} from "../../middleware/validate.middleware.js";

import {
  createSkillController,
  deleteSkillController,
  getSkillByIdController,
  getSkillsController,
  updateSkillController
} from "./skill.controller.js";

import {
  createSkillSchema,
  updateSkillSchema
} from "./skill.schema.js";

const router = Router();

// Public
router.get(
  "/",
  getSkillsController
);

router.get(
  "/:id",
  getSkillByIdController
);

// Admin
router.post(
  "/",
  requireAuth,
  requireRole("ADMIN"),
  validateBody(createSkillSchema),
  createSkillController
);

router.patch(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  validateBody(updateSkillSchema),
  updateSkillController
);

router.delete(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  deleteSkillController
);

export default router;