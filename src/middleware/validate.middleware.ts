import type {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";

import type { ZodType } from "zod";

type ValidationSource = "body" | "query" | "params";


export function validate<T>(
  schema: ZodType<T>,
  target: ValidationSource = "body",
): RequestHandler{
  return (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      next(result.error);
      return;
    }

    Object.defineProperty(req, target, {
      value: result.data,
      writable: true,
      enumerable: true,
      configurable: true
    });
    res.locals[target] = result.data;
    next();
  };
};