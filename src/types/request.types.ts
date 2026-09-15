import type { Request } from "express";

export type IdParams = {
    id: string;
};

export type ProjectSkillParams = {
    id: string;
    skillId: string;
}

export type IdRequest = Request<IdParams>;
export type ProjectSkillRequest = Request<ProjectSkillParams>;