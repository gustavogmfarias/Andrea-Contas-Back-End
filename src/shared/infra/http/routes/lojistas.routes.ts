import { Router } from "express";
import { CreateLojistaController } from "@modules/accounts/useCases/createLojista/CreateLojistaController";
import multer from "multer";
import uploadConfig from "@config/upload";
import { ListLojistasController } from "@modules/accounts/useCases/ListLojistas/ListLojistasController";
import { DeleteLojistaController } from "@modules/accounts/useCases/deleteLojista/DeleteLojistaController";
import { UpdateLojistaController } from "@modules/accounts/useCases/updateLojista/UpdateLojistaController";
import { ChangeOwnPasswordController } from "@modules/accounts/useCases/ChangeOwnPassword/ChangeOwnPasswordController";
import { FindByLojistaIdController } from "@modules/accounts/useCases/findById/FindByLojistaIdController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const lojistasRoutes = Router();
const uploadAvatar = multer(uploadConfig);

const createLojistaController = new CreateLojistaController();
const listLojistasController = new ListLojistasController();
const deleteLojistaController = new DeleteLojistaController();
const updateLojistaController = new UpdateLojistaController();
const findByLojistaIdController = new FindByLojistaIdController();
const changeOwnPasswordController = new ChangeOwnPasswordController();

lojistasRoutes.post("/", ensureAuthenticated, createLojistaController.handle);

lojistasRoutes.patch(
    "/change-password",
    ensureAuthenticated,
    changeOwnPasswordController.handle
);

lojistasRoutes.get("/", ensureAuthenticated, listLojistasController.handle);

lojistasRoutes.get(
    "/findbyid/:id",
    ensureAuthenticated,
    findByLojistaIdController.handle
);

lojistasRoutes.delete(
    "/delete/:id",
    ensureAuthenticated,
    deleteLojistaController.handle
);

lojistasRoutes.patch(
    "/update/:id",
    ensureAuthenticated,
    updateLojistaController.handle
);

export { lojistasRoutes };
