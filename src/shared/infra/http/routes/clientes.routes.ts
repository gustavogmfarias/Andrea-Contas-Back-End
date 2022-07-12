import { Router } from "express";
import { CreateClienteController } from "@modules/clientes/useCases/createCliente/CreateClienteController";
import multer from "multer";
import uploadConfig from "@config/upload";

import { DeleteClienteController } from "@modules/clientes/useCases/deleteCliente/DeleteClienteController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const clientesRoutes = Router();
const uploadAvatar = multer(uploadConfig);

const createClienteController = new CreateClienteController();
const deleteClienteController = new DeleteClienteController();
clientesRoutes.post("/", ensureAuthenticated, createClienteController.handle);
clientesRoutes.delete(
    "/:cpf",
    ensureAuthenticated,
    deleteClienteController.handle
);

export { clientesRoutes };
