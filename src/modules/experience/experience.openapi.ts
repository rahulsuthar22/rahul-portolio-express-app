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
  summary: "Get experiences",
  operationId: "getExperiences",
  request: {
    query: z.object({
      profileId: z.string().uuid().optional(),
    }),
  },
  responses: {
    200: {
      description:
        "Experiences retrieved successfully",
    },
  },
});

openapiRegistry.registerPath({
  method: "get",
  path: "/experience/{id}",
  tags: ["Experience"],
  summary: "Get experience by ID",
  operationId: "getExperienceById",
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
  },
  responses: {
    200: {
      description:
        "Experience retrieved successfully",
    },
    404: {
      description:
        "Experience not found",
    },
  },
});

openapiRegistry.registerPath({
  method: "post",
  path: "/experience",
  tags: ["Experience"],
  summary: "Create experience",
  operationId: "createExperience",
  security: [{ cookieAuth: [] }],
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
      description:
        "Experience created successfully",
    },
    404: {
      description:
        "Profile or organisation not found",
    },
    422: {
      description:
        "Validation error",
    },
  },
});

openapiRegistry.registerPath({
  method: "patch",
  path: "/experience/{id}",
  tags: ["Experience"],
  summary: "Update experience",
  operationId: "updateExperience",
  security: [{ cookieAuth: [] }],
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
      description:
        "Experience updated successfully",
    },
    404: {
      description:
        "Experience or organisation not found",
    },
    422: {
      description:
        "Validation error",
    },
  },
});

openapiRegistry.registerPath({
  method: "delete",
  path: "/experience/{id}",
  tags: ["Experience"],
  summary: "Delete experience",
  operationId: "deleteExperience",
  security: [{ cookieAuth: [] }],
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
  },
  responses: {
    200: {
      description:
        "Experience deleted successfully",
    },
    404: {
      description:
        "Experience not found",
    },
  },
});