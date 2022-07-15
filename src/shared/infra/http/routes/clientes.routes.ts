import { Router } from "express";
import { CreateClienteController } from "@modules/clientes/useCases/createCliente/CreateClienteController";
import multer from "multer";
import uploadConfig from "@config/upload";

import { DeleteClienteController } from "@modules/clientes/useCases/deleteCliente/DeleteClienteController";
import { ListClientesController } from "@modules/clientes/useCases/ListClientes/ListClientesController";
import { UpdateClienteController } from "@modules/clientes/useCases/updateCliente/UpdateClienteController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const clientesRoutes = Router();
const uploadAvatar = multer(uploadConfig);

const createClienteController = new CreateClienteController();
const deleteClienteController = new DeleteClienteController();
const listClientesController = new ListClientesController();
const updateClienteController = new UpdateClienteController();
clientesRoutes.post("/", ensureAuthenticated, createClienteController.handle);
clientesRoutes.delete(
    "/:cpf",
    ensureAuthenticated,
    deleteClienteController.handle
);

clientesRoutes.patch(
    "/update/:cpf",
    ensureAuthenticated,
    updateClienteController.handle
);

clientesRoutes.get("/", ensureAuthenticated, listClientesController.handle);

export { clientesRoutes };
