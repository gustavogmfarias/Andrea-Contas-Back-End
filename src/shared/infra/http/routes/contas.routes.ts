import { Router } from "express";
import { CreateContasController } from "@modules/contas/useCases/CreateContasUseCase/CreateContasController";
import { RealizarPagamentoController } from "@modules/contas/useCases/RealizarPagamentoUseCase/RealizarPagamentoController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const contasRoutes = Router();

const createContasController = new CreateContasController();
const realizarPagamentoController = new RealizarPagamentoController();

contasRoutes.post("/", ensureAuthenticated, createContasController.handle);
contasRoutes.post(
    "/realizarPagamento/:idConta",
    ensureAuthenticated,
    realizarPagamentoController.handle
);

export { contasRoutes };
