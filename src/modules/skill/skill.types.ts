export interface CreateSkillInput {
  name: string;
  link?: string | null;
  icon?: string | null;
  displayOrder?: number;
}

export interface UpdateSkillInput {
  name?: string;
  link?: string | null;
  icon?: string | null;
  displayOrder?: number;
}