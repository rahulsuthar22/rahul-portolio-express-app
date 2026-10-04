import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ConflictError, NotFoundError } from '../../../src/errors/index.js'

import * as profileRepository from '../../../src/modules/profile/profile.repository.js'

import {
    createNewProfile,
    getProfile,
    updateExistingProfile,
} from "../../../src/modules/profile/profile.service.js";

import type {
    CreateProfileInput,
    UpdateProfileInput,
} from "../../../src/modules/profile/profile.types.js";

vi.mock(
    "../../../src/modules/profile/profile.repository.js",
    () => ({
        findProfile: vi.fn(),
        findProfileByEmail: vi.fn(),
        findProfileById: vi.fn(),
        createProfile: vi.fn(),
        updateProfile: vi.fn(),

    })
);

describe("Profile Service", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    })

    describe("getProfile", () => {
        it("should return the profile from the repository", async () => {
            const profile = {
                id: "profile-1",
                email: "rahul@exmaple.com"
            }

            vi.mocked(profileRepository.findProfile)
                .mockResolvedValue(profile as never);

            const result = await getProfile();

            expect(
                profileRepository.findProfile
            ).toHaveBeenCalledTimes(1);

            expect(result).toEqual(profile);
        });
    });

    describe("createNewProfile", () => {
        const input = {
            email: "rahul@example.com",
        } as CreateProfileInput;

        it("should create a profile when no profile exists with the email", async () => {
            const createdProfile = {
                id: "profile-1",
                email: input.email,
            };

            vi.mocked(profileRepository.findProfileByEmail)
                .mockResolvedValue(null);

            vi.mocked(profileRepository.createProfile)
                .mockResolvedValue(createdProfile as never);

            const result = await createNewProfile(input);

            expect(
                profileRepository.findProfileByEmail,
            ).toHaveBeenCalledTimes(1);

            expect(
                profileRepository.findProfileByEmail,
            ).toHaveBeenCalledWith(input.email);

            expect(
                profileRepository.createProfile,
            ).toHaveBeenCalledTimes(1);

            expect(
                profileRepository.createProfile,
            ).toHaveBeenCalledWith(input);

            expect(result).toEqual(createdProfile);
        });

        it("should throw ConflictError when a profile already exists", async () => {
            const existingProfile = {
                id: "profile-1",
                email: input.email,
            };

            vi.mocked(profileRepository.findProfileByEmail)
                .mockResolvedValue(existingProfile as never);

            await expect(
                createNewProfile(input),
            ).rejects.toBeInstanceOf(ConflictError);

            expect(
                profileRepository.findProfileByEmail,
            ).toHaveBeenCalledWith(input.email);

            expect(
                profileRepository.createProfile,
            ).not.toHaveBeenCalled();
        });
    });

    describe("updateExistingProfile", () => {
        const id = "profile-1";

        const input = {
            email: "updated@example.com",
        } as UpdateProfileInput;

        const existingProfile = {
            id,
            email: "rahul@example.com",
        };

        it("should throw NotFoundError when the profile does not exist", async () => {
            vi.mocked(profileRepository.findProfileById)
                .mockResolvedValue(null);

            await expect(
                updateExistingProfile(id, input),
            ).rejects.toBeInstanceOf(NotFoundError);

            expect(
                profileRepository.findProfileById,
            ).toHaveBeenCalledWith(id);

            expect(
                profileRepository.updateProfile,
            ).not.toHaveBeenCalled();
        });

        it("should throw NotFoundError when the update returns no profile", async () => {
            vi.mocked(profileRepository.findProfileById)
                .mockResolvedValue(existingProfile as never);

            vi.mocked(profileRepository.updateProfile)
                .mockResolvedValue(null);

            await expect(
                updateExistingProfile(id, input),
            ).rejects.toBeInstanceOf(NotFoundError);

            expect(
                profileRepository.findProfileById,
            ).toHaveBeenCalledWith(id);

            expect(
                profileRepository.updateProfile,
            ).toHaveBeenCalledWith(id, input);
        });

        it("should return the updated profile", async () => {
            const updatedProfile = {
                id,
                email: input.email,
            };

            vi.mocked(profileRepository.findProfileById)
                .mockResolvedValue(existingProfile as never);

            vi.mocked(profileRepository.updateProfile)
                .mockResolvedValue(updatedProfile as never);

            const result = await updateExistingProfile(
                id,
                input,
            );

            expect(
                profileRepository.findProfileById,
            ).toHaveBeenCalledWith(id);

            expect(
                profileRepository.updateProfile,
            ).toHaveBeenCalledWith(id, input);

            expect(result).toEqual(updatedProfile);
        });
    });

})