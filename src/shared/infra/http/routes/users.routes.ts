import { Router } from "express";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import multer from "multer";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import uploadConfig from "@config/upload";

const usersRoutes = Router();
const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch(
    "/avatar",
    uploadAvatar.single("avatar"),
    UpdateUserAvatarController.handle
);

export { usersRoutes };
