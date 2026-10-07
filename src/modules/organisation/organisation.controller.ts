import type {
  Request,
  Response
} from "express";

import * as organisationService
  from "./organisation.service.js";

export async function getOrganisations(
  _req: Request,
  res: Response
) {
  const organisations =
    await organisationService
      .getOrganisations();

  res.status(200).json({
    success: true,
    data: organisations
  });
}

export async function getOrganisationById(
  req: Request,
  res: Response
) {
  const organisation =
    await organisationService
      .getOrganisationById(
        req.params.id?.toString()!
      );

  res.status(200).json({
    success: true,
    data: organisation
  });
}

export async function createOrganisation(
  req: Request,
  res: Response
) {
  const organisation =
    await organisationService
      .createNewOrganisation(
        req.body
      );

  res.status(201).json({
    success: true,
    data: organisation
  });
}

export async function updateOrganisation(
  req: Request,
  res: Response
) {
  const organisation =
    await organisationService
      .updateExistingOrganisation(
        req.params.id?.toString()!,
        req.body
      );

  res.status(200).json({
    success: true,
    data: organisation
  });
}

export async function deleteOrganisation(
  req: Request,
  res: Response
) {
  await organisationService
    .deleteExistingOrganisation(
      req.params.id?.toString()!
    );

  res.status(200).json({
    success: true,
    data: null
  });
}