import { Router } from "express";

import {
  requireAuth,
  requireRole
} from "../../middleware/auth.middleware.js";

import {
  validate as validateBody
} from "../../middleware/validate.middleware.js";

import {
  addSkillToCategoryController,
  createCategoryController,
  deleteCategoryController,
  getCategoriesController,
  getCategoryByIdController,
  getCategorySkillsController,
  removeSkillFromCategoryController,
  updateCategoryController
} from "./category.controller.js";

import {
  createCategorySchema,
  updateCategorySchema
} from "./category.schema.js";

const router = Router();

// Public
router.get(
  "/",
  getCategoriesController
);

router.get(
  "/:id",
  getCategoryByIdController
);

router.get(
  "/:id/skills",
  getCategorySkillsController
);

// Admin
router.post(
  "/",
  requireAuth,
  requireRole("ADMIN"),
  validateBody(createCategorySchema),
  createCategoryController
);

router.patch(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  validateBody(updateCategorySchema),
  updateCategoryController
);

router.delete(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  deleteCategoryController
);

router.post(
  "/:id/skills/:skillId",
  requireAuth,
  requireRole("ADMIN"),
  addSkillToCategoryController
);

router.delete(
  "/:id/skills/:skillId",
  requireAuth,
  requireRole("ADMIN"),
  removeSkillFromCategoryController
);

export default router;