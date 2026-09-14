import { db } from "../../config/db";
import { toPlainDateTime } from "../../utils/to-plain-text-date-time";
import type {
  CreateSkillInput,
  UpdateSkillInput
} from "./skill.types.js";

const skills = db.orm.public.Skills;

export async function findAllSkills() {
  return skills
    .where({})
    .orderBy([
        (item) => item.displayOrder.asc(),
        (item) => item.name.asc(),
    ])
    .all();
}

export async function findSkillById(id: string) {
  return skills
    .where({ id })
    .first();
}

export async function findSkillByName(name: string) {
  return skills
    .where({ name })
    .first();
}

export async function createSkill(
  data: CreateSkillInput
) {
  return skills.create({
    name: data.name,
    link: data.link ?? null,
    icon: data.icon ?? null,
    displayOrder: data.displayOrder ?? 0
  });
}

export async function updateSkill(
  id: string,
  data: UpdateSkillInput
) {
  return skills
    .where({ id })
    .update({
      ...(data.name !== undefined && {
        name: data.name
      }),

      ...(data.link !== undefined && {
        link: data.link
      }),

      ...(data.icon !== undefined && {
        icon: data.icon
      }),

      ...(data.displayOrder !== undefined && {
        displayOrder: data.displayOrder
      }),

      updatedAt: toPlainDateTime(new Date())!
    });
}

export async function deleteSkill(id: string) {
  return skills
    .where({ id })
    .delete();
}