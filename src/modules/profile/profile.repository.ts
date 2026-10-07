import { db } from "../../config/db.js";
import { toYearsOfExperience } from "../../utils/toYearsOfExperience.js";
import type {
  CreateProfileInput,
  UpdateProfileInput
} from "./profile.types.js";

const profileTable = db.orm.public.Profile;
const organisationsTable = db.orm.public.Organisations;

async function attachCurrentOrg<T extends Record<string, any> | null>(
  profileItem: T
) {
  if (!profileItem) return null;

  let currentOrg = null;
  if (profileItem["currentOrgId"]) {
    const org = await organisationsTable
      .where({ id: profileItem["currentOrgId"] as string })
      .first();
    if (org) {
      currentOrg = {
        id: org.id,
        name: org.name,
        website: org.website ?? null,
        description: org.description ?? null,
      };
    }
  }

  return {
    ...profileItem,
    currentOrg,
  };
}

export async function findProfile() {
  const item = await profileTable
    .orderBy((item) => item.createdAt.asc())
    .first();
  return attachCurrentOrg(item);
}

export async function findProfileById(id: string) {
  const item = await profileTable
    .where({ id })
    .first();
  return attachCurrentOrg(item);
}

export async function findProfileByEmail(email: string) {
  const item = await profileTable
    .where({ email })
    .first();
  return attachCurrentOrg(item);
}

export async function createProfile(
  data: CreateProfileInput
) {
  const created = await profileTable.create({
    photo: data.photo,
    name: data.name,
    role: data.role,
    email: data.email,
    description: data.description,
    yearsOfExperience: toYearsOfExperience(data.yearsOfExperience),
    currentPosition: data.currentPosition,
    currentOrgId: data.currentOrgId,
    aboutHeading: data.aboutHeading,
    aboutDescription: data.aboutDescription,
  });

  return attachCurrentOrg(created);
}

export async function updateProfile(
  id: string,
  data: UpdateProfileInput
) {
  const updated = await profileTable
    .where({ id })
    .update({
      ...(data.photo !== undefined && { photo: data.photo }),
      ...(data.name !== undefined && { name: data.name }),
      ...(data.role !== undefined && { role: data.role }),
      ...(data.email !== undefined && { email: data.email }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.yearsOfExperience !== undefined && {
        yearsOfExperience: toYearsOfExperience(data.yearsOfExperience),
      }),
      ...(data.currentPosition !== undefined && {
        currentPosition: data.currentPosition,
      }),
      ...(data.currentOrgId !== undefined && {
        currentOrgId: data.currentOrgId,
      }),
      ...(data.aboutHeading !== undefined && {
        aboutHeading: data.aboutHeading,
      }),
      ...(data.aboutDescription !== undefined && {
        aboutDescription: data.aboutDescription,
      }),
    });

  return attachCurrentOrg(updated);
}