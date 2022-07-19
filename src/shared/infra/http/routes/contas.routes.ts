import { Router } from "express";
import { CreateContasController } from "@modules/contas/useCases/CreateContasController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const contasRoutes = Router();

const createContasController = new CreateContasController();

contasRoutes.post("/", ensureAuthenticated, createContasController.handle);

export { contasRoutes };
