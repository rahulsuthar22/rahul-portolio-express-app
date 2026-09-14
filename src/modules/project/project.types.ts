export interface CreateProjectInput {
  name: string;
  description?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  link?: string | null;
  impact?: string | null;
  playStoreLink?: string | null;
  iosLink?: string | null;
  displayOrder?: number;
  organizationId?: string | null;
}

export interface UpdateProjectInput {
  name?: string;
  description?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  link?: string | null;
  impact?: string | null;
  playStoreLink?: string | null;
  iosLink?: string | null;
  displayOrder?: number;
  organizationId?: string | null;
}