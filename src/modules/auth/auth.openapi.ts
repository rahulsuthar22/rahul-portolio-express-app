import { openapiRegistry } from "../../docs/openapi.registry.js";
import { z } from "../../docs/zod-openapi.js";

import {
  loginSchema,
} from "./auth.schema.js";

openapiRegistry.register(
  "LoginRequest",
  loginSchema,
);

const authUserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  role: z.string(),
});

const loginResponseSchema = z.object({
  success: z.literal(true),

  data: z.object({
    user: authUserSchema,
  }),
});

const authUserResponseSchema = z.object({
  success: z.literal(true),

  data: z.object({
    user: authUserSchema,
  }),
});

const logoutResponseSchema = z.object({
  success: z.literal(true),

  data: z.null(),
});

openapiRegistry.register(
  "AuthUser",
  authUserSchema,
);

openapiRegistry.register(
  "LoginResponse",
  loginResponseSchema,
);

openapiRegistry.register(
  "AuthUserResponse",
  authUserResponseSchema,
);

openapiRegistry.register(
  "LogoutResponse",
  logoutResponseSchema,
);

openapiRegistry.registerPath({
  method: "post",

  path: "/auth/login",

  tags: ["Auth"],

  summary: "Admin Login",

  operationId: "login",

  request: {
    body: {
      required: true,

      content: {
        "application/json": {
          schema: loginSchema,
        },
      },
    },
  },

  responses: {
    200: {
      description: "Login successful",

      content: {
        "application/json": {
          schema: loginResponseSchema,
        },
      },
    },

    401: {
      description: "Invalid credentials",
    },

    422: {
      description: "Validation error",
    },
  },
});

openapiRegistry.registerPath({
  method: "get",

  path: "/auth/me",

  tags: ["Auth"],

  summary: "Get current authenticated user",

  operationId: "getCurrentUser",

  security: [
    {
      cookieAuth: [],
    },
  ],

  responses: {
    200: {
      description: "Authenticated user retrieved successfully",

      content: {
        "application/json": {
          schema: authUserResponseSchema,
        },
      },
    },

    401: {
      description: "Authentication required",
    },
  },
});

openapiRegistry.registerPath({
  method: "post",

  path: "/auth/logout",

  tags: ["Auth"],

  summary: "Admin Logout",

  operationId: "logout",

  security: [
    {
      cookieAuth: [],
    },
  ],

  responses: {
    200: {
      description: "Logout successful",

      content: {
        "application/json": {
          schema: logoutResponseSchema,
        },
      },
    },

    401: {
      description: "Authentication required",
    },
  },
});