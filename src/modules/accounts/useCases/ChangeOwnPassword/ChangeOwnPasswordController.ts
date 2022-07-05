import { Request, Response } from "express";
import { container } from "tsyringe";
import { ChangeOwnPasswordUseCase } from "./ChangeOwnPasswordUseCase";

class ChangeOwnPasswordController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.lojista;

        const { senha, senha_antiga, confirma_senha } = request.body;

        const changeOwnPasswordUseCase = container.resolve(
            ChangeOwnPasswordUseCase
        );

        await changeOwnPasswordUseCase.execute({
            senha,
            senha_antiga,
            confirma_senha,
            id,
        });

        return response.status(200).json();
    }
}

export { ChangeOwnPasswordController };
