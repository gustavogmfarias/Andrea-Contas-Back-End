import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateLojistaUseCase } from "@modules/accounts/useCases/authenticateLojista/AuthenticateLojistaUseCase";

class AuthenticateLojistaController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { password, email } = request.body;

        const authenticateLojistaUseCase = container.resolve(
            AuthenticateLojistaUseCase
        );

        const token = await authenticateLojistaUseCase.execute({
            password,
            email,
        });

        return response.json(token);
    }
}

export { AuthenticateLojistaController };
