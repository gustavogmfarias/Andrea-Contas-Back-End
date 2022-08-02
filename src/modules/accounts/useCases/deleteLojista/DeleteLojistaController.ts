import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteLojistaUseCase } from "./DeleteLojistaUseCase";

class DeleteLojistaController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: lojistaId } = request.lojista;
        const { id } = request.params;
        const deleteLojistaUseCase = container.resolve(DeleteLojistaUseCase);

        const lojistaDeletado = await deleteLojistaUseCase.execute(
            lojistaId,
            id
        );

        return response.status(200).send(lojistaDeletado);
    }
}

export { DeleteLojistaController };
