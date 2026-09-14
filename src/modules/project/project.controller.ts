import type {
  Request,
  Response
} from "express";

import {
  getProjects,
  getProjectById,
  createNewProject,
  updateExistingProject,
  deleteExistingProject,
  addSkillToProject,
  getSkillsForProject,
  removeSkillFromProject
} from "./project.service.js";

export async function getProjectsController(
  _req: Request,
  res: Response
) {
  const projects =
    await getProjects();

  res.json({
    success: true,
    data: projects
  });
}

export async function getProjectByIdController(
  req: Request,
  res: Response
) {
  const project =
    await getProjectById(req.params.id?.toString()!);

  res.json({
    success: true,
    data: project
  });
}

export async function createProjectController(
  req: Request,
  res: Response
) {
  const project =
    await createNewProject(req.body);

  res.status(201).json({
    success: true,
    data: project
  });
}

export async function updateProjectController(
  req: Request,
  res: Response
) {
  const project =
    await updateExistingProject(
      req.params.id?.toString()!,
      req.body
    );

  res.json({
    success: true,
    data: project
  });
}

export async function deleteProjectController(
  req: Request,
  res: Response
) {
  await deleteExistingProject(
    req.params.id?.toString()!
  );

  res.status(204).send();
}

export async function getProjectSkillsController(
  req: Request,
  res: Response
) {
  const skills =
    await getSkillsForProject(
      req.params.id?.toString()!
    );

  res.json({
    success: true,
    data: skills
  });
}

export async function addSkillToProjectController(
  req: Request,
  res: Response
) {
  const skill =
    await addSkillToProject(
      req.params.id?.toString()!,
      req.params.skillId?.toString()!
    );

  res.status(201).json({
    success: true,
    data: skill
  });
}

export async function removeSkillFromProjectController(
  req: Request,
  res: Response
) {
  await removeSkillFromProject(
    req.params.id?.toString()!,
    req.params.skillId?.toString()!
  );

  res.status(204).send();
}