export type ContactStatus =
  | "NEW"
  | "READ"
  | "REPLIED"
  | "ARCHIVED";

export interface CreateContactMessageInput {
  name: string;
  email: string;
  subject?: string | null;
  message: string;
}

export interface UpdateContactMessageInput {
  name?: string;
  email?: string;
  subject?: string | null;
  message?: string;
  status?: ContactStatus;
}