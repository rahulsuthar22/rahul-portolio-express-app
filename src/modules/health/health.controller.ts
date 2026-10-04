import type { Request, Response } from "express";

import { checkReadiness } from "./health.service.js";

export const live = (
  _req: Request,
  res: Response,
): void => {
  res.status(200).json({
    status: "ok",
  });
};

export const ready = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  const result = await checkReadiness();

  res
    .status(result.status === "ok" ? 200 : 503)
    .json(result);
};