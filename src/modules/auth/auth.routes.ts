import { Router } from "express";

import {
  login,
  logout,
  me
} from "./auth.controller.js";

import {
  loginSchema
} from "./auth.schema.js";

import {
  loginRateLimiter
} from "../../middleware/rate-limit.middleware.js";

import {
  validate
} from "../../middleware/validate.middleware.js";
import { requireAuth } from "../../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/login",
  loginRateLimiter,
  validate(loginSchema),
  login
);

router.get(
  "/me",
  requireAuth,
  me,
);

router.post(
  "/logout",
  logout,
);
export default router;