import type {
  NextFunction,
  Request,
  Response,
} from "express";

import {
  UnauthorizedError,
  ForbiddenError,
} from "../errors/index.js";

import {
  verifyAccessToken,
} from "../utils/jwt.js";

import {
  AUTH_COOKIE_NAME,
} from "../modules/auth/auth.cookie.js";

export async function requireAuth(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const authorization =
    req.headers.authorization;

  let token: string | undefined;

  /**
   * 1. Bearer token
   */
  if (
    authorization &&
    authorization.startsWith("Bearer ")
  ) {
    token =
      authorization
        .slice("Bearer ".length)
        .trim();
  }

  /**
   * 2. HttpOnly cookie
   */
  if (!token) {
    token =
      req.cookies?.[AUTH_COOKIE_NAME];
  }

  if (!token) {
    throw new UnauthorizedError(
      "Authentication required",
    );
  }

  try {
    const { payload } =
      await verifyAccessToken(token);

    if (
      typeof payload.sub !== "string" ||
      typeof payload.email !== "string" ||
      typeof payload.role !== "string"
    ) {
      throw new UnauthorizedError(
        "Invalid authentication token",
      );
    }

    req.user = {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };

    next();
  } catch {
    throw new UnauthorizedError(
      "Invalid or expired authentication token",
    );
  }
}

export function requireRole(
  ...allowedRoles: string[]
) {
  return (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    if (!req.user) {
      throw new UnauthorizedError(
        "Authentication required",
      );
    }

    if (
      !allowedRoles.includes(req.user.role)
    ) {
      throw new ForbiddenError(
        "You do not have permission to perform this action",
      );
    }

    next();
  };
}