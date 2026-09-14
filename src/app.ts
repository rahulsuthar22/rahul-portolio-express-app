import express from "express";
import cors from "cors";
import helmet from "helmet";

import env from "./config/env.js";
import apiRouter from "./routes/index.js";
import {notFoundMiddleware} from "./middleware/not-found.middlerware.js";
import {errorMiddleware} from "./middleware/error.middlerware.js";
import { requestLogger } from "./middleware/request-logger.middleware.js";
import { globalRateLimiter } from "./middleware/rate-limit.middleware.js";


const app = express();

/**
 * Logger
 */

app.use(requestLogger)


/**
 * Rate Limiter
 */

app.use(globalRateLimiter)

/**
 * Security middleware
 */
app.use(helmet());

// app.use(
//     cors({
//         origin: env.corsOrigin,
//         credentials: true,
//     })
// );

/**
 * Request body parsing
 */
app.use(
    express.json({
        limit: "1mb",
    })
);

app.use(
    express.urlencoded({
        extended: true,
        limit: "1mb",
    })
);

/**
 * API routes
 */

app.use("/api/v1", apiRouter);

/**
 * 404 handler
 */

app.use(notFoundMiddleware);

/**
 * Global error handler
 */

app.use(errorMiddleware);

export default app;