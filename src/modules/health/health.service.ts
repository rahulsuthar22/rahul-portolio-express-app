import { db } from "../../config/db.js";

export interface ReadinessResult {
    status: "ok" | "error";
    dependencies: {
        database: "ok" | "error";
    };
}

export const checkReadiness =
    async (): Promise<ReadinessResult> => {
        try {
            await db.orm.public.Profile.first();

            return {
                status: "ok",
                dependencies: {
                    database: "ok",
                },
            };
        } catch {
            return {
                status: "error",
                dependencies: {
                    database: "error",
                },
            };
        }
    };