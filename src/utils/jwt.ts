import { jwtVerify, SignJWT } from "jose";
import env from "../config/env";

const secret = new TextEncoder().encode(env.authJwtSecret);

export interface AccessTokenPayload {
    sub: string;
    email: string;
    role: string;
}

export async function createAccessToken(
    payload: AccessTokenPayload
): Promise<string>{
    return new SignJWT({
        email: payload.email,
        role: payload.role
    })
    .setProtectedHeader({
        alg: "HS256",
        typ: "JWT"
    })
    .setSubject(payload.sub)
    .setIssuer(env.authJwtIssuer)
    .setAudience(env.authJwtAudience)
    .setIssuedAt()
    .setExpirationTime(
        env.authAccessTokenTtl
    )
    .sign(secret)
}

export async function verifyAccessToken(token: string){
    return jwtVerify(token, secret, {
        issuer: env.authJwtIssuer,
        audience: env.authJwtAudience
    })
}