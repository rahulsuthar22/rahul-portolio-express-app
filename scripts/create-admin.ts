import { hashPassword } from "../src/utils/password.js";
import { db } from "../src/config/db.js";

const email =
  process.env.ADMIN_EMAIL?.trim().toLowerCase();

const password =
  process.env.ADMIN_PASSWORD;

if (!email) {
  throw new Error(
    "ADMIN_EMAIL is required"
  );
}

if (!password) {
  throw new Error(
    "ADMIN_PASSWORD is required"
  );
}

if (password.length < 12) {
  throw new Error(
    "ADMIN_PASSWORD must contain at least 12 characters"
  );
}

const existing =
  await db.orm.public.AdminUser
    .where({ email })
    .first();

if (existing) {
  throw new Error(
    "Admin user already exists"
  );
}

const passwordHash =
  await hashPassword(password);

await db.orm.public.AdminUser.create({
  email,
  passwordHash,
  role: "ADMIN"
});

console.log(
  `Admin user created: ${email}`
);