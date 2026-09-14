import { Router } from "express";

import {
  login
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

const router = Router();

router.post(
  "/login",
  loginRateLimiter,
  validate(loginSchema),
  login
);

export default router;