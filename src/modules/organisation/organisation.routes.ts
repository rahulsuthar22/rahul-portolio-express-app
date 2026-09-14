import { Router } from "express";

import {
  createOrganisation,
  getOrganisationById,
  getOrganisations,
  updateOrganisation
} from "./organisation.controller.js";

import {
  createOrganisationSchema,
  updateOrganisationSchema
} from "./organisation.schema.js";

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
  getOrganisations
);

router.get(
  "/:id",
  getOrganisationById
);

/**
 * Admin
 */

router.post(
  "/",
  requireAuth,
  requireRole("ADMIN"),
  validate(createOrganisationSchema),
  createOrganisation
);

router.patch(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  validate(updateOrganisationSchema),
  updateOrganisation
);

export default router;