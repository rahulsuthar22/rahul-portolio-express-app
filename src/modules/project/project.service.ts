import {
  BadRequestError,
  ConflictError,
  NotFoundError
} from "../../errors/index.js";

import {
  findOrganisationById
} from "../organisation/organisation.repository.js";

import {
  createProject,
  createProjectSkill,
  deleteProject,
  deleteProjectSkill,
  findAllProjects,
  findProjectById,
  findProjectSkill,
  findProjectSkills,
  updateProject
} from "./project.repository.js";

import type {
  CreateProjectInput,
  UpdateProjectInput
} from "./project.types.js";

import {
  findSkillById
} from "../skill/skill.repository.js";
import type { ProjectQueryInput } from "../../types/project-query.types.js";

export async function getProjects(
  query: ProjectQueryInput
) {
  return findAllProjects(query);
}

export async function getProjectById(
  id: string
) {
  const project =
    await findProjectById(id);

  if (!project) {
    throw new NotFoundError(
      "Project not found",
      "PROJECT_NOT_FOUND"
    );
  }

  return project;
}

export async function createNewProject(
  data: CreateProjectInput
) {
  await validateOrganisation(
    data.organizationId
  );

  validateProjectDates(
    data.startDate,
    data.endDate
  );

  return createProject(data);
}

export async function updateExistingProject(
  id: string,
  data: UpdateProjectInput
) {
  const existing =
    await findProjectById(id);

  if (!existing) {
    throw new NotFoundError(
      "Project not found",
      "PROJECT_NOT_FOUND"
    );
  }

  if (data.organizationId !== undefined) {
    await validateOrganisation(
      data.organizationId
    );
  }

  const startDate =
    data.startDate !== undefined
      ? data.startDate
      : existing.startDate;

  const endDate =
    data.endDate !== undefined
      ? data.endDate
      : existing.endDate;

  validateProjectDates(
    startDate as Date,
    endDate as Date
  );

  return updateProject(id, data);
}

export async function deleteExistingProject(
  id: string
) {
  const existing =
    await findProjectById(id);

  if (!existing) {
    throw new NotFoundError(
      "Project not found",
      "PROJECT_NOT_FOUND"
    );
  }

  await deleteProject(id);
}

async function validateOrganisation(
  organizationId:
    | string
    | null
    | undefined
) {
  if (
    organizationId === undefined ||
    organizationId === null
  ) {
    return;
  }

  const organisation =
    await findOrganisationById(
      organizationId
    );

  if (!organisation) {
    throw new NotFoundError(
      "Organisation not found",
      "ORGANISATION_NOT_FOUND"
    );
  }
}

function validateProjectDates(
  startDate: Date | null | undefined,
  endDate: Date | null | undefined
) {
  if (
    startDate &&
    endDate &&
    endDate < startDate
  ) {
    throw new BadRequestError(
      "Project end date cannot be before start date",
      "INVALID_PROJECT_DATES"
    );
  }
}

export async function getSkillsForProject(
  projectId: string
) {
  const project =
    await findProjectById(projectId);

  if (!project) {
    throw new NotFoundError(
      "Project not found",
      "PROJECT_NOT_FOUND"
    );
  }

  const relationships =
    await findProjectSkills(projectId);

  const skills = await Promise.all(
    relationships.map(
      ({ skillId }) =>
        findSkillById(skillId)
    )
  );

  return skills.filter(
    (
      skill
    ): skill is NonNullable<typeof skill> =>
      skill !== null &&
      skill !== undefined
  );
}

export async function addSkillToProject(
  projectId: string,
  skillId: string
) {
  const project =
    await findProjectById(projectId);

  if (!project) {
    throw new NotFoundError(
      "Project not found",
      "PROJECT_NOT_FOUND"
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
    await findProjectSkill(
      projectId,
      skillId
    );

  if (existing) {
    throw new ConflictError(
      "Skill is already assigned to this project",
      "PROJECT_SKILL_ALREADY_EXISTS"
    );
  }

  await createProjectSkill(
    projectId,
    skillId
  );

  return skill;
}

export async function removeSkillFromProject(
  projectId: string,
  skillId: string
) {
  const existing =
    await findProjectSkill(
      projectId,
      skillId
    );

  if (!existing) {
    throw new NotFoundError(
      "Skill is not assigned to this project",
      "PROJECT_SKILL_NOT_FOUND"
    );
  }

  await deleteProjectSkill(
    projectId,
    skillId
  );
}