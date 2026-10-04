import { Router } from "express";
import swaggerUi from "swagger-ui-express";

import { openapiDocument } from "./openapi.js";

const router = Router();

router.get("/openapi.json", (_req, res) => {
  res.json(openapiDocument);
});

router.use(
  "/",
  swaggerUi.serve,
  swaggerUi.setup(openapiDocument),
);


export default router;