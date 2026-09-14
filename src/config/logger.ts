import pino from "pino";

import env from "./env";

const logger = pino({
    level: env.nodeEnv === "production" ? "info" : "debug",

    redact: {
        paths: [
            "req.headers.authorization",
            "req.headers.cookie",
            "password",
            "passwordHash",
            "token",
            "accessToken",
            "refreshToken"
        ],
        remove: true
    },

});

export default logger;