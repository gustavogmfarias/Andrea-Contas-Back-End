import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateLojistaUseCase } from "@modules/accounts/useCases/createLojista/CreateLojistaUseCase";

class CreateLojistaController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: lojistaId } = request.lojista;
        const { username, senha, nome } = request.body;
        const createLojistaUseCase = container.resolve(CreateLojistaUseCase);

        const lojistaCriado = await createLojistaUseCase.execute(lojistaId, {
            username,
            nome,
            senha,
        });

        return response.status(201).send(lojistaCriado);
    }
}

export { CreateLojistaController };
