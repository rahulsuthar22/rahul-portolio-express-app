import { db } from "../../config/db";
import { toPlainDateTime } from "../../utils/to-plain-text-date-time";

import type {
  CreateExperienceInput,
  UpdateExperienceInput
} from "./experience.types.js";

const experiences =
  db.orm.public.Experiences;

export async function findAllExperiences(
  profileId?: string
) {
  if (profileId) {
    return experiences
      .where({ profileId })
      .orderBy([
        (item) => item.displayOrder.asc(),
        (item) => item.startDate.desc()
      ])
      .all();
  }

  return experiences
    .orderBy([
      (item) => item.displayOrder.asc(),
      (item) => item.startDate.desc()
    ])
    .all();
}

export async function findExperienceById(
  id: string
) {
  return experiences
    .where({ id })
    .first();
}

export async function createExperience(
  data: CreateExperienceInput & {
    orgId: string;
  }
) {
  return experiences.create({
    profileId: data.profileId,
    orgId: data.orgId,
    position: data.position,
    startDate: toPlainDateTime(data.startDate)!,
    endDate: toPlainDateTime(data.endDate),
    modeOfWork: data.modeOfWork,
    description: data.description,
    displayOrder: data.displayOrder,
    isCurrent: data.isCurrent,
  });
}

export async function updateExperience(
  id: string,
  data: UpdateExperienceInput
) {
  return experiences
    .where({ id })
    .update({
      ...(data.organisationId !== undefined && {
        orgId: data.organisationId
      }),

      ...(data.position !== undefined && {
        position: data.position
      }),

      ...(data.startDate !== undefined && {
        startDate: toPlainDateTime(data.startDate)!
      }),

      ...(data.endDate !== undefined && {
        endDate: toPlainDateTime(data.endDate)
      }),

      ...(data.modeOfWork !== undefined && {
        modeOfWork: data.modeOfWork
      }),

      ...(data.description !== undefined && {
        description: data.description
      }),

      ...(data.displayOrder !== undefined && {
        displayOrder: data.displayOrder
      }),

      ...(data.isCurrent !== undefined && {
        isCurrent: data.isCurrent
      })
    });
}

export async function deleteExperience(
  id: string
) {
  return experiences
    .where({ id })
    .delete();
}

