import type { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { AppError } from "../errors/app-error.js";
import logger from "../config/logger.js";


const isPrismaKnownError = (
    err: unknown
): err is { code: string } => {
    return (
        typeof err === "object" &&
        err !== null &&
        "code" in err &&
        typeof err.code === "string"
    );
};


export const errorMiddleware: ErrorRequestHandler = (
    err, req, res, _next
) => {


    logger.error(
        {
            err,
            requestId: req.id,
            method: req.method,
            url: req.originalUrl,
        },
        "Request failed"
    );

    /**
     * Zod validations errors
     */
    if (err instanceof ZodError) {
        res.status(400).json({
            success: false,
            error: {
                code: "VALIDATION_ERROR",
                message: "Request validation failed",
                details: err.issues.map((issue) => ({
                    field: issue.path.join("."),
                    message: issue.message
                })),
            },
        });

        return;
    }

    /**
     * Application errors
     */
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            success: false,
            error: {
                code: err.code,
                message: err.message
            }
        });

        return;
    }

    /**
     * Prisma known errors
     */
    if (isPrismaKnownError(err)) {
        if (err.code === "P2002") {
            res.status(409).json({
                success: false,
                error: {
                    code: "DUPLICATE_RESOURCE",
                    message: "A resource with this value already exists"
                }
            })
            return;
        }

        if (err.code === "P2025") {
            res.status(404).json({
                success: false,
                error: {
                    code: "RESOURCE_NOT_FOUND",
                    message: "The requested resource not found"
                }
            });

            return;
        }
    }

    /**
     * Unknown/unexpected errors
     */
    const statusCode = typeof err.statusCode === "number" ? err.statusCode : 500;

    res.status(statusCode).json({
        success: false,
        error: {
            code: typeof err.code === "string" ? err.code : "INTERNAL_SERVER_ERROR",
            message: statusCode === 500 ? "An unexpected error occured" : err.message
        },
    });
};