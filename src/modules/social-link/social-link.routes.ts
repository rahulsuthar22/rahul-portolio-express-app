import { Router } from "express";

import {
  requireAuth,
  requireRole
} from "../../middleware/auth.middleware.js";

import {
  validate as validateBody
} from "../../middleware/validate.middleware.js";

import {
  getSocialLinksController,
  getSocialLinkByIdController,
  createSocialLinkController,
  updateSocialLinkController,
  deleteSocialLinkController
} from "./social-link.controller.js";

import {
  createSocialLinkSchema,
  updateSocialLinkSchema
} from "./social-link.schema.js";

const router = Router();

router.get(
  "/",
  getSocialLinksController
);

router.get(
  "/:id",
  getSocialLinkByIdController
);

router.post(
  "/",
  requireAuth,
  requireRole("ADMIN"),
  validateBody(createSocialLinkSchema),
  createSocialLinkController
);

router.patch(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  validateBody(updateSocialLinkSchema),
  updateSocialLinkController
);

router.delete(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  deleteSocialLinkController
);

export default router;