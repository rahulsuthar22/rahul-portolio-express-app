import { db } from "../../config/db.js";
import { toPlainDateTime } from "../../utils/to-plain-text-date-time.js";
import type {
  CreateCategoryInput,
  UpdateCategoryInput
} from "./category.types.js";

const categories = db.orm.public.Categories;
const categorySkills = db.orm.public.CategorySkill;

export async function findAllCategories() {
  return categories
    .where({})
    .orderBy([(item)=> item.displayOrder.asc(), 
        (item)=> item.name.asc()])
    .all();
}

export async function findCategoryById(id: string) {
  return categories
    .where({ id })
    .first();
}

export async function findCategoryByName(
  name: string
) {
  return categories
    .where({ name })
    .first();
}

export async function createCategory(
  data: CreateCategoryInput
) {
  return categories.create({
    name: data.name,
    link: data.link ?? null,
    icon: data.icon ?? null,
    displayOrder: data.displayOrder ?? 0
  });
}

export async function updateCategory(
  id: string,
  data: UpdateCategoryInput
) {
  return categories
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

export async function deleteCategory(id: string) {
  return categories
    .where({ id })
    .delete();
}


export async function findCategorySkills(
  categoryId: string
) {
  return categorySkills
    .where({ categoryId })
    .all();
}

export async function findCategorySkill(
  categoryId: string,
  skillId: string
) {
  return categorySkills
    .where({
      categoryId,
      skillId
    })
    .first();
}

export async function createCategorySkill(
  categoryId: string,
  skillId: string
) {
  return categorySkills.create({
    categoryId,
    skillId
  });
}

export async function deleteCategorySkill(
  categoryId: string,
  skillId: string
) {
  return categorySkills
    .where({
      categoryId,
      skillId
    })
    .delete();
}


const skills = db.orm.public.Skills;

export async function findSkillsByIds(
  ids: string[]
) {
  if (ids.length === 0) {
    return [];
  }

  return skills
    .where((skill) => skill.id.in(ids))
    .all();
}