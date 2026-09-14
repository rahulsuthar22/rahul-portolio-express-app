import { Router } from "express";

import profileRouter from "../modules/profile/profile.routes"
import healthRouter from "./health.routes.js"
import { db } from "../config/db.js";
import authRoutes from "../modules/auth/auth.routes";

const router = Router();

router.get("/", (_req, res)=>{
    res.status(200).json({
        success: true,
        data: {
            name: "Portfolio API",
            version: "v1",
            status: "running"
        }
    });
});

router.use("/profile", profileRouter)
router.use("/health", healthRouter)
router.use(
  "/auth",
  authRoutes
);


export default router;

