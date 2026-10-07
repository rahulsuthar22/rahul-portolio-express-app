import pinoHttp from "pino-http";
import crypto from "node:crypto";

import logger from "../config/logger.js";

export const requestLogger = pinoHttp({
  logger,

  genReqId: (req) => {
    const existingRequestId = req.headers["x-request-id"];

    if (typeof existingRequestId === "string") {
      return existingRequestId;
    }

    return crypto.randomUUID();
  },

  serializers: {
    req: (req) => ({
      id: req.id,
      method: req.method,
      url: req.url,
    }),
    res: (res) => ({
      statusCode: res.statusCode,
    }),
  },

  customSuccessMessage: (req, res, responseTime) => {
    return `${req.method} ${req.url} ${res.statusCode} (${responseTime}ms)`;
  },

  customErrorMessage: (req, res, err) => {
    return `${req.method} ${req.url} ${res.statusCode} - ${err.message}`;
  },
});