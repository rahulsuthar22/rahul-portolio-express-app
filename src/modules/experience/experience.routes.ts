import { Router } from "express";

import {
  createExperience,
  deleteExperience,
  getExperienceById,
  getExperiences,
  updateExperience
} from "./experience.controller.js";

import {
  createExperienceSchema,
  updateExperienceSchema
} from "./experience.schema.js";

import {
  requireAuth,
  requireRole
} from "../../middleware/auth.middleware.js";

import {
  validate
} from "../../middleware/validate.middleware.js";

const router = Router();

/**
 * Public
 */

router.get(
  "/",
  getExperiences
);

router.get(
  "/:id",
  getExperienceById
);

/**
 * Admin
 */

router.post(
  "/",
  requireAuth,
  requireRole("ADMIN"),
  validate(createExperienceSchema),
  createExperience
);

router.patch(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  validate(updateExperienceSchema),
  updateExperience
);

router.delete(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  deleteExperience
);

export default router;