import type { NextFunction, Request, Response } from "express";

import type { ZodType } from "zod";

export const validate = (
    schema:ZodType,
    target: "body" | "query" | "params" = "body"
) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        const result = schema.safeParse(req[target]);

        if(!result.success){
            next(result.error);
            return;
        }

        req[target] = result.data;

        next();
    }
}