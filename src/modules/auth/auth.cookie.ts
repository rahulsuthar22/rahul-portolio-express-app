import type { CookieOptions } from "express";

import env from "../../config/env.js";

export const AUTH_COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  secure: env.nodeEnv === "production",
  sameSite: "lax",
  path: "/",
};

export const AUTH_COOKIE_NAME =
  env.authCookieName;