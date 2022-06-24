import { Router } from "express";
import { CreateUserController } from "@modules/accounts/useCases/createLojista/CreateUserController";
import multer from "multer";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import uploadConfig from "@config/upload";
import { ProfileUserController } from "@modules/accounts/useCases/profileUserUseCase/ProfileUserController";
import { ListUsersController } from "@modules/accounts/useCases/ListUsers/ListUsersController";
import { DeleteUserController } from "@modules/accounts/useCases/deleteUser/DeleteUserController";
import { UpdateUserController } from "@modules/accounts/useCases/updateUser/UpdateUserController";
import { ChangeOwnPasswordController } from "@modules/accounts/useCases/ChangeOwnPassword/ChangeOwnPasswordController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const profileUserController = new ProfileUserController();

const lojistasRoutes = Router();
const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const listUsersController = new ListUsersController();
const deleteUserController = new DeleteUserController();
const updateUserController = new UpdateUserController();
const changeOwnPasswordController = new ChangeOwnPasswordController();

lojistasRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    createUserController.handle
);

lojistasRoutes.patch(
    "/avatar",
    ensureAuthenticated,
    uploadAvatar.single("avatar"),
    updateUserAvatarController.handle
);

lojistasRoutes.patch(
    "/change-password",
    ensureAuthenticated,
    changeOwnPasswordController.handle
);

lojistasRoutes.get(
    "/profile",
    ensureAuthenticated,
    profileUserController.handle
);

lojistasRoutes.get(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    listUsersController.handle
);

lojistasRoutes.delete(
    "/delete/:id",
    ensureAuthenticated,
    ensureAdmin,
    deleteUserController.handle
);

lojistasRoutes.patch(
    "/update/:id",
    ensureAuthenticated,
    ensureAdmin,
    updateUserController.handle
);

export { lojistasRoutes };
