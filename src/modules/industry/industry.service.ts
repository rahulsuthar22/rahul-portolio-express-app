import {
  ConflictError,
  NotFoundError
} from "../../errors/index.js";

import {
  findProfileById
} from "../profile/profile.repository.js";

import {
  findIndustryById,
  findIndustryByName,
  findIndustryBySlug,
  findAllIndustries,
  createIndustry,
  updateIndustry,
  deleteIndustry,
  findProfileIndustry,
  findProfileIndustries,
  createProfileIndustry,
  deleteProfileIndustry
} from "./industry.repository.js";

import type {
  CreateIndustryInput,
  UpdateIndustryInput
} from "./industry.types.js";

export async function getIndustries() {
  return findAllIndustries();
}

export async function getIndustryById(
  id: string
) {
  const industry =
    await findIndustryById(id);

  if (!industry) {
    throw new NotFoundError(
      "Industry not found",
      "INDUSTRY_NOT_FOUND"
    );
  }

  return industry;
}

export async function createNewIndustry(
  data: CreateIndustryInput
) {
  const existingName =
    await findIndustryByName(data.name);

  if (existingName) {
    throw new ConflictError(
      "An industry with this name already exists",
      "INDUSTRY_NAME_ALREADY_EXISTS"
    );
  }

  const existingSlug =
    await findIndustryBySlug(data.slug);

  if (existingSlug) {
    throw new ConflictError(
      "An industry with this slug already exists",
      "INDUSTRY_SLUG_ALREADY_EXISTS"
    );
  }

  return createIndustry(data);
}

export async function updateExistingIndustry(
  id: string,
  data: UpdateIndustryInput
) {
  const existing =
    await findIndustryById(id);

  if (!existing) {
    throw new NotFoundError(
      "Industry not found",
      "INDUSTRY_NOT_FOUND"
    );
  }

  if (data.name !== undefined) {
    const duplicate =
      await findIndustryByName(data.name);

    if (
      duplicate &&
      duplicate.id !== id
    ) {
      throw new ConflictError(
        "An industry with this name already exists",
        "INDUSTRY_NAME_ALREADY_EXISTS"
      );
    }
  }

  if (data.slug !== undefined) {
    const duplicate =
      await findIndustryBySlug(data.slug);

    if (
      duplicate &&
      duplicate.id !== id
    ) {
      throw new ConflictError(
        "An industry with this slug already exists",
        "INDUSTRY_SLUG_ALREADY_EXISTS"
      );
    }
  }

  return updateIndustry(id, data);
}

export async function deleteExistingIndustry(
  id: string
) {
  const existing =
    await findIndustryById(id);

  if (!existing) {
    throw new NotFoundError(
      "Industry not found",
      "INDUSTRY_NOT_FOUND"
    );
  }

  await deleteIndustry(id);
}

export async function getIndustriesForProfile(
  profileId: string
) {
  const profile =
    await findProfileById(profileId);

  if (!profile) {
    throw new NotFoundError(
      "Profile not found",
      "PROFILE_NOT_FOUND"
    );
  }

  const relations =
    await findProfileIndustries(profileId);

  const results = await Promise.all(
    relations.map(({ industryId }) =>
      findIndustryById(industryId)
    )
  );

  return results.filter(
    (
      industry
    ): industry is NonNullable<typeof industry> =>
      industry !== null &&
      industry !== undefined
  );
}

export async function addIndustryToProfile(
  profileId: string,
  industryId: string
) {
  const profile =
    await findProfileById(profileId);

  if (!profile) {
    throw new NotFoundError(
      "Profile not found",
      "PROFILE_NOT_FOUND"
    );
  }

  const industry =
    await findIndustryById(industryId);

  if (!industry) {
    throw new NotFoundError(
      "Industry not found",
      "INDUSTRY_NOT_FOUND"
    );
  }

  const existing =
    await findProfileIndustry(
      profileId,
      industryId
    );

  if (existing) {
    throw new ConflictError(
      "Industry is already assigned to this profile",
      "PROFILE_INDUSTRY_ALREADY_EXISTS"
    );
  }

  await createProfileIndustry(
    profileId,
    industryId
  );

  return industry;
}

export async function removeIndustryFromProfile(
  profileId: string,
  industryId: string
) {
  const relation =
    await findProfileIndustry(
      profileId,
      industryId
    );

  if (!relation) {
    throw new NotFoundError(
      "Industry is not assigned to this profile",
      "PROFILE_INDUSTRY_NOT_FOUND"
    );
  }

  await deleteProfileIndustry(
    profileId,
    industryId
  );
}