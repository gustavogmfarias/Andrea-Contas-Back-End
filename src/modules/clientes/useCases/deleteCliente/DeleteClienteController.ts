import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteClienteUseCase } from "./DeleteClienteUseCase";

class DeleteClienteController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: lojistaId } = request.lojista;
        const { id } = request.params;

        const deleteClienteUseCase = container.resolve(DeleteClienteUseCase);

        const clienteDeletado = await deleteClienteUseCase.execute(
            id,
            lojistaId
        );

        return response.status(200).send(clienteDeletado);
    }
}

export { DeleteClienteController };
