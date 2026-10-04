import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { createProfileSchema, updateProfileSchema } from "../modules/profile/profile.schema";
import { z } from "./zod-openapi";

export const openapiRegistry = new OpenAPIRegistry();

/**
 * Register component
 */
openapiRegistry.registerComponent(
  "securitySchemes",
  "bearerAuth",
  {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
  },
);

openapiRegistry.registerComponent(
  "securitySchemes",
  "cookieAuth",
  {
    type: "apiKey",
    in: "cookie",
    name: "portfolio_access_token",
  },
);