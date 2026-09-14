export interface CreateOrganisationInput {
    name: string;
    description?: string;
    website?: string;
}

export interface UpdateOrganisationInput {
    name?: string;
    description?: string;
    website?: string;
}

