import type {
  Request,
  Response
} from "express";

import {
  getIndustries,
  getIndustryById,
  createNewIndustry,
  updateExistingIndustry,
  deleteExistingIndustry,
  getIndustriesForProfile,
  addIndustryToProfile,
  removeIndustryFromProfile
} from "./industry.service.js";

export async function getIndustriesController(
  _req: Request,
  res: Response
) {
  const industries =
    await getIndustries();

  res.json({
    success: true,
    data: industries
  });
}

export async function getIndustryByIdController(
  req: Request,
  res: Response
) {
  const industry =
    await getIndustryById(req.params.id?.toString()!);

  res.json({
    success: true,
    data: industry
  });
}

export async function createIndustryController(
  req: Request,
  res: Response
) {
  const industry =
    await createNewIndustry(req.body);

  res.status(201).json({
    success: true,
    data: industry
  });
}

export async function updateIndustryController(
  req: Request,
  res: Response
) {
  const industry =
    await updateExistingIndustry(
      req.params.id?.toString()!,
      req.body
    );

  res.json({
    success: true,
    data: industry
  });
}

export async function deleteIndustryController(
  req: Request,
  res: Response
) {
  await deleteExistingIndustry(
    req.params.id?.toString()!
  );

  res.status(204).send();
}

export async function getProfileIndustriesController(
  req: Request,
  res: Response
) {
  const industries =
    await getIndustriesForProfile(
      req.params.profileId?.toString()!
    );

  res.json({
    success: true,
    data: industries
  });
}

export async function addIndustryToProfileController(
  req: Request,
  res: Response
) {
  const industry =
    await addIndustryToProfile(
      req.params.profileId?.toString()!,
      req.params.industryId?.toString()!
    );

  res.status(201).json({
    success: true,
    data: industry
  });
}

export async function removeIndustryFromProfileController(
  req: Request,
  res: Response
) {
  await removeIndustryFromProfile(
    req.params.profileId?.toString()!,
    req.params.industryId?.toString()!
  );

  res.status(204).send();
}