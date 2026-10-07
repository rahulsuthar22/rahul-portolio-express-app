import { openapiRegistry } from "../../docs/openapi.registry.js";
import { z } from "../../docs/zod-openapi.js";

import {
  createOrganisationSchema,
  updateOrganisationSchema,
} from "./organisation.schema.js";

openapiRegistry.register(
  "CreateOrganisationRequest",
  createOrganisationSchema
);

openapiRegistry.register(
  "UpdateOrganisationRequest",
  updateOrganisationSchema
);

openapiRegistry.registerPath({
  method: "get",
  path: "/organisation",
  tags: ["Organisation"],
  summary: "Get organisations",
  operationId: "getOrganisations",
  responses: {
    200: {
      description:
        "Organisations retrieved successfully",
    },
  },
});

openapiRegistry.registerPath({
  method: "get",
  path: "/organisation/{id}",
  tags: ["Organisation"],
  summary: "Get organisation by ID",
  operationId: "getOrganisationById",
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
  },
  responses: {
    200: {
      description:
        "Organisation retrieved successfully",
    },
    404: {
      description:
        "Organisation not found",
    },
  },
});

openapiRegistry.registerPath({
  method: "post",
  path: "/organisation",
  tags: ["Organisation"],
  summary: "Create organisation",
  operationId: "createOrganisation",
  security: [{ cookieAuth: [] }],
  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: createOrganisationSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description:
        "Organisation created successfully",
    },
    409: {
      description:
        "Organisation already exists",
    },
    422: {
      description:
        "Validation error",
    },
  },
});

openapiRegistry.registerPath({
  method: "patch",
  path: "/organisation/{id}",
  tags: ["Organisation"],
  summary: "Update organisation",
  operationId: "updateOrganisation",
  security: [{ cookieAuth: [] }],
  request: {
    params: z.object({
      id: z.string().uuid(),
    }),
    body: {
      required: true,
      content: {
        "application/json": {
          schema: updateOrganisationSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description:
        "Organisation updated successfully",
    },
    404: {
      description:
        "Organisation not found",
    },
    422: {
      description:
        "Validation error",
    },
  },
});