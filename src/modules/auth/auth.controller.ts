import type {
  Request,
  Response,
} from "express";

import * as authService
  from "./auth.service.js";

import {
  AUTH_COOKIE_NAME,
  AUTH_COOKIE_OPTIONS,
} from "./auth.cookie.js";

export async function login(
  req: Request,
  res: Response,
) {
  const result =
    await authService.login(req.body);

  res.cookie(
    AUTH_COOKIE_NAME,
    result.accessToken,
    AUTH_COOKIE_OPTIONS,
  );

  res.status(200).json({
    success: true,
    data: {
      user: result.user,
    },
  });
}

export async function me(
  req: Request,
  res: Response,
) {
  res.status(200).json({
    success: true,
    data: {
      user: req.user,
    },
  });
}

export async function logout(
  _req: Request,
  res: Response,
) {
  res.clearCookie(
    AUTH_COOKIE_NAME,
    AUTH_COOKIE_OPTIONS,
  );

  res.status(200).json({
    success: true,
    data: null,
  });
}