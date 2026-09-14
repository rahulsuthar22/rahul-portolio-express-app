import {
  NotFoundError
} from "../../errors/index.js";

import {
  findAllContactMessages,
  findContactMessageById,
  createContactMessage,
  updateContactMessage,
  deleteContactMessage
} from "./contact.repository.js";

import type {
  CreateContactMessageInput,
  UpdateContactMessageInput
} from "./contact.types.js";

export async function getContactMessages() {
  return findAllContactMessages();
}

export async function getContactMessageById(
  id: string
) {
  const message =
    await findContactMessageById(id);

  if (!message) {
    throw new NotFoundError(
      "Contact message not found",
      "CONTACT_MESSAGE_NOT_FOUND"
    );
  }

  return message;
}

export async function createNewContactMessage(
  data: CreateContactMessageInput
) {
  return createContactMessage(data);
}

export async function updateExistingContactMessage(
  id: string,
  data: UpdateContactMessageInput
) {
  const existing =
    await findContactMessageById(id);

  if (!existing) {
    throw new NotFoundError(
      "Contact message not found",
      "CONTACT_MESSAGE_NOT_FOUND"
    );
  }

  return updateContactMessage(id, data);
}

export async function deleteExistingContactMessage(
  id: string
) {
  const existing =
    await findContactMessageById(id);

  if (!existing) {
    throw new NotFoundError(
      "Contact message not found",
      "CONTACT_MESSAGE_NOT_FOUND"
    );
  }

  await deleteContactMessage(id);
}