import { openapiRegistry } from "../../docs/openapi.registry.js";
import { z } from "../../docs/zod-openapi.js";

import {
  createProfileSchema,
  updateProfileSchema,
} from "./profile.schema.js";


openapiRegistry.register(
  "CreateProfileRequest",
  createProfileSchema
);

openapiRegistry.register(
  "UpdateProfileRequest",
  updateProfileSchema
);


openapiRegistry.registerPath({
  method: "get",
  path: "/profile",

  tags: ["Profile"],

  summary: "Get profile",

  operationId: "getProfile",

  responses: {
    200: {
      description: "Profile retrieved successfully",
    },

    404: {
      description: "Profile not found",
    },
  },
});

openapiRegistry.registerPath({
  method: "post",
  path: "/profile",

  tags: ["Profile"],

  summary: "Create profile",

  operationId: "createProfile",

  security: [
    {
      cookieAuth: [],
    },
  ],

  request: {
    body: {
      required: true,

      content: {
        "application/json": {
          schema: createProfileSchema,
        },
      },
    },
  },

  responses: {
    201: {
      description: "Profile created successfully",
    },

    409: {
      description: "Profile already exists",
    },

    422: {
      description: "Validation error",
    },
  },
});

openapiRegistry.registerPath({
  method: "patch",
  path: "/profile/{id}",

  tags: ["Profile"],

  summary: "Update profile",

  operationId: "updateProfile",

  security: [
    {
      cookieAuth: [],
    },
  ],

  request: {
    params: z.object({
      id: z.string().uuid(),
    }),

    body: {
      required: true,

      content: {
        "application/json": {
          schema: updateProfileSchema,
        },
      },
    },
  },

  responses: {
    200: {
      description: "Profile updated successfully",
    },

    404: {
      description: "Profile not found",
    },

    422: {
      description: "Validation error",
    },
  },
});