import { Request, Response } from "express";
import { container } from "tsyringe";
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

class RefreshTokenController {
    async handle(request: Request, response: Response): Promise<Response> {
        const refreshToken =
            request.body.refreshToken ||
            request.headers["x-access-token"] ||
            request.query.token;

        const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

        const token = await refreshTokenUseCase.execute(refreshToken);
        return response.status(200).send(token);
    }
}

export { RefreshTokenController };
