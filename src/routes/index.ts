import { Router } from "express";

import profileRouter from "../modules/profile/profile.routes"
import healthRouter from "./health.routes.js"
import { db } from "../config/db.js";
import authRoutes from "../modules/auth/auth.routes";
import experienceRoutes from "../modules/experience/experience.routes";
import organisationRoutes from "../modules/organisation/organisation.routes";
import educationRoutes from "../modules/education/education.routes";
import skillRoutes from "../modules/skill/skill.routes";
import categoryRoutes from "../modules/category/category.routes";
import industryRoutes from "../modules/industry/industry.routes";
import projectRoutes from "../modules/project/project.routes";
import socialLinkRoutes from "../modules/social-link/social-link.routes";
import contactRoutes from "../modules/contact/contact.routes";

const router = Router();

router.get("/", (_req, res) => {
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
router.use("/auth",  authRoutes);
router.use("/experience", experienceRoutes);
router.use("/organisatins", organisationRoutes);  
router.use("/educations", educationRoutes);  
router.use("/skills", skillRoutes);  
router.use("/categories", categoryRoutes);  
router.use("/industries", industryRoutes);  
router.use("/projects", projectRoutes);  
router.use("/social-links", socialLinkRoutes);  
router.use("/contact", contactRoutes);  

export default router;

