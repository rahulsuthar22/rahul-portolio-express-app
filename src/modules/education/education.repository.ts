import { db } from "../../config/db.js";
import { toPlainDateTime } from "../../utils/to-plain-text-date-time.js";
import { toPercentage } from "../../utils/toYearsOfExperience.js";
import type {
  CreateEducationInput,
  UpdateEducationInput
} from "./education.types.js";

const educations = db.orm.public.Educations;

export async function findAllEducations(profileId?: string) {
  const query = profileId
    ? educations.where({ profileId })
    : educations.where({});

  return query
    .orderBy([
        (item) => item.displayOrder.asc(),
        (item) => item.startDate.desc()
      ])
    .all();
}

export async function findEducationById(id: string) {
  return educations
    .where({ id })
    .first();
}

export async function createEducation(
  data: CreateEducationInput
) {
  return educations.create({
    institute: data.institute,
    degree: data.degree,
    cgpa: toPercentage(data.cgpa) ?? null,
    percentage: toPercentage(data.percentage) ?? null,
    startDate: toPlainDateTime(data.startDate)!,
    endDate: toPlainDateTime(data.endDate) ?? null,
    link: data.link ?? null,
    displayOrder: data.displayOrder ?? 0,
    profileId: data.profileId
  });
}

export async function updateEducation(
  id: string,
  data: UpdateEducationInput
) {
  return educations
    .where({ id })
    .update({
      ...(data.institute !== undefined && {
        institute: data.institute
      }),

      ...(data.degree !== undefined && {
        degree: data.degree
      }),

      ...(data.cgpa !== undefined && {
        cgpa: toPercentage(data.cgpa)
      }),

      ...(data.percentage !== undefined && {
        percentage: toPercentage(data.percentage)
      }),

      ...(data.startDate !== undefined && {
        startDate: toPlainDateTime(data.startDate)!
      }),

      ...(data.endDate !== undefined && {
        endDate: toPlainDateTime(data.endDate)
      }),

      ...(data.link !== undefined && {
        link: data.link
      }),

      ...(data.displayOrder !== undefined && {
        displayOrder: data.displayOrder
      }),

      updatedAt: toPlainDateTime(new Date())!,
    });
}

export async function deleteEducation(id: string) {
  return educations
    .where({ id })
    .delete();
}