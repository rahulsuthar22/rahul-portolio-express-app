import {
  ConflictError,
  NotFoundError
} from "../../errors/index.js";

import {
  createSkill,
  deleteSkill,
  findAllSkills,
  findSkillById,
  findSkillByName,
  updateSkill
} from "./skill.repository.js";

import type {
  CreateSkillInput,
  UpdateSkillInput
} from "./skill.types.js";

export async function getSkills() {
  return findAllSkills();
}

export async function getSkillById(id: string) {
  const skill = await findSkillById(id);

  if (!skill) {
    throw new NotFoundError(
      "Skill not found",
      "SKILL_NOT_FOUND"
    );
  }

  return skill;
}

export async function createNewSkill(
  data: CreateSkillInput
) {
  const existingSkill =
    await findSkillByName(data.name);

  if (existingSkill) {
    throw new ConflictError(
      "A skill with this name already exists",
      "SKILL_ALREADY_EXISTS"
    );
  }

  return createSkill(data);
}

export async function updateExistingSkill(
  id: string,
  data: UpdateSkillInput
) {
  const existingSkill =
    await findSkillById(id);

  if (!existingSkill) {
    throw new NotFoundError(
      "Skill not found",
      "SKILL_NOT_FOUND"
    );
  }

  if (data.name !== undefined) {
    const duplicate =
      await findSkillByName(data.name);

    if (
      duplicate &&
      duplicate.id !== id
    ) {
      throw new ConflictError(
        "A skill with this name already exists",
        "SKILL_ALREADY_EXISTS"
      );
    }
  }

  return updateSkill(id, data);
}

export async function deleteExistingSkill(
  id: string
) {
  const existingSkill =
    await findSkillById(id);

  if (!existingSkill) {
    throw new NotFoundError(
      "Skill not found",
      "SKILL_NOT_FOUND"
    );
  }

  await deleteSkill(id);
}