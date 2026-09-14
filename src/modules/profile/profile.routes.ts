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
  validate(updateProfileSchema),
  updateProfile
);

export default router;