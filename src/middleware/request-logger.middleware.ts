import pinoHttp from "pino-http";
import crypto from "node:crypto"

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
});