import { openapiRegistry } from "../../docs/openapi.registry.js";
import { z } from "../../docs/zod-openapi.js";

import {
    createExperienceSchema,
    updateExperienceSchema,
} from "./experience.schema.js";


openapiRegistry.register(
  "CreateExperienceRequest",
  createExperienceSchema
);

openapiRegistry.register(
  "UpdateExperienceRequest",
  updateExperienceSchema
);


openapiRegistry.registerPath({
  method: "get",
  path: "/experience",

  tags: ["Experience"],

  summary: "Get experience",

  operationId: "getExperience",

  responses: {
    200: {
      description: "Experiences retrieved successfully",
    },
  },
});

openapiRegistry.registerPath({
  method: "post",
  path: "/experience",

  tags: ["Experience"],

  summary: "Create Experience",

  operationId: "createExperience",

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
          schema: createExperienceSchema,
        },
      },
    },
  },

  responses: {
    201: {
      description: "Experience created successfully",
    },

    409: {
      description: "Experience already exists",
    },

    422: {
      description: "Validation error",
    },
  },
});

openapiRegistry.registerPath({
  method: "patch",
  path: "/experience/{id}",

  tags: ["Experience"],

  summary: "Update Experience",

  operationId: "updateExperience",

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
          schema: updateExperienceSchema,
        },
      },
    },
  },

  responses: {
    200: {
      description: "Experience updated successfully",
    },

    404: {
      description: "Experience not found",
    },

    422: {
      description: "Validation error",
    },
  },
});