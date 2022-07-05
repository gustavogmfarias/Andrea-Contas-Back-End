import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateLojistaUseCase } from "./UpdateLojistaUseCase";

class UpdateLojistaController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const { username, senha, confirma_senha, nome } = request.body;

        const updateLojistaUseCase = container.resolve(UpdateLojistaUseCase);

        await updateLojistaUseCase.execute({
            username,
            nome,
            senha,
            confirma_senha,
            id,
        });

        return response.status(200).json();
    }
}

export { UpdateLojistaController };
