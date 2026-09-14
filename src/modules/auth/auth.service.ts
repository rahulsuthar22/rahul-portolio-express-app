import { UnauthorizedError } from "../../errors/index.js";
import {
  createAccessToken
} from "../../utils/jwt.js";
import {
  verifyPassword
} from "../../utils/password.js";

import * as authRepository
  from "./auth.repository.js";

import type {
  LoginInput,
  LoginResult
} from "./auth.types.js";

export async function login(
  input: LoginInput
): Promise<LoginResult> {
  const admin =
    await authRepository.findAdminByEmail(
      input.email
    );

  if (!admin) {
    throw new UnauthorizedError(
      "Invalid email or password"
    );
  }

  const passwordValid =
    await verifyPassword(
      input.password,
      admin.passwordHash
    );

  if (!passwordValid) {
    throw new UnauthorizedError(
      "Invalid email or password"
    );
  }

  const accessToken =
    await createAccessToken({
      sub: admin.id,
      email: admin.email,
      role: admin.role
    });

  return {
    user: {
      id: admin.id,
      email: admin.email,
      role: admin.role
    },

    accessToken
  };
}