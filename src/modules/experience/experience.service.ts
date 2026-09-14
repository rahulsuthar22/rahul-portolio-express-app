import {
  BadRequestError,
  NotFoundError
} from "../../errors/index.js";

import * as experienceRepository
  from "./experience.repository.js";

import * as organisationRepository
  from "../organisation/organisation.repository.js";

import * as profileRepository
  from "../profile/profile.repository.js";

import type {
  CreateExperienceInput,
  UpdateExperienceInput
} from "./experience.types.js";

export async function getExperiences(
  profileId?: string
) {
  return experienceRepository
    .findAllExperiences(profileId);
}

export async function getExperienceById(
  id: string
) {
  const experience =
    await experienceRepository
      .findExperienceById(id);

  if (!experience) {
    throw new NotFoundError(
      "Experience not found"
    );
  }

  return experience;
}

export async function createNewExperience(
  input: CreateExperienceInput
) {
  const profile =
    await profileRepository
      .findProfileById(input.profileId);

  if (!profile) {
    throw new NotFoundError(
      "Profile not found"
    );
  }

  const organisation =
    await organisationRepository
      .findOrganisationById(
        input.organisationId
      );

  if (!organisation) {
    throw new NotFoundError(
      "Organisation not found"
    );
  }

  if (
    input.isCurrent === true &&
    input.endDate
  ) {
    throw new BadRequestError(
      "Current experience cannot have an end date"
    );
  }

  if (
    input.endDate &&
    input.endDate < input.startDate
  ) {
    throw new BadRequestError(
      "End date must be greater than or equal to start date",
    );
  }

  return experienceRepository
    .createExperience({
      ...input,
      orgId: input.organisationId
    });
}

export async function updateExistingExperience(
  id: string,
  input: UpdateExperienceInput
) {
  const existing =
    await experienceRepository
      .findExperienceById(id);

  if (!existing) {
    throw new NotFoundError(
      "Experience not found"
    );
  }

  if (input.organisationId) {
    const organisation =
      await organisationRepository
        .findOrganisationById(
          input.organisationId
        );

    if (!organisation) {
      throw new NotFoundError(
        "Organisation not found"
      );
    }
  }

  const finalStartDate =
    input.startDate ??
    existing.startDate;

  const finalEndDate =
    input.endDate !== undefined
      ? input.endDate
      : existing.endDate;

  const finalIsCurrent =
    input.isCurrent ??
    existing.isCurrent;

  if (
    finalEndDate &&
    finalEndDate < finalStartDate
  ) {
    throw new BadRequestError(
      "End date must be greater than or equal to start date"
    );
  }

  if (
    finalIsCurrent &&
    finalEndDate
  ) {
    throw new BadRequestError(
      "Current experience cannot have an end date"
    );
  }

  return experienceRepository
    .updateExperience(id, {
      ...input,
      ...(input.organisationId !== undefined && {
        orgId: input.organisationId
      })
    });
}

export async function deleteExistingExperience(
  id: string
) {
  const existing =
    await experienceRepository
      .findExperienceById(id);

  if (!existing) {
    throw new NotFoundError(
      "Experience not found"
    );
  }

  return experienceRepository
    .deleteExperience(id);
}