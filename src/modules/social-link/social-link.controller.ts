import type {
  Request,
  Response
} from "express";

import {
  getSocialLinks,
  getSocialLinkById,
  createNewSocialLink,
  updateExistingSocialLink,
  deleteExistingSocialLink
} from "./social-link.service.js";

export async function getSocialLinksController(
  req: Request,
  res: Response
) {
  const profileId =
    typeof req.query.profileId === "string"
      ? req.query.profileId
      : undefined;

  const links =
    await getSocialLinks(profileId);

  res.json({
    success: true,
    data: links
  });
}

export async function getSocialLinkByIdController(
  req: Request,
  res: Response
) {
  const link =
    await getSocialLinkById(req.params.id?.toString()!);

  res.json({
    success: true,
    data: link
  });
}

export async function createSocialLinkController(
  req: Request,
  res: Response
) {
  const link =
    await createNewSocialLink(req.body);

  res.status(201).json({
    success: true,
    data: link
  });
}

export async function updateSocialLinkController(
  req: Request,
  res: Response
) {
  const link =
    await updateExistingSocialLink(
      req.params.id?.toString()!,
      req.body
    );

  res.json({
    success: true,
    data: link
  });
}

export async function deleteSocialLinkController(
  req: Request,
  res: Response
) {
  await deleteExistingSocialLink(
    req.params.id?.toString()!
  );

  res.status(204).send();
}