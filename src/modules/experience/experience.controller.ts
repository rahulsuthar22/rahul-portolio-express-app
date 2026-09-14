import type {
  Request,
  Response
} from "express";

import * as experienceService
  from "./experience.service.js";

export async function getExperiences(
  req: Request,
  res: Response
) {
  const profileId =
    typeof req.query.profileId === "string"
      ? req.query.profileId
      : undefined;

  const experiences =
    await experienceService
      .getExperiences(profileId);

  res.status(200).json({
    success: true,
    data: experiences
  });
}

export async function getExperienceById(
  req: Request,
  res: Response
) {
  const experience =
    await experienceService
      .getExperienceById(
        req.params.id?.toString()!
      );

  res.status(200).json({
    success: true,
    data: experience
  });
}

export async function createExperience(
  req: Request,
  res: Response
) {
  const experience =
    await experienceService
      .createNewExperience(
        req.body
      );

  res.status(201).json({
    success: true,
    data: experience
  });
}

export async function updateExperience(
  req: Request,
  res: Response
) {
  const experience =
    await experienceService
      .updateExistingExperience(
        req.params.id?.toString()!,
        req.body
      );

  res.status(200).json({
    success: true,
    data: experience
  });
}

export async function deleteExperience(
  req: Request,
  res: Response
) {
  const experience =
    await experienceService
      .deleteExistingExperience(
        req.params.id?.toString()!
      );

  res.status(200).json({
    success: true,
    data: experience
  });
}