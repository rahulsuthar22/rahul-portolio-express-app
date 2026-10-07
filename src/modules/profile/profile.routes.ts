import { Router } from "express";

import {
  createProfile,
  getProfile,
  updateProfile
} from "./profile.controller.js";

import {
  createProfileSchema,
  updateProfileSchema
} from "./profile.schema.js";

import { validate } from "../../middleware/validate.middleware.js";
import { requireAuth, requireRole } from "../../middleware/auth.middleware.js";
import { addIndustryToProfileController, getProfileIndustriesController, removeIndustryFromProfileController } from "../industry/industry.controller.js";

const router = Router();

router.get(
  "/",
  getProfile
);

router.post(
  "/",
  requireAuth,
  requireRole("ADMIN"),
  validate(createProfileSchema),
  createProfile
);

router.patch(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  validate(updateProfileSchema),
  updateProfile
);
router.get(
  "/:profileId/industries",
  getProfileIndustriesController
);

router.post(
  "/:profileId/industries/:industryId",
  requireAuth,
  requireRole("ADMIN"),
  addIndustryToProfileController
);

router.delete(
  "/:profileId/industries/:industryId",
  requireAuth,
  requireRole("ADMIN"),
  removeIndustryFromProfileController
);

export default router;