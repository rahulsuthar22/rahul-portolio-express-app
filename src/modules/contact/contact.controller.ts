import type {
  Request,
  Response
} from "express";

import {
  getContactMessages,
  getContactMessageById,
  createNewContactMessage,
  updateExistingContactMessage,
  deleteExistingContactMessage
} from "./contact.service.js";

export async function getContactMessagesController(
  _req: Request,
  res: Response
) {
  const messages =
    await getContactMessages();

  res.json({
    success: true,
    data: messages
  });
}

export async function getContactMessageByIdController(
  req: Request,
  res: Response
) {
  const message =
    await getContactMessageById(
      req.params.id?.toString()!
    );

  res.json({
    success: true,
    data: message
  });
}

export async function createContactMessageController(
  req: Request,
  res: Response
) {
  const message =
    await createNewContactMessage(
      req.body
    );

  res.status(201).json({
    success: true,
    data: message
  });
}

export async function updateContactMessageController(
  req: Request,
  res: Response
) {
  const message =
    await updateExistingContactMessage(
      req.params.id?.toString()!,
      req.body
    );

  res.json({
    success: true,
    data: message
  });
}

export async function deleteContactMessageController(
  req: Request,
  res: Response
) {
  await deleteExistingContactMessage(
    req.params.id?.toString()!
  );

  res.status(204).send();
}