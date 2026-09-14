import { db } from "../../config/db";

import type {
  CreateOrganisationInput,
  UpdateOrganisationInput
} from "./organisation.types.js";

const organisations =
  db.orm.public.Organisations;

export async function findAllOrganisations() {
  return organisations
    .orderBy((item) => item.name.asc())
    .all();
}

export async function findOrganisationById(
  id: string
) {
  return organisations
    .where({ id })
    .first();
}

export async function findOrganisationByName(
  name: string
) {
  return organisations
    .where({ name })
    .first();
}

export async function createOrganisation(
  data: CreateOrganisationInput
) {
  return organisations.create(data);
}

export async function updateOrganisation(
  id: string,
  data: UpdateOrganisationInput
) {
  return organisations
    .where({ id })
    .update(data);
}

export async function deleteOrganisation(
  id: string
) {
  return organisations
    .where({ id })
    .delete();
}