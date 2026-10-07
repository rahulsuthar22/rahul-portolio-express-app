export interface CreateProfileInput {
  photo?: string;
  name: string;
  role: string;
  email: string;
  description?: string;
  yearsOfExperience?: number;
  currentPosition?: string;
  currentOrgId?: string | null;
  aboutHeading?: string;
  aboutDescription?: string;
}

export interface UpdateProfileInput {
  photo?: string;
  name?: string;
  role?: string;
  email?: string;
  description?: string;
  yearsOfExperience?: number;
  currentPosition?: string;
  currentOrgId?: string | null;
  aboutHeading?: string;
  aboutDescription?: string;
}