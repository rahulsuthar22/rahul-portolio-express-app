import {
  ConflictError,
  NotFoundError
} from "../../errors/index.js";

import * as organisationRepository
  from "./organisation.repository.js";

import type {
  CreateOrganisationInput,
  UpdateOrganisationInput
} from "./organisation.types.js";

export async function getOrganisations() {
  return organisationRepository
    .findAllOrganisations();
}

export async function getOrganisationById(
  id: string
) {
  const organisation =
    await organisationRepository
      .findOrganisationById(id);

  if (!organisation) {
    throw new NotFoundError(
      "Organisation not found"
    );
  }

  return organisation;
}

export async function createNewOrganisation(
  input: CreateOrganisationInput
) {
  const existing =
    await organisationRepository
      .findOrganisationByName(
        input.name
      );

  if (existing) {
    throw new ConflictError(
      "Organisation already exists"
    );
  }

  return organisationRepository
    .createOrganisation(input);
}

export async function updateExistingOrganisation(
  id: string,
  input: UpdateOrganisationInput
) {
  const existing =
    await organisationRepository
      .findOrganisationById(id);

  if (!existing) {
    throw new NotFoundError(
      "Organisation not found"
    );
  }

  if (
    input.name &&
    input.name !== existing.name
  ) {
    const duplicate =
      await organisationRepository
        .findOrganisationByName(
          input.name
        );

    if (
      duplicate &&
      duplicate.id !== id
    ) {
      throw new ConflictError(
        "Organisation already exists"
      );
    }
  }

  return organisationRepository
    .updateOrganisation(
      id,
      input
    );
}

export async function deleteExistingOrganisation(
  id: string
) {
  const existing =
    await organisationRepository
      .findOrganisationById(id);

  if (!existing) {
    throw new NotFoundError(
      "Organisation not found"
    );
  }

  return organisationRepository
    .deleteOrganisation(id);
}