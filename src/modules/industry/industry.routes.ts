import { Router } from "express";

import {
  requireAuth,
  requireRole
} from "../../middleware/auth.middleware.js";

import {
  validate as validateBody
} from "../../middleware/validate.middleware.js";

import {
  createIndustryController,
  deleteIndustryController,
  getIndustriesController,
  getIndustryByIdController,
  updateIndustryController,
  getProfileIndustriesController,
  addIndustryToProfileController,
  removeIndustryFromProfileController
} from "./industry.controller.js";

import {
  createIndustrySchema,
  updateIndustrySchema
} from "./industry.schema.js";

const router = Router();

router.get(
  "/",
  getIndustriesController
);

router.get(
  "/:id",
  getIndustryByIdController
);

router.get(
  "/profile/:profileId",
  getProfileIndustriesController
);

router.post(
  "/",
  requireAuth,
  requireRole("ADMIN"),
  validateBody(createIndustrySchema),
  createIndustryController
);

router.patch(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  validateBody(updateIndustrySchema),
  updateIndustryController
);

router.delete(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  deleteIndustryController
);

router.post(
  "/profile/:profileId/:industryId",
  requireAuth,
  requireRole("ADMIN"),
  addIndustryToProfileController
);

router.delete(
  "/profile/:profileId/:industryId",
  requireAuth,
  requireRole("ADMIN"),
  removeIndustryFromProfileController
);

export default router;