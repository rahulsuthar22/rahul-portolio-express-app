import type {
  Request,
  Response
} from "express";

import * as authService
  from "./auth.service.js";

export async function login(
  req: Request,
  res: Response
) {
  const result =
    await authService.login(req.body);

  res.status(200).json({
    success: true,
    data: result
  });
}