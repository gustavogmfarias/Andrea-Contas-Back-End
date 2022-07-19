import { Router } from "express";
import { authenticateRoutes } from "./authenticate.routes";
import { clientesRoutes } from "./clientes.routes";
import { lojistasRoutes } from "./lojistas.routes";
import { contasRoutes } from "./contas.routes";

const router = Router();
router.use("/lojistas", lojistasRoutes);
router.use("/clientes", clientesRoutes);
router.use("/contas", contasRoutes);
router.use(authenticateRoutes);

export { router };
