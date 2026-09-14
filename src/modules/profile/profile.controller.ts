import type {
  Request,
  Response
} from "express";

import * as profileService from "./profile.service.js";

export async function getProfile(
  _req: Request,
  res: Response
) {
  const profile =
    await profileService.getProfile();

  res.status(200).json({
    success: true,
    data: profile
  });
}

export async function createProfile(
  req: Request,
  res: Response
) {
  const profile =
    await profileService.createNewProfile(
      req.body
    );

  res.status(201).json({
    success: true,
    data: profile
  });
}

export async function updateProfile(
  req: Request,
  res: Response
) {
  const profile =
    await profileService.updateExistingProfile(
      req.params.id?.toString()!,
      req.body
    );

  res.status(200).json({
    success: true,
    data: profile
  });
}