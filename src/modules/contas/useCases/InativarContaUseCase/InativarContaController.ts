import { Request, Response } from "express";
import { container } from "tsyringe";
import { InativarContaUseCase } from "./InativarContaUseCase";

class InativarContaController {
    async handle(request: Request, response: Response): Promise<Response> {
        const inativarContaUseCase = container.resolve(InativarContaUseCase);
        const { id: fkIdLojista } = request.lojista;
        const { idConta } = request.params;

        const contaInativada = await inativarContaUseCase.execute(
            fkIdLojista,
            idConta
        );

        return response.status(200).send(contaInativada);
    }
}

export { InativarContaController };
