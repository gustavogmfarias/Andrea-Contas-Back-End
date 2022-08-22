import { Router } from "express";
import { CreateContasController } from "@modules/contas/useCases/CreateContasUseCase/CreateContasController";
import { RealizarPagamentoController } from "@modules/contas/useCases/RealizarPagamentoUseCase/RealizarPagamentoController";
import { ListContasController } from "@modules/contas/useCases/ListContasUseCase/ListContasController";
import { FindContaByIdController } from "@modules/contas/useCases/FindContaByIdUseCase/FindContaByIdController";
import { InativarContaController } from "@modules/contas/useCases/InativarContaUseCase/InativarContaController";
import { GetTotalAReceberController } from "@modules/contas/useCases/GetTotalAReceber/GetTotalAReceberController";
import { GetTotalParcelasAReceberController } from "@modules/contas/useCases/GetTotalParcelasAReceber/GetTotalParcelasAReceberController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const contasRoutes = Router();

const createContasController = new CreateContasController();
const realizarPagamentoController = new RealizarPagamentoController();
const listContasController = new ListContasController();
const getTotalParcelasAReceberController =
    new GetTotalParcelasAReceberController();
const getTotalAReceberController = new GetTotalAReceberController();
const findContaByIdController = new FindContaByIdController();
const inativarContaController = new InativarContaController();

contasRoutes.post("/", ensureAuthenticated, createContasController.handle);
contasRoutes.get("/", ensureAuthenticated, listContasController.handle);
contasRoutes.get(
    "/gettotalareceber",
    ensureAuthenticated,
    getTotalAReceberController.handle
);
contasRoutes.get(
    "/gettotalparcelasareceber",
    ensureAuthenticated,
    getTotalParcelasAReceberController.handle
);
contasRoutes.get(
    "/findbyid/:id",
    ensureAuthenticated,
    findContaByIdController.handle
);
contasRoutes.post(
    "/realizarPagamento/:idConta",
    ensureAuthenticated,
    realizarPagamentoController.handle
);
contasRoutes.patch(
    "/inativarConta/:idConta",
    ensureAuthenticated,
    inativarContaController.handle
);

export { contasRoutes };
