import { Router } from "express";
import { CreateClienteController } from "@modules/clientes/useCases/createCliente/CreateClienteController";
import multer from "multer";
import uploadConfig from "@config/upload";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const clientesRoutes = Router();
const uploadAvatar = multer(uploadConfig);

const createClienteController = new CreateClienteController();
clientesRoutes.post("/", ensureAuthenticated, createClienteController.handle);

export { clientesRoutes };
