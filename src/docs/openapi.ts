import {
  OpenApiGeneratorV31,
} from "@asteasolutions/zod-to-openapi";

import { openapiRegistry } from "./openapi.registry.js";

import "../modules/profile/profile.openapi.js";
import "../modules/auth/auth.openapi.js";
import "../modules/experience/experience.openapi.js";
import "../modules/organisation/organisation.openapi.js";

const generator = new OpenApiGeneratorV31(
  openapiRegistry.definitions
);

export const openapiDocument = generator.generateDocument({
  openapi: "3.1.0",

  info: {
    title: "Portfolio API",
    version: "1.0.0",
    description:
      "Production-grade REST API for the portfolio and administration platform.",
  },

  servers: [
    {
      url: "/api/v1",
      description: "API v1",
    },
  ],

  tags: [
    {
      name: "Health",
      description: "API health endpoints",
    },
    {
      name: "Auth",
      description: "Authentication and authorization",
    },
    {
      name: "Profile",
      description: "Portfolio profile management",
    },
    {
      name: "Experience",
      description: "Portfolio Experience management",
    },
  ],
});