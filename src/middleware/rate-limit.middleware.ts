import rateLimit from "express-rate-limit";

export const globalRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: "draft-8",
    legacyHeaders: false,

    message: {
        success: false,
        error: {
            code: "RATE_LIMIT_EXCEEDED",
            message: "Too many requests. Please try again later"
        },
    },
});

export const loginRateLimiter =
    rateLimit({
        windowMs: 15 * 60 * 1000,
        limit: 10,
        standardHeaders: "draft-8",
        legacyHeaders: false,

        message: {
            success: false,
            error: {
                code: "LOGIN_RATE_LIMIT_EXCEEDED",
                message:
                    "Too many login attempts. Please try again later."
            }
        }
    });