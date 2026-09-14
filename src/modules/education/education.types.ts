export interface CreateEducationInput {
  institute: string;
  degree: string;
  cgpa?: number | null;
  percentage?: number | null;
  startDate: Date;
  endDate?: Date | null;
  link?: string | null;
  displayOrder?: number;
  profileId: string;
}

export interface UpdateEducationInput {
  institute?: string;
  degree?: string;
  cgpa?: number | null;
  percentage?: number | null;
  startDate?: Date;
  endDate?: Date | null;
  link?: string | null;
  displayOrder?: number;
}