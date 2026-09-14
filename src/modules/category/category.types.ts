export interface CreateCategoryInput {
  name: string;
  link?: string | null;
  icon?: string | null;
  displayOrder?: number;
}

export interface UpdateCategoryInput {
  name?: string;
  link?: string | null;
  icon?: string | null;
  displayOrder?: number;
}