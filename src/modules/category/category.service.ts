import {
  ConflictError,
  NotFoundError
} from "../../errors/index.js";

import {
  createCategory,
  createCategorySkill,
  deleteCategory,
  deleteCategorySkill,
  findAllCategories,
  findCategoryById,
  findCategoryByName,
  findCategorySkill,
  findCategorySkills,
  updateCategory
} from "./category.repository.js";

import {
  findSkillById
} from "../skill/skill.repository.js";

import type {
  CreateCategoryInput,
  UpdateCategoryInput
} from "./category.types.js";

export async function getCategories() {
  return findAllCategories();
}

export async function getCategoryById(
  id: string
) {
  const category =
    await findCategoryById(id);

  if (!category) {
    throw new NotFoundError(
      "Category not found",
      "CATEGORY_NOT_FOUND"
    );
  }

  return category;
}

export async function createNewCategory(
  data: CreateCategoryInput
) {
  const existing =
    await findCategoryByName(data.name);

  if (existing) {
    throw new ConflictError(
      "A category with this name already exists",
      "CATEGORY_ALREADY_EXISTS"
    );
  }

  return createCategory(data);
}

export async function updateExistingCategory(
  id: string,
  data: UpdateCategoryInput
) {
  const existing =
    await findCategoryById(id);

  if (!existing) {
    throw new NotFoundError(
      "Category not found",
      "CATEGORY_NOT_FOUND"
    );
  }

  if (data.name !== undefined) {
    const duplicate =
      await findCategoryByName(data.name);

    if (
      duplicate &&
      duplicate.id !== id
    ) {
      throw new ConflictError(
        "A category with this name already exists",
        "CATEGORY_ALREADY_EXISTS"
      );
    }
  }

  return updateCategory(id, data);
}

export async function deleteExistingCategory(
  id: string
) {
  const existing =
    await findCategoryById(id);

  if (!existing) {
    throw new NotFoundError(
      "Category not found",
      "CATEGORY_NOT_FOUND"
    );
  }

  await deleteCategory(id);
}

export async function getSkillsForCategory(
  categoryId: string
) {
  const category =
    await findCategoryById(categoryId);

  if (!category) {
    throw new NotFoundError(
      "Category not found",
      "CATEGORY_NOT_FOUND"
    );
  }

  const relationships =
    await findCategorySkills(categoryId);

  const skills = await Promise.all(
    relationships.map(
      ({ skillId }) =>
        findSkillById(skillId)
    )
  );

  return skills.filter(
    (skill): skill is NonNullable<typeof skill> =>
      skill !== null && skill !== undefined
  );
}

export async function addSkillToCategory(
  categoryId: string,
  skillId: string
) {
  const category =
    await findCategoryById(categoryId);

  if (!category) {
    throw new NotFoundError(
      "Category not found",
      "CATEGORY_NOT_FOUND"
    );
  }

  const skill =
    await findSkillById(skillId);

  if (!skill) {
    throw new NotFoundError(
      "Skill not found",
      "SKILL_NOT_FOUND"
    );
  }

  const existing =
    await findCategorySkill(
      categoryId,
      skillId
    );

  if (existing) {
    throw new ConflictError(
      "Skill is already assigned to this category",
      "CATEGORY_SKILL_ALREADY_EXISTS"
    );
  }

  await createCategorySkill(
    categoryId,
    skillId
  );

  return skill;
}

export async function removeSkillFromCategory(
  categoryId: string,
  skillId: string
) {
  const category =
    await findCategoryById(categoryId);

  if (!category) {
    throw new NotFoundError(
      "Category not found",
      "CATEGORY_NOT_FOUND"
    );
  }

  const relationship =
    await findCategorySkill(
      categoryId,
      skillId
    );

  if (!relationship) {
    throw new NotFoundError(
      "Skill is not assigned to this category",
      "CATEGORY_SKILL_NOT_FOUND"
    );
  }

  await deleteCategorySkill(
    categoryId,
    skillId
  );
}