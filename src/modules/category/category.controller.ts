import type { Request, Response } from "express";

import {
  addSkillToCategory,
  createNewCategory,
  deleteExistingCategory,
  getCategories,
  getCategoryById,
  getSkillsForCategory,
  removeSkillFromCategory,
  updateExistingCategory
} from "./category.service.js";

export async function getCategoriesController(
  _req: Request,
  res: Response
) {
  const categories =
    await getCategories();

  res.status(200).json({
    success: true,
    data: categories
  });
}

export async function getCategoryByIdController(
  req: Request,
  res: Response
) {
  const category =
    await getCategoryById(req.params.id?.toString()!);

  res.status(200).json({
    success: true,
    data: category
  });
}

export async function createCategoryController(
  req: Request,
  res: Response
) {
  const category =
    await createNewCategory(req.body);

  res.status(201).json({
    success: true,
    data: category
  });
}

export async function updateCategoryController(
  req: Request,
  res: Response
) {
  const category =
    await updateExistingCategory(
      req.params.id?.toString()!,
      req.body
    );

  res.status(200).json({
    success: true,
    data: category
  });
}

export async function deleteCategoryController(
  req: Request,
  res: Response
) {
  await deleteExistingCategory(
    req.params.id?.toString()!
  );

  res.status(204).send();
}

export async function getCategorySkillsController(
  req: Request,
  res: Response
) {
  const skills =
    await getSkillsForCategory(
      req.params.id?.toString()!
    );

  res.status(200).json({
    success: true,
    data: skills
  });
}

export async function addSkillToCategoryController(
  req: Request,
  res: Response
) {
  const skill =
    await addSkillToCategory(
      req.params.id?.toString()!,
      req.params.skillId?.toString()!
    );

  res.status(201).json({
    success: true,
    data: skill
  });
}

export async function removeSkillFromCategoryController(
  req: Request,
  res: Response
) {
  await removeSkillFromCategory(
    req.params.id?.toString()!,
    req.params.skillId?.toString()!
  );

  res.status(204).send();
}