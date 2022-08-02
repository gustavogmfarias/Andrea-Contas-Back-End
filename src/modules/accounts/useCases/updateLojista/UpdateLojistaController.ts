import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateLojistaUseCase } from "./UpdateLojistaUseCase";

class UpdateLojistaController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: lojistaId } = request.lojista;
        const { id } = request.params;

        const { username, senha, confirmaSenha, nome } = request.body;

        const updateLojistaUseCase = container.resolve(UpdateLojistaUseCase);

        const lojistaAtualizado = await updateLojistaUseCase.execute(
            lojistaId,
            {
                username,
                nome,
                senha,
                confirmaSenha,
                id,
                editadoEm: new Date(),
            }
        );

        return response.status(200).send(lojistaAtualizado);
    }
}

export { UpdateLojistaController };
