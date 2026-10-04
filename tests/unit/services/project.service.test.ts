import { beforeEach, describe, expect, it, vi } from "vitest";


import {
    getProjectById,
    createNewProject,
    updateExistingProject,
    deleteExistingProject,
    addSkillToProject,
    removeSkillFromProject,
} from "../../../src/modules/project/project.service.js";

import * as projectRepository from "../../../src/modules/project/project.repository.js";
import * as organisationRepository from "../../../src/modules/organisation/organisation.repository.js";
import * as skillRepository from "../../../src/modules/skill/skill.repository.js";


vi.mock("../../../src/modules/project/project.repository.js");
vi.mock("../../../src/modules/organisation/organisation.repository.js");
vi.mock("../../../src/modules/skill/skill.repository.js");

describe("Project Service", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe("getProjectById", () => {
        it("should return a project when it exists", async () => {
            const project = {
                id: "project-id",
                name: "Portfolio API",
            };

            vi.mocked(projectRepository.findProjectById).mockResolvedValue(
                project as never,
            );

            const result = await getProjectById("project-id");

            expect(result).toEqual(project);

            expect(
                projectRepository.findProjectById,
            ).toHaveBeenCalledWith("project-id");
        });

        it("should throw PROJECT_NOT_FOUND when project does not exist", async () => {
            vi.mocked(projectRepository.findProjectById).mockResolvedValue(
                null,
            );

            await expect(
                getProjectById("project-id"),
            ).rejects.toMatchObject({
                statusCode: 404,
                code: "PROJECT_NOT_FOUND",
            });
        });
    });

    describe("deleteExistingProject", () => {
        it("should delete an existing project", async () => {
            const project = {
                id: "project-id",
                name: "Portfolio API",
            };

            vi.mocked(projectRepository.findProjectById).mockResolvedValue(
                project as never,
            );

            vi.mocked(projectRepository.deleteProject).mockResolvedValue(
                undefined as never,
            );

            await deleteExistingProject("project-id");

            expect(
                projectRepository.findProjectById,
            ).toHaveBeenCalledWith("project-id");

            expect(
                projectRepository.deleteProject,
            ).toHaveBeenCalledWith("project-id");
        });

        it("should not delete a project that does not exist", async () => {
            vi.mocked(projectRepository.findProjectById).mockResolvedValue(
                null,
            );

            await expect(
                deleteExistingProject("project-id"),
            ).rejects.toMatchObject({
                statusCode: 404,
                code: "PROJECT_NOT_FOUND",
            });

            expect(
                projectRepository.deleteProject,
            ).not.toHaveBeenCalled();
        });
    });
});