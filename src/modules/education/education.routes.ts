import { Router } from "express";
import { requireAuth, requireRole } from "../../middleware/auth.middleware.js";
import {
  validate
} from "../../middleware/validate.middleware.js";
import {
  createEducationController,
  deleteEducationController,
  getEducationByIdController,
  getEducationsController,
  updateEducationController
} from "./education.controller.js";
import {
  createEducationSchema,
  updateEducationSchema
} from "./education.schema.js";

const router = Router();

// Public
router.get(
  "/",
  getEducationsController
);

router.get(
  "/:id",
  getEducationByIdController
);

// Admin
router.post(
  "/",
  requireAuth,
  requireRole("ADMIN"),
  validate(createEducationSchema),
  createEducationController
);

router.patch(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  validate(updateEducationSchema),
  updateEducationController
);

router.delete(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  deleteEducationController
);

export default router;