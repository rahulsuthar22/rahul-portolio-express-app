import { db } from "../../config/db.js";

const adminUser =
  db.orm.public.AdminUser;

export async function findAdminByEmail(
  email: string
) {
  return adminUser
    .where({ email })
    .first();
}

export async function findAdminById(
  id: string
) {
  return adminUser
    .where({ id })
    .first();
}