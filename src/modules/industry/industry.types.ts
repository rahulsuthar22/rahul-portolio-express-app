export interface CreateIndustryInput {
  name: string;
  slug: string;
  displayOrder?: number;
}

export interface UpdateIndustryInput {
  name?: string;
  slug?: string;
  displayOrder?: number;
}