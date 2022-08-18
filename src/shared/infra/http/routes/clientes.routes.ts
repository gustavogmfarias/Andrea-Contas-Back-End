import { Router } from "express";
import { CreateClienteController } from "@modules/clientes/useCases/createCliente/CreateClienteController";
import multer from "multer";
import uploadConfig from "@config/upload";

import { DeleteClienteController } from "@modules/clientes/useCases/deleteCliente/DeleteClienteController";
import { ListClientesController } from "@modules/clientes/useCases/ListClientes/ListClientesController";
import { UpdateClienteController } from "@modules/clientes/useCases/updateCliente/UpdateClienteController";
import { FindByNameClientesController } from "@modules/clientes/useCases/findByName/FindByNameClientesController";
import { UpdateClienteAvatarController } from "@modules/clientes/useCases/updateClienteAvatar/UpdateClienteAvatarController";
import { FindClienteByIdController } from "@modules/clientes/useCases/findById/FindClienteByIdController";
import { FindClienteByCpfController } from "@modules/clientes/useCases/findByCpf/FindClienteByCpfController";
import { GetTotalClientesController } from "@modules/clientes/useCases/GetTotalClientes/GetTotalClientesController";
import { GetTotalClientesAdimplentesController } from "@modules/clientes/useCases/GetTotalClientesAdimplentes/GetTotalClientesAdimplentesController";
import { GetTotalClientesInadimplentesController } from "@modules/clientes/useCases/GetTotalClientesInadimplentes/GetTotalClientesInadimplentesController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const clientesRoutes = Router();
const uploadAvatar = multer(uploadConfig);

const createClienteController = new CreateClienteController();
const deleteClienteController = new DeleteClienteController();
const listClientesController = new ListClientesController();
const findByNameClientesController = new FindByNameClientesController();
const updateClienteController = new UpdateClienteController();
const updateClienteAvatarController = new UpdateClienteAvatarController();
const findClienteByIdController = new FindClienteByIdController();
const findClienteByCpfController = new FindClienteByCpfController();
const getTotalClientesController = new GetTotalClientesController();
const getTotalClientesAdimplentesController =
    new GetTotalClientesAdimplentesController();
const getTotalClientesInadimplentesController =
    new GetTotalClientesInadimplentesController();

clientesRoutes.post("/", ensureAuthenticated, createClienteController.handle);
clientesRoutes.delete(
    "/:id",
    ensureAuthenticated,
    deleteClienteController.handle
);

clientesRoutes.patch(
    "/:id",
    ensureAuthenticated,
    updateClienteController.handle
);

clientesRoutes.get("/", ensureAuthenticated, listClientesController.handle);
clientesRoutes.get(
    "/gettotalclientes",
    ensureAuthenticated,
    getTotalClientesController.handle
);
clientesRoutes.get(
    "/gettotalclientesadimplentes",
    ensureAuthenticated,
    getTotalClientesAdimplentesController.handle
);

clientesRoutes.get(
    "/gettotalclientesinadimplentes",
    ensureAuthenticated,
    getTotalClientesInadimplentesController.handle
);
clientesRoutes.get(
    "/findbyname",
    ensureAuthenticated,
    findByNameClientesController.handle
);

clientesRoutes.get(
    "/findbyid/:id",
    ensureAuthenticated,
    findClienteByIdController.handle
);

clientesRoutes.get(
    "/findbycpf/:cpf",
    ensureAuthenticated,
    findClienteByCpfController.handle
);

clientesRoutes.get("/", ensureAuthenticated, listClientesController.handle);

clientesRoutes.patch(
    "/avatar/:id",
    ensureAuthenticated,
    uploadAvatar.single("avatar"),
    updateClienteAvatarController.handle
);

export { clientesRoutes };
