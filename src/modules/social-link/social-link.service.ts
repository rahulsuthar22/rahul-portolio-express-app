import {
  ConflictError,
  NotFoundError
} from "../../errors/index.js";

import {
  findProfileById
} from "../profile/profile.repository.js";

import {
  findAllSocialLinks,
  findSocialLinkById,
  findSocialLinkByPlatform,
  createSocialLink,
  updateSocialLink,
  deleteSocialLink
} from "./social-link.repository.js";

import type {
  CreateSocialLinkInput,
  UpdateSocialLinkInput
} from "./social-link.types.js";

export async function getSocialLinks(
  profileId?: string
) {
  if (profileId) {
    const profile =
      await findProfileById(profileId);

    if (!profile) {
      throw new NotFoundError(
        "Profile not found",
        "PROFILE_NOT_FOUND"
      );
    }
  }

  return findAllSocialLinks(profileId);
}

export async function getSocialLinkById(
  id: string
) {
  const link =
    await findSocialLinkById(id);

  if (!link) {
    throw new NotFoundError(
      "Social link not found",
      "SOCIAL_LINK_NOT_FOUND"
    );
  }

  return link;
}

export async function createNewSocialLink(
  data: CreateSocialLinkInput
) {
  const profile =
    await findProfileById(data.profileId);

  if (!profile) {
    throw new NotFoundError(
      "Profile not found",
      "PROFILE_NOT_FOUND"
    );
  }

  const existing =
    await findSocialLinkByPlatform(
      data.profileId,
      data.platform
    );

  if (existing) {
    throw new ConflictError(
      `A ${data.platform} social link already exists for this profile`,
      "SOCIAL_LINK_ALREADY_EXISTS"
    );
  }

  return createSocialLink(data);
}

export async function updateExistingSocialLink(
  id: string,
  data: UpdateSocialLinkInput
) {
  const existing =
    await findSocialLinkById(id);

  if (!existing) {
    throw new NotFoundError(
      "Social link not found",
      "SOCIAL_LINK_NOT_FOUND"
    );
  }

  return updateSocialLink(id, data);
}

export async function deleteExistingSocialLink(
  id: string
) {
  const existing =
    await findSocialLinkById(id);

  if (!existing) {
    throw new NotFoundError(
      "Social link not found",
      "SOCIAL_LINK_NOT_FOUND"
    );
  }

  await deleteSocialLink(id);
}