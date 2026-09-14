import { db } from "../../config/db";
import { toPlainDateTime } from "../../utils/to-plain-text-date-time";

import type {
  CreateSocialLinkInput,
  UpdateSocialLinkInput
} from "./social-link.types.js";

const socialLinks =
  db.orm.public.SocialLinks;

export async function findAllSocialLinks(
  profileId?: string
) {
  const query = profileId
    ? socialLinks.where({ profileId })
    : socialLinks.where({});

  return query
    .orderBy((item)=> item.displayOrder.asc())
    .all();
}

export async function findSocialLinkById(
  id: string
) {
  return socialLinks
    .where({ id })
    .first();
}

export async function findSocialLinkByPlatform(
  profileId: string,
  platform: CreateSocialLinkInput["platform"]
) {
  return socialLinks
    .where({
      profileId,
      platform
    })
    .first();
}

export async function createSocialLink(
  data: CreateSocialLinkInput
) {
  return socialLinks.create({
    platform: data.platform,
    url: data.url,
    displayOrder: data.displayOrder ?? 0,
    profileId: data.profileId
  });
}

export async function updateSocialLink(
  id: string,
  data: UpdateSocialLinkInput
) {
  return socialLinks
    .where({ id })
    .update({
      ...(data.url !== undefined && {
        url: data.url
      }),

      ...(data.displayOrder !== undefined && {
        displayOrder: data.displayOrder
      }),

      updatedAt: toPlainDateTime(new Date())!
    });
}

export async function deleteSocialLink(
  id: string
) {
  return socialLinks
    .where({ id })
    .delete();
}