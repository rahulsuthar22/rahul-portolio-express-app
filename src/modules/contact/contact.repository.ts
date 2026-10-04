import { db } from "../../config/db.js";
import { toPlainDateTime } from "../../utils/to-plain-text-date-time.js";

import type {
  CreateContactMessageInput,
  UpdateContactMessageInput
} from "./contact.types.js";

const messages =
  db.orm.public.ContactMessage;

export async function findAllContactMessages() {
  return messages
    .where({})
    .orderBy((item) => item.createdAt.desc())
    .all();
}

export async function findContactMessageById(
  id: string
) {
  return messages
    .where({ id })
    .first();
}

export async function createContactMessage(
  data: CreateContactMessageInput
) {
  return messages.create({
    name: data.name,
    email: data.email,
    subject: data.subject ?? null,
    message: data.message
  });
}

export async function updateContactMessage(
  id: string,
  data: UpdateContactMessageInput
) {
  return messages
    .where({ id })
    .update({
      ...(data.name !== undefined && {
        name: data.name
      }),

      ...(data.email !== undefined && {
        email: data.email
      }),

      ...(data.subject !== undefined && {
        subject: data.subject
      }),

      ...(data.message !== undefined && {
        message: data.message
      }),

      ...(data.status !== undefined && {
        status: data.status
      }),

      updatedAt: toPlainDateTime(new Date())!
    });
}

export async function deleteContactMessage(
  id: string
) {
  return messages
    .where({ id })
    .delete();
}