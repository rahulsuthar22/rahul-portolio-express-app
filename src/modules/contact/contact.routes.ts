import { Router } from "express";

import {
  requireAuth,
  requireRole
} from "../../middleware/auth.middleware.js";

import {
  validate as validateBody
} from "../../middleware/validate.middleware.js";

import {
  getContactMessagesController,
  getContactMessageByIdController,
  createContactMessageController,
  updateContactMessageController,
  deleteContactMessageController
} from "./contact.controller.js";

import {
  createContactMessageSchema,
  updateContactMessageSchema
} from "./contact.schema.js";

const router = Router();

// Public
router.post(
  "/",
  validateBody(createContactMessageSchema),
  createContactMessageController
);

// Admin
router.get(
  "/",
  requireAuth,
  requireRole("ADMIN"),
  getContactMessagesController
);

router.get(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  getContactMessageByIdController
);

router.patch(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  validateBody(updateContactMessageSchema),
  updateContactMessageController
);

router.delete(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  deleteContactMessageController
);

export default router;