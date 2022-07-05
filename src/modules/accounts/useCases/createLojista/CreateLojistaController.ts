import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateLojistaUseCase } from "@modules/accounts/useCases/createLojista/CreateLojistaUseCase";

class CreateLojistaController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { username, senha, nome } = request.body;
        const createLojistaUseCase = container.resolve(CreateLojistaUseCase);

        await createLojistaUseCase.execute({
            username,
            nome,
            senha,
        });

        return response.status(201).send();
    }
}

export { CreateLojistaController };
