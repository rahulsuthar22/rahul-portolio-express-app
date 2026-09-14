import "dotenv/config";
import {z} from "zod";


const envSchema = z.object({
  nodeEnv: z
    .enum(["development", "test", "production"])
    .default("development"),

  port: z.coerce
    .number()
    .int()
    .positive()
    .default(8000),

  databaseUrl: z
    .string()
    .min(1),

  corsOrigin: z
    .string()
    .min(1),

  authJwtSecret: z
    .string()
    .min(32),

  authJwtIssuer: z
    .string()
    .min(1)
    .default("portfolio-api"),

  authJwtAudience: z
    .string()
    .min(1)
    .default("portfolio-client"),

  authAccessTokenTtl: z
    .string()
    .default("15m")
});

const parsedEnv = envSchema.safeParse({
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT,
    corsOrigin: process.env.CORS_ORIGIN,
    databaseUrl: process.env.DATABASE_URL ,
    authJwtSecret: process.env.AUTH_JWT_SECRET,
    authJwtIssuer: process.env.AUTH_JWT_ISSUER,
    authJwtAudience: process.env.AUTH_JWT_AUDIENCE ,
    authAccessTokenTtl: process.env.AUTH_ACCESS_TOKEN_TTL
})

if(!parsedEnv.success){
    console.error(
        "Invalid environment configuration",
        parsedEnv.error.flatten().fieldErrors
    )

    process.exit(1);
}

const env = parsedEnv.data;



export default env;