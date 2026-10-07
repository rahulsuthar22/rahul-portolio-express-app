import pino from "pino";

import env from "./env.js";

const isDev = env.nodeEnv !== "production";

const logger = pino({
  level: isDev ? "debug" : "info",

  redact: {
    paths: [
      "req.headers.authorization",
      "req.headers.cookie",
      "password",
      "passwordHash",
      "token",
      "accessToken",
      "refreshToken",
    ],
    remove: true,
  },

  ...(isDev
    ? {
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:HH:MM:ss.l",
            ignore: "pid,hostname",
          },
        },
      }
    : {}),
});

export default logger;