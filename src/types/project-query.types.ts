export type ProjectSortField =
  | "displayOrder"
  | "startDate"
  | "endDate"
  | "name"
  | "createdAt"
  | "updatedAt";

export type SortOrder = "asc" | "desc";

export interface ProjectQueryInput {
  page: number;
  limit: number;
  sortBy: ProjectSortField;
  sortOrder: SortOrder;
  search?: string;
  organizationId?: string;
}