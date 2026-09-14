import type { Request, Response } from "express";

import {
  createNewSkill,
  deleteExistingSkill,
  getSkillById,
  getSkills,
  updateExistingSkill
} from "./skill.service.js";

export async function getSkillsController(
  _req: Request,
  res: Response
) {
  const skills = await getSkills();

  res.status(200).json({
    success: true,
    data: skills
  });
}

export async function getSkillByIdController(
  req: Request,
  res: Response
) {
  const skill =
    await getSkillById(req.params.id?.toString()!);

  res.status(200).json({
    success: true,
    data: skill
  });
}

export async function createSkillController(
  req: Request,
  res: Response
) {
  const skill =
    await createNewSkill(req.body);

  res.status(201).json({
    success: true,
    data: skill
  });
}

export async function updateSkillController(
  req: Request,
  res: Response
) {
  const skill =
    await updateExistingSkill(
      req.params.id?.toString()!,
      req.body
    );

  res.status(200).json({
    success: true,
    data: skill
  });
}

export async function deleteSkillController(
  req: Request,
  res: Response
) {
  await deleteExistingSkill(
    req.params.id?.toString()!
  );

  res.status(204).send();
}