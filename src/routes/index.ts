import { Router } from "express";

import profileRouter from "../modules/profile/profile.routes.js"
import healthRouter from "../modules/health/health.routes.js"
import authRoutes from "../modules/auth/auth.routes.js";
import experienceRoutes from "../modules/experience/experience.routes.js";
import organisationRoutes from "../modules/organisation/organisation.routes.js";
import educationRoutes from "../modules/education/education.routes.js";
import skillRoutes from "../modules/skill/skill.routes.js";
import categoryRoutes from "../modules/category/category.routes.js";
import industryRoutes from "../modules/industry/industry.routes.js";
import projectRoutes from "../modules/project/project.routes.js";
import socialLinkRoutes from "../modules/social-link/social-link.routes.js";
import contactRoutes from "../modules/contact/contact.routes.js";

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

