import {
  ConflictError,
  NotFoundError
} from "../../errors/index.js";

import * as profileRepository from "./profile.repository.js";

import type {
  CreateProfileInput,
  UpdateProfileInput
} from "./profile.types.js";

export async function getProfile() {
  return profileRepository.findProfile();
}

export async function createNewProfile(
  input: CreateProfileInput
) {
  const existingProfile =
    await profileRepository.findProfileByEmail(input.email);

  if (existingProfile) {
    throw new ConflictError(
      "Profile already exists"
    );
  }

  return profileRepository.createProfile(input);
}

export async function updateExistingProfile(
  id: string,
  input: UpdateProfileInput
) {
  const existingProfile =
    await profileRepository.findProfileById(id);

  if (!existingProfile) {
    throw new NotFoundError(
      "Profile not found"
    );
  }

  const updatedProfile =
    await profileRepository.updateProfile(id, input);

  if (!updatedProfile) {
    throw new NotFoundError(
      "Profile not found"
    );
  }

  return updatedProfile;
}