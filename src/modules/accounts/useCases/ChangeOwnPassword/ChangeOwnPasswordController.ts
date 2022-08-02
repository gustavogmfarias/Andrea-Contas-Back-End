import { Request, Response } from "express";
import { container } from "tsyringe";
import { ChangeOwnPasswordUseCase } from "./ChangeOwnPasswordUseCase";

class ChangeOwnPasswordController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.lojista;

        const { senha, senhaAntiga, confirmaSenha } = request.body;

        const changeOwnPasswordUseCase = container.resolve(
            ChangeOwnPasswordUseCase
        );

        const lojistaAlterado = await changeOwnPasswordUseCase.execute({
            senha,
            senhaAntiga,
            confirmaSenha,
            id,
            editadoEm: new Date(),
        });

        return response.status(200).send(lojistaAlterado);
    }
}

export { ChangeOwnPasswordController };
