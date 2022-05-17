import { Router } from "express";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import multer from "multer";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import uploadConfig from "@config/upload";
import { ProfileUserController } from "@modules/accounts/useCases/profileUserUseCase/ProfileUserController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const profileUserController = new ProfileUserController();

const usersRoutes = Router();
const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

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

usersRoutes.get("/profile", ensureAuthenticated, profileUserController.handle);

export { usersRoutes };
