import { NotFoundError } from "../../errors/index.js";
import { toPlainDateTime } from "../../utils/to-plain-text-date-time.js";
import {
  findProfileById
} from "../profile/profile.repository.js";
import {
  createEducation,
  deleteEducation,
  findAllEducations,
  findEducationById,
  updateEducation
} from "./education.repository.js";
import type {
  CreateEducationInput,
  UpdateEducationInput
} from "./education.types.js";

export async function getEducations(profileId?: string) {
  if (profileId) {
    const profile = await findProfileById(profileId);

    if (!profile) {
      throw new NotFoundError(
        "Profile not found",
        "PROFILE_NOT_FOUND"
      );
    }
  }

  return findAllEducations(profileId);
}

export async function getEducationById(id: string) {
  const education = await findEducationById(id);

  if (!education) {
    throw new NotFoundError(
      "Education not found",
      "EDUCATION_NOT_FOUND"
    );
  }

  return education;
}

export async function createNewEducation(
  data: CreateEducationInput
) {
  const profile = await findProfileById(data.profileId);

  if (!profile) {
    throw new NotFoundError(
      "Profile not found",
      "PROFILE_NOT_FOUND"
    );
  }

  validateEducationDates(
    data.startDate,
    data.endDate
  );

  return createEducation(data);
}

export async function updateExistingEducation(
  id: string,
  data: UpdateEducationInput
) {
  const existing = await findEducationById(id);

  if (!existing) {
    throw new NotFoundError(
      "Education not found",
      "EDUCATION_NOT_FOUND"
    );
  }

  const startDate =
    data.startDate ?? existing.startDate;

  const endDate =
    data.endDate !== undefined
      ? data.endDate
      : existing.endDate;

  validateEducationDates(
    startDate as Date,
    endDate as Date
  );

  return updateEducation(id, data);
}

export async function deleteExistingEducation(
  id: string
) {
  const existing = await findEducationById(id);

  if (!existing) {
    throw new NotFoundError(
      "Education not found",
      "EDUCATION_NOT_FOUND"
    );
  }

  await deleteEducation(id);
}

function validateEducationDates(
  startDate: Date,
  endDate: Date | null | undefined
) {
  if (
    endDate !== null &&
    endDate !== undefined &&
    endDate < startDate
  ) {
    throw new Error(
      "Education end date cannot be before start date"
    );
  }
}