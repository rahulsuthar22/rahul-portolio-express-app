import { db } from "../../config/db.js";
import { toPlainDateTime } from "../../utils/to-plain-text-date-time.js";

import type {
  CreateIndustryInput,
  UpdateIndustryInput
} from "./industry.types.js";

const industries =
  db.orm.public.Industries;

const profileIndustries =
  db.orm.public.ProfileIndustries;

export async function findAllIndustries() {
  return industries
    .where({})
    .orderBy([(item)=> item.displayOrder.asc(), 
        (item)=> item.name.asc()])
    .all();
}

export async function findIndustryById(
  id: string
) {
  return industries
    .where({ id })
    .first();
}

export async function findIndustryByName(
  name: string
) {
  return industries
    .where({ name })
    .first();
}

export async function findIndustryBySlug(
  slug: string
) {
  return industries
    .where({ slug })
    .first();
}

export async function createIndustry(
  data: CreateIndustryInput
) {
  return industries.create({
    name: data.name,
    slug: data.slug,
    displayOrder: data.displayOrder ?? 0
  });
}

export async function updateIndustry(
  id: string,
  data: UpdateIndustryInput
) {
  return industries
    .where({ id })
    .update({
      ...(data.name !== undefined && {
        name: data.name
      }),

      ...(data.slug !== undefined && {
        slug: data.slug
      }),

      ...(data.displayOrder !== undefined && {
        displayOrder: data.displayOrder
      }),

      updatedAt: toPlainDateTime(new Date())!
    });
}

export async function deleteIndustry(
  id: string
) {
  return industries
    .where({ id })
    .delete();
}

export async function findProfileIndustry(
  profileId: string,
  industryId: string
) {
  return profileIndustries
    .where({
      profileId,
      industryId
    })
    .first();
}

export async function findProfileIndustries(
  profileId: string
) {
  return profileIndustries
    .where({ profileId })
    .all();
}

export async function createProfileIndustry(
  profileId: string,
  industryId: string
) {
  return profileIndustries.create({
    profileId,
    industryId
  });
}

export async function deleteProfileIndustry(
  profileId: string,
  industryId: string
) {
  return profileIndustries
    .where({
      profileId,
      industryId
    })
    .delete();
}