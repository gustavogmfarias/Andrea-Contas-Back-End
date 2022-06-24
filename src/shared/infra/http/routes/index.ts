import { Router } from "express";
import { authenticateRoutes } from "./authenticate.routes";
import { lojistasRoutes } from "./lojistas.routes";

const router = Router();
router.use("/lojistas", lojistasRoutes);
router.use(authenticateRoutes);

export { router };
