import { Router } from "express";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
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

const usersRoutes = Router();
const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const listUsersController = new ListUsersController();
const deleteUserController = new DeleteUserController();
const updateUserController = new UpdateUserController();
const changeOwnPasswordController = new ChangeOwnPasswordController();

usersRoutes.post(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    createUserController.handle
);

usersRoutes.patch(
    "/avatar",
    ensureAuthenticated,
    uploadAvatar.single("avatar"),
    updateUserAvatarController.handle
);

usersRoutes.patch(
    "/change-password",
    ensureAuthenticated,
    changeOwnPasswordController.handle
);

usersRoutes.get("/profile", ensureAuthenticated, profileUserController.handle);
usersRoutes.get(
    "/",
    ensureAuthenticated,
    ensureAdmin,
    listUsersController.handle
);

usersRoutes.delete(
    "/delete/:id",
    ensureAuthenticated,
    ensureAdmin,
    deleteUserController.handle
);

usersRoutes.patch(
    "/update/:id",
    ensureAuthenticated,
    ensureAdmin,
    updateUserController.handle
);

export { usersRoutes };
