import { Router } from "express";
import { db } from "../config/db";

const router = Router();

router.get("/", async (_req, res) =>{
    await db.orm.public.Profile.first();
    res.status(200).json({
        success: true,
        data: {
            status: "ok",
            service: "portfolio-api",
            database: "connected",
            timestamp: new Date().toISOString()
        }
    });
});

export default router;