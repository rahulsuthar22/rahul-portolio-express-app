import { db } from "../../config/db.js";
import type { PaginationInput } from "../../types/pagination.types";
import type { ProjectQueryInput } from "../../types/project-query.types.js";
import { toPlainDateTime } from "../../utils/to-plain-text-date-time.js";

import type {
  CreateProjectInput,
  UpdateProjectInput
} from "./project.types.js";

const projects =
  db.orm.public.Projects;

export async function findAllProjects(
  query: ProjectQueryInput
) {
  const {
    page,
    limit,
    sortBy,
    sortOrder,
    search,
    organizationId,
  } = query;

  const offset = (page - 1) * limit;

  /*
   * Build filters
   */
  const filters: Record<string, unknown> = {};

  if (organizationId) {
    filters.orgId = organizationId;
  }

  /*
   * Search
   *
   * Keep this simple for now:
   * project name contains search term.
   */
  if (search) {
    filters.name = {
      contains: search,
    };
  }

  /*
   * Sorting
   */
  const orderBy =
    sortBy === "displayOrder"
      ? [(item: any) =>
        sortOrder === "asc"
          ? item.displayOrder.asc()
          : item.displayOrder.desc()
      ]
      : sortBy === "startDate"
        ? [(item: any) =>
          sortOrder === "asc"
            ? item.startDate.asc()
            : item.startDate.desc()
        ]
        : sortBy === "endDate"
          ? [(item: any) =>
            sortOrder === "asc"
              ? item.endDate.asc()
              : item.endDate.desc()
          ]
          : sortBy === "name"
            ? [(item: any) =>
              sortOrder === "asc"
                ? item.name.asc()
                : item.name.desc()
            ]
            : sortBy === "createdAt"
              ? [(item: any) =>
                sortOrder === "asc"
                  ? item.createdAt.asc()
                  : item.createdAt.desc()
              ]
              : [(item: any) =>
                sortOrder === "asc"
                  ? item.updatedAt.asc()
                  : item.updatedAt.desc()
              ];

  const [data, countResult] = await Promise.all([
    projects
      .where(filters)
      .orderBy(orderBy)
      .offset(offset)
      .limit(limit)
      .all(),

    projects
      .where(filters)
      .aggregate((aggregate) => ({
        total: aggregate.count(),
      })),
  ]);

  const total = countResult.total;

  return {
    data,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
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