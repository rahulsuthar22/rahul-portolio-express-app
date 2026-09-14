import type { Request, Response } from "express";
import {
  createNewEducation,
  deleteExistingEducation,
  getEducationById,
  getEducations,
  updateExistingEducation
} from "./education.service.js";

export async function getEducationsController(
  req: Request,
  res: Response
) {
  const profileId =
    typeof req.query.profileId === "string"
      ? req.query.profileId
      : undefined;

  const educations =
    await getEducations(profileId);

  res.status(200).json({
    success: true,
    data: educations
  });
}

export async function getEducationByIdController(
  req: Request,
  res: Response
) {
  const education =
    await getEducationById(req.params.id?.toString()!);

  res.status(200).json({
    success: true,
    data: education
  });
}

export async function createEducationController(
  req: Request,
  res: Response
) {
  const education =
    await createNewEducation(req.body);

  res.status(201).json({
    success: true,
    data: education
  });
}

export async function updateEducationController(
  req: Request,
  res: Response
) {
  const education =
    await updateExistingEducation(
      req.params.id?.toString()!,
      req.body
    );

  res.status(200).json({
    success: true,
    data: education
  });
}

export async function deleteEducationController(
  req: Request,
  res: Response
) {
  await deleteExistingEducation(
    req.params.id?.toString()!
  );

  res.status(204).send();
}