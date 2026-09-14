import { db } from "../../config/db";
import { toPlainDateTime } from "../../utils/to-plain-text-date-time";

import type {
  CreateProjectInput,
  UpdateProjectInput
} from "./project.types.js";

const projects =
  db.orm.public.Projects;

export async function findAllProjects() {
  return projects
    .where({})
    .orderBy([
        (item) => item.displayOrder.asc(),
        (item) => item.startDate.desc()
      ])
    .all();
}

export async function findProjectById(
  id: string
) {
  return projects
    .where({ id })
    .first();
}

export async function createProject(
  data: CreateProjectInput
) {
  return projects.create({
    name: data.name,
    description: data.description ?? null,
    startDate: toPlainDateTime(data.startDate)! ?? null,
    endDate: toPlainDateTime(data.endDate) ?? null,
    link: data.link ?? null,
    impact: data.impact ?? null,
    playStoreLink: data.playStoreLink ?? null,
    iosLink: data.iosLink ?? null,
    displayOrder: data.displayOrder ?? 0,
    orgId: data.organizationId ?? null
  });
}

export async function updateProject(
  id: string,
  data: UpdateProjectInput
) {
  return projects
    .where({ id })
    .update({
      ...(data.name !== undefined && {
        name: data.name
      }),

      ...(data.description !== undefined && {
        description: data.description
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

      ...(data.impact !== undefined && {
        impact: data.impact
      }),

      ...(data.playStoreLink !== undefined && {
        playStoreLink: data.playStoreLink
      }),

      ...(data.iosLink !== undefined && {
        iosLink: data.iosLink
      }),

      ...(data.displayOrder !== undefined && {
        displayOrder: data.displayOrder
      }),

      ...(data.organizationId !== undefined && {
        orgId: data.organizationId
      }),

      updatedAt: toPlainDateTime(new Date())!
    });
}

export async function deleteProject(
  id: string
) {
  return projects
    .where({ id })
    .delete();
}

const projectSkills =
  db.orm.public.ProjectSkill;
  
  
export async function findProjectSkills(
  projectId: string
) {
  return projectSkills
    .where({ projectId })
    .all();
}

export async function findProjectSkill(
  projectId: string,
  skillId: string
) {
  return projectSkills
    .where({
      projectId,
      skillId
    })
    .first();
}

export async function createProjectSkill(
  projectId: string,
  skillId: string
) {
  return projectSkills.create({
    projectId,
    skillId
  });
}

export async function deleteProjectSkill(
  projectId: string,
  skillId: string
) {
  return projectSkills
    .where({
      projectId,
      skillId
    })
    .delete();
}