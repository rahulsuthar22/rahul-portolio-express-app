import { db } from "../../config/db.js";
import { toYearsOfExperience } from "../../utils/toYearsOfExperience.js";
import type {
  CreateProfileInput,
  UpdateProfileInput
} from "./profile.types.js";

const profile = db.orm.public.Profile;

export async function findProfile() {
  return profile
    .orderBy((item) => item.createdAt.asc())
    .first();
}

export async function findProfileById(id: string) {
  return profile
    .where({ id })
    .first();
}

export async function findProfileByEmail(email: string) {
  return profile
    .where({ email })
    .first();
}

export async function createProfile(
  data: CreateProfileInput
) {
  return profile.create({...data, yearsOfExperience: toYearsOfExperience(data.yearsOfExperience)});
}

export async function updateProfile(
  id: string,
  data: UpdateProfileInput
) {
  return profile
    .where({ id })
    .update({...data, yearsOfExperience: toYearsOfExperience(data.yearsOfExperience)});
}