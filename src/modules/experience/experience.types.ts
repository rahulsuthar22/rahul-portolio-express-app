export type WorkMode = | "REMOTE" | "HYBRID" | "ONSITE"

export interface CreateExperienceInput {
    profileId: string;
    organisationId: string;
    position: string;
    startDate: Date;
    endDate?: Date | null;
    modeOfWork: WorkMode;
    description?: string;
    displayOrder?: number
    isCurrent?: boolean
}

export interface UpdateExperienceInput {
    organisationId?: string;
    position?: string;
    startDate?: Date;
    endDate?: Date | null;
    modeOfWork?: WorkMode;
    description?: string;
    displayOrder?: number
    isCurrent?: boolean
}