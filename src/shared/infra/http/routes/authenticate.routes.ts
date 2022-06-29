import { Router } from "express";
import { AuthenticateLojistaController } from "@modules/accounts/useCases/authenticateLojista/AuthenticateLojistaController";
import { RefreshTokenController } from "@modules/accounts/useCases/refreshToken/RefreshTokenController";

const authenticateRoutes = Router();

const authenticateLojistaController = new AuthenticateLojistaController();
const refreshTokenController = new RefreshTokenController();

authenticateRoutes.post("/sessions", authenticateLojistaController.handle);
authenticateRoutes.post("/refresh-token", refreshTokenController.handle);

export { authenticateRoutes };
